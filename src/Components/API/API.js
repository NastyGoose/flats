import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utilitaryLogic/setAuthorizationToken';

export default class API {
  static getFlats = payload => axios
    .get(`http://localhost:8080/flats?input=${payload.filter.sort},${payload.filter.order},${payload.chunksSize},${payload.page}`)
    .then((res) => {
      console.log(res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  static signIn = (email, password) => {
    axios.post('http://localhost:8080/api/account/signin', {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem('jwtToken', response.data.token);
          setAuthorizationToken(response.data.token);
          window.location.href = 'http://localhost:3000/';
          return jwt.decode(response.data.token);
        }
        return alert('Wrong password or email!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static signUp = (email, login, password) => axios.post('http://localhost:8080/api/account/signup', {
    email,
    login,
    password,
  })
    .then((response) => {
      console.log(response);
      return response.data.success;
    })
    .catch((error) => {
      console.log(error);
    });

  static logout = () => {
    const url = `http://localhost:8080/api/account/logout?token=${localStorage.jwtToken}`;
    localStorage.removeItem('jwtToken');
    axios.get(url)
      .then((response) => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };
}
