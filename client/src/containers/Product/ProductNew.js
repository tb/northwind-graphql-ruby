import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Formik} from 'formik';
import {isEmpty} from 'lodash';

import CREATE_PRODUCT_MUTATION from '../../graphql/CreateProduct.graphql';
import {flattenErrors} from '../../utils/validations';
import ProductForm from './ProductForm';

class ProductNew extends Component {
  _createSupplier = (values, actions) => {
    const {supplier_id} = this.props.match.params;
    this.props
      .createProduct({
        variables: values,
      })
      .then(({data: {createProduct: {errors}}}) => {
        if (isEmpty(errors)) {
          actions.resetForm();
          this.props.history.push(`/suppliers/${supplier_id}/products`);
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      });
  };

  render() {
    const {supplier_id} = this.props.match.params;

    const initialValues = {
      supplier_id,
      product_name: '',
      category: '',
    };

    return (
      <div>
        <h3>New Product</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={this._createSupplier}
          component={ProductForm}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(CREATE_PRODUCT_MUTATION, {name: 'createProduct'}),
)(ProductNew);
