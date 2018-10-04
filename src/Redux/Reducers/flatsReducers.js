import { FETCH_SUCCEEDED, FETCH_FAILED } from '../sagas/getFlats.saga';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SUCCEEDED:
      return [...state, ...action.payload.data];
    case FETCH_FAILED:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
