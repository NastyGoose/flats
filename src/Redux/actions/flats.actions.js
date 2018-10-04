import axios from 'axios';
import lodash from 'lodash';

export const GET_FLATS = 'GET_FLATS';

const sortFlats = (flats, order) => {
  let sortedFlats = [];
  switch (order) {
    case 'Newest':
      sortedFlats = lodash.orderBy(flats, ['UpdateDate'], ['desc']);
      return sortedFlats;
    case 'Oldest':
      sortedFlats = lodash.orderBy(flats, ['UpdateDate'], ['asc']);
      return sortedFlats;
    case 'PriceAsc':
      sortedFlats = lodash.orderBy(flats, ['Price'], ['asc']);
      return sortedFlats;
    case 'PriceDesc':
      sortedFlats = lodash.orderBy(flats, ['UpdateDate'], ['asc']);
      return sortedFlats;
    default:
      return flats;
  }
};

export const getFlats = order => (dispatch) => {
  axios.get('http://localhost:8080/flats')
    .then((res) => {
      const payload = sortFlats(res.data, order);
      dispatch({
        type: GET_FLATS,
        payload,
      });
    })
    .catch((err) => { console.log(err); });
};
