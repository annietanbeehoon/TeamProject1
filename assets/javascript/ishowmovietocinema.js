

//this is the Ajax call with movie ID

//url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/showtimes/",
// "all_fields": true,  "fields": "original_title,synopsis",     "tmdb_id": movieId,

function Ajax_withMovieID(movieId) {
    //need to make call from annie tmdb to get ishowtime movieid
    jQuery.ajax({
        //  url: "http://cors-anywhere.herokuapp.com/https://api.internationalshowtimes.com/v4/movies/", //+ movieId,
        url: corsHead + "https://api.internationalshowtimes.com/v4/movies/", //+ movieId,
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
            // console.log(data);
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
    // console.log('writeHTML_movies(movieData)', movieData.length);
    var divMovies = $('#movies');
    for (let i = 0; i < movieData.length; i++) {
        const element = movieData[i];
        get_Showtimes(element.id);
        // // testing display - works good
        // var x = 'tmdb_id: ' + element.tmdb_id + ', id: ' + element.id;
        // x += ', original_title: ' + element.original_title + ' <br> Synopsis ' + element.synopsis;
        // x += ', slug: ' + element.slug + ', poster_image_thumbnail: ' + element.poster_image_thumbnail;
        // x += ' , title: ' + element.title + '<br> website: ' + element.website;
        // var img = $('<img>');
        // img.attr('src', element.poster_image_thumbnail);
        // var p = $("<p>");
        // p.html(x);       
        // divMovies.append(img).append(p);
    }

}

function get_Showtimes(iShowtimes_id) {

    // console.log('get_Showtimes(id)', iShowtimes_id);

    jQuery.ajax({
        url:  corsHead + "https://api.internationalshowtimes.com/v4/showtimes/",
        type: "GET",
        data: {
            "countries": "US",
            "movie_id": iShowtimes_id,
            "time_to": myTomorrow,
            "limit": 30,
            "append": "cinema",
            //"movie_fields:":"scene_images.flat",
            "fields": "cinema_id,start_at,cinema_movie_title,booking_link,title,slug,poster_image_thumbnail",
            "location": get_latlon(),
        },
        headers: {
            "X-API-Key": ApiKey_iShowtimes,
        },
    })
        .done(function (data, textStatus, jqXHR) {
            console.log("HTTP Request Succeeded: " + jqXHR.status);
            // console.log(data, ' -- from showtime call');
            var ds = data.showtimes;
            for (let i = 0; i < ds.length; i++) {
                const element = ds[i];
                arrShowtimes.push(element);
                writeShowtimes(element);

                // if (haveCinemaInfo(element.cinema_id) < 0) {
                //     //get_cinemas(element.cinema_id);
                // }

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
    index = arrCinema.findIndex(el => el[0] == cinemaId);
    return index;

}
async function get_cinemas(cinema_id) {

    if (haveCinemaInfo(cinema_id) >= 0) { return; }

    // console.log('get_cinemas(', cinema_id);
    jQuery.ajax({
        url:  corsHead + "https://api.internationalshowtimes.com/v4/cinemas/" + cinema_id,
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
    // console.log("WriteShowTime", element);
    //grab all arr cinema information
    const result = arrCinema.find(arCin => arCin.CinemaId === element.cinema_id);

    var dv = $("<div class='returnedShowtimes'>");
    var dateFormt = moment(element.start_at).format("dddd, MMMM Do YYYY, h:mm:ss a");

    var xx = element.cinema_movie_title + ', ' + dateFormt;

    var rCa = result.CinemaAll;
    xx += '<br>' + rCa.name + '<br>' + rCa.location.address.display_text;
    // xx += rCa.location.address.city;
    xx += restaurantLinks(rCa.location.lat, rCa.location.lon);

    dv.html(xx);
    $('#modalShowtimes').append(dv);

}

function restaurantLinks(lat, lon) {
    var x;
    x = '  <a href="#openModal2"  class="foodmap"  data-val-lat=' + lat + ' data-val-lon=' + lon + ' > ';
    x += ' <button id="getfood" class="pure-button pure-button-primary">'
    x += ' <img id="food-logo" src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MDQgNTA0IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MDQgNTA0OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjUxMnB4IiBoZWlnaHQ9IjUxMnB4Ij4KPGNpcmNsZSBzdHlsZT0iZmlsbDojOTBERkFBOyIgY3g9IjI1MiIgY3k9IjI1MiIgcj0iMjUyIi8+CjxwYXRoIHN0eWxlPSJmaWxsOiMyQzk5ODQ7IiBkPSJNNDkuOSw0MDIuNUM5NS44LDQ2NC4xLDE2OS4zLDUwNCwyNTIsNTA0czE1Ni4yLTM5LjksMjAyLjEtMTAxLjVINDkuOXoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0U2RTlFRTsiIGQ9Ik0zMTEuNiwzOTUuMmM2LjMtMi44LDEwLjMtOSwxMC4zLTE1Ljh2LTU5LjZjMC01LjItMi42LTkuOC02LjYtMTMuMWMtMi41LTIuMS00LTQuOS00LTcuOSAgYzAtNS4zLDQuNS05LjcsMTAuNi0xMS4xdi00aDcuOHY0YzYuMSwxLjQsMTAuNiw1LjgsMTAuNiwxMS4xYzAsMy4xLTEuNSw1LjktNCw3LjljLTQsMy4zLTYuNiw4LTYuNiwxMy4xdjU5LjYgIGMwLDYuOSw0LjEsMTMuMSwxMC4zLDE1LjhsMTYuNCw3LjJoLTI2LjdoLTcuOGgtMjYuN0wzMTEuNiwzOTUuMnoiLz4KPHBhdGggc3R5bGU9ImZpbGw6I0ZGRkZGRjsiIGQ9Ik0zNzUuMSwxNzMuM2M3LDE3LjIsMTEuMSwzNy4xLDExLjEsNTZjMCw0OC42LTI3LDcyLjUtNjAuNCw3Mi41cy02MC40LTIzLjktNjAuNC03Mi41ICBjMC0xOC45LDQuMS0zOC44LDExLjEtNTZMMzc1LjEsMTczLjNMMzc1LjEsMTczLjN6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNGRjcwNTg7IiBkPSJNMzgwLjIsMjEzLjdjMC44LDUuOSwxLjIsMTEuNywxLjIsMTcuNWMwLDQxLjctMjEuMyw2Ny42LTU1LjUsNjcuNnMtNTUuNS0yNS45LTU1LjUtNjcuNiAgYzAtNS43LDAuNC0xMS42LDEuMi0xNy41TDM4MC4yLDIxMy43TDM4MC4yLDIxMy43eiIvPgo8cGF0aCBzdHlsZT0iZmlsbDojRjE1NDNGOyIgZD0iTTM0OS40LDI4MS41bDAuOS0wLjljMC43LTAuNywxLjYtMS42LDIuNy0yLjlzMi40LTIuOSwzLjgtNC44czIuOC00LjEsNC4xLTYuNiAgYzIuNy01LDUuMi0xMS4xLDYuOC0xNy45YzAuOC0zLjQsMS40LTYuOSwxLjktMTAuNWMwLjQtMy43LDAuNy03LjIsMC43LTExYzAuMS00LjQtMC4xLTguOC0wLjUtMTMuMWgtNS4zYzAuOCw0LjMsMS4zLDguNywxLjUsMTMuMiAgYzAuMiwzLjUsMC4yLDcuMywwLjEsMTAuN2MtMC4yLDMuNS0wLjUsNy0xLjEsMTAuM2MtMS4xLDYuNy0zLDEyLjgtNS4zLDE3LjhjLTEuMiwyLjUtMi40LDQuOC0zLjYsNi44cy0yLjQsMy42LTMuNCw0LjkgIGMtMSwxLjQtMS45LDIuNC0yLjUsM0MzNDkuOCwyODEsMzQ5LjUsMjgxLjMsMzQ5LjQsMjgxLjV6Ii8+CjxwYXRoIHN0eWxlPSJmaWxsOiNFNkU5RUU7IiBkPSJNMzU5LjUsMTczLjNoLTkuMWMwLjQsMC44LDEsMS44LDEuNiwzYzEuNSwyLjgsMy40LDcsNS40LDEyYzIuOCw3LDUuNSwxNS45LDcuMSwyNS40aDUuMyAgYy0wLjktMTAuMS0zLjEtMTkuNi01LjQtMjcuMWMtMS43LTUuNC0zLjQtOS44LTQuNy0xMi45QzM1OS42LDE3My41LDM1OS42LDE3My40LDM1OS41LDE3My4zeiIvPgo8cG9seWdvbiBzdHlsZT0iZmlsbDojRkY3MDU4OyIgcG9pbnRzPSIxNjIuMyw5MC45IDE5NS40LDkwLjkgMjAxLjcsNjcuNiAxNTYsNjcuNiAiLz4KPHBhdGggc3R5bGU9ImZpbGw6IzMyNEE1RTsiIGQ9Ik0xNjAuNiwxMzguMVY5NS42SDE5N3Y0Mi41YzAsOS4zLDQuOCwxNy44LDEyLjgsMjIuNmMxNy4zLDEwLjUsMjguOSwyOS41LDI4LjksNTEuMnYxNzYuMiAgYzAsNy42LTYuMiwxMy44LTEzLjgsMTMuOGgtOTIuMmMtNy42LDAtMTMuOC02LjItMTMuOC0xMy44VjIxMS45YzAtMjEuNywxMS42LTQwLjcsMjguOS01MS4yQzE1NS44LDE1NS45LDE2MC42LDE0Ny4zLDE2MC42LDEzOC4xeiAgIi8+CjxwYXRoIHN0eWxlPSJmaWxsOiNDRUQ1RTA7IiBkPSJNMTU2LjgsOTkuMWg0NGMwLjUsMCwwLjgtMC40LDAuOC0wLjh2LTkuNGMwLTAuNS0wLjQtMC44LTAuOC0wLjhoLTQ0Yy0wLjUsMC0wLjgsMC40LTAuOCwwLjh2OS40ICBDMTU2LDk4LjcsMTU2LjMsOTkuMSwxNTYuOCw5OS4xeiIvPgo8cmVjdCB4PSIxMTkiIHk9IjIzMS40IiBzdHlsZT0iZmlsbDojRkZEMDVCOyIgd2lkdGg9Ijk3LjciIGhlaWdodD0iMTA5LjkiLz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPGc+CjwvZz4KPC9zdmc+Cg==" ';
    x += ' /> '
    x += ' <span class="button-text">';
    x += ' Show Local <br> Restaurants ';
    x += ' </span>';
    x += '  </button> </a>';

    return x;
}

