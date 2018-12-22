$(document).ready(function () {
    var antiCORS = 'https://cors-anywhere.herokuapp.com/';

    $('.styleCard').on('click', function () {
        
        var style = $(this).attr('data-style');
        style.toLowerCase().trim();
        console.log(style);
        var beerQueryURL = antiCORS+'https://api.brewerydb.com/v2/search/style?q='+style

            // Here is where the ajax call for the brewerydb api will go.
            // run a get with a query for style using the style variable we grabbed from the on click
            // next fetch data from the response object to print into a table made by jquery


        // $.ajax({
        //     url: beerQueryURL,
        //     method: "GET"
        // }).then(function (response) {
        //     console.log(response);
        //     var data = response.path.to.data;

            // Here we create a table with Jquery,  Inside the for loop below we will append rows to the table 
            // Here is the for loop, this is going to fetch the  
        //     for (var k = 0; k < data.length; k++) {
        //         console.log(data.name);
        //         console.log(data.details.abv);
        //         console.log(data.details.ibus);
        //         console.log("Ingredient Pair")
        //     };
        // })



    })
});