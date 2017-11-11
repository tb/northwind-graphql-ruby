import {applyMiddleware, combineReducers, createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import tables from './tables/reducer';

export default createStore(
  combineReducers({
    tables,
  }),
  composeWithDevTools(applyMiddleware()),
);
