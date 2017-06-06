// alert("working")

// get data from the user
// display it in the table (check one example first and figure out how to do it.)
// then dinamically create the table and populate it as you get the input
// maybe with append maybe with .children() table. 
// add it to the local storage
// when the page loads back get it back from the local storage. 
var count = 0;
//var firstRowTds;
var doubleArray = [];

$("#submitButton").on("click", function(event){
	event.preventDefault();

	var trainNameInput = $("#trainName").val().trim();
	var destinationInput = $("#destination").val().trim();
	var firstTrainTimeInput = $("#trainTime").val();
	var frequencyInput = $("#frequency").val().trim();

	// console.log(trainNameInput);
	// console.log(destinationInput);
	// console.log(firstTrainTimeInput);
	// console.log(frequencyInput);

	var newTrainArray = [];
// pushing data into the single array, for individual train
	newTrainArray.push(trainNameInput);
	newTrainArray.push(destinationInput);
	newTrainArray.push(frequencyInput);
	newTrainArray.push(firstTrainTimeInput);
	console.log("new array: " + newTrainArray);
	



// Here we are adding data to the talbe on the screen
	// firstRowTds = $("table")
	// .children()
	// .eq(1)
	// .children("tr")
	// .eq(count)
	// .children("td");

	// firstRowTds.eq(0).text(trainNameInput);
	// firstRowTds.eq(1).text(destinationInput);
	// firstRowTds.eq(2).text(frequencyInput);
	// firstRowTds.eq(3).text(firstTrainTimeInput);


	var hms = firstTrainTimeInput;   // your input string
	var a = hms.split(':'); // split it at the colons

	// Hours are worth 60 minutes.
	var minutes = (+a[0]) * 60 + (+a[1]);

	console.log("When next train Minutes: " + minutes);



	var d = new Date();
	var n = d.toLocaleTimeString();
	//console.log(n);
	var h = d.getHours();
	var m = d.getMinutes();
	// getting the current time
	//var time = convertMinsToHrsMins(65);
	//console.log(h);
	//console.log(m);
	var totalMinutes = h*60 + m;
	var minutesToNumber = parseInt(totalMinutes);
	//console.log("total minutes: " + minutesToNumber);


	var leftMinutes = minutes - minutesToNumber; 
	//console.log("minutes left: " + leftMinutes);


	newTrainArray.push(leftMinutes);
// here we update a double array, the whole list array	
	doubleArray.push(newTrainArray);
	//console.log(doubleArray);
	console.log("Next time train: " + firstTrainTimeInput);


	

	var newTr = $("<tr>");
	var tdName = $("<td>").html(trainNameInput);
	newTr.append(tdName);
	var tdDestination = $("<td>").html(destinationInput);
	newTr.append(tdDestination);
	var tdFrequency = $("<td>").html(frequencyInput);
	newTr.append(tdFrequency);
	var tdNextTrain = $("<td>").html(firstTrainTimeInput);
	newTr.append(tdNextTrain);

	var tdMinutesLeft = $("<td>").html(leftMinutes);
	newTr.append(tdMinutesLeft);

	$("#tableBody").append(newTr);



// as we have the whole array ready, we will update the storage
    localStorage.clear();
	// localStorage.setItem("Train: " + count, JSON.stringify(doubleArray));
	localStorage.setItem("trainSchedule", JSON.stringify(doubleArray));

	//console.log(count);
	//console.log(doubleArray[1][0]);
	count++;

	$("#trainName").val('');
	$("#destination").val('');
	$("#trainTime").val('');
	$("#frequency").val('');
})



$("#clearButton").on("click", function(event){
	event.preventDefault();

	// $("#trainName").val('');
	// $("#destination").val('');
	// $("#trainTime").val('');
	// $("#frequency").val('');

})



$("#deleteStorage").on("click", function(event){
	localStorage.clear();
})


$("#addFromStorage").on("click", function(event){
	event.preventDefault();

	var insideList = JSON.parse(localStorage.getItem("trainSchedule"));
	//console.log("Array Back: " + insideList);
	//console.log("Array's length: " + insideList.length);

	 for (var i=0; i<insideList.length; i++) 
	 {

	 	// var tableRow = $("<tr>");
	 	// var tableData = $("<td>");

		// firstRowTds = $("table")
		// .children()
		// .eq(1)
		// .children("tr")
		// .eq(i)
		// .children("td");

		// firstRowTds.eq(0).text((insideList[i][0]));
		// firstRowTds.eq(1).text((insideList[i][1]));
		// firstRowTds.eq(2).text((insideList[i][2]));
		// firstRowTds.eq(3).text((insideList[i][3]));


		var newTr = $("<tr>");

		var tdName = $("<td>").html(insideList[i][0]);
		newTr.append(tdName);

		var tdDestination = $("<td>").html(insideList[i][1]);
		newTr.append(tdDestination);

		var tdFrequency = $("<td>").html(insideList[i][2]);
		newTr.append(tdFrequency);

		var tdNextTrain = $("<td>").html(insideList[i][3]);
		newTr.append(tdNextTrain);

		var tdMinutesLeft = $("<td>").html(insideList[i][4]);
		newTr.append(tdMinutesLeft);

		$("#tableBody").append(newTr);
     }

})


function convertMinsToHrsMins(minutes){ 
  var h = Math.floor(minutes / 60);
  var m = minutes % 60;
  h = h < 10 ? '0' + h : h;
  m = m < 10 ? '0' + m : m;
  return h + ':' + m;
}
