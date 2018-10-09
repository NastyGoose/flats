import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// reactstrap and animations
import { Power2, TweenLite } from 'gsap';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';

// redux stuff
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Loader from './loader';
import { getFlats } from '../../Redux/actions/flats.actions';
import { changePage } from '../../Redux/actions/settings.action';

import Settings from '../header/Settings';

let pagesQuantity;

class MainPage extends PureComponent {
  componentWillMount() {
    console.log('pathname: ', window.location.pathname);
    const filter = {
      sort: 'Price',
      order: -1,
    };
    const chunksSize = 20;
    const page = 0;
    this.props.getFlats(filter, chunksSize, page);
  }

  get Pages() {
    const pages = [];
    for (let i = this.props.pagesIndexes.startIndex; i <= this.props.pagesIndexes.endIndex; i++) {
      pages[i] = (
        <PaginationItem active={i === this.props.index}>
          <PaginationLink
            onClick={() => {
              this.scrollToTop();
              this.props.changePage(i);
            }
          }
          >
            {i + 1}
          </PaginationLink>
        </PaginationItem>
      );
    }
    return pages;
  }


  get Flats() {
    console.log('flats: ', this.props.flats);
    if (this.props.flats.flatsList.length > 0) {
      return this.props.flats.flatsList[this.props.index].map(curr => (
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
            <Button> Button </Button>
          </CardBody>
        </Card>
      ));
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
    showSettings: state.actions.showSettings,
    flats: state.flats,
    index: state.actions.pageIndex,
    pagesIndexes: state.flats.pages,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFlats: bindActionCreators(getFlats, dispatch),
    changePage: bindActionCreators(changePage, dispatch),
  };
}

MainPage.propTypes = {
  changePage: PropTypes.func.isRequired,
  getFlats: PropTypes.func.isRequired,
  flats: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })).isRequired,
  index: PropTypes.number.isRequired,
  pagesIndexes: PropTypes.shape({
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
  }),
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
