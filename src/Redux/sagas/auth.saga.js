import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SIGN_IN, SIGN_UP, LOGOUT,
} from '../actions/auth.actions';
import API from '../../Components/API/API';

export const SIGN_IN_SUCCEEDED = 'SET_CURRENT_USER';
export const SIGN_IN_FAILED = 'SIGN_IN_FAILED';
export const SIGN_UP_SUCCEEDED = 'SIGN_UP_SUCCEEDED';
export const SIGN_UP_FAILED = 'SIGN_UP_FAILED';
export const LOGOUT_SUCCEEDED = 'LOGOUT_SUCCEEDED';
export const LOGOUT_FAILED = 'LOGOUT_FAILED';


export function* signInAsync(action) {
  try {
    const payload = yield call(API.signIn, ...[action.email, action.password]);
    yield put({ type: SIGN_IN_SUCCEEDED, payload });
  } catch (error) {
    yield put({ type: 'SIGN_IN_FAILED', error });
  }
}

export function* signUpAsync(action) {
  try {
    const response = yield call(API.signUp, ...[action.email, action.login, action.password]);
    yield console.log(response);
    if (response) {
      yield put({ type: SIGN_UP_SUCCEEDED });
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
    takeEvery(LOGOUT, logoutAsync),
    takeEvery(SIGN_UP, signUpAsync),
  ];
}
