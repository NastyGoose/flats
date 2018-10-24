import React from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
// material-ui & reactstrap stuff
import {
  Card, Button, CardImg, CardTitle, CardText,
  CardSubtitle, CardBody,
} from 'reactstrap';
import Icon from '@mdi/react';
import { mdiHeartOutline, mdiHeart } from '@mdi/js';
// redux stuff
import { bindActionCreators } from 'redux';
import connect from 'react-redux/es/connect/connect';
import { addFavorite, removeFavorite } from '../../Redux/actions/flats.action';
// local imports
import validateJWT from '../utilitaryLogic/tokenValidation';
import RadialLoader from './RadialLoader';

const hour = 3600;

class Cards extends React.Component {
  state = {
    idArr: [],
  };

  componentWillMount() {
    if (this.props.favoriteFlats && Array.isArray(this.props.favoriteFlats)) {
      this.setState({
        idArr: this.props.favoriteFlats.map(curr => curr._id),
      });
    }
  }

  handleLikeClick = (flat) => {
    if (validateJWT()) {
      if (this.props.favoriteFlats) {
        const id = flat._id;
        if (!this.state.idArr.includes(id)) {
          this.setState((state) => {
            state.idArr.push(id);
            return {
              idArr: state.idArr,
            };
          });
          this.props.addFavorite(flat);
        } else {
          this.props.removeFavorite(flat);
          this.setState((state) => {
            state.idArr.splice(state.idArr.indexOf(id), 1);
            return {
              idArr: state.idArr,
            };
          });
        }
      }
    }
  };

  handleLearnClick = (id) => {
    const { cookies } = this.props;
    const recentURLs = cookies.get('recentIDs') ? cookies.get('recentIDs') : [];
    if (!recentURLs.includes(id)) {
      recentURLs.push(id);
      const jsonArr = JSON.stringify(recentURLs);
      cookies.set('recentIDs', jsonArr, { path: '/', maxAge: hour * 24 });
    }
  };

  render() {
    if (!Array.isArray(this.props.flats)) {
      return (
        <h1 style={{ margin: 'auto' }} align="center">{this.props.flats}</h1>);
    }
    return this.props.flats.map(curr => (
      <Card key={curr.id}>
        <CardImg
          top
          height="400px"
          width="100%"
          src={curr.Photo}
          alt={RadialLoader}
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
          <Button onClick={() => this.handleLearnClick(curr._id)} target="_blank" href={curr.URL}> Подробнее! </Button>
          {this.props.isAuthenticated ? (
            <Icon
              onClick={() => this.handleLikeClick(curr)}
              className="favoriteBtn"
              path={this.state.idArr.includes(curr._id) ? mdiHeart : mdiHeartOutline}
              size={1}
              horizontal
              vertical
              color="red"
            />
          )
            : null}
        </CardBody>
      </Card>
    ));
  }
}

function mapStateToProps(state, ownProps) {
  return {
    flats: ownProps.flats,
    favoriteFlats: state.auth.favoriteFlats,
    isAuthenticated: state.auth.isAuthenticated,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addFavorite: bindActionCreators(addFavorite, dispatch),
    removeFavorite: bindActionCreators(removeFavorite, dispatch),
  };
}

Cards.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  favoriteFlats: PropTypes.array.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  flats: PropTypes.array.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
};

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(Cards));
