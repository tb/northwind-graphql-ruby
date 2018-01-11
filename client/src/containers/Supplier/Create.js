import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {compose, graphql} from 'react-apollo';
import {Button} from 'reactstrap';
import {Formik} from 'formik';

import CREATE_SUPPLIER_MUTATION from 'graphql/CreateSupplier.graphql';
import {mutationAsPromise} from 'utils/apolloHelpers';
import {withTable} from 'hocs/withTable';
import SupplierForm from './Form';

class Create extends Component {
  _createSupplier = (values, actions) => {
    const {createSupplier, history, table} = this.props;

    createSupplier({variables: values})
      .then(({id}) => {
        table.clear();
        history.push(`/suppliers/${id}/edit`);
      })
      .catch(actions.setErrors);
  };

  render() {
    const initialValues = {
      name: '',
      first_name: '',
      last_name: '',
      email: '',
    };

    return (
      <div>
        <Button tag={Link} to={`/suppliers`}>
          Back
        </Button>
        <h3>New Supplier</h3>
        <Formik
          initialValues={initialValues}
          onSubmit={this._createSupplier}
          component={SupplierForm}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withTable('allSuppliers'),
  graphql(CREATE_SUPPLIER_MUTATION, {
    name: 'createSupplier',
    props: mutationAsPromise('createSupplier'),
  }),
)(Create);
