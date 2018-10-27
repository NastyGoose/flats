import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { TextField } from '@material-ui/core';
// redux stuff
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { changeModalState } from '../../Redux/actions/settings.action';
import { checkPassword } from '../../Redux/actions/auth.action';

class ModalExample extends React.Component {
  state = {
    password: '',
  };

  handleChange = () => (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  toggle = () => {
    this.props.changeModalState(false);
  };

  submit(password) {
    this.props.checkPassword(this.props.email, password);
    if (this.props.passwordValid) this.props.changeModalState(false);
  }

  render() {
    if (this.props.passwordValid) return null;
    return (
      <div>
        <Modal isOpen={this.props.modalState} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Подтверждение</ModalHeader>
          <ModalBody>
            <h3 align="center">
              Введите свой текущий пароль
            </h3>
            <div align="center">
              <TextField
                id="filled-read-only-input"
                label="Пароль"
                value={this.state.password}
                type="text"
                onChange={this.handleChange()}
                margin="normal"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.submit(this.state.password)}>Подтвердить</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Отменить</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    passwordValid: state.auth.passwordValid,
    email: ownProps.email,
    modalState: state.actions.modalState,
  };
}


function mapDispatchToProps(dispatch) {
  return {
    checkPassword: bindActionCreators(checkPassword, dispatch),
    changeModalState: bindActionCreators(changeModalState, dispatch),
  };
}

ModalExample.propTypes = {
  changeModalState: PropTypes.func.isRequired,
  modalState: PropTypes.bool.isRequired,
  email: PropTypes.string.isRequired,
  checkPassword: PropTypes.func.isRequired,
  passwordValid: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
