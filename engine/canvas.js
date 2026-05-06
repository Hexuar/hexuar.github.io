const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.style = "position:absolute; top:0px; left:0px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

let oldTime = 0;
let time;

function UpdateCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.size = new Vec2(canvas.width, canvas.height);
    canvas.center = new Vec2.div(canvas.size, 2);

    let time = new Date().getTime();
    let deltaTime = (time - oldTime)/1000;
    oldTime = time;

    if (window.Update != undefined) window.Update(deltaTime);
    requestAnimationFrame(UpdateCanvas);
}
UpdateCanvas();
