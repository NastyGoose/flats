import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { signUp } from '../../Redux/actions/authActions';

class RegisterPage extends PureComponent {
  handleSubmit = (e) => {
    const form = e.target;
    const data = new FormData(form);
    let email;
    let login;
    let password;
    let confirmPassword;

    for (const name of data.keys()) {
      switch (name) {
        case 'login':
          login = form.elements[name].value;
          break;
        case 'email':
          email = form.elements[name].value;
          break;
        case 'password':
          password = form.elements[name].value;
          break;
        case 'confirmPassword':
          confirmPassword = form.elements[name].value;
          break;
        default:
          break;
      }
    }

    if (confirmPassword === password) {
      this.props.signUp(login, email, password);
    } else alert('Wrong password confirmation!');
    e.preventDefault();
    window.location.href = 'http://localhost:3000/';
  };

  render() {
    return (
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

function mapDispatchToProps(dispatch) {
  return {
    signUp: bindActionCreators(signUp, dispatch),
  };
}

RegisterPage.propTypes = {
  signUp: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(RegisterPage);
