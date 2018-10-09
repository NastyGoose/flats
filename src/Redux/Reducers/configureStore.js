import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './rootReducer';
import { watchGetFlats } from '../sagas/getFlats.saga';
import { watchAuthActions } from '../sagas/auth.saga';
import { watchChangePage } from '../sagas/settings.saga';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [thunk, sagaMiddleware];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));

  if (module.hot) {
    module.hot.accept('./rootReducer', () => {
      const nextRootReducer = require('./rootReducer');
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(watchAuthActions);
  sagaMiddleware.run(watchGetFlats);
  sagaMiddleware.run(watchChangePage);

  return store;
}
