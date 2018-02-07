import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Create from './Create';
import Edit from './Edit';
import List from './List';

export default () => (
  <Switch>
    <Route
      exact
      path="/suppliers/:supplier_id/products/new"
      component={Create}
    />
    <Route
      exact
      path="/suppliers/:supplier_id/products/:id/edit"
      component={Edit}
    />
    <Route exact path="/suppliers/:supplier_id/products" component={List} />
  </Switch>
);
