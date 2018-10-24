import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
// material-ui and reactstrap stuff
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { DeleteOutlineTwoTone } from '@material-ui/icons';
// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import { getById } from '../../Redux/actions/flats.action';
// local imports
import Loader from './RadialLoader';
import Cards from './Card';

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
    const props = this.props.recentFlats ? this.props.recentFlats : [];
    if (this.props) {
      if (props.length > 0) {
        return <Cards flats={props} />;
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

  removeRecent = () => {
    const { cookies } = this.props;
    cookies.remove('recentIDs');
    this.setState({
      isDeleted: true,
    });
  };

  render() {
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
            <DeleteOutlineTwoTone
              fontSize="50px"
              nativeColor="indianred"
              style={{
                cursor: 'pointer',
              }}
              onClick={this.removeRecent}
            />
          </Typography>
          {this.state.isDeleted ? <h1 align="center"> Your history was deleted! </h1> : this.Flats}
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
