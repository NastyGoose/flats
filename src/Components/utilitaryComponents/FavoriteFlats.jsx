import React from 'react';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
// material-ui and reactstrap
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import connect from 'react-redux/es/connect/connect';
// redux stuff
import { bindActionCreators } from 'redux';
import { addFavorite, removeFavorite } from '../../Redux/actions/flats.action';
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

class FavoriteFlats extends React.PureComponent {
  get Flats() {
    const props = this.props.favoriteFlats ? this.props.favoriteFlats : [];
    if (props.length > 0) {
      return <Cards flats={props} />;
    }
    return <Loader />;
  }

  render() {
    return (
      <div>
        <Paper className="FavoriteFlats" elevation={1}>
          <Typography
            style={{
              padding: '20px',
              textAlign: 'center',
            }}
            variant="h5"
            component="h3"
          >
            Your favorite flats!
          </Typography>
          <Typography component="p">
            {this.Flats}
          </Typography>

        </Paper>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteFlats: state.auth.favoriteFlats,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeFavorite: bindActionCreators(removeFavorite, dispatch),
    addFavorite: bindActionCreators(addFavorite, dispatch),
  };
}

FavoriteFlats.propTypes = {
  favoriteFlats: PropTypes.array.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FavoriteFlats));
