var myGamePiece = new Array();
var happySrc = "images/smiley.gif";
var sadSrc = "images/angry.gif";
var maxDist = 5;

var myGameArea = {
  timer: 0,
  running: true,
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.width = 800;
    this.canvas.height = 600;
    this.context = this.canvas.getContext("2d");
    this.context.font = "12px serif";
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    setInterval(updateGameArea, 20);
  },
  clear: function () {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  },
};

function flatlander(width, height, x, y, isHappy) {
  this.image = new Image();
  this.isHappy = isHappy;
  this.happyPoints = isHappy ? 1 : -1; // Initialize happyPoints based on happiness
  this.image.src = isHappy ? happySrc : sadSrc;
  this.width = width;
  this.height = height;
  this.speedX = (Math.random() * 100) % 6;
  this.speedY = (Math.random() * 100) % 6;
  this.x = x;
  this.y = y;

  this.update = function () {
    ctx = myGameArea.context;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.fillText(this.happyPoints, this.x, this.y + 5);
  };

  this.newPos = function (canvasWidth, canvasHeight) {
    this.x += this.speedX;
    this.y += this.speedY;

    // Bounce back when reaching the edges
    if (this.x < 0 || this.x + this.width > canvasWidth) {
      this.speedX = -this.speedX;
    }
    if (this.y < 0 || this.y + this.height > canvasHeight) {
      this.speedY = -this.speedY;
    }
  };

  this.moreHappy = function () {
    this.happyPoints++;
    if (this.happyPoints > 1) {
      this.isHappy = true;
      this.image.src = happySrc;
    }
  };

  this.lessHappy = function () {
    this.happyPoints--;
    if (this.happyPoints < 0) {
      this.isHappy = false;
      this.happyPoints = -1; // Set happyPoints to -1 for sad individuals
      this.image.src = sadSrc;
    }
  };

  this.checkSurroundings = function (other) {
    var x = Math.pow(this.x - other.x, 2);
    var y = Math.pow(this.y - other.y, 2);
    return Math.sqrt(x + y);
  };
}

function startGame() {
  var n = parseInt(document.getElementById("num").value);
  var m = parseInt(document.getElementById("sad").value);
  
  if (m > n) {
    window.alert("Cannot have more sad individuals than total individuals.");
    return;
  }

  myGamePiece = []; // Reset the game pieces
  var sadCount = 0;

  for (var i = 0; i < n; i++) {
    var nX = Math.random() * myGameArea.canvas.width;
    var nY = Math.random() * myGameArea.canvas.height;
    var isHappy = sadCount < m ? false : true; // Determine if the individual is happy or sad
    if (!isHappy) sadCount++;
    var gamePiece = new flatlander(30, 30, nX, nY, isHappy);
    myGamePiece.push(gamePiece);
  }
  myGameArea.start();
}

function updateGameArea() {
  if (myGameArea.running) {
    myGameArea.clear();
    for (var i = 0; i < myGamePiece.length; i++) {
      myGamePiece[i].newPos(myGameArea.canvas.width, myGameArea.canvas.height);
      myGamePiece[i].update();
    }
    var tmpFocus, d;
    var happy = 0;
    var sad = 0;
    for (var i = 0; i < myGamePiece.length; i++) {
      tmpFocus = myGamePiece[i];
      for (var j = 0; j < myGamePiece.length; j++) {
        if (i != j) {
          d = tmpFocus.checkSurroundings(myGamePiece[j]);
          if (d < maxDist) {
            if (tmpFocus.isHappy && !myGamePiece[j].isHappy) {
              tmpFocus.lessHappy(); // Happy individual becomes less happy
            } else if (!tmpFocus.isHappy && myGamePiece[j].isHappy) {
              myGamePiece[j].lessHappy(); // Sad individual makes happy individual sad
            } else if (tmpFocus.isHappy && myGamePiece[j].isHappy) {
              tmpFocus.moreHappy(); // Happy individual becomes even happier
              myGamePiece[j].moreHappy();
            } else if (!tmpFocus.isHappy && !myGamePiece[j].isHappy) {
              tmpFocus.lessHappy(); // Sad individual becomes even sadder
              myGamePiece[j].lessHappy();
            }
          }
        }
      }
      if (tmpFocus.isHappy) happy++;
      else sad++;
    }
    document.getElementById("happyIndividuals").textContent = "Happy: " + happy;
    document.getElementById("sadIndividuals").textContent = "Sad: " + sad;
  } else return;
  if (happy === 0 || sad === 0) {
    var msg;
    myGameArea.running = false;
    if (happy == 0) msg = "Absolute sadness.... SAD!";
    else msg = "Absolute happiness reached.... Hurray!!";
    document.getElementById("timer").textContent =
      "Time: " + myGameArea.timer + "       " + msg;
  } else {
    document.getElementById("timer").textContent = "Time: " + myGameArea.timer;
  }
}