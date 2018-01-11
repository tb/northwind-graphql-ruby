import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Formik} from 'formik';

import ALL_PRODUCTS_QUERY from '../../graphql/AllProducts.graphql';
import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import CREATE_PRODUCT_MUTATION from '../../graphql/CreateProduct.graphql';
import {mutationAsPromise} from '../../utils/apolloHelpers';
import ProductForm from './Form';

class Create extends Component {
  _createSupplier = (values, actions) => {
    const {createProduct, history, match} = this.props;
    const {supplier_id} = match.params;

    createProduct({
      variables: values,
      refetchQueries: [
        {query: SUPPLIER_QUERY, variables: {id: supplier_id}},
        {query: ALL_PRODUCTS_QUERY, variables: {supplier: supplier_id}},
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
  graphql(CREATE_PRODUCT_MUTATION, {
    name: 'createProduct',
    props: mutationAsPromise('createProduct'),
  }),
)(Create);
