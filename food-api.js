var foodQueryArray = ["chicken", "beef", "grains", "beans", "shellfish", "pork"]
var counter = 0;
var getRecipes = function (num) {
    var query = "q=" + foodQueryArray[num];
    var foodQueryURL = "https://sandbox-api.brewerydb.com/v2/search?" + query + "&app_id=4149b34a&app_key=3f5a1c6c3c7f31eb7143f33b706fafab";
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

getRecipes(2);