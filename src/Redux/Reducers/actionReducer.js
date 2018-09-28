import { SHOW_SETTINGS, PAGE_INDEX } from '../actions/settings.action';

const initialState = {
  showSettings: false,
  pageIndex: 0,
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
    default:
      return state;
  }
};
