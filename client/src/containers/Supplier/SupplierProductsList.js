import React, { Component } from 'react';
import { Button } from 'reactstrap';

class SupplierProductsList extends Component {
  _deleteItem = (item) => (event) => {
    event.stopPropagation();

    if (!window.confirm('Are you sure?')) { return; }

    this.props.deleteItem(item);
  };

  render() {
    const { products } = this.props;

    if (!products) {
      return (<div>No products</div>);
    }

    return (
      <div>
        {products.map((item, index) => (
          <div key={index}>
            <pre>{ JSON.stringify(item, null, 2) }</pre>
            <Button outline color="danger" size="sm"
                    onClick={this._deleteItem(item)}>
              Remove
            </Button>
          </div>
        ))}
      </div>
    );
  }
}

export default SupplierProductsList;
