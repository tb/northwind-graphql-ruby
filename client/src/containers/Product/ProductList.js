import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {isEmpty} from 'lodash';
import {Button, Table} from 'reactstrap';

import ALL_PRODUCTS_QUERY from '../../graphql/AllProducts.graphql';
import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import CREATE_PRODUCT_MUTATION from '../../graphql/CreateProduct.graphql';
import DELETE_PRODUCT_MUTATION from '../../graphql/DeleteProduct.graphql';
import {flattenErrors} from '../../utils/validations';
import {Link} from 'react-router-dom';

class ProductsList extends Component {
  _openDetails = ({id}) => () =>
    this.props.history.push(
      `/suppliers/${this.props.supplier_id}/products/${id}/edit`,
    );

  _createProduct = (values, actions) => {
    const {supplier_id} = this.props;
    this.props
      .createProduct({
        variables: {supplier_id, ...values},
        refetchQueries: [
          {query: SUPPLIER_QUERY, variables: {id: supplier_id}},
          {query: ALL_PRODUCTS_QUERY, variables: {supplier: supplier_id}},
        ],
      })
      .then(({data: {createProduct: {errors}}}) => {
        if (isEmpty(errors)) {
          actions.resetForm();
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      });
  };

  _deleteProduct = ({id, supplier_id}) => event => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.props.deleteProduct({
      variables: {id},
      refetchQueries: [
        {query: SUPPLIER_QUERY, variables: {id: supplier_id}},
        {query: ALL_PRODUCTS_QUERY, variables: {supplier: supplier_id}},
      ],
    });
  };

  render() {
    const {loading, error, allProducts = []} = this.props.allProducts;

    if (loading && !allProducts) {
      return <div>Loading</div>;
    }

    if (error) {
      console.log(error);
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <Button outline color="success" tag={Link} to={`products/new`}>
          Add Product
        </Button>
        <Table hover>
          <tbody>
            {allProducts.map((item, index) => (
              <tr key={index} onClick={this._openDetails(item)}>
                <td>{item.product_name}</td>
                <td>{item.category}</td>
                <td>
                  <Button
                    outline
                    color="danger"
                    size="sm"
                    onClick={this._deleteProduct(item)}>
                    Remove
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(ALL_PRODUCTS_QUERY, {
    name: 'allProducts',
    options: ({match}) => ({
      variables: {supplier: match.params.supplier_id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(CREATE_PRODUCT_MUTATION, {name: 'createProduct'}),
  graphql(DELETE_PRODUCT_MUTATION, {name: 'deleteProduct'}),
)(ProductsList);
