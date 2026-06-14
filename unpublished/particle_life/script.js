const settings = {
    simulationSpeed : 1000,
    friction : 0.1,
    typeCount : 10,
    particleCount : 5000,
    minRadius : 20,
    maxRadius : 100,
    opacity : 0.2,
}


let t = 0;
let colors = [];
let interactionMatrix = [];
let camera = new Camera(canvas.center, 0.75, 1000, 1);
const CHUNK_SIZE = settings.maxRadius;
const MIN_RADIUS_SQUARED = Math.sq(settings.minRadius);
const MAX_RADIUS_SQUARED = Math.sq(settings.maxRadius);


function Init() {
    for (let i = 0; i < settings.typeCount; i++) {
        colors.push(Color(255 * Math.random(), 255 * Math.random(), 255 * Math.random(), settings.opacity));
    }

    for (let i = 0; i < settings.typeCount; i++) {
        interactionMatrix.push([]);
        for (let j = 0; j < settings.typeCount; j++) {
            interactionMatrix[i].push(2 * Math.random() - 1);
        }
    }

    for (let i = 0; i < settings.particleCount; i++) {
        new Particle(Vec2(Math.random() * canvas.width, Math.random() * canvas.height), Math.randInt(settings.typeCount));
    }
}
Init();


function Update(deltaTime) {
    Fill("black");

    if (keyboard.held("w")) camera.position.y -= camera.speed * deltaTime;
    if (keyboard.held("a")) camera.position.x -= camera.speed * deltaTime;
    if (keyboard.held("s")) camera.position.y += camera.speed * deltaTime;
    if (keyboard.held("d")) camera.position.x += camera.speed * deltaTime;
    if (keyboard.held("q")) camera.zoom += camera.zoomSpeed * camera.zoom * deltaTime;
    if (keyboard.held("e")) camera.zoom -= camera.zoomSpeed * camera.zoom * deltaTime;

    particles.forEach(p1 => {
        p1.Update();
        p1.Draw(camera);

        p1.GetNearbyParticles().forEach(p2 => {
            if (p1 === p2) return;
            let d = Vec2.sub(p1.position, p2.position).lengthSquared;
            if (d < MIN_RADIUS_SQUARED || d > MAX_RADIUS_SQUARED) return;
            p1.velocity.add(p1.GetInteraction(p2).mul(settings.simulationSpeed * deltaTime));
        });
    });

    t += deltaTime;
    if (t > 0.5) {
        t -= 0.5;
        console.log("FPS:", Math.round(1 / deltaTime));
    }
}