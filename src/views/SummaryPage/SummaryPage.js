import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './SummaryPage.css';
import { Redirect } from 'react-router';


class SummaryPage extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
			drinkMenu: this.props.model.getDrinkMenu(),
      partyName: this.props.model.getPartyName(),
      numberOfGuests: this.props.model.getNumberOfGuests(),
      partyDuration: this.props.model.getPartyDuration(),
			returnToEditParty: false,
			returnToEditGuestsProfile: false,
			redirectToConfirm: false
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
		this.setState({
			drinkMenu: this.props.model.getDrinkMenu(),
      partyName: this.props.model.getPartyName(),
      numberOfGuests: this.props.model.getNumberOfGuests(),
      partyDuration: this.props.model.getPartyDuration()
		})
  }

	onBackToEditParty = () =>
	{
		this.setState({
			returnToEditParty: true
		})
	}

	onBackToEditGuestsProfile = () =>
	{
		this.setState({
			returnToEditGuestsProfile: true
		})
	}

  onclick = () =>{
    this.setState({
			redirectToConfirm: true
		})
  }

  render() {

  		// REDIRECT TO PLAN PARTY PAGE
  		if(this.state.returnToEditParty)
  		{
  				return <Redirect push to="/" />;
  		}
  		else if (this.state.returnToEditGuestsProfile)
  		{
  				return <Redirect push to="/createguestprofile" />;
  		}
      else if (this.state.redirectToConfirm)
      {
        return <Redirect push to="/finalpage" />;
      }
  		else
  		{
  			let drinkList=null;
  			drinkList = this.state.drinkMenu.map((drink) =>
  						<div key={drink.id} className="drinkCard drinkList col-sm-4">
  							<p>{drink.name}</p>
  							<p>{Math.round(drink.alcohol)} %</p>
  							<p>{drink.volume} mL</p>
  							<p>{drink.price} kr</p>
  						</div>
  					);

  			return (
  				<div className="col-lg-12">
  					<h1>Summary</h1>
  					<h2> Party Name: {this.state.partyName} </h2>
  					<h2> Party Duration: {this.state.partyDuration} hrs </h2>
  					<h2> Number of Guests: {this.state.numberOfGuests} Guests </h2>

  					<button onClick={this.onBackToEditParty}>
  						Back To Edit Party
  					</button>

  					<button onClick={this.onBackToEditGuestsProfile}>
  						Back To Edit Guests Profile
  					</button>

  					<h2> - List of Drinks in your basket  - </h2>
  					{drinkList}
  					<button className="btn btn-success" value="SummaryPage" onClick={this.onclick} >
  						Confirm
  					</button>
  				</div>
  			);
  		}
    }
  }

export default SummaryPage;
