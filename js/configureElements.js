// Configure buttons
let regenButton, cleanUpButton, smoothButton, methodSelect, gradientButton, currentMethod = "noise"
gradientButton = document.getElementById("gradient")
regenButton = document.getElementById("regen");
cleanUpButton = document.getElementById("cleanUp");
smoothButton = document.getElementById("smooth");

// Set up responses
gradientButton.addEventListener('click', applyGradient)
regenButton.addEventListener('click', regenerateWorld);
cleanUpButton.addEventListener('click', cleanUpWorld);
smoothButton.addEventListener('click', smoothWorld);


function applyGradient(){
    world.applyGradient()
}

function resizeScreen() {
    const centerHorz = canvasContainer.width() / 2;
    const centerVert = canvasContainer.height() / 2;
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
}

function regenerateWorld() {
    seed++;
    world.generateWorld(currentMethod,Math.floor(Math.random(seed) * 100));
}

function cleanUpWorld() {
    world.cleanUp();
}

function smoothWorld() {
    world.applySmooth();
}