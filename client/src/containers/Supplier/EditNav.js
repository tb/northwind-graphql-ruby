import React from 'react';
import {Link, NavLink as RRNavLink} from 'react-router-dom';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';

export default ({supplier: {id, products}}) => (
  <Nav tabs style={{marginBottom: '10px'}}>
    <NavItem>
      <Button tag={Link} to={`/suppliers`}>
        Back
      </Button>
    </NavItem>
    <NavItem>
      <NavLink exact to={`/suppliers/${id}/edit`} tag={RRNavLink}>
        Supplier
      </NavLink>
    </NavItem>
    <NavItem>
      <NavLink tag={RRNavLink} to={`/suppliers/${id}/products`}>
        Products ({products.totalCount})
      </NavLink>
    </NavItem>
  </Nav>
);
