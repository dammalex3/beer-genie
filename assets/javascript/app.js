$(document).ready(function () {

    var antiCORS = 'https://cors-anywhere.herokuapp.com/';

    var foodQueryArray = ["chicken", "beef", "grains", "beans", "shellfish", "pork"];

    var beerList = [];
    var styleCount = 0;
    var numBeersToDisplay = 5;
    var totalStyles = 0;

    var getRecipes = function (num) {
        var query = "q=" + foodQueryArray[num];
        var foodQueryURL = antiCORS + "https://api.edamam.com/search?" + query + "&app_id=4149b34a&app_key=3f5a1c6c3c7f31eb7143f33b706fafab";
        console.log(foodQueryURL)
        $.ajax({
            url: foodQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var data = response.hits;
            console.log(data.length);
            for (var k = 0; k < data.length; k++) {
                console.log(data[k].recipe.url);
                console.log(data[k].recipe.ingredients);
                console.log(data[k].recipe.image);
            }
        });
    };

    //calls api and builds and array of beer objects
    function buildBeerArray (beerStyleID) {
        var beerStyleQueryURL = antiCORS + 'https://api.brewerydb.com/v2/beers?hasLabels=Y&styleId=' + beerStyleID + '&key=ca93fb5030f16f2b478658d317dc88a3';
        $.ajax({
            url: beerStyleQueryURL,
            method: "GET",
            success: function (response) {
                
                //loop through the api response and push each object to the array which contains all styles
                for (var i=0; i<response.data.length; i++) {
                    beerList.push(response.data[i]);
                }

                styleCount++;

                //once you are done with all styles in the list then pass the list to buildBeerTable to build the table
                if (styleCount === totalStyles) {
                    buildBeerTable(beerList);
                }

            }
        });
    }

    //picks random objects from the beer object array and gets values and builds table
    function buildBeerTable (beerObjectArray) {

            var beerDisplayCounter = 0;

            while (beerDisplayCounter < numBeersToDisplay) {
                var randomInt = Math.floor((Math.random() * beerObjectArray.length) + 0);
                console.log(randomInt);

                // get the values from the object
                var beerName = beerObjectArray[randomInt].nameDisplay;
                var beerDescription = beerObjectArray[randomInt].description;
                var beerABV = beerObjectArray[randomInt].abv;
                var beerPicURL = beerObjectArray[randomInt].labels.medium;
                            
                var beerPic = $("<img>");
                beerPic.attr("src", beerPicURL);

                // Create the new row
                var newRow = $("<tr>");
                var newTD = $("<td>");
                newTD.append(beerPic)
                newRow.append(newTD);
                newRow.append($("<td>").text(beerName));
                newRow.append($("<td>").text(beerABV));
                newRow.append($("<td>").text(beerDescription));

                $("#beer-table").append(newRow);

                beerDisplayCounter++;

            }


    }

    $('.styleCard').on('click', function () {

        num = parseInt($(this).attr('data-order'));
        // console.log("Your num is: " + num)
        // getRecipes(num);

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

        styleCount = 0;
        totalStyles = beerStylesArray.length;

        //loop through styles from the html and call buildBeerArray to make the api request for that style
        for (var i=0;i<beerStylesArray.length;i++) {
            buildBeerArray(beerStylesArray[i]);
        }

    })
});