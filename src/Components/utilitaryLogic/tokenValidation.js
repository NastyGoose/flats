import jwt from 'jsonwebtoken';
import setAuthorizationToken from './setAuthorizationToken';

export default function validate() {
  if (localStorage.jwtToken) {
    const token = jwt.decode(localStorage.jwtToken);
    if (token) {
      if (token.login && token.email && token.iat) {
        setAuthorizationToken(localStorage.jwtToken);
        return true;
      }
    }
    return false;
  }
  return false;
}
