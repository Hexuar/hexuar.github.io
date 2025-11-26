let box = new Box(Vec2(100, 100), Vec2(300, 300), "THIS IS A BOX");
let ball = new Ball(Vec2(700, 250), 150, "THIS IS A BALL");
let vector = new Vector(Vec2(0, 0), Vec2(150, 0), "THIS IS A VECTOR", ball);

let t = 0;

function Update() {
    Fill(BACKGROUND_COLOR);

    t += 0.003;
    vector.dir = Vec2.mul(Vec2(Math.cos(t), Math.sin(t)), 150);

    box.Update();
    ball.Update();
    vector.Draw();
}