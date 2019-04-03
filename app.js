const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

// === zombie OBJECT === //



// colums: 4,
// rows: 10,
// currentFrame: 0,
// Seting initial positions and states of Arthur
// stand: true,
// goRight: false,
// left: false,
// right: true,
// goLeft: false,
// jumpRight: false,
// jumpLeft: false,
// duckRight: false,
// duckLeft: false,
// atkRight: false,
// atkLeft: false,
// dieRight: false,
//To know the number of the row wher the movement is in the sprite
// standRowRight: 0,
// goRowRight: 1,
// goRowLeft: 2,
// jumpRowRight: 3,
// jumpRowLeft: 4,
// duckRowRight: 5,
// // duckRowLeft: 6,
// atkRowRight: 7,
// atkRowLeft: 8,
// dieRowRight: 9
// };

//draw arthur
var zombieImage = new Image();
zombieImage.src = './Images/zombie_single.png';


//function to update de animation
// function updateFrameZombie() {
//   // arthur.currentFrame = ++arthur.currentFrame % arthur.colums;
//   // arthur.srcX = arthur.currentFrame * arthur.width;
//   // arthur.srcY = 0;
//   console.log(zombie.x);
//   context.clearRect(zombie.x, zombie.y, 64, 64);
//   zombie.x += 10;
// }

// frunction to draw the loop
function drawZombie() {
  console.log('draw zombie');
  // updateFrameZombie();
  // animations();
  // resetAnimations();
  zombieImage.onload = function () {
    context.drawImage(zombieImage, zombie.x, zombie.y);
  }
}


// Function that set animations depending of the state of the object Arthur
// function animations() {
//   arthur.srcX = arthur.currentFrame * arthur.width;
//   if (arthur.goRight) {
//     arthur.srcY = arthur.goRowRight * arthur.height;
//   } else if (arthur.goLeft) {
//     arthur.srcY = arthur.goRowLeft * arthur.height;
//   } else if (arthur.duckRight) {
//     arthur.srcY = arthur.duckRowRight * arthur.height;
//   } else if (arthur.atkRight) {
//     arthur.srcY = arthur.atkRowRight * arthur.height;
//   } else if (arthur.jumpRight) {
//     arthur.srcY = arthur.jumpRowRight * arthur.height;
//   }
// }

// function that reset all states every time in the draw loop to set the states at the origin state
// function resetAnimations() {
//   arthur.stand = arthur.right;
//   arthur.goLeft = false;
//   arthur.goRight = false;
//   arthur.duckRight = false;
//   arthur.atkRight = false;
//   arthur.jumpRight = false;
// }


// Set interval of animations
setInterval(() => {
  drawZombie();
}, 70);