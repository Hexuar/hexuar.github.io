// Create Canvas
const canvas = document.createElement("canvas");
const ctx = canvas.getContext("2d");

canvas.style = "position:absolute; top:0px; left:0px"
document.body.appendChild(canvas);

// Main loop
function UpdateCanvas() {
  if(canvas.width != window.innerWidth) canvas.width = window.innerWidth;
  if(canvas.height != window.innerHeight) canvas.height = window.innerHeight;

  if(window.update != undefined) window.update();
  requestAnimationFrame(UpdateCanvas);
}
UpdateCanvas();