


//global variables

const ApiKey_iShowtimes = 'ax9iovcR67XrX8hGK1uRQpgGNymgCUaK';
const ApiKey_googleMaps = "AIzaSyDSMDeXXQxaeLJ4ZGXuwSKAM3NHBP4ckTc";

// test longitude and lat -- using my house
var Latitude; //= 40.5953;
var Longitude; //= -74.6173;
var myTomorrow;

//firebase database- holding cinema information
var config = {
    apiKey: "AIzaSyB2bMy0IMJePW-V4eUguj_a8KHZ8y7Pvdk",
    authDomain: "bootcamp7firebase.firebaseapp.com",
    databaseURL: "https://bootcamp7firebase.firebaseio.com",
    projectId: "bootcamp7firebase",
    storageBucket: "bootcamp7firebase.appspot.com",
    messagingSenderId: "505631329820"
};
firebase.initializeApp(config);

// Create a variable to reference the database.
var database = firebase.database();

// var latLon = Latitude + "," + Longitude;
var get_position = function () {
    return position;
}
var get_latlon = function () {
    return Latitude + "," + Longitude;
}

var arrCinema = [];
var arrShowtimes = [];

// Firebase watcher + initial loader + order/limit HINT: .on("child_added"
database.ref('/cinema').orderByChild("dateAdded").limitToLast(350).on("child_added", function (snapshot) {
    // storing the snapshot.val() in a variable for convenience
    //var sv = snapshot.val();
    //push all data into arrCinema array 
    arrCinema.push(snapshot.val());
    var ele = arrCinema[arrCinema.length-1].CinemaAll;
    console.log("firebird watcher", arrCinema.length, arrCinema[arrCinema.length-1].CinemaId,
    arrCinema[arrCinema.length-1].CinemaAll.name , arrCinema[arrCinema.length-1].CinemaAll.location.lat,
      ele.location.address.display_text ,ele.website );
//);
     
    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});

//document ready
$(document).ready(function () {
    console.log("ready!");
    //use momment.js to create time string for tomorrow date
    // to limit showtime-- if not will bring back 7 days worth of movies

    myTomorrow = moment().add(1, 'days').format();
    console.log(myTomorrow);
    //get geolocation
    main_GetPosition();  //gets geo location and create map2
    geoFindMe();

    var movieID = $("#show-theaters").click(function () {
        console.log($(this).val());
        Ajax_withMovieID($(this).val());
    });


});
