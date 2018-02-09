import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Switch, Route} from 'react-router-dom';
import {Formik} from 'formik';

import {SupplierQuery, UpdateSupplierMutation} from 'graphql/Supplier';
import {withData} from 'hocs';
import {mutationAsPromise} from 'utils/apolloHelpers';
import Product from './Product';
import SupplierForm from './Form';
import SupplierNav from './EditNav';

class Edit extends Component {
  _updateSupplier = (values, actions) => {
    const {updateSupplier, history} = this.props;

    updateSupplier({variables: values})
      .then(() => history.push('/'))
      .catch(actions.setErrors);
  };

  render() {
    const {supplier = {contact: {}, address: {}}} = this.props.data;

    const initialValues = {
      id: supplier.id,
      name: supplier.name,
      first_name: supplier.contact.first_name,
      last_name: supplier.contact.last_name,
      email: supplier.contact.email,
      country: supplier.address.country,
    };

    return (
      <div>
        <SupplierNav supplier={supplier} />
        <Switch>
          <Route exact path="/suppliers/:id/edit">
            <Formik
              initialValues={initialValues}
              onSubmit={this._updateSupplier}
              component={SupplierForm}
            />
          </Route>
          <Product />
        </Switch>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(SupplierQuery, {
    options: ({match}) => ({
      variables: {id: match.params.id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(UpdateSupplierMutation, {
    name: 'updateSupplier',
    props: mutationAsPromise('updateSupplier'),
  }),
  withData,
)(Edit);
