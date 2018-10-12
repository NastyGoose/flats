import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import connect from 'react-redux/es/connect/connect';
import IconButton from '@material-ui/core/IconButton';
import { Edit } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { bindActionCreators } from 'redux';
import Loader from './loader';
import LinearLoader from './linearLoader';
import { changeData } from '../../Redux/actions/auth.actions';
import CustomizedTable from './statTable';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  textField: {
    width: 'fit-content',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  itemWrapper: {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'flex',
  },
  changeIcon: {
    margin: 'auto',
    marginBottom: 0,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  UserInfo: {
    display: 'flex',
    padding: '30px',
    justifyContent: 'space-evenly',
  },
  identifiers: {
    display: 'flex',
    margin: 'auto',
    flexDirection: 'column',
  },
});

class UserInfo extends React.PureComponent {
  state = {
    login: '',
    email: '',
    password: '********',
    loginStatus: true,
    emailStatus: true,
    passwordStatus: true,
  };

  handleClick = payload => () => {
    if (this.state[payload.status]) {
      this.setState({
        [payload.status]: false,
      });
    } else {
      this.props.changeData({
        login: this.state.login ? this.state.login : this.props.login,
        email: this.state.email ? this.state.email : this.props.email,
        password: this.state.password ? '123' : '123',
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
      [<Typography
        style={{
          padding: '20px',
          textAlign: 'center',
        }}
        variant="h5"
        component="h3"
      >
        Welcome back
        {' '}
        {name}
        !
      </Typography>,

        <Paper className={classes.UserInfo} elevation={1}>
          <div className={classes.identifiers}>
            <Typography
              variant="h2"
              component="h3"
            >
              Change your identifiers!
            </Typography>
            <form className={classes.container} noValidate autoComplete="off">
              <div className={classes.itemWrapper}>
                <TextField
                  id="name"
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
                  aria-label="Delete"
                >
                  <Edit />
                </IconButton>
              </div>
              <div className={classes.itemWrapper}>
                <TextField
                  id="disabled"
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
                  aria-label="Delete"
                >
                  <Edit />
                </IconButton>
              </div>
              <div className={classes.itemWrapper}>
                <TextField
                  id="filled-read-only-input"
                  label="Password"
                  type="password"
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
                  onClick={this.handleClick({
                    name: 'password',
                    status: 'passwordStatus',
                  })}
                  className={classes.changeIcon}
                  aria-label="Delete"
                >
                  <Edit />
                </IconButton>
              </div>
            </form>
          </div>
          <div className="statistics">
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
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(UserInfo));
