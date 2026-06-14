const SIMULATION_SPEED = 2000;
const TYPE_COUNT = 5;
const PARTICLE_COUNT = 1500;
const FRICTION = 0.1;
const CAMERA_SPEED = 1000;
const MIN_RADIUS = Math.sq(20);
const MAX_RADIUS = Math.sq(100);
const OPACITY = 0.5;
let cameraPosition = Vec2().sub(canvas.center);
let zoom = 0.75;
let colors = [];
let interactionMatrix = [];
let t = 0;


function Init() {
    for (let i = 0; i < TYPE_COUNT; i++) {
        colors.push(Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random(), OPACITY));
    }

    for (let i = 0; i < TYPE_COUNT; i++) {
        interactionMatrix.push([]);
        for (let j = 0; j < TYPE_COUNT; j++) {
            interactionMatrix[i].push(2 * Math.random() - 1);
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        new Particle(Vec2(Math.random() * canvas.width, Math.random() * canvas.height), Math.randInt(TYPE_COUNT));
    }
}
Init();


function Update(deltaTime) {
    Fill("black");

    if (keyboard.held("w")) cameraPosition.y += CAMERA_SPEED * deltaTime;
    if (keyboard.held("a")) cameraPosition.x += CAMERA_SPEED * deltaTime;
    if (keyboard.held("s")) cameraPosition.y -= CAMERA_SPEED * deltaTime;
    if (keyboard.held("d")) cameraPosition.x -= CAMERA_SPEED * deltaTime;

    if (keyboard.held("q")) zoom += zoom * deltaTime;
    if (keyboard.held("e")) zoom -= zoom * deltaTime;

    particles.forEach(p1 => {
        particles.forEach(p2 => {
            if (p1 === p2) return;
            if (Math.abs(p1.position.x - p2.position.x) > MAX_RADIUS) return;
            if (Math.abs(p1.position.y - p2.position.y) > MAX_RADIUS) return;
            let d = Vec2.sub(p1.position, p2.position).lengthSquared;
            if (d < MIN_RADIUS || d > MAX_RADIUS) return;
            p1.velocity.add(p1.GetInteraction(p2).mul(SIMULATION_SPEED * deltaTime));
        });

        p1.position.add(p1.velocity);
        p1.velocity.mul(1 - FRICTION);

        p1.Draw(cameraPosition, zoom);
    });

    t += deltaTime;
    if (t > 1) {
        t -= 1;
        console.log("FPS:", Math.round(1 / deltaTime));
    }
}