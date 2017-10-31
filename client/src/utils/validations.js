import {mapKeys} from 'lodash';

export const flattenErrors = errors =>
  mapKeys(errors, (value, key) => key.split('.').pop());
