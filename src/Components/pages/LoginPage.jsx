import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { signIn } from '../../Redux/actions/auth.actions';

class LoginPage extends PureComponent {
    handleSubmit = (e) => {
      e.preventDefault();
      const form = e.target;
      const password = form.elements.password.value;
      const email = form.elements.email.value;
      this.props.signIn(email, password);
    };

    render() {
      return (
        <form
          onSubmit={this.handleSubmit}
          className="loginForm"
        >
          <h1>
            Log in!
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
            <InputGroupAddon addonType="append"> Password </InputGroupAddon>
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
            Submit
          </Button>
        </form>
      );
    }
}

function mapDispatchToProps(dispatch) {
  return {
    signIn: bindActionCreators(signIn, dispatch),
  };
}

LoginPage.propTypes = {
  signIn: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginPage);
