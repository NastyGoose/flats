export const SIGN_IN = 'SIGN_IN';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const SIGN_UP = 'SIGN_UP';
export const LOGOUT = 'LOGOUT';

export function setCurrentUser(decodedToken) {
  return {
    type: SET_CURRENT_USER,
    decodedToken,
  };
}

export function signIn(email, password) {
  console.log('dispatched');
  return {
    type: SIGN_IN,
    email,
    password,
  };
}

export function signUp(login, email, password) {
  return {
    type: SIGN_UP,
    email,
    login,
    password,
  };
}

export function logout() {
  return {
    type: LOGOUT,
  };
}
