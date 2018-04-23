import React, { Component } from 'react';
import './Alcometer.css';

class Alcometer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alcometer: 'Alcometer',
			drinkType: this.props.model.getDrinkTypeName()
    }
  }

	
	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
		
		// setState causes the component to re-render
    //this.setState({
		//	drinkType: ''
		//})
    this.props.model.addObserver(this);				
  }
	
	
  update() {
  this.setState({
		drinkType: this.props.model.getDrinkTypeName()
  })
}

  render() {
    return (
      <div className="FilterDrink">
        <h3> Alcometer for {this.state.drinkType}</h3>
        <p>{this.props.model.getDrinkTypeThreshold()+"%"}</p>
        <p>{this.props.model.getDrinkTypeAmount()}</p>
        <p>{this.props.model.checkThreshold(this.state.drinkType)}</p>
      </div>
    );
  }
}

export default Alcometer;
