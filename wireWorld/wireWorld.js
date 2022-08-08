//WireWorld
//8-5-22

//Much of the code is reused from the powders demo
//That code wasn't perfect, but hopefully many of the
//problems with the sand movement won't be problems
//in this more stationary world

var x, y;
var scale;
var current;

let grid = [];
let nextGrid = [];

//"Tail" is more of a concept than something the user will actually
//See and interact with
//It keels electricity moving forward

function setup() {
  //This is all the same as the Powder Toy demo I made
  //The only change is filling both grids at once instead of 
  //using arrayCopy (explained later)
  createCanvas(1000,600);
  current = 'E';
  
  scale = 10;
  
  xCells = width / scale;
  yCells = height / scale;
  
  for (let i = 0; i < xCells; i++){
    grid[i] = [];
    nextGrid[i] = [];
    for (let j = 0; j < yCells; j++){
        grid[i][j] = 'E';
        nextGrid[i][j] = 'E';
    }
  }

  noStroke();
  frameRate(60);

}

//First go at p5js functions! All this does is takes
//A pair of points and counts the sparks nearby
function countSparks(xMetal, yMetal){
  let count = 0;
  if (xMetal != 0){
    if (grid[xMetal-1][yMetal] == "S"){count += 1;}
    if (yMetal != 0){
      if (grid[xMetal-1][yMetal-1] == "S"){count += 1;}
    }
    if (yMetal != yCells-1){
      if (grid[xMetal-1][yMetal+1] == "S"){count += 1;}
    }
  }
  if (xMetal != xCells-1){
    if (grid[xMetal+1][yMetal] == "S"){count += 1;}
    if (yMetal != 0){
      if (grid[xMetal+1][yMetal-1] == "S"){count += 1;}
    }
    if (yMetal != yCells-1){
      if (grid[xMetal+1][yMetal+1] == "S"){count += 1;}
    }
  }
  if (yMetal != 0){
    if (grid[xMetal][yMetal-1] == "S"){count += 1;}
  }
  if (yMetal != yCells-1){
    if (grid[xMetal][yMetal+1] == "S"){count += 1;}
  }
  return count;
}

function draw() {
  
  //Change element using keys
  if (key === 'm'){current = 'M';}
  if (key === 's'){current = 'S';}
  if (key === 'e'){current = 'E';}
  
  //Find mouse, and if clicked, place element
  var pixelX = int(mouseX/scale);
  var pixelY = int(mouseY/scale);
  if (pixelX > xCells - 1){pixelX = xCells - 1;}
  if (pixelY > yCells - 1){pixelY = yCells - 1;}
  if (mouseIsPressed === true){
     if (current == "S"){ 
      if (grid[pixelX][pixelY] == "M"){
        grid[pixelX][pixelY] = current
      }
    } else {
      grid[pixelX][pixelY] = current;
    }
  }
  
  noFill();
  
  //Drawing
  for (let x = 0; x < xCells; x += 1){
   for (let y = 0; y < yCells; y += 1){
     if (grid[x][y] == "E"){
      fill('#000000');
     } else if (grid[x][y] == "S") {
       fill('#0513FF');
     } else if (grid[x][y] == "T") {
       fill('#FF2600');
     } else if (grid[x][y] == "M") {
       fill('#FFFF00');
     }
     rect(x * scale,y * scale,10,10);
     noFill();
    }
  }

  //Little text indicator at the top left
  fill(255);
  if (current == 'E'){text('Current type: Erase', 1, 10);}
  if (current == 'S'){text('Current type: Spark', 1, 10);}
  if (current == 'M'){text('Current type: Metal', 1, 10);}

  //Rules
  //If metal is touching 1 or 2 sparks, become spark
  //If spark, become tail
  //If tail, become metal
  
   for (let i = 0; i < xCells; i++){
    for (let j = 0; j < yCells; j++){
      if (grid[i][j] == "M"){
        //If metal is touching exactly 1 or 2 sparks, become spark
        if (countSparks(i,j) > 0 && countSparks(i,j) < 3){
          nextGrid[i][j] = "S";
        } else {
          nextGrid[i][j] = "M";
        }
      }
      //If spark, become tail
      if (grid[i][j] == "S"){nextGrid[i][j] = "T";}
      //If tail, become metal
      if (grid[i][j] == "T"){nextGrid[i][j] = "M";}
     }
   }


   //p5js has a copy array function, but it seems to be behave quite strange, at
   //least with 2D arrays. This is a bit shower, but it works
   for (let i = 0; i < xCells; i++){
    for (let j = 0; j < yCells; j++){
      grid[i][j] = nextGrid[i][j];
    }
   }
  
  for (let i = 0; i < xCells; i++){
    for (let j = 0; j < yCells; j++){
      nextGrid[i][j] = "E";
    }
   }

}
