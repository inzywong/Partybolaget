
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