import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SummaryPage.css';


class SummaryPage extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
			drinkMenu: this.props.model.getDrinkMenu()
		}
	}

	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
    this.props.model.addObserver(this)
  }
	// Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
		this.setState({
			drinkMenu: this.props.model.getDrinkMenu
		})
  }


  render() {
		let drinkList=null;
		drinkList = this.state.drinkMenu.map((drink) =>
          <div key={drink.id} className="drinkCard drinkList col-sm-4">
            <p>{drink.name}</p>
            <p>{Math.round(drink.alcohol*100)} %</p>
            <p>{drink.volume*1000} mL</p>
            <p>{drink.price} kr</p>
          </div>
				)

    return (
      <div className="col-lg-12">
			<h1>Summary</h1>
			{drinkList}
      </div>
    );
  }
}

export default SummaryPage;
