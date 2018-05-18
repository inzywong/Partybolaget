import React, { Component } from 'react';
import './ChosenDrinkMenu.css';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';



class ChosenDrinkMenu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      drinkMenu: 'Chosen Drink Menu',
      nameOfChosenDrink : this.props.model.getChosenDrink(),
      redirectToSummary: false
    }
  }

  componentDidMount = () => {
    this.props.model.addObserver(this)
  }

  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }

  update() {
    this.setState({
    })
  }

  onPlusButtonClicked = (e) => {
    //this.props.model.setAddDrink(e.target.value);
    //this.props.model.setAddDrinkAmount();
    this.props.model.add_removeOneDrinkUnit(e.target.value, 1);
  }

  onMinusButtonClicked = (e) => {
    //this.props.model.setMinusDrink(e.target.value)
    //this.props.model.setMinusDrinkAmount()
    this.props.model.add_removeOneDrinkUnit(e.target.value, -1);
  }

  onConfirmClick = () => {
    // Check if all the drinks reached the thershold
    // If not, we cannot go to the Summary page.

    // Get the drinkTypesChosenByGuests list
    var  drinkList = this.props.model.getDrinkType();

    for(var i=0; i<drinkList.length; i++){
      if(drinkList[i].status == 'didNotReachThreshold'){
        alert("You did not add enough " + drinkList[i].type + " to the basket." );
        return
      }
    }

    this.setState({
      redirectToSummary: true
    })
  }



  render() {

    if(this.state.redirectToSummary)
    {
      return <Redirect push to="/summaryPage" />;
    }
    else
    {
      let chosenDrinksList = null;


      //console.log(this.state.nameOfChosenDrink);


      chosenDrinksList=this.state.nameOfChosenDrink.map((drink) =>
      <div className="chosenDrinkList" key={drink.id}>
        <div className="">
          <p className="">{drink.name} : {drink.amount}</p>
        </div>
        <div className="">
          <button value={drink.id} drink_type={drink.type} onClick={this.onMinusButtonClicked}>
            -
          </button>
          <button value={drink.id} drink_type={drink.type} onClick={this.onPlusButtonClicked}>
            +
          </button>
        </div>
      </div>
    )

    return (
      <div className="chosenDrink">
        <h3 className="headline">{this.state.drinkMenu}</h3>
        <div className="">
          {chosenDrinksList}
        </div>
        <div className="chosenDrinkButton">
          <button className="btn btn-success" value="SummaryPage" onClick={this.onConfirmClick}>Confirm</button>
        </div>
      </div>
    );
  }

}
}

export default ChosenDrinkMenu;
