const color = "hsl(389.7748540242311 20% 50%)";


class Segment {
    constructor(position = Vec2(), radius = 0, distance = 0, direction) {
        this.position = position;
        this.radius = radius;
        this.distance = distance;
        this.direction = direction;
    }
    get left() {
        return Vec2.add(this.position, Vec2(this.radius, this.direction.theta + Math.PI / 2, true));
    }
    get right() {
        return Vec2.add(this.position, Vec2(this.radius, this.direction.theta - Math.PI / 2, true));
    }
}


let n = 20;
let segments = [];
for (i = 0; i < n; i++) {
    segments.push(new Segment(Vec2(200, 200 + 1.5 * 50 * i), n - i + 2, 50));
}
segments[0].direction = Vec2(1, 0);


function Update(deltaTime) {
    Fill("hsl(209.77485402423108 20% 25%)");


    segments[0].direction = Vec2.sub(mouse.pos, segments[0].position).normalize();
    let D = Vec2.sub(mouse.pos, segments[0].position);
    if(D.r > 2) segments[0].position = Vec2.add(segments[0].position, D.div(2));

    for (i = 1; i < n; i++) {
        let s = segments[i];
        let p = segments[i - 1];

        s.direction = Vec2.sub(p.position, s.position).normalize();
        s.position = Vec2.sub(p.position, Vec2.mul(s.direction, p.distance));

        if (p != undefined && p.direction != undefined) {
            StrokeLine(p.right, s.right, color, 2);
            StrokeLine(p.left, s.left, color, 2);
        }
    }

    StrokeArc(segments[0].position, segments[0].radius, segments[0].direction.theta - Math.PI / 2, segments[0].direction.theta + Math.PI / 2, color, 2);
    StrokeArc(segments[n-1].position, segments[n-1].radius, segments[n-1].direction.theta + Math.PI / 2, segments[n-1].direction.theta - Math.PI / 2, color, 2);

}