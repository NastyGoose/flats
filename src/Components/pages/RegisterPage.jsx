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
    const user = {
      email: form.elements.email.value,
      login: form.elements.login.value,
      password: form.elements.password.value,
    };

    const confirmPassword = form.elements.confirmPassword.value;
    const validateResult = validate(user);

    if (validateResult.error === null) {
      if (confirmPassword === user.password) {
        this.props.signUp(user.login, user.email, user.password);
      } else { alert('Пароли не совпадают!'); }
    } else {
      alert(validateResult.error);
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
            Зарегистрироваться!
          </h1>
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Логин </InputGroupAddon>
            <Input
              name="login"
              type="text"
              placeholder="придумайте что-нибудь экстраординарное!"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> E-mail </InputGroupAddon>
            <Input
              name="email"
              type="email"
              placeholder="теперь почту"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Пароль </InputGroupAddon>
            <Input
              name="password"
              type="password"
              placeholder="самое сложное"
            />
          </InputGroup>
          <br />
          <InputGroup>
            <InputGroupAddon addonType="prepend"> Повторите пароль </InputGroupAddon>
            <Input
              name="confirmPassword"
              type="password"
              placeholder="и еще разок"
            />
          </InputGroup>
          <br />
          <Button
            outline
            color="danger"
            size="lg"
          >
            Подтвердить
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
