
// This Component is responsible for creating the party parameters (name, duration, and guests objects).

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import './Welcome.css';


class Welcome extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration(),
			redirect: false
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

		// setState causes the component to re-render
    this.setState({
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration()
		})
  }


	/* NUMBER OF GUESTS CHANGED */
	// Called when the Guests' + or - button was pressed
	onNumberOfGuestsChanged = (increment) => {

		var nGuests = this.props.model.getNumberOfGuests();

		nGuests += increment;

		if(nGuests <0){
			nGuests = 0;
		}

		//this.props.model.setNumberOfGuests(nGuests);

		// Creating the guests
		if(increment > 0){
			this.props.model.createGuests(increment);
		}
		else if(increment < 0 && (this.props.model.getNumberOfGuests()+increment) >= 0){
			this.props.model.deleteLastGuestsAdded(-increment);
		}
	}

	/* DURATION CHANGED */
	// Called when the Durations' + or - button was pressed
	onDurationChanged = (increment) => {

		var duration = this.props.model.getPartyDuration();
		duration += increment;

		if(duration <0){
			duration = 0;
		}

		this.props.model.setPartyDuration(duration);
	}


	/* CLICKED ON 'PLAN PARTY!' */
	handleSubmit(e){

		if(this.refs.partyName.value === '' ){
			alert('You need to specify the name of the Party!');
		}
		else if(this.state.numberOfGuests == 0)
		{
			alert("I'm sorry but you can't have a party without guests");
		}
		else if(this.state.partyDuration == 0)
		{
			alert("I'm sorry but the party needs to be at least 1 hour long");
		}

		// In case the form was filled correctly, we can create the party.
		else {
			this.props.model.setPartyName(this.refs.partyName.value)

			this.setState({redirect: true});
		}

		e.preventDefault(); // preventing from submitting the form
	}

  render() {
		if (this.state.redirect) {
    	return <Redirect push to="/createguestprofile" />;
  	}


    return (
      <div className="Welcome col-12">
				<h1> Create your party now </h1>

				<form onSubmit={this.handleSubmit.bind(this)}> {/*you have to bind this in order to 'handleSubmit' access the refs*/}

					{/*  PARTY NAME  */}
					<div>
						<p> Name of the Party: </p>
						<input type="text" ref="partyName" className="txtParty" /> <br/> <br/>
					</div>

					{/*  DURATION  */}
					<div>
						<p> Duration: {this.state.partyDuration} hrs</p>
						<button	type="button" className="btn" onClick={() => this.onDurationChanged(-1)}>
							<span className="glyphicon glyphicon-minus"> </span>
						</button>
						<button type="button" className="btn" onClick={() => this.onDurationChanged(1)}>
							<span className="glyphicon glyphicon-plus"> </span>
						</button>
					</div>

					{/*  GUESTS  */}
					<div>
						<p> Number of Guests: {this.state.numberOfGuests} </p>
						<button	type="button" className="btn" onClick={() => this.onNumberOfGuestsChanged(-1)}>
							<span className="glyphicon glyphicon-minus"> </span>
						</button>

						<button type="button" className="btn" onClick={() => this.onNumberOfGuestsChanged(1)} >
							<span className="glyphicon glyphicon-plus"> </span>
						</button>
            {/*<input type="range" min="1" max="10" value="5"></input>*/}
						<br/> <br/>
					</div>

					<input type="submit" value="Plan Party!" className="btn btn-primary"/>

				</form>

      </div>
    );
  }
}

export default Welcome;
