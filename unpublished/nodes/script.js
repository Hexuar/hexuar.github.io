COLORS = ["#826C7F", "#5D4E60"];

// Node Slider
const nodeSlider = document.getElementById("nodeSlider");
const nodeSliderValue = document.getElementById("nodeSliderValue");

nodeSliderValue.innerHTML = nodeSlider.value;
nodeSlider.addEventListener("input", (e) => {
  nodeSliderValue.innerHTML = nodeSlider.value;
});


// Number Slider
const numberSlider = document.getElementById("numberSlider");
const numberSliderValue = document.getElementById("numberSliderValue");

numberSlider.max = Math.pow(2, nodeSlider.value) - 1;
nodeSlider.addEventListener("input", (e) => {
  numberSlider.max = Math.pow(2, nodeSlider.value) - 1;
  numberSliderValue.innerHTML = numberSlider.value;
});

numberSliderValue.innerHTML = numberSlider.value;
numberSlider.addEventListener("input", (e) => {
  numberSliderValue.innerHTML = numberSlider.value;
});


function Update() {
  Fill(COLORS[0]);

  N = nodeSlider.value;
  nodeRadius = canvas.height / 40;
  numberString = parseInt(numberSlider.value).toString(2);
  for (i = 0; numberString.length < N; i++) {
    numberString = "0" + numberString;
  }

  for (i = 0; i < N; i++) {
    if (numberString[i] == "1") {
      StrokeLine(Vec2.add(canvas.center, Vec2(canvas.height / 3, 2 * Math.PI / N * i - Math.PI / 2, true)), Vec2.add(canvas.center, Vec2(canvas.height / 3, 2 * Math.PI / N * (i + 1) - Math.PI / 2, true)), COLORS[1], 0.33 * nodeRadius);
    }
  }

  for (i = 0; i < N; i++) {
    FillCircle(Vec2.add(canvas.center, Vec2(canvas.height / 3, 2 * Math.PI / N * i - Math.PI / 2, true)), nodeRadius, COLORS[1]);
  }

  FillCircle(Vec2.add(canvas.center, Vec2(0, -canvas.height / 3)), 0.67 * nodeRadius, COLORS[0])
}