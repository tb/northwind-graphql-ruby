import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {compose, graphql} from 'react-apollo';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import {AllSuppliersQuery, DeleteSupplierMutation} from 'graphql/Supplier';
import {withTable} from 'hocs';
import Filter from './Filter';
import Table from './Table';

class List extends Component {
  _openDetails = ({id}) => () =>
    this.props.history.push(`/suppliers/${id}/edit`);

  _deleteSupplier = ({id}) => event => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.props
      .deleteSupplier({variables: {id}})
      .then(() => this.props.data.refetch());
  };

  render() {
    const {table} = this.props;
    const {loading, error, allSuppliers} = this.props.data;

    if (!allSuppliers || (loading && !allSuppliers.nodes)) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>An unexpected error occurred</div>;
    }

    return (
      <div>
        <Button outline color="success" tag={Link} to="suppliers/new">
          Add Supplier
        </Button>
        <Filter table={table} />
        <Table
          table={table}
          totalCount={allSuppliers.totalCount}
          nodes={allSuppliers.nodes}
          open={this._openDetails}
          remove={this._deleteSupplier}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withTable('allSuppliers', {
    filter: {name_contains: ''},
    orderBy: '-id',
    page: 1,
    perPage: 10,
  }),
  graphql(AllSuppliersQuery, {
    options: ({table}) => ({
      variables: table.params,
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(DeleteSupplierMutation, {name: 'deleteSupplier'}),
)(List);
