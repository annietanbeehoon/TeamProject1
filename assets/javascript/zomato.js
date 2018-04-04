


function showFoodMap(alat, alon) {
    var arrRest = [];

    console.log(" top zomato", alat, alon);

    event.preventDefault();
    // Zomato API documentation : https://developers.zomato.com/documentation#/        

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
            lat: alat,
            lon: alon
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

            var oRest = {
                name: element.restaurant.name,
                address: element.restaurant.location.address,
                lat: element.restaurant.location.latitude,
                lng: element.restaurant.location.longitude
                //lat: element.restaurant.location.latitude,
                //lon: element.restaurant.location.longitude
            }
            arrRest.push(oRest);
        }

        restMaps(arrRest);
        // Logging the URL so we have access to it for troubleshooting
        console.log("---------------\nURL: " + queryURL + "\n---------------");
        return;
    })

}

async function restMaps(arrRestaurants) {

    console.log(' restaurnat maps', arrRestaurants);

    // if (!hasPromiseReturned) {
    //     console.log("prom failed");
    //     $('#myMap4').append(' .. promise failed');
    //     return;
    // }

     console.log(' arrRestaurants[0].oRest.lat', arrRestaurants[0].lat);

    src = "https://maps.googleapis.com/maps/api/js?key=" + ApiKey_googleMaps + "&callback=initMap";
    var options = {
        zoom: 14,
        center: { lat: arrRestaurants[0].lat , lng: arrRestaurants[0].lon }
    }
    var map = new google.maps.Map($('#openModal2'), options);


    console.log(map);

    // add marker --parkingn lot marker
    // var iconBase = 'https://maps.google.com/mapfiles/kml/pal4/';
    // var marker = new google.maps.Marker({
    //     position: { lat: Latitude, lng: Longitude },
    //     map: map,
    //     icon: iconBase + 'icon28.png'
    // });

    for (let i = 0; i < array.length; i++) {
        const element = arrRestaurants[i];
        var markers = new google.maps.Marker({
            position: { lat: element.oRest.lat, lng: element.oRest.lon },
            title: element.oRest.address,
            map: map
        });

    }

    // var marker2 = new google.maps.Marker({
    //     position: { lat: Latitude, lng: Longitude },
    //     title:
    //     map: map
    // });
}



