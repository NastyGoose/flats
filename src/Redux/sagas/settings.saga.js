import { put, takeEvery } from 'redux-saga/effects';
import {
  FILTER_CHANGED, PAGE_INDEX, GET_FLATS, CHANGE_FILTER_VALUES,
} from '../constants';

export function* changeIndexAsync(action) {
  try {
    yield put({
      type: GET_FLATS,
      payload: action.payload,
    });
  } catch (error) {
    yield console.log(error);
  }
}

export function* changeFilterAsync(action) {
  try {
    yield put({
      type: GET_FLATS,
      payload: {
        filter: action.payload.filter,
        index: action.payload.index,
      },
    });
    yield put({ type: CHANGE_FILTER_VALUES, payload: action.payload });
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchChangePage() {
  yield [
    takeEvery(PAGE_INDEX, changeIndexAsync),
    takeEvery(FILTER_CHANGED, changeFilterAsync),
  ];
}
