import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// component
class Header extends PureComponent {
  render () {
    return (
      <header>
        <div className='logo' >
          <a>LOGO</a>
        </div>
        <nav>
          <ul>
            <li className='first'>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/Products'>Products</Link>
            </li>

          </ul>
        </nav>
      </header>
    );
  }
}

export default (Header);
