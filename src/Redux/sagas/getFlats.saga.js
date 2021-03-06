import { call, put, takeEvery } from 'redux-saga/effects';
import {
  GET_BY_ID, REMOVE_FAVORITE, ADD_FAVORITE, GET_FLATS,
  FETCH_BY_ID_SUCCEEDED, FETCH_SUCCEEDED, FETCH_FAILED,
  SUCCESSFULLY_ADDED_FAVORITE, SUCCESSFULLY_REMOVED_FAVORITE,
  FIND_FLAT, FLATS_FOUND_SUCCESSFULLY,
} from '../constants';
import API from '../../Components/API/API';

export function* fetchData(action) {
  try {
    const payload = yield call(API.getFlats, action.payload);
    yield put({ type: FETCH_SUCCEEDED, payload });
  } catch (error) {
    yield put({ type: FETCH_FAILED, error });
  }
}

export function* addNewFavoriteFlat(action) {
  try {
    console.log(action);
    yield call(API.addFavoriteFlat, action.payload.flat._id);
    yield put({ type: SUCCESSFULLY_ADDED_FAVORITE, payload: action.payload });
  } catch (error) {
    console.log(error);
  }
}

export function* removeFavoriteFlat(action) {
  try {
    console.log(action);
    yield call(API.removeFavoriteFlat, action.payload.flat._id);
    yield put({ type: SUCCESSFULLY_REMOVED_FAVORITE, payload: action.payload });
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

export function* findFlatAsync(action) {
  try {
    const payload = yield call(API.findFlat, action.payload);
    yield put({ type: FLATS_FOUND_SUCCESSFULLY, payload });
  } catch (error) {
    console.log(error);
  }
}

export function* watchGetFlats() {
  yield [
    takeEvery(FIND_FLAT, findFlatAsync),
    takeEvery(GET_FLATS, fetchData),
    takeEvery(ADD_FAVORITE, addNewFavoriteFlat),
    takeEvery(REMOVE_FAVORITE, removeFavoriteFlat),
    takeEvery(GET_BY_ID, getByIdAsync),
  ];
}
