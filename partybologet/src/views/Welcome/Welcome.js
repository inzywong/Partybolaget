import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './Welcome.css';


class Welcome extends Component {
  render() {
    return (
      <div className="Welcome">
				<h1> Create your party now </h1>    
			
				<form> {/*you have to bind this in order to 'handleSubmit' access the refs*/}
					<div>
						<label> Name of the Party: </label> 
						<input type="text" ref="title" /> <br/> <br/>
					</div>

					<div>
						<label> Duration: </label> 
						<input type="text" ref="title" /> <br/> <br/>
					</div>			
			
					<div>
						<label> Number of Guests: </label> 
						<input type="text" ref="title" /> <br/> <br/>
					</div>						
				
					<input type="submit" value="Submit"/>
				</form>
      </div>
    );
  }
}

export default Welcome;
