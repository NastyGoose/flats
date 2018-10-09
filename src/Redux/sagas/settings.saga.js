import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_FLATS } from '../actions/flats.actions';
import API from '../../Components/API/API';

export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED';
export const FETCH_FAILED = 'FETCH_FAILED';

export function* changePageAsync(action) {
  try {
    const payload = yield call(API.getFlats, action.payload);
    yield put({ type: 'GET_FLATS', payload: action.payload });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* watchChangePage() {
  yield takeEvery('PAGE_INDEX', changePageAsync);
}
