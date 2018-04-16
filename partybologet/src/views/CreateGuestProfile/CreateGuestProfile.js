import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CreateGuestProfile.css';


class CreateGuestProfile extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
			partyName: this.props.model.getPartyName(),
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration()
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
			partyName: this.props.model.getPartyName(),
			numberOfGuests: this.props.model.getNumberOfGuests(),
			partyDuration: this.props.model.getPartyDuration()
		})
  }




  render() {
    return (
      <div className="CreateGuestProfile col-12">
				<h1> Create the Guests Profile for: {this.state.partyName}</h1>
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
