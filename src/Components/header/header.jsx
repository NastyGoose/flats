import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBuilding, faDoorClosed, faDoorOpen, faCog } from '@fortawesome/free-solid-svg-icons';
import { changeState } from '../../Redux/actions/settings.action';
import {bindActionCreators} from 'redux';

class Header extends PureComponent {
  render () {
    return (
      <header>
        <div className='cog' >
          <FontAwesomeIcon
            icon={faCog}
            onClick={() => this.props.changeState()}
          />
        </div>
        <div className='logo' >
          <FontAwesomeIcon
            icon={faBuilding}
          />
          <a> flats</a>
        </div>
        <div className='authorizeButton' >
          <FontAwesomeIcon
            icon={faDoorClosed}
          />
        </div>
      </header>
    );
  }
}

function mapDispatchToProps (dispatch) {
  return {
    changeState: bindActionCreators(changeState, dispatch)
  };
}

Header.propTypes = {
  changeState: PropTypes.func.isRequired
};

export default connect(null, mapDispatchToProps)(Header);
