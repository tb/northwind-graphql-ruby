import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Table } from 'reactstrap';

class SupplierList extends Component {
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
      <Table>
        <tbody>
        {allSuppliers.map((supplier, index) =>
          <tr key={index}>
            <td>{supplier.name}</td>
            <td>{JSON.stringify(supplier.contact, null, 2)}</td>
          </tr>
        )}
        </tbody>
      </Table>
    );
  }
}

export const SUPPLIER_FRAGMENT = gql`
  fragment SupplierFragment on Supplier {
    name
    contact {
      first_name
      last_name
      email
    }
  }
`;

export const ALL_SUPPLIERS_QUERY = gql`
  query allSuppliersQuery {
    allSuppliers(orderBy: "-id") {
      ...SupplierFragment
    }
  }
  ${SUPPLIER_FRAGMENT}
`;

export default graphql(ALL_SUPPLIERS_QUERY, { name: 'allSuppliers' })(SupplierList);
