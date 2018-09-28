import { createSelector } from 'reselect';

const getBar = (state, props) => state.foo.bar.find(b => b.id === props.id);

export const makeGetBarState = () => createSelector(
  getBar,
  bar => ({ bar }),
);
