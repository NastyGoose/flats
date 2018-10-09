import axios from 'axios';

export default function setAuthorizationToken(token) {
  if (token) {
    console.log('here');
    axios.defaults.headers.common.Authorization = token;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}
