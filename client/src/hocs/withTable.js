import {connect} from 'react-redux';
import {
  clear,
  setPage,
  setPerPage,
  setOrderBy,
  setFilter,
} from '../store/tables/actions';

export const withTable = (tableName, initialState) => WrappedComponent => {
  const mapStateToProps = state => ({
    params: {...initialState, ...state.tables[tableName]},
  });

  const mapDispatchToProps = {
    clear: () => clear(tableName),
    setFilter: filter => setFilter(tableName, filter),
    setOrderBy: orderBy => setOrderBy(tableName, orderBy),
    setPage: page => setPage(tableName, page),
    setPerPage: perPage => setPerPage(tableName, perPage),
  };

  const mergeProps = (stateProps, dispatchProps, ownProps) => ({
    table: {
      ...stateProps,
      ...dispatchProps,
    },
    ...ownProps,
  });

  return connect(mapStateToProps, mapDispatchToProps, mergeProps)(
    WrappedComponent,
  );
};
