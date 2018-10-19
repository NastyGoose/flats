import { FILTER_CHANGED, PAGE_INDEX } from '../constants';

export function changeFilter(payload) {
  return {
    type: FILTER_CHANGED,
    payload,
  };
}

export function changeIndex(payload) {
  return {
    type: PAGE_INDEX,
    payload,
  };
}
