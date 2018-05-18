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

  // Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
    this.props.model.addObserver(this);
  }

  // Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }


  onDrinkTypeClicked = () => {
    this.props.model.setDrinkTypeToSearch(this.props.drinkName);
  }

  render() {
    return (
      <div className=""> {/* Print a button for each drink */}
        <button className={this.props.classes} onClick={this.onDrinkTypeClicked}>
          {this.props.drinkName}
        </button>
      </div>
    );
  }
}

export default DrinkTypeButton;
