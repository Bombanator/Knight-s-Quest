//const startButton = document.querySelector("#startButton")



//startButton.addEventListener("click", startGame);

//var KnightQuest;

//function startGame() {
  //GameSpace.start();
  //KnightQuest = new component(30, 30, "red", 10, 120);
//}

//function component(width, height, color, x, y) {
  //this.width = width;
  //this.height = height;
  //this.x = x;
  //this.y = y; 
  //ctx = myGameArea.context;
  //ctx.fillStyle = color;
  //ctx.fillRect(this.x, this.y, this.width, this.height);
//}

var cols, rows;
var d = 40; //cells are a square, meaning they have equal dimensions. If their width/height is 40, that mean there are 10 cells per column and row. d means dimension of cell
var grid = [];

function CanvasSetup() {
  createCanvas(400, 400);
  cols = floor(width/d); //width of the canvas divided by the width equals number of columns
  rows = floor(height/d); //floor deals with math, makes the console know we are dealing with intergers, numbers are integers
}

  for (var r = 0; r < rows; r++) {   //row generator
    for (var c = 0; c < cols; c++) {
      var cell = new Cell(c, r);
      grid.push(cell);
    }

     
}       
               
  
  
function draw() {
  background(51);
  for (var c = 0; c < cells.length; c++) {
    cells[c].show();
  }
    
}

function Cell(c, r) {
  this.c = c;
  this.r = r;
}


