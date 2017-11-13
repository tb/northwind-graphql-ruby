import React, {Component} from 'react';
import {compose, graphql} from 'react-apollo';
import {withRouter} from 'react-router';
import {Link, NavLink as RRNavLink, Switch, Route} from 'react-router-dom';
import {Formik} from 'formik';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';

import SUPPLIER_QUERY from '../../graphql/Supplier.graphql';
import UPDATE_SUPPLIER_MUTATION from '../../graphql/UpdateSupplier.graphql';
import {mutationAsPromise} from '../../utils/apolloHelpers';
import ProductNew from '../Product/ProductNew';
import ProductEdit from '../Product/ProductEdit';
import ProductList from '../Product/ProductList';
import SupplierForm from './SupplierForm';

class SupplierEdit extends Component {
  _updateSupplier = (values, actions) => {
    const {updateSupplier, history} = this.props;

    updateSupplier({variables: values})
      .then(() => history.push('/'))
      .catch(actions.setErrors);
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
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <Nav tabs style={{marginBottom: '10px'}}>
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
            <NavLink tag={RRNavLink} to={`/suppliers/${supplier.id}/products`}>
              Products ({supplier.products.totalCount})
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
          <Route exact path="/suppliers/:supplier_id/products/new">
            <ProductNew />
          </Route>
          <Route exact path="/suppliers/:supplier_id/products/:id/edit">
            <ProductEdit />
          </Route>
          <Route exact path="/suppliers/:supplier_id/products">
            <ProductList supplier_id={supplier.id} />
          </Route>
        </Switch>
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(SUPPLIER_QUERY, {
    name: 'supplier',
    options: ({match}) => ({
      variables: {id: match.params.id},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(UPDATE_SUPPLIER_MUTATION, {
    name: 'updateSupplier',
    props: mutationAsPromise('updateSupplier'),
  }),
)(SupplierEdit);
