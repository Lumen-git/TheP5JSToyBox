//Simple 2D Lorenz attractor
//5-16-22

//X, Y, and Z are the current points 
var x;
var y;
var z;
//dx, dy, and dz represent the change between each unit of time.
var dx;
var dy;
var dz;
var dt;
//Scale is used to increase the size of the plot. For some reason scale() did nothing
var scale;
//These cruve variables are lists that hold the history of the points, used for drawing the curve
var curveX;
var curveY;
var curveZ;
//i helps keep track of the position/length of the list
var i;


function setup() {
  createCanvas(600,600);
  background(0);
  
  //one of these values has to start as a non-0 number, a small x works nicely
  x = 0.01;
  y = 0;
  z = 0;
  dx = 0;
  dy = 0;
  dz = 0;
  
  //Make the lists
  curveX = [];
  curveY = [];
  curveZ = [];
  i = 0;
  
  //Set the scale
  scale = 4;
  
}


function draw() {
  
  
  translate((width/2),(height/2));
  stroke(255);
  
  //These variables are the specific settings that create the Lorenz attractor
  var a = 10;
  var b = 28;
  var c = 8/3;
  
  //Below are the equations that represent the Lorenz system
  //The are implemented in code further below
  // dx/dt = a(y-x)
  // dy/dt = x(b-z)-y
  // dz/dt = xy-cz
  
  //point(x * scale,-z * scale);
  
  //I've found plotting (x,-z) plots the nice, classic butterfly-like shape
  
  //This sets how much "time" passes between each calculation
  dt = 0.01;
  
  //Find the change of each variable for each step in time
  dx = (a * (y - x)) * dt;
  dy = (x * (b-z) - y) * dt;
  dz = (x * y - c * z) * dt;
  
  //Record the current points
  curveX[i] = x;
  curveY[i] = y;
  curveZ[i] = z;
  
  //If enough points of reference are stored, draw the curve
  if (i > 2){
    curve (curveX[i-3] * scale, -curveZ[i-3] * scale, curveX[i-2] * scale, -curveZ[i-2] * scale, curveX[i-1] * scale, -curveZ[i-1] * scale, curveX[i] * scale, -curveZ[i] * scale); 
  }
  
  //Add the change of each variable to each variable
  x = x + dx;
  y = y + dy;
  z = z + dz;
  
  //increase i
  i = i + 1;
}
