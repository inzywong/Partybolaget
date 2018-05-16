// This component is esponsible for creating and editing the guests profile.
// It’s also possible to delete and add guests in this view.

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateGuestProfile.css';
import { Redirect } from 'react-router';

import fire from '../../firebase/firebase';


/* Importing components --------------------------------------- */
import GuestProfile from "../GuestProfile/GuestProfile";
/*--------------------------------------------------------------*/

class CreateGuestProfile extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
      name:"",
			partyName: this.props.model.getPartyName(),
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration(),
			guests: this.props.model.getGuests(),
			redirectToSearchDrink: false,
			returnToEditParty: false
		}
  }


	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
    this.props.model.addObserver(this);

//------------------Read Firebase data-----------------------------------------
/*
    var user = fire.auth().currentUser;
    var database = fire.database();

    var ref = fire.database().ref("users/" + user.uid + "/listOfFriends");

    ref.on('value', snap => {
      var listData = snap.val();
      var keys = Object.keys(listData);
      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        var name = listData[k];
        this.setState({
          name:name
        });
      }
    });
*/
  }

	// Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }


  // in our update function we modify the state which will
  // cause the component to re-render
  update() {

		// setState causes the component to re-render
    this.setState({
			partyName: this.props.model.getPartyName(),
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration()
		})
  }


	addGuest = () => {
		this.props.model.createGuests(1);
	}


	onPlanDrinksClicked  = () =>
	{
		// GUEST LIST IS NOT EMPTY
		if(this.props.model.getNumberOfGuests() > 0){
			// Check if all profiles were created

			// REDIRECT TO Search drink
			// If all profiles were properly created, let's redirect to the search drink page
			if(this.props.model.wereAllProfilesCreated()){

				// Save the drink types the guests chose
				this.props.model.createDrinkTypesList();
				//console.log(this.props.model.getDrinkType());

				// Calculate the mininum amount of alcohol volume for each drink type
				this.props.model.calculateVolumeOfAlcohol();


				this.setState({
					redirectToSearchDrink: true
				})
			}
			// GUEST LIST IS EMPTY
			else{ // In case the user didn't save/create all the profiles
				alert("Please create and save all the profiles before planning the drinks");
			}
		}
		else // We can't have any party if there are no guests
		{
			alert("I'm sorry but you can't have a party without guests");
		}
	}

	onBackToEditParty = () =>
	{
		this.setState({
			returnToEditParty: true
		})
	}

  render() {
    console.log(this.state.name)
		var listOfGuests = null;

		if(this.state.numberOfGuests > 0 ){
			listOfGuests = this.state.guests.map(guest =>
					<GuestProfile key={guest.id} guestId={guest.id} model={this.props.model}/>
				);
		}
	  else{
			listOfGuests = "You don't have guests"
		}


		// REDIRECT TO SEARCH DRINK PAGE
		if(this.state.redirectToSearchDrink){
		  return <Redirect push to="/searchdrink" />;
		}

		// REDIRECT TO PLAN PARTY PAGE
		else if(this.state.returnToEditParty)
		{
				return <Redirect push to="/" />;
		}
		else{
			return (
				<div className="CreateGuestProfile col-12">
					<h1> Create the Guests Profile for: {this.state.partyName}</h1>
					<h3> Number of Guests: {this.state.numberOfGuests}</h3>
					<button type="button" className="btn" onClick={() => this.addGuest()}>
						Add 1 Guest
					</button>

					<div>
						{listOfGuests}
					</div>


					<button onClick={this.onPlanDrinksClicked}>
							Plan Drinks
					</button>

					<button onClick={this.onBackToEditParty}>
							Back To Edit Party
					</button>

				</div>
			);
		}

  }
}

export default CreateGuestProfile;
