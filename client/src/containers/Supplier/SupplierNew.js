import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import {compose, graphql} from 'react-apollo';
import {Button} from 'reactstrap';
import {Formik} from 'formik';
import {isEmpty} from 'lodash';

import SupplierForm from './SupplierForm';
import {flattenErrors} from '../../utils/validations';
import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import CREATE_SUPPLIER_MUTATION from '../../graphql/CreateSupplier.graphql';

class SupplierNew extends Component {
  _createSupplier = (values, actions) => {
    this.props
      .createSupplier({
        variables: values,
        refetchQueries: [{query: ALL_SUPPLIERS_QUERY}],
      })
      .then(({data: {createSupplier: {errors, id}}}) => {
        if (isEmpty(errors)) {
          this.props.history.push(`/suppliers/${id}/edit`);
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      });
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
        <h3>Add Supplier</h3>
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
  graphql(CREATE_SUPPLIER_MUTATION, {name: 'createSupplier'}),
  withRouter,
)(SupplierNew);
