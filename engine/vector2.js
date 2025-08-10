class Vector2 {
    constructor(x = 0, y = 0) {
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
        return this;
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
        return this;
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
        return this;
    }
    dot(v) {
        return this.x * v.x + this.y * v.y;
    }
    normal() {
        return new Vector2(-this.y, this.x);
    }
    normalize() {
        if (this.length() == 0) return new Vector2();
        return Vector2.divide(this, this.length());
    }
    length() {
        return Math.sqrt(Math.pow(this.x,2) + Math.pow(this.y,2));
    }
    lengthSquared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    }
    toString() {
        return this.x + "," + this.y;
    }
    fromAngle(angle) {
        this.x = Math.cos(angle);
        this.y = Math.sin(angle);
        return this;
    }
}

Vector2.new = function(a) {
    return new Vector2(a.x, a.y);
}

Vector2.add = function(v1, v2) {
    if(v2 instanceof Vector2) return new Vector2(v1.x + v2.x, v1.y + v2.y);
    else return new Vector2(v1.x + v2, v1.y + v2);
}

Vector2.sum = function(vectors) {
    let sum = new Vector2();
    vectors.forEach(vector => {
        sum.add(vector);
    });
    return sum;
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

Vector2.distance = function(v1, v2) {
    return Math.sqrt(Math.pow(v1.x - v2.x, 2) + Math.pow(v1.y - v2.y, 2));
}

Vector2.keys = ['x', 'y'];
