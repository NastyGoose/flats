import lodash from 'lodash';
import {
  SIGN_IN_SUCCEEDED, SIGN_IN_FAILED,
  SIGN_UP_SUCCEEDED, SIGN_UP_FAILED,
  LOGOUT_SUCCEEDED, LOGOUT_FAILED,
} from '../sagas/auth.saga';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_IN_SUCCEEDED:
      return {
        isAuthenticated: !lodash.isEmpty(action.decodedToken),
        user: action.decodedToken,
      };
    case SIGN_IN_FAILED:
      return {
        errors: action.error,
      };
    case LOGOUT_SUCCEEDED:
      return {
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_FAILED:
      return {
        errors: action.error,
      };
    case SIGN_UP_FAILED:
      return {
        errors: action.error,
      };
    default: return state;
  }
};
