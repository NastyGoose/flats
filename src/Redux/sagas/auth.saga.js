import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SIGN_IN, SIGN_UP, LOGOUT, SET_CURRENT_USER, CHANGE_DATA
} from '../actions/auth.actions';
import API from '../../Components/API/API';

export const SIGN_IN_SUCCEEDED = 'SET_CURRENT_USER_SUCCEEDED';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const SUCCESSFULLY_CHANGED_DATA = 'SUCCESSFULLY_CHANGED_DATA';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';

export function* setCurrentUserAsync(action) {
  try {
    console.log('payload: ', action);
    const favFlats = yield call(API.getFavoriteFlats);
    console.log(favFlats.data);
    console.log('decoded: ', action.decodedToken);
    yield put({
      type: SIGN_IN_SUCCEEDED,
      payload: {
        decodedToken: action.decodedToken,
        favoriteFlats: favFlats.data,
      },
    });
  } catch (error) {
    yield put({ type: 'SIGN_IN_FAILED', error });
  }
}

export function* changeDataAsync(action) {
  try {
    console.log('payload: ', action);
    const newToken = yield call(API.changeData, action);
    yield put({ type: 'SUCCESSFULLY_CHANGED_DATA', newToken });
  } catch (error) {
    console.log(error);
  }
}

export function* signInAsync(action) {
  try {
    console.log('action: ', action);
    const payload = yield call(API.signIn, ...[action.email, action.password]);
    console.log('payload: ', payload);
    yield put({ type: SIGN_IN_SUCCEEDED, payload });
  } catch (error) {
    yield put({ type: 'SIGN_IN_FAILED', error });
  }
}

export function* signUpAsync(action) {
  try {
    const response = yield call(API.signUp, ...[action.email, action.login, action.password]);
    if (response) {
      const payload = yield call(API.signIn, ...[action.email, action.password]);
      yield put({ type: SIGN_IN_SUCCEEDED, payload });
    }
  } catch (error) {
    console.log(error);
    yield put({ type: 'SIGN_UP_FAILED', error });
  }
}

export function* logoutAsync() {
  try {
    yield call(API.logout);
    yield put({ type: 'LOGOUT_SUCCEEDED' });
  } catch (error) {
    yield put({ type: 'LOGOUT_FAILED', error });
  }
}

export function* watchAuthActions() {
  yield [
    takeEvery(SIGN_IN, signInAsync),
    takeEvery(CHANGE_DATA, changeDataAsync),
    takeEvery(LOGOUT, logoutAsync),
    takeEvery(SIGN_UP, signUpAsync),
    takeEvery(SET_CURRENT_USER, setCurrentUserAsync),
  ];
}
