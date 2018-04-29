

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FinalPage.css';

class FinalPage extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
		}
	}


  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
  }


  render() {

		return (
			<div className="col-lg-12">
				<h1> Congratulations, You'll receive your list of drinks by e-mail, good luck with your shop! </h1>
			</div>
		);			
	}

}

export default FinalPage;
