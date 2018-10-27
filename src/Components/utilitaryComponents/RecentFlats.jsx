import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
// material-ui and reactstrap stuff
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import { DeleteOutlineTwoTone } from '@material-ui/icons';
// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { getById } from '../../Redux/actions/flats.action';
// local imports
import Loader from './RadialLoader';
import Cards from './Card';
import lodash from 'lodash';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

const cookiesObject = (props) => {
  const { cookies } = props;
  return cookies;
};

class RecentFlats extends React.PureComponent {
  state = {
    isDeleted: false,
  };

  recentIDs = createSelector(
    cookiesObject,
    cookies => (cookies.get('recentIDs') ? cookies.get('recentIDs') : []),
  );

  componentDidMount() {
    this.props.getById(this.recentIDs(this.props));
  }

  get Flats() {
    if (this.props.recentFlats) {
      if (this.props.recentFlats.length > 0) {
        return <Cards flats={lodash.slice(this.props.recentFlats, 0, this.state.lastIndex)} />;
      }
      return (
        <h1 align="center">
          У вас нет недавно посещенных квартир!
        </h1>
      );
    }
    return (
      <Loader />
    );
  }

  get DeleteIcon() {
    if (this.props.recentFlats && this.props.recentFlats.length > 0) {
      return (
        <DeleteOutlineTwoTone
          fontSize="50px"
          nativeColor="indianred"
          style={{
            cursor: 'pointer',
          }}
          onClick={this.removeRecent}
        />
      );
    }
    return null;
  }

  removeRecent = () => {
    const { cookies } = this.props;
    cookies.remove('recentIDs');
    this.setState({
      isDeleted: true,
    });
  };

  render() {
    console.log(this.props.recentFlats);
    return (
      <div>
        <Paper className="RecentFlats" elevation={1}>
          <Typography
            style={{
              padding: '20px',
              textAlign: 'center',
            }}
            variant="h5"
            component="h3"
          >
            Квартиры которые вы недавно просматривали!
            <br />
            { this.DeleteIcon }
          </Typography>
          {this.state.isDeleted ? <h1 align="center"> Ваша история просмотров теперь пуста! </h1> : this.Flats}
          <Button
            disabled={this.props.recentFlats && this.props.recentFlats.length < 6}
            color="secondary"
            onClick={() => this.setState(state => ({
              lastIndex: state.lastIndex + 5,
            }))}
          >
            Показать еще!
          </Button>
          </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteFlats: state.auth.favoriteFlats,
    recentFlats: state.flats.recentFlats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getById: bindActionCreators(getById, dispatch),
  };
}

RecentFlats.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  getById: PropTypes.func.isRequired,
  recentFlats: PropTypes.array.isRequired,
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecentFlats)));
