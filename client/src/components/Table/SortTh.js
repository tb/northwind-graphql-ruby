import React from 'react';

export default ({field, children, sort, onSort, ...thProps}) => {
  const sorted = field => field === sort || `-${field}` === sort;
  const sortedAsc = sort && sort[0] !== '-';

  const toggleSort = e => {
    if (field === sort) {
      onSort(sortedAsc ? `-${field}` : field);
    } else {
      onSort(field);
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
