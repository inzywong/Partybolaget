import React, { Component } from 'react';
import './SelectDrink.css';

class SelectDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      chooseDrinkWithName : 'Choose ' + this.props.model.getDrinkTypeName()
    }
  }

// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount = () => {
    this.props.model.addObserver(this)

    this.props.model.getAllDrinks().then(drinks => {
      this.setState({
        status: 'LOADED',
        drinks: drinks,
        chooseDrinkWithName : 'Choose ' + this.props.model.getDrinkTypeName()
      })
    }).catch(() => {
      this.setState({
        status: 'ERROR'
      })
    })
  }

// Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this)

  }

  update(obj) {
    switch (obj){
      case 'amountchange':
        this.setState({
          status: 'CHANGEOFAMOUNT',
          status: 'LOADED'
        })
        break;
      default:
        this.setState({
          status: 'INITIAL',
        })

        this.props.model.getAllDrinks().then(drinks => {
          console.log(drinks.length)
          this.setState({
            status: 'LOADED',
            drinks: drinks,
            chooseDrinkWithName : 'Choose ' + this.props.model.getDrinkTypeName()
          })
        }).catch(() => {
          this.setState({
            status: 'ERROR'
          })
        })
        break;
    }
  }

  onDrinkClicked = (e) => {
    var d = {
      id: e.target.value,
      name: e.target.attributes.getNamedItem("data-value").value,
      amount: 0,
      alcohol :e.target.attributes.getNamedItem("data-value1").value,
      volume:e.target.attributes.getNamedItem("data-value2").value,
      price:e.target.attributes.getNamedItem("data-value3").value
    }
    this.props.model.setChosenDrink(d)
  }

  render() {
    let drinksList = null;

    switch (this.state.status) {
      case 'INITIAL':
        drinksList = <p>Loading...</p>
        break;
      case 'LOADED':
        drinksList = this.state.drinks.map((drink) =>
          <div key={drink.id} className="drinkCard drinkList col-sm-2">
            <p>{drink.name}</p>
            <p>{Math.round(drink.alcohol*100)} %</p>
            <p>{drink.volume*1000} mL</p>
            <p>{drink.price} kr</p>
            <button value={drink.id} data-value={drink.name} data-value1={drink.alcohol*100} data-value2={drink.volume*1000} data-value3={drink.price} onClick={this.onDrinkClicked}>
              Add
            </button>
          </div>
        )
        break;
      case 'CHANGEOFAMOUNT':
        break;
      default:
        drinksList = <b>Failed to load data, please try again</b>
        break;
    }

    return (
      <div className="row Drinks col-md-12">
        <h3 className="row">{this.state.chooseDrinkWithName}</h3>
        <div className="row">
          {drinksList}
        </div>
      </div>
    );
  }
}

export default SelectDrink;
