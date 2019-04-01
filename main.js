  //Setting the canvas
  const theCanvas = document.getElementById('screengame');
  const context = theCanvas.getContext('2d');

  //Creating background image
  var background = new Image();
  background.src = './Images/background.png';
  background.onload

  //Coordenates background start
  const backX = 0;
  const backY = 0;

  //drawing background image
  background.onload = function () {
    context.drawImage(background, backX, backY);
  }

  var movement = 15; //amount to move background


  window.addEventListener('keydown', keyDown, true);

  function keyDown(evt) {
    console.log('keypresssssssssssss');
    switch (evt.keyCode) {
      case !
      case 37: // LEFT
        console.log('LEFT');
        pressLeft();
        break;
      case 39: //RIGHT
        console.log('RIGHT');
        pressRight();
        break;
      case 38: //UP
        console.log('UPPPP');
        break;
      case 40: //DOWN
        console.log('DOWNNNN');
        break;
      case 32: //JUMP
        console.log('JUMPPPP');
        break;
      case 65: // FIRE
        console.log('FIREEE');
        break;
      default:
        console.log('no function key');
        noKey();
        break;
    }
  }






























  // /// KEYPRESS EVENTS ///


  // window.addEventListener("keydown", myFunction);

  // function myFunction() {
  //   console.log('jey yujuju');
  //   if (event.keydown == 39) {
  //     console.log('RIGHTTTTT!!!')
  //     pressRight();
  //   } else if (event.keyCode == 37) {
  //     console.log('LEFFFFTTTTTTTTTT')
  //     pressLeft();
  //   } else {
  //     noKey();
  //   }
  // }



  // //======== DRAWING ARTHUR ======== //
  // //No key

  function noKey() {
    var srcX;
    var srcY;
    var x = 225;
    var y = 330;


    var sheetWidth = 256;
    var sheetHeight = 64;

    var colums = 4;
    var rows = 1;
    var width = sheetWidth / colums;
    var height = sheetHeight / rows;

    var arthur = new Image();
    arthur.src = './Images/arthur_waits.png';

    var currentFrame = 0;

    function updateFrame() {

      currentFrame = ++currentFrame % colums;
      srcX = currentFrame * width;
      srcY = 0;
      context.clearRect(x, y, width, height);
    }

    function drawarthur() {
      updateFrame();
      context.drawImage(background, backX, backY);
      context.drawImage(arthur, srcX, srcY, width, height, 225, 330, width, height);
    }

    setInterval(function () {
      drawarthur();
    }, 500);

    function drawLoop() {
      drawarthur();
      requestAnimationFrame(function () {
        drawLoop();
      });

    }
  }






  // // Right cursor
  function pressRight() {
    var srcX;
    var srcY;
    var x = 225;
    var y = 330;


    var sheetWidth = 256;
    var sheetHeight = 64;

    var colums = 4;
    var rows = 1;
    var width = sheetWidth / colums;
    var height = sheetHeight / rows;

    var arthur = new Image();
    arthur.src = './Images/arthur_right.png';

    var currentFrame = 0;

    function updateFrame() {

      currentFrame = ++currentFrame % colums;
      srcX = currentFrame * width;
      srcY = 0;
      context.clearRect(x, y, width, height);
    }

    function drawarthur() {
      updateFrame();
      context.drawImage(background, backX, backY);
      context.drawImage(arthur, srcX, srcY, width, height, 225, 330, width, height);
    }

    setInterval(function () {
      drawarthur();
    }, 100);

    function drawLoop() {
      drawarthur();
      requestAnimationFrame(function () {
        drawLoop();
      });

    }
  }


  // //Left cursor

  function pressLeft() {
    var srcX;
    var srcY;
    var x = 225;
    var y = 330;


    var sheetWidth = 256;
    var sheetHeight = 64;

    var colums = 4;
    var rows = 1;
    var width = sheetWidth / colums;
    var height = sheetHeight / rows;

    var arthur = new Image();
    arthur.src = './Images/arthur_left.png';

    var currentFrame = 0;

    function updateFrame() {

      currentFrame = ++currentFrame % colums;
      srcX = currentFrame * width;
      srcY = 0;
      context.clearRect(x, y, width, height);
    }

    function drawarthur() {
      updateFrame();
      context.drawImage(background, backX, backY);
      context.drawImage(arthur, srcX, srcY, width, height, 225, 330, width, height);
    }

    setInterval(function () {
      drawarthur();
    }, 100);

    function drawLoop() {
      drawarthur();
      requestAnimationFrame(function () {
        drawLoop();
      });

    }
  }