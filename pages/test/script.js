const balls = [];

class Ball {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;

    this.velocity = new Vector2();

    balls.push(this);
  }

  Update() {

    // Ground Collision & Gravity
    if(this.pos.y + this.radius <= canvas.height) {
      this.velocity.y += 0.1;
    }
    else {
      this.pos.y = canvas.height - this.radius;
      this.velocity.y *= -0.9;
    }

    balls.forEach(ball => {
      if(ball == this) return;

      let d = Math.pow(this.pos.x - ball.pos.x, 2) + Math.pow(this.pos.y - ball.pos.y, 2);
      if(d < Math.pow(this.radius + ball.radius, 2)) {
        let v = Vector2.subtract(ball.pos, this.pos);

        this.pos.add(v);
        ball.pos.subtract(v);

        v.divide(100);

        this.velocity.add(v);
        ball.velocity.subtract(v);
      }
    });

    this.pos.add(this.velocity);
  }

  Draw() {
    FillCircle(this.pos, this.radius, this.color);
  }
}

function Update() {
  Fill("teal");

  if(mouse.pressed(0)) new Ball(mouse.pos, 20, "red");

  balls.forEach(ball => {
    ball.Update();
    ball.Draw();
  });
}