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

  for (var r = 0; r < rows; r++) {   //row generator
    for (var c = 0; c < cols; c++) {
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
  
  this.show = function() {
    var x = this.c*d;
    var y = this.r*d;
    stroke(255);
    noFill();
    rect(x,y,d,d);
  };
  
  //work with code underneath, to get grid to work//
  
  
var cols, rows;
var w = 40;
var grid = [];

function setup() {
  createCanvas(400, 400);
  cols = floor(width/w); 
  rows = floor(height/w); 

  for (var j = 0; j < rows; j++) {  
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
     
}       
                
function draw() {
  background(51);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }
    
}

function Cell(i, j) {
  this.i = i;
  this.j = j;
  this.walls = [true, true, true, false]; //true means wall is there. Now every cell starts off with all its walls being shown. Order of walls is top right bottom left.
  
  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(255);
    if (this.walls[0]) {
      line(x,y,x+w,y); //drawing walls
    }
    if (this.walls[1]) {
      line(x+w,y,x+w,y+w);
    }
    if (this.walls[2]) {
      line(x+w,y+w,x,y+w);
    }
    if (this.walls[3]) {
      line(x,y+w,x,y);
    }
    
    //all four walls. each "line function" represents a wall. The numbers go with the array of "true"'s.
    
    
    
    
    
    
    //noFill();    
    //rect(x,y,w,w);
  };
  
}
