let points = [];
class Point extends Vector2 {
    constructor(x, y, radius = 8, color) {
        super(x,y);
        this.radius = radius;
        this.color = color;
        points.push(this);
    }
    Draw() {
        FillCircle(Vector2.multiply(this, 10), this.radius, this.color);
    }
}