import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import country from './country/reducer';
import tables from './tables/reducer';

export default createStore(
  combineReducers({
    country,
    tables,
  }),
  composeWithDevTools(applyMiddleware()),
);
