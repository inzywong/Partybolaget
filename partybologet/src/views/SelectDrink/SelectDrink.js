import React, { Component } from 'react';
import './SelectDrink.css';

class SelectDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL'
    }
  }

  componentDidMount = () => {
    this.props.model.addObserver(this)
    
    this.props.model.getAllDrinks().then(drinks => {
      this.setState({
        status: 'LOADED',
        drinks: drinks
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
  this.props.model.getAllDrinks().then(drinks => {

    this.setState({
      status: 'LOADED',
      drinks: drinks
    })
  }).catch(() => {
    this.setState({
      status: 'ERROR'
    })
  })
}

  render() {
    let drinksList = null;

    switch (this.state.status) {
      case 'INITIAL':
        drinksList = <p>Loading...</p>
        break;
      case 'LOADED':
        drinksList = this.state.drinks.map((drink) =>
          <div key={drink.id} className="dishes col-sm-2" style={{width:215}}>
            <p>{drink.name}</p>
            <p>{drink.volume} L</p>
            <p>{drink.price} kr</p>
          </div>
        )
        break;
      default:
        drinksList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="Dishes">
        <h3 className="row">Choose Drink</h3>
        <div className="row">
          {drinksList}
        </div>
      </div>
    );
  }
}

export default SelectDrink;
