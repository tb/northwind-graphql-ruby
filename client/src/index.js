import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './containers/App/App';

import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({ uri: '/graphql' });
const middlewareLink = setContext(() => ({
  headers: {
    authorization: localStorage.getItem('token') || null,
  }
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
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
