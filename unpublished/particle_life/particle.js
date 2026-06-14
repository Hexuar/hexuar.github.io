const particles = [];
class Particle {
    constructor(position = Vec2(), type = 0) {
        this.position = position;
        this.velocity = Vec2();
        this.type = type;

        particles.push(this);
    }
    GetInteraction(particle) {
        let f = interactionMatrix[this.type][particle.type];
        let d = Vec2.sub(particle.position, this.position);
        return d.normalize().mul(f / Vec2.sub(this.position, particle.position).lengthSquared);
    }
    Draw(cameraPos, zoom) {
        FillCircle(Vec2.add(this.position, cameraPos).mul(zoom).add(canvas.center), 3 * zoom, colors[this.type].toString());
    }
}