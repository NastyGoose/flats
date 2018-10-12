import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_BY_ID, REMOVE_FAVORITE, ADD_FAVORITE, GET_FLATS,
} from '../actions/flats.actions';
import API from '../../Components/API/API';

export const FETCH_BY_ID_SUCCEEDED = 'FETCH_BY_ID_SUCCEED';
export const FETCH_SUCCEEDED = 'FETCH_SUCCEEDED';
export const FETCH_FAILED = 'FETCH_FAILED';

export function* fetchData(action) {
  try {
    const payload = yield call(API.getFlats, action.payload);
    yield put({ type: 'FETCH_SUCCEEDED', payload });
  } catch (error) {
    yield put({ type: 'FETCH_FAILED', error });
  }
}

export function* addNewFavoriteFlat(action) {
  try {
    yield call(API.addFavoriteFlat, action.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* removeFavoriteFlat(action) {
  try {
    yield call(API.removeFavoriteFlat, action.payload);
  } catch (error) {
    console.log(error);
  }
}

export function* getByIdAsync(action) {
  try {
    const payload = yield call(API.getById, action.payload);
    yield put({ type: FETCH_BY_ID_SUCCEEDED, payload });
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetFlats() {
  yield [
    takeEvery(GET_FLATS, fetchData),
    takeEvery(ADD_FAVORITE, addNewFavoriteFlat),
    takeEvery(REMOVE_FAVORITE, removeFavoriteFlat),
    takeEvery(GET_BY_ID, getByIdAsync),
  ];
}
