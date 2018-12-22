$(document).ready(function () {
    var antiCORS = 'https://cors-anywhere.herokuapp.com/';

    $('.styleCard').on('click', function () {
        console.log(style);
        var beerQueryURL = antiCORS+'https://api.brewerydb.com/v2/beer/random?key=4b70afc53eb299a79abe53c0e1a2f954'

            // Here is where the ajax call for the brewerydb api will go.
            // run a get with a query for style using the style variable we grabbed from the on click
            // next fetch data from the response object to print into a table made by jquery

        $.ajax({
            url: beerQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var data = response.data;

            // Here we create a table with Jquery,  Inside the for loop below we will append rows to the table 
            // Here is the for loop, this is going to fetch the  

            // This ajax call now grabs a random beer, from this we can tack on another ajax call to get more specific info about the beer.
            // From there we can make a table of recommended ingredients and recipes

            for (var k = 0; k < data.length; k++) {
                console.log(data[k]);
                console.log("Ingredient Pair")
            };
        })



    })
});