import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/drinkModel';

import './App.css';

/* Importing components --------------------------------------- */
import Welcome from './views/Welcome/Welcome';
import CreateGuestProfile from './views/CreateGuestProfile/CreateGuestProfile';

import FilterDrink 		 from "./views/FilterDrink/FilterDrink";
import SelectDrink 		 from "./views/SelectDrink/SelectDrink";
import SearchDrink 		 from "./views/SearchDrink/SearchDrink";
import GuestProfile 	 from "./views/GuestProfile/GuestProfile";
import SummaryPage 		 from "./views/SummaryPage/SummaryPage";
import DrinkTypeButton from "./views/DrinkTypeButton/DrinkTypeButton";
import FinalPage 			 from "./views/FinalPage/FinalPage";
import SignIn          from "./views/Authentication/SignIn/SignIn";
import SignOut         from "./views/Authentication/SignOut/SignOut";

import fire from './firebase/firebase';
import SignUp from './views/Authentication/SignUp/SignUp';
/*--------------------------------------------------------------*/


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
    }
  }

  componentDidMount(){
    this.hydrateStateWithLocalStorage();
    this.authListener();
  }

  hydrateStateWithLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);

        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ [key]: value });
        } catch (e) {
          // handle empty string
          this.setState({ [key]: value });
        }
      }
    }
  }

  authListener(){
    fire.auth().onAuthStateChanged((user) =>{
      console.log(user);
      if(user){
        this.setState({user});
        // localStorage.setItem('user', user.uid);
      }else{
        this.setState({user:null});
        //localStorage.removeItem('user');

      }
    });
  }

  render() {
    return (
      <div className="App">
        {/* HEADER --------------------------------------------------- */}
        <div className="row myHeader ">
          <div className="col-sm-3"></div>
          <div className="col-sm-6">
            <h1><img style={{height: "20px", width: "20px"}} src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/Emoji_u1f378.svg/2000px-Emoji_u1f378.svg.png" ></img>
            <b>Partybolaget</b></h1>
          </div>
          <div className="col-sm-3">
            {this.state.user  ?  (<SignOut  model={this.props.model} />) : (SignUp)}
          </div>
        </div>
        {/* END OF HEADER -------------------------------------------- */}

        {/* CONTENT -------------------------------------------------- */}
        <div className="row appContent container-fluid">
          {this.state.user  ? (<Welcome model={modelInstance}/>) : (<SignIn/>)}
          {/* We render different components based on the path
            <Route exact path="/" render={() => <Welcome model={modelInstance}/>}/> */}{/* This brings us to the Welcome view */}

            <Route path="/createguestprofile"  render={() => <CreateGuestProfile model={modelInstance}/>}/>

            <Route path="/searchdrink"  render={(props) => <SearchDrink info={props} model={modelInstance}/>}/>
            <Route path="/summarypage"  render={() => <SummaryPage model={modelInstance}/>}/>
            <Route path="/FinalPage"  	render={() => <FinalPage model={modelInstance}/>}/>

          </div>
          {/* END OF CONTENT ------------------------------------------- */}


          {/* FOOTER --------------------------------------------------- */}
          <div className="row myFooter">
            <center><p> @2018 KTH</p></center>
          </div>
          {/* END OF FOOTER -------------------------------------------- */}

        </div>
      );
    }
  }

  export default App;
