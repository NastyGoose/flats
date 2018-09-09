import React, { PureComponent } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import PropTypes from 'prop-types';
import { getFlats } from '../../Redux/actions/flats.actions';

class MainPage extends PureComponent {
  constructor () {
    super();
    this.state = {
      users: undefined
    };
  }
  componentDidMount () {
    this.props.getFlats();
    axios.get('http://localhost:8080/')
      .then(res => {
        this.setState({ users: res.data });
        console.log(this.state.users);
      })
      .catch(err => { console.log(err); });
  }

  render () {
    let cardArr = this.props.flats.map(user =>
      <Card key={user.id}>
        <CardImg
          top
          width='100%'
          src='https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180'
          alt='Card image cap'
        />
        <CardBody>
          <CardTitle> {user.name} </CardTitle>
          <CardSubtitle> Card subtitle </CardSubtitle>
          <CardText>
            This is a wider card with supporting text below as a natural lead-in to additional content.
            This content is a little bit longer.
          </CardText>
          <Button> Button </Button>
        </CardBody>

      </Card>
    );

    let pages = this.props.flats.map((user, index) =>
      <PaginationItem active={index === 0}>
        <PaginationLink href='#'>
          {index + 1}
        </PaginationLink>
      </PaginationItem>
    );

    return (
      <div className='mainPageWrapper'>
        <div className={this.props.showSettings ? 'settings-active' : 'settings-disabled'} />
        <div className='cardsContainer'>
          <CardDeck>
            {cardArr}
          </CardDeck>
        </div>
        <Pagination aria-label='Page navigation example'>
          <PaginationItem disabled>
            <PaginationLink previous href='#' />
          </PaginationItem>
          {pages}
          <PaginationItem>
            <PaginationLink next href='#' />
          </PaginationItem>
        </Pagination>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    showSettings: state.actions.showSettings,
    flats: state.flats
  };
}

function mapDispatchToProps (dispatch) {
  return {
    getFlats: bindActionCreators(getFlats, dispatch)
  };
}

MainPage.propTypes = {
  showSettings: PropTypes.bool.isRequired,
  getFlats: PropTypes.func.isRequired,
  flats: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
