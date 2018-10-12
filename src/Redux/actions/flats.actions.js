export const GET_FLATS = 'GET_FLATS';
export const ADD_FAVORITE = 'ADD_FAVORITE';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const GET_BY_ID = 'GET_BY_ID';

export const getFlats = (filter, page) => ({
  type: GET_FLATS,
  payload: {
    filter,
    page,
  },
});

export const getById = idArr => ({
  type: GET_BY_ID,
  payload: {
    idArr,
  },
});

export const addFavorite = id => ({
  type: ADD_FAVORITE,
  payload: {
    id,
  },
});

export const removeFavorite = id => ({
  type: REMOVE_FAVORITE,
  payload: {
    id,
  },
});
