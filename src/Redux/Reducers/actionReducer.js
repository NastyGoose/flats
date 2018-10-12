import { PAGE_INDEX } from '../actions/settings.action';
import { CHANGE_FILTER_VALUES } from '../sagas/settings.saga';

const initialState = {
  pageIndex: 0,
  sortBy: '',
  orderBy: null,
  chunksSize: 20,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_VALUES:
      return {
        ...state,
        sortBy: action.payload.sort,
        orderBy: action.payload.order,
        chunksSize: action.payload.chunksSize,
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
