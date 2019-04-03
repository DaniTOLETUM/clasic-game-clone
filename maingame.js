// Asking for the user's name
var name = prompt('Please enter your name', 'Harry Potter');

//Setting the canvas
const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

// Setting background from DOM
var background = document.getElementById('screengame');
// Setting player info from DOM
var namePlayer = document.getElementById('name-player');
var nameScore = document.getElementById('score-player');
var nameTime = document.getElementById('time-player');

namePlayer.innerHTML = name;

//=== VARIABLES DEFINITION ===
//Coordenates background start
// const backX = 0;
// const backY = 0;
// var rightPressed = false;
// var leftPressed = false;
// // var upPressed = false;
// var downPressed = false;
// // var firePressed = false;
// // var jumpPressed = false;

// To know the original position of the background image
var backgroundPosY = document.getElementById('screengame').offsetLeft;
console.log(backgroundPosY);
var backgroundPosX = document.getElementById('screengame').offsetTop;
console.log(backgroundPosX);

// =======================================================================================================================================

// === ARTHUR OBJECT === //
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
	// Seting initial positions and states of Arthur
	stand: true,
	goRight: false,
	left: false,
	right: true,
	goLeft: false,
	jumpRight: false,
	jumpLeft: false,
	duckRight: false,
	// duckLeft: false,
	atkRight: false,
	atkLeft: false,
	dieRight: false,
	//To know the number of the row wher the movement is in the sprite
	standRowRight: 0,
	goRowRight: 1,
	goRowLeft: 2,
	jumpRowRight: 3,
	jumpRowLeft: 4,
	duckRowRight: 5,
	// duckRowLeft: 6,
	atkRowRight: 7,
	atkRowLeft: 8,
	dieRowRight: 9
};

//draw arthur
var arthurImage = new Image();
arthurImage.src = './Images/arthur_true.png';
// arthurImage.onload = function () {
// 	var audio = new Audio('./Audio/02 - Main Theme - The Real Ghostbusters (DECO8) - Soundtrack - Arcade.mp3');
// 	audio.play();
// 	context.drawImage(arthurImage, arthur.x, arthur.y, arthur.width, arthur.height);
// };

//function to update de animation
function updateFrame() {
	arthur.currentFrame = ++arthur.currentFrame % arthur.colums;
	arthur.srcX = arthur.currentFrame * arthur.width;
	arthur.srcY = 0;
	context.clearRect(arthur.x, arthur.y, 64, 64);
}

// frunction to draw the loop
function drawArthur() {
	updateFrame();
	animations();
	resetAnimations();
	context.drawImage(arthurImage, arthur.srcX, arthur.srcY, 64, 64, arthur.x, arthur.y, arthur.width, arthur.height);
}


// Function that set animations depending of the state of the object Arthur
function animations() {
	arthur.srcX = arthur.currentFrame * arthur.width;
	if (arthur.goRight) {
		arthur.srcY = arthur.goRowRight * arthur.height;
	} else if (arthur.goLeft) {
		arthur.srcY = arthur.goRowLeft * arthur.height;
	} else if (arthur.duckRight) {
		arthur.srcY = arthur.duckRowRight * arthur.height;
	} else if (arthur.atkRight) {
		arthur.srcY = arthur.atkRowRight * arthur.height;
	} else if (arthur.jumpRight) {
		arthur.srcY = arthur.jumpRowRight * arthur.height;
	}
}

// function that reset all states every time in the draw loop to set the states at the origin state
function resetAnimations() {
	arthur.stand = arthur.right;
	arthur.goLeft = false;
	arthur.goRight = false;
	arthur.duckRight = false;
	arthur.atkRight = false;
	arthur.jumpRight = false;
}

var bgPos = 0; // variable that indicates the pixels to move the background. Initial 0
window.onkeydown = function (event) {
	console.log(event);

	//Swith statement to know what key is pressed and to change the states with this
	switch (event.keyCode) {
		case 39: //right key
			console.log('yay', event);
			event.preventDefault();
			if (bgPos > -6140) {
				bgPos -= 10;
				background.style.backgroundPosition = bgPos + 'px';
			}
			arthur.goRight = true;
			arthur.right = true;
			arthur.left = false;
			console.log(arthur.goRight);
			break;
		case 37: //left key
			console.log('left mode ON', event);
			event.preventDefault();
			if (bgPos != 0) {
				bgPos += 10;
				background.style.backgroundPosition = bgPos + 'px';
			}
			arthur.goLeft = true;
			arthur.left = true;
			arthur.right = false;
			break;
		case 40: //down key
			console.log('sitting down!!');
			event.preventDefault();
			arthur.right = true;
			arthur.duckRight = true;
			break;
		case 32: // jumping key
			console.log('Im not going to jump now!');
			event.preventDefault();
			arthur.right = true;
			arthur.jumpRight = true;
			break;
		case 65: //fight key
			console.log('Im ready, ¡FIGHT!');
			event.preventDefault();
			arthur.right = true;
			arthur.atkRight = true;
			break;
		default:
			break;
	}
};

//============================================================
// var zombieImage = new Image();
// zombieImage.src = './Images/zombie_single.png';
// var velocity = 8;

// const zombie = {
// 	srcX: 0,
// 	srcY: 0,
// 	x: 300,
// 	y: 330,
// 	// sheetWidth: 256,
// 	// sheetHeight: 448,
// 	width: 64,
// 	height: 64,
// };

// zombieImage.onload = function () {
// 	context.drawImage(zombieImage, zombie.x, zombie.y, zombie.width, zombie.height);
// }

// function updateFrameZombie() {
// 	console.log('updating');
// 	// context.clearRect(zombie.x, zombie.y, 64, 64);
// 	zombie.x -= 8;
// 	console.log(zombie.x, '  disminuye????');
// }

// function drawZombie() {
// 	console.log('draw zombie');
// 	updateFrameZombie();
// 	// animations();
// 	// resetAnimations();
// 	zombieImage.onload = function () {
// 		context.drawImage(zombieImage, zombie.srcX, zombie.srcY, 64, 64, zombie.x, zombie.y, zombie.width, zombie.height)
// 	}
// }

//=============================================================

// Set interval of animations
// setInterval(() => {
// 	drawArthur();
// 	drawZombie();
// }, 70);

drawLoop()

function drawLoop() {
	setTimeout(function () {
		requestAnimationFrame(drawLoop)
		context.clearRect(0, 0, arthur.width, arthur.height)
		// context.clearRect(0, 0, zombie.width, zombie.height)
		drawArthur();
		// drawZombie();
	}, 150)
}