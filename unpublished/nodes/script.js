// Random Palette
let hue = 360 * Math.random();
const COLORS = ["hsl("+ hue + " 20% 25%)", "hsl(" + (hue + 180) + " 20% 50%)"]


// UI
const nodeSlider = document.querySelector("#nodeSlider");
const numberSlider = document.querySelector("#numberSlider");

numberSlider.max = Math.pow(2, nodeSlider.value) - 1;
nodeSlider.addEventListener("input", () => {
  numberSlider.max = Math.pow(2, nodeSlider.value) - 1;
});


// Update
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