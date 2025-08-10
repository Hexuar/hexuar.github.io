const COHESION = 500

var boids = [];
class Boid {
    get left() {
        return this.dir.normal();
    }

    constructor(pos = new Vector2(), dir = new Vector2(), size = 10, color) {
        this.pos = pos;
        this.dir = dir.normalize();

        this.size = size;
        this.color = color;

        boids.push(this);
    }

    Update() {
        var averageDir = new Vector2();
        boids.forEach(boid => {
            if(boid == this) return;
            var distanceSquared = Vector2.subtract(this.pos, boid.pos).lengthSquared();
            averageDir.add(Vector2.divide(boid.dir, distanceSquared));
        });
        averageDir.divide(boids.length);

        this.dir.add(Vector2.multiply(averageDir, COHESION));
        this.dir = this.dir.normalize();

        this.pos.add(this.dir);

        if(this.pos.x < 0) this.pos.x += canvas.width;
        if(this.pos.y < 0) this.pos.y += canvas.height;
        if(this.pos.x > canvas.width) this.pos.x -= canvas.width;
        if(this.pos.y > canvas.height) this.pos.y -= canvas.height;

        this.Draw();
    }

    Draw() {
        FillTriangle(Vector2.add(this.pos, Vector2.multiply(this.left, this.size/3)), Vector2.subtract(this.pos, Vector2.multiply(this.left, this.size/3)), Vector2.add(this.pos, Vector2.multiply(this.dir, this.size)), this.color);
    }
}


function SpawnBoids(count) {
    for(var i = 0; i < count; i++) {
        var theta = Math.random() * 2 * Math.PI;
        new Boid(new Vector2(Math.random() * canvas.width, Math.random() * canvas.height), new Vector2(Math.cos(theta), Math.sin(theta)), 20, "beige");
    }
}
SpawnBoids(500);


function Update() {
    Fill("teal");

    boids.forEach(boid => {
        boid.Update();
    });
}
