import { FILTER_CHANGED, PAGE_INDEX, CHANGE_MODAL_STATE } from '../constants';

export function changeModalState(state) {
  return {
    type: CHANGE_MODAL_STATE,
    payload: state,
  };
}

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
