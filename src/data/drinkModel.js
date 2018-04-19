import uuid from 'uuid'; // This is being used to generate unique keys for the guests objects.
												 // Take a look at this.createGuests and you'll see how it's being used.


const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};


const drinkModel = function () {
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

	// Returns the guest object
	this.getGuestById = function(id){
		var index = guests.findIndex(g => g.id === id);

		return guests[index];
	}

	this.saveGuest = function(guest){
		var index = guests.findIndex(g => g.id === guest.id);

		guests[index] = guest;
		notifyObservers();
	}

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


  /////////////for search view model
  let drinkMinPrice = "";
  let drinkMaxPrice = "";
  let drinkFilter = "";

  let drinkMinAlcoholPercentage = "";
  let drinkMaxAlcoholPercentage = "";

  let searchType="";

  var drinkMenu = [
  ];

  var addDrinkId = "";
  var minusDrinkId = "";

	this.getGuests = function (){
		return guests;
	}

  this.setNumberOfGuests = function (num) {
      numberOfGuests = num;
      notifyObservers();
  }

  this.getNumberOfGuests = function () {
  	return numberOfGuests;
  }

  this.getDrinkMenu = function(){
    return drinkMenu;
  }

  this.setPartyDuration = function (num) {
		partyDuration = num;
    notifyObservers();
  }

  this.getPartyDuration = function () {
  	return partyDuration;
  }

	this.setPartyName = function(name) {
		partyName = name;
		notifyObservers();
	}

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
    notifyObservers();
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
    index= drinkMenu.map(function(x) {return x.id; }).indexOf(addDrinkId);
    drinkMenu[index].amount = drinkMenu[index].amount + 1;
    notifyObservers();
  }

  this.setMinusDrinkAmount = function(){
    var index;
    index= drinkMenu.map(function(x) {return x.id; }).indexOf(minusDrinkId);
    if (drinkMenu[index].amount<=0){
      drinkMenu[index].amount = drinkMenu[index].amount;
    } else {
      drinkMenu[index].amount = drinkMenu[index].amount - 1;
    }
    notifyObservers();
  }

  this.getAllDrinks = function () {
    let url = 'https://karlroos-systemet.p.mashape.com/product?'

    if(drinkMinPrice !== "" && drinkMaxPrice !== "") {
      url +="&price_from="+ drinkMinPrice + "&price_to="+ drinkMaxPrice;
    }
    if(drinkMinAlcoholPercentage !== "" && drinkMaxAlcoholPercentage !== "") {
      url +="&alcohol_from="+ drinkMinAlcoholPercentage + "&alcohol_to="+ drinkMaxAlcoholPercentage;
    }
    if(searchType !== "") {
      url +="&order_by="+ searchType;
    }

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
        console.error('getAllDishes() API Error:', error.message || error)
      })
    } else {
      console.error('getAllDishes() API Error:', error.message || error)
    }
  }


  // Observer pattern
  this.addObserver = function (observer) {
    observers.push(observer);
  };

  this.removeObserver = function (observer) {
    observers = observers.filter(o => o !== observer);
  };

  const notifyObservers = function () {
    observers.forEach(o => o.update());
  };

};

export const modelInstance = new drinkModel();
