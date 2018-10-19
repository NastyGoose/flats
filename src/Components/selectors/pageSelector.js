import { createSelector } from 'reselect';
​​
const idArr = (props) => {
  const { cookies } = props;
  return cookies;
};

export const recentIDs = createSelector(
  idArr,
  getIDs => (getIDs.get('recentIDs') ? getIDs.get('recentIDs') : []),
);
