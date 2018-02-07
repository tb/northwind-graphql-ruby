import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {Button} from 'reactstrap';

import ALL_PRODUCTS_QUERY from 'graphql/AllProducts.graphql';
import SUPPLIER_QUERY from 'graphql/Supplier.graphql';
import CREATE_PRODUCT_MUTATION from 'graphql/CreateProduct.graphql';
import DELETE_PRODUCT_MUTATION from 'graphql/DeleteProduct.graphql';
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
        refetchQueries: [{query: SUPPLIER_QUERY, variables: {id: supplier_id}}],
      })
      .then(() => this.props.data.refetch());
  };

  render() {
    const {allProducts} = this.props.data;

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
  graphql(ALL_PRODUCTS_QUERY, {
    options: ({match}) => ({
      variables: {supplier: match.params.supplier_id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(CREATE_PRODUCT_MUTATION, {name: 'createProduct'}),
  graphql(DELETE_PRODUCT_MUTATION, {name: 'deleteProduct'}),
  withData,
)(List);
