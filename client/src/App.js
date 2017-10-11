import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Table } from 'reactstrap';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  render () {
    const { loading, error, allSuppliers } = this.props.allSuppliers;

    if (loading) {
      return (<div>Loading</div>)
    }

    if (error) {
      console.log(error);
      return (<div>An unexpected error occurred</div>)
    }

    if (!allSuppliers) {
      return (<div>No allSuppliers</div>)
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Northwind GraphQL Ruby Client</h1>
        </header>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Supplier Name</th>
              <th>Contact</th>
            </tr>
          </thead>
          <tbody>
          {allSuppliers.map((supplier, index) =>
            <tr key={index}>
              <th scope="row">{index+1}</th>
              <td>{supplier.name}</td>
              <td>{JSON.stringify(supplier.contact, null, 2)}</td>
            </tr>
          )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export const ALL_SUPPLIERS_QUERY = gql`
  query allSuppliersQuery {
    allSuppliers {
      name
      contact {
        first_name
        last_name
        email
      }
    }
  }
`;

export default graphql(ALL_SUPPLIERS_QUERY, { name: 'allSuppliers' })(App);
