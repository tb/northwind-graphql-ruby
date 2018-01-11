import React, {Component} from 'react';
import {Container} from 'reactstrap';

import AccountRoutes from '../Account/Routes';
import SupplierRoutes from '../Supplier/Routes';

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
          <AccountRoutes />
          <SupplierRoutes />
        </Container>
      </div>
    );
  }
}

export default App;
