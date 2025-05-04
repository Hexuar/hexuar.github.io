let Draw = new class {
    constructor() {
        this.ctx = null;
        this.canvas = null;
        this.layers = [];
    }
    AddLayer(id, zIndex = this.layers.length) {
        let canvas = document.createElement("canvas");
        this.canvas = canvas;
        this.ctx = canvas.getContext("2d"); 

        canvas.style = "position: absolute; top: 0px; left: 0px; image-rendering: pixelated;"
        canvas.id = id;
        canvas.style.zIndex = zIndex;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas.size = new Vector2(canvas.width, canvas.height);

        document.body.appendChild(canvas);
        this.layers.push(canvas);
    }
    SetLayer(id) {
        let canvas = document.getElementById(id);

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");  
    }
}

function StrokeLine(posA, posB, style, lineWidth) {
    Draw.ctx.lineWidth = lineWidth;
    Draw.ctx.strokeStyle = style;

    Draw.ctx.beginPath();
    Draw.ctx.moveTo(posA.x, posA.y);
    Draw.ctx.lineTo(posB.x, posB.y);
    Draw.ctx.stroke();
}

function StrokeBezierCurve(start, cp1, cp2, end, style, lineWidth) {
    Draw.ctx.lineWidth = lineWidth;
    Draw.ctx.strokeStyle = style;

    Draw.ctx.beginPath();
    Draw.ctx.moveTo(start.x, start.y);
    Draw.ctx.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
    Draw.ctx.stroke();
}

function StrokeArc(pos, radius, startAngle, endAngle, style, lineWidth) {
    Draw.ctx.lineWidth = lineWidth;
    Draw.ctx.strokeStyle = style;

    Draw.ctx.beginPath();
    Draw.ctx.arc(pos.x, pos.y, radius, startAngle, endAngle);
    Draw.ctx.stroke();
}

function FillArc(pos, radius, startAngle, endAngle, style) {
    Draw.ctx.fillStyle = style;
    
    Draw.ctx.beginPath();
    Draw.ctx.arc(pos.x, pos.y, radius, startAngle, endAngle);
    Draw.ctx.fill();
}

function StrokeCircle(pos, radius, style, lineWidth) {
    Draw.ctx.lineWidth = lineWidth;
    Draw.ctx.trokeStyle = style;

    Draw.ctx.beginPath();
    Draw.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    Draw.ctx.stroke();
}

function FillCircle(pos, radius, style) {
    Draw.ctx.fillStyle = style;

    Draw.ctx.beginPath();
    Draw.ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI);
    Draw.ctx.fill();
}

function StrokeTriangle(posA, posB, posC, style, lineWidth) {
    Draw.ctx.strokeStyle = style;
    
    Draw.ctx.beginPath();
    Draw.ctx.moveTo(posA.x, posA.y);
    Draw.ctx.lineTo(posB.x, posB.y);
    Draw.ctx.lineTo(posC.x, posC.y);
    Draw.ctx.lineTo(posA.x, posA.y);
    Draw.ctx.stroke();
}

function FillTriangle(posA, posB, posC, style) {
    Draw.ctx.fillStyle = style;
    
    Draw.ctx.beginPath();
    Draw.ctx.moveTo(posA.x, posA.y);
    Draw.ctx.lineTo(posB.x, posB.y);
    Draw.ctx.lineTo(posC.x, posC.y);
    Draw.ctx.lineTo(posA.x, posA.y);
    Draw.ctx.fill();
}

function StrokeRectangle(pos, size, style, lineWidth) {
    Draw.ctx.lineWidth = lineWidth;
    Draw.ctx.strokeStyle = style;
    
    Draw.ctx.beginPath();
    Draw.ctx.strokeRect(pos.x, pos.y, size.x, size.y);
}

function FillRectangle(pos, size, style) {
    Draw.ctx.fillStyle = style;

    Draw.ctx.fillRect(pos.x, pos.y, size.x, size.y);
}

function Fill(style) {
    Draw.ctx.fillStyle = style;

    Draw.ctx.fillRect(0, 0, Draw.canvas.width, Draw.canvas.height);
}

function Clear() {
    Draw.ctx.clearRect(0, 0, Draw.canvas.width, Draw.canvas.height);
}

function StrokePolygon(points, style, lineWidth) {
    Draw.ctx.strokeStyle = style;
    Draw.ctx.lineWidth = lineWidth;

    Draw.ctx.beginPath();
    Draw.ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++) {
        Draw.ctx.lineTo(points[i].x, points[i].y);
    }
    Draw.ctx.lineTo(points[0].x, points[0].y);
    Draw.ctx.lineTo(points[1].x, points[1].y);
    Draw.ctx.stroke();
}

function FillPolygon(points, style) {
    Draw.ctx.fillStyle = style;

    Draw.ctx.beginPath();
    Draw.ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++) {
        Draw.ctx.lineTo(points[i].x, points[i].y);
    }
    Draw.ctx.lineTo(points[0].x, points[0].y);
    Draw.ctx.lineTo(points[1].x, points[1].y);
    Draw.ctx.fill();
}

function StrokeRegularPolygon(pos, corners, size, style, lineWidth) {
    Draw.ctx.strokeStyle = style;
    Draw.ctx.lineWidth = lineWidth;

    let a = 2 * Math.PI / corners;

    Draw.ctx.beginPath();

    Draw.ctx.moveTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    for(let i = 0; i < corners; i++) {
        Draw.ctx.lineTo(pos.x + Math.sin(Math.PI - i*a) * size, pos.y + Math.cos(Math.PI - i*a) * size);
    }
    Draw.ctx.lineTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    Draw.ctx.lineTo(pos.x + size * Math.sin(Math.PI - 1*a), pos.y + size * Math.cos(Math.PI - 1*a));

    Draw.ctx.stroke();
}

function FillRegularPolygon(pos, corners, size, style) {
    Draw.ctx.fillStyle = style;

    let a = 2 * Math.PI / corners;

    Draw.ctx.beginPath();

    Draw.ctx.moveTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    for(let i = 0; i < corners; i++) {
        Draw.ctx.lineTo(pos.x + Math.sin(Math.PI - i*a) * size, pos.y + Math.cos(Math.PI - i*a) * size);
    }
    Draw.ctx.lineTo(pos.x + size * Math.sin(Math.PI), pos.y + size * Math.cos(Math.PI));
    Draw.ctx.lineTo(pos.x + size * Math.sin(Math.PI - 1*a), pos.y + size * Math.cos(Math.PI - 1*a));

    Draw.ctx.fill();
}

function FillText(text, pos, size, style = "black", font, maxWidth) {
    Draw.ctx.fillStyle = style;
    Draw.ctx.font = size + "px " + font;
    Draw.ctx.fillText(text, pos.x, pos.y, maxWidth);
}

function StrokeText(text, pos, size, style = "black", font, maxWidth) {
    Draw.ctx.strokeStyle = style;
    Draw.ctx.font = size + "px " + font;
    Draw.ctx.strokeText(text, pos.x, pos.y, maxWidth);
}

function StrokeVector(vector, pos = new Vector2(), style, size = 5) {
    let u = vector.normalize()

    // Calculates positions
    let posB = Vector2.add(pos, vector);
    let posC = Vector2.add(Vector2.add(pos, Vector2.subtract(vector, Vector2.multiply(u, 2 * size))), Vector2.multiply(u.normal(), size));
    let posD = Vector2.subtract(Vector2.add(pos, Vector2.subtract(vector, Vector2.multiply(u, 2 * size))), Vector2.multiply(u.normal(), size));

    // Line
    Draw.ctx.strokeStyle = style;
    Draw.ctx.beginPath();
    Draw.ctx.moveTo(pos.x, pos.y);
    Draw.ctx.lineTo(posB.x, posB.y);
    Draw.ctx.stroke();
    
    // Triangle
    Draw.ctx.fillStyle = style;
    Draw.ctx.beginPath();
    Draw.ctx.moveTo(posB.x, posB.y);
    Draw.ctx.lineTo(posC.x, posC.y);
    Draw.ctx.lineTo(posD.x, posD.y);
    Draw.ctx.lineTo(posB.x, posB.y);
    Draw.ctx.fill();
}