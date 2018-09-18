/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { PureComponent } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

// redux
import { Provider } from 'react-redux';
import configureStore from './Redux/Reducers/configureStore';

// components
import Header from './Components/header/header';
import MainPage from './Components/pages/MainPage';
import LoginPage from './Components/pages/LoginPage';

// css
import './assets/css/default.min.css';


const store = configureStore();

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
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
