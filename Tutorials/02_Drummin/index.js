//drums
const drumButtons = document.querySelectorAll(".drum");

//event listener
drumButtons.forEach(button => {
  button.addEventListener("click", function () {
    const buttonLetter = this.textContent; //what letter was pressed
    playSound(buttonLetter);
    animateButton(buttonLetter);
  });
});

//keyboard event listener
document.addEventListener("keydown", function (event) {
  playSound(event.key);
  animateButton(event.key);
});

function playSound(key) {
  let sound;

  switch (key) {
    case "w":
      sound = new Audio("sounds/crash.mp3");
      break;
    case "a":
      sound = new Audio("sounds/kick-bass.mp3");
      break;
    case "s":
      sound = new Audio("sounds/snare.mp3");
      break;
    case "d":
      sound = new Audio("sounds/tom-1.mp3");
      break;
    case "j":
      sound = new Audio("sounds/tom-2.mp3");
      break;
    case "k":
      sound = new Audio("sounds/tom-3.mp3");
      break;
    case "l":
      sound = new Audio("sounds/tom-4.mp3");
      break;
    default:
      console.log(key);
      return;
  }

  sound.play();
}
