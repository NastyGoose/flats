import { combineReducers } from 'redux';
import actions from '../actions/actionHandler';
import flats from './flatsReducers';

const allReducers = combineReducers({
  actions,
  flats,
});

export default allReducers;
