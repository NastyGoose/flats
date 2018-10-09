import { FETCH_SUCCEEDED, FETCH_FAILED } from '../sagas/getFlats.saga';

const initialState = {
  flatsList: [],
  pages: {
    startIndex: undefined,
    endIndex: undefined,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCEEDED:
      console.log('reducer: ', action.payload.data);
      return {
        ...state,
        flatsList: [...action.payload.data.flats],
        pages: {
          startIndex: action.payload.data.pagesIndexes.startIndex,
          endIndex: action.payload.data.pagesIndexes.endIndex,
        },
      };
    case FETCH_FAILED:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
