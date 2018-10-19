import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { CookiesProvider } from 'react-cookie';
// redux stuff
import { Provider } from 'react-redux';
import configureStore from './Redux/reducers/index';
import { setCurrentUser } from './Redux/actions/auth.action';
// local imports
import App from './App';
import tokenValidate from './Components/utilitaryLogic/tokenValidation';
// material-ui and reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const store = configureStore();
if (tokenValidate()) {
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

ReactDOM.render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>, document.getElementById('root'),
);
