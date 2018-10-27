import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// reactstrap, material-ui and animations
import { Power2, TweenLite } from 'gsap';
import lodash from 'lodash';
import {
  CardDeck, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from '../utilitaryComponents/RadialLoader';
import { getFlats } from '../../Redux/actions/flats.action';
import { changeIndex } from '../../Redux/actions/settings.action';
// local imports
import Settings from '../header/Settings';
import Cards from '../utilitaryComponents/Card';

class MainPage extends PureComponent {
  componentWillMount() {
    console.log(this.props);
    this.page = parseInt(lodash.takeRightWhile(window.location.pathname, curr => curr !== '=').join(''), 10);
    if (!this.page) this.page = 1;
    this.filter = {
      orderBy: this.props.orderBy,
      sortBy: this.props.sortBy,
      chunksSize: this.props.chunksSize,
      minPrice: this.props.minPrice,
      maxPrice: this.props.maxPrice,
      address: this.props.address,
    };
    if (this.props.index !== this.page - 1) {
      this.props.changeIndex({
        filter: this.filter,
        index: this.page - 1,
      });
    } else {
      this.props.getFlats({
        filter: this.filter,
        index: this.props.index,
      });
    }
  }

  get Pages() {
    const pages = [];
    for (let i = this.props.pagesIndexes.startIndex; i
    <= (this.props.lastIndex < this.props.pagesIndexes.endIndex ? this.props.lastIndex : this.props.pagesIndexes.endIndex); i++) {
      pages[i] = (
        <PaginationItem active={i === this.props.index}>
          <Link to={`/page=${i + 1}`}>
            <PaginationLink
              onClick={() => {
                this.scrollToTop();
                this.props.changeIndex({
                  index: i,
                  filter: {
                    address: this.props.address,
                    orderBy: this.props.orderBy,
                    sortBy: this.props.sortBy,
                    chunksSize: this.props.chunksSize,
                    minPrice: this.props.minPrice,
                    maxPrice: this.props.maxPrice,
                  },
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
    const props = this.props.flats.flatsList;
    if (this.props.flats.flatsList.length > 0) {
      return <Cards flats={props} />;
    }
    return <Loader />;
  }

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
            <Link to="/page=1">
              <PaginationLink
                previous
                onClick={() => {
                  this.scrollToTop();
                  this.props.changeIndex({
                    index: 0,
                    filter: {
                      address: this.props.address,
                      orderBy: this.props.orderBy,
                      sortBy: this.props.sortBy,
                      chunksSize: this.props.chunksSize,
                      minPrice: this.props.minPrice,
                      maxPrice: this.props.maxPrice,
                    },
                  });
                }
                }
              />
            </Link>
          </PaginationItem>
          { this.Pages }
          <PaginationItem disabled={this.props.index === this.props.lastIndex}>
            <Link to={`/page=${this.props.lastIndex + 1}`}>
              <PaginationLink
                next
                onClick={() => {
                  this.scrollToTop();
                  this.props.changeIndex({
                    index: this.props.lastIndex,
                    filter: {
                      address: this.props.address,
                      orderBy: this.props.orderBy,
                      sortBy: this.props.sortBy,
                      chunksSize: this.props.chunksSize,
                      minPrice: this.props.minPrice,
                      maxPrice: this.props.maxPrice,
                    },
                  });
                }
                }
              />
            </Link>
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    address: state.actions.address,
    minPrice: state.actions.minPrice,
    maxPrice: state.actions.maxPrice,
    favoriteFlats: state.auth.favoriteFlats,
    orderBy: state.actions.orderBy,
    sortBy: state.actions.sortBy,
    chunksSize: state.actions.chunksSize,
    flats: state.flats,
    index: state.actions.pageIndex,
    pagesIndexes: state.flats.pages,
    lastIndex: state.flats.lastIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFlats: bindActionCreators(getFlats, dispatch),
    changeIndex: bindActionCreators(changeIndex, dispatch),
  };
}

MainPage.propTypes = {
  changeIndex: PropTypes.func.isRequired,
  getFlats: PropTypes.func.isRequired,
  minPrice: PropTypes.number.isRequired,
  maxPrice: PropTypes.number.isRequired,
  orderBy: PropTypes.number.isRequired,
  chunksSize: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
  lastIndex: PropTypes.number.isRequired,
  sortBy: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  flats: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })).isRequired,
  pagesIndexes: PropTypes.shape({
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
