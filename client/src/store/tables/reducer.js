import {TYPES} from './actions';
import imm from 'object-path-immutable';

const initialState = {};

export default (state = initialState, {type, payload, meta = {}}) => {
  const {tableName} = meta;

  switch (type) {
    case TYPES.CLEAR: {
      return imm.del(state, tableName);
    }
    case TYPES.ORDER_BY: {
      return imm.assign(state, tableName, {
        orderBy: payload,
        page: 1,
      });
    }
    case TYPES.FILTER: {
      return imm.assign(state, tableName, {
        filter: payload,
        page: 1,
      });
    }
    case TYPES.PAGE: {
      return imm.assign(state, tableName, {
        page: payload,
      });
    }
    case TYPES.PER_PAGE: {
      return imm.assign(state, tableName, {
        page: 1,
        perPage: payload,
      });
    }
    default:
      return state;
  }
};
