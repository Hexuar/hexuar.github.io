function StrokeLine(posA, posB, style, lineWidth, lineCap) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    ctx.beginPath();
    ctx.moveTo(posA.x, posA.y);
    ctx.lineTo(posB.x, posB.y);
    ctx.stroke();
}

function StrokeArc(pos, radius, startAngle, endAngle, style, lineWidth, lineCap) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, startAngle, endAngle);
    ctx.stroke();
}

function FillArc(pos, radius, startAngle, endAngle, style) {
    ctx.fillStyle = style;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, startAngle, endAngle);
    ctx.fill();
}

function StrokeCircle(pos, radius, style, lineWidth, lineCap) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.stroke();
}

function FillCircle(pos, radius, style) {
    ctx.fillStyle = style;

    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    ctx.fill();
}

function StrokeTriangle(posA, posB, posC, style, lineWidth) {
    ctx.strokeStyle = style;

    ctx.beginPath();
    ctx.moveTo(posA.x, posA.y);
    ctx.lineTo(posB.x, posB.y);
    ctx.lineTo(posC.x, posC.y);
    ctx.lineTo(posA.x, posA.y);
    ctx.stroke();
}

function FillTriangle(posA, posB, posC, style) {
    ctx.fillStyle = style;

    ctx.beginPath();
    ctx.moveTo(posA.x, posA.y);
    ctx.lineTo(posB.x, posB.y);
    ctx.lineTo(posC.x, posC.y);
    ctx.lineTo(posA.x, posA.y);
    ctx.fill();
}

function StrokeRectangle(pos, size, style, lineWidth, lineCap) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    ctx.beginPath();
    ctx.strokeRect(pos.x, pos.y, size.x, size.y);
}

function FillRectangle(pos, size, style) {
    ctx.fillStyle = style;

    ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

function Fill(style) {
    ctx.fillStyle = style;

    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function StrokePolygon(points, style, lineWidth, lineCap) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.stroke();
}

function FillPolygon(points, style) {
    ctx.fillStyle = style;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++) {
        ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.lineTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.fill();
}

function StrokeRegularPolygon(pos, corners, size, style, lineWidth, lineCap) {
    ctx.strokeStyle = style;
    ctx.lineWidth = lineWidth;
    ctx.lineCap = lineCap;

    let a = 2 * Math.PI / corners;

    ctx.beginPath();

    ctx.moveTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    for(let i = 0; i < corners; i++) {
        ctx.lineTo(pos.x + Math.sin(Math.PI - i*a) * size, pos.y + Math.cos(Math.PI - i*a) * size);
    }
    ctx.lineTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    ctx.lineTo(pos.x + size * Math.sin(Math.PI - 1*a), pos.y + size * Math.cos(Math.PI - 1*a));

    ctx.stroke();
}

function FillRegularPolygon(pos, corners, size, style) {
    ctx.fillStyle = style;

    let a = 2 * Math.PI / corners;

    ctx.beginPath();

    ctx.moveTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    for(let i = 0; i < corners; i++) {
        ctx.lineTo(pos.x + Math.sin(Math.PI - i*a) * size, pos.y + Math.cos(Math.PI - i*a) * size);
    }
    ctx.lineTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    ctx.lineTo(pos.x + size * Math.sin(Math.PI - 1*a), pos.y + size * Math.cos(Math.PI - 1*a));

    ctx.fill();
}

function StrokeText(pos, text, size, style, lineWidth, lineCap, font = "monospace") {
  ctx.strokeStyle = style;
  ctx.lineWidth = lineWidth;
  ctx.lineCap = lineCap;
  ctx.font = size + "px " + font;

  ctx.strokeText(text, pos.x, pos.y);
}

function FillText(pos, text, size, style, font = "monospace") {
  ctx.fillStyle = style;
  ctx.font = size + "px " + font;

  ctx.fillText(text, pos.x, pos.y);
}

function StrokeVector(vector, pos = new Vec2(), style, size = 5) {
    let u = vector.normalize()

    // Calculates positions
    let posB = Vec2.add(pos, vector);
    let posC = Vec2.add(Vec2.add(pos, Vec2.sub(vector, Vec2.mul(u, 2 * size))), Vec2.mul(u.left, size));
    let posD = Vec2.sub(Vec2.add(pos, Vec2.sub(vector, Vec2.mul(u, 2 * size))), Vec2.mul(u.left, size));

    // Line
    ctx.strokeStyle = style;
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    ctx.lineTo(posB.x, posB.y);
    ctx.stroke();

    // Triangle
    ctx.fillStyle = style;
    ctx.beginPath();
    ctx.moveTo(posB.x, posB.y);
    ctx.lineTo(posC.x, posC.y);
    ctx.lineTo(posD.x, posD.y);
    ctx.lineTo(posB.x, posB.y);
    ctx.fill();
}