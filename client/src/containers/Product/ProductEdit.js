import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Formik} from 'formik';
import {isEmpty} from 'lodash';

import PRODUCT_QUERY from '../../graphql/Product.graphql';
import UPDATE_PRODUCT_MUTATION from '../../graphql/UpdateProduct.graphql';
import {flattenErrors} from '../../utils/validations';
import ProductForm from './ProductForm';

class ProductEdit extends Component {
  _updateSupplier = (values, actions) => {
    const {supplier_id} = this.props.match.params;
    this.props
      .updateProduct({
        variables: values,
      })
      .then(({data: {updateProduct: {errors}}}) => {
        if (isEmpty(errors)) {
          actions.resetForm();
          this.props.history.push(`/suppliers/${supplier_id}/products`);
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      });
  };

  render() {
    const {loading, error, product = {}} = this.props.product;

    const initialValues = {
      id: product.id,
      product_name: product.product_name,
      image_url: product.image_url,
      category: product.category,
    };

    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      console.log(error);
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <h3>Edit Product</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={this._updateSupplier}
          component={ProductForm}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(PRODUCT_QUERY, {
    name: 'product',
    options: ({match}) => ({
      variables: {id: match.params.id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(UPDATE_PRODUCT_MUTATION, {name: 'updateProduct'}),
)(ProductEdit);
