//FlyOver
//May 2, 2022
//Based on "Coding Challenge #11: 3D Terrain Generation with Perlin Noise in Processing"
//by the infinitely talented Daniel Shiffman
//Translated to p5js and added a neat little ship to roam the terrain :)

//w,h set the paramiters of the ground
var w = 1200;
var h = 800;
//Scale controls how big the triangle strip segments are
var scale;
//FieldWidth, fieldHeight control the grid the points of the triangle strip sit on
var fieldWidth, fieldHeight;
//Movement controls how fast the ground scrolls and how fast the ship drifts
var movement;
//lastShipX will hold the previous position of the ship to calculate change
var lastShipX;

//This array will become a 2d array to store the noise of the ground
let groundNoise = [];


function setup() {
  //create a 600 by 600 canvas with the WEBGL 3D rendering system
  createCanvas(600,600, WEBGL);
  
  //Set scale and change the field accordingly
  scale = 25;
  fieldWidth = w/scale;
  fieldHeight = h/scale;
  
  //Set all angle functions to use degrees
  angleMode(DEGREES);
  
  //Defining some starting variables so it doesn't crash on launch
  movement = 0;
  lastShipX = 0;
  
}


function draw() {
  
  background(0);
  stroke(255);
  noFill();
  
  //Tilt the field back and move it so it fills the whole canvas
  rotateX(60);
  translate((-w/2),(-h/2));
  
  //Calculate the 2D array of noise
  var yNoise = 0;
  for (let y = 0; y < fieldWidth; y++){
    //Setting xNoise to movement and incrementing movement each time the screen is drawn will give the scrolling effect
     var xNoise = movement;
     groundNoise[y] = [];
     for (let x = 0; x < fieldHeight; x++){
       //Make the perlin noise, and map it to the extremes we allow the terrain to have
       groundNoise[y][x] = map(noise(xNoise,yNoise), 0 , 1, -75, 75);
       xNoise += 0.1;
     }
     yNoise += 0.1;
   }
 
 //Draw the triangle strips
  for (let y = 0; y < fieldHeight; y++){
    beginShape(TRIANGLE_STRIP);
     for (let x = 0; x < fieldWidth; x++){
       //Top of row
       vertex(x*scale,y*scale, groundNoise[x][y]);
       //Bottom of row
       vertex(x*scale,(y+1)*scale, groundNoise[x][y+1]);
    }
    endShape();
  }
  
  //Change movement *slightly* to make scrolling work
  movement -= 0.015;
  
  
  //Begin ship mechanics!!
  
  //Use perlin noise to generate the ship's position, with a *very slight* change in y just to give it a little drift
  var shipX = map(noise(movement/6), 0 , 1, 400, 800);
  var shipY = map(noise(movement), 0 , 1, 655, 665);
  
  //Find the change in the ship's position from last
  var deltaShipX = shipX - lastShipX;
  
  //Make the space ship. The first shape is the white left side and the second is the shaded right side
  fill(255);
  beginShape(TESS);
  vertex(shipX, shipY, 80);
  //The Z axis of each wing will be slightly tipped up or down based on its last position to give it a turning effect
  vertex(shipX-10, shipY+20, 80 + deltaShipX * 5);
  vertex(shipX, shipY+15, 80);
  endShape(CLOSE);
  //Repeat
  fill(220);
  stroke(220);
  beginShape(TESS);
  vertex(shipX, shipY+15, 80);
  vertex(shipX+10, shipY+20, 80 - deltaShipX * 5);
  vertex(shipX, shipY, 80);
  endShape(CLOSE);
  
  //Set the last position to the current position just before restarting
  lastShipX = shipX
  
}
