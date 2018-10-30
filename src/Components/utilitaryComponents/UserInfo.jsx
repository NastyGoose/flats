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
import { changeModalState } from '../../Redux/actions/settings.action';
import { changeData } from '../../Redux/actions/auth.action';
// local imports
import CustomizedTable from './StatTable';
import { userInfo } from '../styles/stylesheet';
import ModalExample from './ChangePassword';
import { validateChange } from '../utilitaryLogic/passwordValidation';

class UserInfo extends React.PureComponent {
  state = {
    login: '',
    email: '',
    password: 'new password',
    loginStatus: true,
    emailStatus: true,
    passwordStatus: true,
  };

  handlePasswordChange = () => {
    if (this.props.passwordValid) {
      console.log('here');
      if (this.state.passwordStatus) {
        this.setState({
          passwordStatus: false,
        });
      } else {
        const response = validateChange('password', this.state.password);
        if (!response.error) {
          this.props.changeData({
            password: this.state.password ? this.state.password : 'qwerty',
          });
          this.setState({
            passwordStatus: true,
          });
        } else {
          alert(response.error);
          this.setState({
            passwordStatus: true,
          });
        }
      }
    } else {
      this.props.changeModalState(true);
    }
  };

  handleClick = payload => () => {
    if (this.state[payload.status]) {
      this.setState({
        [payload.status]: false,
      });
    } else {
      const validateResult = validateChange(payload.name, this.state[payload.name]);
      if (validateResult.error === null) {
        this.props.changeData({
          [payload.name]: this.state[payload.name] ? this.state[payload.name] : this.props[payload.name],
        });
        this.setState({
          [payload.status]: true,
        });
      } else {
        alert(validateResult.error.details[0].message);
        this.setState({
          [payload.status]: true,
        });
      }
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
        <ModalExample email={this.props.email} />,
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
                  label="Логин"
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
                  type="email"
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
                  label="Пароль"
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
                  onClick={this.handlePasswordChange}
                  className={classes.changeIcon}
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
    changeModalState: bindActionCreators(changeModalState, dispatch),
    changeData: bindActionCreators(changeData, dispatch),
  };
}

UserInfo.propTypes = {
  changeModalState: PropTypes.func.isRequired,
  changeData: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  email: PropTypes.string.isRequired,
  login: PropTypes.string.isRequired,
  passwordValid: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(userInfo)(UserInfo));
