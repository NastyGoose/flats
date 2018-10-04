import axios from 'axios';

export default class API {
  static getFlats = () => axios.get('http://localhost:8080/flats')
    .then(res => res,
      // const payload = sortFlats(res.data, order);
    )
    .catch((err) => {
      console.log(err);
    });
}
