//Variables
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var inicio = false; //En caso de ya haber iniciado bandera para no resetaer
var nivel = 0;

$(document).keypress(function() {
  if (!inicio) {
    $("#level-title").text("Level " + nivel); //Cambiar el texto al nivel en que te encuentras
    nextSequence();
    inicio = true;
  }
});

function nextSequence() {
  userClickedPattern = []; //Se reinicia la variable

  nivel++;
  $("#level-title").text("Level " + nivel);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100); //Señala al jugador cual presionar

  playSound(randomChosenColor);
}

$(".btn").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor); //Mete al arreglo el id del botón presionado por el jugador

  //console.log(userClickedPattern);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1); //Revisar que el botón presionado sea el correcto en cada click
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("Success");
    //La verdad no sabía que hacía el operador === pero ya vi que es una comparación en la que debe ser
    //el mismo valor y el mismo tipo
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 700);
    }
  } else {
    //console.log("Wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over Press Any Key to Restart");

    startOver();
  }
}

//Reinicia el juego
function startOver() {
    nivel = 0;
    gamePattern = [];
    userClickedPattern = [];
    inicio = false;
  }

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
