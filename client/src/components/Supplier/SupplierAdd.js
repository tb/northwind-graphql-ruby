import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, FormGroup, Label, Input, Col, Row, Button, FormFeedback } from 'reactstrap';
import { Formik } from 'formik';
import { isEmpty } from 'lodash';
import { flattenErrors } from '../../utils/validations';
import { SUPPLIER_FRAGMENT, ALL_SUPPLIERS_QUERY } from './SupplierList';

const SupplierForm = ({ handleSubmit, handleChange, handleBlur, values, errors }) => (
  <Form onSubmit={handleSubmit}>
    <Row>
      <Col lg={3}>
        <FormGroup>
          <Label>Supplier Name</Label>
          <Input type="text" onChange={handleChange} value={values.name} name="name" />
          {errors.name && <FormFeedback>{errors.name}</FormFeedback>}
        </FormGroup>
      </Col>
      <Col lg={2}>
        <FormGroup>
          <Label>First Name</Label>
          <Input type="text" onChange={handleChange} value={values.first_name} name="first_name" />
          {errors.first_name && <FormFeedback>{errors.first_name}</FormFeedback>}
        </FormGroup>
      </Col>
      <Col lg={2}>
        <FormGroup>
          <Label>Last Name</Label>
          <Input type="text" onChange={handleChange} value={values.last_name} name="last_name" />
          {errors.last_name && <FormFeedback>{errors.last_name}</FormFeedback>}
        </FormGroup>
      </Col>
      <Col lg={3}>
        <FormGroup>
          <Label>Email</Label>
          <Input type="text" onChange={handleChange} value={values.email} name="email" />
          {errors.email && <FormFeedback>{errors.email}</FormFeedback>}
        </FormGroup>
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
