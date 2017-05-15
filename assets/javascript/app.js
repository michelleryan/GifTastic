console.log("testing");

// var topic; 
// var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + topic;

$(document).ready(function (){

var topics = ["movies", "books", "football"]; 
var queryURL = "http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag=" + topics[2];

//ajax call

$.ajax({
	url:queryURL,
	method: "GET"
}).done(function(response){
	var imageUrl = response.data.image_original_url;

        //
        var topicImage = $("<img>");

        //
        topicImage.attr("src", imageUrl);
        
        //
        $(".main-content").prepend(topicImage);
})

});