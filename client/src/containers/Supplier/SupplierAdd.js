import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Form, Col, Row, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import { isEmpty } from 'lodash';

import TextInput from '../../components/Forms/TextInput';
import { flattenErrors } from '../../utils/validations';
import { storeAdd } from '../../utils/storeHelpers';

import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import CREATE_SUPPLIER_MUTATION from '../../graphql/CreateSupplier.graphql';

const SupplierForm = ({ handleSubmit, errors }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col lg={3}>
        <Field component={TextInput} name="name" label="Supplier Name" />
      </Col>
      <Col lg={2}>
        <Field component={TextInput} name="first_name" label="First Name" />
      </Col>
      <Col lg={2}>
        <Field component={TextInput} name="last_name" label="Last Name" />
      </Col>
      <Col lg={3}>
        <Field component={TextInput} name="email" label="Email" />
      </Col>
      <Col lg={2}>
        <Button type="submit" style={{ marginTop: '30px' }}>Add</Button>
      </Col>
    </Row>
  </Form>
);

class SupplierAdd extends Component {
  _createSupplier = (values, actions) => {
    this.props.createSupplier({
      variables: values,
      update: (store, { data: { createSupplier: { errors, ...createSupplier } } }) => {
        if (isEmpty(errors)) {
          storeAdd(store, ALL_SUPPLIERS_QUERY, 'allSuppliers', createSupplier);
          actions.resetForm();
        } else {
          actions.setErrors(flattenErrors(errors));
        }
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
      <Formik
        initialValues={initialValues}
        onSubmit={this._createSupplier}
        component={SupplierForm}
      />
    );
  }
}

export default graphql(CREATE_SUPPLIER_MUTATION, { name: 'createSupplier' })(SupplierAdd);
