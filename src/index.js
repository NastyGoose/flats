import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './Redux/Reducers/configureStore';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';
import setAuthorizationToken from './Components/utilitaryLogic/setAuthorizationToken';
import {setCurrentUser} from './Redux/actions/auth.actions';
import jwt from 'jsonwebtoken';

const store = configureStore();
if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>, document.getElementById('root'),
);
registerServiceWorker();
