const color = "hsl(389.7748540242311 20% 50%)";


class Segment {
    constructor(position = Vec2(), radius = 0, distance = 0, direction) {
        this.position = position;
        this.radius = radius;
        this.distance = distance;
        this.direction = direction;
    }
    get left() {
        return Vec2.add(this.position, Vec2(this.radius, this.direction.theta - Math.PI / 2, true));
    }
    get right() {
        return Vec2.add(this.position, Vec2(this.radius, this.direction.theta + Math.PI / 2, true));
    }
}


let speed = 10;
let turnspeed = 0.03;
let n = 30;
let segments = [];
for (i = 0; i < n; i++) {
    segments.push(new Segment(Vec2(200, 200 + 1.5 * 50 * i), n - i + 5, 50));
}
segments[0].direction = Vec2(0, -1);


function Spline(points = [], color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (i = 0; i < points.length; i++) {
        p0 = (i == 0) ? points[points.length - 1] : points[i - 1];
        p = points[i];
        p1 = (i == points.length - 1) ? points[0] : points[i + 1];
        p2 = (i >= points.length - 2) ? points[i - points.length + 2] : points[i + 2];
        let a = Vec2.sub(p1, p0).div(6);
        let b = Vec2.sub(p2, p).div(6);
        let A = Vec2.add(p, a);
        let B = Vec2.sub(p1, b);
        ctx.bezierCurveTo(A.x, A.y, B.x, B.y, p1.x, p1.y)
    }
    ctx.closePath();
    ctx.fill();
}


function Update(deltaTime) {
    Fill("hsl(209.77485402423108 20% 25%)");


    if (keyboard.held("w")) segments[0].direction.add(Vec2(0, -turnspeed));
    if (keyboard.held("a")) segments[0].direction.add(Vec2(-turnspeed, 0));
    if (keyboard.held("s")) segments[0].direction.add(Vec2(0, turnspeed));
    if (keyboard.held("d")) segments[0].direction.add(Vec2(turnspeed, 0));
    segments[0].direction.normalize();
    segments[0].position.add(Vec2.mul(segments[0].direction, speed));

    let front = Vec2.add(segments[0].position, Vec2.mul(segments[0].direction, segments[0].radius));
    if (front.x < 0) segments[0].direction.add(Vec2(0.1, front.y > canvas.center.y ? 0.1 : -0.1));
    if (front.x > canvas.width) segments[0].direction.add(Vec2(-0.1, front.y > canvas.center.y ? 0.1 : -0.1));
    if (front.y < 0) segments[0].direction.add(Vec2(front.x > canvas.center.x ? -0.1 : 0.1, 0.1));
    if (front.y > canvas.height) segments[0].direction.add(Vec2(front.x > canvas.center.x ? -0.1 : 0.1, -0.1));

    for (i = 1; i < n; i++) {
        let s = segments[i];
        let p = segments[i - 1];
        s.direction = Vec2.sub(p.position, s.position).normalize();
        s.position = Vec2.sub(p.position, Vec2.mul(s.direction, p.distance));
    }

    let nodes = [Vec2.add(segments[0].position, Vec2.mul(segments[0].direction, segments[0].radius))];
    for (i = 0; i < segments.length; i++) {
        nodes.push(segments[i].left);
    }
    nodes.push(Vec2.sub(segments[segments.length - 1].position, Vec2.mul(segments[segments.length - 1].direction, 3 * segments[segments.length - 1].radius)));
    for (i = segments.length - 1; i >= 0; i--) {
        nodes.push(segments[i].right);
    }

    Spline(nodes, color);
}