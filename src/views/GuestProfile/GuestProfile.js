// This component is responsible for showing a form or the guests profile.
// Here is where the user actually edits the guests profile.
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './GuestProfile.css';
import ReactDOM from 'react-dom';


class GuestProfile extends Component {

  constructor(props) {
    super(props)


    // We put on state the properties we want to use and modify in the component
    this.state = {
			name:	this.props.model.getGuestById(this.props.guestId).name,
			sex: this.props.model.getGuestById(this.props.guestId).sex,
			weight: this.props.model.getGuestById(this.props.guestId).weight,
			drinkingSkills: this.props.model.getGuestById(this.props.guestId).drinkingSkills,
			preferedDrink: this.props.model.getGuestById(this.props.guestId).preferedDrink,
			saved: this.props.model.getGuestById(this.props.guestId).saved,
			deleted: false
		}
  }



	// Called by React when the component is shown to the user (mounted to DOM)
  componentDidMount() {
		//console.log(this.props.guestId);

    this.props.model.addObserver(this);
  }
	// Called by React when the component is removed from the DOM
  componentWillUnmount() {
    this.props.model.removeObserver(this);
  }


  // in our update function we modify the state which will
  // cause the component to re-render
  update() {

		if(this.state.deleted == false)
		{
			// setState causes the component to re-render
			this.setState( {
				name:	this.props.model.getGuestById(this.props.guestId).name,
				sex: this.props.model.getGuestById(this.props.guestId).sex,
				weight: this.props.model.getGuestById(this.props.guestId).weight,
				drinkingSkills: this.props.model.getGuestById(this.props.guestId).drinkingSkills,
				preferedDrink: this.props.model.getGuestById(this.props.guestId).preferedDrink,
				saved: this.props.model.getGuestById(this.props.guestId).saved
			});
		}
  }

	handleSubmit(e){

		if(this.refs.guestName.value === '' ){
			alert('You need to specify a name for the Guest!');
		}
		else{
			var guestProf = {
				name: this.refs.guestName.value,
				sex: this.refs.sex.value,
				weight: this.state.weight,
				drinkingSkills: this.refs.drinkingSkills.value,
				preferedDrink: this.refs.drinkingPreference.value,
				id: this.props.guestId,
				saved: true
			};

			this.props.model.saveGuest(guestProf);
		}
		e.preventDefault(); // preventing from submitting the form
	}

  handleChange=(e)=>{

 		this.setState({
			weight: e.target.value
 		});
 	}

/*
	onWeightChanged = (increment) =>{
		var w = this.state.weight + increment;

		if(w<30)
		{
			w = 30;
		}

    this.setState({
			weight: w
		});
	}
*/
	editProfile = () =>{
		this.setState({saved: false});
	}

	deleteGuest = () =>{
		// Deleting this component
    //this.setState({
		//	deleted: true
		//});
		this.state.deleted = true;

		this.props.model.deleteGuestById(this.props.guestId);

		//ReactDOM.unmountComponentAtNode(document.getElementById('root'));
    this.props.model.removeObserver(this);
	}




  render() {

		// In case this Guest was deleted, we should not display it anymore.
		if(this.state.deleted)
		{
			return (null);
		}
		// If this guest was already saved.
		else if(this.state.saved)
		{

			return(
				<div className="GuestProfile col-sm-2">
					{/*  PARTY NAME  ----------------------------*/}
					<div>
						<p> Guest Name: <b> {this.state.name} </b> </p>
					</div>
					{/*------------------------------------------*/}


					{/*  SEX  -----------------------------------*/}
					<div>
						<p> Sex: {this.state.sex} </p>
					</div>
					{/*------------------------------------------*/}


					{/*  WEIGHT  --------------------------------*/}
					<div>
						<p> Weight: {this.state.weight} Kg</p>
					</div>
					{/*------------------------------------------*/}

					{/*  DRINK SKILLS ---------------------------*/}
					<div>
						<p> Drinking Skills: {this.state.drinkingSkills} </p>
					</div>
					{/*------------------------------------------*/}


					{/*  DRINKING PREFERENCE --------------------*/}
					<div>
						<p> Drinking Preference: {this.state.preferedDrink} </p>
					</div>
					{/*------------------------------------------*/}

          <div className="row buttons">
            <div className="col-md-7"></div>
            <div className="col-md-2">
              <img src="https://png.icons8.com/ultraviolet/30/multi-edit.png" onClick={() => this.editProfile()}  />
            </div>
            <div className="col-md-2">
              {/* DELETE PROFILE */}
              <img src="https://png.icons8.com/color/30/trash.png" onClick={() => this.deleteGuest()}  />
            </div>
          </div>

				</div>
			);

		}
		// If this guest is being edited.
		else
		{
			return (
				<div className="GuestProfile col-sm-2">

					<form onSubmit={this.handleSubmit.bind(this)}> {/*you have to bind this in order to 'handleSubmit' access the refs*/}

						{/*  PARTY NAME  ----------------------------*/}
						<div>
							<p> Guest Name: </p>
							<input type="text" ref="guestName" />
						</div>
						{/*------------------------------------------*/}


						{/*  SEX  -----------------------------------*/}
						<div>
							<p> Sex </p>
							<select ref="sex">
								<option value="f">Female</option>
								<option value="m">Male</option>
							</select>
						</div>
						{/*------------------------------------------*/}


						{/*  WEIGHT  --------------------------------*/}
						<div>
							<p> Weight: {this.state.weight} Kg</p>
              <input type="range" min="35" max="150" value={this.state.weight} onChange={this.handleChange}></input>
						</div>
						{/*------------------------------------------*/}


						{/*  DRINK SKILLS ---------------------------*/}
						<div>
							<p> Drinking Skills </p>
							<select ref="drinkingSkills">
								<option value="light">Light</option>
								<option value="medium">Medium</option>
								<option value="heavy">Heavy</option>
							</select>
						</div>
						{/*------------------------------------------*/}


						{/*  DRINKING PREFERENCE --------------------*/}
						<div>
							<p> Drinking Preference </p>
							<select ref="drinkingPreference">
								<option value="beer">Beer</option>
								<option value="wine">Wine</option>
								<option value="champagne">Champagne</option>
								<option value="hardliquor">Hard Liquor</option>
								<option value="liquor">Liquor</option>
							</select>
						</div>
						{/*------------------------------------------*/}

            <div className="row buttons">
              <div className="col-md-7"></div>
              <div className="saveButton col-md-2">
                <input type="submit" value=""/>

              </div>
              <div className="col-md-2">
                {/* DELETE PROFILE */}
                <img src="https://png.icons8.com/color/30/minus.png" onClick={() => this.deleteGuest()}  />
              </div>
            </div>



					</form>


				</div>
			);
		}
  }
}

export default GuestProfile;
