import React from 'react';
import {Route, Switch} from 'react-router-dom';

import SignIn from './SignIn';
import SignUp from './SignUp';

export default () => (
  <Switch>
    <Switch>
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/signin" component={SignIn} />
    </Switch>
  </Switch>
);
