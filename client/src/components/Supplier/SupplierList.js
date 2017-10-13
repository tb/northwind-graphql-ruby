import React, { Component } from 'react';
import { gql, graphql, compose } from 'react-apollo';
import { Table } from 'reactstrap';

import SupplierListItem from './SupplierListItem';

class SupplierList extends Component {
  render() {
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
          <SupplierListItem
            key={index} index={index} supplier={supplier}
            createSupplier={this.props.createSupplier}
            updateSupplier={this.props.updateSupplier}
            deleteSupplier={this.props.deleteSupplier}
          />
        )}
        </tbody>
      </Table>
    );
  }
}

export const SUPPLIER_FRAGMENT = gql`
  fragment SupplierFragment on Supplier {
    id
    name
    contact {
      first_name
      last_name
      email
    }
  }
`;

export const UPDATE_SUPPLIER_MUTATION = gql`
  mutation updateSupplierMutation($id: ID!, $name: String, $first_name: String, $last_name: String, $email: String) {
    updateSupplier(supplier: {
      id: $id,
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


const DELETE_SUPPLIER_MUTATION = gql`
  mutation deleteSupplier($id: ID!) {
    deleteSupplier(id: $id) {
      ...SupplierFragment
    }
  }
  ${SUPPLIER_FRAGMENT}
`;

export const ALL_SUPPLIERS_QUERY = gql`
  query allSuppliersQuery {
    allSuppliers(orderBy: "-id") {
      ...SupplierFragment
    }
  }
  ${SUPPLIER_FRAGMENT}
`;

export default compose(
  graphql(ALL_SUPPLIERS_QUERY, { name: 'allSuppliers'}),
  graphql(UPDATE_SUPPLIER_MUTATION, { name: 'updateSupplier'}),
  graphql(DELETE_SUPPLIER_MUTATION, { name: 'deleteSupplier'}),
)(SupplierList)
