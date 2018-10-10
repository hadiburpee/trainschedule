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
  var firstTrainTime = "";
  var frequencyMin = "";
  var childAdd = false;
  var currentTime = moment().format("HH:mm");
  var testTime = "6:30";
  

  console.log("current time: " + currentTime);

//click function to take in the information entered
  $(".Add").click(function(event){
    //prevents page reload when pressing submit
    event.preventDefault();
    childAdd = true;
    //pulls value from fields      
    trainName = $("#add-train-name").val().trim();
    destination = $("#add-destination-name").val().trim();
    firstTrainTime = $("#add-train-time").val().trim();
    frequencyMin = $("#add-frequency-min").val().trim();

    console.log("first train time: " + firstTrainTime);

    //conditional to make sure all information is provided
    // if (firstTrainTime !==  ) <-- Make sure the time is in the correct format
    
    if (trainName == "" || destination == "" || firstTrainTime == "" || frequencyMin == ""){
        alert("Please enter all info and resubmit");
    }
    else{
        timeCalculator();
        //adds information to page
        addToDisplay(trainName, destination, firstTrainTime, frequencyMin);
        //clears the entry fields
        clearFields();
        //pushes data to database as a child, so that multiple children can be added
        database.ref().push({
            name: trainName,
            dest: destination,
            first: firstTrainTime,
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



function timeCalculator(){
    
    var splitTime = currentTime.split(":");
    var splitFirstTime = firstTrainTime.split(":");
    var currhr = parseInt(splitTime[0]);
    var currmn = parseInt(splitTime[1]);
    var firsthr = parseInt(splitFirstTime[0]);
    var firstmn = parseInt(splitFirstTime[1]);

    var realTime = moment(currentTime, 'HH:mm');
    console.log("real time: " + realTime);

    console.log("Current splitTime: " + currhr + currmn);
    console.log("First Time: " + firsthr + firstmn)
    var curr = moment({
        h: currhr,
        m: currmn
    });
    var first = moment({
        h: firsthr,
        m: firstmn
    });
    var minuteDifference = curr.diff(first,'minutes');

    var nextTrainMin = minuteDifference%frequencyMin;

    console.log("Next Train Minutes: " + nextTrainMin);

    // console.log("Next Train Time: " + nextTime);



}

var test1 = moment().format("HH:mm");
var test2 = moment("20:00", "HH:mm").format("HH:mm");


var test3 = moment("20:00", "HH:mm");

console.log("test 3 before: " + test3);

        test3.add(7,'m');

test4 = test3.format("HH:mm");

// test4 = moment(test3, "HH:mm").format("HH:mm");

// var test3 = test1.clone();
//     test3.add(7,'m');

// test1.add(test2);

// var test3 = test1.moment().add(7, "m");

console.log("moment subtract"+ moment(test1).subtract(test2));

console.log("test 1: " + test1);
console.log("test 2: " + test2);
console.log("test 3: " + test4);
// console.log("test 4: " + test4)

// var m = moment(newDate(2011, 2, 12, 5, 0, 0));
// console.log(m.hours());

});//document ready bracket