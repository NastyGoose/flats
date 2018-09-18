import { SHOW_SETTINGS, PAGE_INDEX, SIGN_FORM } from './settings.action';

const initialState = {
  showSettings: false,
  pageIndex: 0,
  signForm: 'loginForm',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SETTINGS:
      return {
        ...state,
        showSettings: !state.showSettings,
      };
    case PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload,
      };
    case SIGN_FORM:
      return {
        ...state,
        signForm: action.payload,
      };
    default:
      return state;
  }
};
