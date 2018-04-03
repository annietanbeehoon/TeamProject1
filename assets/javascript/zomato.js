$(document).ready(function () {

    $('.restsrch').on("click", function (event) {
        event.preventDefault();
        // Zomato API documentation : https://developers.zomato.com/documentation#/
        
        // test longitude and lat -- using John's house
        var latitude = 40.5953;
        var longitude = -74.6173;
        var queryURL = "http://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/geocode";
        var zomatoApiKey = "7e961b35d77eea45b512e4de6cc50dc3";

        console.log(zomatoApiKey);

        $.ajax({
            url: queryURL,
            method: 'GET',
            dataType: 'json',
            headers: {
                'user-key': zomatoApiKey
            },
            data: {
                lat: latitude,
                lon: longitude
            },

        }).then(function (response) {
            //Call display results method once ajax request has been made. 
            console.log(response);
            console.log("in ajax", response.nearby_restaurants.length);
            console.log("in ajax", response.nearby_restaurants[1].restaurant.name);
            var showR = $('.showRestaurants');


            //writeRest(response);
            for (let i = 0; i < response.nearby_restaurants.length; i++) {
                const element = response.nearby_restaurants[i];
                var div = $('<div>');

                var msg = '<br><br><br>' + ' Restaurant: ' + element.restaurant.name + ", Located at: " + element.restaurant.location.address;
                div.html(msg);
                showR.append(div);

            }

            //.nearby_restaurants["0"].restaurant.location.address

            // Logging the URL so we have access to it for troubleshooting
            console.log("---------------\nURL: " + queryURL + "\n---------------");
        })

    });
});

function writeRest(response) {
    var myRests = $('.showRestaurants');
    console.log('writeRest(response)', response.length);
}