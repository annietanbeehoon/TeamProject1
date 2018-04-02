


//global variables

const ApiKey_iShowtimes = 'ax9iovcR67XrX8hGK1uRQpgGNymgCUaK';
const ApiKey_googleMaps = "AIzaSyDSMDeXXQxaeLJ4ZGXuwSKAM3NHBP4ckTc";

// test longitude and lat -- using my house
var Latitude ; //= 40.5953;
var Longitude ; //= -74.6173;
var myTomorrow;

// var latLon = Latitude + "," + Longitude;

var arrCinema = [];
var arrShowtimes = [];



//document ready
$(document).ready(function () {
    console.log("ready!");

   
    var movieID = $("#movieList").change(function () {
        console.log($(this).val());
        Ajax_withMovieID($(this).val());
    });

    //use momment.js to create time string for tomorrow date
    // to limit showtime-- if not will bring back 7 days worth of movies

    myTomorrow = moment().add(1, 'days').format();
    console.log(myTomorrow);
});
