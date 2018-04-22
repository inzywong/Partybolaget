import React, { Component } from 'react';
import './FilterDrink.css';

class FilterDrink extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filterDrink: 'Filter Drink',
      drinkPrice: 'Drink Price',
      alcoholPercentage: 'Alcohol Percentage',
      sort:'Sort by',
      partyName : 'Name of The Party: ' + this.props.model.getPartyName(),
      numberOfGuests : 'Number Of Guests: ' + this.props.model.getNumberOfGuests() + ' People',
      partyDuration : 'Party Duration: ' + this.props.model.getPartyDuration() + ' Hours'
    }
  }

  update() {
  this.setState({
    partyNameFromModel: this.props.model.getPartyName()
  })
}

  onMinPriceTextChanged = (e) => {
    this.props.model.setDrinkMinPrice(e.target.value)
  }

  onMaxPriceTextChanged = (e) => {
    this.props.model.setDrinkMaxPrice(e.target.value)
  }

  onMinAlcoholTextChanged = (e) => {
    this.props.model.setDrinkMinAlcoholPercentage(e.target.value)
  }

  onMaxAlcoholTextChanged = (e) => {
    this.props.model.setDrinkMaxAlcoholPercentage(e.target.value)
  }

  onSearchTypeChanged = (e) => {
    this.props.model.setSearchType(e.target.value)
  }

  render() {
    return (
      <div className="FilterDrink row">
        <h4>{this.state.filterDrink}</h4>
        <div className="partyDetail row">
          <p className="col">{this.state.partyName}</p>
          <p className="col">{this.state.numberOfGuests}</p>
          <p className="col">{this.state.partyDuration}</p>
        </div>
        <div className="drinkPrice col">
          <p>{this.state.drinkPrice}</p>
          <label>
            <input type="number" onChange={this.onMinPriceTextChanged} placeholder="Minimal Price"/>kr
          </label>
          <label>
            <input type="number" onChange={this.onMaxPriceTextChanged} placeholder="Maximal Price"/>kr
          </label>
        </div>
        <div className="alcoholPercentage col">
          <p>{this.state.alcoholPercentage}</p>
          <label>
            <input type="number" onChange={this.onMinAlcoholTextChanged} placeholder="Minimal Alcohol Percentage"/> %
          </label>
          <label>
            <input type="number" onChange={this.onMaxAlcoholTextChanged} placeholder="Maximal Alcohol Percentage"/> %
          </label>
        </div>
        <div className="col">
          <p>{this.state.sort}</p>
          <select className="col-sm-2" onChange={this.onSearchTypeChanged}>
            <option value="">All</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="alcohol">Alcohol Percentage</option>
          </select>
        </div>
      </div>
    );
  }
}

export default FilterDrink;
