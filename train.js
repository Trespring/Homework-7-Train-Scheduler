// Initialize Firebase
var config = {
  apiKey: "AIzaSyAM1KYbzx-HJnv4_nZCJTQWgg9sIVoNWEU",
  authDomain: "train-scheduler-hw7-6c05f.firebaseapp.com",
  databaseURL: "https://train-scheduler-hw7-6c05f.firebaseio.com",
  projectId: "train-scheduler-hw7-6c05f",
  storageBucket: "",
  messagingSenderId: "293296300435"
};
firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding trains
$("#add-train-btn").on("click", function (event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainStart = $("#firstTrain-input").val().trim();
  var trainRate = $("#frequency-input").val().trim();


  // ATTEMPT
  //var tFrequency = 3;
  // Time is 3:30 AM
  //var firstTime = "03:30";
  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(trainStart, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);
  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);
  // Time apart (remainder)
  var tRemainder = diffTime % trainRate;
  console.log(tRemainder);
  // Minute Until Train
  var tMinutesTillTrain = trainRate - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
  //ATTEMPT


  // Creates local "temporary" object for holding train data
  var newT = {
    name: trainName,
    dest: trainDest,
    start: trainStart,
    rate: trainRate
  };

  database.ref().push(newT);

  // Logs everything to console
  console.log(newT.name);
  console.log(newT.dest);
  console.log(newT.start);
  console.log(newT.rate);

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#firstTrain-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function (childSnapshot, prevChildKey) {

  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().dest;
  var trainStart = childSnapshot.val().start;
  var trainRate = childSnapshot.val().rate;

  // Train Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainStart);
  console.log(trainRate);

  // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + trainDest + "</td><td>" +
    trainStart + "</td><td>" + trainRate + "</td><td>");
});
