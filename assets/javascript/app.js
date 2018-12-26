$(document).ready(function () {
    
    var antiCORS = 'https://cors-anywhere.herokuapp.com/';
    var numBeerResults = 5;

    $('.styleCard').on('click', function () {
        
        //get the list of styles for that beer
        var beerStyles = $(this).attr("data-style");

        //create an array of the list of styles
        var beerStylesArray = beerStyles.split(",");

        //create the shell of the table using Jquery
        $("#beer-list-div").empty();
        var beerTable = $("<table>");
        beerTable.attr('id', 'beer-table');
        $("#beer-list-div").append(beerTable);
        
        //loop through the array and call the brewery db api with each style associated with the beer selected to get a random beer of that style
        for (var i=0; i<beerStylesArray.length; i++) {

            var beerQueryURL = antiCORS + 'https://api.brewerydb.com/v2/beer/random?styleId=' + beerStylesArray[i] + '&key=ca93fb5030f16f2b478658d317dc88a3';

            $.ajax({
                url: beerQueryURL,
                method: "GET"
            }).then(function (response) {
                console.log(JSON.stringify(response));
                
                //get the values from the api response
                var beerName = response.data.nameDisplay;
                var beerStyle = response.data.style.shortName;
                var beerABV = response.data.abv;
                
                // Create the new row
                var newRow = $("<tr>").append(
                    $("<td>").text(beerName),
                    $("<td>").text(beerStyle),
                    $("<td>").text(beerABV),
                );

                $("#beer-table").append(newRow);
    
            })


        }
            // Here is where the ajax call for the brewerydb api will go.
            // run a get with a query for style using the style variable we grabbed from the on click
            // next fetch data from the response object to print into a table made by jquery



    })
});