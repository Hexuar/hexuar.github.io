function fractalA(a = Vec2(), b = Vec2(), color, max, n = 0) {
    if (n == 0) {
        StrokeLine(a, b, color);
    }
    if (n >= max) return;

    let c = Vec2.sub(a, b).left.div(2).add(a);
    let d = Vec2.sub(b, a).left.div(2).add(b);

    StrokeLine(a, c, color);
    StrokeLine(b, d, color);

    fractalA(a, c, color, max, n + 1);
    fractalA(b, d, color, max, n + 1);
}

function Update() {
    Fill("black");

    let a = Vec2(400, 400);
    let b = Vec2.sub(canvas.size, a);
    fractalA(a, b, "white", 10);
}