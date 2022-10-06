//3D Game of Life
//9-5-22

var grid = [];
var nextGrid = [];

function setup() {
  createCanvas(800, 600, WEBGL);
  
  //Fill grid with random 0s and 1s, and nextGrid with 0s
  for (let x = 0; x < 25; x++){
    grid[x] = [];
    nextGrid[x] = [];
    for (let y = 0; y < 25; y++){
      grid[x][y] = [];
      nextGrid[x][y] = [];
      for (let z = 0; z < 25; z++){
        //Change the amount of 0s below to change the likelyhood of a cell being one at start
        grid[x][y][z] = random([0,0,0,1]);
        nextGrid[x][y][z] = 0;
      }
    }
  }
  
  colorMode(RGB, 24);
  
}

//Count neighbors
function counter(x,y,z,cgrid){
  let count = 0;
    for(let i = -1; i <= 1; i++){
      for(let j = -1; j <= 1; j++){
        for(let k = -1; k <= 1; k++){
          if (i != 0 || j != 0 || k != 0){
            //x+i, y+j, z+k
            let n = x+i;
            let m = y+j;
            let o = z+k;
            if (n == -1) {n = 24}
            if (m == -1) {m = 24}
            if (o == -1) {o = 24}
            if (n == 25) {n = 0}
            if (m == 25) {m = 0}
            if (o == 25) {o = 0}
            count += cgrid[n][m][o];
          }
        }
      }
    }
  return count;
}


function draw() {
  orbitControl(10);
  background(22,22,22);
  
  //Draw current grid
  for (let x = 0; x < 25; x++){
    for (let y = 0; y < 25; y++){
      for (let z = 0; z < 25; z++){
        if (grid[x][y][z] == 1){
          push();
          translate((x*10)-125,(y*10)-125,(z*10)-125);
          fill(x,y,z);
          box(10);
          pop();
        }
      }
    }
  }
  
  //Calculate next grid
  for (let x = 0; x < 25; x++){
    for (let y = 0; y < 25; y++){
      for (let z = 0; z < 25; z++){
        if (counter(x,y,z,grid) == 4 || counter(x,y,z,grid) == 5){
          nextGrid[x][y][z] = 1;
        } else {
          nextGrid[x][y][z] = 0;
        }
      }
    }
  }
  
  //Shift grid
  for (let x = 0; x < 25; x++){
    for (let y = 0; y < 25; y++){
      for (let z = 0; z < 25; z++){
        grid[x][y][z] = nextGrid[x][y][z];
        nextGrid[x][y][z] = 0;
      }
    }
  }
  
}
