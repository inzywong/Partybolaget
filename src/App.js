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
/*--------------------------------------------------------------*/


class App extends Component {
  constructor(props){
    super(props);
    this.state={
      user:{},
    }
  }

  componentDidMount(){
    this.authListener();
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
        <div className="row myHeader col-lg-12 col-sm-12">

          <center><h1><img src="./images/logo.png" ></img>
            <b>Partybolaget</b></h1></center>
            <SignOut  model={this.props.model} />
        </div>
        {/* END OF HEADER -------------------------------------------- */}

        {/* CONTENT -------------------------------------------------- */}
        <div className="row appContent container-fluid col-lg-12 col-sm-12">
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
        <div className="row myFooter col-lg-12 col-sm-12">
							<center><p> @2018 KTH</p></center>
					</div>
					{/* END OF FOOTER -------------------------------------------- */}

      </div>
    );
  }
}

export default App;
