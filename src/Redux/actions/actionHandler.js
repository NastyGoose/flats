import { SHOW_SETTINGS } from './settings.action';

const initialState = {
  showSettings: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_SETTINGS:
      return {
        ...state,
        showSettings: !state.showSettings
      };
    default:
      return state;
  }
};
