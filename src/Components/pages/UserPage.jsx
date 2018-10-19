import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';
// material-ui stuff
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  TimelapseOutlined, Favorite, PersonPin, Help,
} from '@material-ui/icons';
import {
  AppBar, Tabs, Tab, Typography,
} from '@material-ui/core';
// local imports
import { Redirect } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import UserInfo from '../utilitaryComponents/UserInfo';
import FavoriteFlats from '../utilitaryComponents/FavoriteFlats';
import RecentlyWatchedFlats from '../utilitaryComponents/RecentFlats';
import AboutUs from '../utilitaryComponents/AboutUs';
// redux stuff
function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 5 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

const theme = createMuiTheme({
  overrides: {
    MuiTabs: {
      flexContainer: {
        justifyContent: 'space-around',
      },
    },
    MuiTab: {
      selected: {
        outline: 'none',
      },
      textColorPrimary: {
        color: '#b52222',
        outline: 'none',
      },
      label: {
        color: 'black',
      },
    },
  },
});

class UserPage extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return !this.props.isAuthenticated ? <Redirect to="/" />
      : (
        <MuiThemeProvider theme={theme}>
          <div className="userNav">
            <AppBar position="static" color="default">
              <Tabs
                value={value}
                onChange={this.handleChange}
                scrollable
                scrollButtons="on"
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="About you" icon={<PersonPin />} />
                <Tab label="Liked flats" icon={<Favorite />} />
                <Tab label="Recently watched flats" icon={<TimelapseOutlined />} />
                <Tab label="About us" icon={<Help />} />
              </Tabs>
            </AppBar>
            {value === 0 && <TabContainer><UserInfo /></TabContainer>}
            {value === 1 && <TabContainer><FavoriteFlats /></TabContainer>}
            {value === 2 && <TabContainer><RecentlyWatchedFlats cookies={this.props.cookies} /></TabContainer>}
            {value === 3 && <TabContainer><AboutUs /></TabContainer>}
          </div>
        </MuiThemeProvider>
      );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

UserPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(withStyles(theme)(UserPage));
