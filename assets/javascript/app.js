


//global variables




//document ready
$(document).ready(function () {
    console.log("ready!");


    var movieID = $("#movieList").change(function () {
        console.log($(this).val());
        Ajax_withMovieID($(this).val());
    });



    // Ajax_withMovieID("29368");
    // Ajax_withMovieID("29483");
    // Ajax_withMovieID("30227");
    // Ajax_withMovieID("41921");
    // Ajax_withMovieID("12226");





});
