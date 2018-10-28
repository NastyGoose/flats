import React from 'react';
import PropTypes from 'prop-types';
import lodash from 'lodash';
// material-ui and reactstrap
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
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
  state = {
    lastIndex: 5,
  };

  get Flats() {
    if (this.props.favoriteFlats) {
      if (this.props.favoriteFlats.length > 0) {
        return <Cards flats={lodash.slice(this.props.favoriteFlats, 0, this.state.lastIndex)} />;
      }
      return (
        <h1 align="center">
          У вас еще нет любимых квартир!
        </h1>
      );
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
           Отмеченные квартиры!
          </Typography>
          <Typography component="p">
            {this.Flats}
          </Typography>
          <Button
            disabled={!this.props.favoriteFlats.length || this.props.favoriteFlats.length < 6}
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
