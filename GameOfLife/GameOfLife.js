//Conway's game of life
//May 2, 2022


//Any live cell with fewer than two live neighbours dies
//Any live cell with more than three live neighbours dies
//Any live cell with two or three live neighbours lives
//Any dead cell with exactly three live neighbours comes to life.

var x, y;
var scale;

let livingGrid = [];
let nextGrid = [];

function setup() {
  createCanvas(1000,600);
  
  //Scale sets the cell size
  scale = 10;
  
  //Set cell count
  xCells = width / scale;
  yCells = height / scale;
  
  //Tweak this for faster life 
  frameRate(10);
  
  //Build the livingGrid as a grid of random values
  for (let i = 0; i < xCells; i++){
    livingGrid[i] = [];
    for (let j = 0; j < yCells; j++){
      livingGrid[i][j] = random([0,1]);
    }
  }
  
  //Fill next grid as all 0
  for (let i = 0; i < xCells; i++){
    nextGrid[i] = [];
    for (let j = 0; j < yCells; j++){
      nextGrid[i][j] = 0;
    }
  }
}


function draw() {
  background(0);
  noFill();
  stroke(255);
  
  //Draw the grid according to livingGrid
  for (let x = 0; x < xCells; x += 1){
    for (let y = 0; y < yCells; y += 1){
      if (livingGrid[x][y] == 1){
       fill(255);
      } else {
      noFill();
      }
      rect(x * scale,y * scale,10,10);
    }
  }
  
  //Build livingGrid for next frame
  for (let i = 0; i < xCells; i++){
    nextGrid[i] = [];
    for (let j = 0; j < yCells; j++){
      //This for loop handles the edges
      if (i == 0 || i == xCells - 1 || j == 0 || j == yCells - 1){
        nextGrid[i][j] = 0;
      } else {
      //Make a nextGrid cell equal the sum of its neighbors in livingGrid
      //Perish
      nextGrid[i][j] = livingGrid[i+1][j] + livingGrid[i][j+1] + livingGrid[i+1][j+1] + livingGrid[i-1][j] + livingGrid[i][j-1] + livingGrid[i-1][j-1] + livingGrid[i+1][j-1] + livingGrid[i-1][j+1];
      }
      //Apply rules
      //Dies from over/under population
      if (nextGrid[i][j] < 2){nextGrid[i][j] = 0;}
      if (nextGrid[i][j] > 3){nextGrid[i][j] = 0;}
      //2 neighbors stays the same
      if (nextGrid[i][j] == 2){nextGrid[i][j] = livingGrid[i][j];}
      //3 neighbors is born
      if (nextGrid[i][j] == 3){nextGrid[i][j] = 1;}
    }
  }
  
  //Copy nextGrid to livingGrid, repeat
  for (let i = 0; i < xCells; i++){
    arrayCopy(nextGrid[i],livingGrid[i]);
  }
  
}
