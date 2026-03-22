const FRICTION = 0.05;
const BALL_RADIUS = 5;
const BALL_COLOR = Color(32, 32, 32);
const SPRING_WIDTH = 2;
const SPRING_COLOR = Color(32, 32, 32);


const nodes = [];
class Node {
  constructor(pos, mass = 1, immovable = false) {
    this.forces = Vec2();
    this.acc = Vec2();
    this.vel = Vec2();
    this.pos = pos;
    this.mass = mass;
    this.immovable = immovable;
    this.held = false;

    nodes.push(this);
  }

  Update() {
    if (!this.immovable) this.acc = this.forces.div(this.mass);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.mul(1 - FRICTION);
    this.forces = Vec2();
  }
}


const balls = [];
class Ball extends Node {
  constructor(pos, radius = BALL_RADIUS, color = BALL_COLOR, mass = 1, immovable = false) {
    super(pos, mass, immovable);
    this.radius = radius;
    this.color = color;

    balls.push(this);
  }

  Update() {
    // Check if held
    if (mouse.pressed(0) && Vec2.distance(mouse.pos, this.pos) < this.radius) {
      this.held = true;
    }
    if (this.held) {
      this.pos = mouse.pos;
      this.forces = Vec2();
    }
    if (mouse.released(0) && this.held) {
      this.held = false;
    }

    // Ground collision
    if (this.pos.y > canvas.size.y) {
      let f = Vec2(0, canvas.size.y - this.pos.y);
      this.forces.add(f);
    }

    super.Update();
  }

  Draw() {
    FillCircle(this.pos, this.radius, this.color);
  }
}


const springs = [];
class Spring {
  constructor(A = new Node(), B = new Node(), k = 1, l = 0) {
    this.A = A;
    this.B = B;
    this.k = k;
    this.l = l;

    springs.push(this);
  }

  Update() {
    let l = Vec2.distance(this.A.pos, this.B.pos) - this.l;
    if (l != this.l) {
      let f = Vec2.sub(this.A.pos, this.B.pos).normalize().mul(this.k * l);
      this.A.forces.sub(f);
      this.B.forces.add(f);
    }
  }

  Draw() {
    StrokeLine(this.A.pos, this.B.pos, SPRING_COLOR, SPRING_WIDTH);
  }
}


const rectangles = [];
class Rectangle {
  constructor(pos, cellSize, size = Vec2(1, 1), k = 0.5, color = "black") {
    this.vertices = [];
    this.springs = [];
    this.size = size;
    this.color = color;

    for (let y = 0; y < size.y + 1; y++) {
      for (let x = 0; x < size.x + 1; x++) {
        let ball = new Ball(Vec2.add(pos, Vec2(x * cellSize.x, y * cellSize.y)));
        this.vertices.push(ball);
      }
    }

    for (let i = 0; i < this.vertices.length - 1; i++) {
      if (i % (size.x + 1) != size.x) this.springs.push(new Spring(this.vertices[i], this.vertices[i + 1], k, cellSize.x));
      if (i + size.x + 1 < this.vertices.length) this.springs.push(new Spring(this.vertices[i], this.vertices[i + size.x + 1], k, cellSize.y));
      if (i % (size.x + 1) != size.x && i + size.x + 2 < this.vertices.length) this.springs.push(new Spring(this.vertices[i], this.vertices[i + size.x + 2], k, cellSize.length));
      if (i % (size.x + 1) != size.x && i - size.x > 0) this.springs.push(new Spring(this.vertices[i], this.vertices[i - size.x], k, cellSize.length));
    }

    rectangles.push(this);
  }

  Draw() {
    for (let i = 0; i < this.vertices.length; i++) {
      if (i % (this.size.x + 1) != this.size.x && i < this.vertices.length - this.size.x - 1) {
        FillTriangle(this.vertices[i].pos, this.vertices[i + 1].pos, this.vertices[i + this.size.x + 1].pos, this.color);
        FillTriangle(this.vertices[i + 1].pos, this.vertices[i + this.size.x + 1].pos, this.vertices[i + this.size.x + 2].pos, this.color);
      }
    }
  }
}



//let r1 = new Rectangle(Vec2(500, 200), Vec2(100, 200), Vec2(1, 1), 0.5, "red");
//let r2 = new Rectangle(Vec2(700, 200), Vec2(100, 200), Vec2(1, 1), 0.5, "blue");

//new Rectangle(Vec2(100, 100), Vec2(80, 100), Vec2(3, 3), 0.5, "red");

new Rectangle(Vec2(1000, 0), Vec2(150, 150), Vec2(4, 4), 0.5, "red");

function Update() {
  Clear();

  nodes.forEach(node => {
    node.forces.add(Vec2(0, 0.98 * node.mass));
    node.Update();
  });
  springs.forEach(spring => spring.Update());

  rectangles.forEach(rectangle => rectangle.Draw());
  springs.forEach(spring => spring.Draw());
  balls.forEach(ball => ball.Draw());
}