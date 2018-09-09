import React, { Component } from 'react';
import {
  BrowserRouter as Router
} from 'react-router-dom';

// components
import Header from './Components/header/header.jsx';
import MainPage from './Components/pages/MainPage.jsx';

// css
import './assets/css/default.min.css';

// redux
import { Provider } from 'react-redux';
import configureStore from './Redux/Reducers/configureStore';

const store = configureStore();

class App extends Component {
  render () {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Header />
            <MainPage />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
