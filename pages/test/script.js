const balls = [];
const g = 0.1;

class Ball {
  constructor(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;

    this.velocity = new Vector2();
    this.acceleration = new Vector2();

    balls.push(this);
  }

  Update() {
    let oldPos = new Vector2(this.pos.x, this.pos.y);
    let oldVelocity = new Vector2(this.velocity.x, this.velocity.y);

    this.acceleration.y = g;
    this.velocity.add(this.acceleration);
    this.pos.add(oldVelocity);
    this.pos.add(Vector2.divide(this.acceleration, 2))

    // Ground Collision & Gravity
    if(this.pos.y + this.radius >= canvas.height) {
      this.pos.y -= 2*(this.pos.y + this.radius - canvas.height);
      this.velocity.y = -Math.sqrt(Math.pow(oldVelocity.y, 2) + 2 * g * Math.abs(this.pos.y - oldPos.y)); //Math.pow(this.velocity.y) + 2 * g * d

      //console.log(this.velocity);
    }

    balls.forEach(ball => {
      if(ball == this) return;

      let d = Vector2.subtract(ball.pos, this.pos);
      let distance = d.lengthSquared();

      if (distance < Math.pow(ball.radius + this.radius, 2)) {
        let d2 = Vector2.divide(d, 2)
        ball.pos.add(d2);
        this.pos.subtract(d2);

        d2 = d2.divide(d2.length());
        d2.multiply(2);
        console.log(d2);
        ball.velocity.add(d2);
        this.velocity.subtract(d2);
      }
    });
  }

  Draw() {
    FillCircle(this.pos, this.radius, this.color);
  }
}

let b1 = new Ball(new Vector2(100, canvas.height - 20), 20, "white");
b1.velocity.x = 1;

function Update() {
  Fill("teal");

  if(mouse.pressed(0)) new Ball(new Vector2(mouse.pos.x, mouse.pos.y), 20, "red");

  balls.forEach(ball => {
    ball.Update();
    ball.Draw();
  });
}