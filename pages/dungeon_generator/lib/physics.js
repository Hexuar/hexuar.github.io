let kineticEnergy = 0;
let potentialEnergy = 0;

// Object Loop
let objects = [];
function updateObjects() {
    initSpace();
    kineticEnergy = 0;
    potentialEnergy = 0;
    objects.forEach(obj => {
        obj.update();
    });
}

// Physics Loop
let physicsObjects = [];


// Discretise space
let space = [];
function initSpace() {
    for(let x = 0; x * 100 < window.innerWidth; x++) {
        space[x] = [];
        for(let y = 0; y * 100 < window.innerHeight; y++) {
            space[x][y] = [];
        }
    }
}
initSpace();






// Main Object Class
class Obj {
    constructor(pos = new Vector2()) {
        this.pos = pos;
        objects.push(this);
    }
    update() {
    }
}



// Shape Class
class Shape extends Obj {
    constructor(pos = new Vector2(), shape, size, color) {
        super(pos);

        this.shape = shape;
        this.size = size;
        this.color = color;
    }
    update() {
        this.draw();
    }
    draw() {
        switch(this.shape) {
            case "circle":
                FillCircle(this.pos, this.size, this.color);
                break;
            case "rectangle":
                FillRectangle(this.pos, this.size, this.color);
                break;
        }
    }
}



// Physics Object
class PhysicsObject extends Shape {
    constructor(pos = new Vector2(), shape, size, color, mass = 0, vel = new Vector2(), acc = new Vector2()) {
        super(pos, shape, size, color);

        this.vel = vel;
        this.acc = acc;
        this.mass = mass;
        this.chunk = new Vector2(Math.ceil(pos.x / 100) - 1, Math.ceil(pos.y / 100) -1);

        physicsObjects.push(this);
        space[this.chunk.x][this.chunk.y].push(this);
    }
    update() {
        // Chunks
        this.chunk = new Vector2(Math.ceil(this.pos.x / 100) -1, Math.ceil(this.pos.y / 100) -1);
        space[this.chunk.x][this.chunk.y].push(this);


        this.updatePhysics();
        this.draw();
    }
    updatePhysics() {
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        
        this.collision();
        this.edgeCollision();

        kineticEnergy += this.kineticEnergy();
    }
    kineticEnergy() {
        return (this.mass * Math.pow(this.vel.length(), 2)) / 2;
    }
    collision() {
        
        // Get Collision Space
        /*let collisionSpace = [];
        for(let x = -1; x < 2; x++) {
            for(let y = -1; y < 2; y++) {
                collisionSpace = collisionSpace.concat(space[this.chunk.x][this.chunk.y]);
            }
        }*/

        // Detect Collisions
        for(let i = 0; i < space[this.chunk.x][this.chunk.y].length; i++) {
            let obj = space[this.chunk.x][this.chunk.y][i];

            if(obj == this) continue;

            if(this.shape == obj.shape && this.shape == "circle") {
                let d = Vector2.distance(this.pos, obj.pos) - this.size - obj.size;
                if(d < 0) this.handleCollision(obj, d);
            }
        }
    }
    edgeCollision() {
        Vector2.keys.forEach(i => {
            if(this.pos[i] - this.size < 0) {
                let d = this.pos[i] - this.size;
                this.vel[i] *= -1;
                this.pos[i] -= d;
            }
            if(this.pos[i] + this.size > canvasSize[i]) {
                let d = this.pos[i] + this.size - canvasSize[i];
                this.vel[i] *= -1;
                this.pos[i] -= d;
            }
        });
    }
    handleCollision(obj, d) {
        // Compression
        let normal = Vector2.subtract(this.pos, obj.pos).normalize();
        this.pos.add(Vector2.multiply(normal, -d * this.size / (this.size + obj.size)));
        obj.pos.add(Vector2.multiply(normal, d * obj.size / (this.size + obj.size)));

        // Velocity
        let v = this.vel;
        let V = obj.vel;

        this.vel = Vector2.subtract(v, Vector2.multiply(Vector2.subtract(this.pos, obj.pos), (2 * obj.mass) / (this.mass + obj.mass) * Vector2.dot(Vector2.subtract(v, V), Vector2.subtract(this.pos, obj.pos)) / Vector2.dot(Vector2.subtract(this.pos, obj.pos), Vector2.subtract(this.pos, obj.pos))));
        obj.vel = Vector2.subtract(V, Vector2.multiply(Vector2.subtract(obj.pos, this.pos), (2 * this.mass) / (obj.mass + this.mass) * Vector2.dot(Vector2.subtract(V, v), Vector2.subtract(obj.pos, this.pos)) / Vector2.dot(Vector2.subtract(obj.pos, this.pos), Vector2.subtract(obj.pos, this.pos))));
    }
}