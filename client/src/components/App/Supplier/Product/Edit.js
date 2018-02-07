import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Formik} from 'formik';

import PRODUCT_QUERY from 'graphql/Product.graphql';
import UPDATE_PRODUCT_MUTATION from 'graphql/UpdateProduct.graphql';
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
  graphql(PRODUCT_QUERY, {
    options: ({match}) => ({
      variables: {id: match.params.id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(UPDATE_PRODUCT_MUTATION, {
    name: 'updateProduct',
    props: mutationAsPromise('updateProduct'),
  }),
  withData,
)(Edit);
