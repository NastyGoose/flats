import axios from 'axios';
import { GET_FLATS } from '../../Redux/actions/flats.actions';

export default class API {
  static getFlats = order => (dispatch) => {
    axios.get('http://localhost:8080/flats')
      .then((res) => {
        const payload = sortFlats(res.data, order);
        dispatch({
          type: GET_FLATS,
          payload,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
