import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {
  TimelapseOutlined, Favorite, PersonPin, Help,
} from '@material-ui/icons';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import UserInfo from '../utilitaryComponents/userInfo';
import FavoriteFlats from '../utilitaryComponents/likedFlats';
import RecentlyWathcedFlats from '../utilitaryComponents/recentlyFlats';
import AboutUs from '../utilitaryComponents/aboutUs';

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

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
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

    return (
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
        {value === 2 && <TabContainer><RecentlyWathcedFlats cookies={this.props.cookies}/></TabContainer>}
        {value === 3 && <TabContainer><AboutUs /></TabContainer>}
      </div>
    );
  }
}

UserPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserPage);
