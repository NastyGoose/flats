import { PAGE_INDEX, CHANGE_FILTER_VALUES } from '../constants';

const initialState = {
  pageIndex: 0,
  sortBy: 'Price',
  orderBy: '-1',
  chunksSize: 20,
  minPrice: 0,
  maxPrice: 999,
};


export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_FILTER_VALUES:
      console.log(action);
      return {
        ...state,
        sortBy: action.payload.filter.sortBy,
        orderBy: action.payload.filter.orderBy,
        chunksSize: action.payload.filter.chunksSize,
        minPrice: action.payload.filter.minPrice,
        maxPrice: action.payload.filter.maxPrice,
        pageIndex: 0,
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
