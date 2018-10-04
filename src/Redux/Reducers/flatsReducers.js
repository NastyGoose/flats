import { GET_FLATS } from '../actions/flats.actions';
const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FLATS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
