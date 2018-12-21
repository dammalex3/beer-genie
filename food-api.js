var foodQueryArray = ["chicken", "beef", "grains", "beans", "shellfish", "pork"]
var foodQueryURL = "https://api.edamam.com/search?" + query + "&app_id=4149b34a&app_key=3f5a1c6c3c7f31eb7143f33b706fafab";
var app_ID = "4149b34a";
var app_key = "3f5a1c6c3c7f31eb7143f33b706fafab";
var query = "q=" + foodQueryArray;

var getRecipes = function () {
    $.ajax({
        url: foodQueryURL,
        method: "GET"
    }).then(function (response) {

    });
}