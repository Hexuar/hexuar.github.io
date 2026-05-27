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


let n = 20;
let segments = [];
for (i = 0; i < n; i++) {
    segments.push(new Segment(Vec2(200, 200 + 1.5 * 50 * i), n - i, 50));
}
segments[0].direction = Vec2(1, 0);


function Spline(points = [], strength = 8, color) {
    let region = new Path2D();
    region.moveTo(points[1].x, points[1].y);
    for (i = 1; i < points.length - 2; i++) {
        let a1 = Vec2.sub(points[i], points[i - 1]);
        let b1 = Vec2.sub(points[i], points[i + 1]);
        let c1 = Vec2.add(points[i], Vec2.sub(a1, b1).normalize().mul((a1.length + b1.length) / strength));
        let a2 = Vec2.sub(points[i + 1], points[i]);
        let b2 = Vec2.sub(points[i + 1], points[i + 2]);
        let c2 = Vec2.add(points[i + 1], Vec2.sub(b2, a2).normalize().mul((a1.length + b1.length) / strength));
        region.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, points[i + 1].x, points[i + 1].y);
    }
    region.closePath();
    ctx.strokeStyle = "black";
    ctx.fillStyle = color;
    ctx.fill(region);
}


function Update(deltaTime) {
    Fill("hsl(209.77485402423108 20% 25%)");


    segments[0].direction = Vec2.sub(mouse.pos, segments[0].position).normalize();
    let D = Vec2.sub(mouse.pos, segments[0].position);
    if(D.r > 2) segments[0].position = Vec2.add(segments[0].position, D.div(2));

    for (i = 0; i < n; i++) {
        let s = segments[i];
        if (i != 0) {
            let p = segments[i - 1];
            s.direction = Vec2.sub(p.position, s.position).normalize();
            s.position = Vec2.sub(p.position, Vec2.mul(s.direction, p.distance));
        }
    }

    let nodes = [segments[1].right, segments[0].right];
    for (i = 0; i < n; i++) {
        nodes.push(segments[i].left);
    }
    for (i = n - 1; i >= 0; i--) {
        nodes.push(segments[i].right);
    }
    nodes.push(segments[0].left)

    Spline(nodes, 8, color);
}