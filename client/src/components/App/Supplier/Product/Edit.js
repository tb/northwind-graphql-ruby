import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Formik} from 'formik';

import {ProductQuery, UpdateProductMutation} from 'graphql/Product';

import {mutationAsPromise} from 'utils/apolloHelpers';
import {withData} from 'hocs';
import ProductForm from './Form';

class Edit extends Component {
  _updateSupplier = (values, actions) => {
    const {updateProduct, history, match} = this.props;
    const {supplier_id} = match.params;

    updateProduct({variables: values})
      .then(() => history.push(`/suppliers/${supplier_id}/products`))
      .catch(actions.setErrors);
  };

  render() {
    const {product = {}} = this.props.data;

    const initialValues = {
      id: product.id,
      product_name: product.product_name,
      image_url: product.image_url,
      category: product.category,
    };

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
  graphql(ProductQuery, {
    options: ({match}) => ({
      variables: {id: match.params.id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(UpdateProductMutation, {
    name: 'updateProduct',
    props: mutationAsPromise('updateProduct'),
  }),
  withData,
)(Edit);
