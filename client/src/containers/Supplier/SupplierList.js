import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {compose, graphql} from 'react-apollo';
import {Button, FormGroup, Input, Label, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import DELETE_SUPPLIER_MUTATION from '../../graphql/DeleteSupplier.graphql';
import SortTh from '../../components/Table/SortTh';
import Pagination from '../../components/Table/Pagination';

class SupplierList extends Component {
  state = {
    orderBy: '-id',
    filter: {
      name_contains: '',
    },
    perPage: 5,
    page: 1,
  };

  _openDetails = ({id}) => () =>
    this.props.history.push(`/suppliers/${id}/edit`);

  _deleteSupplier = ({id}) => event => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) {
      return;
    }

    this.props.deleteSupplier({
      variables: {id},
      refetchQueries: [{query: ALL_SUPPLIERS_QUERY}],
    });
  };

  render() {
    const {filter, orderBy, perPage, page} = this.state;
    const {loading, error, allSuppliers} = this.props.allSuppliers;

    if (!allSuppliers || (loading && !allSuppliers.nodes)) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>An unexpected error occurred</div>;
    }

    if (!allSuppliers.nodes) {
      return <div>No suppliers</div>;
    }

    const onSearch = ({target: {value}}) => {
      const newFilter = {...filter, name_contains: value};
      this.setState({filter: newFilter});
      this.props.allSuppliers.refetch({
        filter: newFilter,
        orderBy,
        first: perPage,
        offset: 0,
      });
    };

    const onSort = orderBy => {
      this.setState({orderBy});
      this.props.allSuppliers.refetch({
        filter,
        orderBy,
        first: perPage,
        offset: 0,
      });
    };

    const onPage = page => {
      this.setState({page});
      this.props.allSuppliers.refetch({
        filter,
        orderBy,
        first: perPage,
        offset: (page - 1) * perPage,
      });
    };

    const onPerPage = perPage => {
      this.setState({perPage, page: 1});
      this.props.allSuppliers.refetch({
        filter,
        orderBy,
        first: perPage,
        offset: 0,
      });
    };

    return (
      <div>
        <Button outline color="success" tag={Link} to="suppliers/new">
          Add Supplier
        </Button>
        <FormGroup>
          <Label>Search by name</Label>
          <Input
            type="text"
            autoComplete="off"
            value={filter.name_contains}
            onChange={onSearch}
          />
        </FormGroup>
        <Table hover>
          <thead>
            <tr>
              <SortTh onSort={onSort} field={'name'} sort={orderBy}>
                Supplier Name
              </SortTh>
              <th colSpan={3}>Contact</th>
            </tr>
          </thead>
          <tbody>
            {allSuppliers.nodes.map((supplier, index) => (
              <tr key={index} onClick={this._openDetails(supplier)}>
                <td>{supplier.name}</td>
                <td>{supplier.contact.first_name}</td>
                <td>{supplier.contact.last_name}</td>
                <td>
                  {supplier.contact.email}{' '}
                  {JSON.stringify(this.context.history, null, 2)}{' '}
                </td>
                <td>
                  {supplier.id > 10 && ( // protect initial data on heroku
                    <Button
                      outline
                      color="danger"
                      size="sm"
                      onClick={this._deleteSupplier(supplier)}>
                      Remove
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination
          page={page}
          onPage={onPage}
          perPage={perPage}
          onPerPage={onPerPage}
          totalCount={allSuppliers.totalCount}
        />
      </div>
    );
  }
}

export default compose(
  withRouter,
  graphql(ALL_SUPPLIERS_QUERY, {
    name: 'allSuppliers',
    options: () => ({
      variables: {first: 5, offset: 0},
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(DELETE_SUPPLIER_MUTATION, {name: 'deleteSupplier'}),
)(SupplierList);
