
const httpOptions = {
  headers: {'X-Mashape-Key': 'Qu9grxVNWpmshA4Kl9pTwyiJxVGUp1lKzrZjsnghQMkFkfA4LB'}
};


const drinkModel = function () {
	var partyName = "";
	var partyDuration = 0;
	var numberOfGuests = 0;
	var observers = [];


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
