
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBUvTtdJ56exUqPaFKjuIsoVCo9UKnsFYg",
    authDomain: "train-schedule-1f468.firebaseapp.com",
    databaseURL: "https://train-schedule-1f468.firebaseio.com",
    projectId: "train-schedule-1f468",
    storageBucket: "train-schedule-1f468.appspot.com",
    messagingSenderId: "411225177113"
  };
  firebase.initializeApp(config);

	

	// Create a variable to reference the database
    var database = firebase.database();


// double array, multidimensional array will hold arrays of data
var doubleArray = [];

$("#submitButton").on("click", function(event){
	event.preventDefault();

	// getting user input
	var trainNameInput = $("#trainName").val().trim();
	var destinationInput = $("#destination").val().trim();
	var firstTrainTimeInput = $("#trainTime").val();
	var frequencyInput = $("#frequency").val().trim();

	// here we will store data per train
	var newTrainArray = [];

	// pushing data into the single array, for individual train
	newTrainArray.push(trainNameInput);
	newTrainArray.push(destinationInput);
	newTrainArray.push(frequencyInput);

	// converting time into number to calculate total of minutes
	var firstTimeConverted = moment(firstTrainTimeInput, "hh:mm").subtract(1, "years");

	// getting time difference in minutes
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

	// calculating time left until next train
	var leftMinutes = frequencyInput - (diffTime % frequencyInput); 

	// here we will calculate time until next train
	var nextTrain = moment().add(leftMinutes, "minutes");
	// converting time into AM/PM
	var nextTrainTime = moment(nextTrain).format("LT");


	// completing the array, storing additional data per train
	newTrainArray.push(nextTrainTime);
	newTrainArray.push(leftMinutes);

	

	// database.ref().on("value", function(snapshot) {
	// 	doubleArray = snapshot.val().doubleArray;
	// })


	// update double array, the whole list array	
	doubleArray.push(newTrainArray);


	// this will create variables in the firebase storage
	// and store the data
      database.ref().push({
        doubleArray: doubleArray
      });


	// append data into the table
	var newTr = $("<tr>");
	var tdName = $("<td>").html(trainNameInput);
	newTr.append(tdName);
	var tdDestination = $("<td>").html(destinationInput);
	newTr.append(tdDestination);
	var tdFrequency = $("<td>").html(frequencyInput);
	newTr.append(tdFrequency);
	var tdNextTrain = $("<td>").html(nextTrainTime);
	newTr.append(tdNextTrain);

	var tdMinutesLeft = $("<td>").html(leftMinutes);
	newTr.append(tdMinutesLeft);

	$("#tableBody").append(newTr);


	// as we have the whole array ready, we will update the local storage as well
    localStorage.clear();
	localStorage.setItem("trainSchedule", JSON.stringify(doubleArray));


	// clear the fields so the user can easily add new data
	$("#trainName").val('');
	$("#destination").val('');
	$("#trainTime").val('');
	//$("#frequency").val('');

	
})


// on click we will clear the local storage
$("#deleteStorage").on("click", function(event){
	localStorage.clear();
})


// as the data is stored in FireBase, we will now populate the table from it
$("#addFromStorage").on("click", function(event){
	event.preventDefault();

	database.ref().on("child_added", function(childSnapshot) {

	var insideList = childSnapshot.val().doubleArray;

	for (var i=0; i<insideList.length; i++) 
	 {
		var newTr = $("<tr>");

		var tdName = $("<td>").html(insideList[i][0]);
		newTr.append(tdName);

		var tdDestination = $("<td>").html(insideList[i][1]);
		newTr.append(tdDestination);

		var tdFrequency = $("<td>").html(insideList[i][2]);
		newTr.append(tdFrequency);

		
		// converting time into number to calculate total of minutes
		var firstTimeConverted = moment(insideList[i][3], "hh:mm").subtract(1, "years");

		// getting time difference in minutes
		var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		// calculating time left until next train
		var leftMinutes = insideList[i][2] - (diffTime % insideList[i][2]); 

		// here we will calculate time until next train
		var nextTrain = moment().add(leftMinutes, "minutes");
		// converting time into AM/PM
		var nextTrainTime = moment(nextTrain).format("LT");



		var tdNextTrain = $("<td>").html(nextTrainTime);
		newTr.append(tdNextTrain);


		var tdMinutesLeft = $("<td>").html(leftMinutes);
		newTr.append(tdMinutesLeft);

		$("#tableBody").append(newTr);

      }
   
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


})


  //   database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {

		// var newTr = $("<tr>");

		// var tdName = $("<td>").html(snapshot[0]);
		// newTr.append(tdName);

		// var tdDestination = $("<td>").html(snapshot[1]);
		// newTr.append(tdDestination);

		// var tdFrequency = $("<td>").html(snapshot[2]);
		// newTr.append(tdFrequency);

		
		// // converting time into number to calculate total of minutes
		// var firstTimeConverted = moment(snapshot[3], "hh:mm").subtract(1, "years");

		// // getting time difference in minutes
		// var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

		// // calculating time left until next train
		// var leftMinutes = snapshot[2] - (diffTime % snapshot[2]); 

		// // here we will calculate time until next train
		// var nextTrain = moment().add(leftMinutes, "minutes");
		// // converting time into AM/PM
		// var nextTrainTime = moment(nextTrain).format("LT");



		// var tdNextTrain = $("<td>").html(nextTrainTime);
		// newTr.append(tdNextTrain);


		// var tdMinutesLeft = $("<td>").html(leftMinutes);
		// newTr.append(tdMinutesLeft);

		// $("#tableBody").append(newTr);
  //   });

