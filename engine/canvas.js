let canvasLayers = [];
function CreateCanvasLayer() {
    let canvas = document.createElement("canvas");

    canvas.style = "position:absolute; top:0px; left:0px";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    document.body.appendChild(canvas);
    canvasLayers.push(canvas);
    return canvas;
}

function UseCanvas(canvas) {
    canvas = canvas;
    ctx = canvas.getContext("2d");
}

let canvas = CreateCanvasLayer();
let ctx = canvas.getContext("2d");

let oldTime = 0;

function UpdateCanvas(timestamp) {
    canvasLayers.forEach(canvas => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.size = new Vec2(canvas.width, canvas.height);
        canvas.center = new Vec2.div(canvas.size, 2);
    });

    let deltaTime = (timestamp - oldTime)/1000;
    oldTime = timestamp;

    if (window.Update != undefined) window.Update(deltaTime);
    requestAnimationFrame(UpdateCanvas);
}
UpdateCanvas();
