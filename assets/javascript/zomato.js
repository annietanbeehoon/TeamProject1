


function showFoodMap(alat, alon) {
    var arrRest = [];

    // console.log(" top zomato", alat, alon);

    event.preventDefault();
    // Zomato API documentation : https://developers.zomato.com/documentation#/        

    //var queryURL = "http://cors-anywhere.herokuapp.com/https://developers.zomato.com/api/v2.1/geocode";
    var queryURL = corsHead + "https://developers.zomato.com/api/v2.1/geocode";
    var zomatoApiKey = "7e961b35d77eea45b512e4de6cc50dc3";

    $.ajax({
        url: queryURL,
        method: 'GET',
        dataType: 'json',
        headers: {
            'user-key': zomatoApiKey
        },
        data: {
            lat: alat,
            lon: alon
        },

    }).then(function (response) {
        //Call display results method once ajax request has been made. 
        // console.log(response);
        // console.log("in ajax", response.nearby_restaurants.length);
        // console.log("in ajax", response.nearby_restaurants[1].restaurant.name);
        var showR = $('.showRestaurants');


        //writeRest(response);
        for (let i = 0; i < response.nearby_restaurants.length; i++) {
            const element = response.nearby_restaurants[i];
            var div = $('<div>');

            var msg = '<br><br><br>' + ' Restaurant: ' + element.restaurant.name + ", Located at: " + element.restaurant.location.address;
            div.html(msg);
            showR.append(div);

            //build object with needed properties, then push to array- to
            //be passed into gogglemap rtne
            var oRest = {
                name: element.restaurant.name,
                address: element.restaurant.location.address,
                lat: element.restaurant.location.latitude,
                lon: element.restaurant.location.longitude
            }
            arrRest.push(oRest);
        }

        restMaps(arrRest);
        // Logging the URL so we have access to it for troubleshooting
        // console.log("---------------\nURL: " + queryURL + "\n---------------");
        return;
    })

}

function restMaps(arrRestaurants) {

    console.log(' restaurant maps', arrRestaurants);
    console.log(arrRestaurants[0].lat, arrRestaurants[0].lon);
    var _lat = parseFloat(arrRestaurants[0].lat);
    var _lon = parseFloat(arrRestaurants[0].lon);
    console.log('_lat,lon', _lat, _lon);


    // src = "https://maps.googleapis.com/maps/api/js?key=" + ApiKey_googleMaps + "&callback=initMap";
    var options = {
        zoom: 14,
        center: { lat: _lat, lng: _lon }
    }

    // var gglemap = $('#googlemap');
    // console.log( gglemap);
    //var map = new google.maps.Map(document.getElementById('googlemap'), options);
    var map = new google.maps.Map(document.getElementById('gmapsjohn'), options);

    console.log(map);

    for (let i = 0; i < arrRestaurants.length; i++) {
        const element = arrRestaurants[i];
        _lat = parseFloat(element.lat);
        _lon = parseFloat(element.lon);
        var marker = new google.maps.Marker({
            position: { lat: _lat, lng: _lon }, //{ lat: element.lat, lng: element.lon },
            title: element.name + ", " + element.address,
            map: map
        });

    }

}



