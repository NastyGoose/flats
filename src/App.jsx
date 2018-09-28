/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import jwt from 'jsonwebtoken';

// redux
import { Provider } from 'react-redux';
import configureStore from './Redux/Reducers/configureStore';
import { setCurrentUser } from './Redux/actions/authActions';

// components
import Header from './Components/header/header';
import MainPage from './Components/pages/MainPage';
import LoginPage from './Components/pages/LoginPage';
import RegisterPage from './Components/pages/RegisterPage';

// css
import './assets/css/default.min.css';

// utilScripts
import setAuthorizationToken from './Components/utils/setAuthorizationToken';

const store = configureStore();

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route
                exact
                path="/"
                component={MainPage}
              />
              <Route
                path="/login"
                component={LoginPage}
              />
              <Route
                path="/register"
                component={RegisterPage}
              />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
