  //Setting the canavs
  const theCanvas = document.getElementById('screengame');
  const context = theCanvas.getContext('2d');

  //Creating background image
  var background = new Image();
  background.src = './Images/background.png';
  background.onload

  //Coordenates background start
  const backX = 0;
  const backY = 0;

  /// waiting for presskeys ///
  document.onekeydown = function (event) {
    if (event.keyCode == 39) {
      pressRight();
    } else if (event.keyCode == 37) {
      pressLeft();
    } else {
      noKey();
    }
  }


  //======== DRAWING ARTHUR ======== //
  //No key 
  // function noKey() {
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
  // }






  // Right cursor
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


  // Left cursor
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