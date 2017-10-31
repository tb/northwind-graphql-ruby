import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Link, NavLink as RRNavLink, Switch, Route} from 'react-router-dom';
import {Formik} from 'formik';
import {isEmpty} from 'lodash';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';

import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import UPDATE_SUPPLIER_MUTATION from '../../graphql/UpdateSupplier.graphql';
import {flattenErrors} from '../../utils/validations';
import ProductList from '../Product/ProductList';
import SupplierForm from './SupplierForm';

class SupplierEdit extends Component {
  _updateSupplier = (values, actions) => {
    this.props
      .updateSupplier({
        variables: values,
      })
      .then(({data: {updateSupplier: {errors}}}) => {
        if (isEmpty(errors)) {
          actions.resetForm();
          this.props.history.push(`/`);
        } else {
          actions.setErrors(flattenErrors(errors));
        }
      });
  };

  render() {
    const {loading, error, supplier = {contact: {}}} = this.props.supplier;

    const initialValues = {
      id: supplier.id,
      name: supplier.name,
      first_name: supplier.contact.first_name,
      last_name: supplier.contact.last_name,
      email: supplier.contact.email,
    };

    if (loading) {
      return <div>Loading</div>;
    }

    if (error) {
      console.log(error);
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <Button tag={Link} to={`/suppliers`}>
              Back
            </Button>
          </NavItem>
          <NavItem>
            <NavLink
              exact
              to={`/suppliers/${supplier.id}/edit`}
              tag={RRNavLink}>
              Supplier
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              exact
              tag={RRNavLink}
              to={`/suppliers/${supplier.id}/products`}>
              Products ({supplier.productsCount})
            </NavLink>
          </NavItem>
        </Nav>

        <Switch>
          <Route exact path="/suppliers/:id/edit">
            <Formik
              initialValues={initialValues}
              onSubmit={this._updateSupplier}
              component={SupplierForm}
            />
          </Route>
          <Route exact path="/suppliers/:id/products">
            <ProductList supplier_id={supplier.id} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default compose(
  graphql(SUPPLIER_QUERY, {
    name: 'supplier',
    options: ({match: {params: {id}}}) => ({
      variables: {id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(UPDATE_SUPPLIER_MUTATION, {name: 'updateSupplier'}),
  withRouter,
)(SupplierEdit);
