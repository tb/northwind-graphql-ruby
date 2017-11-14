import React, {Component} from 'react';
import {withRouter} from 'react-router';
import {compose, graphql} from 'react-apollo';
import {Button, FormGroup, Input, Label, Table} from 'reactstrap';
import {Link} from 'react-router-dom';

import ALL_CUSTOMER_QUERY from '../../graphql/AllCustomers.graphql';
import SortTh from '../../components/Table/SortTh';
import Pagination from '../../components/Table/Pagination';
import {withTable} from '../../hocs/withTable';

class CustomerList extends Component {
  render() {
    const {table} = this.props;
    const {loading, error, allCustomers} = this.props.allCustomers;

    if (!allCustomers || (loading && !allCustomers.nodes)) {
      return <div>Loading</div>;
    }

    if (error) {
      return <div>An unexpected error occurred</div>;
    }

    if (!allCustomers.nodes) {
      return <div>No suppliers</div>;
    }

    const onSearch = ({target: {value}}) =>
      table.setFilter({...table.params.filter, name_contains: value});

    return (
      <div>
        <Table hover>
          <thead>
            <tr>
              <SortTh table={table} field={'name'}>
                Customer Name
              </SortTh>
              <th colSpan={3}>Contact</th>
            </tr>
          </thead>
          <tbody>
            {allCustomers.nodes.map((customer, index) => (
              <tr key={index}>
                <td>{customer.name}</td>
                <td>{customer.contact && customer.contact.first_name}</td>
                <td>{customer.contact && customer.contact.last_name}</td>
                <td>{customer.contact && customer.contact.email} </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <Pagination table={table} totalCount={allCustomers.totalCount} />
      </div>
    );
  }
}

export default compose(
  withRouter,
  withTable('allCustomers', {
    filter: {name_contains: ''},
    orderBy: '-id',
    page: 1,
    perPage: 5,
  }),
  graphql(ALL_CUSTOMER_QUERY, {
    name: 'allCustomers',
    options: ({table}) => ({
      variables: table.params,
      fetchPolicy: 'cache-and-network',
    }),
  }),
)(CustomerList);
