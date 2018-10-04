import { call, put, takeEvery } from 'redux-saga/effects';
import { GET_FLATS } from '../actions/flats.actions';
import API from '../../Components/API/API';

export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED';
export const FETCH_FAILED = 'FETCH_FAILED';

export function* fetchData() {
  try {
    const payload = yield call(API.getFlats);
    yield put({ type: 'FETCH_SUCCEEDED', payload });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* watchGetFlats() {
  yield takeEvery('GET_FLATS', fetchData);
}
