const colors = ["red", "blue"];
const interactionMatrix = [[1, -1], [-1, 1]];
const particles = [];
class Particle {
    constructor(position = Vec2(), type = 0) {
        this.position = position;
        this.type = type;

        particles.push(this);
    }
    GetInteraction(particle) {
        let f = interactionMatrix[this.type][particle.type];
        let d = Vec2.sub(this.position, particle.position);
        return d.normalize().mul(1000 * f / Vec2.sub(this.position, particle.position).lengthSquared);
    }
    Draw() {
        FillCircle(this.position, 3, colors[this.type]);
    }
}


for (let i = 0; i < 600; i++) {
    new Particle(Vec2(Math.random() * canvas.width, Math.random() * canvas.height), Math.randInt(2));
}



function Update() {
    if (mouse.pressed(0)) {
        new Particle(mouse.pos, 0);
    }
    if (mouse.pressed(2)) {
        new Particle(mouse.pos, 1);
    }


    particles.forEach(p1 => {
        let velocity = Vec2();

        particles.forEach(p2 => {
            if (p1 === p2) return;
            let d = Vec2.sub(p1.position, p2.position).lengthSquared;
            if (d < 100 || d > 1000) return;
            velocity.add(p1.GetInteraction(p2));
        });

        p1.position.add(velocity);

        p1.Draw();
    });
}