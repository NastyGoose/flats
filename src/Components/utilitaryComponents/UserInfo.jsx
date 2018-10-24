import React from 'react';
import PropTypes from 'prop-types';
// material-ui
import { withStyles } from '@material-ui/core/styles';
import {
  Paper, Typography, TextField, IconButton,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';
// redux stuff
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { changeData } from '../../Redux/actions/auth.action';
// local imports
import CustomizedTable from './StatTable';
import { userInfo } from '../styles/stylesheet';
import ModalExample from './ChangePassword';

class UserInfo extends React.PureComponent {
  state = {
    login: '',
    email: '',
    password: 'new password',
    loginStatus: true,
    emailStatus: true,
    passwordStatus: true,
  };

  showPassword = () => {
    if (!this.props.passwordValid) {
      this.setState({
        passwordStatus: false,
      });
    }
  };

  handlePasswordChange = payload => () => {

  };

  handleClick = payload => () => {
    console.log(payload);
    if (this.state[payload.status]) {
      this.setState({
        [payload.status]: false,
      });
    } else {
      console.log(this.state.password);
      this.props.changeData({
        [payload.name]: this.state[payload.name] ? this.state[payload.name] : this.props[payload.name],
      });
      this.setState({
        [payload.status]: true,
      });
    }
  };

  handleChange = name => (event) => {
    this.setState({
      [name]: event.target.value,
    });
  };

  Field(fieldName) {
    if (!this.state[fieldName]) {
      return this.props[fieldName];
    }
    return this.state[fieldName];
  }

  render() {
    const { classes } = this.props;
    const name = <text style={{ color: 'indianred' }}>{this.props.login}</text>;
    return (
      [
        <div>
          {this.state.passwordStatus ? null : <ModalExample email={this.props.email} />}
        </div>,

        <Typography
          style={{
            padding: '20px',
            textAlign: 'center',
          }}
          variant="h5"
          component="h3"
        >
        С возвращением
          {' '}
          {name}
        !
        </Typography>,

        <Paper className={classes.UserInfo} elevation={1}>
          <div className={classes.identifiers}>
            <Typography
              variant="h2"
              component="h3"
              align="center"
            >
              Измените свои идентификаторы!
            </Typography>
            <form
              className={classes.container}
              noValidate
              autoComplete="off"
            >
              <div className={classes.itemWrapper}>
                <TextField
                  label="Login"
                  className={classes.textField}
                  value={this.Field('login')}
                  defaultValue="loading..."
                  onChange={this.handleChange('login')}
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.loginStatus,
                  }}
                />
                <IconButton
                  onClick={this.handleClick({
                    name: 'login',
                    status: 'loginStatus',
                  })}
                  className={classes.changeIcon}
                  color={this.state.loginStatus ? 'inherit' : 'secondary'}
                >
                  <Edit />
                </IconButton>
              </div>
              <div className={classes.itemWrapper}>
                <TextField
                  label="Email"
                  value={this.Field('email')}
                  onChange={this.handleChange('email')}
                  defaultValue="loading..."
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.emailStatus,
                  }}
                />
                <IconButton
                  onClick={this.handleClick({
                    name: 'email',
                    status: 'emailStatus',
                  })}
                  className={classes.changeIcon}
                  color={this.state.emailStatus ? 'inherit' : 'secondary'}
                >
                  <Edit />
                </IconButton>
              </div>
              <div className={classes.itemWrapper}>
                <TextField
                  label="Password"
                  type={this.props.passwordValid ? 'text' : 'password'}
                  value={this.Field('password')}
                  defaultValue="loading..."
                  onChange={this.handleChange('password')}
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: this.state.passwordStatus,
                  }}
                />
                <IconButton
                  onClick={this.props.passwordValid ? this.handleClick({
                    name: 'password',
                    status: 'passwordStatus',
                  }) : this.showPassword}
                  className={classes.changeIcon}
                  aria-label="Delete"
                  color={this.state.passwordStatus ? 'inherit' : 'secondary'}
                >
                  <Edit />
                </IconButton>
              </div>
            </form>
          </div>
          <div className={classes.statistics}>
            <CustomizedTable />
          </div>
        </Paper>,
      ]
    );
  }
}

function mapStateToProps(state) {
  return {
    email: state.auth.user.email,
    login: state.auth.user.login,
    passwordValid: state.auth.passwordValid,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    changeData: bindActionCreators(changeData, dispatch),
  };
}

UserInfo.propTypes = {
  changeData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  passwordValid: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(userInfo)(UserInfo));
