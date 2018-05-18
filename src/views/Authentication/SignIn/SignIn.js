import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../../../firebase/firebase';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.makeNewAccount = this.makeNewAccount.bind(this);
    this.state = {
      email: '',
      password: '',
      condition:true,
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  signIn(e) {
    e.preventDefault();
    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).catch((error) => {
      console.log(error);
      alert("I am Sorry, please check your username or password again");
    });
  }

  makeNewAccount(){
    this.setState({
      condition:false
    });
  }

  signUp(e) {
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
    }).then((u) => { console.log(u) })
    .catch((error) => {
      console.log(error);
      alert("I am Sorry, please use your existing username or password for email");
    })
  }

  render() {
    if (this.state.condition){
    return (
      <div className="SignIn row">
        <div className="col-md-4"> </div>
        <div className="col-md-4 formSignIn">
          <h3>Login</h3>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button type="submit" onClick={this.signIn} class="btn btn-primary">Login</button>
            <button onClick={this.makeNewAccount} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
          </form>
        </div>
      </div>
    );
  }else{
    return(
      <div className="SignIn row">
        <div className="col-md-4"> </div>
        <div className="col-md-4 formSignIn">
          <h3>SignUp</h3>
          <form>
            <div class="form-group">
              <label for="exampleInputEmail1">Email address</label>
              <input value={this.state.email} onChange={this.handleChange} type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
              <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Password</label>
              <input value={this.state.password} onChange={this.handleChange} type="password" name="password" class="form-control" id="exampleInputPassword1" placeholder="Password" />
            </div>
            <button onClick={this.signUp} style={{ marginLeft: '25px' }} className="btn btn-success">Signup</button>
          </form>
        </div>
      </div>
    );
  }
  }
}
export default SignIn;
