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



  /////////////for search view model
  let drinkMinPrice = "";
  let drinkMaxPrice = "";
  let drinkFilter = "";


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

  this.getAllDrinks = function () {
    let url = 'https://karlroos-systemet.p.mashape.com/product'

    if(drinkMinPrice !== "" && drinkMaxPrice !== "") {
      url +="?price_from="+ drinkMinPrice + "&price_to="+ drinkMaxPrice;
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
