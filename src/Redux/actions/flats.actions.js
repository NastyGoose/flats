import axios from 'axios';

export const GET_FLATS = 'GET_FLATS';

export const getFlats = () => (dispatch) => {
  axios.get('http://localhost:8080/flats')
    .then((res) => {
      dispatch({
        type: GET_FLATS,
        payload: res.data,
      });
    })
    .catch((err) => { console.log(err); });
};
