import {
  GET_FLATS, GET_BY_ID, ADD_FAVORITE, REMOVE_FAVORITE,
} from '../constants';

export const getFlats = payload => ({
  type: GET_FLATS,
  payload,
});

export const getById = idArr => ({
  type: GET_BY_ID,
  payload: {
    idArr,
  },
});

export const addFavorite = flat => ({
  type: ADD_FAVORITE,
  payload: {
    flat,
  },
});

export const removeFavorite = flat => ({
  type: REMOVE_FAVORITE,
  payload: {
    flat,
  },
});
