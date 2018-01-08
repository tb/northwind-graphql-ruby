import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {compose, graphql} from 'react-apollo';
import {Button, Form, FormGroup, Input, Label, Table} from 'reactstrap';
import {Link} from 'react-router-dom';
import {countries} from 'countries-list';
import {get} from 'lodash';

import ALL_SUPPLIERS_QUERY from '../../graphql/AllSuppliers.graphql';
import DELETE_SUPPLIER_MUTATION from '../../graphql/DeleteSupplier.graphql';
import SortTh from '../../components/Table/SortTh';
import Pagination from '../../components/Table/Pagination';
import {withTable} from '../../hocs/withTable';
import CountrySelect from '../CountrySelect/CountrySelect';

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
      .then(() => this.props.allSuppliers.refetch());
  };

  render() {
    const {table} = this.props;
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

    const onSearch = ({target: {value}}) =>
      table.setFilter({...table.params.filter, name_contains: value});

    return (
      <div>
        <Button outline color="success" tag={Link} to="suppliers/new">
          Add Supplier
        </Button>
        <Form inline className="mx-1 my-2">
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Search by name</Label>
            <Input
              type="text"
              autoComplete="off"
              value={table.params.filter.name_contains || ''}
              onChange={onSearch}
            />
          </FormGroup>
          <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
            <Label className="mr-sm-2">Country</Label>
            <CountrySelect />
          </FormGroup>
        </Form>
        <Table hover responsive>
          <thead>
            <tr>
              <SortTh table={table} field={'name'}>
                Supplier Name
              </SortTh>
              <SortTh table={table} field={'addresses.country'}>
                Country
              </SortTh>
              <SortTh table={table} field={'contacts.first_name'} colSpan={4}>
                First Name
              </SortTh>
            </tr>
          </thead>
          <tbody>
            {allSuppliers.nodes.map((supplier, index) => (
              <tr key={index} onClick={this._openDetails(supplier)}>
                <td>{supplier.name}</td>
                <td>
                  {supplier.address &&
                    get(countries, [supplier.address.country, 'emoji'])}
                </td>
                <td>{supplier.contact.first_name}</td>
                <td>{supplier.contact.last_name}</td>
                <td>{supplier.contact.email} </td>
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
        <Pagination table={table} totalCount={allSuppliers.totalCount} />
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
    name: 'allSuppliers',
    options: ({table}) => ({
      variables: table.params,
      fetchPolicy: 'cache-and-network',
    }),
  }),
  graphql(DELETE_SUPPLIER_MUTATION, {name: 'deleteSupplier'}),
)(SupplierList);
