import React, { Component } from 'react';
import './FilterDrink.css';

class FilterDrink extends Component {

  constructor(props) {
    super(props)
    this.state = {
      message:<p>&#8595; Ascending</p>,
      filterDrink: 'Filter Drink',
      drinkPrice: 'Drink Price',
      alcoholPercentage: 'Alcohol Percentage',
      sort:'Sort by',
      partyName : 'Name of The Party: ' + this.props.model.getPartyName(),
      numberOfGuests : 'Number Of Guests: ' + this.props.model.getNumberOfGuests() + ' People',
      partyDuration : 'Party Duration: ' + this.props.model.getPartyDuration() + ' Hours'
    }
  }

  componentDidMount = () => {
      // Get the name of the first drink type on the menu so that we can highlight it.
    this.props.model.addObserver(this);
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

  onSortClicked = (e) => {
      if (this.props.model.getSortStatus()=="DESC"){
        this.props.model.setSortBy("ASC");
        this.state.message = <p>&#8595; Ascending</p>;
      } else if(this.props.model.getSortStatus()=="ASC"){
        this.props.model.setSortBy("DESC");
        this.state.message = <p>&#8593; Descending</p>;
      }
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
        <div className="drinkPrice row">
          <p>{this.state.drinkPrice}</p>
          <label>
            <input type="number" onChange={this.onMinPriceTextChanged} placeholder="Minimal Price"/>kr
          </label>
          <label>
            <input type="number" onChange={this.onMaxPriceTextChanged} placeholder="Maximal Price"/>kr
          </label>
        </div>
        <div className="alcoholPercentage row">
          <p>{this.state.alcoholPercentage}</p>
          <label>
            <input type="number" onChange={this.onMinAlcoholTextChanged} placeholder="Minimal Alcohol Percentage"/> %
          </label>
          <label>
            <input type="number" onChange={this.onMaxAlcoholTextChanged} placeholder="Maximal Alcohol Percentage"/> %
          </label>
        </div>
        <div className="row">
          <p>{this.state.sort}</p>
          <select className="col-sm-2" onChange={this.onSearchTypeChanged}>
            <option value="">All</option>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="alcohol">Alcohol Percentage</option>
          </select>
          <div>
            <button value={this.state.sortStatus} onClick={this.onSortClicked} className="btn btn-primary">
              {this.state.message}
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterDrink;
