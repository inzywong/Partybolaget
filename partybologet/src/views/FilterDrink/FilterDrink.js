import React, { Component } from 'react';
import './FilterDrink.css';

class FilterDrink extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterDrink: 'Filter Drink',
      drinkType: 'Drink Type',
      isChecked:false,
      drinkPrice: 'Drink Price'
    }
  }

  update() {
  this.setState({
  })
}

  toggleChange = (e) => {
    if (e.target.checked==true){
      //setDrinkFilterPrice(e.target.value);
    } else {
      //setDrinkFilterPrice("");
      //this.state.isChecked==true;
    }
  }

  onMinPriceTextChanged = (e) => {
    this.props.model.setDrinkMinPrice(e.target.value)
  }

  onMaxPriceTextChanged = (e) => {
    this.props.model.setDrinkMaxPrice(e.target.value)
  }

  render() {
    return (
      <div className="FilterDrink">
        <h3>{this.state.filterDrink}</h3>
        <p>{this.state.drinkType}</p>
        <label>
          <input type="checkbox" value="beer" onChange={this.toggleChange} />
          Beer
        </label>
        <label>
          <input type="checkbox" value="wine"  onChange={this.toggleChange} />
          Wine
        </label>
        <p>{this.state.drinkPrice}</p>
          <input type="number" className="col" onChange={this.onMinPriceTextChanged} placeholder="Enter Price"/>
          <input type="number" className="col" onChange={this.onMaxPriceTextChanged} placeholder="Enter Price"/>
      </div>
    );
  }
}

export default FilterDrink;
