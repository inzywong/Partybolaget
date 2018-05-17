import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../../firebase/firebase';
import { Redirect } from 'react-router';


class SignOut extends Component {
  constructor(props) {
    super(props);
    this.signOut = this.signOut.bind(this);
    this.state = {
      toWelcome: false,
    }
  }

  signOut() {
    fire.auth().signOut();
    this.setState({
      toWelcome: true
    })
  }
  render() {
    if(this.state.toWelcome)
  		{
  				return <Redirect push to="/welcome" />;
  		}
    return (
      <button type="submit" onClick={this.signOut} class="btn btn-primary">Logout</button>
    );
  }
}

export default SignOut;