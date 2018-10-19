import { combineReducers } from 'redux';
import actions from './action';
import flats from './flats';
import auth from './auth';

const allReducers = combineReducers({
  actions,
  flats,
  auth,
});

export default allReducers;
