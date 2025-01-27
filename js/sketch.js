// sketch.js - prototype underground room generation
// Author: James Milestone and Jaxon Ruiz
// Date: 1/23/25

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
let numRows = 20;
let numCols = 20;
var tileSize = 16;
// let asciiBox = document.getElementById("asciiBox");
let world;

function resizeScreen() {
  centerHorz = canvasContainer.width() / 2; // Adjusted for drawing logic
  centerVert = canvasContainer.height() / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size

  // $("#asciiBox").height(
  //   $("canvas").height() - parseInt($("#asciiBox").css("padding")) * 2
  // );
  // $("#asciiBox").width(
  //   $("canvas").width() - parseInt($("#asciiBox").css("padding")) * 2
  // );
}

function gridToString(grid) {
  let rows = [];
  for (let i = 0; i < grid.length; i++) {
    rows.push(grid[i].join(""));
  }
  return rows.join("\n");
}

function stringToGrid(str) {
  let grid = [];
  let lines = str.split("\n");
  for (let i = 0; i < lines.length; i++) {
    let row = [];
    let chars = lines[i].split("");
    for (let j = 0; j < chars.length; j++) {
      row.push(chars[j]);
    }
    grid.push(row);
  }
  return grid;
}



// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");


  $(window).resize(function () {
    resizeScreen();
  });
  resizeScreen();

  world = new World(numCols, numRows);
  world.grid_to_string()
  // world.genMethodDrop(100,50,25)
  world.generateNoise();
  world.render();
  // asciiBox.value = world.grid_to_string();

  // asciiBox.oninput = function () {
  //   world.string_to_grid(asciiBox.value);
  //   console.log("value changed");
  //   renderWorld(world);
  // };
}

let adjust = 0
function draw() {
  adjust += 0.01;
  world.generateNoise();
  world.render();
}

// mousePressed() function is called once after every time a mouse button is pressed
function mousePressed() {
  // code to run when mouse is pressed
}
