export const FILTER_CHANGED = 'FILTER_CHANGED';
export const PAGE_INDEX = 'PAGE_INDEX';

export const changeFilter = (payload, page) => (dispatch) => {
  dispatch({
    type: 'FILTER_CHANGED',
    payload,
    page,
  });
};

export const changePage = (newIndex, filter) => (dispatch) => {
  dispatch({
    type: 'PAGE_INDEX',
    payload: newIndex,
    filter,
  });
};
