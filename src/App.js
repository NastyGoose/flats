import React, { Component } from 'react';
import Header from './Components/header/header';
import MainPage from './Components/pages/MainPage';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

// css
import './assets/css/default.min.css';

class App extends Component {
  render () {
    return (
      <Router>
        <div className='App'>
          <Header />
          <MainPage />
        </div>
      </Router>
    );
  }
}

export default App;
