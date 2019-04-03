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
	x2: 291,
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
	die: false,
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
var audio = new Audio('./Audio/02 - Main Theme - The Real Ghostbusters (DECO8) - Soundtrack - Arcade.mp3');
audio.play();
// 	context.drawImage(arthurImage, arthur.x, arthur.y, arthur.width, arthur.height);
// };

//function to update de animation
function updateFrame() {
	arthur.currentFrame = ++arthur.currentFrame % arthur.colums;
	arthur.srcX = arthur.currentFrame * arthur.width;
	arthur.srcY = 0;
	context.clearRect(arthur.x, arthur.y, 64, 64);

	// if (myModule.newZombie.isCrashed) {
	// 	arthur.die = true;
	// 	console.log(arthur.die);
	// }
}

// frunction to draw the loop
function drawArthur() {
	updateFrame();
	animations();
	resetAnimations();
	context.drawImage(arthurImage, arthur.srcX, arthur.srcY, 64, 64, arthur.x, arthur.y, arthur.width, arthur.height);
	arthurImage.style.zIndex = '1';
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
	// console.log(event);

	//Swith statement to know what key is pressed and to change the states with this
	switch (event.keyCode) {
		case 39: //right key
			// console.log('yay', event);
			event.preventDefault();
			if (bgPos > -6140) {
				bgPos -= 10;
				background.style.backgroundPosition = bgPos + 'px';
			}
			arthur.goRight = true;
			arthur.right = true;
			arthur.left = false;
			// console.log(arthur.goRight);
			break;
		case 37: //left key
			// console.log('left mode ON', event);
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
			// console.log('sitting down!!');
			event.preventDefault();
			arthur.right = true;
			arthur.duckRight = true;
			break;
		case 32: // jumping key
			// console.log('Im not going to jump now!');
			event.preventDefault();
			arthur.right = true;
			arthur.jumpRight = true;
			break;
		case 65: //fight key
			// console.log('Im ready, ¡FIGHT!');
			event.preventDefault();
			arthur.right = true;
			arthur.atkRight = true;
			break;
		default:
			break;
	}
};

drawLoop()

function drawLoop() {
	setTimeout(function () {
		// context.clearRect(0, 0, zombie.width, zombie.height)
		requestAnimationFrame(drawLoop)
		drawArthur();
		// drawZombie();
	}, 150)
}





















//Variables

var zombieImageRight = new Image();
var zombieImageLeft = new Image();
var zombieExplosion = new Image();
zombieImageRight.src = './Images/zombie_single.png';
zombieImageLeft.src = './Images/zombie_single_left.png';
zombieExplosion.src = './Images/zombie-killed.png';
// 


// zombieImage.onload = function () {



// === ZOMBIE OBJECT === //
class Zombie {
	constructor(zombieX, zombieDirection) {
		this.x = zombieX;
		this.x2 = zombieX + this.width;
		this.direction = zombieDirection;
		this.y = 330;
		this.zombieSrcX = 0;
		this.zombieSrcy = 0;
		this.width = 64;
		this.height = 64;
		this.zombieRow = 4;
		this.zombieColums = 4
		this.velocity = 4;
		this.isCrashed = false;
		this.currentFrame = 0;
		this.zombieGoLeft = 0;
		this.zombieGoRight = 1;
		this.ZombieDieLeft = 2;
		this.ZombieDieRight = 3;
		this.zombieImagen = this.direction ? zombieImageLeft : zombieImageRight;
		this.zombieKilledImage = zombieExplosion;
	}

	//Function Update Frame
	updateFrameZombie() {
		// console.log('updating frame');
		// this.currentFrame = ++this.currentFrame % this.zombieColums;
		// this.zombieSrcX = this.currentFrame * this.width;
		// this.zombieSrcY = 0;

		if (this.direction) {
			this.x += this.velocity;
		} else {
			this.x -= this.velocity;
		}
		context.clearRect(this.x, this.y, 64, 64);
	}

	checkColision() {
		// console.log('cheking colision')
		if (this.x > 222 && this.x < 262 && arthur.atkRight == true) {
			console.log('kill');
			var newZombie = 0;
			context.drawImage(this.zombieKilledImage, this.x, this.y);
			this.zombieImagen = zombieExplosion;
			context.clearRect(this.x, this.y, 70, 70);
		}
		if (this.x2 == 238 || this.x == 222) {
			console.log('ooooooooooooooooooooooooooooooooooooooo')
			this.isCrashed = true;
			console.log(this.isCrashed, 'colision!!!!!!');
			// alert('You lose!!');
		}
	}

	killedZombie() {
		console.log('calling killerrrr')
		if (this.x > 222 && this.x < 262 && arthur.atkRight == true) {
			console.log('kill');
			var newZombie = 0;
			context.drawImage(this.zombieKilledImage, this.x, this.y);
			this.zombieImagen = zombieExplosion;
			context.clearRect(this.x, this.y, 70, 70);

		}
	}


	drawZombie() {
		//draw zombie
		this.updateFrameZombie();
		this.checkColision();
		this.killedZombie();
		// this.animationsEnemies();
		// context.drawImage(zombieImage, this.zombieSrcX, this.zombieSrcY, 64, 64, this.x, this.y, this.width, this.height);
		// zombieImage.onload = () => {
		// console.log('image drawing');
		context.drawImage(this.zombieImagen, this.x, this.y);
		// };
	};


	// animationsEnemies() {
	//   console.log(' animation mode ON');
	//   this.zombieSrcX = this.currentFrame * this.width;
	//   if (this.direction == 1) {
	//     this.zombieSrcY = this.zombieGoLeft * this.height;
	//   } else {
	//     this.zombieSrcY = this.zombieGoRight * this.height;
	//   }
	// }

}


var newZombie = new Zombie();
// newZombie.drawZombie();

function randomDirection() {
	var zombieX;
	// Random function to know direction and X of each zombie
	var fromTo = Math.random();
	if (fromTo < .5) {
		fromTo = 0; // Direction from left to right
		zombieX = 450;
	} else {
		// fromTo = 1; // Direction from right to left
		// zombieX = 10;
	}
	return {
		zombieX,
		fromTo
	};
}



// Set interval of animations
setInterval(() => {
	// Call to a random direction
	const val = randomDirection();
	//call to draw new Zombie
	newZombie = new Zombie(val.zombieX, val.fromTo);
	// newZombie.drawZombie();
}, 4000);


setInterval(() => {
	// call to draw new zombie
	newZombie.drawZombie();
}, 70)
// };