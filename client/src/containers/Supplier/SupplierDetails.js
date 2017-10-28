import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Formik, Field } from 'formik';
import { isEmpty } from 'lodash';
import { Form, Button, Col, Row } from 'reactstrap';

import TextInput from '../../components/Forms/TextInput';
import { flattenErrors } from '../../utils/validations';

import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import UPDATE_SUPPLIER_MUTATION from '../../graphql/UpdateSupplier.graphql';
import DELETE_SUPPLIER_PRODUCT_MUTATION from '../../graphql/DeleteSupplierProduct.graphql';
import SupplierProductsList from "./SupplierProductsList";

const SupplierForm = ({ handleSubmit }) => (
  <Form onSubmit={handleSubmit}>
    <Field component={TextInput} name="name" label="Name" />
    <Field component={TextInput} name="first_name" label="First Name" />
    <Field component={TextInput} name="last_name" label="Last Name" />
    <Field component={TextInput} name="email" label="Email" />
    <Button type="submit" outline color="success" size="sm">
      Save Changes
    </Button>
  </Form>
);

class SupplierDetails extends Component {
  _updateSupplier = (values, actions) => {
    const supplierId = this.props.supplier.id;
    this.props.updateSupplier({
      variables: { id: supplierId, ...values },
    }).then(({ data: { updateSupplier: { errors } } }) => {
      if (isEmpty(errors)) {
        this.props.history.push(`/`);
      } else {
        actions.setErrors(flattenErrors(errors));
      }
    });
  };

  _deleteSupplierProduct = ({ id }) => {
    this.props.deleteSupplierProduct({
      variables: { id },
    }).then(() => {
      this.props.supplier.refetch();
    });
  };

  render() {
    const {
      loading,
      error,
      supplier = { contact: {} }
    } = this.props.supplier;

    const initialValues = {
      id: supplier.id,
      name: supplier.name,
      first_name: supplier.contact.first_name,
      last_name: supplier.contact.last_name,
      email: supplier.contact.email,
    };

    if (loading) {
      return (<div>Loading</div>)
    }

    if (error) {
      console.log(error);
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div>
        <Link to={`/suppliers`}>
          <Button>Back {loading}</Button>
        </Link>
        <Row>
          <Col md={6}>
            <h3>Supplier</h3>
            <Formik
              initialValues={initialValues}
              onSubmit={this._updateSupplier}
              component={SupplierForm}
            />
          </Col>
          <Col md={6}>
            <h3>Products</h3>
            <SupplierProductsList
              products={supplier.products}
              deleteItem={this._deleteSupplierProduct}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default compose(
  graphql(SUPPLIER_QUERY, {
    name: 'supplier',
    options: ({ match: { params: { id }}}) => ({
      variables: { id },
      fetchPolicy: 'cache-and-network',
    })
  }),
  graphql(UPDATE_SUPPLIER_MUTATION, { name: 'updateSupplier'}),
  graphql(DELETE_SUPPLIER_PRODUCT_MUTATION, { name: 'deleteSupplierProduct'}),
)(withRouter(SupplierDetails));
