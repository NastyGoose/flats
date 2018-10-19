import { FETCH_BY_ID_SUCCEEDED, FETCH_SUCCEEDED, FETCH_FAILED } from '../constants';

// noinspection JSAnnotator
const initialState = {
  flatsList: [],
  pages: {
    startIndex: undefined,
    endIndex: undefined,
  },
  filter: {
    sortBy: 'Price',
    orderBy: -1,
    chunksSize: 20,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BY_ID_SUCCEEDED:
      return {
        ...state,
        recentFlats: [...action.payload.data],
      };
    case FETCH_SUCCEEDED:
      return {
        ...state,
        flatsList: [...action.payload.data.flats],
        pages: {
          startIndex: action.payload.data.pagesIndexes.startIndex,
          endIndex: action.payload.data.pagesIndexes.endIndex,
        },
        lastIndex: action.payload.data.lastIndex,
      };
    case FETCH_FAILED:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
