import {flattenErrors} from '../apolloHelpers';

describe('apollo helpers', () => {
  test('flatten errors', () => {
    expect(
      flattenErrors({
        name: 'required',
        'contact.email': 'required',
      }),
    ).toEqual({
      name: 'required',
      email: 'required',
    });
  });
});
