const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.style = "position:absolute; top:0px; left:0px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

function UpdateCanvas() {
    canvas.size = new Vec2(canvas.width, canvas.height);
    canvas.center = new Vec2.div(canvas.size, 2);

    if (window.Update != undefined) window.Update();
    requestAnimationFrame(UpdateCanvas);
}
UpdateCanvas();
