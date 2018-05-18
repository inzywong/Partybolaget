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
      price: this.props.model.getPrice(),
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
      partyDuration: this.props.model.getPartyDuration(),
      price: this.props.model.getPrice(),
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
    this.props.model.submitDataToFirebase();
  }

  render() {
    console.log(this.props.model.getGuests())
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
      <div key={drink.id} className="drinkList col-sm-2">
        <p><b>{drink.name}</b></p>
        <p>{Math.round(drink.alcohol)} %</p>
        <p>{drink.volume} mL</p>
        <p>Amount: {drink.amount}</p>
        <p>Total:{drink.price*drink.amount} kr</p>
      </div>
    );

    return (
      <div className="Summary">
        <div className="SummaryInside">
          <h1>Summary</h1>

          <p>Party Name: {this.state.partyName}</p>
          <p>Party Duration: {this.state.partyDuration} hrs</p>
          <p>Number of Guests: {this.state.numberOfGuests} Guests</p>
          <p>Total Price: {this.state.price} kr </p>

          <p className="listOfDrink"> - List of Drinks in your basket  - </p>
          <div className="row divDrinkList">
            {drinkList}
          </div>

          <div className="row">
            <button onClick={this.onBackToEditParty} className="btn btn-secondary">
              Back To Edit Party
            </button>
            &nbsp;&nbsp;
            <button onClick={this.onBackToEditGuestsProfile} className="btn btn-secondary">
              Back To Edit Guests Profile
            </button>
            &nbsp;&nbsp;
            <button className="btn btn-success" value="SummaryPage" onClick={this.onclick} >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  }
}
}

export default SummaryPage;
