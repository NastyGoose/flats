import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { signIn } from '../../Redux/actions/auth.action';

class LoginPage extends PureComponent {
    handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const password = form.elements.password.value;
      const email = form.elements.email.value;
      this.props.signIn(email, password);
    };

    render() {
      return this.props.isAuthenticated ? <Redirect to="/" />
        : (
          <form
            onSubmit={this.handleSubmit}
            className="loginForm"
          >
            {this.Redirect}
            <h1>
            Войти!
            </h1>
            <InputGroup>
              <InputGroupAddon addonType="append"> Email </InputGroupAddon>
              <Input
                name="email"
                type="email"
                placeholder="type your email here"
              />
            </InputGroup>
            <br />
            <InputGroup>
              <InputGroupAddon addonType="append"> Пароль </InputGroupAddon>
              <Input
                name="password"
                type="password"
                placeholder="still remember it, huh?"
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
    signIn: bindActionCreators(signIn, dispatch),
  };
}

LoginPage.propTypes = {
  signIn: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
