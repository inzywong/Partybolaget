1- Short description of your project: Partybolaget is an app which will use the Systemet API(https://market.mashape.com/karlroos/systemet), which is an API based on open source data from Systembolaget (State own alcohol monopoly in Sweden). The app will help users to plan the amount of drinks they need to serve during a party or an event by calculating the average alcohol consumption and price depending on drinks chosen. Based on the duration of the event and on the guests profiles (gender, weight, gender, prefered drinks), the app will calculate the amount of alcohol the event planner will need.

2- What you have done: So far the project is under process, it contains most of the functions and data we need from the API but no focus on the design has been made.

3- What you still plan to do: Add more functionalities such as an algorithm that calculates the alcohol tolerance, write the code for showing an Alcometer, implement the layout of the pages, implement local storage, add the ability to log in/out, etc...

4- Your project file structure (short description/purpose of each file): Inside the source folder, you will be able to find the model and the views in separate folders. The model is inside the /data folder, and teh views are inside the /views folder as shown below:

/Data
	drinkmodel.js
/Views
	Welcome/welcome.js -> The very first page where the user can pick the name of the event, how long it's gonna take, and the number of guests
	CreateGuestProfile/CreateGuestProfile.js -> Here you create the profile of the guests.
	GuestProfile/GuestProfile.js -> This represents the view/controller for each profile.
	SearchDrink/SearchDrink.js -> Show all the view for searching the drinks.
	Alcometer/Alcometer.js -> Will show how much alcohol the event needs for that specific drink type.
	ChosenDrinkMenu/ChosenDrinkMenu.js -> Will store the drinks and the amount the user chose.
	DrinkType/DrinkType.js -> The list of drink types the event needs to have according to its guests list.
	FilterDrink/FilterDrink.js -> All the parameters to filter the data on the API.
	SelectDrink/SelectDrink.js -> Shows all the drinks fetched by the API.

