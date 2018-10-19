import {
  CHECK_PASSWORD, SET_CURRENT_USER, CHANGE_DATA, SIGN_IN, SIGN_UP, LOGOUT,
} from '../constants';

export function setCurrentUser(decodedToken) {
  return {
    type: SET_CURRENT_USER,
    payload: decodedToken,
  };
}

export function changeData(payload) {
  return {
    type: CHANGE_DATA,
    payload,
  };
}

export function signIn(email, password) {
  console.log('dispatched');
  return {
    type: SIGN_IN,
    payload: {
      email,
      password,
    },
  };
}

export function signUp(login, email, password) {
  return {
    type: SIGN_UP,
    payload: {
      email,
      login,
      password,
    },
  };
}

export function checkPassword(email, password) {
  return {
    type: CHECK_PASSWORD,
    payload: {
      email,
      password,
    },
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
