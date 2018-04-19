import React, { Component } from 'react';
import './DrinkType.css';

class DrinkType extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinkType: 'Drink Type',
      nameOfDrinkType : this.props.model.getDrinkType(),
    }
  }

  update() {
    this.setState({
    })
  }

  onDrinkTypeClicked = (e) => {
    this.props.model.setDrinkTypeToSearch(e.target.value)
  }

  render() {
    let drinkType = null;
    drinkType = this.state.nameOfDrinkType.map((drink) =>
      <div key={drink.type} className="row">
        <button value={drink.type} onClick={this.onDrinkTypeClicked}>
          {drink.type}
        </button>
      </div>
    )
    return (
      <div className="FilterDrink">
        <h3>{this.state.drinkType}</h3>
        {drinkType}
      </div>
    );
  }
}

export default DrinkType;
