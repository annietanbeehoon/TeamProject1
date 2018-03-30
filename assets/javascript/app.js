


//global variables

var ApiKey_iShowtimes = 'ax9iovcR67XrX8hGK1uRQpgGNymgCUaK';


// test longitude and lat -- using my house
var Latitude = 40.5953;
var Longitude = -74.6173;
var myTomorrow;

var latLon = Latitude + "," + Longitude;

var arrCinema = [];
var arrShowtimes = [];




//document ready
$(document).ready(function () {
    console.log("ready!");


    var movieID = $("#movieList").change(function () {
        console.log($(this).val());
        Ajax_withMovieID($(this).val());
    });

    //use momnetjs to crete time string for tomorrow date
    // to limit showtime-- if not will bring back 7 days worth of movies

    myTomorrow = moment().add(1, 'days').format();
    console.log(myTomorrow);
});
