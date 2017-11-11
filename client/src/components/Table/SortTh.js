import React from 'react';

export default ({field, children, table, ...thProps}) => {
  const {params: {orderBy}} = table;
  const sorted = field => field === orderBy || `-${field}` === orderBy;
  const sortedAsc = orderBy && orderBy[0] !== '-';

  const toggleSort = e => {
    if (field === orderBy) {
      table.setOrderBy(sortedAsc ? `-${field}` : field);
    } else {
      table.setOrderBy(field);
    }
  };

  return (
    <th onClick={toggleSort} {...thProps}>
      {children}&nbsp;
      {sorted(field) && !sortedAsc && <span>&#9650;</span>}
      {sorted(field) && sortedAsc && <span>&#9660;</span>}
    </th>
  );
};
