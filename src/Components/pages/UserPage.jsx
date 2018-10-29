import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';
// material-ui stuff
import { MuiThemeProvider, withStyles, createMuiTheme } from '@material-ui/core/styles';
import {
  TimelapseOutlined, Favorite, PersonPin, Help, Restore,
} from '@material-ui/icons';
import {
  AppBar, Tabs, Tab, Typography, BottomNavigation, BottomNavigationAction,
} from '@material-ui/core';
// local imports
import { Redirect } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import UserInfo from '../utilitaryComponents/UserInfo';
import FavoriteFlats from '../utilitaryComponents/FavoriteFlats';
import RecentlyWatchedFlats from '../utilitaryComponents/RecentFlats';
import AboutUs from '../utilitaryComponents/AboutUs';

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
    MuiIconButton: {
      root: {
        outline: 'none !important',
      },
    },
    MuiBottomNavigation: {
      root: {
        borderBottom: '1px solid indianred',
      },
    },
    MuiBottomNavigationAction: {
      root: {
        color: '#9c1e1e !important',
        outline: 'none !important',
      },
      selected: {
        color: 'black',
        outline: 'none !important',
      },
    },
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
          <MediaQuery query="(min-device-width: 700px)">
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
                  <Tab label="О вас" icon={<PersonPin />} />
                  <Tab label="Понравивишиеся квартиры" icon={<Favorite />} />
                  <Tab label="Просмотренные недавно квартиры" icon={<TimelapseOutlined />} />
                  <Tab label="О нас" icon={<Help />} />
                </Tabs>
              </AppBar>
              {value === 0 && <TabContainer><UserInfo /></TabContainer>}
              {value === 1 && <TabContainer><FavoriteFlats /></TabContainer>}
              {value === 2 && <TabContainer><RecentlyWatchedFlats /></TabContainer>}
              {value === 3 && <TabContainer><AboutUs /></TabContainer>}
            </div>
          </MediaQuery>
          <MediaQuery query="(max-device-width: 700px)">
            <div className="mobileUserNav">
              <BottomNavigation
                value={value}
                onChange={this.handleChange}
              >
                <BottomNavigationAction label="Your stats" icon={<PersonPin />} />
                <BottomNavigationAction label="Recents" icon={<Restore />} />
                <BottomNavigationAction label="Favorites" icon={<Favorite />} />
                <BottomNavigationAction label="About us" icon={<Help />} />
              </BottomNavigation>
              {value === 0 && <TabContainer><UserInfo /></TabContainer>}
              {value === 1 && <TabContainer><FavoriteFlats /></TabContainer>}
              {value === 2 && <TabContainer><RecentlyWatchedFlats /></TabContainer>}
              {value === 3 && <TabContainer><AboutUs /></TabContainer>}
            </div>
          </MediaQuery>
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
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(withStyles(theme)(UserPage));
