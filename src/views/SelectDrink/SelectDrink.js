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

  onDrinkClicked = (e) => {
    var d = {
      id: e.target.value,
      name: e.target.attributes.getNamedItem("data-value").value,
      amount: 0
    }
    this.props.model.setChosenDrink(d)
  }

  render() {
    let drinksList = null;

    switch (this.state.status) {
      case 'INITIAL':
        drinksList = <p>Loading...</p>
        break;
      case 'LOADED':
        drinksList = this.state.drinks.map((drink) =>
          <div key={drink.id} className="drinkCard drinkList col-sm-2">
            <p>{drink.name}</p>
            <p>{Math.round(drink.alcohol*100)} %</p>
            <p>{drink.volume*1000} mL</p>
            <p>{drink.price} kr</p>
            <button value={drink.id} data-value={drink.name} onClick={this.onDrinkClicked}>
              Add
            </button>
          </div>
        )
        break;
      default:
        drinksList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="row Drinks col-md-12">
        <h3 className="row">Choose Drink</h3>
        <div className="row">
          {drinksList}
        </div>
      </div>
    );
  }
}

export default SelectDrink;
