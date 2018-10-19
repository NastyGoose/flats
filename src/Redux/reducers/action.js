import { PAGE_INDEX, CHANGE_FILTER_VALUES } from '../constants';

const initialState = {
  pageIndex: 0,
  sortBy: 'Price',
  orderBy: '-1',
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
        pageIndex: action.payload.index,
      };
    default:
      return state;
  }
};
