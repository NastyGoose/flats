export const SHOW_SETTINGS = 'SHOW_SETTINGS';

export const changeState = () => {
  return (dispatch) => {
    dispatch({
      type: 'SHOW_SETTINGS'
    });
  };
};
