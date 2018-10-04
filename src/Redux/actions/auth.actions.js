import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../../Components/API/setAuthorizationToken';

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
      if (response.data.success) {
        const token = response.data.token;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        window.location.href = 'http://localhost:3000/';
      } else {
        alert('Wrong password or email!');
      }
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
      if (response.data.success) {
        dispatch(signIn(email, password));
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

export const logout = () => () => {
  const url = `http://localhost:8080/api/account/logout?token=${localStorage.jwtToken}`;
  localStorage.removeItem('jwtToken');
  axios.get(url)
    .then((response) => {
      console.log(response);
    })
    .catch(err => console.log(err));
};
