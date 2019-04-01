var canvas = document.querySelector(".flappy-celine");
var ctx = canvas.getContext("2d");

var celineImg = new Image();
celineImg.src = "./images/celine.jpeg";
celineImg.onload = function() {
  drawCeline();
};

var celine = {
  x: 0,
  y: 225,
  width: 100,
  height: 100,
  isCrashed: false
};

function drawCeline() {
  ctx.drawImage(celineImg, celine.x, celine.y, celine.width, celine.height);
}

class Pipe {
  constructor(pipeX, pipeY, pipeWidth, pipeHeigth) {
    this.x = pipeX;
    this.y = pipeY;
    this.width = pipeWidth;
    this.height = pipeHeigth;
    this.isCrashed = false;
  }

  drawPipe() {
    if (this.x < 0) {
      this.x = 1200;
      this.y = Math.floor(Math.random() * 600);
    }
    if (!celine.isCrashed) {
      this.x -= 2;
      if (this.x < -45) {
        this.x = 1200;
      }
    }
    if (this.isCrashed) {
      ctx.fillStyle = "tomato";
    } else {
      ctx.fillStyle = "#057e04";
    }

    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

var pipeYRandom = Math.floor(Math.random() * 600);

// var pipeXRandom = Math.floor(Math.random() * 600);
// var pipe1 = new Pipe(650, 0, 30, 250);
// var pipeRandom = new Pipe(1200, Math.floor(Math.random() * 600), 30, 250);
var allPipes = [
  new Pipe(650, pipeYRandom, 30, 250),
  new Pipe(800, pipeYRandom, 30, 200),
  new Pipe(970, pipeYRandom, 30, 250),
  new Pipe(1120, pipeYRandom, 45, 200),
  new Pipe(1270, pipeYRandom, 45, 200),
  new Pipe(1420, pipeYRandom, 45, 200)
];

drawingLoop();
function drawingLoop() {
  ctx.clearRect(0, 0, 1600, 776.438);
  drawCeline();
  allPipes.forEach(function(onePipe) {
    onePipe.drawPipe();
  });
  checkCollision();
  requestAnimationFrame(function() {
    drawingLoop();
  });
}

document.onkeydown = function(event) {
  if (event.keyCode == 32) {
    event.preventDefault();
    location.reload();
  }
  if (celine.isCrashed) {
    return;
  }

  switch (event.keyCode) {
    case 68: //D
      event.preventDefault();
      celine.x += 20;
      break;
    case 83: //S
      event.preventDefault();
      celine.y += 20;
      break;
    case 65: //A
      event.preventDefault();
      celine.x -= 20;
      break;
    case 87: //W
      event.preventDefault();
      celine.y -= 20;
      break;
  }
};

function rectangleCollision(rectA, rectB) {
  return (
    rectA.y + rectA.height >= rectB.y &&
    rectA.y <= rectB.y + rectB.height &&
    rectA.x + rectA.width >= rectB.x &&
    rectA.x <= rectB.x + rectB.width
  );
}

function checkCollision() {
  allPipes.forEach(function(onePipe) {
    if (rectangleCollision(celine, onePipe) === true) {
      celine.isCrashed = true;
      onePipe.isCrashed = true;
    }
  });
}
