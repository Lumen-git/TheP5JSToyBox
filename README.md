# TheToyBox
#### Various demos I've made while learning p5js, matter.js and other JavaScript tools.

Very heavily based on classic math/cs demos, games, and good ol' Coding Train :)
Below is a list of each demo, in order of completion, and a description of what they do.

-------

<dl>
<dt>FlyOver</dt>
<dd>FlyOver is a demo of <a href='https://en.wikipedia.org/wiki/Perlin_noise'> Perlin Noise</a> being used to create simple terrain. The terrain was done with heavy guidance from the Coding Train video on the subject, but the flying ship was does separately. It uses Perlin Noise to move left and right, and a delta value to tilt in the direction of the movement.</dd>
<dt>Game Of Life</dt>
<dd>A demo of <a href'https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life'>Conway's Game of Life</a>. This is something I wanted to pull off ever since I began learning CS, but never really had the means to do. Being able to do it as my second demo in p5js? I gotta say, it feels pretty good. It's simple, but it's something I love. This is a demo that follows the standard rules, but treats the outer ring of cells as always alive to avoid having to deal with index out of bound errors. Maybe not the cleanest solution, but it works, and for a demo and a lesson, I'll take it.</dd>
<dt>2DLorenz</dt>
<dd>A 2D plotting of the <a href='https://en.wikipedia.org/wiki/Lorenz_system'>Lorenz System</a> to produce the famous Lorenz Attractor. Technically, the attractor is 3D, but for the sake of learning I figured I should start small, then revisit this in 3D later.</dd>
<dt>Powders</dt>
<dd>This is a powder toy with 3 types: powder, water, and brick (and erase). Hitting the P, W, B and E keys switches between them. Brick doesn't move, powder moves down or downwards at a diagonal, and water moves down or left or right. This demo is far from perfect, but given the fact it's only my 4th, I think it's at a good stage to publish and return to later. The biggest problem is the bias everything has to the left. I believe this is because of the way the program scans the pixels to move the sand, and is likely a common fix given all the powder toys out there. Another is the fact pixels seem to clearly move left, but teleport right. I'm yet to determine if this is a graphical error or part of the processing of the grid. There a few more things I'd like to add (more types, buttons to change powder), but I think this is in a perfect state to have for now and improve later. A nice little marker of personal progress. Based on similar simulations such as <a href='https://dan-ball.jp/en/javagame/dust/'>Dan Ball's Powder Game</a></dd>
<dt>WireWorld</dt>
<dd>A recreation of the <a href='https://en.wikipedia.org/wiki/Wireworld'>wireworld cellular automaton</a> in p5js. This only has 3 types, only two of which the user can actually use. Metal conducts electricity, spark acts as electricity, and tail helps the flow of electricity. If metal has 1 or 2 sparks around it, it becomes spark. Spark becomes tail, and tail becomes metal. This demo is the first time I made a custom function in p5js, and also may have the fix for the previous problems in Powders.</dd>
  <dt>AdvancedWireWorld</dt>
  <dd>Same as WireWorld, but with FPS control, DOM elements to give the user some context, and 2 custom elements</dd>
  </dl>
