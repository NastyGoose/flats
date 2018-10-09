export const GET_FLATS = 'GET_FLATS';

export const getFlats = (filter, chunksSize, page) => ({
  type: GET_FLATS,
  payload: {
    filter,
    chunksSize,
    page,
  },
});
