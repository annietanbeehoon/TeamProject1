// CLICK HANDLERS
// ==========================================================

// .on("click") function associated with the Search Button
$(".pure-controls").on("click", function (event) {
  // This line allows us to take advantage of the HTML "submit" property
  // This way we can hit enter on the keyboard and it registers the search
  // (in addition to clicks). Prevents the page from reloading on form submit.
  event.preventDefault();

  // queryURL is the url we'll use to query the API
  var queryURL = "https://api.themoviedb.org/3/search/movie?api_key=88887032dc1d0d80dd7ccbd783133865&append_to_response=overview,release_date,&query=";
  //https://api.themoviedb.org/3/movie/157336?api_key={api_key}&append_to_response=videos,images
  // grab text the user typed into the search input, add as parameter to url
  //
  //var movieInput = $("#input[type=text]").val();
  //console.log(movieInput);
  //movieInput = movieInput.replace(/ /g, '+');
  // var movie = $("#movie-input").val().trim();
  // var actor = $("#actor").val().trim();
  // var genre = $("#genre").val().trim();
  // var year = $("#year").val().trim();
  // var movie = movie.replace(/ /g, '+');
  // var actor = actor.replace(/ /g, '+');
  // var genre = genre.replace(/ /g, '+');
  // var year = year.replace(/ /g, '+');

  var movie = $("#movie-input").val().trim();
  console.log(movie);

  console.log(movie);
  queryURL += movie;

  // Logging the URL so we have access to it for troubleshooting
  console.log("---------------\nURL: " + queryURL + "\n---------------");





  // make the AJAX request to the API - GETs the JSON data at the queryURL.
  // the data then gets passed as an argument to the function
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {

    console.log(response);
    //$("#movies-view").text(JSON.stringify(response));

    //var movie = $(this).attr("data-name");

    // Creating a div to hold the movie
    var movieDiv = $("<div class='movie'>");

    // Storing the imagesrelease date data
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
    var imgURL = response.results[0].poster_path;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);
  });
})
