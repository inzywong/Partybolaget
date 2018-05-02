import React, { Component } from 'react';
import './DrinkType.css';

/* Importing components --------------------------------------- */
import DrinkTypeButton from "../DrinkTypeButton/DrinkTypeButton";
import GuestProfile from "../GuestProfile/GuestProfile";

/*--------------------------------------------------------------*/


class DrinkType extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinkType: 'Drink Type',
      drinksToBuy: this.props.model.getDrinkType(), // Returns the list of the drinks type chosen by the guests
    }
  }

  update(obj) {
		if(obj == 'amountchange')
		{
			this.setState({
						drinksToBuy: this.props.model.getDrinkType(), // Returns the list of the drinks type chosen by the guests
			})	
		}
  }
	
	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
    this.props.model.addObserver(this);
  }
	
	// Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }

	
	

  render() {
    let drinkType = []; //null
		
		for(var i=0; i<this.state.drinksToBuy.length; i++)
		{
			var drink = this.state.drinksToBuy[i];
			
			// Preparing the classes name for the buttons -----------
			var buttonClasses = drink.status;
			
			// In case we are dealing with the selected drink, we should send this 
			//  information as a class name so that we can style the button in a different way.
			if(drink.type == this.props.model.getDrinkTypeName()) 
			{
				 buttonClasses += " selected "; 
			}
			// ------------------------------------------------------
				 
			drinkType.push(<DrinkTypeButton key={drink.id} drinkName={drink.type} classes={buttonClasses} model={this.props.model}/>);
		}
		
    return (
			<div>
				<h3>Drinks To Buy</h3>
				{drinkType}
			</div>
    );
  }
}

export default DrinkType;
