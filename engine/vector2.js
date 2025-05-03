class Vector2 {
    constructor(x = 0, y = 0) {
        if (x instanceof Vector2) {
            this.x += x.x;
            this.y += x.y;
        } else {
            this.x = x;
            this.y = y;
        }
    }
    add(v) {
        if (v instanceof Vector2) {
            this.x += v.x;
            this.y += v.y;
        } else {
            this.x += v;
            this.y += v;
        }
        return this;
    }
    subtract(v) {
        if (v instanceof Vector2) {
            this.x -= v.x;
            this.y -= v.y;
        } else {
            this.x -= v;
            this.y -= v;
        }
        return this;
    }
    multiply(v) {
        if (v instanceof Vector2) {
            this.x *= v.x;
            this.y *= v.y;
        } else {
            this.x *= v;
            this.y *= v;
        }
        return this;
    }
    divide(v) {
        if (v instanceof Vector2) {
            this.x /= v.x;
            this.y /= v.y;
        } else {
            this.x /= v;
            this.y /= v;
        }
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    normal() {
        return new Vector2(-this.y, this.x);
    }
    eq(v) {
        this.x = v.x;
        this.y = v.y;
    }
    pow(v) {
        return new Vector2(Math.pow(this.x, 2), Math.pow(this.y, 2));
    }
    lengthSquared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
}

Vector2.add = function (v1, v2) {
    if (v2 instanceof Vector2) return new Vector2(v1.x + v2.x, v1.y + v2.y);
    else return new Vector2(v1.x + v2, v1.y + v2);
};

Vector2.subtract = function (v1, v2) {
    if (v2 instanceof Vector2) return new Vector2(v1.x - v2.x, v1.y - v2.y);
    else return new Vector2(v1.x - v2, v1.y - v2);
};

Vector2.multiply = function (v1, v2) {
    if (v2 instanceof Vector2) return new Vector2(v1.x * v2.x, v1.y * v2.y);
    else return new Vector2(v1.x * v2, v1.y * v2);
};

Vector2.divide = function (v1, v2) {
    if (v2 instanceof Vector2) return new Vector2(v1.x / v2.x, v1.y / v2.y);
    else return new Vector2(v1.x / v2, v1.y / v2);
};

Vector2.dot = function (v1, v2) {
    return v1.x * v2.x + v1.y * v2.y;
};
