

import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './FinalPage.css';
import { Redirect } from 'react-router';

class FinalPage extends Component {

  constructor(props) {
    super(props)

    // We put on state the properties we want to use and modify in the component
    this.state = {
      condition:false
    }
    this.onBackHome= this.onBackHome.bind(this);
  }

  // in our update function we modify the state which will
  // cause the component to re-render
  update() {
  }

  onBackHome(){
    this.setState({
      condition:true
    });
    window.location.reload(true);
  }

  render() {
    if(this.state.condition){
      return <Redirect push to="/" />
      //window.location.reload(true);
    }
    return (
      <div className="col-lg-12 Final">
        <h1> Congratulations, You'll receive your list of drinks by e-mail, good luck with your shop! </h1>
          <button onClick={this.onBackHome} className="btn btn-secondary">
            Home
          </button>
      </div>
    );
  }

}

export default FinalPage;
