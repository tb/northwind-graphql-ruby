import React, { Component } from 'react';
import { graphql, compose } from 'react-apollo';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';

import SUPPLIER_QUERY from './graphql/supplierQuery.graphql';

class SupplierDetails extends Component {
  render() {
    const { loading, error, supplier } = this.props.supplier;

    if (loading) {
      return (<div>Loading</div>)
    }

    if (error) {
      console.log(error);
      return (<div>An unexpected error occurred</div>)
    }

    return (
      <div>
        <Link to={`/suppliers`}>
          <Button>Back {loading}</Button>
        </Link>
        <pre>{JSON.stringify(supplier, null, 2)}</pre>
      </div>
    );
  }
}

export default compose(
  graphql(SUPPLIER_QUERY, {
    name: 'supplier',
    options: ({ match: { params: { id }}}) => ({
      variables: { id },
      fetchPolicy: 'cache-and-network',
    })
  }),
)(withRouter(SupplierDetails));
