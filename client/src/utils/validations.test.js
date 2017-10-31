import {flattenErrors} from './validations';

describe('validations', () => {
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
