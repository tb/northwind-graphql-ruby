import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';

import SignUp from '../Account/SignUp';
import SignIn from '../Account/SignIn';
import SupplierList from '../Supplier/SupplierList';
import SupplierDetails from '../Supplier/SupplierDetails';

import logo from '../../logo.svg';
import './App.css';

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">
            Welcome to
            {' '}
            <a href="https://github.com/tb/northwind-graphql-ruby">Northwind GraphQL Ruby Client</a>
          </h1>
        </header>
        <Container>
          <Switch>
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/signin" component={SignIn} />
            <Route path="/suppliers/:id" component={SupplierDetails}/>
            <Route path="/suppliers" component={SupplierList}/>
            <Redirect from="/" to="/suppliers"/>
          </Switch>
        </Container>
      </div>
    );
  }
}

export default App;
