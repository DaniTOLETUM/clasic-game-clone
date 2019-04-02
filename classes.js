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


// === CLASSES DEFINITION === //
// class Arthur {
//   constructor() {}


//   //Methods
//   drawArthur() {
//     var arthur = new Image();
//     arthur.src = './Images/Arthur Stand/Arthur-stand1.png';
//     arthur.onload = function () {
//       context.drawImage(arthur, 225, 330, 64, 64);
//     };
//   }


//   goRight() {
//     console.log('Go Right');

//     //   var srcX;
//     //   var srcY;
//     //   var x = 225;
//     //   var y = 330;

//     //   var sheetWidth = 256;
//     //   var sheetHeight = 64;

//     //   var colums = 4;
//     //   var rows = 1;
//     //   var width = sheetWidth / colums;
//     //   var height = sheetHeight / rows;

//     //   var arthur = new Image();
//     //   arthur.src = './Images/arthur_right.png';

//     //   var currentFrame = 0;

//     //   function updateFrame() {
//     //     currentFrame = ++currentFrame % colums;
//     //     srcX = currentFrame * width;
//     //     srcY = 0;
//     //     context.clearRect(x, y, 64, 64);
//     //   }

//     //   function drawarthur() {
//     //     updateFrame();
//     //     // context.drawImage(background, backX, backY);
//     //     context.drawImage(arthur, srcX, srcY, width, height, x, y, width, height);
//     //   }

//     //   setInterval(function () {
//     //     drawarthur();
//     //   }, 100);

//     //   function drawLoop() {
//     //     drawarthur();
//     //     requestAnimationFrame(function () {
//     //       drawLoop();
//     //     });
//     // }
//   }


//   goLeft() {
//     console.log('Go Left');

//     // var srcX;
//     // var srcY;
//     // var x = 225;
//     // var y = 330;

//     // var sheetWidth = 256;
//     // var sheetHeight = 64;

//     // var colums = 4;
//     // var rows = 1;
//     // var width = sheetWidth / colums;
//     // var height = sheetHeight / rows;

//     // var arthur = new Image();
//     // arthur.src = './Images/arthur_left.png';

//     // var currentFrame = 0;

//    c

//     // function drawarthur() {
//     //   updateFrame();
//     //   // context.drawImage(background, backX, backY);
//     //   context.drawImage(arthur, srcX, srcY, width, height, 225, 330, width, height);
//     // }

//     // setInterval(function () {
//     //   drawarthur();
//     // }, 100);

//     // function drawLoop() {
//     //   drawarthur();
//     //   requestAnimationFrame(function () {
//     //     drawLoop();
//     //   });
//     // }
//   }

//   goJump() {}

//   goDown() {

//     // var arthur = new Image();
//     // arthur.src = './Images/Arthur Down/Arthur down.png';
//     // arthur.onload = function () {
//     //   context.drawImage(arthur, 225, 330);
//     // };
//   }

//   goAtack() {}
// }


// // CHARACTER LOADED
// const c = new Arthur();
// c.drawArthur();


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
    case 68:
      console.log("yay", event)
      event.preventDefault();
      bgPos -= 25;
      background.style.backgroundPosition = bgPos + 'px';
      break;
  }
}


// ==== FUNCTION DRAW GAME ====
// function draw() {
// drawBackground();
// // context.clearRect(225, 330, 64, 64);
// c.drawArthur();

// document.addEventListener('keydown', keyDownHandler, false);
// document.addEventListener('keyup', keyUpHandler, false);

// if (rightPressed) {
//   console.log('right!!');
//   background.style.backgroundPosition += -25 + 'px';
//   c.goRight();
// } else if (leftPressed) {
//   console.log('Left!!');

// c.goLeft()

// }
//drawing background
// function drawBackground() {
//   // background.onload = function () {
//   context.drawImage(background, backX, backY);
// };
// }

// Event Listener

// function keyDownHandler(e) {
//   if (e.keyCode == 39) {
//     rightPressed = true;

//     console.log('39!');
//   } else if (e.keyCode == 37) {
//     leftPressed = true;
//   }
// }

// function keyUpHandler(e) {
//   if (e.keyCode == 39) {
//     rightPressed = false;
//   } else if (e.keyCode == 37) {
//     leftPressed = false;
//   }
// }
// var count = 0;

// function clbk() {
//   console.log('running');
//   draw();
//   clbk();
// }

// setInterval(() => {
//   drawingLoop();
// }, 70);

// window.requestAnimationFrame(clbk);