
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


	// update double array, the whole list array	
	doubleArray.push(newTrainArray);


	// this will create variables in the firebase storage
	// and store the data
      database.ref().set({
        doubleArray: doubleArray
      });


	$("#trainName").val('');
	$("#destination").val('');
	$("#trainTime").val('');
	$("#frequency").val('');

	
})



database.ref().on("value", function(childSnapshot) {

	if (childSnapshot.child("doubleArray").exists()){

		doubleArray = childSnapshot.val().doubleArray;

		$("#tableBody").empty();

		for (var i=0; i<doubleArray.length; i++) 
		 {
			var newTr = $("<tr>");

			var tdName = $("<td>").html(doubleArray[i][0]);
			newTr.append(tdName);

			var tdDestination = $("<td>").html(doubleArray[i][1]);
			newTr.append(tdDestination);

			var tdFrequency = $("<td>").html(doubleArray[i][2]);
			newTr.append(tdFrequency);

			
			// converting time into number to calculate total of minutes
			var firstTimeConverted = moment(doubleArray[i][3], "hh:mm").subtract(1, "years");

			// getting time difference in minutes
			var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

			// calculating time left until next train
			var leftMinutes = doubleArray[i][2] - (diffTime % doubleArray[i][2]); 

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

  	}
   
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });




