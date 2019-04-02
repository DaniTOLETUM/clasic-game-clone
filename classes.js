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
  sheetHeight: 1408,
  width: 64,
  height: 64,
  colums: 4,
  rows: 22,
  currentFrame: 0
}

var arthurImage = new Image();
arthurImage.src = './Images/arthur.png';
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
  context.drawImage(arthurImage, arthur.srcX, arthur.srcY, 64, 64, arthur.x, arthur.y, arthur.width, arthur.height);
}
var fps = 60;
var interval = 1000 / fps;

setInterval(() => {
  drawArthur();
}, 100);



var bgPos = 0;
window.onkeydown = function (event) {
  console.log(event);

  switch (event.keyCode) {
    case 39:
      console.log("yay", event)
      event.preventDefault();
      bgPos -= 25;
      background.style.backgroundPosition = bgPos + 'px';
      break;
    case 37:
      console.log('left mode ON', event);
      event.preventDefault();
      if (bgPos != 0) {
        bgPos += 25;
        background.style.backgroundPosition = bgPos + 'px';
      };
      break;

  }
}