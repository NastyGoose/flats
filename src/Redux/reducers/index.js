import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './root';
import { watchGetFlats } from '../sagas/getFlats.saga';
import { watchAuthActions } from '../sagas/auth.saga';
import { watchChangePage } from '../sagas/settings.saga';

export default function configureStore(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [sagaMiddleware];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middleware),
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  ));

  if (module.hot) {
    module.hot.accept('./root', () => {
      const nextRootReducer = require('./root');
      store.replaceReducer(nextRootReducer);
    });
  }

  sagaMiddleware.run(watchAuthActions);
  sagaMiddleware.run(watchGetFlats);
  sagaMiddleware.run(watchChangePage);

  return store;
}
