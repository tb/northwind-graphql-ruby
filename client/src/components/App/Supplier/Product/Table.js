import React from 'react';
import {Button, Table} from 'reactstrap';

export default ({nodes = [], open, remove}) => {
  if (!nodes.length) {
    return <div>No products</div>;
  }

  return (
    <Table hover responsive>
      <thead>
        <tr>
          <th />
          <th>Product Name</th>
          <th colSpan={2}>Category</th>
        </tr>
      </thead>
      <tbody>
        {nodes.map((item, index) => (
          <tr key={index} onClick={open(item)}>
            <td width={100}>
              <img src={item.image_url} width={100} alt="Product" />
            </td>
            <td>{item.product_name}</td>
            <td>{item.category}</td>
            <td>
              <Button outline color="danger" size="sm" onClick={remove(item)}>
                Remove
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
