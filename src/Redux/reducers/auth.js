import lodash from 'lodash';
import {
  SET_CURRENT_USER_SUCCEEDED, LOGOUT_SUCCEEDED, SUCCESSFULLY_CHANGED_DATA,
  SUCCESSFULLY_REMOVED_FAVORITE, SUCCESSFULLY_ADDED_FAVORITE, PASSWORD_CHECKED
} from '../constants';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: [],
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case PASSWORD_CHECKED:
      console.log(action);
      return {
        ...state,
        passwordValid: action.payload.data.success,
      };
    case SET_CURRENT_USER_SUCCEEDED:
      return {
        ...state,
        isAuthenticated: !lodash.isEmpty(action.payload.decodedToken),
        user: action.payload.decodedToken,
        favoriteFlats: action.payload.favoriteFlats,
      };
    case SUCCESSFULLY_CHANGED_DATA:
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
    case SUCCESSFULLY_ADDED_FAVORITE:
      console.log(action);
      state.favoriteFlats.push(action.payload.flat);
      return {
        ...state,
        favoriteFlats: state.favoriteFlats,
      };
    case SUCCESSFULLY_REMOVED_FAVORITE:
      console.log(action);
      state.favoriteFlats.splice(state.favoriteFlats.indexOf(action.payload.flat), 1);
      return {
        ...state,
        favoriteFlats: state.favoriteFlats,
      };
    default: return state;
  }
};
