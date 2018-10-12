import axios from 'axios';
import jwt from 'jsonwebtoken';
import setAuthorizationToken from '../utilitaryLogic/setAuthorizationToken';

export default class API {
  static getById = (payload) => {
    console.log(payload);
    return axios
      .get(`http://localhost:8080/getById/${JSON.stringify(payload)}`)
      .then((res) => {
        console.log('response: ', res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static getFlats = (payload) => {
    console.log(payload);
    return axios
      .get(`http://localhost:8080/flats/${payload.filter.sort}/${payload.filter.order}/${payload.filter.chunksSize}/${payload.page}`)
      .then((res) => {
        console.log('response: ', res);
        return res;
      })
      .catch((err) => {
        console.log(err);
      });
  };

  static addFavoriteFlat = (id) => {
    const { email } = jwt.decode(localStorage.jwtToken);
    axios.post('http://localhost:8080/newFavorite', {
      email,
      ...id,
    })
      .then((res) => {
        console.log(res);
      });
  };

  static changeData = (payload) => {
    console.log(payload);
    return axios.post('http://localhost:8080/api/account/changeData', {
      payload,
    })
      .then((res) => {
        console.log(res);
        localStorage.setItem('jwtToken', res.data);
        return jwt.decode(res.data);
      });
  };

  static removeFavoriteFlat = (id) => {
    const { email } = jwt.decode(localStorage.jwtToken);
    axios.post('http://localhost:8080/removeFavorite', {
      email,
      ...id,
    })
      .then((res) => {
        console.log(res);
      });
  };

  static getFavoriteFlats = () => {
    const { email } = jwt.decode(localStorage.jwtToken);
    console.log(email);
    return axios.get(`http://localhost:8080/getFavorite/${email}`)
      .then((res) => {
        console.log(res);
        return res;
      });
  };

  static signIn = (email, password) => {
    console.log(email, password);
    return axios.post('http://localhost:8080/api/account/signin', {
      email,
      password,
    })
      .then((response) => {
        console.log(response);
        if (response.data.success) {
          localStorage.setItem('jwtToken', response.data.token);
          setAuthorizationToken(response.data.token);
          window.location.href = 'http://localhost:3000/';
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
