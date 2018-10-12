/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { withCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

// redux

import { setCurrentUser } from './Redux/actions/auth.actions';

// components
import Header from './Components/header/Header';
import MainPage from './Components/pages/MainPage';
import LoginPage from './Components/pages/LoginPage';
import RegisterPage from './Components/pages/RegisterPage';
import UserPage from './Components/pages/UserPage';

// css
import './assets/css/default.min.css';

// utilScripts
import setAuthorizationToken from './Components/utilitaryLogic/setAuthorizationToken';
import configureStore from './Redux/Reducers/configureStore';

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
                  render={() => (<MainPage cookies={this.props.cookies} />)}
                  something="foo"
                />
                <Route
                  path="/page=*"
                  render={() => (<MainPage cookies={this.props.cookies} />)}
                />
                <Route
                  path="/userpage"
                  render={() => (<UserPage cookies={this.props.cookies} />)}
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

export default withCookies(App);
