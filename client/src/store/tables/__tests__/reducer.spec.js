import {clear, setFilter, setOrderBy, setPage, setPerPage} from '../actions';
import reducer from '../reducer';

const emptyState = {};

const notEmptyState = {
  t1: {
    orderBy: '-id',
    page: 1,
  },
  t2: {
    orderBy: '-id',
    page: 1,
  },
};

describe('tables reducer', () => {
  test('clear', () => {
    expect(reducer(notEmptyState, clear('t1'))).toEqual({
      t2: notEmptyState.t2,
    });
  });

  test('updateSort', () => {
    expect(reducer(emptyState, setOrderBy('t1', '-id'))).toEqual({
      t1: {
        orderBy: '-id',
        page: 1,
      },
    });
  });

  test('setFilter', () => {
    expect(
      reducer(emptyState, setFilter('t1', {nameStartsWith: 'a'})),
    ).toEqual({
      t1: {
        filter: {nameStartsWith: 'a'},
        page: 1,
      },
    });
  });

  test('setPage', () => {
    expect(reducer(emptyState, setPage('t1', 50))).toEqual({
      t1: {
        page: 50,
      },
    });
  });

  test('setPerPage', () => {
    expect(reducer(emptyState, setPerPage('t1', 100))).toEqual({
      t1: {
        page: 1,
        perPage: 100,
      },
    });
  });
});
