import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../Components/utils/setAuthorizationToken';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user,
  };
}

export const signIn = (email, password) => (dispatch) => {
  axios.post('http://localhost:8080/api/account/signin', {
    email,
    password,
  })
    .then((response) => {
      console.log(response);
      const token = response.data.token;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
    })
    .catch((error) => {
      console.log(error);
    });
};

export const signUp = (login, email, password) => (dispatch) => {
  axios.post('http://localhost:8080/api/account/signup', {
    login,
    email,
    password,
  })
    .then((response) => {
      console.log(response);
      signIn(email, password);
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => (dispatch) => {
  const url = `http://localhost:8080/api/account/logout?token=${localStorage.jwtToken}`;
  axios.get(url)
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err));
};
