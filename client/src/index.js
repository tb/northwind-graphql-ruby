import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ApolloClient} from 'apollo-client';
import {createHttpLink} from 'apollo-link-http';
import {setContext} from 'apollo-link-context';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloProvider} from 'react-apollo';
import {Provider} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from 'components/App';
import store from 'store';

import registerServiceWorker from './registerServiceWorker';

const httpLink = createHttpLink({uri: '/graphql'});
const middlewareLink = setContext(() => ({
  headers: {
    authorization: localStorage.getItem('token') || null,
  },
}));

const client = new ApolloClient({
  link: middlewareLink.concat(httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <Provider store={store}>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
