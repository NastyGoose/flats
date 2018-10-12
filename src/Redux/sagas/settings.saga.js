import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_FLATS } from '../actions/flats.actions';

export const CHANGE_FILTER_VALUES = 'CHANGE_FILTER_VALUES';
export const FETCH_FAILED = 'FETCH_FAILED';

export function* changePageAsync(action) {
  try {
    console.log(action);
    yield put({
      type: GET_FLATS,
      payload: {
        filter: action.filter,
        page: action.payload,
      },
    });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* changeFilterAsync(action) {
  try {
    yield put({
      type: GET_FLATS,
      payload: {
        filter: action.payload,
        page: action.page,
      },
    });
    yield put({ type: 'CHANGE_FILTER_VALUES', payload: action.payload });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* watchChangePage() {
  yield [
    takeEvery('PAGE_INDEX', changePageAsync),
    takeEvery('FILTER_CHANGED', changeFilterAsync),
  ];
}
