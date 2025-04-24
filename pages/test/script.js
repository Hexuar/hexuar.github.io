const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style = "position:absolute;top:0px;left:0px"
const ctx = canvas.getContext("2d");



ctx.fillStyle = "red";
ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

ctx.fillStyle = "black";
ctx.font = "100px mono";
ctx.fillText("text", 100, 100);

console.log("Hello World!");