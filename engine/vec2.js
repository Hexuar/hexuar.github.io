function Vec2(x = 0, y = 0, polar = false) {
    if(!(this instanceof Vec2)) return new Vec2(x, y, polar);

    if (polar) {
        this.x = x * Math.cos(y);
        this.y = x * Math.sin(y);
    }
    else {
        this.x = x;
        this.y = y;
    }
}


Vec2.prototype = {
    get lengthSquared() {
        return Math.pow(this.x, 2) + Math.pow(this.y, 2);
    },
    get length() {
        return Math.sqrt(this.lengthSquared);
    },
    get left() {
        return new Vec2(-this.y, this.x);
    },

    get r() {
        return this.length;
    },
    set r(r) {
        theta = this.theta;
        this.x = r * Math.cos(theta);
        this.y = r * Math.sin(theta);
    },
    get theta() {
        return Math.atan2(this.y,this.x);
    },
    set theta(theta) {
        r = this.r;
        this.x = r * Math.cos(theta);
        this.y = r * Math.sin(theta);
    },

    set : function(x, y) {
        if(x instanceof Vec2) {
            this.x = x.x;
            this.y = x.y;
            return;
        }
        this.x = x;
        this.y = y;
    },
    zero : function() {
        return this.set(0, 0);
    },
    clone : function() {
        return new Vec2(this.x, this.y);
    },

    add : function(x, y) {
        if(x instanceof Vec2) {
            y = x.y;
            x = x.x;
        }
        else if (y == undefined) y = x;
        this.x += x;
        this.y += y;
        return this;
    },
    sub : function(x, y) {
        if(x instanceof Vec2) {
            y = x.y;
            x = x.x;
        }
        else if (y == undefined) y = x;
        this.x -= x;
        this.y -= y;
        return this;
    },
    mul : function(x, y) {
        if(x instanceof Vec2) {
            y = x.y;
            x = x.x;
        }
        else if (y == undefined) y = x;
        this.x *= x;
        this.y *= y;
        return this;
    },
    div : function(x, y) {
        if(x instanceof Vec2) {
            y = x.y;
            x = x.x;
        }
        else if (y == undefined) y = x;
        this.x /= x;
        this.y /= y;
        return this;
    },
    dot : function(v) {
        return Vec2.dot(this, v);
    },
    normalize : function() {
        this.set(Vec2.normalize(this));
        return this;
    },
    distance : function(v) {
        return Vec2.distance(this, v);
    },
    equal : function (v) {
        return Vec2.equal(this, v);
    },
    abs : function() {
        this.set(Vec2.abs(this));
        return this;
    },
    toString : function() {
        return "[" + this.x + ", " + this.y + "]";
    }
}


Vec2.add = function(u, v) {
    if(v instanceof Vec2) return new Vec2(u.x + v.x, u.y + v.y);
    else return new Vec2(u.x + v, u.y + v);
}
Vec2.sub = function(u, v) {
    if(v instanceof Vec2) return new Vec2(u.x - v.x, u.y - v.y);
    else return new Vec2(u.x - v, u.y - v);
}
Vec2.mul = function(u, v) {
    if(v instanceof Vec2) return new Vec2(u.x * v.x, u.y * v.y);
    else return new Vec2(u.x * v, u.y * v);
}
Vec2.div = function(u, v) {
    if(v instanceof Vec2) return new Vec2(u.x / v.x, u.y / v.y);
    else return new Vec2(u.x / v, u.y / v);
}
Vec2.dot = function(u, v) {
    return u.x * v.x + u.y * v.y;
}
Vec2.sum = function(vectors) {
    let sum = new Vec2();
    vectors.forEach(vector => {
        sum.add(vector);
    });
    return sum;
}
Vec2.normalize = function(u) {
    return Vec2.div(u, u.length);
}
Vec2.distance = function(u, v) {
    return new Vec2.sub(u, v).length;
}
Vec2.equal = function(u, v) {
    return u.x == v.x && u.y == v.y;
}
Vec2.abs = function(u) {
    if (typeof u == 'number') return Math.abs(u);
    return new Vec2(Math.abs(u.x), Math.abs(u.y));
}