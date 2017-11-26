import {TYPES} from './actions';

const initialState = localStorage.getItem('country');

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.SET: {
      localStorage.setItem('country', payload);
      return payload;
    }
    default:
      return state;
  }
};
