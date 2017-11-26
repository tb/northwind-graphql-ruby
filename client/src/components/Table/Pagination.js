import React from 'react';
import {createUltimatePagination, ITEM_TYPES} from 'react-ultimate-pagination';
import {Input, Label} from 'reactstrap';

const WrapperComponent = ({children}) => (
  <ul className="pagination">{children}</ul>
);

const preventDefault = fn => event => {
  event.preventDefault();
  fn();
};

const Page = ({value, isActive, onClick}) => (
  <li className={isActive ? 'page-item active' : 'page-item'}>
    <a className="page-link" onClick={preventDefault(onClick)}>
      {value}
    </a>
  </li>
);

const PageLink = children => ({onClick}) => (
  <li className="page-item">
    <a className="page-link" onClick={preventDefault(onClick)}>
      {children}
    </a>
  </li>
);

const itemTypeToComponent = {
  [ITEM_TYPES.PAGE]: Page,
  [ITEM_TYPES.ELLIPSIS]: PageLink('...'),
  [ITEM_TYPES.FIRST_PAGE_LINK]: PageLink(<span>&laquo;</span>),
  [ITEM_TYPES.PREVIOUS_PAGE_LINK]: PageLink(<span>&lsaquo;</span>),
  [ITEM_TYPES.NEXT_PAGE_LINK]: PageLink(<span>&rsaquo;</span>),
  [ITEM_TYPES.LAST_PAGE_LINK]: PageLink(<span>&raquo;</span>),
};

const UltimatePaginationBootstrap4 = createUltimatePagination({
  itemTypeToComponent,
  WrapperComponent,
});

const Pagination = props => {
  const {table, totalCount} = props;
  const {page, perPage} = table.params;
  const currentPage = page;
  const totalPages = Math.ceil(totalCount / perPage);

  return (
    <div className="d-flex justify-content-center" style={{height: '50px'}}>
      {totalPages > 1 && (
        <UltimatePaginationBootstrap4
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={table.setPage}
        />
      )}
      {totalCount > 5 && (
        <Label
          for="perPage"
          className="align-self-center"
          style={{marginLeft: '20px', padding: '8px'}}>
          Per Page
        </Label>
      )}
      {totalCount > 5 && (
        <Input
          type="select"
          name="perPage"
          value={perPage}
          onChange={({target: {value}}) =>
            table.setPerPage(parseInt(value, 10))}
          style={{width: '60px'}}>
          {[5, 10, 25, 50, 100].map(n => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </Input>
      )}
    </div>
  );
};

export default Pagination;
