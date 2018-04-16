import React, { Component } from 'react';
import './SearchDrink.css';
import FilterDrink from '../FilterDrink/FilterDrink';
import SelectDrink from '../SelectDrink/SelectDrink';
import DrinkType from '../DrinkType/DrinkType';
import Alcometer from '../Alcometer/Alcometer';
import ChosenDrinkMenu from '../ChosenDrinkMenu/ChosenDrinkMenu';

class SearchDrink extends Component {

  constructor(props) {
    super(props);
    this.state = {
      status: 'INITIAL',
    }
    // we put on state the properties we want to use and modify in the component
  }

  componentDidMount = () => {
    this.props.model.addObserver(this)
    this.setState({
      status: 'LOADED',
    })
  }


  update() {
    this.setState({

    })
  }

  // this is called when component is removed from the DOM
  // good place to remove observer
  componentWillUnmount() {
    this.props.model.removeObserver(this)
  }


  render() {
    switch (this.state.status) {
      case 'INITIAL':
      return (
        <em>.</em>
        );
        break;
      case 'LOADED':
      return (
        <div className="searchDrink row">
          <div className="col-md-2">
            <div className="drinkType">
              <DrinkType model={this.props.model}/>
            </div>
            <div className="">
              <ChosenDrinkMenu model={this.props.model}/>
            </div>
          </div>
          <div className="filterDrink col-md-8">
            <div className="">
              <FilterDrink model={this.props.model}/>
            </div>
            <div className="">
              <SelectDrink model={this.props.model} />
            </div>
          </div>
          <div className="alcometer col-md-2">
            <Alcometer model={this.props.model} />
          </div>
        </div>
      );
        break;
      default:
      return (
        <b>Failed to load data, please try again</b>
        );
        break;
      }
    }
  }
export default SearchDrink;
