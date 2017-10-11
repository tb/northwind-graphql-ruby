import React, { Component } from 'react';
import { Container } from 'reactstrap';

import SupplierAdd from './Supplier/SupplierAdd';
import SupplierList from './Supplier/SupplierList';

import logo from '../logo.svg';
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
          <SupplierAdd />
          <SupplierList />
        </Container>
      </div>
    );
  }
}

export default App;
