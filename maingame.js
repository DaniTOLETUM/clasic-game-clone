//Setting the canvas
const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

// To know the original position of the background image
var backgroundPosY = document.getElementById('screengame').offsetLeft;
console.log(backgroundPosY);
var backgroundPosX = document.getElementById('screengame').offsetTop;
console.log(backgroundPosX);

// SETTING VARIABLES
var startGameBtn = document.getElementById('restart-game');
console.log(startGameBtn, 'ey');

var zombieImageRight = new Image();
var zombieImageLeft = new Image();
var zombieExplosion = new Image();
zombieImageRight.src = './Images/zombie_single.png';
zombieImageLeft.src = './Images/zombie_single_left.png';
zombieExplosion.src = './Images/zombie-killed.png';
var zombieImage = new Image();
zombieImage.src = './Images/zombies.png';

var arthurScream = new Audio('./Audio/arthur-scream.wav');
var swordSound = new Audio('./Audio/sword.flac');
var arthurJumps = new Audio('./Audio/arthur-jump.wav');
var zombieDies = new Audio('./Audio/zombie-dies.wav');

var points;

// Setting background from DOM
var background = document.getElementById('screengame');
// Setting player info from DOM
var nameScore = document.getElementById('score-player');
var nameTime = document.getElementById('time-player');
// Setting gameplane from DOM
var gamePlane = document.getElementById('gameplane');

// Get the modal of end Game
var modalEnd = document.getElementById('Modal-end');
// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];
// Get modal to insert name
var modalName = document.getElementById('Modal-name');
var name = document.getElementById('new-name');
// Get namePlayer from DOM
var namePlayer = document.getElementById('name-player');
// Get video intro div from DOM
var videoIntro = document.getElementById('video-intro');
// Get video intro element
var videoIntroElement = document.getElementById('video1');

//Get video End div from DOM
var finalVideo = document.getElementById('video-end');
//Get video End element
var finalVideoElement = document.getElementById('video2');

var musicBackground = new Audio('./Audio/02 - Main Theme - The Real Ghostbusters (DECO8) - Soundtrack - Arcade.mp3');

// IF Video Intro ends
videoIntroElement.onended = function(e) {
	startGame();
};

// EVENT CLICK START BUTTON
startGameBtn.onclick = startGame;

// START GAME FUNCTION
function startGame() {
	console.log('start game yeah!');
	playerName(); // Asking for the user's name
	musicBackground.play(); //starts audio game
	var points = 0;
	videoIntro.style.display = 'none';
	finalVideo.style.display = 'none';
	videoIntro.parentNode.removeChild(videoIntro);

}

//FUNCTION RESTART GAME
function restartGame() {
	points = 0;
	nameScore.innerHTML = points;
	drawLoop(); // starts Arthur loop
	zombiesinAction();
}

// FUNCTION PLAYER NAME
function playerName() {
	modalName.style.display = 'block';
	// Execute a function when the user releases a key on the keyboard
	name.addEventListener('keyup', function(event) {
		console.log('llegamos hasta aqui');
		// Number 13 is the "Enter" key on the keyboard
		if (event.keyCode === 13) {
			name = name.value;
			namePlayer.innerHTML = name;
			modalName.style.display = 'none';
			displayCanvas();
			restartGame();
		}
	});
}

// Function to display Canvas
function displayCanvas() {
	theCanvas.style.display = 'block';
}

// ========================================== ARTHUR =====================================================
// ========================================== ARTHUR =====================================================

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
	} else if (arthur.die) {
		arthur.srcY = arthur.dieRowRight * arthur.height;
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
	arthur.die = false;
}

var bgPos = 0; // variable that indicates the pixels to move the background. Initial 0

function drawLoop() {
	setTimeout(function() {
		context.clearRect(0, 0, arthur.width, arthur.height);
		requestAnimationFrame(drawLoop);
		drawArthur();
	}, 150);
}

// =========================================== ZOMBIE =====================================================
// =========================================== ZOMBIE =====================================================
function zombiesinAction() {
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
			this.zombieColums = 4;
			this.velocity = 4;
			this.isCrashed = false;
			this.currentFrame = 0;
			//zombie states
			this.goRight = false;
			this.left = false;
			this.right = true;
			this.goLeft = false;
			this.jumpRight = false;
			this.jumpLeft = false;
			this.die = false;
			//sprite rows
			this.zombieGoLeft = 0;
			this.zombieGoRight = 1;
			this.ZombieDieLeft = 2;
			this.ZombieDieRight = 3;
			this.zombieImagen = zombieImage;
			this.zombieKilledImage = zombieExplosion;
		}

		//Function Update Frame
		updateFrameZombie() {
			console.log('updating frame');
			this.currentFrame = ++this.currentFrame % this.zombieColums;
			this.zombieSrcX = this.currentFrame * this.width;
			this.zombieSrcY = 0;
			this.x -= this.velocity;
			context.clearRect(this.x, this.y, this.width, this.height);
		}

		checkColision() {
			if (this.x > 222 && this.x < 232 && arthur.atkRight == true) {
				console.log('kill');
				this.velocity = 0;
				context.drawImage(this.zombieKilledImage, this.x, this.y);
				this.zombieImagen = zombieExplosion;
				zombieDies.play();
				context.clearRect(this.x, this.y, 100, 70);
				points += 100;
				nameScore.innerHTML = points;
				console.log(nameScore);
				console.log(points);
				this.x = -70;
			}
			if (this.x2 == 238 || this.x == 222) {
				arthurScream.play();
				arthurScream = 0;
				arthurImage = 0;
				zombieImage = 0;
				console.log('ooooooooooooooooooooooooooooooooooooooo');
				this.isCrashed = true;
				console.log(this.isCrashed, 'colision!!!!!!');
				// alert('You lose!!');
				modalEnd.style.display = 'block';
				// When the user clicks on <span> (x), close the modal
				span.onclick = function() {
					modalEnd.style.display = 'none';
					finalVideo.parentNode.removeChild(finalVideo);
					location.reload(true);
				};
				// When the user clicks anywhere outside of the modal, close it
				window.onclick = function(event) {
					if (event.target == modal) {
						modalEnd.style.display = 'none';
					}
				};
			}
		}

		killedZombie() {
			console.log('calling killerrrr');
			if (this.x > 222 && this.x < 262 && arthur.atkRight == true) {
				console.log('kill');
				var newZombie = 0;
				context.drawImage(this.zombieKilledImage, this.x, this.y);
				this.zombieImagen = zombieExplosion;
				// context.clearRect(this.x, this.y, 70, 70);
			}
		}

		drawZombie() {
			this.updateFrameZombie();
			this.checkColision();
			this.killedZombie();
			this.animationsZombie();
			this.resetAnimationsZombie();
			// context.drawImage(zombieImage, this.zombieSrcX, this.zombieSrcY, 64, 64, this.x, this.y, this.width, this.height);
			// zombieImage.onload = () => {
			// console.log('image drawing');
			context.drawImage(
				this.zombieImagen,
				this.zombieSrcX,
				this.zombieSrcY,
				this.width,
				this.height,
				this.x,
				this.y,
				this.width,
				this.height
			);
			// };
		}

		animationsZombie() {
			console.log(' animation mode ON');
			this.zombieSrcX = this.currentFrame * this.width;
			if (this.right) {
				this.zombieSrcY = this.zombieGoLeft * this.height;
			} else if (this.die) {
				this.zombieSrcY = this.ZombieDieRight * this.height;
			}
		}
		resetAnimationsZombie() {
			this.velocity = 4;
			this.right = true;
			this.die = false;
		}
	}

	var newZombie = new Zombie();
	// newZombie.drawZombie();

	function randomDirection() {
		var zombieX;
		// Random function to know direction and X of each zombie
		var fromTo = Math.random();
		if (fromTo < 0.5) {
			fromTo = 0; // Direction from left to right
			zombieX = 450;
		} else {
			fromTo = 0; // fromTo = 1; // Zombies in the other direction
			zombieX = 450;
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

	// drawZombieLoop();
	// function drawZombieLoop() {
	// 	setTimeout(function() {
	// 		requestAnimationFrame(drawZombieLoop);
	// 		newZombie.drawZombie();
	// 		context.clearRect(0, 0, Zombie.width, Zombie.height);
	// 	}, 70);

	setInterval(() => {
		// call to draw new zombie
		// context.clearRect(0, 0, Zombie.width, Zombie.height);
		newZombie.drawZombie();
	}, 70);
	// }

	window.onkeydown = function(event) {
		// console.log(event);

		//Swith statement to know what key is pressed and to change the states with this
		switch (event.keyCode) {
			case 39: //right key
				// console.log('yay', event);
				event.preventDefault();
				if (bgPos == -6140) {
					endingGame();
				}
				if (bgPos > -6140) {
					bgPos -= 10;
					background.style.backgroundPosition = bgPos + 'px';
				}
				arthur.goRight = true;
				arthur.right = true;
				arthur.left = false;
				break;
			case 37: //left key
				event.preventDefault();
				if (bgPos != 0) {
					bgPos += 10;
					background.style.backgroundPosition = bgPos + 'px';
				}
				arthur.goLeft = true;
				arthur.left = true;
				arthur.right = false;
				newZombie.velocity = -2;
				break;
			case 40: //down key
				event.preventDefault();
				arthur.right = true;
				arthur.duckRight = true;
				break;
			case 32: // jumping key
				event.preventDefault();
				arthur.right = true;
				arthur.jumpRight = true;
				arthurJumps.play();
				break;
			case 65: //fight key
				event.preventDefault();
				arthur.right = true;
				arthur.atkRight = true;
				swordSound.play();
				break;
			default:
				break;
		}
	};

	// function endingGame() {
	// 	console.log('ENDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD');
	// 	musicBackground.pause();
	// 	arthurScream = 0;
	// 	theCanvas.style.display = 'none';
	// 	finalVideo.style.display = 'block';
	// 	arthurImage = 0;
	// 	zombieImage = 0;
	// }
}
