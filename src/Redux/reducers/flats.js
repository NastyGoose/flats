import {
  FETCH_BY_ID_SUCCEEDED, FETCH_SUCCEEDED, FETCH_FAILED, FLATS_FOUND_SUCCESSFULLY,
} from '../constants';

// noinspection JSAnnotator
const initialState = {
  flatsList: [],
  pages: {
    startIndex: undefined,
    endIndex: undefined,
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
      console.log(action);
      if (action.payload.data.success) {
        return {
          ...state,
          flatsList: [...action.payload.data.flats],
          pages: {
            startIndex: action.payload.data.pagesIndexes.startIndex,
            endIndex: action.payload.data.pagesIndexes.endIndex,
          },
          lastIndex: action.payload.data.lastIndex,
        };
      }
      return {
        ...state,
        flatsList: action.payload.data.flats,
        pages: {
          startIndex: 0,
          endIndex: 0,
        },
        lastIndex: 0,
      };
    case FETCH_FAILED:
      return [...state, ...action.payload];
    case FLATS_FOUND_SUCCESSFULLY:
      console.log(action);
      if (action.payload.data.success) {
        return {
          ...state,
          flatsList: [...action.payload.data.payload.flats],
          pages: {
            startIndex: action.payload.data.payload.pagesIndexes.startIndex,
            endIndex: action.payload.data.payload.pagesIndexes.endIndex,
          },
          lastIndex: action.payload.data.payload.lastIndex,
        };
      }
      return {
        ...state,
        flatsList: action.payload.data.message,
      };
    default:
      return state;
  }
};
