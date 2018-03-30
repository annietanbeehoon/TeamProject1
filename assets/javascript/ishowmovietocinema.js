

//this is the Ajax call with movie ID

//url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/showtimes/",
// "all_fields": true,  "fields": "original_title,synopsis",     "tmdb_id": movieId,

function Ajax_withMovieID(movieId) {
    //need to make call from annie tmdb to get ishowtime movieid
    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/movies/", //+ movieId,
        type: "GET",
        data: {
            "countries": "US",
            "tmdb_id": movieId,
            "limit": 10,
            "fields": "id,slug,title,poster_image_thumbnail,tmdb_id,original_title,synopsis,website",
            "all_fields": true,
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
        var x = 'tmdb_id: ' + element.tmdb_id + ', id: ' + element.id;
        x += ', original_title: ' + element.original_title + ' <br> Synopsis ' + element.synopsis;
        x += ', slug: ' + element.slug + ', poster_image_thumbnail: ' + element.poster_image_thumbnail;
        x += ' , title: ' + element.title + '<br> website: ' + element.website;
        var img = $('<img>');
        img.attr('src', element.poster_image_thumbnail);
        var p = $("<p>");
        p.html(x);
        get_Showtimes(element.id);
        divMovies.append(img).append(p);

    }

}

function get_Showtimes(iShowtimes_id) {

    console.log('get_Showtimes(id)', iShowtimes_id);

    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/showtimes/",
        type: "GET",
        data: {
            "countries": "US",
            "movie_id": iShowtimes_id,
            "time_to": myTomorrow,
            "limit": 20,
            "append": "cinema",
            //"movie_fields:":"scene_images.flat",
            "fields": "cinema_id,start_at,cinema_movie_title,booking_link,title,slug,poster_image_thumbnail",
            "location": latLon,
        },
        headers: {
            "X-API-Key": ApiKey_iShowtimes,
        },
    })
        .done(function (data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            console.log(data, ' -- from showtime call');
            var ds = data.showtimes;
            for (let i = 0; i < ds.length; i++) {
                const element = ds[i];
                arrShowtimes.push(element);
                writeShowtimes(element);

                if (haveCinemaInfo(element.cinema_id) < 0) {
                    get_cinemas(element.cinema_id);
                }

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


function haveCinemaInfo(cinemaId) {
    var index;
    index = arrCinema.findIndex( el => el[0] == cinemaId);
    console.log(' haveCinemaInfo(cinemaId)', index);
    return index;

}
async function get_cinemas(cinema_id) {

    if (haveCinemaInfo(cinema_id) >= 0) { return; }

    console.log('get_cinemas(', cinema_id);
    jQuery.ajax({
        url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/cinemas/" + cinema_id,
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
            console.log('got cinema', data);
            arrCinema.push([data.cinema.id, data]);

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


function writeShowtimes(element) {
    console.log("WriteShowTime", element);
    var p = $("<p>");
    var xx = 'Start_at: ' + element.start_at + ' , booking_link: ' + element.booking_link + '<br>';
    xx += ' Cinema Id: ' + element.cinema_id + ' , cinema_movie_title: ' + element.cinema_movie_title + '<br><br>';
    p.html(xx);
    $('#showtime').append(p);

}