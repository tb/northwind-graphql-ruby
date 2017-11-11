export const TYPES = {
  CLEAR: 'tables/CLEAR',
  FILTER: 'tables/FILTER',
  ORDER_BY: 'tables/ORDER_BY',
  PAGE: 'table/PAGE',
  PER_PAGE: 'table/PERPAGE',
};

export const clear = tableName => ({
  type: TYPES.CLEAR,
  meta: {tableName},
});

export const setFilter = (tableName, filter) => ({
  type: TYPES.FILTER,
  payload: filter,
  meta: {tableName},
});

export const setOrderBy = (tableName, orderBy) => ({
  type: TYPES.ORDER_BY,
  payload: orderBy,
  meta: {tableName},
});

export const setPage = (tableName, page) => ({
  type: TYPES.PAGE,
  payload: page,
  meta: {tableName},
});

export const setPerPage = (tableName, perPage) => ({
  type: TYPES.PER_PAGE,
  payload: perPage,
  meta: {tableName},
});
