class Camera {
    constructor(position, zoom, speed, zoomSpeed) {
        this.position = position;
        this.zoom = zoom;
        this.speed = speed;
        this.zoomSpeed = zoomSpeed;
    }
    WorldToViewport(position) {
        return Vec2.sub(position, this.position).mul(this.zoom).add(canvas.center)
    }
}