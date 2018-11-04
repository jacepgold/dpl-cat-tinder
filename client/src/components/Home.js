import React, { Component } from 'react';
import { Header, Image } from 'semantic-ui-react';
import axios from 'axios';
import '../cards.css';
import Cards, { Card } from 'react-swipe-card';
import { setHeaders } from '../actions/headers';
import { connect } from 'react-redux';

class Home extends Component {
  state = { cats: [] }

  componentDidMount() {
    axios.get('/api/cats')
      .then( res => {
        this.props.dispatch(setHeaders(res.headers))
        this.setState({ cats: res.data }) 
      })
  }

  swipeLeft = (id) => {
    const { cats } = this.state;
    this.setState({ cats: cats.filter( c => c.id !== id ) })
  }

  swipeRight = (id) => {
    const { cats } = this.state;
    axios.put(`/api/cats/${id}`)
      .then( res => {
        this.props.dispatch(setHeaders(res.headers));
        this.setState({ cats: cats.filter( c => c.id !== id ) }) 
      })
  }

  render() {
    return (
      <Cards className="cards-root">
        { this.state.cats.map( cat =>
            <Card 
              key={cat.id}
              onSwipeLeft={ () => this.swipeLeft(cat.id) }
              onSwipeRight={ () => this.swipeRight(cat.id) }
            >
              <h2>{cat.name}</h2>
              <Image src={cat.avatar} />
              <h3>{cat.breed}</h3>
              <h3>{cat.registry}</h3>
            </Card>
          )
        }
      </Cards>
    );
  }
}

export default connect()(Home);
