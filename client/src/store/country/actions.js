export const TYPES = {
  SET: 'country/SET',
};

export const setCountry = country => ({
  type: TYPES.SET,
  payload: country,
});
