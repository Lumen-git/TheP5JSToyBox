//Powders
//5-24-22

//There's two major problems with this simulation
//1: everything seems to favor moving left
//2: things seem to move left and teleport right
//The two seem very linked, but as this is more of a practice of p5js than
//it is making a perfect powder toy, I'll leave it as is for now
//and will return to it at a later date with a bit more experience :)
//I'm not going for perfection here, just practice


//Since Game of Life and powder simulations are both cellular automata,
//Lots of code from my GOL simulation is reused here

var x, y;
var scale;
//Holds current type to place
var current;

//Store the current and next grid, as well as a blank canvas
//Not the best way to do this and likely the cause of my errors, but 
//it'll do for now
let currentGrid = [];
let nextGrid = [];
let blankGrid = [];

//Some notes on attributes
//Empty = E = #000000
//Water = W = #0022FF
//Powder = P = #FFE5CC
//Brick = B = #808080

function setup() {
  createCanvas(1000,600);
  current = 'E';
  
  //Scale sets the cell size
  //DO NOT CHANGE THIS UNLESS YOU WANT TO TANK YOUR FRAMERATE
  //SETTING THIS TO 5 MAKES MY COMPUTER RUN LOUDER THAN RUNNING VR
  //THIS SIMULATION IS VERY UNOPTIMIZED AND MAY AS WELL RUN A 
  //BITCOIN MINER ON YOUR PC IF THIS IS CHANGED
  scale = 10;
  
  //Set cell count
  xCells = width / scale;
  yCells = height / scale;
  
  //Build the blankGrid as an empty grid
  for (let i = 0; i < xCells; i++){
    blankGrid[i] = [];
    for (let j = 0; j < yCells; j++){
      if (i == 0 || i == xCells - 1){
        blankGrid[i][j] = 'B';
      } else if (j == 0 || j == yCells - 1){
        blankGrid[i][j] = 'B';
      } else {
        blankGrid[i][j] = 'E';
      }
    }
  }
  
  //Make blank and current grids empty
  arrayCopy(blankGrid,currentGrid);
  arrayCopy(blankGrid,nextGrid);

}


function draw() {
  background(0);
  noFill();
  noStroke();
  
  //Get the mouse position, convert it to cords,
  //and if the mouse is pressed, draw powder
  var pixelX = int(mouseX/scale);
  var pixelY = int(mouseY/scale);
  if (pixelX > xCells - 1){pixelX = xCells - 1;}
  if (pixelY > yCells - 1){pixelY = yCells - 1;}
  if (mouseIsPressed === true){
    currentGrid[pixelX][pixelY] = current;
  }
  
  //Draw the current grid to screen
  noFill();
  for (let x = 0; x < xCells; x += 1){
   for (let y = 0; y < yCells; y += 1){
     if (currentGrid[x][y] == "E"){
      fill('#000000');
     } else if (currentGrid[x][y] == "W") {
       fill('#0022FF');
     } else if (currentGrid[x][y] == "B") {
       fill('#808080');
     } else if (currentGrid[x][y] == "P") {
       fill('#FFE5CC');
     }
     rect(x * scale,y * scale,10,10);
     noFill();
    }
  }
  
  //RULES
  //Brick = Stays the same
  //Powder = Move down, if not, try down at a diagonal
  //water = Move down, if not, left or right
  
  
  //Check the last key press to change type
  if (key === 'e'){current = 'E';}
  if (key === 'b'){current = 'B';}
  if (key === 'p'){current = 'P';}
  if (key === 'w'){current = 'W';}
  
  fill(255);
  if (current == 'E'){text('Current type: Erase', 1, 10);}
  if (current == 'B'){text('Current type: Brick', 1, 10);}
  if (current == 'P'){text('Current type: Powder', 1, 10);}
  if (current == 'W'){text('Current type: Water', 1, 10);}
  
  //Sample loop
  //for (let i = 0; i < xCells; i++){
  //  for (let j = 0; j < yCells; j++){
  //  }
  //}
  
  //Once a brick, always a brick
  for (let i = 0; i < xCells; i++){
    for (let j = 0; j < yCells; j++){
      if (i == 0 || i == xCells - 1){
        nextGrid[i][j] = 'B';
      } else if (j == 0 || j == yCells - 1){
        nextGrid[i][j] = 'B';
      }
      if (currentGrid[i][j] == 'B'){nextGrid[i][j] = 'B'}
    }
  }
  
  //Move powder
  //For this and water I flipped the y axis (j)
  //Because to me at 3 AM this made sense
  for (let i = 0; i < xCells; i++){
    for (let j = yCells; j > 0; j--){
      if (currentGrid[i][j] == 'P'){
        var lor = random([1,2]);
        if (nextGrid[i][j + 1] == 'E'){
          nextGrid[i][j] = 'E'
          nextGrid[i][j + 1] = 'P'
     }  else if (lor == 1){
       if (currentGrid[i-1][j+1] == 'E'){
         nextGrid[i-1][j+1] = 'P';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       } else if (currentGrid[i+1][j + 1] == 'E'){
         nextGrid[i+1][j+1] = 'P';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       }
     } else if (lor == 2){
       if (currentGrid[i+1][j+1] == 'E'){
         nextGrid[i+1][j+1] = 'P';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       } else if (currentGrid[i - 1][j+1] == 'E'){
         nextGrid[i-1][j+1] = 'P';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       }
     }
    }
   }
  }
  
   //Move water
   for (let i = 0; i < xCells; i++){
    for (let j = yCells; j > 0; j--){
      if (currentGrid[i][j] == 'W'){
        var lor = random([1,2]);
        if (nextGrid[i][j + 1] == 'E'){
          nextGrid[i][j] = 'E'
          nextGrid[i][j + 1] = 'W'
     } else if (lor == 1){
       if (currentGrid[i - 1][j] == 'E'){
         nextGrid[i-1][j] = 'W';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       } else if (currentGrid[i + 1][j] == 'E'){
         nextGrid[i+1][j] = 'W';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       }
     } else if (lor == 2){
       if (currentGrid[i + 1][j] == 'E'){
         nextGrid[i+1][j] = 'W';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       } else if (currentGrid[i - 1][j] == 'E'){
         nextGrid[i-1][j] = 'W';
         nextGrid[i][j] = 'E';
         currentGrid[i][j] = 'E';
       }
     }
    }
   }
  }
  
  //move the next grid to current
  //clear next
  arrayCopy(nextGrid,currentGrid);
  arrayCopy(blankGrid,nextGrid);
  
}
