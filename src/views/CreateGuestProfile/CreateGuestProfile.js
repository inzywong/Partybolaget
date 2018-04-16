import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateGuestProfile.css';



/* Importing components --------------------------------------- */
import GuestProfile from "../GuestProfile/GuestProfile";
/*--------------------------------------------------------------*/

class CreateGuestProfile extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
			partyName: this.props.model.getPartyName(),
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration(),
			guests: this.props.model.getGuests()
		}
  }


	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
    this.props.model.addObserver(this);
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
	
	

  render() {
		
		var listOfGuests = null;
		
		if(this.state.numberOfGuests > 0 ){
			listOfGuests = this.state.guests.map( guest => 			 
					<GuestProfile key={guest.id} guestId={guest.id} model={this.props.model}/>
				);
		}
	  else{
			listOfGuests = "You don't have guests"
		}
			 
			 
	
		
		
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
			
			
				<Link to="/searchdrink">
					<button>
	        	Plan Drinks
	        </button>
				</Link>
			
      </div>
    );
  }
}

export default CreateGuestProfile;
