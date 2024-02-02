// list of colors
var buttonColors = ["red", "blue", "green", "yellow"];

// array to hold colors from previous levels
var gamePattern = [];


// array of user choices
var userClickedPattern = [];
var level = 0;
// when the user clicks on one of the buttons, it pushes it to userClickedPattern (array)
$(".btn").on("click", function(){
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  // calls check answer to check the last element of the users clicks
  checkAnswer(userClickedPattern.length-1);
})


// generates random color, adds color to gamePattern array, flashes the button
function nextSequence () {
  
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level " + level);

  // create a random number between 0-3
  var randomNumber = Math.floor(Math.random() * 4);
  // use random number to generate a random color from the list of buttonColors
  var randomChosenColor = buttonColors[randomNumber];
  // push that color to the gamePattern (array)
  gamePattern.push(randomChosenColor);

  // flash animation
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  //sound was here (i think we remove it base on instructions)
  playSound(randomChosenColor);  
}




function playSound(name){

  // call back function to run audio after nextSequence()
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// animate the press of a button by using defined class in css
function animatePress(currentColor){
  $("#" + currentColor).addClass("pressed");

  // remove the class after 100ms
  setTimeout(function(){
    $("#" + currentColor).removeClass("pressed");
  },100);
}

// check to see if the game is started. 
// display the iterating title
$(document).keypress(function(){
  var started = false;
  if (!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
})





function checkAnswer(currentLevel){
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success")
    // if this is right, make sure the pattern is finished
    if (userClickedPattern.length === gamePattern.length){
      // call next sequence on 1000ms delay
      setTimeout(function(){
        nextSequence()}, 1000);
      console.log("nextSequence ran for the next time")

      
    }

  }else{
    console.log("wrong");
    playSound("wrong")

    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Press Any Key to Restart")

    startOver();
  }

  
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}