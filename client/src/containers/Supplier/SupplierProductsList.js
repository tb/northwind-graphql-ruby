import React, { Component } from 'react';
import { Button, Col, Row } from 'reactstrap';

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
          <Row key={index} style={{ lineHeight: 2.5 }}>
            <Col>
              { item.product_name }
              { item.category && (<span>({item.category})</span>)}
            </Col>
            <Col>
              <Button outline color="danger" size="sm"
                      onClick={this._deleteItem(item)}>
                Remove
              </Button>
            </Col>
          </Row>
        ))}
      </div>
    );
  }
}

export default SupplierProductsList;
