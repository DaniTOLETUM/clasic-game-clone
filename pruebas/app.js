var config = {
  type: Phaser.CANVAS,
  parent: 'gameplane',
  width: 512,
  height: 480,

  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 300
      },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

//Variables
var player;
var stars;
var bombs;
var platforms;
var cursors;
var score = 0;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

//Function that loads all images used in the game
function preload() {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('ground', 'assets/platform.png');
  this.load.image('star', 'assets/star.png');
  this.load.image('bomb', 'assets/bomb.png');
  this.load.spritesheet('dude', '../clasic-game-clone/Images/prueba.png', {
    frameWidth: 64,
    frameHeight: 64
  });
}



//Function that creates the game items
function create() {
  this.add.image(400, 300, 'sky');

  platforms = this.physics.add.staticGroup();

  platforms.create(400, 568, 'ground').setScale(2).refreshBody();

  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  //Player
  player = this.physics.add.sprite(100, 450, 'dude');

  player.setBounce(0.2);
  player.setCollideWorldBounds(true);

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'turn',
    frames: [{
      key: 'dude',
      frame: 8
    }],
    frameRate: 20
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('dude', {
      start: 0,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  });

  this.anims.create({
    key: 'up',
    frames: [{
      key: 'dude',
      frame: 9
    }],
    frameRate: 10,
  });



  cursors = this.input.keyboard.createCursorKeys(); //Llama a la funcion de update para los cursores

  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: {
      x: 12,
      y: 0,
      stepX: 70
    }
  });

  stars.children.iterate(function (child) {

    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

  });

  bombs = this.physics.add.group();

  //score text
  scoreText = this.add.text(16, 16, 'score: 0', {
    fontSize: '32px',
    fill: '#000'
  });

  this.physics.add.collider(player, platforms); //esto añade colisión entre el player y el suelo

  this.physics.add.collider(stars, platforms); //comprueba que las estrellas al caer chocan con el suelo y las mantiene en posición.

  this.physics.add.overlap(player, stars, collectStar, null, this);

  this.physics.add.collider(bombs, platforms); //busca colisiones entre bombas y jugador

  this.physics.add.collider(player, bombs, hitBomb, null, this);

}

function update() { //actualiza los movimientos del player

  if (cursors.left.isDown) {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  } else if (cursors.right.isDown) {
    player.setVelocityX(160);

    player.anims.play('right', true);
  } else {
    player.setVelocityX(0);
    player.anims.play('turn');
  }

  if (cursors.up.isDown && player.body.touching.down) {
    player.setVelocityY(-200);
    player.anims.play('up');

  }
}

function collectStar(player, star) {
  star.disableBody(true, true);

  score += 10; //aumenta y actualiza el score
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) { //Crea nueva coleccion de estrellas
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}