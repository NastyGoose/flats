export const SHOW_SETTINGS = 'SHOW_SETTINGS';
export const PAGE_INDEX = 'PAGE_INDEX';
export const SIGN_FORM = 'SIGN_FORM';

export const changeState = () => (dispatch) => {
  dispatch({
    type: 'SHOW_SETTINGS',
  });
};

export const changePage = newIndex => (dispatch) => {
  dispatch({
    type: 'PAGE_INDEX',
    payload: newIndex,
  });
};

export const changeForm = formLabel => (dispatch) => {
  dispatch({
    type: 'SIGN_FORM',
    payload: formLabel,
  });
};
