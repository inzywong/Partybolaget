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
      partyName : 'Party name: ' + this.props.model.getPartyName(),
      numberOfGuests : ' ' + this.props.model.getNumberOfGuests() + ' Guests',
      partyDuration : 'Duration: ' + this.props.model.getPartyDuration() + ' Hours'
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

            <div className="partyDetail row">
              <div className="col-sm-4">{this.state.partyName}</div>
              <div className="col-sm-4">{this.state.numberOfGuests}</div>
              <div className="col-sm-4">{this.state.partyDuration}</div>
            </div>
            <div className="drinkPrice row">
              <div className="col-sm-4"><p>{this.state.drinkPrice} (SEK)  </p>
              <label><input type="number" onChange={this.onMinPriceTextChanged} placeholder="Minimal" /></label>
              <label><input type="number" onChange={this.onMaxPriceTextChanged} placeholder="Maximal" /></label>

            </div>
            <div className="col-sm-4"><p>{this.state.alcoholPercentage} (%)</p>
            <label>
              <input type="number" onChange={this.onMinAlcoholTextChanged} placeholder="Minimal"/>
            </label>
            <label>
              <input type="number" onChange={this.onMaxAlcoholTextChanged} placeholder="Maximal"/>
            </label>
          </div>
          <div className="col-sm-4">
            <p>{this.state.sort}</p>
            <div>
              <select   onChange={this.onSearchTypeChanged}>
                <option value="">All</option>
                <option value="name">Name</option>
                <option value="price">Price</option>
                <option value="alcohol">Alcohol Percentage</option>
              </select>
            </div>
            <div>
              <button value={this.state.sortStatus} onClick={this.onSortClicked} className="btn btn-secondary">
                {this.state.message}
              </button>
            </div>

          </div>


        </div>

        <div className="row">

        </div>
      </div>
    );
  }
}

export default FilterDrink;
