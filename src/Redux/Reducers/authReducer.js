import lodash from 'lodash';
import {
  SIGN_IN_SUCCEEDED, LOGOUT_SUCCEEDED, SUCCESSFULLY_CHANGED_DATA,
} from '../sagas/auth.saga';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SIGN_IN_SUCCEEDED:
      console.log('in reducer: ', action);
      return {
        ...state,
        isAuthenticated: !lodash.isEmpty(action.payload.decodedToken),
        user: action.payload.decodedToken,
        favoriteFlats: action.payload.favoriteFlats,
      };
    case SUCCESSFULLY_CHANGED_DATA:
      console.log('in reducer: ', action);
      return {
        ...state,
        user: action.newToken,
      };
    case LOGOUT_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default: return state;
  }
};
