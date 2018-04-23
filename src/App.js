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

/*--------------------------------------------------------------*/


class App extends Component {
  render() {
    return (
      <div className="App">

					{/* HEADER --------------------------------------------------- */}
					<div className="row myHeader col-lg-12 col-sm-12">
						<center><h1><b>Partybolaget</b></h1></center>
					</div>
					{/* END OF HEADER -------------------------------------------- */}

					{/* CONTENT -------------------------------------------------- */}
					<div className="row appContent container-fluid col-lg-12 col-sm-12">
						{/* We render different components based on the path */}
						<Route exact path="/" render={() => <Welcome model={modelInstance}/>}/> {/* This brings us to the Welcome view */}

						<Route path="/createguestprofile"  render={() => <CreateGuestProfile model={modelInstance}/>}/>

            <Route path="/searchdrink" render={(props) => <SearchDrink info={props} model={modelInstance}/>}/>
						<Route path="/summarypage"  render={() => <SummaryPage model={modelInstance}/>}/>

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
