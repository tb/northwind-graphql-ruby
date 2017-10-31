import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { withRouter } from 'react-router';
import { isEmpty } from 'lodash';
import { Formik } from 'formik';
import { Button, Col, Row } from 'reactstrap';

import ALL_PRODUCTS_QUERY from '../../graphql/AllProducts.graphql';
import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import CREATE_PRODUCT_MUTATION from '../../graphql/CreateProduct.graphql';
import DELETE_PRODUCT_MUTATION from '../../graphql/DeleteProduct.graphql';
import { flattenErrors } from '../../utils/validations';
import ProductForm from './ProductForm';

class SupplierProductsList extends Component {
  _createProduct = (values, actions) => {
    const supplier_id = this.props.match.params.id;
    this.props.createProduct({
      variables: { supplier_id, ...values },
      refetchQueries: [
        { query: SUPPLIER_QUERY, variables: { id: supplier_id } },
        { query: ALL_PRODUCTS_QUERY, variables: { supplier: supplier_id } },
      ],
    }).then(({ data: { createProduct: { errors } } }) => {
      if (isEmpty(errors)) {
        actions.resetForm();
      } else {
        actions.setErrors(flattenErrors(errors));
      }
    });
  };

  _deleteProduct = ({ id, supplier_id }) => (event) => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) { return; }

    this.props.deleteProduct({
      variables: { id },
      refetchQueries: [
        { query: SUPPLIER_QUERY, variables: { id: supplier_id } },
        { query: ALL_PRODUCTS_QUERY, variables: { supplier: supplier_id }, },
      ],
    });
  };

  render() {
    const {
      loading,
      error,
      allProducts,
    } = this.props.allProducts;

    const initialValues = {
      product_name: '',
      category: '',
    };

    if (loading && !allProducts) {
      return (<div>Loading</div>)
    }

    if (error) {
      console.log(error);
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={this._createProduct}
          component={ProductForm}
        />

        {allProducts.map((item, index) => (
          <Row key={index} style={{ lineHeight: 2.5 }}>
            <Col>
              { item.product_name }
              { item.category && (<span>({item.category})</span>)}
            </Col>
            <Col>
              <Button outline color="danger" size="sm"
                      onClick={this._deleteProduct(item)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default compose(
  graphql(ALL_PRODUCTS_QUERY, {
    name: 'allProducts',
    options: ({ supplier_id }) => ({
      variables: { supplier: supplier_id },
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(CREATE_PRODUCT_MUTATION, { name: 'createProduct'}),
  graphql(DELETE_PRODUCT_MUTATION, { name: 'deleteProduct'}),
  withRouter,
)(SupplierProductsList);
