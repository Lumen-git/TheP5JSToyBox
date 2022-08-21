//Synesthesia
//8-17-2022

let w = 600;
let h = 800;
let fieldWidth, fieldHeight;
let mySound;
let fft;

//Change soundfile.ext to whatever sound file you want to load
function preload() {
  mySound = loadSound('SOUNDFILE.EXT');
}

function setup() {
  cnv = createCanvas(600,600, WEBGL);

  scale = 25;
  fieldWidth = w/scale;
  fieldHeight = h/scale;
  
  angleMode(DEGREES);
  colorMode(HSB, 100);
  
  fft = new p5.FFT(0.4, 128);
  cnv.mouseClicked(togglePlay);
}

function togglePlay() {
  if (mySound.isPlaying()) {
    mySound.pause();
  } else {
    mySound.loop();
  }
}

function draw() {
  background(0);
  noFill();
  strokeWeight(1);
  stroke(255);
  
  rotateX(60);
  translate((-w/2),(-h/2));
  
  spectrum = fft.analyze();
  spectrum.reverse();
  
  //Some of these map statements look absolutely bonkers, but mostly it just finds the distance of any point on the grid 
  //From the back center and converts that distance to color and the frequency it displays, giving it that
  //Radial look
  
  //I'm not sure why I split it into two sides and didn't just find some center point and go from there, but
  //This demo was made during the stress of moving into an apartment and starting new year of college so 
  //tensions were high and brainwaves were low
  
  //right side
  for (let y = 0; y < fieldHeight; y++){
    beginShape(TRIANGLE_STRIP);
     for (let x = 0; x < fieldWidth; x++){
       gridselect = floor(map(sqrt((x*x)+(y*y)), 0, sqrt((fieldWidth*fieldWidth)+(fieldHeight*fieldHeight)), 85, -25));
       if (gridselect < 0){gridselect = 0}
       freqAmp = map(spectrum[gridselect], 0, 255, 0, 100);
       fill(gridselect, 100, 100);
       //Top of row
       vertex(x*scale + w/2,y*scale, freqAmp);
       //Bottom of row
       gridselect = floor(map(sqrt((x*x)+((y+1)*(y+1))), 0, sqrt((fieldWidth*fieldWidth)+(fieldHeight*fieldHeight)), 85, -25));
       if (gridselect < 0){gridselect = 0}
       freqAmp = map(spectrum[gridselect], 0, 255, 0 , 100);
       fill(gridselect, 100, 100);
       vertex(x*scale + w/2,(y+1)*scale, freqAmp);
    }
    endShape();
  }
  
  //left side
  for (let y = 0; y < fieldHeight; y++){
    beginShape(TRIANGLE_STRIP);
     for (let x = 0; x < fieldWidth; x++){
       gridselect = floor(map(sqrt(((x-fieldWidth)*(x-fieldWidth))+(y*y)), 0, sqrt((fieldWidth*fieldWidth)+(fieldHeight*fieldHeight)), 85, -25));
       if (gridselect < 0){gridselect = 0}
       freqAmp = map(spectrum[gridselect], 0, 255, 0, 100);
       fill(gridselect, 100, 100);
       //Top of row
       vertex((x+1)*scale - w/2,y*scale, freqAmp);
       //Bottom of row
       gridselect = floor(map(sqrt(((x-fieldWidth)*(x-fieldWidth))+((y+1)*(y+1))), 0, sqrt((fieldWidth*fieldWidth)+(fieldHeight*fieldHeight)), 85, -25));
       if (gridselect < 0){gridselect = 0}
       freqAmp = map(spectrum[gridselect], 0, 255, 0 , 100);
       fill(gridselect, 100, 100);
       vertex((x+1)*scale - w/2,(y+1)*scale, freqAmp);
    }
    endShape();
  }

}
