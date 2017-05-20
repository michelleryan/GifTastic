//console.log("testing");

// var topic; 
// var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + topic;

$(document).ready(function (){

//create an initial list of topics

var topics = ["NFL Football", "Touchdown", "Coin Toss", "Touchdown Dance", "Blind Side", "Blitz"]; 
var apiKey = "&api_key=dc6zaTOxFJmzC&tag=";

addButtons();
//on button click display 10 gifs in the #gifs area

//$(".fbTopic").on("click", function(e){
$(document).on("click", ".fbTopic", function(){
	console.log("button clicked");
	console.log($(this).attr("data-name"));
	
	//get the data-name of the button pressed
	var topicCall = $(this).attr("data-name");

	//create the url to make the giphy call, limit to 10 gifs
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topicCall + apiKey + "&limit=10";

	ajaxCall(queryURL);

	
})

// //pause and start gifs when image is clicked
// //add function to animate gif when it is clicked
// $(".myGif").on("click", function() {

// 	console.log("I've clicked the picture");
// 	console.log(topicImage);
// 	var state = $(topicImage).attr("data-state");
// 	console.log(state);
// 	if(state === "still") {
// 		$(topicImage).attr("data-state", "animate");
// 		$(topicImage).attr("src", $(topicImage).attr("data-animate"));
// 	} else {
// 		$(topicImage).attr("data-state", "still");
// 		$(topicImage).attr("src", $(topicImage).attr("data-still"));
// 	}


// });

//add a new topic when the submit button is clicked

$("#add-topic").on("click", function(e) {
//prevent form from submit
e.preventDefault();
console.log(e);
//empty buttons so they do not repeat

// get the user topic input and to the array and create a new button
var newTopic = $("#topic").val().trim();
topics.push(newTopic);

// create the arrray of buttons 
addButtons();
});

//start and stop the image when the user clicks on one
$(document).on("click", ".searchTopic",function(){
	console.log("I've clicked this picture!");
	var state = $(this).attr("data-state");
	console.log(state);
	if(state === "still") {
		$(this).attr("data-state", "animated");
		$(this).attr("src", $(this).attr("data-animated"));
	} else {
		$(this).attr("data-state", "still");
		$(this).attr("src", $(this).attr("data-still"));
	}
});


//function to add buttons 
function addButtons() {
	//make sure to empty the buttons area so it does not repeat the buttons on the page
	$("#topic-buttons").empty();

	//loop through the array of topics and dynamically create buttons
	//use bootstrap style of type="button" class="btn btn-primary"
	for(var i=0; i<topics.length; i++) {
		var a = $("<button>");
		a.addClass("btn btn-primary fbTopic");
		a.attr("data-name", topics[i]);
		a.text(topics[i]);

		//append button to topic-buttons div
		$("#topic-buttons").append(a);
	}
}

//ajax call function

function ajaxCall(queryURL) {
	$.ajax({
		url:queryURL,
		method: "GET"
	}).done(function(response){

		var results = response.data

		//10 gifs will be returned, create the divs for each, add the rating and display the static gifs
		for(var r=0; r<results.length; r++) {
			var gifDiv = $("<div>");
			gifDiv.addClass("gif");
			var p = $("<p>");
			p.html("Rating: " + results[r].rating);
			var topicImage = $("<img>");
			//topicImage.attr("src", results[r].images.fixed_height_still.url);
			var animated = results[r].images.fixed_height.url
			var still = results[r].images.fixed_height_still.url
			// topicImage.attr({"src": results[r].images.fixed_height_still.url, "data-state": 'still', 
			// 	"data-animate": results[r].images.fixed_height_downsampled.url, 
			// 	"data-still":results[r].images.fixed_height_still.url, 
			// 	"class": 'myGif'});			
			topicImage.attr({"src": still, "data-still": still, "data-animated": animated, "data-state": 'still'});
			topicImage.addClass("searchTopic");
			gifDiv.append(p);
			gifDiv.append(topicImage);
			//topicImage.appendTo(gifDiv);

			$("#gifs").prepend(gifDiv);
			// console.log(gifDiv);


		}






				
	        
	})
	

}
	

	//

});