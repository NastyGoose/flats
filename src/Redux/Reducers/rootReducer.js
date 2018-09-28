import { combineReducers } from 'redux';
import actions from './actionReducer';
import flats from './flatsReducers';
import auth from './authReducer';

const allReducers = combineReducers({
  actions,
  flats,
  auth,
});

export default allReducers;
