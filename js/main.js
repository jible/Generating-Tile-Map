// Author: James Milestone and Jaxon Ruiz

// Globals
let canvasContainer
let world, seed = 0, numRows = 200, numCols = 200;

function setup() {
  canvasContainer = $("#canvas-container");
  const canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");

  $(window).resize(resizeScreen);

  world = new World(numCols, numRows);
  world.generateWorld("noise" , seed);
}

function draw() {
  world.render();
}
