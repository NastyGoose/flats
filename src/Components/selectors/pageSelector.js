import { createSelector } from 'reselect';
​
const getVisibilityFilter = state => state.visibilityFilter;
const pages = state => state.pages;
​
export const getVisibleTodos = createSelector(
  [getVisibilityFilter, pages],
  (visibilityFilter, pages) => {
    switch (visibilityFilter) {
      case 'SHOW_ALL':
        return todos;
      case 'SHOW_COMPLETED':
        return todos.filter(t => t.completed);
      case 'SHOW_ACTIVE':
        return todos.filter(t => !t.completed)
    }
  }
)
