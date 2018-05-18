// This component is responsible for showing a form or the guests profile.
// Here is where the user actually edits the guests profile.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GuestProfile.css';
import ReactDOM from 'react-dom';


class GuestProfile extends Component {

  constructor(props) {
    super(props)


    // We put on state the properties we want to use and modify in the component
    this.state = {
			name:	this.props.model.getGuestById(this.props.guestId).name,
			sex: this.props.model.getGuestById(this.props.guestId).sex,
			weight: this.props.model.getGuestById(this.props.guestId).weight,
			drinkingSkills: this.props.model.getGuestById(this.props.guestId).drinkingSkills,
			preferedDrink: this.props.model.getGuestById(this.props.guestId).preferedDrink,
			saved: this.props.model.getGuestById(this.props.guestId).saved,
			deleted: false
		}
  }



	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
		//console.log(this.props.guestId);

    this.props.model.addObserver(this);
  }
	// Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }


  // in our update function we modify the state which will
  // cause the component to re-render
  update() {

		if(this.state.deleted == false)
		{
			// setState causes the component to re-render
			this.setState( {
				name:	this.props.model.getGuestById(this.props.guestId).name,
				sex: this.props.model.getGuestById(this.props.guestId).sex,
				weight: this.props.model.getGuestById(this.props.guestId).weight,
				drinkingSkills: this.props.model.getGuestById(this.props.guestId).drinkingSkills,
				preferedDrink: this.props.model.getGuestById(this.props.guestId).preferedDrink,
				saved: this.props.model.getGuestById(this.props.guestId).saved
			});
		}
  }

	handleSubmit(e){

		if(this.refs.guestName.value === '' ){
			alert('You need to specify a name for the Guest!');
		}
		else{
			var guestProf = {
				name: this.refs.guestName.value,
				sex: this.refs.sex.value,
				weight: this.state.weight,
				drinkingSkills: this.refs.drinkingSkills.value,
				preferedDrink: this.refs.drinkingPreference.value,
				id: this.props.guestId,
				saved: true
			};

			this.props.model.saveGuest(guestProf);
		}
		e.preventDefault(); // preventing from submitting the form
	}

	handleChange(e){
/*
		this.setState({
			weight: e
		});
		e.preventDefault(); // preventing from submitting the form*/
	}

	onWeightChanged = (increment) =>{
		var w = this.state.weight + increment;

		if(w<30)
		{
			w = 30;
		}

    this.setState({
			weight: w
		});
	}

	editProfile = () =>{
		this.setState({saved: false});
	}

	deleteGuest = () =>{
		// Deleting this component
    //this.setState({
		//	deleted: true
		//});
		this.state.deleted = true;

		this.props.model.deleteGuestById(this.props.guestId);

		//ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    this.props.model.removeObserver(this);
	}




  render() {

		// In case this Guest was deleted, we should not display it anymore.
		if(this.state.deleted)
		{
			return (null);
		}
		// If this guest was already saved.
		else if(this.state.saved)
		{

			return(
				<div className="GuestProfile row blue square">
					{/*  PARTY NAME  ----------------------------*/}
					<div>
						<p> Guest Name: <b> {this.state.name} </b> </p>
					</div>
					{/*------------------------------------------*/}


					{/*  SEX  -----------------------------------*/}
					<div>
						<p> Sex: {this.state.sex} </p>
					</div>
					{/*------------------------------------------*/}


					{/*  WEIGHT  --------------------------------*/}
					<div>
						<p> Weight: {this.state.weight} Kg</p>
					</div>
					{/*------------------------------------------*/}

					{/*  DRINK SKILLS ---------------------------*/}
					<div>
						<p> Drinking Skills: {this.state.drinkingSkills} </p>
					</div>
					{/*------------------------------------------*/}


					{/*  DRINKING PREFERENCE --------------------*/}
					<div>
						<p> Drinking Preference: {this.state.preferedDrink} </p>
					</div>
					{/*------------------------------------------*/}

					<button type="button" className="btn btn-primary" onClick={() => this.editProfile()}>
						Edit Profile
					</button>

					<button type="button" className="btn btn-danger" onClick={() => this.deleteGuest()}>
						Delete Guest
					</button>
				</div>
			);

		}
		// If this guest is being edited.
		else
		{
			return (
				<div className="GuestProfile row blue square">

					<form onSubmit={this.handleSubmit.bind(this)}> {/*you have to bind this in order to 'handleSubmit' access the refs*/}

						{/*  PARTY NAME  ----------------------------*/}
						<div>
							<p> Guest Name: </p>
							<input type="text" ref="guestName" /> <br/> <br/>
						</div>
						{/*------------------------------------------*/}


						{/*  SEX  -----------------------------------*/}
						<div>
							<p> Sex </p>
							<select ref="sex">
								<option value="f">Female</option>
								<option value="m">Male</option>
							</select>
						</div>
						{/*------------------------------------------*/}


						{/*  WEIGHT  --------------------------------*/}
						<div>
							<p> Weight: {this.state.weight} Kg</p>
              				<input type="range" min="1" max="150" defaultValue={this.state.weight} onChange={this.handleChange.bind(this)}></input>
							<button	type="button" className="btn" onClick={() => this.onWeightChanged(-1)}>
								<span className="glyphicon glyphicon-minus"> </span>
							</button>

							<button type="button" className="btn" onClick={() => this.onWeightChanged(1)}>
								<span className="glyphicon glyphicon-plus"> </span>
							</button>
							<br/> <br/>
						</div>
						{/*------------------------------------------*/}


						{/*  DRINK SKILLS ---------------------------*/}
						<div>
							<p> Drinking Skills </p>
							<select ref="drinkingSkills">
								<option value="light">Light</option>
								<option value="medium">Medium</option>
								<option value="heavy">Heavy</option>
							</select>
						</div>
						{/*------------------------------------------*/}


						{/*  DRINKING PREFERENCE --------------------*/}
						<div>
							<p> Drinking Preference </p>
							<select ref="drinkingPreference">
								<option value="beer">Beer</option>
								<option value="wine">Wine</option>
								<option value="champagne">Champagne</option>
								<option value="hardliquor">Hard Liquor</option>
								<option value="liquor">Liquor</option>
							</select>
						</div>
						{/*------------------------------------------*/}


						<input type="submit" value="Create Profile" className="btn btn-primary"/>

					</form>

					{/* DELETE PROFILE */}
					<button type="button" className="btn btn-danger" onClick={() => this.deleteGuest()}>
						Delete Guest
					</button>
				</div>
			);
		}
  }
}

export default GuestProfile;
