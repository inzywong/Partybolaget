import React, { Component } from 'react';
import './DrinkType.css';

class DrinkType extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinkType: 'Drink Type',
    }
  }

  update() {
    this.setState({
    })
  }

  render() {
    return (
      <div className="FilterDrink">
        <h3>{this.state.drinkType}</h3>
      </div>
    );
  }
}

export default DrinkType;
