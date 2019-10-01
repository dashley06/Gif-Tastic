$( document ).ready(function() {

//arrary of string for the variable topics
var topics = ["Hawaii", "Disney World", "Paris", "London", "Aruba", "Jamaica", "Thailand", "China", "Texas", "New York", "Bahamas", "Brazil"];

//function to create buttons for each of the topics of the array
function travelButtonsCreate (){
    for (var t = 0; t < topics.length; t++){
//create new button element in HTML for each button that is created
         var a = $("<button>");
         a.addClass("cities btn btn-info");
         a.attr("data-city", topics[t]);
         a.text(topics[t]);
         $("#travelButtons").append(a);
    }
}


function findTheGifs(){
//assigning a variable for each on-click event for the buttons, with the attribute of data-city
    $("button.cities").on("click", function(event){
        event.preventDefault();
    var city = $(this).attr("data-city");
    //console.log(city);

//assigment of variable for query URL
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + city + "&limit=10&api_key=6eghI0eI6UK6Ox76gtgs2SZhojPlFgJA";

//AJAX call for API 
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function(response){
        var results = response.data;
        //console.log(results);
    
//clear the current div on the screen before adding new gifs
    $("#displayGifs").empty();

//create variables for the div for each of the ratings of the gifs
    for(var g = 0; g < results.length; g++){
        var gifDisplay = $("<div>");
        var rating = results[g].rating;
        var ratingDisplay = $("<p>").text("Rating:" + " " + rating);
        

//create image tags, set attributes to still and animated images
        var imageDisplay = $("<img>");
        imageDisplay.addClass("image-button");
        imageDisplay.attr("src", results[g].images.fixed_width_still.url);
        imageDisplay.attr("data-still", results[g].images.fixed_width_still.url);
        imageDisplay.attr("data-animate", results[g].images.fixed_width.url);
        imageDisplay.attr("data-state", "still");
        
//appending the images and ratings to DOM
        gifDisplay.prepend(ratingDisplay);
        gifDisplay.prepend(imageDisplay);
        $("#displayGifs").prepend(gifDisplay);

   //event listener for clicking on gifs to make them still or animated
$(".image-button").on("click", function(event){
    event.preventDefault();
   console.log("does this event listener work?"); 

//variables to determine the data-state of each gif
    var state = $(this).attr("data-state");
    var stillGif = $(this).attr("data-still");
    var moveGif= $(this).attr("data-animate");
        console.log(this);

//switch animate to stilll and still to animate
    if (state=== "still"){
        $(this).attr("src", moveGif);  
        $(this).attr("data-state", "animate");
        
    } else if (state==="animate") {
          $(this).attr("src", stillGif);  
        $(this).attr("data-state", "still");
    }

});
    }
});
});
}
findTheGifs();




//--------------------------------------------------------------------------------------------------------------
//USER INPUT
//user can input a city to add to the array
        $("#userButton").on("click", function(event){
            event.preventDefault();
            userControls();
        })

function userControls(){

//variable to hold value of the user input box, trim away white space
        var userChoice = $("#userInput").val().trim();
 
//push the value of user input box to the end of the topics array
        topics.push(userChoice);

//clear the buttons array to avoid duplicate buttons and clear the input box
        $("#travelButtons").empty();
        $("#userInput").val("");

//message on every click with timer to clear message from DOM
        $("#message").text("Thanks for adding a new destination!")
        timedText();       
        travelButtonsCreate();
        findTheGifs();
}
function timedText() {
    var clearMessage = $("#message")
    setTimeout(function(){ 
        clearMessage.empty(); }, 2000);
    }

travelButtonsCreate(); 
findTheGifs();

});