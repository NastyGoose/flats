import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Button, InputGroup, InputGroupAddon, Input,
} from 'reactstrap';
import PropTypes from 'prop-types';

class LoginPage extends PureComponent {
  handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    let login;
    let password;
    let email;

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
        default:
          break;
      }
      console.log(form.elements[name].value);
    }

    if (form.className === 'registrationForm') {
      axios.post('http://localhost:8000/api/account/signup', {
        login,
        email,
        password,
      })
        .then((response) => {
          console.log(response);
          axios.post('http://localhost:8000/api/account/signin', {
            email,
            password,
          })
            .then((_response) => {
              console.log(_response);
            })
            .catch((_error) => {
              console.log(_error);
            });
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      axios.post('http://localhost:8000/api/account/signin', {
        email,
        password,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };


  render() {
    return (
      <div>

        <form
          onSubmit={this.handleSubmit}
          className={this.props.signForm === 'registrationForm' ? 'registrationForm' : 'registrationForm-disabled'}
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
              name="passwordRepeat"
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

        <form
          onSubmit={this.handleSubmit}
          className={this.props.signForm === 'loginForm' ? 'loginForm' : 'loginForm-disabled'}
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    signForm: state.actions.signForm,
  };
}

LoginPage.propTypes = {
  signForm: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(LoginPage);
