const color = "hsl(389.7748540242311 20% 50%)";
let t = 0;

document.addEventListener("keydown", (event) => {
  if (event.key === " ") {
    t = 0.0001;
  }
});


function smoothstep(t) {
  return t * t * (3 - 2 * t);
}


function lerp(a, b, t) {
  return Vec2.add(Vec2.mul(a, 1 - t), Vec2.mul(b, t));
}

function smerp(a, b, t) {
  return lerp(a, b, smoothstep(t));
}

function qerp(a, b, t) {
  return lerp(a, b, t * t);
}


function Update(deltaTime) {
  Fill("hsl(209.77485402423108 20% 25%)");

  if (t < 1 && t > 0) {
    t += deltaTime;
  }
  if (t > 1) t = 1;

  let A = Vec2(0.1 * canvas.width, canvas.height / 2);
  let B = Vec2(0.9 * canvas.width, canvas.height / 2);

  FillCircle(smerp(A, B, t), 25, color);
  StrokeLine(A, B, color, 10, "round");
}