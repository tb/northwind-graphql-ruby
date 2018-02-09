import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import {
  AllProductsQuery,
  CreateProductMutation,
  DeleteProductMutation,
} from 'graphql/Product';
import {SupplierQuery} from 'graphql/Supplier';

import {withData} from 'hocs';
import Table from './Table';

class List extends Component {
  _openDetails = ({id}) => () =>
    this.props.history.push(
      `/suppliers/${this.props.match.params.supplier_id}/products/${id}/edit`,
    );

  _deleteProduct = ({id, supplier_id}) => event => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.props
      .deleteProduct({
        variables: {id},
        refetchQueries: [{query: SupplierQuery, variables: {id: supplier_id}}],
      })
      .then(() => this.props.data.refetch());
  };

  render() {
    const {allProducts = {}} = this.props.data;

    return (
      <div>
        <Button outline color="success" tag={Link} to={`products/new`}>
          Add Product
        </Button>

        <Table
          nodes={allProducts.nodes}
          remove={this._deleteProduct}
          open={this._openDetails}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(AllProductsQuery, {
    options: ({match}) => ({
      variables: {supplier: match.params.supplier_id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(CreateProductMutation, {name: 'createProduct'}),
  graphql(DeleteProductMutation, {name: 'deleteProduct'}),
  withData,
)(List);
