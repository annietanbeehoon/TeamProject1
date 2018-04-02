$(document).ready(function () {
  // CLICK HANDLERS
  // ==========================================================
  $("#movies-input").empty();
  // .on("click") function associated with the Search Button
  $(".pure-controls").on("click", function (event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();

    // queryURL is the url we'll use to query the API

    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=88887032dc1d0d80dd7ccbd783133865&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_cast&page=1";
    const elementApiKey = "88887032dc1d0d80dd7ccbd783133865";
    queryURL += "&type=Trailer";
    queryURL += "&append_to_response=videos,overview,release_date,&query=";

    //https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
    // grab text the user typed into the search input, add as parameter to url
    var movieSearch = [];
    movieSearch[0] = $("#movie-input").val().trim().replace(/ /g, '+');
    movieSearch[1] = $("#actor-input").val().trim().replace(/ /g, '+');
    movieSearch[2] = $("#genre-input").val().trim().replace(/ /g, '+');
    movieSearch[3] = $("#year-input").val().trim().replace(/ /g, '+');

    console.log(movieSearch);
    queryURL += movieSearch;


    // Logging the URL so we have access to it for troubleshooting
    console.log("---------------\nURL: " + queryURL + "\n---------------");


    // make the AJAX request to the API - GETs the JSON data at the queryURL.
    // the data then gets passed as an argument to the function
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      console.log(response);

      for (let i = 0; i < 5; i++) {
        console.log(response.results[i]);
      }



      //============================results[0] - failed to make a function so
      //============================replicated codes for each result index 0 to 4
      //get movieID for Showtime
      var movieId = JSON.parse(response.results[0].id);
      console.log(movieId);

      // Creating a div to hold the movie title and release year
      var movieDiv = $("#info-view");

      // storing the movie title data
      console.log('Title:', response.results[0].title);
      var title = response.results[0].title;
      var pMovieTitle = $(".title-format").text("Movie Title: " + title);
      movieDiv.append(pMovieTitle);

      // Storing the release date data
      var releaseDate = response.results[0].release_date;
      // Creating an element to have the release date displayed
      var pOne = $(".year-format").text("Release date: " + releaseDate);
      // Displaying the releaseDate
      movieDiv.append(pOne);

      // Creating a div to hold the poster
      var posterDiv = $("#poster-view");

      // Retrieving the URL for the image
      // var imgURL = response.results[0].poster_path;
      console.log('poster path: ', response.results[0].poster_path);
      var imgURL = "https://image.tmdb.org/t/p/w500" + response.results[0].poster_path;
      console.log(imgURL);
      // Creating an element to hold the image
      var image = $(".poster-format").attr("src", imgURL);
      // Appending the image
      posterDiv.append(image);

      // Creating a div to hold the trailer
      var trailerDiv = $("#trailer-view");

      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/movie/" + movieId + "/videos?language=en-US&api_key=88887032dc1d0d80dd7ccbd783133865",
        "method": "GET",
        "headers": {},
        "data": "{}"
      }

      $.ajax(settings).done(function (response) {
        console.log(response);

        console.log(response.id);
        console.log(response.results[0]);
        console.log(response.results[0].key);

        var youTubeKey = response.results[0].key;
        console.log(youTubeKey);

        //var trailersDiv = $("#trailers-view");
        var trailerURL = "https://www.youtube.com/watch?v=" + youTubeKey;
        console.log(trailerURL);

        // Creating an element to hold the image
        $(".video").attr("src", trailerURL);
        // Appending the image
        trailerDiv.append(trailerURL);
      });


      // Creating a div to hold the rating and plot
      var sideView = $("#side-view");

      // storing the vote average
      console.log('Vote Average:', response.results[0].vote_average);
      var vote = response.results[0].vote_average;
      var pVote = $(".rating-score").text("Vote Average: " + vote);
      sideView.append(pVote);

      // Storing the overview
      console.log('Plot:', response.results[0].overview);
      var overview = response.results[0].overview;
      // Creating an element to hold the overview
      var pTwo = $(".plot-format").text("Overview: " + overview);
      // Appending the plot
      sideView.append(pTwo);

      $("#movie-input").val("");
      $("#actor-input").val("");
      $("#genre-input").val("");
      $("#myear-input").val("");


      // //=====================================results[1]
      // //get movieID for Showtime
      // var movieId = JSON.parse(response.results[1].id);
      // console.log(movieId);

      // // Creating a div to hold the movie
      // var movieDiv = $("#main-view");

      // console.log('Title:', response.results[1].title);
      // var title = response.results[1].title;
      // var pMovieTitle = $(".title-format").text("Movie Title: " + title);
      // movieDiv.append(pMovieTitle);

      // console.log('Vote Average:', response.results[1].vote_average);
      // var vote = response.results[1].vote_average;
      // var pVote = $(".rating-format").text("Vote Average: " + vote);
      // movieDiv.append(pVote);

      // // Storing the release date data
      // var releaseDate = response.results[1].release_date;
      // // Creating an element to have the release date displayed
      // var pOne = $(".year-format").text("Release date: " + releaseDate);
      // // Displaying the releaseDate
      // movieDiv.append(pOne);

      // // Storing the overview
      // var overview = response.results[1].overview;
      // // Creating an element to hold the overview
      // var pTwo = $(".plot-format").text("Overview: " + overview);
      // // Appending the plot
      // movieDiv.append(pTwo);

      // // Retrieving the URL for the image
      // // var imgURL = response.results[0].poster_path;
      // console.log('poster path: ', response.results[1].poster_path);
      // var imgURL = "https://image.tmdb.org/t/p/w500" + response.results[1].poster_path;
      // console.log(imgURL);
      // // Creating an element to hold the image
      // var image = $(".oster-format").attr("src", imgURL);
      // // Appending the image
      // movieDiv.append(image);

      // //====================================results[2]
      // //get movieID for Showtime
      // var movieId = JSON.parse(response.results[2].id);
      // console.log(movieId);

      // // Creating a div to hold the movie
      // var movieDiv = $("#main-view");

      // console.log('Title:', response.results[2].title);
      // var title = response.results[2].title;
      // var pMovieTitle = $("title-format").text("Movie Title: " + title);
      // movieDiv.append(pMovieTitle);

      // console.log('Vote Average:', response.results[2].vote_average);
      // var vote = response.results[2].vote_average;
      // var pVote = $(".rating-format").text("Vote Average: " + vote);
      // movieDiv.append(pVote);

      // // Storing the release date data
      // var releaseDate = response.results[2].release_date;
      // // Creating an element to have the release date displayed
      // var pOne = $("year-format").text("Release date: " + releaseDate);
      // // Displaying the releaseDate
      // movieDiv.append(pOne);

      // // Storing the overview
      // var overview = response.results[2].overview;
      // // Creating an element to hold the overview
      // var pTwo = $("plot-format").text("Overview: " + overview);
      // // Appending the plot
      // movieDiv.append(pTwo);

      // // Retrieving the URL for the image
      // // var imgURL = response.results[0].poster_path;
      // console.log('poster path: ', response.results[2].poster_path);
      // var imgURL = "https://image.tmdb.org/t/p/w500" + response.results[2].poster_path;
      // console.log(imgURL);
      // // Creating an element to hold the image
      // var image = $("poster-format").attr("src", imgURL);

      // // Appending the image
      // movieDiv.append(image);

      // $("#movie-input").val("");
      // $("#actor-input").val("");
      // $("#genre-input").val("");
      // $("#myear-input").val("");


      // //==============================results[3]

      // //get movieID for Showtime
      // var movieId = JSON.parse(response.results[3].id);
      // console.log(movieId);

      // // Creating a div to hold the movie
      // var movieDiv = $("#main-view");

      // console.log('Title:', response.results[3].title);
      // var title = response.results[3].title;
      // var pMovieTitle = $(".title-format").text("Movie Title: " + title);
      // movieDiv.append(pMovieTitle);

      // console.log('Vote Average:', response.results[3].vote_average);
      // var vote = response.results[3].vote_average;
      // var pVote = $(".rating-format").text("Vote Average: " + vote);
      // movieDiv.append(pVote);

      // // Storing the release date data
      // var releaseDate = response.results[3].release_date;
      // // Creating an element to have the release date displayed
      // var pOne = $(".year-format").text("Release date: " + releaseDate);
      // // Displaying the releaseDate
      // movieDiv.append(pOne);

      // // Storing the overview
      // var overview = response.results[3].overview;
      // // Creating an element to hold the overview
      // var pTwo = $(".plot-format").text("Overview: " + overview);
      // // Appending the plot
      // movieDiv.append(pTwo);

      // // Retrieving the URL for the image
      // // var imgURL = response.results[0].poster_path;
      // console.log('poster path: ', response.results[3].poster_path);
      // var imgURL = "https://image.tmdb.org/t/p/w500" + response.results[3].poster_path;
      // console.log(imgURL);
      // // Creating an element to hold the image
      // var image = $(".poster-format").attr("src", imgURL);

      // // Appending the image
      // movieDiv.append(image);
      // //===============================results[4]
      // //get movieID for Showtime
      // var movieId = JSON.parse(response.results[4].id);
      // console.log(movieId);

      // // Creating a div to hold the movie
      // var movieDiv = $("#main-view");

      // console.log('Title:', response.results[4].title);
      // var title = response.results[4].title;
      // var pMovieTitle = $(".title-format").text("Movie Title: " + title);
      // movieDiv.append(pMovieTitle);

      // console.log('Vote Average:', response.results[4].vote_average);
      // var vote = response.results[0].vote_average;
      // var pVote = $(".rating-format").text("Vote Average: " + vote);
      // movieDiv.append(pVote);

      // // Storing the release date data
      // var releaseDate = response.results[4].release_date;
      // // Creating an element to have the release date displayed
      // var pOne = $(".year-format").text("Release date: " + releaseDate);
      // // Displaying the releaseDate
      // movieDiv.append(pOne);

      // // Storing the overview
      // var overview = response.results[4].overview;
      // // Creating an element to hold the overview
      // var pTwo = $(".plot-format").text("Overview: " + overview);
      // // Appending the plot
      // movieDiv.append(pTwo);

      // // Retrieving the URL for the image
      // // var imgURL = response.results[0].poster_path;
      // console.log('poster path: ', response.results[4].poster_path);
      // var imgURL = "https://image.tmdb.org/t/p/w500" + response.results[4].poster_path;
      // console.log(imgURL);
      // // Creating an element to hold the image
      // var image = $("poster-format").attr("src", imgURL);

      // // Appending the image
      // movieDiv.append(image);

      // $("#movie-input").val("");
      // $("#actor-input").val("");
      // $("#genre-input").val("");
      // $("#myear-input").val("");

      // //====================================End of results==================






      // // console.log(response.id);
      // // console.log('youtube: ' , response.results[1].key);

      // // var trailersDiv = $("#trailers-view");
      // // // Retrieving the trailer videos

      // // http://api.themoviedb.org/3/movie/157336?api_key=###&append_to_response=videos
      // // var trailerInfo = "https://api.themoviedb.org/3/movie/" + movieId + "/videos?api_key=88887032dc1d0d80dd7ccbd783133865";
      // // console.log(trailerInfo);

      // // console.log(results[0].key);

      // // console.log("Youtube Key: ", results[0].key);

      // // var video = $("<vid>").attr("src", trailer);
      // // trailersDiv.append(video);





    });

  })

});

