


//global variables

const ApiKey_iShowtimes = 'ax9iovcR67XrX8hGK1uRQpgGNymgCUaK';
const ApiKey_googleMaps = "AIzaSyDSMDeXXQxaeLJ4ZGXuwSKAM3NHBP4ckTc";

// test longitude and lat -- using my house
var Latitude; //= 40.5953;
var Longitude; //= -74.6173;
var myTomorrow;
var movieId;

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
    var ele = arrCinema[arrCinema.length - 1].CinemaAll;
    console.log("firebird watcher", arrCinema.length, arrCinema[arrCinema.length - 1].CinemaId,
        arrCinema[arrCinema.length - 1].CinemaAll.name, arrCinema[arrCinema.length - 1].CinemaAll.location.lat,
        ele.location.address.display_text, ele.website);
    //);

    // Handle the errors
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});


// function showFoodMap(alat, alon) {
//     var arrRest = [];

//     console.log(" top zomato", alat, alon);

//     event.preventDefault();
//     // Zomato API documentation : https://developers.zomato.com/documentation#/        

//     var queryURL = "http://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/geocode";
//     var zomatoApiKey = "7e961b35d77eea45b512e4de6cc50dc3";

//     console.log(zomatoApiKey);

//     $.ajax({
//         url: queryURL,
//         method: 'GET',
//         dataType: 'json',
//         headers: {
//             'user-key': zomatoApiKey
//         },
//         data: {
//             lat: alat,
//             lon: alon
//         },

//     }).then(function (response) {
//         //Call display results method once ajax request has been made. 
//         console.log(response);
//         console.log("in ajax", response.nearby_restaurants.length);
//         console.log("in ajax", response.nearby_restaurants[1].restaurant.name);
//         var showR = $('.showRestaurants');


//         //writeRest(response);
//         for (let i = 0; i < response.nearby_restaurants.length; i++) {
//             const element = response.nearby_restaurants[i];
//             var div = $('<div>');

//             var msg = '<br><br><br>' + ' Restaurant: ' + element.restaurant.name + ", Located at: " + element.restaurant.location.address;
//             div.html(msg);
//             showR.append(div);

//             var oRest = {
//                 name: element.restaurant.name,
//                 address: element.restaurant.location.address,
//                 geocode = { lat: element.restaurant.location.latitude, lng: element.restaurant.location.longitude }
//                 //lat: element.restaurant.location.latitude,
//                 //lon: element.restaurant.location.longitude
//             }
//             arrRest.push(oRest);
//         }

//         restMaps(arrRest);
//         // Logging the URL so we have access to it for troubleshooting
//         console.log("---------------\nURL: " + queryURL + "\n---------------");
//         return;
//     })

// }

//document ready
$(document).ready(function () {
    console.log("ready!");
    //use momment.js to create time string for tomorrow date
    // to limit showtime-- if not will bring back 7 days worth of movies
    $("#movies-input").empty();

    myTomorrow = moment().add(1, 'days').format();
    console.log(myTomorrow);
    //get geolocation
    main_GetPosition();  //gets geo location and create map2
    geoFindMe();



    var movieID = $("#show-theaters").click(function () {
        //      Ajax_withMovieID($(this).val());
        Ajax_withMovieID(movieId);
    });

    //dynamically append click event to foodmap buttons
    $(document).on('click', ".foodmap", function () {
        console.log($(this).attr('data-val-lat'), 'click event');
        var lat = $(this).attr('data-val-lat');
        var lon = $(this).attr('data-val-lon');
        // showFoodMaps( $(this).attr('data-val-lat') , $(this).attr('data-val-lon') );
        showFoodMap(lat, lon);

    });

});
