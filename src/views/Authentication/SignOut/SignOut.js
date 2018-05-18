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
      localStorage.setItem("akun", email);
      this.setState({
        akun:localStorage.getItem("akun")
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
    var userName = localStorage.getItem("akun");
    if(this.state.toWelcome)
    {
      return <Redirect push to="/" />;
    }
    return (
      <div>
        <p>Welcome....{userName}</p>
        <button type="submit" onClick={this.signOut} class="btn btn-primary">Logout</button>
      </div>
    );
  }
}

export default SignOut;
