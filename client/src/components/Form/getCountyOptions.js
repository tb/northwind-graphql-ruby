import {map, sortBy} from 'lodash';
import countries from 'utils/countries';

export default ({
  includeBlank = {},
  blank = {value: '', label: ''},
  values = null,
}) =>
  (includeBlank ? [blank] : [])
    .concat(
      sortBy(
        map(countries, (c, value) => ({
          value,
          label: `${c.name}`,
        })),
        'label',
      ),
    )
    .filter(({value}) => !values || values.includes(value));
