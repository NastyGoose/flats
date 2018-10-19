import React from 'react';
import {
  Button, Modal, ModalHeader, ModalBody, ModalFooter,
} from 'reactstrap';
import { TextField } from '@material-ui/core';
// redux stuff
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import PropTypes from 'prop-types';
import { checkPassword } from '../../Redux/actions/auth.action';

class ModalExample extends React.Component {
  state = {
    password: '',
  };

  constructor(props) {
    super(props);
    this.state = {
      modal: true,
    };
    this.toggle = this.toggle.bind(this);
  }

  handleChange = () => (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  toggle() {
    this.setState({
      modal: !this.state.modal,
    });
  }

  submit(password) {
    this.props.checkPassword(this.props.email, password);
    console.log(this.props.passwordValid);
  }

  render() {
    return (
      <div>
        <Modal isOpen={!this.props.passwordValid} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
          <ModalBody>
            <h3 align="center">
              Type your old password
            </h3>
            <div align="center">
              <TextField
                id="filled-read-only-input"
                label="Password"
                value={this.state.password}
                type="text"
                onChange={this.handleChange()}
                margin="normal"
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.submit(this.state.password)}>Do Something</Button>
            {' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    checkPassword: bindActionCreators(checkPassword, dispatch),
  };
}

ModalExample.propTypes = {
  email: PropTypes.string.isRequired,
  checkPassword: PropTypes.func.isRequired,
  passwordValid: PropTypes.bool.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(ModalExample);
