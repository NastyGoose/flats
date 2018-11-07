/* eslint-disable */
import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { withCookies } from 'react-cookie';
// components
import Header from './Components/header/Header';
import MainPage from './Components/pages/MainPage';
import LoginPage from './Components/pages/LoginPage';
import RegisterPage from './Components/pages/RegisterPage';
import UserPage from './Components/pages/UserPage';
// css
import './assets/css/default.min.css';

class App extends PureComponent {
  render() {
    return (
      <Router>
        <div className="App">
          <Route
            component={Header}
          />
          <Switch>
            <Route
              exact
              path="/"
              component={MainPage}
            />
            <Route
              path="/page=*"
              component={MainPage}
            />
            <Route
              path="/userpage"
              component={withCookies(UserPage)}
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
    );
  }
}

export default App;
