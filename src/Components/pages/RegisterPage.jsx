import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  Button, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom';
import { signUp } from '../../Redux/actions/auth.action';
// local imports
import validate from '../utilitaryLogic/passwordValidation';

class RegisterPage extends PureComponent {
  handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value;
    const login = form.elements.login.value;
    const password = form.elements.password.value;
    const confirmPassword = form.elements.confirmPassword.value;

    if (validate(password).length < 1) {
      if (confirmPassword === password) {
        this.props.signUp(login, email, password);
      } else alert('Wrong password confirmation!');
    } else {
      alert('Bad password');
      console.log(validate(password));
    }
  };

  render() {
    return this.props.isAuthenticated ? <Redirect to="/" />
      : (
        <form
          onSubmit={this.handleSubmit}
          className="registrationForm"
        >
          <h1>
            Sign up!
          </h1>
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Username </InputGroupAddon>
            <Input
              name="login"
              type="text"
              placeholder="type your login here!"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> E-mail </InputGroupAddon>
            <Input
              name="email"
              type="email"
              placeholder="now e-mail :)"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Password </InputGroupAddon>
            <Input
              name="password"
              type="password"
              placeholder="finally, password"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Repeat password </InputGroupAddon>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="and one more time"
            />
          </InputGroup>
          <br />
          <Button
            outline
            color="danger"
            size="lg"
          >
            Submit
          </Button>
        </form>
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
    signUp: bindActionCreators(signUp, dispatch),
  };
}

RegisterPage.propTypes = {
  signUp: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterPage);
