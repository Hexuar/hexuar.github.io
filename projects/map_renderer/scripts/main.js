// Initiate Canvases
const canvas = document.getElementById('mainCanvas');
const ctx = canvas.getContext('2d');


let canvasPos = {x:0, y:0};
let canvasScale = 1;
let maxCanvasScale = 10;
let minCanvasScale = 0.25;
let zoomMultiplier = 20;
let movementSpeedSlider = document.getElementById('movementSpeedSlider');
let movementSpeed = parseInt(movementSpeedSlider.value);


// Draw Modes
let drawTerrain = true;
let drawSimpleTerrain = false;
let drawProvinces = false;
let drawShadows = true;
let drawBorders = false;


function load() {
    canvas.width = provinceMap.width;
    canvas.height = provinceMap.height;

    drawMap();
}


function drawMap() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.filter = 'brightness(150%) contrast(90%)';

    if(drawTerrain) ctx.drawImage(waterMap, 0, 0);
    if(drawTerrain) ctx.drawImage(landColorMap, 0, 0);
    if(drawSimpleTerrain) ctx.drawImage(terrainMap, 0, 0);

    ctx.filter = 'none';

    if(drawProvinces) ctx.drawImage(provinceMap, 0, 0);
    if(drawShadows) ctx.drawImage(shadeMap, 0, 0);
    if(drawBorders) ctx.drawImage(borderMap, 0, 0);
}

function loop() {
    update();
    inputloop();
    window.requestAnimationFrame(loop);
}
loop();


function update() {

    // Set movement speed depending on zoom level
    movementSpeed = parseInt(movementSpeedSlider.value) / canvasScale;

    // Movement
    if(keyboard.held('w') || keyboard.held('ArrowUp')) canvasPos.y += movementSpeed;
    if(keyboard.held('a') || keyboard.held('ArrowLeft')) canvasPos.x += movementSpeed;
    if(keyboard.held('s') || keyboard.held('ArrowDown')) canvasPos.y -= movementSpeed;
    if(keyboard.held('d') || keyboard.held('ArrowRight')) canvasPos.x -= movementSpeed;

    // scale & transform origin
    if(canvasScale < maxCanvasScale && mouse.scroll == -1) canvasScale -= (mouse.scroll * canvasScale / zoomMultiplier);
    if(canvasScale > minCanvasScale && mouse.scroll == 1) canvasScale -= (mouse.scroll * canvasScale / zoomMultiplier);
    let transformOrigin = {x:-canvasPos.x + window.innerWidth / 2, y:-canvasPos.y + window.innerHeight / 2}

    // Set canvas style
    canvas.style['transform-origin'] = transformOrigin.x + 'px ' + transformOrigin.y + 'px';
    canvas.style.transform = 'translate('+ canvasPos.x +'px, '+ canvasPos.y +'px) scale('+ canvasScale +')';
}