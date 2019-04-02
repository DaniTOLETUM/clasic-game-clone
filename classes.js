//Setting the canvas
const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

// Setting background
var background = document.getElementById('screengame');

//Creating background image
// var background = new Image();
// background.src = './Images/background.png';
// background.onload;

//=== VARIABLES DEFINITION ===
//Coordenates background start
const backX = 0;
const backY = 0;
var movement = 15; //amount to move background
var rightPressed = false;
var leftPressed = false;
// var upPressed = false;
var downPressed = false;
// var firePressed = false;
// var jumpPressed = false;
var audio = new Audio('./Audio/02 - Main Theme - The Real Ghostbusters (DECO8) - Soundtrack - Arcade.mp3');
audio.play();


var backgroundPosY = document.getElementById('screengame').offsetLeft;
console.log(backgroundPosY);
var backgroundPosX = document.getElementById('screengame').offsetTop;
console.log(backgroundPosX);


const arthur = {
  srcX: 0,
  srcY: 0,
  x: 225,
  y: 330,
  sheetWidth: 256,
  sheetHeight: 448,
  width: 64,
  height: 64,
  colums: 4,
  rows: 10,
  currentFrame: 0,

  stand: true,
  goRight: false,
  left: false,
  right: true,
  goLeft: false,
  jumpRight: false,
  jumpLeft: false,
  duckRight: false,
  duckLeft: false,
  atkRight: false,
  atkLeft: false,
  dieRight: false,

  standRowRight: 0,
  goRowRight: 1,
  goRowLeft: 2,
  jumpRowRight: 3,
  jumpRowLeft: 4,
  duckRowRight: 5,
  duckRowLeft: 6,
  atkRowRight: 7,
  atkRowLeft: 8,
  dieRowRight: 9,
}

var arthurImage = new Image();
arthurImage.src = './Images/arthur_true.png';
arthurImage.onload = function () {
  context.drawImage(arthurImage, arthur.x, arthur.y, arthur.width, arthur.height)
}

function updateFrame() {
  arthur.currentFrame = ++arthur.currentFrame % arthur.colums;
  arthur.srcX = arthur.currentFrame * arthur.width;
  arthur.srcY = 0;
  context.clearRect(arthur.x, arthur.y, 64, 64);
}


function drawArthur() {
  updateFrame();
  animations();
  resetAnimations()
  context.drawImage(arthurImage, arthur.srcX, arthur.srcY, 64, 64, arthur.x, arthur.y, arthur.width, arthur.height);
}


setInterval(() => {
  drawArthur();
}, 100);


function animations() {
  arthur.srcX = arthur.currentFrame * arthur.width;
  if (arthur.goRight) {
    arthur.srcY = arthur.goRowRight * arthur.height;
  } else if (arthur.goLeft) {
    arthur.srcY = arthur.goRowLeft * arthur.height;
  }
}

function resetAnimations() {
  arthur.stand = arthur.right;
  arthur.goLeft = false;
  arthur.goRight = false;
  // knight.jumpLeft = false;
  // knight.jumpRight = false;
}



var bgPos = 0;
window.onkeydown = function (event) {
  console.log(event);

  switch (event.keyCode) {
    case 39:
      console.log("yay", event)
      event.preventDefault();
      if (bgPos > (-6140)) {
        bgPos -= 10;
        background.style.backgroundPosition = bgPos + 'px';
      };
      arthur.goRight = true;
      arthur.right = true;
      arthur.left = false;
      console.log(arthur.goRight)
      break;
    case 37:
      console.log('left mode ON', event);
      event.preventDefault();
      if (bgPos != 0) {
        bgPos += 10;
        background.style.backgroundPosition = bgPos + 'px';
      };
      arthur.goLeft = true;
      arthur.left = true;
      arthur.right = false;

      break;
    case 40:
      console.log('sitting down!!');
      break;
    case 32:
      console.log('Im not going to jump now!');
      break;
    case 65:
      console.log('Im ready, ¡FIGHT!');
      break;
    default:
      break;
  }
}