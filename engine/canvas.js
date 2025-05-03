const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.style = "position:absolute; top:0px; left:0px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.appendChild(canvas);

function UpdateCanvas() {
    //if(canvas.width != window.innerWidth) canvas.width = window.innerWidth;
    //if(canvas.height != window.innerHeight) canvas.height = window.innerHeight;

    canvas.size = new Vector2(canvas.width, canvas.height);
    canvas.center = new Vector2.divide(canvas.size, 2);

    if (window.Update != undefined) window.Update();
    requestAnimationFrame(UpdateCanvas);
}
UpdateCanvas();
