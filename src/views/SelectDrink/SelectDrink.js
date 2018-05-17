import React, { Component } from 'react';
import './SelectDrink.css';

class SelectDrink extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
      chooseDrinkWithName : 'Choose ' + this.props.model.getDrinkTypeName(),
			type: this.props.model.getDrinkTypeName()
    }
  }

// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount = () => {
    this.props.model.addObserver(this)

    this.props.model.getAllDrinks().then(drinks => {

      this.setState({
        status: 'LOADED',
        drinks: drinks,
        chooseDrinkWithName : 'Choose ' + this.props.model.getDrinkTypeName(),

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
          status: 'LOADED',
					type: this.props.model.getDrinkTypeName()
        })
        break;
      default:
        this.setState({
          status: 'INITIAL',
					type: this.props.model.getDrinkTypeName()
        })

        this.props.model.getAllDrinks().then(drinks => {
          this.setState({
            status: 'LOADED',
            drinks: drinks,
            chooseDrinkWithName : 'Choose ' + this.props.model.getDrinkTypeName(),
						type: this.props.model.getDrinkTypeName()
          })
        }).catch(() => {
          this.setState({
            status: 'ERROR'
          })
        })
        break;
    }
  }

  onAddClicked = (e) => {
    var d = {
      id: e.target.attributes.getNamedItem("drink_id").value,
      name: e.target.attributes.getNamedItem("drink_name").value,
      amount: 0,
      alcohol: e.target.attributes.getNamedItem("drink_alcohol").value,
      volume: e.target.attributes.getNamedItem("drink_volume").value,
      price: e.target.attributes.getNamedItem("drink_price").value,
			type: this.state.type
    }

    this.props.model.addDrinkToMenu(d)
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
            <p><b>{drink.name}</b></p>
            <p>{Math.round(drink.alcohol*100)} %</p>
            <p>{drink.volume*1000} mL</p>
            <p>{drink.price} kr</p>
            <button drink_id={drink.id} drink_name={drink.name}
              drink_alcohol={drink.alcohol*100} drink_volume={drink.volume*1000}
              drink_price={drink.price} onClick={this.onAddClicked}
            className="btn btn-secondary">
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
