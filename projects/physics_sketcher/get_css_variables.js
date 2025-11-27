let root = document.querySelector(":root");
let rootStyle = getComputedStyle(root);
function getCSSVariable(name) {
    let value = rootStyle.getPropertyValue(name);
    if (!isNaN(Number(value))) return Number(value);
    return value;
}

function DefineGlobalGetter(name, getter) {
    Object.defineProperty(window, name, {get: getter});
}
function DefineCSSGlobal(name, cssname) {
    DefineGlobalGetter(name, () => { return getCSSVariable(cssname); });
}
function DefineCSSGlobalColor(name, cssname) {
    DefineGlobalGetter(name, () => { return Color(getCSSVariable(cssname)); });
}

DefineCSSGlobalColor("BACKGROUND_COLOR", "--background-color");
DefineCSSGlobalColor("DRAW_COLOR", "--draw-color");
DefineCSSGlobal("LINE_WIDTH", "--line-width");
DefineCSSGlobal("TEXT_SIZE", "--text-size");
DefineCSSGlobal("NODE_RADIUS", "--node-radius");

DefineGlobalGetter("PATTERN", () => {
    return CreatePattern((canvas, context) => {
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
});

const TEXT_OFFSET = TEXT_SIZE / 4 + LINE_WIDTH;
const NODE_INACTIVE_RADIUS = NODE_RADIUS / 3;