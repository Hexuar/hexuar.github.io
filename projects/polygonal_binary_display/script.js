const uiContainer = document.querySelector("#ui");
const nodeSlider = document.querySelector("#nodeSlider");
const numberSliders = document.querySelector("#numberSliders").querySelectorAll("number-slider");

const lightDir = Vec2(0.5, 0.5);
let shadowsEnabled = true;
let uiVisible = true;
let nodeRadius = 0;
let nodePositions = [];
let kValues = [];
let hue = 0;
let targetHue = 0;


// Calculates current allowed k values
function SetKValues() {
    kValues = [1];
    for (k = 2; k < nodeSlider.value / 2; k++) {
        if (nodeSlider.value % k != 0) {
            let passed = true;
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


// Sets slider visibility depending on enabled k values
function SetSliderVisibility() {
    for (i = 1; i < numberSliders.length; i++) {
        if (i < kValues.length) numberSliders[i].style.display = "block";
        else numberSliders[i].style.display = "none";
    }
}


// Get color palette
function GetColor(index) {
    switch (index) {
        case 0:
            return "hsl(" + hue + " 20% 25%)";
        case 1:
            return "hsl(" + (hue + 180) + " 20% 50%)";
        case 2:
            return "hsl(" + hue + " 20% 15%)";
    }
}


// Set css color palette
function SetColors() {
    document.body.style.setProperty("--background", GetColor(0));
    document.body.style.setProperty("--foreground", GetColor(1));
    document.body.style.setProperty("--shadow", GetColor(2));
}


// Randomises colours and slider values
function RandomizeValues() {
    // Colors
    targetHue = hue + 60 * Math.random();

    // Sliders
    nodeSlider.value = Math.randInt(nodeSlider.max - 2) + 3;
    numberSliders.forEach(slider => {
        slider.max = Math.pow(2, nodeSlider.value) - 1;
        slider.value = Math.randInt(slider.max) + 1;
    });

    SetKValues();
    SetSliderVisibility();
}


// Drawing functions with shadows if shadowsEnabled == true
function DrawNode(pos, hollow = false) {
    if (hollow) {
        StrokeCircle(pos, 0.835 * nodeRadius, GetColor(1), 0.33 * nodeRadius, "round", 1);
        if (shadowsEnabled) StrokeCircle(Vec2.add(pos, Vec2.mul(lightDir, nodeRadius)), 0.835 * nodeRadius, GetColor(2), 0.33 * nodeRadius);
    }
    else {
        FillCircle(pos, nodeRadius, GetColor(1), 1);
        if (shadowsEnabled) FillCircle(Vec2.add(pos, Vec2.mul(lightDir, nodeRadius)), nodeRadius, GetColor(2));
    }
}
function DrawLine(a, b) {
    let d = Vec2.normalize(Vec2.sub(b, a)).mul(nodeRadius - 1)
    StrokeLine(Vec2.add(a, d), Vec2.sub(b, d), GetColor(1), 0.33 * nodeRadius, "round", 1);
    if(shadowsEnabled) StrokeLine(Vec2.add(a, Vec2.mul(lightDir, nodeRadius)).add(d), Vec2.add(b, Vec2.mul(lightDir, nodeRadius)).sub(d), GetColor(2), 0.33 * nodeRadius);
}


// Linear interpolation of vectors
function lerp(a, b, t) {
    if (a instanceof Vec2) return Vec2.add(Vec2.mul(a, 1 - t), Vec2.mul(b, t));
    else return (1 - t) * a + t * b;
}


// Event Listeners
nodeSlider.addEventListener("input", () => {
    numberSliders.forEach(slider => {
        slider.max = Math.pow(2, nodeSlider.value) - 1;
    });
    SetKValues();
    SetSliderVisibility();
});
document.addEventListener("keydown", (event) => {
    if (event.key === " ") RandomizeValues();
    if (event.key === "s") {
        shadowsEnabled = !shadowsEnabled;
        if (shadowsEnabled) document.body.style.setProperty("--lightDir", "5px 5px");
        else document.body.style.setProperty("--lightDir", "0px 0px");
    }
    if (event.key === "h") {
        uiVisible = !uiVisible;
        if (uiVisible) uiContainer.style.display = "block";
        else uiContainer.style.display = "none";
    }
});
document.addEventListener("touchstart", (event) => {
    if (event.touches.length == 2) RandomizeValues();
    else if (event.touches.length == 3) shadowsEnabled = !shadowsEnabled;
});


// Init
CreateCanvasLayer();
RandomizeValues();


// Update
function Update(deltaTime) {
    // Clear canvas
    Clear(1);
    Fill(GetColor(0));

    // Interpolate colors
    hue = lerp(hue, targetHue, 10 * deltaTime);
    SetColors();

    // Calculate size
    let size = Math.min(canvas.width, canvas.height);
    nodeRadius = size / 40;

    // Set node positions
    nodePositions = nodePositions.slice(0, nodeSlider.value);
    for (i = 0; i < nodeSlider.value; i++) {
        let target = Vec2.add(canvas.center, Vec2(size / 3, -2 * Math.PI / nodeSlider.value * i - Math.PI / 2, true));
        nodePositions[i] = nodePositions[i] == undefined ? canvas.center : lerp(nodePositions[i], target, 10 * deltaTime);
    }

    // Lines
    for (i = 0; i < kValues.length; i++) {
        k = kValues[i];

        numberString = parseInt(numberSliders[i].value).toString(2);
        for (j = 0; numberString.length < nodeSlider.value; j++) {
            numberString = "0" + numberString;
        }

        for (j = 0; j < nodeSlider.value; j++) {
            if (numberString[nodeSlider.value - 1 - j] == "1") {
                DrawLine(nodePositions[(k * j) % nodeSlider.value], nodePositions[(k * (j + 1)) % nodeSlider.value]);
            }
        }
    }

    // Nodes
    for (i = 0; i < nodeSlider.value; i++) {
        DrawNode(nodePositions[i], i == 0);
    }
}