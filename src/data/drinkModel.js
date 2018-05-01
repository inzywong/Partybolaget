import uuid from 'uuid'; // This is being used to generate unique keys for the guests objects.
												 // Take a look at this.createGuests and you'll see how it's being used.


const httpOptions = {
  headers: {'X-Mashape-Key': 'yQGhLMovOZmshmc8KpVqld49sMt2p1IY502jsn5GsnnM6V7Vqz'} //'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};


const drinkModel = function () {

	// VARIABLES ------------------------------------------------------------
	var partyName = "";
	var partyDuration = 0;
	var numberOfGuests = 0;
	var observers = [];

	var guests = [];
	/* This is the structure of the guests elements:
		{
			name: 'Johan',
			sex: 'm',
			weight: 90,
			drinkingSkills: 'hard',
			preferedDrink: 'wisky',
			id: 928,
			saved: false
		},
*/

  // Variables for the search view model
  let drinkMinPrice = "";
  let drinkMaxPrice = "";
  let drinkFilter = "";

  let drinkMinAlcoholPercentage = "";
  let drinkMaxAlcoholPercentage = "";

  let searchType="";

  //array of drinks pick or added by the user
  var drinkMenu = [];

  var addDrinkId = "";
  var minusDrinkId = "";


  var chosenDrinkType="";
  var chosenDrinkTypeCode = "";
  var chosenDrinkTypeThreshold = 0;
  var chosenDrinkTypeamount = "";

  var addMoreDrink = 200;

	// Each drink type in the API is identified by a code. Below are the codes for each type
	//  our app might be using.
	var apiDrinkTypeCode = {
		"beer": "4%2C6%2C7%2C8%2C16%2C19",
		"wine": "20%2C23%2C30%2C25",
		"champagne": "32",
		"hardliquor": "1%2C3%2C5%2C12%2C14%2C18",
		"liquor": "2%2C10%2C11%2C15"
	}


	//
  var drinkTypesChosenByGuests = [];
	/* drinkTypesChosenByGuests will look like this:
    {
      type: "beer",
      code: "4%2C6%2C7%2C8%2C16%2C17%2C19",
      minimumAlcoholVolume : 40,
      currentAlchoholVolume : 0,
			status: // can be 'reachedThreshold' or 'didNotReachThreshold'
    {
      type: "wine",
      code: "20%2C23%2C30",
      minimumAlcoholVolume: 60,
      currentAlchoholVolume: 0,
			status: // can be 'reachedThreshold' or 'didNotReachThreshold'
    },
    {
      type: "champagne",
      code: "32%2C34%2C35",
      minimumAlcoholVolume : 80,
      currentAlchoholVolume : 0,
			status: // can be 'reachedThreshold' or 'didNotReachThreshold'
    },
    {
      type: "hardliquor",
      code: "1%2C3%2C5%2C8%2C12%2C14%2C18",
      minimumAlcoholVolume : 20,
      currentAlchoholVolume : 0
			status: // can be 'reachedThreshold' or 'didNotReachThreshold'
    },
    {
      type: "liquor",
      code: "2%2C6%2C10%2C11%2C15",
      minimumAlcoholVolume : 55,
      currentAlchoholVolume : 0,
			status: // can be 'reachedThreshold' or 'didNotReachThreshold'
    }
  */

	// -----------------------------------------------------------

	// This function calculates what is the minimum volume of alcohol needed
	//  for each type of drink chosen by the guests
	this.calculateVolumeOfAlcohol = function()
	{
		// This variable represents the minimum amount of alcohol in ml in order to get
		//  a 60kg, male, ligh drinker  drunk. We use this value to calculate the amount
		//    needed to get other people drunk.
		var a_per_hour = 70;

		// This dictionary represents the weight in the formula each drinking skills has.
		var drinkSkillsMap = {
			"light": 1,
			"medium": 2,
			"heavy": 3
		}

		// This dictionary represents the weight in the formula each drinking skills has.
		var genderMap = {
			"m": 1,
			"f": 0.7
		}

		// Make all the minimumAlcoholVolume equals to zero
		for(var j=0; j<drinkTypesChosenByGuests.length; j++){
			drinkTypesChosenByGuests[j].minimumAlcoholVolume = 0;
		}


		// Loop through guests
		for(var i=0; i<guests.length; i++){
			//console.log("Analyzing Guest " + guests[i].name);


			// Calculate the volume of alcohol this guest will need
			var volumeOfAlcohol = (0.01*guests[i].weight + 0.04)*
														drinkSkillsMap[guests[i].drinkingSkills]*
														genderMap[guests[i].sex]*
														a_per_hour*
														partyDuration;

			//console.log("Alcohol needed: " + volumeOfAlcohol);
			//console.log("Type of Drink: " + guests[i].preferedDrink);

			// Add this value to its drink type
			for(var j=0; j<drinkTypesChosenByGuests.length; j++){
				//console.log("Guest drinkType: " + guests[j].preferedDrink);
				//console.log("Guest drinkType: " + guests[j].preferedDrink);

				if(drinkTypesChosenByGuests[j]['type'] === guests[i].preferedDrink){
					//console.log("Adding the volume to: " + drinkTypesChosenByGuests[j].type);
					drinkTypesChosenByGuests[j].minimumAlcoholVolume += volumeOfAlcohol;
				}
			}

		}
	}


	this.addDrinkType = function(drinkType)
	{
		for(var i=0; i<drinkTypesChosenByGuests.length; i++){
			// If the drink type was already added to the list, let's skip it
			if(drinkTypesChosenByGuests[i]['type'] === drinkType){
				return ;
			}
		}

		// If the drink type was not added yet, let's add it
		drinkTypesChosenByGuests.push({
			type: drinkType,
			code: apiDrinkTypeCode[drinkType],
			minimumAlcoholVolume: 0,
      currentAlchoholVolume: 0,
			status: 'didNotReachThreshold'
		});
	}

	// Creates the drinkTypesChosenByGuests list
	// This method makes usage of the data created in the createGuestProfile.js
	//  (which was stored in the guests[] lists present in the model) to create the
	//  drinkTypesChosenByGuests list by using the addDrinkType(drinkType) function described above.
	this.createDrinkTypesList = function()
	{
		drinkTypesChosenByGuests = [];

		for(var i=0; i<guests.length; i++){ // Loop through all the guests
			this.addDrinkType(guests[i].preferedDrink);
		}
	}


	// This method simply checks whether all profiles were created.
	// It is used by the CreateGuestProfile.js in order to prevent the user
	//  to go to the SearchDrink.js view before creating all the guests profiles.
	this.wereAllProfilesCreated = function()
	{
		for(var i=0; i< guests.length; i++ ){
			if(!guests[i].saved){
				return false
			}
		}
		return true;
	}

	// This method removes a guest by its ID. It is used in  CreateGuestProfile.js.
	this.deleteGuestById = function(id){
		var index = guests.findIndex(g => g.id === id);

		if(index >= 0)
		{
			guests.splice(index, 1);

			numberOfGuests--;

			notifyObservers();
		}
		/*
		console.log("Guests list:");
		console.log(guests);
		console.log("---------------------------");		*/
	}

	// Removes the last guest added. It is used in  Welcome.js.
	this.deleteLastGuestsAdded = function (n){
		// Deleting guests
		for(var i=0; i<n; i++)
		{
			if(guests.length > 0){
				guests.splice(-1,1); // remove last item of the array
				numberOfGuests--;
			}
		}
		notifyObservers();

		/*
		console.log("Guests list:");
		console.log(guests);
		console.log("---------------------------");		*/
	}

	// Returns a guest object by its ID. It is used in GuestProfile.js
	this.getGuestById = function(id){
		var index = guests.findIndex(g => g.id === id);

		return guests[index];
	}

	// Adds the guest passed as the parameter to the guests list.
	this.saveGuest = function(guest){
		var index = guests.findIndex(g => g.id === guest.id);

		guests[index] = guest;
		notifyObservers();
	}

	// Creates n guests objects and add them to the guests list.
	this.createGuests = function(n){

		// Creating the guests
		for(var i=0; i<n; i++)
		{
			var guest = {
					name: '',
					sex: '',
					weight: 30,
					drinkingSkills: '',
					preferedDrink: '',
					id: uuid.v4(),
					saved: false
			};

			guests.push(guest);
		}

		numberOfGuests+= n;

		notifyObservers();

		/*
		console.log("Guests list:");
		console.log(guests);
		console.log("---------------------------");		*/
	}

	// Returns the guests list.
	this.getGuests = function (){
		return guests;
	}

	// Sets the numberOfGuests variable to num
  this.setNumberOfGuests = function (num) {
      numberOfGuests = num;
      notifyObservers();
  }

	// Returns  numberOfGuests
  this.getNumberOfGuests = function () {
  	return numberOfGuests;
  }

  this.getDrinkMenu = function(){
    return drinkMenu;
  }

	// Sets the duration of the party.
  this.setPartyDuration = function (num) {
		partyDuration = num;
    notifyObservers();
  }

	// Returns partyDuration
  this.getPartyDuration = function () {
  	return partyDuration;
  }

	// Sets the partyName variable.
	this.setPartyName = function(name) {
		partyName = name;
		notifyObservers();
	}

	// Returns the partyName variable.
	this.getPartyName = function(name) {
		return partyName;
	}


  this.setDrinkMinPrice = function(price) {
    drinkMinPrice = price;
    notifyObservers();
  };

  this.getDrinkMinPrice = function () {
    return drinkMinPrice;
  };

  this.setDrinkMaxPrice = function(price) {
    drinkMaxPrice = price;
    notifyObservers();
  };

  this.getDrinkMinPrice = function () {
    return drinkMaxPrice;
  };

  this.setDrinkMinAlcoholPercentage = function(percentage) {
    drinkMinAlcoholPercentage = percentage/100;
    notifyObservers();
  };

  this.getDrinkMinAlcoholPercentage = function () {
    return drinkMinAlcoholPercentage;
  };

  this.setDrinkMaxAlcoholPercentage = function(percentage) {
    drinkMaxAlcoholPercentage = percentage/100;
    notifyObservers();
  };

  this.getDrinkMinAlcoholPercentage = function () {
    return drinkMaxAlcoholPercentage;
  };

  this.setSearchType = function(type) {
    searchType = type;
    notifyObservers();
  };

  this.getSearchType = function () {
    return searchType;
  };

  this.setChosenDrink = function (drink){
    var value=0;
    for(var i=0; i<drinkMenu.length; i++)
    {
      if(drinkMenu[i].id==drink.id){
        value=value+1;
      }
    }
    if (value > 0){
      return;
    }{
      drinkMenu.push(drink);
    }
    notifyObservers('amountchange');
  }

  this.getChosenDrink = function (){
    return drinkMenu;
  }

  this.setAddDrink = function(drinkId){
    addDrinkId=drinkId;
    notifyObservers();
  }

  this.getAddDrink = function(){
    return addDrinkId;
  }

  this.setMinusDrink = function(drinkId){
    minusDrinkId=drinkId;
    notifyObservers();
  }

  this.getMinusDrink = function(){
    return minusDrinkId;
  }

  this.setAddDrinkAmount = function(){
    var index;
    var indexDrinkType;
    index= drinkMenu.map(function(x) {return x.id; }).indexOf(addDrinkId);
    indexDrinkType= drinkTypesChosenByGuests.map(function(x) {return x.type; }).indexOf(chosenDrinkType);
    drinkMenu[index].amount = drinkMenu[index].amount + 1;
    chosenDrinkTypeamount=chosenDrinkTypeamount+drinkMenu[index].amount*(drinkMenu[index].alcohol/10);
    drinkTypesChosenByGuests[indexDrinkType].currentAlchoholVolume = chosenDrinkTypeamount;
    notifyObservers('amountchange');
  }

  this.setMinusDrinkAmount = function(){
    var index;
    var indexDrinkType;
    index= drinkMenu.map(function(x) {return x.id; }).indexOf(minusDrinkId);
    indexDrinkType= drinkTypesChosenByGuests.map(function(x) {return x.type; }).indexOf(chosenDrinkType);
    if (drinkMenu[index].amount<=0){
      drinkMenu[index].amount = drinkMenu[index].amount;
    } else {
      drinkMenu[index].amount = drinkMenu[index].amount - 1;
      chosenDrinkTypeamount=chosenDrinkTypeamount-drinkMenu[index].amount*(drinkMenu[index].alcohol/10);
      drinkTypesChosenByGuests[indexDrinkType].currentAlchoholVolume = chosenDrinkTypeamount;
    }
    notifyObservers('amountchange');
  }

	// Returns the list of the drinks type chosen by the guests
  this.getDrinkType = function (){
    return drinkTypesChosenByGuests;
  }

  // Return the name of the drink  type on focus on the menu
  this.getDrinkTypeName = function (){
    return chosenDrinkType;
  }

	// Sets what's the drink currently on focus
  this.setDrinkTypeToSearch = function (drink){
    chosenDrinkTypeamount=0;

		// Go throught the types chosen
    for (var i = 0; i < drinkTypesChosenByGuests.length; i++) {

      if (drink==drinkTypesChosenByGuests[i].type){

        chosenDrinkType = drinkTypesChosenByGuests[i].type;
        chosenDrinkTypeCode=drinkTypesChosenByGuests[i].code;
        chosenDrinkTypeThreshold=drinkTypesChosenByGuests[i].minimumAlcoholVolume;
        chosenDrinkTypeamount=drinkTypesChosenByGuests[i].currentAlchoholVolume;
      }
    }

    notifyObservers();
  }

  this.getDrinkTypeThreshold = function (){
    return chosenDrinkTypeThreshold;
  }

  this.getDrinkTypeAmount = function (){
    return chosenDrinkTypeamount;
  }

  this.checkThreshold = function(){
    var notify="";
    if (chosenDrinkTypeamount>chosenDrinkTypeThreshold){
      notify = "You Have Enough Drinks";
    } else {
      notify = "";
    }
    return notify;
  }

  //function to add more drink to the select drink view
  this.loadMoreDrink = function (){
    addMoreDrink = addMoreDrink + 20;
    notifyObservers();
  }

  this.getAllDrinks = function () {
    //let url = 'https://karlroos-systemet.p.mashape.com/product?'
    let url = 'https://karlroos-systemet.p.mashape.com/product?limit=' + addMoreDrink;

    if(drinkMinPrice !== "" && drinkMaxPrice !== "") {
      url +="&price_from="+ drinkMinPrice + "&price_to="+ drinkMaxPrice;
    }
    if(drinkMinAlcoholPercentage !== "" && drinkMaxAlcoholPercentage !== "") {
      url +="&alcohol_from="+ drinkMinAlcoholPercentage + "&alcohol_to="+ drinkMaxAlcoholPercentage;
    }
    if(searchType !== "") {
      url +="&order_by="+ searchType;
    }
    if(chosenDrinkTypeCode !== "") {
      url +="&tag="+ chosenDrinkTypeCode;
    }

    console.log(url)



    return fetch(url, httpOptions)
      .then(processResponse)
      .catch(handleError)
  }

  // API Helper methods

  const processResponse = function (response) {
    if (response.ok) {
      return response.json()
    }
    throw response;
  }

  const handleError = function (error) {
    if (error.json) {
      error.json().then(error => {
        console.error('getAllDrinks() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDrinks() API Error:', error.message || error)
    }
  }


  // Observer pattern
  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function (obj) {
    observers.forEach(o => o.update(obj));
  };

};

export const modelInstance = new drinkModel();
