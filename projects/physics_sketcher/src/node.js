class Node {
    constructor(parent, offset = Vec2()) {
        this.offset = offset;
        this.parent = parent;
        this.children = [];

        if (this.parent != undefined) this.parent.children.push(this);
    }
    get pos() {
        if (this.parent != undefined) return Vec2.add(this.parent.pos, this.offset);
        return this.offset;
    }
    Update() {};
    UpdateChildren() {
        this.children.forEach(child => {
            child.Update();
            child.UpdateChildren();
        });
    }
}


const interactionNodes = []
class InteractionNode extends Node {
    constructor(parent, CalculateOffset, behaviour, selected = false, minRadius = 0) {
        let offset = CalculateOffset();
        super(parent, offset);
        this.CalculateOffset = CalculateOffset;
        this.minRadius = minRadius;
        this.behaviour = behaviour;
        this.selected = selected;

        interactionNodes.push(this);
    }
    get radius() {
        return Math.max(NODE_RADIUS * 1 - Vec2.distance(mouse.pos, this.pos), this.minRadius);
    }
    Update() {
        if (this.selected && this.behaviour != undefined) this.behaviour();

        this.Draw();
    }
    Draw() {
        FillCircle(this.pos, this.radius, DRAW_COLOR);
    }
    IsInRange(pos) {
        return Vec2.distance(pos, this.pos) < NODE_RADIUS;
    }
}

function PositionBehaviour() {
    this.parent.offset = Vec2.sub(mouse.pos, this.offset);

    this.parent.UpdateShape();
}
function RadiusBehaviour() {
    this.parent.radius = Vec2.sub(mouse.pos, this.parent.pos).length;
    this.offset = Vec2.sub(mouse.pos, this.parent.pos);

    this.parent.UpdateShape();
}
function ScaleBehaviour() {
    let d = Vec2.sub(Vec2.sub(this.parent.offset, this.offset), mouse.pos);
    this.parent.size = Vec2.abs(d);
    this.parent.offset = Vec2.add(mouse.pos, Vec2.div(d, 2));

    this.parent.RecalculateNodeOffsets();
    this.parent.UpdateShape();
}
function DirectionBehaviour() {
    this.parent.dir = Vec2.sub(mouse.pos, this.parent.pos);
    this.parent.RecalculateNodeOffsets();
    this.parent.UpdateShape();
}


const shapes = [];
class Shape extends Node {
    constructor(parent, offset, label = "") {
        super(parent, offset);

        this.label = label;

        shapes.push(this);
    }
    UpdateChildren() {
        this.children.forEach(child => {
            if (child instanceof InteractionNode) {
                child.minRadius = this.IsInside(mouse.pos) * NODE_INACTIVE_RADIUS;
            }
            child.Update();
            child.UpdateChildren();
        });
    }
    Update() {}
    IsInside(point) {
        return false;
    }
    CreateShape() { }
    UpdateShape() {
        this.RemoveShape();
        this.shape = this.CreateShape();
    }
    RemoveShape() {
        svgCanvas.removeChild(this.shape);
    }
    RecalculateNodeOffsets() {
        this.children.forEach(child => {
            if(child instanceof InteractionNode) {
                child.offset = child.CalculateOffset();
            }
        });
    }
}


class Ball extends Shape {
    constructor(parent, offset, radius, selected = false) {
        super(parent, offset);

        this.radius = radius;
        this.shape = this.CreateShape();

        this.children = [
            new InteractionNode(this, () => Vec2(), PositionBehaviour),
            new InteractionNode(this, () => Vec2(this.radius, 0), RadiusBehaviour, selected)
        ];
    }
    IsInside(point) {
        return Vec2.distance(point, this.pos) < this.radius;
    }
    CreateShape() {
        let shape = CreateSVGGroup(svgCanvas, "Ball");
        CreateSVGCircle(shape, this.pos, this.radius, PATTERN, DRAW_COLOR, LINE_WIDTH);
        if(this.label != "") {
            let labelPosition = Vec2.sub(this.pos, Vec2(ctx.measureText(this.label).width / 2, this.radius + TEXT_OFFSET));
            CreateSVGText(shape, labelPosition, TEXT_SIZE, this.label, DRAW_COLOR);
        }
        return shape;
    }
}


class Box extends Shape {
    constructor(parent, offset, size, selected = false) {
        super(parent, offset);

        this.size = size;
        this.shape = this.CreateShape();

        this.children = [
            new InteractionNode(this, () => Vec2.div(this.size, -2), ScaleBehaviour),
            new InteractionNode(this, () => Vec2(this.size.x / 2, -this.size.y / 2), ScaleBehaviour),
            new InteractionNode(this, () => Vec2(-this.size.x / 2, this.size.y / 2), ScaleBehaviour),
            new InteractionNode(this, () => Vec2.div(this.size, 2), ScaleBehaviour, selected),
            new InteractionNode(this, () => Vec2(), PositionBehaviour)
        ];
    }
    IsInside(point) {
        if (point.x < this.pos.x - this.size.x/2 || point.x > this.pos.x + this.size.x/2) return false;
        if (point.y < this.pos.y - this.size.y/2 || point.y > this.pos.y + this.size.y/2) return false;
        return true;
    }
    CreateShape() {
        let shape = CreateSVGGroup(svgCanvas, "Box");
        CreateSVGRect(shape, Vec2.sub(this.pos, Vec2.div(this.size, 2)), this.size, Vec2(), PATTERN, DRAW_COLOR, LINE_WIDTH);
        if(this.label != "") {
            let labelPosition = Vec2.sub(this.pos, Vec2(ctx.measureText(this.label).width / 2, this.size.y / 2 + TEXT_OFFSET));
            CreateSVGText(shape, labelPosition, TEXT_SIZE, this.label, DRAW_COLOR);
        }
        return shape;
    }
}


class Line extends Shape {
    constructor(parent, offset, dir, selected = false) {
        super(parent, offset);

        this.dir = dir;
        this.shape = this.CreateShape();

        this.children = [
            new InteractionNode(this, () => Vec2(), PositionBehaviour),
            new InteractionNode(this, () => this.dir, DirectionBehaviour, selected)
        ];
    }
    IsInside(point) {
        if (point.x > Math.max(this.pos.x, this.pos.x + this.dir.x) + LINE_WIDTH) return false;
        if (point.x < Math.min(this.pos.x, this.pos.x + this.dir.x) - LINE_WIDTH) return false;
        if (point.y > Math.max(this.pos.y, this.pos.y + this.dir.y) + LINE_WIDTH) return false;
        if (point.y < Math.min(this.pos.y, this.pos.y + this.dir.y) - LINE_WIDTH) return false;
        let d = Math.abs(Vec2.cross(Vec2.sub(this.pos, point), Vec2.normalize(this.dir)));
        return d < LINE_WIDTH;
    }
    CreateShape() {
        let shape = CreateSVGGroup(svgCanvas, "Line");
        CreateSVGLine(shape, this.pos, Vec2.add(this.pos, this.dir), DRAW_COLOR, LINE_WIDTH);
        if(this.label != "") {
            let labelPosition = Vec2.sub(Vec2.add(this.pos, Vec2.div(this.dir, 2)), Vec2(ctx.measureText(this.label).width/2, TEXT_OFFSET));
            let transform = "rotate(" + this.dir.theta * (180 / Math.PI) + " " + Vec2.add(this.pos, Vec2.div(this.dir, 2)).x + " " + Vec2.add(this.pos, Vec2.div(this.dir, 2)).y + ")";
            CreateSVGText(shape, labelPosition, TEXT_SIZE, this.label, DRAW_COLOR, undefined, undefined, {transform:transform});
        }
        return shape;
    }
}