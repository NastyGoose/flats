export const FILTER_CHANGED = 'FILTER_CHANGED';
export const PAGE_INDEX = 'PAGE_INDEX';

export const changeFilter = payload => (dispatch) => {
  dispatch({
    type: 'FILTER_CHANGED',
    payload,
  });
};

export const changePage = newIndex => (dispatch) => {
  dispatch({
    type: 'PAGE_INDEX',
    payload: newIndex,
  });
};
