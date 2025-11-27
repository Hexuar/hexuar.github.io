let root = document.querySelector(":root");
let rootStyle = getComputedStyle(root);
function getCSSVariable(name) {
    let value = rootStyle.getPropertyValue(name);
    if (!isNaN(Number(value))) return Number(value);
    return value;
}

const BACKGROUND_COLOR = Color(getCSSVariable("--background-color"));
const DRAW_COLOR = Color(getCSSVariable("--draw-color"));

const LINE_WIDTH = getCSSVariable("--line-width");
const TEXT_SIZE = getCSSVariable("--text-size");
const TEXT_OFFSET = TEXT_SIZE / 4 + LINE_WIDTH;

const NODE_RADIUS = getCSSVariable("--node-radius");
const NODE_INACTIVE_RADIUS = NODE_RADIUS / 3;

const PATTERN = CreatePattern((canvas, context) => {
    canvas.width = 10;
    canvas.height = 10;
    context.lineWidth = 1;
    context.strokeStyle = DRAW_COLOR;
    context.fillStyle = Color.setAlpha(DRAW_COLOR, 0.1);
    context.fillRect(0, 0, 10, 10);
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(10, 10);
    context.stroke();
});