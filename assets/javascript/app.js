$(document).ready(function(){

//Initialize Firebase
  var config = {
    apiKey: "AIzaSyCaVgGul_tkr5MgRo_K1j2XhoNOZmbQa9w",
    authDomain: "trainschedule-cf4ec.firebaseapp.com",
    databaseURL: "https://trainschedule-cf4ec.firebaseio.com",
    projectId: "trainschedule-cf4ec",
    storageBucket: "",
    messagingSenderId: "1086289403219"
  };
  firebase.initializeApp(config);

  var dataB = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequencyMin = "";

//click function to take in the information entered
  $(".btn").click(function(){
    trainName = $("#add-train-name").val().trim();
    destination = $("#add-destination-name").val().trim();
    firstTrain = $("#add-train-time").val().trim();
    frequencyMin = $("#add-frequency-min").val().trim();

    //sends the names to the database
    dataB.ref().set({
        name: trainName,
        dest: destination,
        first: firstTrain,
        freqM: frequencyMin
    });

    //function call to add after user clicks on submit
    addToDisplay(trainName, destination, firstTrain, frequencyMin);


  });

  //adds the entered information to the page
  function addToDisplay(tn, ds, ft, fm){
    var p1 = $("<p>");
    var p2 = $("<p>");
    var p3 = $("<p>");
    var p4 = $("<p>");

    p1.text(tn);
    p2.text(ds);
    p3.text(fm);
    p4.text(ft);

    $("#train-name-display").append(p1);
    $("#destination-display").append(p2);
    $("#frequency-display").append(p3);
    $("#next-arrival-display").append(p4);


  }





});//document ready bracket