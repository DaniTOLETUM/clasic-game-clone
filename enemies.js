const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

//Variables

var zombieImage = new Image();
zombieImage.src = './Images/zombie_single.png';

zombieImage.onload = function () {



  // === ZOMBIE OBJECT === //
  class Zombie {
    constructor(zombieX, zombieDirection) {
      this.x = zombieX;
      this.direction = zombieDirection;
      this.y = 330;
      this.zombieSrcX = 0;
      this.zombieSrcy = 0;
      this.width = 64;
      this.height = 64;
      this.zombieRow = 4;
      this.zombieColums = 4
      this.velocity = 5;
      this.isCrashed = false;
      this.currentFrame = 0;
      this.zombieGoLeft = 0;
      this.zombieGoRight = 1;
      this.ZombieDieLeft = 2;
      this.ZombieDieRight = 3;
      this.zombieImagen = this.direction ? zombieImage : zombieImage;
    }

    //Function Update Frame
    updateFrameZombie() {
      console.log('updateFrameZombie Called');
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


    drawZombie() {
      //draw zombie
      this.updateFrameZombie();
      // this.animationsEnemies();
      // context.drawImage(zombieImage, this.zombieSrcX, this.zombieSrcY, 64, 64, this.x, this.y, this.width, this.height);
      // zombieImage.onload = () => {
      console.log('image drawing');
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
    console.log(fromTo, ' ppppp');
    if (fromTo < .5) {
      fromTo = 0; // Direction from left to right
      zombieX = 450;
    } else {
      fromTo = 1; // Direction from right to left
      zombieX = 50;
    }
    //console.log(fromTo + ' zombie direction');
    // console.log(zombieX + ' zombie position')
    return {
      zombieX,
      fromTo
    };
  }



  // Set interval of animations
  setInterval(() => {
    // Call to a random direction
    const val = randomDirection();
    console.log(val.fromTo + ' eyeyey ' + val.zombieX);
    //call to draw new Zombie
    newZombie = new Zombie(val.zombieX, val.fromTo);
    newZombie.drawZombie();

    //console.log(newZombie);
  }, 2000);

  setInterval(() => {
    // call to draw new zombie
    newZombie.drawZombie();
    // drawEnemies();
  }, 70)

  //   context.drawImage(zombieImage, this.x, this.y, this.width, this.height);
};