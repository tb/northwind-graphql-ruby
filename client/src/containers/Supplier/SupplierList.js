import React, { Component } from 'react';
import { compose, graphql } from 'react-apollo';
import { Table } from 'reactstrap';

import SupplierListItem from './SupplierListItem';
import SupplierAdd from './SupplierAdd';
import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import UPDATE_SUPPLIER_MUTATION from '../../graphql/UpdateSupplier.graphql';
import DELETE_SUPPLIER_MUTATION from '../../graphql/DeleteSupplier.graphql';

class SupplierList extends Component {
  _deleteItem = ({ id }) => {
    this.props.deleteSupplier({
      variables: { id },
    }).then(() => {
      this.props.allSuppliers.refetch();
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
      return (<div>No suppliers</div>)
    }

    return (
      <div>
        <SupplierAdd createSupplier={this.props.createSupplier} />
        <Table hover>
          <tbody>
          {allSuppliers.map((supplier, index) =>
            <SupplierListItem
              key={index} index={index} supplier={supplier}
              deleteItem={this._deleteItem}
            />
          )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default compose(
  graphql(ALL_SUPPLIERS_QUERY, { name: 'allSuppliers'}),
  graphql(UPDATE_SUPPLIER_MUTATION, { name: 'updateSupplier'}),
  graphql(DELETE_SUPPLIER_MUTATION, { name: 'deleteSupplier'}),
)(SupplierList);
