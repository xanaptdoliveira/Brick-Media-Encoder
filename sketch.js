//p5.disableFriendlyErrors = true;

/**/
let canvas = {
  ncells: 32,
  cell_size: 20,
  px: 100,
  py: 100,
  gridstroke: 0.1,
};

let pgCanvas;

let myBrickTemplate;
let bricks = [];
let beingDragged = false;

let colors = [
  "#000000", "#b31004", "#f47b30", "#f2cd37", "#bbe90b", "#4b9f4a", "#61afff", "#2032b0"
];

let color_names = [
  'black', 'red', 'orange', 'yellow', 'lime', 'green', 'blue', 'dark-blue'
];

let c = "#b31004";
let c_name = "red";
let mode = 1; // IMG AND COLOR (inside brick)
let w_mode = 2; // Starting WIDTH
let h_mode = 2; // Starting HEIGHT
var whatDrag = -1;
let state = 0;
var legoSelection = -1;
var imgs = [];


var lineString = [];
let n_drawing_modes = 11;

function preload() {
  for (let i = 1; i <= 7; i++) {
    imgs[i] = loadImage("imgs/set2/img" + i + ".jpg");
  }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(25);

  // Canvas: Create Canvas as pgraphic
  pgCanvas = createGraphics(
    canvas.ncells * canvas.cell_size,
    canvas.ncells * canvas.cell_size
  );

  // Canvas: Center the canvas to the window
  canvas.px = windowWidth / 2 - (canvas.ncells * canvas.cell_size) / 2;
  canvas.py = windowHeight / 2 - (canvas.ncells * canvas.cell_size) / 2;

  /* GUI */
  GUI = {
    px: windowWidth - 230,
    py: 30,
  };

  setupGUI();
  buttons();

  /* Bricks */
  myBrickTemplate = {
    x: canvas.px,
    y: canvas.py,
    width: w_mode,
    height: h_mode,
    rotation: 0,
    color: c,
    image: mode,
    c_name: c_name,
    maxW: 2,
    maxH: 10
  };
}

function draw() {
  background(UIcolors.bg);
  drawCanvas();
  drawGUI();
  buttons();


  for (var i = 0; i < bricks.length; i++) {
    bricks[i].over();
    bricks[i].updatePosition();

    if (state == 0) {
      bricks[i].drawBrick();
    } else if (state == 1) {
      bricks[i].drawMedia();
    } else {

    }

  }

  if (state >= 2) {
    saveLineString(colors.length);
    figuras = graphics();

    figuras.forEach(element => console.log(element));
    console.log("figuras: " + figuras);
  }
}

function mousePressed() {
  // Select Lego
  for (var i = 0; i < bricks.length; i++) {
    if (bricks[i].collision(mouseX, mouseY)) {
      legoSelection = i;
    }
  }

  // Button functions in gui.js

  // TOGGLE GRID Button
  if (d1 < UIbutton.size) {
    bttn1 = !bttn1;
  }

  // TOGGLE DARK/LIGHT MODE Button
  if (d2 < UIbutton.size) {
    bttn2 = !bttn2;
  }

  // Clear Canvas Button
  if (d3 < UIbutton.size) {
    bttn3col = UIbutton.color_pressed;
    clearCanvas();
  }
}

function mouseReleased() {
  legoSelection = -1;
}

function mouseDragged() {
  if (legoSelection != -1) {
    bricks[legoSelection].x = mouseX;
    bricks[legoSelection].y = mouseY;
  }
}

function keyPressed() {

  if (keyCode === 83) { // if "s" is pressed
    saveForPrint("sketch.jpg", "A2", 300);
    /*saveForPrint("sketch.jpg", "A3", 300, 10); // save 10 frames*/
  }

  if (key == "m") {
    state = (state + 1) % n_drawing_modes;
  }

  if (key == "n") {
    addNewBrick();
  }

  //IMAGE AND COLOR
  if (key == "c") {
    mode = ((mode + 1) % imgs.length);
    if (mode == 0) mode = 1;
    c = colors[mode];
    c_name = color_names[mode];
  }

  // LARGURA
  if (keyCode === LEFT_ARROW) { // diminui altura
    if (w_mode > 1 && w_mode <= myBrickTemplate.maxW) {
      w_mode--;
    }
  }

  if (keyCode === RIGHT_ARROW) { // aumenta altura
    if (w_mode > 0 && w_mode < myBrickTemplate.maxW) {
      w_mode++;
    }
  }


  if (key == "r") { // ROTATE FALTA
    for (var i = 0; i < bricks.length; i++) {
      bricks[i].snapToGrid();
    }
  }

  // ALTURA
  if (keyCode === UP_ARROW) { // diminui altura
    if (h_mode > 1 && h_mode <= myBrickTemplate.maxH) {
      h_mode--;
    }
  }

  if (keyCode === DOWN_ARROW) { // aumenta altura
    if (h_mode > 0 && h_mode < myBrickTemplate.maxH) {
      h_mode++;
    }
  }

}

function addNewBrick() {
  bricks.push(
    new Brick(
      mouseX,
      mouseY,
      w_mode,
      h_mode,
      myBrickTemplate.rotation,
      c,
      mode
    ));

  for (var i = 0; i < bricks.length; i++) {
    bricks[i].snapToGrid();
  }
}

//---- Buttons
function buttons() {
  // TOGGLE GRID Button
  if (bttn1 == true) { // if bttnOn is true, show grid and change color of button
    showGrid = true;
    if (d1 < UIbutton.size) {
      bttn1col = UIbutton.color_hovered;
    } else {
      bttn1col = UIbutton.color_off;
    }
  } else if (bttn1 == false) {
    showGrid = false;
    if (d1 < UIbutton.size) {
      bttn1col = UIbutton.color_hovered;
    } else {
      bttn1col = UIbutton.color_on;
    }
  }

  // TOGGLE DARK/LIGHT MODE Button
  if (bttn2 == true) {
    darkMode = true;
    if (d2 < UIbutton.size) {
      bttn2col = UIbutton.color_hovered;
    } else {
      bttn2col = UIbutton.color_off;
    }
  } else if (bttn2 == false) {
      darkMode = false;
      if (d2 < UIbutton.size) {
        bttn2col = UIbutton.color_hovered;
      } else {
        bttn2col = UIbutton.color_on;
      }
    }

  if (darkMode == true) UIcolors = UIcolorsDarkMode;
  else if (darkMode == false) UIcolors = UIcolorsLightMode;

  // Clear Canvas Button
  if (d3 < UIbutton.size && mousePressed == false) {
    bttn3col = UIbutton.color_hovered;
  } else {
    bttn3col = UIbutton.color_off;
  }

  if (d1 < UIbutton.size || d2 < UIbutton.size || d3 < UIbutton.size) {
    cursor("POINTER");
  } else {
    cursor("AUTO");
  }
}

function clearCanvas() {
  bricks = [];
}

function drawCanvas() {
  if (showGrid == true) {
    pgCanvas.background(UIcolors.canvas1_bg);
    pgCanvas.noFill();
    pgCanvas.stroke(UIcolors.gridcolor);
    pgCanvas.strokeWeight(canvas.gridstroke);

    for (let x = 0; x < canvas.ncells; x++) {
      for (let y = 0; y < canvas.ncells; y++) {
        pgCanvas.rect(
          canvas.cell_size * x,
          canvas.cell_size * y,
          canvas.cell_size,
          canvas.cell_size
        );
      }
    }
    push();
    translate(canvas.px, canvas.py);
    image(pgCanvas, 0, 0);
    pop();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvas.px = windowWidth / 2 - (canvas.ncells * canvas.cell_size) / 2;
  canvas.py = windowHeight / 2 - (canvas.ncells * canvas.cell_size) / 2;
}

saveForPrint("sketch.jpg", "A3", 300);
