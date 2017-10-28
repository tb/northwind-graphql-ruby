import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Button } from 'reactstrap';

class SupplierListItem extends Component {
  _openDetails = ({ id }) => () =>
    this.props.history.push(`/suppliers/${id}`);

  _deleteSupplier = (supplier) => (event) => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) { return; }

    this.props.deleteItem(supplier);
  };

  render() {
    const { index, supplier } = this.props;

    return (
      <tr key={index} onClick={this._openDetails(supplier)}>
        <td>{supplier.name}</td>
        <td>{supplier.contact.first_name}</td>
        <td>{supplier.contact.last_name}</td>
        <td>{supplier.contact.email} { JSON.stringify(this.context.history, null, 2) } </td>
        <td>
          {supplier.id > 10 && // protect initial data on heroku
          <Button outline color="danger" size="sm"
                  onClick={this._deleteSupplier(supplier)}>
            Remove
          </Button>}
        </td>
      </tr>
    );
  }
}

export default withRouter(SupplierListItem);
