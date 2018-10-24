import { call, put, takeEvery } from 'redux-saga/effects';
import {
  SIGN_IN, SIGN_UP, LOGOUT, SET_CURRENT_USER, CHANGE_DATA, PASSWORD_CHECKED,
  SET_CURRENT_USER_SUCCEEDED, SUCCESSFULLY_CHANGED_DATA, LOGOUT_SUCCEEDED, CHECK_PASSWORD,
} from '../constants';
import API from '../../Components/API/API';

export function* setCurrentUserAsync(action) {
  console.log(action);
  try {
    const favFlats = yield call(API.getFavoriteFlats);
    yield put({
      type: SET_CURRENT_USER_SUCCEEDED,
      payload: {
        decodedToken: action.payload,
        favoriteFlats: favFlats.data.payload,
      },
    });
  } catch (error) {
    yield console.log(error);
  }
}

export function* changeDataAsync(action) {
  try {
    const newToken = yield call(API.changeData, action);
    yield put({ type: SUCCESSFULLY_CHANGED_DATA, newToken });
  } catch (error) {
    console.log(error);
  }
}

export function* signInAsync(action) {
  try {
    const payload = yield call(API.signIn, action.payload.email, action.payload.password);
    const favoriteFlats = yield call(API.getFavoriteFlats);
    yield put({
      type: SET_CURRENT_USER_SUCCEEDED,
      payload: {
        decodedToken: payload.token,
        favoriteFlats: favoriteFlats.data,
      },
    });
  } catch (error) {
    yield console.log(error);
  }
}

export function* signUpAsync(action) {
  try {
    const response = yield call(API.signUp, action.payload.email, action.payload.login, action.payload.password);
    if (response) {
      const payload = yield call(API.signIn, action.payload.email, action.payload.password);
      const favoriteFlats = yield call(API.getFavoriteFlats);
      yield put({
        type: SET_CURRENT_USER_SUCCEEDED,
        payload: {
          decodedToken: payload.token,
          favoriteFlats: favoriteFlats.data,
        },
      });
    }
  } catch (error) {
    console.log(error);
    yield console.log(error);
  }
}

export function* logoutAsync() {
  try {
    yield call(API.logout);
    yield put({ type: LOGOUT_SUCCEEDED });
  } catch (error) {
    yield console.log(error);
  }
}

export function* checkPasswordAsync(action) {
  try {
    console.log(action);
    const response = yield call(API.checkPassword, action.payload.email, action.payload.password);
    yield put({ type: PASSWORD_CHECKED, payload: response });
  } catch (error) {
    yield console.log(error);
  }
}

export function* watchAuthActions() {
  yield [
    takeEvery(CHECK_PASSWORD, checkPasswordAsync),
    takeEvery(SIGN_IN, signInAsync),
    takeEvery(CHANGE_DATA, changeDataAsync),
    takeEvery(LOGOUT, logoutAsync),
    takeEvery(SIGN_UP, signUpAsync),
    takeEvery(SET_CURRENT_USER, setCurrentUserAsync),
  ];
}
