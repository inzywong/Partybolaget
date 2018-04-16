import React, { Component } from 'react';
import './SearchDrink.css';
import FilterDrink from '../FilterDrink/FilterDrink';
import SelectDrink from '../SelectDrink/SelectDrink';

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
          <div className="filterDrink col-md-2">
            <FilterDrink model={this.props.model}/>
          </div>
          <div className="selectDrink col-md-10">
            <SelectDrink model={this.props.model} />
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
