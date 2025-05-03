class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(v) {
        if(v instanceof Vector2) {
            this.x += v.x;
            this.y += v.y;
        }
        else {
            this.x += v;
            this.y += v;
        }
        return this;
    }
    subtract(v) {
        if(v instanceof Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        }
        else {
            this.x -= v;
            this.y -= v;
        }
    }
    multiply(v) {
        if(v instanceof Vector2) {
            this.x *= v.x;
            this.y *= v.y;
        }
        else {
            this.x *= v;
            this.y *= v;
        }
    }
    divide(v) {
        if(v instanceof Vector2) {
            this.x /= v.x;
            this.y /= v.y;
        }
        else {
            this.x /= v;
            this.y /= v;
        }
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    normal() {
        return new Vector2(-this.y, this.x);
    }
}

Vector2.add = function(v1, v2) {
    if(v2 instanceof Vector2) return new Vector2(v1.x + v2.x, v1.y + v2.y);
    else return new Vector2(v1.x + v2, v1.y + v2);
}

Vector2.subtract = function(v1, v2) {
    if(v2 instanceof Vector2) return new Vector2(v1.x - v2.x, v1.y - v2.y);
    else return new Vector2(v1.x - v2, v1.y - v2);
}

Vector2.multiply = function(v1, v2) {
    if(v2 instanceof Vector2) return new Vector2(v1.x * v2.x, v1.y * v2.y);
    else return new Vector2(v1.x * v2, v1.y * v2);
}

Vector2.divide = function(v1, v2) {
    if(v2 instanceof Vector2) return new Vector2(v1.x / v2.x, v1.y / v2.y);
    else return new Vector2(v1.x / v2, v1.y / v2);
}

Vector2.dot = function(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
}