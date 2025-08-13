const G = 0.5;
const BALL_SIZE = 15;
const ELASTICITY = 0.8;

const balls = [];
class Ball {
    constructor(pos, radius, color, velocity = new Vec2(0,0)) {
        this.pos = pos;
        this.radius = radius;
        this.color = color;

        this.velocity = velocity;
        this.acceleration = new Vec2();

        balls.push(this);
    }

    Update() {
        let oldPos = new Vec2(this.pos.x, this.pos.y);
        let oldVelocity = new Vec2(this.velocity.x, this.velocity.y);

        this.acceleration.y = G;
        this.velocity.add(this.acceleration);
        this.pos.add(oldVelocity);

        // Ground Collision & Gravity
        if (this.pos.y + this.radius >= canvas.height) {
            this.pos.y -= 2 * (this.pos.y + this.radius - canvas.height);
            this.velocity.y = -ELASTICITY * Math.sqrt(Math.pow(oldVelocity.y, 2) + 2 * G * Math.abs(this.pos.y - oldPos.y));
        }

        // Wall collision
        if(this.pos.x + this.radius >= canvas.width) {
            this.velocity.x *= -ELASTICITY;
            this.pos.x = canvas.width - this.radius;
        }
        if(this.pos.x - this.radius <= 0) {
            this.velocity.x *= -ELASTICITY;
            this.pos.x = this.radius;
        }

        // Ball collision
        balls.forEach((ball) => {
            if (ball == this) return;

            let d = Vec2.sub(ball.pos, this.pos);
            let distance = d.length;

            if (Math.pow(distance, 2) < Math.pow(ball.radius + this.radius, 2)) {
                let dn = Vec2.div(d, distance);

                let di = Vec2.mul(dn, (distance - ball.radius - this.radius));
                this.pos.add(di);
                ball.pos.sub(di);

                let a = Vec2.mul(dn, Vec2.dot(this.velocity, dn));
                let b = Vec2.mul(dn, Vec2.dot(ball.velocity, dn));

                this.velocity.sub(Vec2.mul(a, 1 + ELASTICITY));
                ball.velocity.sub(Vec2.mul(b, 1 + ELASTICITY));
            }
        });
    }

    Draw() {
        FillCircle(this.pos, this.radius, this.color);
    }
}


function SpawnBalls(count) {
    for(var i = 0; i < count; i++) {
        new Ball(new Vec2(Math.random() * canvas.width, Math.random() * canvas.height), BALL_SIZE, "beige");
    }
}
SpawnBalls(500);


function Update() {
    Fill("teal");

    if (mouse.pressed(0) || mouse.held(2))
        new Ball(new Vec2(mouse.pos.x, mouse.pos.y), BALL_SIZE, "beige");

    balls.forEach((ball) => {
        ball.Update();
        ball.Draw();
    });
}
