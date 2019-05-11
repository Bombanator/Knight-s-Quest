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

//cols, i
//rows, j

function setup() {
  createCanvas(400, 400);
  cols = floor(width/d); //width of the canvas divided by the width equals number of columns
  rows = floor(height/d); //floor deals with math, makes the console know we are dealing with intergers, numbers are integers

  for (var r = 0; r < rows; r++) {   //row generator
    for (var c = 0; c < cols; c++) { //column generator
      var cell = new Cell(c,r);
      grid.push(cell);
    }
  }

}

function draw() {
  background(51);
  for (var c = 0; c < grid.length; c++) {
    grid[c].show();
  }

}

function Cell(c, r) {
  this.c = c;
  this.r = r;
  this.walls = [true, true, true, true]; //true means wall is there. Now every cell starts off with all its walls being shown. Order of walls is top right bottom left.

  this.show = function() {
    var x = this.c*d;
    var y = this.r*d;
    stroke(255);
    if (this.walls[0]) {
      line(x,y,x+d,y); //drawing walls
    }
    if (this.walls[1]) {
      line(x+d,y,x+d,y+d);
    }
    if (this.walls[2]) {
      line(x+d,y+d,x,y+d);
    }
    if (this.walls[3]) {
      line(x,y+d,x,y);
    }

    //each "line function" represents a wall of a cell. Order of walls: top, right, bottom, left = 0,1,2,3
    
  };

}
