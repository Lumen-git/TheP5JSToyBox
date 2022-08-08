//AdvancedWireWorld
//8-7-22

//A version of wireworld with custom functionality and GUI
//Also, "metal" has been replaced with "wire"

//New types: LED, battery
//New Functions:

var x, y;
var scale;
var current;
var rate;

let grid = [];
let nextGrid = [];

function setup() {
  //This is all the same as the Powder Toy demo I made
  //The only change is filling both grids at once instead of
  //using arrayCopy (explained later)
  createCanvas(1000, 600);
  current = 'E';

  scale = 10;

  xCells = width / scale;
  yCells = height / scale;

  for (let i = 0; i < xCells; i++) {
    grid[i] = [];
    nextGrid[i] = [];
    for (let j = 0; j < yCells; j++) {
      grid[i][j] = 'E';
      nextGrid[i][j] = 'E';
    }
  }

  noStroke();
  rate = 40;
  frameRate(rate);

  let div = createDiv('Types: <br>w - Wire - Carries current, becomes spark if 1 or 2 sparks are nearby<br>s - Spark - Acts as current, decays to tail, then wire<br>e - Empty - Erases other elements<br>b - Battery - Constantly makes sparks<br>l - LED - Glows when hit by current<br><br>FPS:<br>Use 1-6 keys to change FPS');
  div.style('font-size', '16px');
  div.style('font-family', 'Verdana');
  div.position(1001, 0);
}

//Counts types of t around the point x and y
function countSparks(x, y, t) {
  let count = 0;
  if (x != 0) {
    if (grid[x-1][y] == t) {
      count += 1;
    }
    if (y != 0) {
      if (grid[x-1][y-1] == t) {
        count += 1;
      }
    }
    if (y != yCells-1) {
      if (grid[x-1][y+1] == t) {
        count += 1;
      }
    }
  }
  if (x != xCells-1) {
    if (grid[x+1][y] == t) {
      count += 1;
    }
    if (y != 0) {
      if (grid[x+1][y-1] == t) {
        count += 1;
      }
    }
    if (y != yCells-1) {
      if (grid[x+1][y+1] == t) {
        count += 1;
      }
    }
  }
  if (y != 0) {
    if (grid[x][y-1] == t) {
      count += 1;
    }
  }
  if (y != yCells-1) {
    if (grid[x][y+1] == t) {
      count += 1;
    }
  }
  return count;
}

function draw() {

  //Change element using keys
  if (key === 'w') {
    current = 'W';
  } //Wire
  if (key === 's') {
    current = 'S';
  } //Spark
  if (key === 'e') {
    current = 'E';
  } //Empty
  if (key === 'l') {
    current = 'L';
  } //LED
  if (key === 'b') {
    current = 'B';
  } //Battery

  //Change FPS using keys
  //I had a 0 FPS option here, but doing that makes the whole program stop forever
  if (key === '1') {
    rate = 40;
  }
  if (key === '2') {
    rate = 20;
  }
  if (key === '3') {
    rate = 10;
  }
  if (key === '4') {
    rate = 5;
  }
  if (key === '5') {
    rate = 1;
  }
  frameRate(rate);

  //Find mouse, and if clicked, place element
  var pixelX = int(mouseX/scale);
  var pixelY = int(mouseY/scale);
  if (pixelX > xCells - 1) {
    pixelX = xCells - 1;
  }
  if (pixelY > yCells - 1) {
    pixelY = yCells - 1;
  }
  if (mouseIsPressed === true) {
    if (current == "S") {
      if (grid[pixelX][pixelY] == "W") {
        grid[pixelX][pixelY] = current
      }
    } else {
      grid[pixelX][pixelY] = current;
    }
  }

  noFill();

  //Drawing
  for (let x = 0; x < xCells; x += 1) {
    for (let y = 0; y < yCells; y += 1) {
      if (grid[x][y] == "E") {
        fill('#000000');
      } else if (grid[x][y] == "S") {
        fill('#0513FF');
      } else if (grid[x][y] == "T") {
        fill('#FF2600');
      } else if (grid[x][y] == "W") {
        fill('#FFFF00');
      } else if (grid[x][y] == "L") {
        fill('#5F5F5F');
      } else if (grid[x][y] == "L*" || grid[x][y] == "L-") {
        fill('#FFFFFF');
      } else if (grid[x][y] == "B") {
        fill('#BA00FF');
      }
      rect(x * scale, y * scale, 10, 10);
      noFill();
    }
  }

  //Little text indicator at the top left
  fill(255);
  if (current == 'E') {
    text('Current type: Erase', 1, 10);
  }
  if (current == 'S') {
    text('Current type: Spark', 1, 10);
  }
  if (current == 'W') {
    text('Current type: Wire', 1, 10);
  }
  if (current == 'B') {
    text('Current type: Battery', 1, 10);
  }
  if (current == 'L') {
    text('Current type: LED', 1, 10);
  }

  text('Current FPS (Setting): ' + str(rate), 1, 20);
  text('Current FPS (Actual): ' + str(int(frameRate())), 1, 30);

  //Rules (Standard)
  //If wire is touching 1 or 2 sparks, become spark
  //If spark, become tail
  //If tail, become wire

  //Rules (Custom)
  //If LED is touching 1 or more spark, become white, else black
  //If wire is touching battery, become spark

  for (let i = 0; i < xCells; i++) {
    for (let j = 0; j < yCells; j++) {
      if (grid[i][j] == "W") {
        //If wire is touching exactly 1 or 2 sparks, become spark
        if ((countSparks(i, j, "S") > 0 && countSparks(i, j, "S") < 3) || (countSparks(i, j, "B") > 0)) {
          nextGrid[i][j] = "S";
        } else {
          nextGrid[i][j] = "W";
        }
      }
      //If spark, become tail
      if (grid[i][j] == "S") {
        nextGrid[i][j] = "T";
      }
      //If tail, become wire
      if (grid[i][j] == "T") {
        nextGrid[i][j] = "W";
      }
      //Control LEDs
      //LEDs have a 3 phase system, allowing them to be lit, light others around them, but prevent looping
      if (grid[i][j] == "L" && (countSparks(i, j, "S") >= 1 || countSparks(i, j, "L*") >= 1)) {
        nextGrid[i][j] = "L*";
      } else if (grid[i][j] == "L") {
        nextGrid[i][j] = "L";
      }
      if (grid[i][j] == "L*") {
        nextGrid[i][j] = "L-";
      }
      if (grid[i][j] == "L-") {
        nextGrid[i][j] = "L";
      }
      if (grid[i][j] == "B") {
        nextGrid[i][j] = "B";
      }
    }
  }




  //p5js has a copy array function, but it seems to be behave quite strange, at
  //least with 2D arrays. This is a bit shower, but it works
  for (let i = 0; i < xCells; i++) {
    for (let j = 0; j < yCells; j++) {
      grid[i][j] = nextGrid[i][j];
    }
  }

  for (let i = 0; i < xCells; i++) {
    for (let j = 0; j < yCells; j++) {
      nextGrid[i][j] = "E";
    }
  }
}
