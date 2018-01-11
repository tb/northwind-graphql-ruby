import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {compose, graphql} from 'react-apollo';
import {Button} from 'reactstrap';
import {Link} from 'react-router-dom';

import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import DELETE_SUPPLIER_MUTATION from '../../graphql/DeleteSupplier.graphql';
import {withTable} from '../../hocs/withTable';
import SupplierListFilter from './ListFilter';
import SupplierListTable from './ListTable';

class SupplierList extends Component {
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
        <SupplierListFilter table={table} />
        <SupplierListTable
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
  graphql(ALL_SUPPLIERS_QUERY, {
    options: ({table}) => ({
      variables: table.params,
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(DELETE_SUPPLIER_MUTATION, {name: 'deleteSupplier'}),
)(SupplierList);
