// UI
const nodeSlider = document.querySelector("#nodeSlider");
const numberSliders = document.querySelector("#numberSliders").querySelectorAll("number-slider");


function setNumberSliderMax() {
  numberSliders.forEach(slider => {
    slider.max = Math.pow(2, nodeSlider.value) - 1;
  });
}

function setKValues() {
  kValues = [1];
  for (i = 2; i < nodeSlider.value / 2; i++) {
    if (nodeSlider.value % i != 0) kValues.push(i);
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
  COLORS = ["hsl(" + hue + " 20% 25%)", "hsl(" + (hue + 180) + " 20% 50%)"];

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


// Init
nodeSlider.addEventListener("input", () => {
  setNumberSliderMax();
  setKValues();
  setNumberSliderDisplay();
});
document.addEventListener("keydown", (event) => {
  if (event.key === " ") RandomizeValues();
});
document.addEventListener("touchstart", () => {
  RandomizeValues();
});
RandomizeValues();


// Update
function Update() {
  Fill(COLORS[0]);

  N = nodeSlider.value;
  nodeRadius = canvas.height / 40;

  for (i = 0; i < kValues.length; i++) {
    k = kValues[i];

    numberString = parseInt(numberSliders[i].value).toString(2);
    for (j = 0; numberString.length < N; j++) {
      numberString = "0" + numberString;
    }

    for (j = 0; j < N; j++) {
      if (numberString[j] == "1") {
        StrokeLine(Vec2.add(canvas.center, Vec2(canvas.height / 3, 2 * Math.PI / N * k * j - Math.PI / 2, true)), Vec2.add(canvas.center, Vec2(canvas.height / 3, 2 * Math.PI / N * k * (j + 1) - Math.PI / 2, true)), COLORS[1], 0.33 * nodeRadius);
      }
    }
  }

  // Vertices
  for (i = 0; i < N; i++) {
    FillCircle(Vec2.add(canvas.center, Vec2(canvas.height / 3, 2 * Math.PI / N * i - Math.PI / 2, true)), nodeRadius, COLORS[1]);
  }
  FillCircle(Vec2.add(canvas.center, Vec2(0, -canvas.height / 3)), 0.67 * nodeRadius, COLORS[0])
}