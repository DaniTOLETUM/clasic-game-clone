//Set Canvas context
const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

//Variables

var zombieImageRight = new Image();
var zombieImageLeft = new Image();
zombieImageRight.src = './Images/zombie_single.png';
zombieImageLeft.src = './Images/zombie_single_left.png';
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
    if (this.x2 == 238 || this.x == 222) {
      console.log('ooooooooooooooooooooooooooooooooooooooo')
      this.isCrashed = true;
      console.log(this.isCrashed, 'colision!!!!!!');
    }
  }


  drawZombie() {
    //draw zombie
    this.updateFrameZombie();
    this.checkColision();
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
newZombie.drawZombie();

function randomDirection() {
  var zombieX;
  // Random function to know direction and X of each zombie
  var fromTo = Math.random();
  if (fromTo < .5) {
    fromTo = 0; // Direction from left to right
    zombieX = 450;
  } else {
    fromTo = 1; // Direction from right to left
    zombieX = 10;
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