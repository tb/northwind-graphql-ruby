import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Button, Table} from 'reactstrap';

import ALL_PRODUCTS_QUERY from '../../graphql/AllProducts.graphql';
import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import CREATE_PRODUCT_MUTATION from '../../graphql/CreateProduct.graphql';
import DELETE_PRODUCT_MUTATION from '../../graphql/DeleteProduct.graphql';
import {Link} from 'react-router-dom';

class ProductsList extends Component {
  _openDetails = ({id}) => () =>
    this.props.history.push(
      `/suppliers/${this.props.supplier_id}/products/${id}/edit`,
    );

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
    const {loading, error, allProducts} = this.props.allProducts;

    if (!allProducts || (loading && !allProducts.nodes)) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>An unexpected error occurred</div>;
    }

    if (!allProducts.nodes) {
      return <div>No products</div>;
    }

    return (
      <div>
        <Button outline color="success" tag={Link} to={`products/new`}>
          Add Product
        </Button>
        <Table hover responsive>
          <thead>
            <tr>
              <th />
              <th>Product Name</th>
              <th colspan={2}>Category</th>
            </tr>
          </thead>
          <tbody>
            {allProducts.nodes.map((item, index) => (
              <tr key={index} onClick={this._openDetails(item)}>
                <td width={100}>
                  <img src={item.image_url} width={100} alt="Product" />
                </td>
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
