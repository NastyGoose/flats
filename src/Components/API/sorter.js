import lodash from 'lodash';

export default class Sorter {
  sortFlats = (flats, order) => {
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
}
