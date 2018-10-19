// react/react-router
import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
// fontawesome icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBuilding, faDoorClosed, faDoorOpen, faUser,
} from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';
// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { logout } from '../../Redux/actions/auth.action';

class Header extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
  };

  get rightItem() {
    const pathname = this.props.location.pathname;
    switch (pathname) {
      case '/login':
        return (
          <h2>
            <Link
              to="/register"
            >
              Sign Up
            </Link>
          </h2>
        );
      case '/register':
        return (
          <h2>
            <Link
              to="/login"
            >
              Log In
            </Link>
          </h2>
        );
      default:
        if (this.props.isAuthenticated) {
          return (
            <Link to="/">
              <FontAwesomeIcon
                onClick={this.handleLogout}
                icon={faDoorOpen}
              />
            </Link>
          );
        }
        return (
          <Link
            to="/login"
          >
            <FontAwesomeIcon
              icon={faDoorClosed}
            />
          </Link>
        );
    }
  }

  get leftItem() {
    if (this.props.isAuthenticated) {
      return (
        <Link to="/userpage">
          <FontAwesomeIcon
            icon={faUser}
          />
        </Link>
      );
    }
    return (
      <FontAwesomeIcon
        icon={faUser}
      />
    );
  }

  handleLogout = () => {
    this.props.logout();
  };

  render() {
    return (
      <header>
        <div className="userCab">
          {this.leftItem}
        </div>
        <div className="logo">
          <FontAwesomeIcon
            icon={faBuilding}
          />
          <Link
            to="/"
            style={{ fontSize: '35px' }}
          >
          flats
          </Link>
        </div>
        <div className="authorizeButton">
          {this.rightItem}
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
  };
}

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
