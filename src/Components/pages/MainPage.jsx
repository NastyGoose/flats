import React, { PureComponent } from 'react';
import PropTypes, { instanceOf } from 'prop-types';
import { Link } from 'react-router-dom';
import { Cookies } from 'react-cookie';

// reactstrap, material-ui and animations
import { Power2, TweenLite } from 'gsap';
import lodash from 'lodash';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import Icon from '@mdi/react';
import { mdiHeartOutline, mdiHeart } from '@mdi/js';

// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../utilitaryComponents/loader';
import { removeFavorite, getFlats, addFavorite } from '../../Redux/actions/flats.actions';
import { changePage } from '../../Redux/actions/settings.action';

import Settings from '../header/Settings';

let pagesQuantity;
const hour = 3600;

class MainPage extends PureComponent {
  state = {
    page: 0,
  };

  componentWillMount() {
    const filter = {
      sort: 'Price',
      order: -1,
      chunksSize: 20,
    };
    this.state.page = parseInt(lodash.takeRightWhile(window.location.pathname, curr => curr !== '=').join(''), 10);
    if (!this.state.page) this.state.page = 0;
    this.props.getFlats(filter, this.state.page);
  }

  get Pages() {
    const pages = [];
    this.state.page = parseInt(lodash.takeRightWhile(window.location.pathname, curr => curr !== '=').join(''), 10);
    for (let i = this.props.pagesIndexes.startIndex; i <= this.props.pagesIndexes.endIndex; i++) {
      pages[i] = (
        <PaginationItem active={i === this.state.page - 1}>
          <Link to={`/page=${i + 1}`}>
            <PaginationLink
              onClick={() => {
                this.scrollToTop();
                this.props.changePage(i, {
                  orderBy: this.props.orderBy,
                  sortBy: this.props.sortBy,
                  chunksSize: this.props.chunksSize,
                });
              }
          }
            >
              {i + 1}
            </PaginationLink>
          </Link>
        </PaginationItem>
      );
    }
    return pages;
  }

  get Flats() {
    if (this.props.flats.flatsList.length > 0) {
      let idArr = [];
      if (this.props.favoriteFlats) {
        idArr = this.props.favoriteFlats.map(curr => curr._id);
      }
      return this.props.flats.flatsList.map(curr => (
        <Card key={curr.id}>
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
            <Button onClick={() => this.handleLearnClick(curr._id)} target="_blank" href={curr.URL}> Learn more! </Button>
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

  handleLearnClick = (id) => {
    const { cookies } = this.props;
    const recentURLs = cookies.get('recentIDs') ? cookies.get('recentIDs') : [];
    if (!recentURLs.includes(id)) {
      recentURLs.push(id);
      const jsonArr = JSON.stringify(recentURLs);
      cookies.set('recentIDs', jsonArr, { path: '/', maxAge: hour * 24 });
    }
  };

  scrollToTop = () => {
    const scrollAnimation = { scrollTop: document.body.scrollHeight };
    const scrollTop = 0;

    TweenLite.to(scrollAnimation, 1, {
      scrollTop,
      ease: Power2.easeInOut,
      onUpdate: () => {
        window.scrollTo(0, scrollAnimation.scrollTop);
      },
    });
  };

  render() {
    return (
      <div className="mainPageWrapper">
        <Settings />
        <div className="cardsContainer">
          <CardDeck>
            { this.Flats }
          </CardDeck>
        </div>
        <Pagination>
          <PaginationItem disabled={this.props.index === 0}>
            <PaginationLink
              previous
              onClick={() => this.props.changePage(0)}
              href="#"
            />
          </PaginationItem>
          { this.Pages }
          <PaginationItem disabled={this.props.index === pagesQuantity}>
            <PaginationLink
              next
              onClick={() => this.props.changePage(pagesQuantity)}
              href="#"
            />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    favoriteFlats: state.auth.favoriteFlats,
    orderBy: state.actions.orderBy,
    sortBy: state.actions.sortBy,
    chunksSize: state.actions.chunksSize,
    flats: state.flats,
    index: state.actions.pageIndex,
    pagesIndexes: state.flats.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFlats: bindActionCreators(getFlats, dispatch),
    changePage: bindActionCreators(changePage, dispatch),
    addFavorite: bindActionCreators(addFavorite, dispatch),
    removeFavorite: bindActionCreators(removeFavorite, dispatch),
  };
}

MainPage.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
  favoriteFlats: PropTypes.array.isRequired,
  changePage: PropTypes.func.isRequired,
  addFavorite: PropTypes.func.isRequired,
  removeFavorite: PropTypes.func.isRequired,
  getFlats: PropTypes.func.isRequired,
  orderBy: PropTypes.number.isRequired,
  chunksSize: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  flats: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })).isRequired,
  pagesIndexes: PropTypes.shape({
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
