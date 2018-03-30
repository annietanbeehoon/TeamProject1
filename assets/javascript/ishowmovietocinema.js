

//this is the Ajax call with movie ID

//url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/showtimes/",
// "all_fields": true,  "fields": "original_title,synopsis", 

function Ajax_withMovieID(movieId) {


    var ApiKey_iShowtimes = 'ax9iovcR67XrX8hGK1uRQpgGNymgCUaK';
    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/movies/", //+ movieId,
        type: "GET",
        data: {
            "countries": "US",
            "limit": 10,
            "tmdb_id": movieId,
            "fields": "id,slug,title,poster_image_thumbnail,tmdb_id,original_title,synopsis",
        },
        headers: {
            "X-API-Key": ApiKey_iShowtimes,
        },
    })
        .done(function (data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
            writeHTML_movies(data.movies);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
            console.log(errorThrown);
            console.log(jqXHR);
        })
        .always(function () {
            /* ... */
        });
};



function writeHTML_movies(movieData) {
    console.log('writeHTML_movies(movieData)', movieData.length);
    var divMovies = $('#movies');
    for (let i = 0; i < movieData.length; i++) {
        const element = movieData[i];
        console.log(i, element);
        var img = $('<img>');
        img.attr('src', element.poster_image_thumbnail);
        divMovies.append(img);

    }

}   