const FRICTION = 0.2;
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


class Ball extends Node {
  constructor(pos, radius = BALL_RADIUS, color = BALL_COLOR, mass = 1, immovable = false) {
    super(pos, mass, immovable);
    this.radius = radius;
    this.color = color;
  }

  Update() {
    // Check if held
    if (mouse.pressed(0) && Vec2.distance(mouse.pos, this.pos) < this.radius) {
      this.held = true;
    }
    if (mouse.released(0) && this.held) {
      this.held = false;
    }

    // Handle dynamics
    if (this.held) {
      this.pos = mouse.pos;
      this.forces = Vec2();
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
    StrokeLine(this.A.pos, this.B.pos, SPRING_WIDTH, SPRING_COLOR);
  }
}





let nodeA = new Ball(Vec2(200, 200));
let nodeB = new Ball(Vec2(400, 200));
let nodeC = new Ball(Vec2(300, 300));
new Spring(nodeA, nodeB, 0.1, 50);
new Spring(nodeB, nodeC, 0.1, 100);


function Update() {
  Clear();

  nodes.forEach(node => node.Update());
  springs.forEach(spring => spring.Update());

  springs.forEach(spring => spring.Draw());
  nodes.forEach(node => node.Draw());
}