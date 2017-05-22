
// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// Initialize Firebase
var config = {
  apiKey: "AIzaSyBWiIpnZcy5vJH76qZIpj53NXUXOdF__yY",
  authDomain: "train-schedule-7b2e1.firebaseapp.com",
  databaseURL: "https://train-schedule-7b2e1.firebaseio.com",
  projectId: "train-schedule-7b2e1",
  storageBucket: "train-schedule-7b2e1.appspot.com",
  messagingSenderId: "855055573369"
};

firebase.initializeApp(config);

var database = firebase.database();

// Button for adding trains
$("#addTrain").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#name-input").val().trim();
  var trainDestination = $("#destination-input").val().trim();
  var trainTime = moment($("#time-input").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency
  };

// Uploads train data to the database
database.ref().push(newTrain);


// Clears all of the text-boxes
$("#name-input").val("");
$("#destination-input").val("");
$("#time-input").val("");
$("#frequency-input").val("");
});

// Create Firebase event for adding train to the db and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDestination = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().time;
  var trainFrequency = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDestination);
  console.log(trainTime);
  console.log(trainFrequency);

  var trainPretty = moment.unix(trainTime).format("HH:mm");

  // Calculate the next arrival
  var trainArrival = moment().diff(moment.unix(trainTime, "X"), "minutes");
  console.log(trainArrival);

  // Calculate minutes away
  var trainMinutes = moment().diff(moment.unix(trainArrival, "X"), "minutes");
  console.log(trainArrival);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDestination + "</td><td>" +
  trainFrequency + "</td><td>" + trainArrival + "</td><td>" + trainMinutes + "</td></tr>");
});

//math
// Assume first train is 12:00.
// Frequency is every 30 min.
//
// Next arrival: 12:00 + 30
// Minutes away : Now - next arrival.
