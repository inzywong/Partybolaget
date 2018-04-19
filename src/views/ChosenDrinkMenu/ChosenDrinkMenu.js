import React, { Component } from 'react';
import './ChosenDrinkMenu.css';
import { Link } from 'react-router-dom';


class ChosenDrinkMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinkMenu: 'Chosen Drink Menu',
      nameOfChosenDrink : this.props.model.getChosenDrink(),
    }
  }

  componentDidMount = () => {
    this.props.model.addObserver(this)
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
    })
  }

  onAddDrink = (e) => {
    this.props.model.setAddDrink(e.target.value)
    this.props.model.setAddDrinkAmount()
  }

  onMinusDrink = (e) => {
    this.props.model.setMinusDrink(e.target.value)
    this.props.model.setMinusDrinkAmount()
  }

  render() {
    let chosenDrinksList = null;

    chosenDrinksList=this.state.nameOfChosenDrink.map((drink) =>
        <div className="row" key={drink.id}>
          <div className="row">
            <p className="col">{drink.name}</p>
          </div>
          <div className="row">
            <button className="col-md-4" value={drink.id} onClick={this.onAddDrink}>+</button>
            <p className="col-md-4">{drink.amount}</p>
            <button className="col-md-4" value={drink.id} onClick={this.onMinusDrink}>-</button>
          </div>
        </div>
      )

    return (
      <div className="chosenDrink col-md-12">
        <h3>{this.state.drinkMenu}</h3>
        {chosenDrinksList}
        <Link to="/SummaryPage">
          <button className="btn btn-success" value="SummaryPage">Confirm</button>
				</Link>
        
      </div>
    );
  }
}

export default ChosenDrinkMenu;
