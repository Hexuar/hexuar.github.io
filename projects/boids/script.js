const COHESION = 500

var boids = [];
class Boid {
    get left() {
        return this.dir.left;
    }

    constructor(pos = new Vec2(), dir = new Vec2(), size = 10, color) {
        this.pos = pos;
        this.dir = dir.normalize();

        this.size = size;
        this.color = color;

        boids.push(this);
    }

    Update() {
        var averageDir = new Vec2();
        boids.forEach(boid => {
            if(boid == this) return;
            var distanceSquared = Vec2.sub(this.pos, boid.pos).lengthSquared;
            averageDir.add(Vec2.div(boid.dir, distanceSquared));
        });
        averageDir.div(boids.length);

        this.dir.add(Vec2.mul(averageDir, COHESION));
        this.dir = this.dir.normalize();

        this.pos.add(this.dir);

        if(this.pos.x < 0) this.pos.x += canvas.width;
        if(this.pos.y < 0) this.pos.y += canvas.height;
        if(this.pos.x > canvas.width) this.pos.x -= canvas.width;
        if(this.pos.y > canvas.height) this.pos.y -= canvas.height;

        this.Draw();
    }

    Draw() {
        FillTriangle(Vec2.add(this.pos, Vec2.mul(this.left, this.size/3)), Vec2.sub(this.pos, Vec2.mul(this.left, this.size/3)), Vec2.add(this.pos, Vec2.mul(this.dir, this.size)), this.color);
    }
}


function SpawnBoids(count) {
    for(var i = 0; i < count; i++) {
        var theta = Math.random() * 2 * Math.PI;
        new Boid(new Vec2(Math.random() * canvas.width, Math.random() * canvas.height), new Vec2(1, theta, true), 20, "beige");
    }
}
SpawnBoids(500);


function Update() {
    Fill("teal");

    boids.forEach(boid => {
        boid.Update();
    });
}
