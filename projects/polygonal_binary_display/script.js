// UI
const nodeSlider = document.querySelector("#nodeSlider");
const numberSliders = document.querySelector("#numberSliders").querySelectorAll("number-slider");
const lightDir = Vec2(0.5, 0.5);
let shadowsEnabled = true;


function setNumberSliderMax() {
  numberSliders.forEach(slider => {
    slider.max = Math.pow(2, nodeSlider.value) - 1;
  });
}

function setKValues() {
  kValues = [1];
  for (k = 2; k < nodeSlider.value / 2; k++) {
    if (nodeSlider.value % k != 0) {
      passed = true;
      for (x = 1; x < k; x++) {
        if (Number.isInteger(nodeSlider.value / k * x) && nodeSlider.value / k * x < nodeSlider.value) {
          passed = false;
          break;
        }
      }
      if (passed) kValues.push(k);
    }
  }
}

function setNumberSliderDisplay() {
  for (i = 1; i < numberSliders.length; i++) {
    if (i < kValues.length) numberSliders[i].style.display = "block";
    else numberSliders[i].style.display = "none";
  }
}

function RandomizeValues() {
  let hue = 360 * Math.random();
  COLORS = ["hsl(" + hue + " 20% 25%)", "hsl(" + (hue + 180) + " 20% 50%)", "hsl(" + hue + " 20% 15%)"];

  nodeSlider.value = Math.randInt(nodeSlider.max - 2) + 3;
  nodeSlider.style.setProperty("--background", COLORS[0]);
  nodeSlider.style.setProperty("--foreground", COLORS[1]);

  numberSliders.forEach(slider => {
    slider.max = Math.pow(2, nodeSlider.value) - 1;
    slider.value = Math.randInt(slider.max) + 1;
    slider.style.setProperty("--background", COLORS[0]);
    slider.style.setProperty("--foreground", COLORS[1]);
  });

  setKValues();
  setNumberSliderDisplay();
}

function DrawNode(pos, hollow = false) {
  if (hollow) StrokeCircle(pos, 0.835 * nodeRadius, COLORS[1], 0.33 * nodeRadius);
  else FillCircle(pos, nodeRadius, COLORS[1]);
}
function DrawNodeShadow(pos, hollow = false) {
  if (hollow) StrokeCircle(Vec2.add(pos, Vec2.mul(lightDir, nodeRadius)), 0.835 * nodeRadius, COLORS[3], 0.33 * nodeRadius);
    else FillCircle(Vec2.add(pos, Vec2.mul(lightDir, nodeRadius)), nodeRadius, COLORS[2]);
}

function DrawLine(a, b) {
  let d = Vec2.normalize(Vec2.sub(b, a)).mul(nodeRadius - 1)
  StrokeLine(Vec2.add(a, d), Vec2.sub(b, d), COLORS[1], 0.33 * nodeRadius);
}
function DrawLineShadow(a, b) {
  let d = Vec2.normalize(Vec2.sub(b, a)).mul(nodeRadius - 1)
  StrokeLine(Vec2.add(a, Vec2.mul(lightDir, nodeRadius)).add(d), Vec2.add(b, Vec2.mul(lightDir, nodeRadius)).sub(d), COLORS[2], 0.33 * nodeRadius);
}


// Init
nodeSlider.addEventListener("input", () => {
  setNumberSliderMax();
  setKValues();
  setNumberSliderDisplay();
});
document.addEventListener("keydown", (event) => {
  if (event.key === " ") RandomizeValues();
  if (event.key === "s") shadowsEnabled = !shadowsEnabled;
});
document.addEventListener("touchstart", (event) => {
  if (event.touches.length == 2) RandomizeValues();
});
RandomizeValues();


// Update
function Update() {
  Clear();
  Fill(COLORS[0]);

  N = nodeSlider.value;
  size = Math.min(canvas.width, canvas.height);
  nodeRadius = size / 40;


  if (shadowsEnabled) {
    // Line shadows
    for (i = 0; i < kValues.length; i++) {
      k = kValues[i];

      numberString = parseInt(numberSliders[i].value).toString(2);
      for (j = 0; numberString.length < N; j++) {
        numberString = "0" + numberString;
      }

      for (j = 0; j < N; j++) {
        if (numberString[j] == "1") {
          DrawLineShadow(Vec2.add(canvas.center, Vec2(size / 3, 2 * Math.PI / N * k * j - Math.PI / 2, true)), Vec2.add(canvas.center, Vec2(size / 3, 2 * Math.PI / N * k * (j + 1) - Math.PI / 2, true)));
        }
      }
    }

    // Node shadows
    for (i = 0; i < N; i++) {
      DrawNodeShadow(Vec2.add(canvas.center, Vec2(size / 3, 2 * Math.PI / N * i - Math.PI / 2, true)), i == 0);
    }
  }

  // Lines
  for (i = 0; i < kValues.length; i++) {
    k = kValues[i];

    numberString = parseInt(numberSliders[i].value).toString(2);
    for (j = 0; numberString.length < N; j++) {
      numberString = "0" + numberString;
    }

    for (j = 0; j < N; j++) {
      if (numberString[j] == "1") {
        DrawLine(Vec2.add(canvas.center, Vec2(size / 3, 2 * Math.PI / N * k * j - Math.PI / 2, true)), Vec2.add(canvas.center, Vec2(size / 3, 2 * Math.PI / N * k * (j + 1) - Math.PI / 2, true)));
      }
    }
  }

  // Nodes
  for (i = 0; i < N; i++) {
    DrawNode(Vec2.add(canvas.center, Vec2(size / 3, 2 * Math.PI / N * i - Math.PI / 2, true)), i == 0);
  }
}