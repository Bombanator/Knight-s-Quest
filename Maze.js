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

var current; //currently being visited cell

function setup() {
  createCanvas(400, 400); //a p5 only function
  cols = floor(width/d); //width of the canvas divided by the width equals number of columns
  rows = floor(height/d); //floor deals with math, makes the console know we are dealing with intergers, numbers are integers
  frameRate(5)

  for (var r = 0; r < rows; r++) {   //row generator
    for (var c = 0; c < cols; c++) { //column generator
      var cell = new Cell(c,r);
      grid.push(cell);
    }
  }

  current = grid[0]; //has to do with where the maze starts and ends

}

function index(c, r) { //shortcut
  if (c < 0 || r < 0 || c > cols-1 || r > rows-1) {  //invalid index values: if the currently visited cell is on an edge of the grid, it will not have 4 neighbors, it will have only 3
    return -1;
  }
  return c + r * cols;
}

function draw() { //a p5 only function
  background(51);
  for (var c = 0; c < grid.length; c++) {
    grid[c].show();
  }

  current.visited = true;
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;
    current = next; //this code means that we are in a current cell and we are looking for an unvisited neighbor, and then we go and visit that one
  }

}

function Cell(c, r) {
  this.c = c;
  this.r = r;
  this.walls = [true, true, true, true]; //true means wall is there. Now every cell starts off with all its walls being shown. Order of walls is top right bottom left.
  this.visited = false; //this variable keeps count if a cell has been visited or not. Every cell starts off as being not visited.

  this.checkNeighbors = function() { //the currently visited cell in comparison to its neighbouring cells that aren't visited.
    var neighbors = [];

    var top = grid[index(c, r-1)];   //neighbouring cells
    var right = grid[index(c+1, r)];
    var bottom = grid[index(c, r+1)];
    var left = grid[index(c-1, r)];

    if (top && !top.visited) {
      neighbors.push(top);
    }
    if (right && !right.visited) {
      neighbors.push(right);
    }
    if (bottom && !bottom.visited) {
      neighbors.push(bottom);
    }
    if (left && !left.visited) {
      neighbors.push(left);
    }

    if (neighbors.length > 0) {
      var e = floor(random(0, neighbors.length));
      return neighbors[e];
    } else {
      return undefined;
    }

  }

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

    if (this.visited) {
      fill(220,20,60,100); //colour of cells that are visited
      rect(x,y,d,d);
    }

  };

}
