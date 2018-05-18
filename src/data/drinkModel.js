import uuid from 'uuid'; // This is being used to generate unique keys for the guests objects.
// Take a look at this.createGuests and you'll see how it's being used.
import fire from '../firebase/firebase';

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

var drinkMenu = [];
/* drinkMenu is a list of objects that looks like this:
{
id: e.target.attributes.getNamedItem("drink_id").value,
name: e.target.attributes.getNamedItem("drink_name").value,
amount: 0,
alcohol: e.target.attributes.getNamedItem("drink_alcohol").value,
volume: e.target.attributes.getNamedItem("drink_volume").value,
price: e.target.attributes.getNamedItem("drink_price").value,
type: this.state.type
}
*/

var addDrinkId = "";
var minusDrinkId = "";


var chosenDrinkType="beer";
var chosenDrinkTypeCode = "";
var chosenDrinkTypeThreshold = 0;
var chosenDrinkTypeamount = "";

//variable use to sort the item in ascending or Descending
var sortStatus= "ASC";

var partyDetail = [];

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
drinkTypesChosenByGuests= JSON.parse(localStorage.getItem("drinkOnFocus"));


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

//------------------Read Firebase data-----------------------------------------

var getPartyNameForWelcome = [];
var listOfFriends = [];
var check = 0;
var check1 = 0;

this.readPartyDetailFromFirebase = function(){
  var partyName="";


  fire.auth().onAuthStateChanged(function(user) {
    if (user) {
      var ref =  fire.database().ref("users/" + user.uid + "/listOfParty/");
      ref.on('value', function(snap){
        var listData = snap.val();
        if (listData == null){
          console.log("null")
        }else{
          console.log("tidak")
          if(check==0){
            console.log("tidak1")
            var keys = Object.keys(listData);
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i];
              partyName = listData[k].partyDetail;
              var keys1 = Object.keys(partyName);
              console.log(partyName);
              for (var j = 0; j < keys1.length; j++) {
                var l = keys1[j];
                getPartyNameForWelcome.push(partyName[l]);
              }
            }
            check=check+1;
          }else{

          }
        }
      });
    } else {
      // No user is signed in.
    }
  });

  notifyObservers();

}

this.getPartyDetail = function(){
  return getPartyNameForWelcome;
}

this.readListOfFriends = function(){

  fire.auth().onAuthStateChanged(function(user) {
    if(user){
      var ref = fire.database().ref("users/" + user.uid + "/listOfFriends");

      ref.on('value', snap => {
        var listData = snap.val();
        if (listData == null){

        }else{
          if(check1==0){
            var keys = Object.keys(listData);
            for (var i = 0; i < keys.length; i++) {
              var k = keys[i];
              listOfFriends.push(listData[k]);
            }
            check1=check1+1;
          }else{

          }
        }
      });
    }else{

    }
  });
  notifyObservers();
}

this.getListOfFriendsFromFirebase = function (){
  return listOfFriends;
}
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

  /*
  var user = fire.auth().currentUser;
  var database = fire.database();
  fire.database().ref("users/" + user.uid + "/listOfParty/"  +partyName+ "/listOfDrinkType").push({
  type: drinkType,
  code: apiDrinkTypeCode[drinkType],
  minimumAlcoholVolume: 0,
  currentAlchoholVolume: 0,
  status: 'didNotReachThreshold'
});
*/

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

  //-------------------Add number of guests to firebase ----------------------
  /*
  var user = fire.auth().currentUser;
  var database = fire.database();
  fire.database().ref("users/" + user.uid + "/listOfFriends").push(guest);
  */
  notifyObservers();
}

//
this.setGuestState = function(guest){
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
      weight: 55,
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

this.getPartyNames = function() {
  return partyName;
}

this.setPartyDetail = function(){

  /*
  var user = fire.auth().currentUser;
  var database = fire.database().ref("users/" + user.uid + "/listOfParty/"+partyName+"/partyDetail").push({
  name: partyName,
  duration: partyDuration,
  totalGuest: numberOfGuests
});
*/
notifyObservers();
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


this.addDrinkToMenu = function (drink){

  // If the drink was already added on the menu,
  //  we should not add it again.
  for(var i=0; i<drinkMenu.length; i++) {
    if(drinkMenu[i].id == drink.id)	{
      //console.log("This drink was already added!");
      return ;
    }
  }

  drinkMenu.push(drink);

  //-------------------Add drink menu to firebase ----------------------
  /*
  var user = fire.auth().currentUser;
  var database = fire.database();
  fire.database().ref("users/" + user.uid + "/listOfParty/" +partyName+ "/listOfdrinks").push(drink);
  */
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

// This function adds or removes one unit of a drink that was added on the 'Chosen Drink Menu' section.
// s =  1 if we are adding a drink.
// s = -1 if we are removing a drink.
this.add_removeOneDrinkUnit = function(drink_id, s){
  // ADD A UNIT ----------------------------------------------------------------------
  // find the index of this drink in the menu
  var index= drinkMenu.map(function(x) {return x.id; }).indexOf(drink_id);
  //console.log("index: " + index);
  drinkMenu[index].amount += s;
  if(drinkMenu[index].amount < 0)
  {
    drinkMenu[index].amount = 0;
  }
  // ---------------------------------------------------------------------------------


  // ADD ALCOHOL AMOUNT ON drinkTypesChosenByGuests ----------------------------------
  // 'alcoholVolume' is the volume of alcohol in ml
  var alcoholVolume = (drinkMenu[index].alcohol/100)*drinkMenu[index].volume;
  //console.log("We just added this amount of alcohol: " + alcoholVolume);

  // Find the index of this type of drink in the drinkTypesChosenByGuests
  var indexDrinkType= drinkTypesChosenByGuests.map(function(x) {return x.type; }).indexOf(drinkMenu[index].type);

  drinkTypesChosenByGuests[indexDrinkType].currentAlchoholVolume += s*alcoholVolume;

  if(drinkTypesChosenByGuests[indexDrinkType].currentAlchoholVolume<0){
    drinkTypesChosenByGuests[indexDrinkType].currentAlchoholVolume = 0;
  }
  // ---------------------------------------------------------------------------------

  // Checking if the status of the button should be changed (if it reached the threshold) ---
  if(drinkTypesChosenByGuests[indexDrinkType].currentAlchoholVolume > drinkTypesChosenByGuests[indexDrinkType].minimumAlcoholVolume){
    drinkTypesChosenByGuests[indexDrinkType].status = 'reachedThreshold';
  }
  else{
    drinkTypesChosenByGuests[indexDrinkType].status = 'didNotReachThreshold';
  }
  // ----------------------------------------------------------------------------------------


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
  if(drinkTypesChosenByGuests!=null){
    localStorage.setItem("drinkOnFocus", JSON.stringify(drinkTypesChosenByGuests));
    return drinkTypesChosenByGuests;
  }else{
    return JSON.parse(localStorage.getItem("drinkOnFocus"));
  }
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
  //return chosenDrinkTypeamount;
  for(var i=0; i<drinkTypesChosenByGuests.length; i++)
  {
    if(drinkTypesChosenByGuests[i].type == chosenDrinkType)
    {
      return drinkTypesChosenByGuests[i].currentAlchoholVolume;
    }
  }
}

this.checkThreshold = function(type){

  var notify="";

  // Find the index of this drink in the drinkTypesChosenByGuests list
  var index= drinkTypesChosenByGuests.map(function(x) {return x.type; }).indexOf(type);
  if(drinkTypesChosenByGuests[index].currentAlchoholVolume > drinkTypesChosenByGuests[index].minimumAlcoholVolume)
  {
    notify = "You Have Enough Drinks";
  }
  else{
    notify = "You need to Add more drinks";
  }

  return notify;
}

//function to set the sort system are ascending or Descending
this.setSortBy = function (status){
  sortStatus = status;
  notifyObservers();
}

//function to sned status to view what type of sort user using right now
this.getSortStatus = function(){
  return sortStatus;
  notifyObservers();
}

this.getPrice = function(){
  var price=0;
  for (var i = 0; i < drinkMenu.length; i++) {
    var prices = drinkMenu[i].price;
    price = price*1 + prices*1;
  }
  return price;
  notifyObservers();
}

this.submitDataToFirebase = function (){
  var user = fire.auth().currentUser;
  var database = fire.database();
  for (var i = 0; i < drinkTypesChosenByGuests.length; i++) {
    fire.database().ref("users/" + user.uid + "/listOfParty/"+partyName+"/listOfDrinkType/").push({
      code:drinkTypesChosenByGuests[i].code,
      currentAlchoholVolume:drinkTypesChosenByGuests[i].currentAlchoholVolume,
      minimumAlcoholVolume:drinkTypesChosenByGuests[i].minimumAlcoholVolume,
      status:drinkTypesChosenByGuests[i].status,
      type:drinkTypesChosenByGuests[i].type,
    });
  }

  fire.database().ref("users/" + user.uid + "/listOfParty/"+partyName+"/partyDetail/").push({
    name: partyName,
    duration: partyDuration,
    totalGuest: numberOfGuests
  });

  for (var j = 0; j < drinkMenu.length; j++) {
    fire.database().ref("users/" + user.uid + "/listOfParty/" +partyName+"/listOfdrinks/").push({
      alcohol:drinkMenu[j].alcohol,
      amount:drinkMenu[j].amount,
      id: drinkMenu[j].id,
      name: drinkMenu[j].name,
      price: drinkMenu[j].price,
      type: drinkMenu[j].type,
      volume: drinkMenu[j].volume,
    });
  }


  for (var k = 0; k < guests.length; k++) {
    fire.database().ref("users/" + user.uid + "/listOfFriends/").push({
      drinkingSkills:guests[k].drinkingSkills,
      id:guests[k].id,
      name:guests[k].name,
      preferedDrink:guests[k].preferedDrink,
      saved: guests[k].saved,
      sex:guests[k].sex,
      weight:guests[k].weight,
    });
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
  if(chosenDrinkTypeCode !== "") {
    url +="&tag="+ chosenDrinkTypeCode;
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

const notifyObservers = function (obj) {
  observers.forEach(o => o.update(obj));
};

};

export const modelInstance = new drinkModel();
