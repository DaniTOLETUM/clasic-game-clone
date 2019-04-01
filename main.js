//Setting the canavs
const theCanvas = document.getElementById('screengame');
const context = theCanvas.getContext('2d');

//Creating background image
var background = new Image();
background.src = './Images/background.png';
background.onload

//Coordenates background start
const backX = 0;
const backY = 30;

//drawing background image
background.onload = function () {
  context.drawImage(background, backX, backY);
};


//drawing arthur
var srcX;
var srcY;