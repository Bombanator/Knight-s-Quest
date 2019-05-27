var cols, rows;
var d = 25; //This is the dimenstion of the cell (width and height). Cells are a square, meaning they have equal dimensions. If their width/height is 40, that mean there are 10 cells per column and row. d means dimension of cell
var grid = [];
var stack = []; //a stack is an array, but it is "stacked". This means that the first object/index is at the bottom of the pile. This means that the newer items are pushed upwards to the top of the stack. We use the stack when the cursor gets stuck, so it could backtrack to cells it already visited before, and continue generating the maze. We get stuck when there are no neighboring unvisited cells.

var current; //currently being visited cell
var knight; //the player
var relic; //the end goal (ending point)

var highlightShow = true; //we want the cursor highlight to show at first, but once the maze is generated, we want it to go away


function setup() {
  createCanvas(400, 400); //a p5 only function
  //img = loadImage("https://www.pixilart.com/images/art/6cb07882c773d2c.png?v=1541820224"); this did not work
  steps = 0;
  cols = floor(width/d); //width of the canvas divided by the width equals number of columns: number of square cells at the top/same for height
  rows = floor(height/d); //floor deals with math, makes the console know we are dealing with intergers, numbers are integers
  frameRate(-400)//how fast the maze is generated

  for (var r = 0; r < rows; r++) {   //row generator
    for (var c = 0; c < cols; c++) { //column generator
      var cell = new Cell(c,r);
      grid.push(cell);
    }
  }
  current = grid[0]; //current cell visited starts at the top of the grid (origin, which is point 0)
  knight = grid[0]; //same for knight
  relic = grid[index(15,15)]; //the relic is found at the bottom right of the grid
}

function index(c, r) { //shortcut
  if (c < 0 || r < 0 || c > cols-1 || r > rows-1) {  //invalid index values: if the currently visited cell is on an edge of the grid, it will not have 4 neighbors, it will have only 3
    return -1;
  }
  return c + r * cols;
}

function draw() { //a p5 only function
  background(51); //colour of grid background (grey)
  for (var c = 0; c < grid.length; c++) {
    grid[c].show();
  }

  knight.visible(); //creates knight character (after all cells are visited)
  relic.visible1(); //same but for relic

  current.visited = true;
  current.highlight();
  var next = current.checkNeighbors();
  if (next) {
    next.visited = true;

    stack.push(current);

    removeLine(current, next); //removing walls to create maze

    current = next; //this code means that we are in a current cell and we are looking for an unvisited neighbor, and then we go and visit that one
  }
}

function Cell(c, r) {
  this.c = c;
  this.r = r;
  this.walls = [true, true, true, true]; //true means wall is there. Now every cell starts off with all its walls being shown. Order of walls is top right bottom left.
  this.visited = false; //this variable keeps count if a cell has been visited or not. Every cell starts off as being not visited.

  this.show = function() {   //this function draws the walls of the maze
    var x = this.c*d;
    var y = this.r*d;

    stroke(255);

    //drawing walls

    if (this.walls[0]) {
      line(x,y,x+d,y); //top
    }
    if (this.walls[1]) {
      line(x+d,y,x+d,y+d); //right
    }
    if (this.walls[2]) {
      line(x,y+d,x+d,y+d);//line(x+d,y+d,x,y+d); //bottom
    }
    if (this.walls[3]) {
      line(x,y,x,y+d);//line(x,y+d,x,y); //left
    }
    //each "line function" represents a wall of a cell. Order of walls: top, right, bottom, left = 0,1,2,3

    if (this.visited) { //the visited cells, or the path of visited cells
      noStroke();
      fill(220,20,60,100); //colour of cells that are visited
      rect(x,y,d,d);
    }
  }


  this.checkNeighbors = function() { //the currently visited cell in comparison to its neighbouring cells that aren't visited.
    var neighbors = [];

    var top = grid[index(c, r-1)];   //neighbouring cells
    var right = grid[index(c+1, r)];
    var bottom = grid[index(c, r+1)];
    var left = grid[index(c-1, r)];

    if (top && !top.visited) {         //this code explains the path the "cursor" takes
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
       backTrack(); //this piece of coding is the "recursive backtracker". It makes the cursor go back to its previous visited cells and find a new path towards unvisited cells
    }
  }

  this.highlight = function() { //cursor: the current cell being visited
    if (highlightShow){ //when highlightShow is not true anymore it will not show anymore.
      var x = this.c*d;
      var y = this.r*d;

      noStroke();
      fill(0, 0, 255, 100); //color of cursor
      rect(x,y,d,d);
    }
  }

  this.visible = function() { //this makes the knight (player) character visible
    if(allVisited()) { //the knight character is only visible when all cells are visited
      var x = this.c*d;
      var y = this.r*d;

      //image(img, x+5, y+5, d-10, d-10); this did not work
      noStroke();
      fill(169,169,169);
      rect(x+5,y+5,d-10,d-10);
    }
  }

  this.visible1 = function() { //this makes the relic (end point) visible
    if(allVisited()) {
      var x = this.c*d;
      var y = this.r*d;

      noStroke();
      fill(255, 206, 4);
      rect(x+5,y+5,d-10,d-10);
    }
  }
}

backTrack = function() { //recursive backtracking code
  if (!allVisited()) {
    stack.pop();
    current = stack[stack.length-1];
  }else{
    highlightShow = false;
  }
}

allVisited = function() { //makes player and relic appear by saying all cells are checked.
  var completed = true;
  for (var c = 0; c < grid.length-1; c++) {
    if (!grid[c].visited) {
      completed = false;
    }
  }
  if (completed) {
    return true;
  }else{
    return false;
  }
}



removeLine = function(a, b) {  // two adjacent cells
  var x = a.c - b.c; //if we have 2 cells next to each other from their sides, this means in order to remove walls, we have to take the left wall out of the first cell and the right wall of the adjacent (second) cell
  if (x === 1) { //in order for x to equal one, we have to make the x value equal one, we need to take the column (c) value of the "a" cell (which is bigger, because it is the adjacent cell on the left) and subtract it by the column (c) value of the "b" cell. The value of x is the difference between cell a and b
    a.walls[3] = false; //remember that number 1 is the right wall and number 3 is the left wall
    b.walls[1] = false;
    console.log(a);
  } else if (x === -1) {
    a.walls[1] = false;
    b.walls[3] = false;
  }
  var y = a.r - b.r; //same thing but for the rows
  if (y === 1) { //same thing of x applies for y
    a.walls[0] = false; //number 0 is top wall, number 2 is bottom wall
    b.walls[2] = false;
  } else if (y === -1) {
    a.walls[2] = false;
    b.walls[0] = false;
  }
}


//motion
function keyTyped() { //alert(e.keyCode); I used this code to find out the Key code of the arrow keys. Up arrow key: 38, Down arrow key: 40, left arrow key: 37, right arrow key: 39
  if (key === 'w' && !knight.walls[0]) {
    knight = grid[index(knight.c, knight.r-1)]; //for these lines of code, the browser checks if any of the "wdsa" keys have been pressed, and if they are pressed, the knight character moves in the corresponding direction. "knight.walls" means if it is touching the wall go -1 direction, meaning that you do not pass the wall
    console.log("W");
  }else if (key === 'd' && !knight.walls[1]) {
    knight = grid[index(knight.c+1, knight.r)];
    console.log("D");
  }else if (key === 's' && !knight.walls[2]) {
    knight = grid[index(knight.c, knight.r+1)];
    console.log("S");
  }else if (key === 'a' && !knight.walls[3]) {
    knight = grid[index(knight.c-1, knight.r)];
    console.log("A");
  }

  if (knight === relic) {
    alert("You have retrieved the relic, your quest is complete. Reload the page to play again.");
  }
}
