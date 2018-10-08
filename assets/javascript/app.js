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

  var trainName = "";
  var destination = "";
  var firstTrain = "";
  var frequencyMin = "";
  var childAdd = false;

//click function to take in the information entered
  $(".Add").click(function(event){
    //prevents page reload when pressing submit
    event.preventDefault();
    childAdd = true;
    //pulls value from fields      
    trainName = $("#add-train-name").val().trim();
    destination = $("#add-destination-name").val().trim();
    firstTrain = $("#add-train-time").val().trim();
    frequencyMin = $("#add-frequency-min").val().trim();

    //conditional to make sure all information is provided
    if (trainName == "" || destination == "" || firstTrain == "" || frequencyMin == ""){
        alert("Please enter all info and resubmit");
    }
    else{
        //adds information to page
        addToDisplay(trainName, destination, firstTrain, frequencyMin);
        //clears the entry fields
        clearFields();
        //pushes data to database as a child, so that multiple children can be added
        database.ref().push({
            name: trainName,
            dest: destination,
            first: firstTrain,
            freqM: frequencyMin
        });
    }
  
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

    $("#train-name-display").append(p1.addClass("schClass").text(tn));
    $("#destination-display").append(p2.addClass("schClass").text(ds));
    $("#frequency-display").append(p3.addClass("schClass").text(fm));
    $("#next-arrival-display").append(p4.addClass("schClass").text(ft));
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
        }
        console.log(childAdd);
    });
    

}

recallDatabase();

console.log(childAdd);


});//document ready bracket