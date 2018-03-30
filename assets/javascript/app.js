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
    var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=88887032dc1d0d80dd7ccbd783133865&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&with_cast&page=1append_to_response=overview,release_date,&query=";
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


      var movieId = JSON.parse(response.results[0].id);

      // Creating a div to hold the movie
      var movieDiv = $("#movies-view");

      //var movieTitle = response.results[0].title;
      //var pMovieTitle = $("<p>").text("Movie Title: " + title);
      //movieDiv.append(pMovieTitle);
      console.log('title:' , response.results[0].title);
      var title = response.results[0].title;
      var pMovieTitle = $("<p>").text("Movie Title: "+ title);
      movieDiv.append(pMovieTitle);

      // Storing the release date data
      var releaseDate = response.results[0].release_date;

      // Creating an element to have the release date displayed
      var pOne = $("<p>").text("Release date: " + releaseDate);

      // Displaying the releaseDate
      movieDiv.append(pOne);

      // Storing the overview
      var overview = response.results[0].overview;

      // Creating an element to hold the overview
      var pTwo = $("<p>").text("Overview: " + overview);

      // Appending the plot
      movieDiv.append(pTwo);

      
      // Retrieving the URL for the image
      // var imgURL = response.results[0].poster_path;
      console.log('poster path: ', response.results[0].poster_path);
      var imgURL = "https://image.tmdb.org/t/p/w500" + response.results[0].poster_path;
      console.log(imgURL);
      // Creating an element to hold the image
      var image = $("<img>").attr("src", imgURL);

      // Appending the image
      movieDiv.append(image);



    });
  })
});

