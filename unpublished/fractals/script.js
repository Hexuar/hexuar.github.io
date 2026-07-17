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

function fractalB(a = Vec2(), b = Vec2(), color, lineWidth, max, n = 0) {
    if(n == 0) {
        StrokeLine(a, b, color, lineWidth);
    }
    if(n >= max) return;

    let c = Vec2.add(a, b).div(2);
    let d = Vec2.sub(c, a).left.mul(Math.sqrt(3)/2).add(Vec2.add(a, c).div(2));
    let e = Vec2.sub(c, b).left.mul(Math.sqrt(3)/2).add(Vec2.add(b, c).div(2));

    StrokeLine(a, d, color, lineWidth);
    StrokeLine(d, c, color, lineWidth);
    StrokeLine(c, e, color, lineWidth);
    StrokeLine(e, b, color, lineWidth);

    fractalB(c, a, color, lineWidth, max, n + 1);
    fractalB(a, d, color, lineWidth, max, n + 1);
    fractalB(d, c, color, lineWidth, max, n + 1);
    fractalB(c, e, color, lineWidth, max, n + 1);
    fractalB(e, b, color, lineWidth, max, n + 1);
    fractalB(b, c, color, lineWidth, max, n + 1);
}

function fractalC(a = Vec2(), b = Vec2(), color, lineWidth, max, n = 0) {
    if(n == 0) {
        StrokeLine(a, b, color, lineWidth);
    }
    if(n >= max) return;

    let c = Vec2.sub(b, a).div(2).left.add(Vec2.add(a, b).div(2));

    StrokeLine(a, c, color, lineWidth);
    StrokeLine(c, b, color, lineWidth);

    fractalC(a, c, color, lineWidth, max, n + 1);
    fractalC(b, c, color, lineWidth, max, n + 1);
}

Fill("black");

let a = Vec2(400, 400);
let b = Vec2.sub(canvas.size, a);
fractalC(a, b, "white", 0.5, 20);