import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Card, Button, CardImg, CardTitle, CardText, CardDeck,
  CardSubtitle, CardBody } from 'reactstrap';

const cardItem =
  <Card >
    <CardImg top width='100%' src='https://placeholdit.imgix.net/~text?txtsize=33&txt=256%C3%97180&w=256&h=180' alt='Card image cap' />
    <CardBody>
      <CardTitle>Card title</CardTitle>
      <CardSubtitle>Card subtitle</CardSubtitle>
      <CardText>This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</CardText>
      <Button>Button</Button>
    </CardBody>
  </Card>;

const cardArr = [cardItem, cardItem, cardItem, cardItem, cardItem, cardItem];

class MainPage extends PureComponent {
  render () {
    return (
      <div className='cardsContainer'>
        <CardDeck>
          {cardArr}
        </CardDeck>
      </div>
    );
  }
}

export default MainPage;
