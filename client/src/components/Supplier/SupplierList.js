import React, { Component } from 'react';
import { get } from 'lodash';
import { gql, graphql, compose } from 'react-apollo';
import { Button, Table } from 'reactstrap';

class SupplierList extends Component {
  _deleteSupplier = (supplier) => () => {
    if (!window.confirm('Are you sure?')) { return; }

    this.props.deleteSupplier({
      variables: { id: supplier.id },
      update: (store) => {
        const data = store.readQuery({ query: ALL_SUPPLIERS_QUERY });
        data.allSuppliers = data.allSuppliers.filter(({id}) => id !== supplier.id)
        store.writeQuery({ query: ALL_SUPPLIERS_QUERY, data });
      }
    });
  };

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
          <tr key={index}>
            <td>{supplier.name}</td>
            <td>{get(supplier.contact, 'first_name')}</td>
            <td>{get(supplier.contact, 'last_name')}</td>
            <td>{get(supplier.contact, 'email')}</td>
            <td>
              {
                supplier.id > 10 && // protect initial data on heroku
                <Button outline color="danger" size="sm"
                        onClick={this._deleteSupplier(supplier)}>
                  Remove
                </Button>
              }
            </td>
          </tr>
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

const DELETE_SUPPLIER_MUTATION = gql`
  mutation deleteSupplierMutation($id: ID!) {
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
  graphql(DELETE_SUPPLIER_MUTATION, { name: 'deleteSupplier'}),
)(SupplierList)
