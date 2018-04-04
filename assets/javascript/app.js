


//global variables

const ApiKey_iShowtimes = 'ax9iovcR67XrX8hGK1uRQpgGNymgCUaK';
const ApiKey_googleMaps = "AIzaSyDSMDeXXQxaeLJ4ZGXuwSKAM3NHBP4ckTc";

// test longitude and lat -- using my house
var Latitude; //= 40.5953;
var Longitude; //= -74.6173;
var myTomorrow;
var movieId;

var corsHead;
var runFromGithub = true; //false;

if (runFromGithub) {
    corsHead="";
} else {
     corsHead = "http://cors-anywhere.herokuapp.com/";
}
 


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
    //var ele = arrCinema[arrCinema.length - 1].CinemaAll;
       

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


//---------*  document ready *----------------//
$(document).ready(function () {
    console.log("ready!");
    //use momment.js to create time string for tomorrow date
    // to limit showtime-- if not will bring back 7 days worth of movies
    $("#movies-input").empty();

    myTomorrow = moment().add(1, 'days').format();
    // console.log(myTomorrow);
     
    main_GetPosition();  //gets geo location 
    //geoFindMe();

    var movieID = $("#show-theaters").click(function () {
        Ajax_withMovieID(movieId);
    });

    //dynamically append click event to foodmap class of buttons
    $(document).on('click', ".foodmap", function () {
        console.log($(this).attr('data-val-lat'), 'click event');
        var lat = $(this).attr('data-val-lat');
        var lon = $(this).attr('data-val-lon');
        showFoodMap(lat, lon);

    });

});
