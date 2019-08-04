
  var topics = ["Bunny", "Pig", "Duck", "Dog",
  "Bird", "Bull", "Tiger", "Cat", "Lion",
  "Zebra", "Fox", "Hamster", "Eagle"]

renderButtons();

function renderButtons() {
 console.log("rendering buttons");
    
 $("#buttons").empty();
     
 for (var i = 0; i < topics.length; i++) {
       
   var a = $("<button class='btn-primary'>");
       
   a.addClass("animalChar");
      
   a.attr("data-animal", topics[i]);
      
   a.text(topics[i]);
       
   $("#buttons").append(a);
 }
};

$(document).ready(function(){

$("#buttons").on("click", ".animalChar", function() {
 console.log("button has clicked");
   
 var animalChar = $(this).attr("data-animal");
   
 var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
 animalChar + "&api_key=dc6zaTOxFJmzC&limit=10";
   //
 $.ajax({
     url: queryURL,
     method: "GET"
 })
     
   .done(function(response) {
  
     var results = response.data;
   
     for (var i = 0; i < results.length; i++) {
   
       if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
  
         var gifDiv = $("<div class='gifBucket'>");
    
         var rating = results[i].rating;
      
         var p = $("<p>").text("Rating: " + rating);
     
         var animalImage = $("<img>");
       
         animalImage.attr("class", "gif");
         animalImage.attr("src", results[i].images.fixed_height_still.url);
         animalImage.attr("data-still", results[i].images.fixed_height_still.url);
         animalImage.attr("data-animate", results[i].images.fixed_height.url);
         animalImage.attr("data-state", "still");
      
         gifDiv.append(animalImage);
         gifDiv.append(p);

         $("#gifs-are-here").prepend(gifDiv);
       }
     }  
   });     
 });

 $(document).on("click", ".gif", function() {
  
   var state = $(this).attr("data-state");
   console.log("gif clicked state=" + state);
 
   if (state === "still") {
     $(this).attr("src", $(this).attr("data-animate"));
     $(this).attr("data-state", "animate");
   } else {
     $(this).attr("src", $(this).attr("data-still"));
     $(this).attr("data-state", "still");
   };
 });

 $("#animalAdder").on("click", function() {
   console.log("Submit pressed");
   
   var newAnimal = $("#addAnimal").val();
 
   
   if (newAnimal !== "") { 
     topics.push(newAnimal);

     renderButtons();
   };
 });  
});