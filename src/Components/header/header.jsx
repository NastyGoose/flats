/* eslint-disable jsx-a11y/label-has-associated-control,import/no-extraneous-dependencies */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faDoorClosed, faDoorOpen, faCog,
} from '@fortawesome/free-solid-svg-icons';
import { bindActionCreators } from 'redux';
import { changeState } from '../../Redux/actions/settings.action';

class Header extends PureComponent {
  onHeaderClick = () => {

  }
  render() {
    const rightItem = window.location.pathname !== '/'
      ? (
        <h2 onClick={() => }
        >
          {window.location.pathname === '/login' ? 'Sign Up' : 'Log In'}
        </h2>
      )
      : (
        <a href="login">
          <FontAwesomeIcon
            icon={faDoorClosed}
          />
        </a>
      );
    return (
      <header>
        <div className="cog">
          <FontAwesomeIcon
            icon={faCog}
            onClick={() => this.props.changeState()}
          />
        </div>
        <div className="logo">
          <FontAwesomeIcon
            icon={faBuilding}
          />
          <a href="/" style={{ fontSize: '35px' }}> flats</a>
        </div>
        <div className="authorizeButton">
          {rightItem}
        </div>
      </header>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    changeState: bindActionCreators(changeState, dispatch),
  };
}

Header.propTypes = {
  changeState: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Header);
