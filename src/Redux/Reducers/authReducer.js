import { SET_CURRENT_USER } from '../actions/authActions';
import lodash from 'lodash';

const initialState = {
  isAuthenticated: false,
  user: {},
};

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: !lodash.isEmpty(action.user),
        user: action.user,
      };
    default: return state;
  }
};