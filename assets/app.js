//arrary of string for the variable topics
var topics = ["Hawaii", "Disney World", "Paris", "London", "San Diego", "Jamaica", "Thailand", "China", "Texas", "New York", "Bahamas", "Brazil", "Carnival Cruise"];

//function to create buttons for each of the topic strings of the array
function travelButtonsCreate (){
    for (var t = 0; t < topics.length; t++){
         var a = $("<button>");
         a.addClass("city");
         a.attr("data-city", topics[t]);
         a.text(topics[t]);
         $("#travelButtons").prepend(a);
    }
}
travelButtonsCreate();

//assigning variable for each on-click events for buttons with the attribute of data-city
$("button").on("click", function(){
    var city = $(this).attr("data-city");
    
//assigment of variable for query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&limit=10&api_key=6eghI0eI6UK6Ox76gtgs2SZhojPlFgJA";

//AJAX call for API 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var results = response.data;
        console.log(results);
    
    //clear the current div on the screen before adding new gifs
    $("#displayGifs").empty();

    //create variables for the div for each of the the gif images and ratings text, with each button on-click event
    for(var g = 0; g < results.length; g++){
        var gifDisplay = $("<div>");
        var rating = results[g].rating;
        var ratingDisplay = $("<p>").text("Rating:" + " " + rating);
        var imageDisplay = $("<img>");

        imageDisplay.attr("src", results[g].images.fixed_height_still.url);
        gifDisplay.prepend(imageDisplay);
        gifDisplay.prepend(ratingDisplay);
        $("#displayGifs").prepend(gifDisplay);
    }
});
});

