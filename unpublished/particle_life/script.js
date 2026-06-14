const SIMULATION_SPEED = 2000;
const TYPE_COUNT = 5;
const PARTICLE_COUNT = 2000;
const FRICTION = 0.1;
const CHUNK_SIZE = 100;
const MIN_RADIUS = Math.sq(20);
const MAX_RADIUS = Math.sq(CHUNK_SIZE);
const OPACITY = 0.5;
const CAMERA = new Camera(canvas.center, 0.75, 1000, 1);
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

    if (keyboard.held("w")) CAMERA.position.y -= CAMERA.speed * deltaTime;
    if (keyboard.held("a")) CAMERA.position.x -= CAMERA.speed * deltaTime;
    if (keyboard.held("s")) CAMERA.position.y += CAMERA.speed * deltaTime;
    if (keyboard.held("d")) CAMERA.position.x += CAMERA.speed * deltaTime;
    if (keyboard.held("q")) CAMERA.zoom += CAMERA.zoomSpeed * CAMERA.zoom * deltaTime;
    if (keyboard.held("e")) CAMERA.zoom -= CAMERA.zoomSpeed * CAMERA.zoom * deltaTime;

    particles.forEach(p1 => {
        p1.Update();
        p1.Draw(CAMERA);

        p1.GetNearbyParticles().forEach(p2 => {
            if (p1 === p2) return;
            let d = Vec2.sub(p1.position, p2.position).lengthSquared;
            if (d < MIN_RADIUS || d > MAX_RADIUS) return;
            p1.velocity.add(p1.GetInteraction(p2).mul(SIMULATION_SPEED * deltaTime));
        });
    });

    t += deltaTime;
    if (t > 0.5) {
        t -= 0.5;
        console.log("FPS:", Math.round(1 / deltaTime));
    }
}