export const GET_FLATS = 'GET_FLATS';

export const getFlats = () => {
  console.log('dispatching GET_FLATS');
  return {
    type: GET_FLATS,
  };
};
