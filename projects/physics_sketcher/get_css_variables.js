let rootStyle = getComputedStyle(document.querySelector(":root"));
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
    let pattern = svgCanvas.getElementsByTagName("pattern")[0];
    if (pattern != null) pattern.remove();
    CreateSVGPattern(svgCanvas, "pattern", 10, 10, (pattern) => {
        CreateSVGRect(pattern, Vec2(), Vec2(10, 10), Vec2(), Color.setAlpha(DRAW_COLOR, 0.1));
        CreateSVGLine(pattern, Vec2(0, 0), Vec2(10, 10), DRAW_COLOR, 1);
        CreateSVGLine(pattern, Vec2(-10, 0), Vec2(10, 20), DRAW_COLOR, 1);
        CreateSVGLine(pattern, Vec2(0, -10), Vec2(20, 10), DRAW_COLOR, 1);
    });
    return "url(#pattern)";
});

const TEXT_OFFSET = TEXT_SIZE / 4 + LINE_WIDTH;
const NODE_INACTIVE_RADIUS = NODE_RADIUS / 3;