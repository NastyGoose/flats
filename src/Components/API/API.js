import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utilitaryLogic/setAuthorizationToken';
import { BrowserRouter } from 'react-router-dom';

const host = process.env.REACT_APP_FLATS_HOST;

export default class API {
  static getById = (payload) => {
    console.log(payload);
    return axios
      .get(`${host}/getById/${JSON.stringify(payload)}`)
      .then((res) => {
        console.log('response: ', res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static getFlats = payload => axios
    .get(`${host}/flats/${payload.filter.sortBy}/${payload.filter.orderBy}/${payload.filter.chunksSize}/${payload.index}`)
    .then((res) => {
      console.log('response: ', res);
      return res;
    })
    .catch((err) => {
      console.log(err);
    });

  static addFavoriteFlat = (id) => {
    const { email } = jwt.decode(localStorage.jwtToken);
    axios.post(`${host}/newFavorite`, {
      email,
      ...id,
    })
      .then((res) => {
        console.log(res);
      });
  };

  static changeData = (payload) => {
    const newData = payload;
    newData.oldEmail = jwt.decode(localStorage.getItem('jwtToken')).email;
    console.log(newData);
    return axios.post(`${host}/api/account/changeData`, {
      newData,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('jwtToken', res.data.payload);
        return jwt.decode(localStorage.getItem('jwtToken'));
      });
  };

  static removeFavoriteFlat = (id) => {
    const { email } = jwt.decode(localStorage.jwtToken);
    axios.post(`${host}/removeFavorite`, {
      email,
      ...id,
    })
      .then((res) => {
        console.log(res);
      });
  };

  static getFavoriteFlats = () => {
    const { email } = jwt.decode(localStorage.jwtToken);
    return axios.get(`${host}/getFavorite/${email}`)
      .then((res) => {
        console.log(res);
        return res;
      });
  };

  static signIn = (email, password) => {
    console.log('email: ', email);
    console.log('password: ', password);
    return axios.post(`${host}/api/account/signin`, {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem('jwtToken', response.data.token);
          setAuthorizationToken(response.data.token);
          // window.location.href = 'http://localhost:3000/';
          return {
            token: jwt.decode(response.data.token),
            favoriteFlats: response.data.favoriteFlats,
          };
        }
        return alert('Wrong password or email!');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  static signUp = (email, login, password) => axios.post(`${host}/api/account/signup`, {
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
    const url = `${host}/api/account/logout?token=${localStorage.jwtToken}`;
    localStorage.removeItem('jwtToken');
    axios.get(url)
      .then((response) => {
        console.log(response);
      })
      .catch(err => console.log(err));
  };

  static checkPassword = (email, password) => {
    const url = `${host}/api/account/checkPassword/${email}/${password}`;
    return axios.get(url)
      .then((response) => {
        console.log(response);
        return response;
      })
      .catch(err => console.log(err));
  };
}
