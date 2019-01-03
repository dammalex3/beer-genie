$(document).ready(function () {
    
    var antiCORS = 'https://cors-anywhere.herokuapp.com/';

    $('.styleCard').on('click', function () {
        
        //get the list of styles for that beer from the html
        var beerStyles = $(this).attr("data-style");

        //create an array of the list of styles
        var beerStylesArray = beerStyles.split(",");

        //create the shell of the table using Jquery
        $("#beer-list-div").empty();
        var beerTable = $("<table>");
        var beerTableHeader = $("<thead>");
        beerTable.attr('id', 'beer-table');
        $("#beer-list-div").append(beerTable);
        
        //loop through the array and call the brewery db api with each style to get a random beer of that style
        for (var i=0; i<beerStylesArray.length; i++) {

            var beerStyleQueryURL = antiCORS + 'https://api.brewerydb.com/v2/beer/random?styleId=' + beerStylesArray[i] + '&key=ca93fb5030f16f2b478658d317dc88a3';

            $.ajax({
                url: beerStyleQueryURL,
                method: "GET",
                success: function (response){
                    var beerID = response.data.id;
                    console.log(beerID);
                    var beerIDQueryURL = antiCORS + 'https://sandbox-api.brewerydb.com/v2/beers/?ids='+beerID+'&key=ca93fb5030f16f2b478658d317dc88a3';
                    $.ajax({
                        url: beerIDQueryURL,
                        method: "GET"
                    }).then(function (IDresponse) {
                        
                        // get the values from the api response
                        var beerName = IDresponse.data[0].nameDisplay;
                        var beerDescription = IDresponse.data[0].description;
                        var beerABV = IDresponse.data[0].abv;
                        var beerPicURL = IDresponse.data[0].labels.medium;

                        var beerPic = $("<img>");
                        beerPic.attr("src", beerPicURL);
                        // console.log(beerPic);
                        
                        // Create the new row
                        var newRow = $("<tr>");
                        var newTD = $("<td>");
                        newTD.append(beerPic)
                        newRow.append(newTD);
                        newRow.append($("<td>").text(beerName));
                        newRow.append($("<td>").text(beerABV));
                        newRow.append($("<td>").text(beerDescription));
    
                        $("#beer-table").append(newRow);
                        // $("#beer-list-div").append(beerPic);
    
                    });
                }
            });

        }        

    })
});