const FRICTION = 0.85;

class Ball {
  constructor(origin, k, radius, color) {
    this.origin = origin;
    this.pos = origin;
    this.radius = radius;
    this.color = color;
    this.k = k

    this.acc = Vec2();
    this.vel = Vec2();

    this.held = false;
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
      b.pos = mouse.pos;
    }
    else {
      let d = Vec2.sub(this.origin, this.pos);
      let l = d.length * this.k;

      if(l != 0) this.acc = d.normalize().mul(l);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.vel.mul(FRICTION);
    }

    // Draw
    this.Draw();
  }

  Draw() {
    StrokeLine(this.origin, this.pos, 2, "black");
    FillCircle(this.pos, this.radius, this.color);
  }
}

let b = new Ball(canvas.size.div(2), 0.08, 20, "red");


function Update() {
  Clear();

  b.Update();
}