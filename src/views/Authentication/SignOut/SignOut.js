import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../../firebase/firebase';

class SignOut extends Component {
    constructor(props) {
      super(props);
      this.signOut = this.signOut.bind(this);
    }

    signOut(){
        fire.auth().signOut();
    }
    render() {
        return (
          <button type="submit" onClick={this.signOut} class="btn btn-primary">Logout</button>
        );
      }
}

export default SignOut;