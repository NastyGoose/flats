export const GET_FLATS = 'GET_FLATS';

export const getFlats = () => {
  return (dispatch) => {
    dispatch({
      type: GET_FLATS,
      payload: ['blah', 'blah', 'blah']
    });
  };
};
