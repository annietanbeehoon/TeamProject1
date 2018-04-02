

// global variables 
//  will be held in app.js

// for now - using google api key here

//const ApiKey_googleMaps = "AIzaSyDSMDeXXQxaeLJ4ZGXuwSKAM3NHBP4ckTc";


// var Latitude;
// var Longitude;
var map;

var hasPromiseReturned = false;


function geoFindMe() {
    var output = $('#myMap2');
  
    if (!navigator.geolocation) {
        output.html("<p>Geolocation is not supported by your browser</p>");
        return;
    }

    function success(position) {
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        output.html('<h3>Google Map2 from function geoFindMe</h3> <p>Latitude is ' + lat + '° <br>Longitude is ' + lon + '°</p>');
        var img = new Image();
        img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + lat + "," + lon
            + "&zoom=13&size=300x300&sensor=false";
        output.append(img);        
    }

    function error() {
        output.html("Unable to retrieve your location");
    }

    output.html("<p>Locating…</p>");
    navigator.geolocation.getCurrentPosition(success, error);
    console.log(' bottom of geoFindMe');
}



function map1() {
    var output = $('#myMap1');

    var img = new Image();
    img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + Latitude + "," + Longitude
        + "&zoom=13&size=300x300&sensor=false";
        output.html('<h3>Google Map1 from function map1</h3>');
    output.append(img);
}


async function map4() {

    if (!hasPromiseReturned) {
        console.log("prom failed");
        $('#myMap4').append(' .. promise failed');
        return;
    }

    console.log('map4 aft promis check', Latitude, Longitude);
     
    src = "https://maps.googleapis.com/maps/api/js?key=" + ApiKey_googleMaps + "&callback=initMap";
    var options = {
        zoom: 14,
        center: { lat: Latitude, lng: Longitude }
    }
    var map = new google.maps.Map(document.getElementById('myMap4'), options);
    
    
    console.log(map);

    // add marker --parkingn lot marker
    //var iconBase = 'https://maps.google.com/mapfiles/kml/pal4/';
    // var marker = new google.maps.Marker({
    //     position: { lat: Latitude, lng: Longitude },
    //     map: map,
    //     icon: iconBase + 'icon28.png'
    // });

    var marker2 = new google.maps.Marker({
        position: { lat: Latitude, lng: Longitude },
        map: map
    });
}
//}



 async function getPosition() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

async function main_GetPosition() {
    var position = await getPosition();
    console.log(' main after promise, coords', position.coords);
    console.log(position);
    Latitude = position.coords.latitude;
    Longitude = position.coords.longitude;
    hasPromiseReturned = true;
    position = position;
    var map1loaded = await  map1( position);
    var map4loaded = await  map4( position);

    console.log('hasPromiseReturned', hasPromiseReturned , Latitude,Longitude);
       
}

// $(document).ready(function () {
//     //get geolocation
//     main_GetPosition();  //gets geo locatin and creaets  map1
//     geoFindMe();         //map2
//     //map4(); //<=== needs to be in main_GetPosition- because of promise //map4 
// });



