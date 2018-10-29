import { PAGE_INDEX, CHANGE_FILTER_VALUES, CHANGE_MODAL_STATE } from '../constants';

const initialState = {
  pageIndex: 0,
  sortBy: 'Price',
  orderBy: 'desc',
  chunksSize: 20,
  minPrice: 0,
  maxPrice: 999,
  address: '',
  modalState: false,
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
        address: action.payload.filter.address,
        pageIndex: 0,
      };
    case PAGE_INDEX:
      return {
        ...state,
        pageIndex: action.payload.index,
      };
    case CHANGE_MODAL_STATE:
      console.log(action);
      return {
        ...state,
        modalState: action.payload,
      };
    default:
      return state;
  }
};
