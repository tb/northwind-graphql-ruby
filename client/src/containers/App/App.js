import React, {Component} from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';

import SignUp from '../Account/SignUp';
import SignIn from '../Account/SignIn';
import SupplierNew from '../Supplier/SupplierNew';
import SupplierList from '../Supplier/SupplierList';
import SupplierEdit from '../Supplier/SupplierEdit';
import CustomerList from '../Customer/CustomerList';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to{' '}
            <a href="https://github.com/tb/northwind-graphql-ruby">
              Northwind GraphQL Ruby Client
            </a>
          </h1>
        </header>
        <Container>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route path="/suppliers/new" component={SupplierNew} />
            <Route path="/suppliers/:id" component={SupplierEdit} />
            <Route path="/suppliers" component={SupplierList} />
            <Route path="/customers" component={CustomerList} />
            <Redirect from="/" to="/suppliers" />
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
