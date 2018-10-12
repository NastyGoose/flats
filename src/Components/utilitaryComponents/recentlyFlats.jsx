import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Icon from '@mdi/react';
import { mdiHeart, mdiHeartOutline } from '@mdi/js';
import {
  Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText, Button,
} from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes, { instanceOf } from 'prop-types';
import { Cookies } from 'react-cookie';
import Loader from './loader';
import { getById } from '../../Redux/actions/flats.actions';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class RecentlyFlats extends React.PureComponent {
  componentDidMount() {
    const { cookies } = this.props;
    this.recentIDs = cookies.get('recentIDs') ? cookies.get('recentIDs') : [];
    this.props.getById(this.recentIDs);
  }

  get Flats() {
    const idArr = this.props.favoriteFlats.map(curr => curr._id);
    if (this.recentIDs) {
      if (this.props.recentFlats) {
        return this.props.recentFlats.map(curr => (
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
            Flats that you looked up recently!
          </Typography>
          {this.Flats}
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

RecentlyFlats.propTypes = {
  favoriteFlats: PropTypes.array.isRequired,
  cookies: instanceOf(Cookies).isRequired,
  getById: PropTypes.func.isRequired,
  recentFlats: PropTypes.array.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(RecentlyFlats));
