import React, { PureComponent } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDoorClosed, faDoorOpen, faCog } from '@fortawesome/free-solid-svg-icons';

class Header extends PureComponent {
  render () {
    return (
      <header>
        <div className='cog' >
          <FontAwesomeIcon icon={faCog} />
        </div>
        <div className='logo' >
          <FontAwesomeIcon icon={faBuilding} />
          <a> flats</a>
        </div>
        <div className='authorizeButton'>
          <FontAwesomeIcon icon={faDoorClosed} />
        </div>
      </header>
    );
  }
}

export default (Header);
