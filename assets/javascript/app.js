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

  var database = firebase.database();

  var trainName = " ";
  var destination = " ";
  var firstTrain = " ";
  var frequencyMin = " ";
  var childAdd = false;

//click function to take in the information entered
  $(".Add").click(function(event){
    //prevents page reload when pressing submit
    event.preventDefault();
    //pulls value from fields      
    trainName = $("#add-train-name").val().trim();
    destination = $("#add-destination-name").val().trim();
    firstTrain = $("#add-train-time").val().trim();
    frequencyMin = $("#add-frequency-min").val().trim();

    //sends the names to the database
    database.ref().push({
        name: trainName,
        dest: destination,
        first: firstTrain,
        freqM: frequencyMin
    });
    
    //function call to add after user clicks on submit
    addToDisplay(trainName, destination, firstTrain, frequencyMin);
    //clear fields call so they are reset when submitting a train schedule
    clearFields();

  });

//to clear train database and schedule
    $(document).on("click", ".Clear", function(){
        database.ref().remove();
        $(".schClass").remove();
    });


//adds the entered information to the page
  function addToDisplay(tn, ds, ft, fm){
    var p1 = $("<p>");
    var p2 = $("<p>");
    var p3 = $("<p>");
    var p4 = $("<p>");

    p1.addClass("schClass");
    p2.addClass("schClass");
    p3.addClass("schClass");
    p4.addClass("schClass");

    p1.text(tn);
    p2.text(ds);
    p3.text(fm);
    p4.text(ft);

    $("#train-name-display").append(p1);
    $("#destination-display").append(p2);
    $("#frequency-display").append(p3);
    $("#next-arrival-display").append(p4);
  }

  //clears the input fields
  function clearFields(){
    $(".form-control").val("");
  }

  //recalls train schedule stored in database upon page reload
  function recallDatabase(){
    database.ref().on("child_added", function(snapshot){
        if(childAdd === false){
        var dbName = snapshot.val().name;
        var dbDest = snapshot.val().dest;
        var dbFirst = snapshot.val().first;
        var dbFreq = snapshot.val().freqM;
        addToDisplay(dbName, dbDest, dbFreq, dbFirst);
        childAdd = true;
        }
        console.log(childAdd);
    });
    

}

recallDatabase();

console.log(childAdd);


});//document ready bracket