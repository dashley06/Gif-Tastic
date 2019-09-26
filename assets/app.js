$( document ).ready(function() {

//arrary of string for the variable topics
var topics = ["Hawaii", "Disney World", "Paris", "London", "San Diego", "Jamaica", "Thailand", "China", "Texas", "New York", "Bahamas", "Brazil", "Carnival Cruise"];

//function to create buttons for each of the topic strings of the array
function travelButtonsCreate (){
    for (var t = 0; t < topics.length; t++){
        //create new button element in HTML for each string
         var a = $("<button>");
         a.addClass("cities");
         a.attr("data-city", topics[t]);
         a.text(topics[t]);
         $("#travelButtons").append(a);
    }
}
travelButtonsCreate();

function findTheGifs(){
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

        gifDisplay.prepend(ratingDisplay);
        gifDisplay.prepend(imageDisplay);
        $("#displayGifs").prepend(gifDisplay);
    }
});
});
}
findTheGifs();

//function to allow for clicking on images that will toggle from animated to still
function animateGif(){
 
    //how to assign "this" to each gif
    var state = $(this).attr("data-state");
        //!!!!!!!!!!!!!!! console.log(this);

//switch animate to stilll and still to animate
    if (state==="still"){
        $(this).attr("data-still", "animate");
        $(this).attr("src", $(this).attr("data-animate"));  
    } else {
        $(this).attr("data-animate", "still");
        $(this).attr("src", $(this).attr("data-still"));  
    }
}
animateGif();

//--------------------------------------------------------------------------------------------------------------
//USER INPUT
//user can input a city to add to the array
        $("#userButton").on("click", function(event){
            event.preventDefault();
            userControls();

function userControls(){
    
//variable to hold value of the user input box, trim away white space
        var userChoice = $("#userInput").val().trim();

//add value of user input box to the end of the topics array
        topics.push(userChoice);
        //console.log(topics);
        $("#travelButtons").empty();


//assign the same attribute to the user's guess from the input box
        userChoice = $(this).attr("data-city");   
}

travelButtonsCreate(); 
findTheGifs();
   
})


});