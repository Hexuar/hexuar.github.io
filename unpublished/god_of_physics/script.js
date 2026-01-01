const PARTICLE_DRAW_RADIUS = 2

const particles = [];
class Particle {
    constructor(values) {
        variables.forEach(variable => {
            if (values[variable.name] != undefined) this[variable.name] = values[variable.name];
            else this[variable.name] = variable.type == "scalar" ? 0 : Vec2();
        });
        particles.push(this);
    }
    Update() {
        laws.forEach(law => {
            law(this);
        });
        this.Draw();
    }
    Draw() {
        FillCircle(this.position, PARTICLE_DRAW_RADIUS, "black");
    }
}



const variables = [
    { name: "position", type: "vector" },
    { name: "velocity", type: "vector" },
    { name: "acceleration", type: "vector" },
    { name: "mass", type: "scalar" },
    { name: "fortune", type: "scalar" },
];
const laws = [
    (p) => {
        p.acceleration = Vec2();
        oldParticles.forEach(p2 => {
            if (p == p2) return;
            r = Vec2.sub(p2.position, p.position);
            if (r.length != 0) p.acceleration.add(r.normalize().mul(p2.mass / Math.sq(r.length)));
        });
    },
    (p) => { p.velocity.add(p.acceleration) },
    (p) => { p.position.add(p.velocity) },
    (p) => { p.mass += p.fortune * p.acceleration.length},
];


new Particle({ position: Vec2(200, 200), mass: 0.0001, fortune: 0});
new Particle({ position: Vec2(400, 100), mass: 0.0001, fortune: 1 });
new Particle({ position: Vec2(250, 250), mass: 0.0001, fortune: 0 });

let oldParticles = [];
function Update() {
    Clear();

    particles.forEach(particle => {
        oldParticles = structuredClone(particles);
        particle.Update();
    })
}