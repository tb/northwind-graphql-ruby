import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';

import Create from './Create';
import Edit from './Edit';
import List from './List';

export default () => (
  <Switch>
    <Route path="/suppliers/new" component={Create} />
    <Route path="/suppliers/:id" component={Edit} />
    <Route path="/suppliers" component={List} />
    <Redirect from="/" to="/suppliers" />
  </Switch>
);
