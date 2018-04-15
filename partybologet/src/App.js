import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import './App.css';

/* Importing components */
import Welcome from './views/Welcome/Welcome';


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
						<Route exact path="/" component={Welcome}/> {/* This brings us to the Welcome view */}

										
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
