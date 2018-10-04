import { call, put, takeEvery } from 'redux-saga/effects';
import {GET_FLATS, getFlats} from '../actions/flats.actions';
import axios from 'axios';



export function* fetchData(action) {
  try {
    const data = yield call(getFlats);
    yield put({ type: 'FETCH_SUCCEEDED', data });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* watchGetFlats() {
  yield takeEvery('GET_FLATS', fetchData);
}
