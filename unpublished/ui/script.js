const FRICTION = 0.05;
const BALL_RADIUS = 8;
const BALL_COLOR = "teal";
const SPRING_WIDTH = 2;
const SPRING_COLOR = "black";


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
  constructor(pos, size, k, color) {
    let a = new Ball(pos);
    let b = new Ball(Vec2.add(pos, Vec2(size.x, 0)));
    let c = new Ball(Vec2.add(pos, size));
    let d = new Ball(Vec2.add(pos, Vec2(0, size.y)));

    this.vertices = [a, b, c, d];
    this.springs = [
      new Spring(a, b, k, size.x),
      new Spring(b, c, k, size.y),
      new Spring(a, c, k, size.length),
      new Spring(a, d, k, size.y),
      new Spring(b, d, k, size.length),
      new Spring(c, d, k, size.x),
    ];
    this.color = color;

    rectangles.push(this);
  }

  Draw() {
    FillTriangle(this.vertices[0].pos, this.vertices[1].pos, this.vertices[2].pos, this.color);
    FillTriangle(this.vertices[2].pos, this.vertices[3].pos, this.vertices[0].pos, this.color);
    StrokeTriangle(this.vertices[0].pos, this.vertices[1].pos, this.vertices[2].pos, this.color, 1);
    StrokeTriangle(this.vertices[2].pos, this.vertices[3].pos, this.vertices[0].pos, this.color, 1);
  }
}

new Rectangle(Vec2(500, 200), Vec2(100, 200), 0.5, "red");

function Update() {
  Clear();

  nodes.forEach(node => {
    node.forces.add(Vec2(0, 0.98 * node.mass));
    node.Update();
  });
  springs.forEach(spring => spring.Update());

  rectangles.forEach(rectangle => rectangle.Draw());
}