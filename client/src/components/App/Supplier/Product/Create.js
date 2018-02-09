import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Formik} from 'formik';

import {AllProductsQuery, CreateProductMutation} from 'graphql/Product';
import {SupplierQuery} from 'graphql/Supplier';

import {mutationAsPromise} from 'utils/apolloHelpers';
import ProductForm from './Form';

class Create extends Component {
  _createSupplier = (values, actions) => {
    const {createProduct, history, match} = this.props;
    const {supplier_id} = match.params;

    createProduct({
      variables: values,
      refetchQueries: [
        {query: SupplierQuery, variables: {id: supplier_id}},
        {query: AllProductsQuery, variables: {supplier: supplier_id}},
      ],
    })
      .then(() => {
        history.push(`/suppliers/${supplier_id}/products`);
      })
      .catch(actions.setErrors);
  };

  render() {
    const {supplier_id} = this.props.match.params;

    const initialValues = {
      supplier_id,
      product_name: '',
      image_url: 'http://lorempixel.com/300/250/sports/1',
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
  graphql(CreateProductMutation, {
    name: 'createProduct',
    props: mutationAsPromise('createProduct'),
  }),
)(Create);
