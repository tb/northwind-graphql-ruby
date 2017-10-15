import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './containers/App/App';

import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({
  uri: '/graphql',
});

const client = new ApolloClient({
  networkInterface,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <HashRouter>
      <Switch>
        <Route path="/" component={App}/>
      </Switch>
    </HashRouter>
  </ApolloProvider>,
  document.getElementById('root')
);
registerServiceWorker();
