$(document).ready(function () {

    var antiCORS = 'https://cors-anywhere.herokuapp.com/';
    var recipeNumber = 0;
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

    var getRandomRecipe = function () {
        recipeNumber = Math.floor(Math.random() * 50);
    }
    var orderNumber = 0;
    var buttonCounter = 0;


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


        orderNumber = parseInt($(this).attr('data-order'));

        // This portion will move to a separate onclick that delegates to the html body, that way we can use an element we make when the beer API is called and we populate the table.


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

    });

    $('body').on('click', '.recipeButton', function () {

        // Find a way to make this not go again once you click it, possibly use remove and then add a different <td> onto the end

        getRandomRecipe();
        
        // This line keeps you from requesting a recipe each time you click, it will need t
        $(this).removeClass('recipeButton').addClass('recipeSpace');
        var rowNumber = parseInt($(this).attr('data-counter'));
        var recipeImageBox = $('<td>').addClass('recipeImage'+rowNumber);
        var recipeTimeBox = $('<td>').addClass('recipeTime'+rowNumber);
        $('.row'+rowNumber).append(recipeImageBox, recipeTimeBox);

        var query = "q=" + foodQueryArray[orderNumber];
        var foodQueryURL = antiCORS + "https://api.edamam.com/search?" + query + "&from=0&to=50&app_id=4149b34a&app_key=3f5a1c6c3c7f31eb7143f33b706fafab";

        console.log(foodQueryURL)

        $.ajax({
            url: foodQueryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            var data = response.hits;
            console.log(data.length);
            var recipeLink = data[recipeNumber].recipe.url;
                $('.recipeSpace').html('<a href="'+recipeLink+'" target="_blank">'+data[recipeNumber].recipe.label+'</a>').removeClass('recipeSpace');
                $('.recipeImage'+rowNumber).html('<img src="'+data[recipeNumber].recipe.image+'" alt="'+data[recipeNumber].recipe.label+' height="100" width="100">');
                if (data[recipeNumber].recipe.totalTime != "0"){
                    $('.recipeTime'+rowNumber).text('Approximate cook time: '+data[recipeNumber].recipe.totalTime+' minutes');
                } else {
                    $('.recipeTime'+rowNumber).text("Sorry, we're not sure how long this one will take");
                };
            console.log(data[recipeNumber].recipe.url);
            console.log(data[recipeNumber].recipe.ingredients);
            console.log(data[recipeNumber].recipe.image);
        });

    });
});