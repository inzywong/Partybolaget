import React, { Component } from 'react';
import './ChosenDrinkMenu.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';



class ChosenDrinkMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinkMenu: 'Chosen Drink Menu',
      nameOfChosenDrink : this.props.model.getChosenDrink(),
			redirectToSummary: false
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
	
	onConfirmClick = () => {
		// Check if all the drinks reached the thershold
		// If not, we cannot go to the Summary page.
		
		// Get the drinkTypesChosenByGuests list
		var  drinkList = this.props.model.getDrinkType();
		
		for(var i=0; i<drinkList.length; i++){
			if(drinkList[i].status == 'didNotReachThreshold'){
				alert("You did not add enough " + drinkList[i].type + " to the basket." );
				return 
			}
		}
		
		this.setState({
			redirectToSummary: true
		})
	}

	
	
  render() {
			
		if(this.state.redirectToSummary)
		{
    	return <Redirect push to="/SummaryPage" />;
		}
		else
		{
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
						<button className="btn btn-success" value="SummaryPage" onClick={this.onConfirmClick}>Confirm</button>
				</div>
			);			
		}

  }
}

export default ChosenDrinkMenu;
