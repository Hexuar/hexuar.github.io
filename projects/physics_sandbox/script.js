const BACKGROUND_COLOR = "beige";
const DRAW_COLOR = "rgb(60,60,60)";
const TEXT_SIZE = 10;
const TEXT_OFFSET = TEXT_SIZE / 2;
const NODE_RADIUS = 6;
const NODE_RANGE = NODE_RADIUS;
const NODE_INACTIVE_RADIUS = NODE_RADIUS / 3;
const PATTERN = CreatePattern((canvas, context) => {
    canvas.width = 10;
    canvas.height = 10;
    context.lineWidth = 1;
    context.strokeStyle = DRAW_COLOR;
    context.beginPath();
    context.moveTo(0, 0);
    context.lineTo(10, 10);
    context.stroke();
});


function PositionNode() {
    this.parent.offset = Vec2.sub(mouse.pos, this.offset);
}

function RadiusNode() {
    this.parent.radius = Vec2.sub(mouse.pos, this.parent.pos).length;
    this.offset = Vec2.sub(mouse.pos, this.parent.pos);
}

function ScaleNode() {
    let d = Vec2.sub(Vec2.sub(this.parent.offset, this.offset), mouse.pos);
    this.parent.size = Vec2.abs(d);
    this.parent.offset = Vec2.add(mouse.pos, Vec2.div(d, 2));
    this.parent.RecalculateNodeOffsets();
}

class Node {
    constructor(parent, RecalculateOffset, behaviour, style = DRAW_COLOR) {
        this.parent = parent;
        this.RecalculateOffset = RecalculateOffset;
        this.offset = RecalculateOffset();
        this.behaviour = behaviour;
        this.selected = false;

        this.style = style;
    }
    get pos() {
        return Vec2.add(this.parent.pos, this.offset);
    }
    Update(visible) {
        if (this.selected) {
            if (mouse.pressed(0)) this.selected = false;
        }
        else {
            if (this.IsInRange(mouse.pos) && mouse.pressed(0)) this.selected = true;
        }
        if (this.selected && this.behaviour != undefined) this.behaviour();

        if (this.IsInRange(mouse.pos)) this.Draw(true);
        else if (visible) this.Draw(false);
    }
    Draw(state) {
        if(state) {
            let d = Vec2.distance(this.pos, mouse.pos);
            FillCircle(this.pos, NODE_RADIUS * (1 - d / (2 * NODE_RANGE)), this.style);
        }
        else {
            FillCircle(this.pos, NODE_INACTIVE_RADIUS, this.style);
        }
    }
    IsInRange(pos) {
        return Vec2.distance(pos, this.pos) < NODE_RANGE;
    }
}

class Obj {
    constructor(label = "", anchor) {
        this.label = label;
        this.anchor = anchor
    }
    get pos() {
        if (this.anchor != undefined) return Vec2.add(this.anchor.pos, this.offset);
        return this.offset;
    }
    Update() {
        this.Draw();
        this.DrawLabel();
        if(this.nodes != undefined) this.UpdateNodes();
    }
    Draw() {}
    DrawLabel() {}
    UpdateNodes() {
        for(const [key, node] of Object.entries(this.nodes)) {
            node.Update(this.IsInside(mouse.pos));
        }
    }
    RecalculateNodeOffsets() {
        for(const [key, node] of Object.entries(this.nodes)) {
            node.offset = node.RecalculateOffset();
        }
    }
}

class Box extends Obj {
    constructor(pos = Vec2(), size = Vec2(), label = "") {
        super(label);
        this.offset = Vec2.add(pos, Vec2.div(size, 2));
        this.size = size;
        this.nodes = {
            center: new Node(this, () => { return Vec2() }, PositionNode),
            a: new Node(this, () => { return Vec2.div(this.size, -2) }, ScaleNode),
            b: new Node(this, () => { return Vec2(this.size.x/2, -this.size.y/2) }, ScaleNode),
            c: new Node(this, () => { return Vec2(-this.size.x/2, this.size.y/2) }, ScaleNode),
            d: new Node(this, () => { return Vec2.div(this.size, 2) }, ScaleNode)
        }
    }
    Draw() {
        StrokeRectangle(this.nodes.a.pos, this.size, DRAW_COLOR, 2);
        FillRectangle(this.nodes.a.pos, this.size, PATTERN);
    }
    DrawLabel() {
        if (this.label == "") return;
        let labelPosition = Vec2.sub(this.nodes.a.pos, Vec2(ctx.measureText(this.label).width/2 - this.size.x/2, TEXT_OFFSET));
        FillText(labelPosition, this.label, TEXT_SIZE, DRAW_COLOR);
    }
    IsInside(point) {
        if (point.x < this.nodes.a.pos.x) return false;
        if (point.y < this.nodes.a.pos.y) return false;
        if (point.x > this.nodes.d.pos.x) return false;
        if (point.y > this.nodes.d.pos.y) return false;
        return true;
    }
};

class Ball extends Obj {
    constructor(pos = Vec2(), radius = 0, label = "") {
        super(label);
        this.offset = pos;
        this.radius = radius;
        this.nodes = {
            center: new Node(this, () => { return Vec2() }, PositionNode),
            radius: new Node(this, () => { return Vec2(this.radius, 0) }, RadiusNode)
        }
    }
    Draw() {
        StrokeCircle(this.pos, this.radius, DRAW_COLOR, 2);
        FillCircle(this.pos, this.radius, PATTERN);
    }
    DrawLabel() {
        if (this.label == "") return;
        let labelPosition = Vec2.sub(this.pos, Vec2(ctx.measureText(this.label).width/2, this.radius + TEXT_OFFSET));
        FillText(labelPosition, this.label, TEXT_SIZE, DRAW_COLOR);
    }
    IsInside(point) {
        return Vec2.distance(point, this.pos) <= this.radius;
    }
}

class Vector extends Obj {
    constructor(pos = Vec2(), dir = Vec2(), label = "", anchor) {
        super(label, anchor);
        this.offset = pos;
        this.dir = dir;
    }
    Draw() {
        StrokeVector(this.dir, this.pos, DRAW_COLOR);
        this.DrawLabel();
    }
    DrawLabel() {
        if (this.label == "") return;
        let labelPosition = Vec2.sub(Vec2.add(this.pos, Vec2.div(this.dir, 2)), Vec2(ctx.measureText(this.label).width/2, TEXT_OFFSET));
        FillText(labelPosition, this.label, TEXT_SIZE, DRAW_COLOR);
    }
}


let box = new Box(Vec2(100, 100), Vec2(300, 300), "THIS IS A BOX");
let ball = new Ball(Vec2(700, 250), 150, "THIS IS A BALL");
let vector = new Vector(Vec2(0, 0), Vec2(150, 0), "THIS IS A VECTOR", ball);

let t = 0;

function Update() {
    Fill(BACKGROUND_COLOR);

    t += 0.003;
    vector.dir = Vec2.mul(Vec2(Math.cos(t), Math.sin(t)), 150);

    box.Update();
    ball.Update();
    vector.Draw();
}