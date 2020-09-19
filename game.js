var gamePattern = [];

var userClickedPattern = [];

var buttonColors = ["red", "yellow", "blue", "green"];

//Start Game

var started = false;
var level = 0;

document.addEventListener("keydown", function() {
  if (!started) {
    $("h1").html("Level " + level);
    nextSequence();
    started = true;
  }
});

//Next Sequence

function nextSequence() {

  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(175).fadeIn(175);

  var sound = new Audio("sounds/" + randomChosenColor + ".mp3");

  sound.play();

  level++;

  $("h1").html("Level " + level);

}

//On Click

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);

});

//Play Sounds

function playSound(name) {

  var clickedSound = new Audio("sounds/" + name + ".mp3");

  clickedSound.play();

}

//Press Animation

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//Check Answers

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {

    var gameOverSound = new Audio("sounds/wrong.mp3");

    gameOverSound.play();

    $("h1").text("Game Over, Press Any Key to Restart");

    $('body').addClass("game-over");

    setTimeout(function() {
      $('body').removeClass("game-over");
    }, 200);

    startOver();
  }
}

//Start over

function startOver(){
  level = 0;
  gamePattern = [];
  started=false;
}
