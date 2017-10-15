import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { Table } from 'reactstrap';

import SupplierListItem from './SupplierListItem';
import ALL_SUPPLIERS_QUERY from './graphql/allSuppliersQuery.graphql';
import UPDATE_SUPPLIER_MUTATION from './graphql/updateSupplierMutation.graphql';
import DELETE_SUPPLIER_MUTATION from './graphql/deleteSupplierMutation.graphql';

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

export default compose(
  graphql(ALL_SUPPLIERS_QUERY, { name: 'allSuppliers'}),
  graphql(UPDATE_SUPPLIER_MUTATION, { name: 'updateSupplier'}),
  graphql(DELETE_SUPPLIER_MUTATION, { name: 'deleteSupplier'}),
)(SupplierList)
