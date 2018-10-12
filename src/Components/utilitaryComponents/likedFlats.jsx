import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import connect from 'react-redux/es/connect/connect';
import {
  Card, Button, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody,
} from 'reactstrap';
import { bindActionCreators } from 'redux';
import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import Loader from './loader';
import { addFavorite, removeFavorite } from '../../Redux/actions/flats.actions';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class FavoriteFlats extends React.PureComponent {
  get favoriteFlats() {
    if (this.props.favoriteFlats) {
      const idArr = this.props.favoriteFlats.map(curr => curr._id);
      return this.props.favoriteFlats.map(curr => (
        <Card
          style={{
            margin: 'auto',
            maxWidth: '700px',
            marginBottom: '20px',
          }}
          key={curr.id}
        >
          <CardImg
            top
            height="400px"
            width="100%"
            src={curr.Photo}
            alt="Card image cap"
          />
          <CardBody>
            <CardTitle>
              {' '}
              {curr.Address}
              {' '}
            </CardTitle>
            <CardSubtitle>
              {' '}
              {curr.Price}
              {' '}
              USD
              {' '}
            </CardSubtitle>
            <CardText>
              {curr.Description}
            </CardText>
            <Button target="_blank" href={curr.URL}> Learn more! </Button>
            <Icon
              onClick={() => this.handleLikeClick(curr._id)}
              className="favoriteBtn"
              path={idArr.includes(curr._id) ? mdiHeart : mdiHeartOutline}
              size={1}
              horizontal
              vertical
              color="red"
            />
          </CardBody>
        </Card>
      ));
    }
    return <Loader />;
  }

  handleLikeClick = (id) => {
    if (localStorage.jwtToken) {
      const idArr = this.props.favoriteFlats.map(curr => curr._id);
      console.log(idArr);
      if (!idArr.includes(id)) {
        this.props.addFavorite(id);
      } else {
        this.props.removeFavorite(id);
      }
    }
  };

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
            {this.favoriteFlats}
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
  removeFavorite: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(FavoriteFlats));
