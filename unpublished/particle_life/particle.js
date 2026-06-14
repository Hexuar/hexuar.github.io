const particles = [];
class Particle {
    constructor(position = Vec2(), type = 0) {
        this.position = position;
        this.velocity = Vec2();
        this.type = type;
        this.chunkPosition = null;

        particles.push(this);
        Chunks.Add(this, this.GetChunkCoordinates());
    }
    Update() {
        this.position.add(this.velocity);
        this.velocity.mul(1 - FRICTION);

        if (!this.IsWithinChunkBoundaries(this.chunkPosition)) {
            Chunks.Remove(this, this.chunkPosition);
            Chunks.Add(this, this.GetChunkCoordinates(this));
        }
    }
    Draw(cameraPos, zoom) {
        FillCircle(Vec2.sub(this.position, cameraPos).mul(zoom).add(canvas.center), 3 * zoom, colors[this.type].toString());
    }
    GetInteraction(particle) {
        let f = interactionMatrix[this.type][particle.type];
        let d = Vec2.sub(particle.position, this.position);
        return d.normalize().mul(f / Vec2.sub(this.position, particle.position).lengthSquared);
    }
    IsWithinChunkBoundaries(chunkPosition) {
        return (Math.floor(this.position.x / CHUNK_SIZE) == chunkPosition.x && Math.floor(this.position.y / CHUNK_SIZE) == chunkPosition.y);
    }
    GetChunkCoordinates() {
        return Vec2(Math.floor(this.position.x / CHUNK_SIZE), Math.floor(this.position.y / CHUNK_SIZE));
    }
    GetNearbyParticles() {
        let particles = [];
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let chunkPosition = Vec2.add(this.chunkPosition, Vec2(i, j))
                particles = particles.concat(Chunks.Get(chunkPosition));
            }
        }
        return particles;
    }
}

const Chunks = {
    Get : function(chunkPosition) {
        let data = Chunks[chunkPosition.toString()];
        if (data == undefined) data = [];
        return data;
    },
    Add : function(particle, chunkPosition) {
        let data = Chunks.Get(chunkPosition);
        data.push(particle);
        Chunks[chunkPosition.toString()] = data;
        particle.chunkPosition = chunkPosition;
    },
    Remove : function(particle, chunkPosition) {
        let data = Chunks.Get(chunkPosition);
        data.pop(data.indexOf(particle));
        Chunks[chunkPosition.toString()] = data;
        particle.chunkPosition = null;
    }
};