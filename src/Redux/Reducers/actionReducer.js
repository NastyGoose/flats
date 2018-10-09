import { PAGE_INDEX } from '../actions/settings.action';
import { FILTER_CHANGED } from '../actions/settings.action';

const initialState = {
  pageIndex: 0,
  sortBy: '',
  orderBy: null,
  chunksSize: 20,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload,
      };
    default:
      return state;
  }
};
