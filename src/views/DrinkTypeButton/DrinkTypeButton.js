import React, { Component } from 'react';
import './DrinkTypeButton.css';

class DrinkTypeButton extends Component {

  constructor(props) {
    super(props)
    this.state = {
   		
    }
  }

  update() {

  }

  onDrinkTypeClicked = () => {
		this.props.model.setDrinkTypeToSearch(this.props.drinkName);
  }

  render() { 		
    return (
      <div className="row"> {/* Print a button for each drink */}
        <button className={this.props.classes} onClick={this.onDrinkTypeClicked}>
					{this.props.drinkName}
        </button>
      </div>
    );
  }
}

export default DrinkTypeButton;
