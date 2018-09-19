var config = {
    apiKey: "AIzaSyAbSjI_jun_mn06xfoVeZrJULu2z1HNxLs",
    authDomain: "trains-fb3f5.firebaseapp.com",
    databaseURL: "https://trains-fb3f5.firebaseio.com",
    projectId: "trains-fb3f5",
    storageBucket: "trains-fb3f5.appspot.com",
    messagingSenderId: "47684092595"
};

firebase.initializeApp(config);

var dataRef = firebase.database();

dataRef.ref().on("child_added", function (childSnapshot) {

    var tFrequency = childSnapshot.val().frequency;
    var firstTime = childSnapshot.val().firstTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");

    $("#trainTable").append("<tr><td>" +
        childSnapshot.val().trainName +
        " </td><td> " + childSnapshot.val().destination +
        " </td><td> " + childSnapshot.val().frequency +
        " </td><td> " + moment(nextTrain).format("hh:mm") +
        " </td><td> " + tMinutesTillTrain +
        " </td></tr>");
}, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

$(document).ready(function () {

    $("button").on("click", function (event) {
        event.preventDefault();
        dataRef.ref().push({

            trainName: $("#inputTrainName").val().trim(),
            destination: $("#inputDestination").val().trim(),
            frequency: $("#inputFrequency").val().trim(),
            firstTime: $("#inputFirstTime").val().trim(),
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });
    });

});