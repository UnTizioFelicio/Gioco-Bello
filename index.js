var Game_Started = false;
var colors = [];
var clicks = 0;
var level = 1;


$(document).keypress(function() {
  if (Game_Started === false) {
    color = NextColor();
    $("h1").text("Level " + level);
    Game_Started = true;
    Pressed(color);
    colors.push(color);
  }
});

$(".btn").click(function() {
  Pressed(this.id)
  if (this.id === colors[clicks]) {
    clicks++;
    if (clicks === colors.length) {
      level++;
      clicks = 0;
      setTimeout(function(){
        color = NextColor();
        Pressed(color);
        colors.push(color);
        $("h1").text("Level " + level);
      },1000);
    }
  } else {
    GameOver();
  }
});


function NextColor() {
  choices = ["green", "red", "blue", "yellow"];
  var RandomNumber = Math.floor(Math.random() * choices.length);
  return choices[RandomNumber];
}

function Pressed(id) {
  $("#" + id).addClass("pressed");
  setTimeout(function(){
    $("#" + id).removeClass("pressed");
  }, 150);
  new Audio("sounds/" + id + ".mp3").play();
}

function GameOver() {
  new Audio("sounds/wrong.mp3").play();
  $("body").addClass("game-over");
  setTimeout(function() {
    $("body").removeClass("game-over");
  },200);
  $("h1").text("Game Over, Press Any Key to Restart");
  Game_Started = false;
  level = 1;
  clicks = 0;
  colors = [];
}
