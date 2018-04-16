import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { modelInstance } from './data/drinkModel';

import './App.css';

/* Importing components */
import Welcome from './views/Welcome/Welcome';
import CreateGuestProfile from './views/CreateGuestProfile/CreateGuestProfile';

import FilterDrink from "./views/FilterDrink/FilterDrink";
import SelectDrink from "./views/SelectDrink/SelectDrink";
import SearchDrink from "./views/SearchDrink/SearchDrink";


class App extends Component {
  render() {
    return (
      <div className="App">

					{/* HEADER --------------------------------------------------- */}
					<div className="row myHeader">
						<h1>Partybolaget</h1>
					</div>
					{/* END OF HEADER -------------------------------------------- */}

					{/* CONTENT -------------------------------------------------- */}
					<div className="appContent container-fluid">
						{/* We render different components based on the path */}
						<Route exact path="/" render={() => <Welcome model={modelInstance}/>}/> {/* This brings us to the Welcome view */}

						<Route path="/createguestprofile"  render={() => <CreateGuestProfile model={modelInstance}/>}/>

            <Route path="/searchdrink" render={(props) => <SearchDrink info={props} model={modelInstance}/>}/>

					</div>
					{/* END OF CONTENT ------------------------------------------- */}


					{/* FOOTER --------------------------------------------------- */}
					<div className="myFooter">
							<p> @2018 Footer ...</p>
					</div>
					{/* END OF FOOTER -------------------------------------------- */}

      </div>
    );
  }
}

export default App;
