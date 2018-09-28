import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink,
} from 'reactstrap';
import PropTypes from 'prop-types';
import { Power2, TweenLite } from 'gsap';
import { getFlats } from '../../Redux/actions/flats.actions';
import { changePage } from '../../Redux/actions/settings.action';

let pagesQuantity;

class MainPage extends PureComponent {
  componentDidMount() {
    this.props.getFlats();
  }

  scrollToTop() {
    const scrollAnimation = { scrollTop: document.body.scrollHeight };
    const scrollTop = 0;

    TweenLite.to(scrollAnimation, 1, {
      scrollTop,
      ease: Power2.easeInOut,
      onUpdate: () => {
        window.scrollTo(0, scrollAnimation.scrollTop);
      },
    });
  }

  get Pages() {
    const { props } = this;
    const pages = [];
    const flatQuantity = props.flats.length;
    // minus one/none cause of "<=" in for operator
    pagesQuantity = (flatQuantity % 20 === 0) ? Math.floor(flatQuantity / 20) - 1 : Math.floor(flatQuantity / 20);
    let startIndex;
    let endIndex;
    if (this.props.index > pagesQuantity - 2) startIndex = pagesQuantity - 4;
    else startIndex = (this.props.index >= 2) ? this.props.index - 2 : 0;
    if (this.props.index < 2) endIndex = 4;
    else endIndex = (this.props.index < pagesQuantity - 2) ? this.props.index + 2 : pagesQuantity;
    for (let i = startIndex; i <= endIndex; i++) {
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
    const flats = [];
    const startIndex = this.props.index * 20;
    const endIndex = startIndex + 20;

    if (this.props.flats.length > 1) {
      for (let i = startIndex; i < endIndex; i++) {
        if (this.props.flats[i]) {
          flats[i] = (
            <Card key={this.props.flats[i].id}>
              <CardImg
                top
                height="400px"
                width="100%"
                src={this.props.flats[i].Photo}
                alt="Card image cap"
              />
              <CardBody>
                <CardTitle>
                  {' '}
                  { this.props.flats[i].Address }
                  {' '}
                </CardTitle>
                <CardSubtitle>
                  {' '}
                  { this.props.flats[i].Price }
                  {' '}
                </CardSubtitle>
                <CardText>
                  { this.props.flats[i].Description }
                </CardText>
                <Button> Button </Button>
              </CardBody>
            </Card>
          );
        }
      }
    }
    return flats;
  }

  render() {
    return (
      <div className="mainPageWrapper">
        <div className={this.props.showSettings ? 'settings-active' : 'settings-disabled'} />
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
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getFlats: bindActionCreators(getFlats, dispatch),
    changePage: bindActionCreators(changePage, dispatch),
  };
}

MainPage.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  getFlats: PropTypes.func.isRequired,
  flats: PropTypes.arrayOf(PropTypes.shape({
    address: PropTypes.string,
  })).isRequired,
  index: PropTypes.number.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
