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
import { logout } from '../../Redux/actions/auth.actions';

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
      case '/':
        if (this.props.isAuthenticated) {
          return (
            <FontAwesomeIcon
              onClick={this.handleLogout}
              icon={faDoorOpen}
            />
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
      default:
        break;
    }
    return null;
  }

  handleLogout = () => {
    this.props.logout();
    window.location.reload();
  };

  render() {
    return (
      <header>
        <div className="cog">
          <FontAwesomeIcon
            icon={faUser}
          />
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
  changeState: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
