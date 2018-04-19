import React, { Component } from 'react';
import './Alcometer.css';

class Alcometer extends Component {

  constructor(props) {
    super(props)
    this.state = {
      alcometer: 'Alcometer',
    }
  }

  update() {
  this.setState({
  })
}

  render() {
    return (
      <div className="FilterDrink">
        <h3>{this.state.alcometer}</h3>
        <p>{this.props.model.getDrinkTypeThreshold()+"%"}</p>
        <p>{this.props.model.getDrinkTypeAmount()}</p>
        <p>{this.props.model.checkThreshold()}</p>
      </div>
    );
  }
}

export default Alcometer;
