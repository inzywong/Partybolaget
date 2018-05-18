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
      <div className="Alcometer">
        <h3 className="headline"> Alcometer for {this.state.drinkType}</h3>
        <p> You need <b>{Math.floor(this.props.model.getDrinkTypeThreshold())} </b> ml of Alcohol </p>
        <p> You have <b>{this.props.model.getDrinkTypeAmount()} </b> ml </p>
        <p>{this.props.model.checkThreshold(this.state.drinkType)}</p>
      </div>
    );
  }
}

export default Alcometer;
