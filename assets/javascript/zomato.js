$(document).ready(function () {
        
$('.btn btn-primary').on("click", function (event) {
        event.preventDefault();
        // Zomato API documentation : https://developers.zomato.com/documentation#/
        //https://developers.zomato.com/api/v2.1/geocode?lat=40.5953&lon=-74.6173

        // test longitude and lat -- using John's house
        var latitude = 40.5953;
        var longitude = -74.6173;
        var url = "https://developers.zomato.com/api/"
        var zomatoApiKey = "7e961b35d77eea45b512e4de6cc50dc3";

        console.log(zomatoApiKey);

        $.ajax({
            url: url + "/geocode",
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

            // Logging the URL so we have access to it for troubleshooting
            console.log("---------------\nURL: " + queryURL + "\n---------------");
        })
    
    });
});
