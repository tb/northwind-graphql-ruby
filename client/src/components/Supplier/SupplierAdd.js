import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Form, Col, Row, Button } from 'reactstrap';
import { Formik, Field } from 'formik';
import { isEmpty } from 'lodash';
import { flattenErrors } from '../../utils/validations';
import { SUPPLIER_FRAGMENT, ALL_SUPPLIERS_QUERY } from './SupplierList';
import TextInput from '../Forms/TextInput';

const SupplierForm = ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col lg={3}>
        <Field component={TextInput} name="name" />
      </Col>
      <Col lg={2}>
        <Field component={TextInput} name="first_name" />
      </Col>
      <Col lg={2}>
        <Field component={TextInput} name="last_name" />
      </Col>
      <Col lg={3}>
        <Field component={TextInput} name="email" />
      </Col>
      <Col lg={2}>
        <Button type="submit" style={{ marginTop: '30px' }}>Add</Button>
      </Col>
    </Row>
  </Form>
);

class SupplierAdd extends Component {
  _onSubmit = (values, actions) => {
    this.props.createSupplierMutation({
      variables: values,
      // refetchQueries: [ { query: ALL_SUPPLIERS_QUERY } ],
      update: (store, { data: { createSupplier: { errors, ...createSupplier } } }) => {
        if (isEmpty(errors)) {
          const data = store.readQuery({ query: ALL_SUPPLIERS_QUERY });
          data.allSuppliers.splice(0,0,createSupplier);
          store.writeQuery({ query: ALL_SUPPLIERS_QUERY, data });
          actions.resetForm();
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      }
    });
  };

  render() {
    return (
      <Formik
        initialValues={{ name: '', first_name: '', last_name: '', email: '' }}
        onSubmit={this._onSubmit}
        component={SupplierForm}
      />
    );
  }
}

export const CREATE_SUPPLIER_MUTATION = gql`
  mutation createSupplierMutation($name: String, $first_name: String, $last_name: String, $email: String) {
    createSupplier(supplier: {
      name: $name,
      contact: {
        first_name: $first_name,
        last_name: $last_name,
        email: $email,
      },
    }) {
      errors
      ...SupplierFragment
    }
  }
  ${SUPPLIER_FRAGMENT}
`;

export default graphql(CREATE_SUPPLIER_MUTATION, { name: 'createSupplierMutation' })(SupplierAdd);
