

//this is the Ajax call with movie ID

//url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/showtimes/",
// "all_fields": true,  "fields": "original_title,synopsis",     "tmdb_id": movieId,

function Ajax_withMovieID(movieId) {


    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/movies/", //+ movieId,
        type: "GET",
        data: {
            "countries": "US",
            "tmdb_id": movieId,
            "limit": 10,
            "fields": "id,slug,title,poster_image_thumbnail,tmdb_id,original_title,synopsis,website",
            // "all_fields": true,
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
        get_Showtimes(element.id);
        divMovies.append(img);

    }

}

function get_Showtimes(id) {

    console.log('get_Showtimes(id)', id);

    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/showtimes/", //+ movieId,
        type: "GET",
        data: {
            "countries": "US",
            "movie_id": id,
            "time_to": myTomorrow,
            "limit": 3,
            "fields": "cinema_id,start_at,cinema_movie_title,booking_link",
            // "fields": "id,cinema_id,start_at,cinema_movie_title,booking_link",
            //"all_fields":true,
            "location": latLon,
        },
        headers: {
            "X-API-Key": ApiKey_iShowtimes,
        },
    })
        .done(function (data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
            var ds = data.showtimes;
            for (let i = 0; i < ds.length; i++) {
                const element = ds[i];
                get_cinemas(element.cinema_id);     
            }
                   
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
            console.log(errorThrown);
            console.log(jqXHR);
        })
        .always(function () {
            /* ... */
        });

}


function get_cinemas(cinema_id){
    console.log('get_cinemas(',cinema_id);
    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/cinemas/" +cinema_id, 
        type: "GET",
        data: {
            "countries": "US",
            "cinema_id": cinema_id,            
        },
        headers: {
            "X-API-Key": ApiKey_iShowtimes,
        },
    })
        .done(function (data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data);
            // writeHTML_movies(data.movies);
        })
        .fail(function (jqXHR, textStatus, errorThrown) {
            console.log("HTTP Request Failed");
            console.log(errorThrown);
            console.log(jqXHR);
        })
        .always(function () {
            /* ... */
        });

}