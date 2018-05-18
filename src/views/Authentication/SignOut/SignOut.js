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
      akun:""
    }
  }

  componentDidMount(){
    var email="";
    var user = fire.auth().currentUser;

    if (user != null) {
      user.providerData.forEach(function (profile) {

          email=profile.email;

        //console.log("  Email: " + profile.email);
      });
      this.setState({
        akun:email
      });
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
      <div>
      <p>{this.state.akun}</p>
      <button type="submit" onClick={this.signOut} class="btn btn-primary">Logout</button>
      </div>
  );
  }
}

export default SignOut;
