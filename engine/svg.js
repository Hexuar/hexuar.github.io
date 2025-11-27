// SVG Namespace
const SVGNS = "http://www.w3.org/2000/svg";



// Attributes
function SetAttributes(element, attributes) {
  for (var key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

function SetCenterAttributes(element, center) {
  SetAttributes(element, {"cx":center.x, "cy":center.y})
}

function SetLineAttributes(element, posA, posB) {
  SetAttributes(element, {"x1":posA.x, "y1":posA.y, "x2":posB.x, "y2":posB.y})
}



// SVG Elements
function CreateSVGObject(parent, id, attributes) {
  let element = document.createElementNS(SVGNS, id);
  SetAttributes(element, attributes);
  parent.appendChild(element);

  return element;
}

function CreateSVGElement(parent = document.body, attributes) {
  attributes.xmlns = SVGNS;
  return CreateSVGObject(parent, "svg", attributes);
}

function CreateViewBox(parent, x, y, width, height, attributes) {
    return CreateSVGElement(parent, {...{viewBox: x + "," + y + "," + width + "," + height }, ...attributes});
}

function CreateSVGCanvas(attributes) {
    return CreateViewBox(undefined, 0, 0, canvas.width, canvas.height, {...{ style: "position: absolute; top:0px; left:0px;" }, ...attributes});
}

function CreateSVGLine(parent, posA, posB, stroke, strokeWidth, attributes = {}) {
  attributes.x1 = posA.x;
  attributes.y1 = posA.y;
  attributes.x2 = posB.x;
  attributes.y2 = posB.y;
  attributes.stroke = stroke;
  attributes["stroke-width"] = strokeWidth;
  return CreateSVGObject(parent, "line", attributes);
}

function CreateSVGCircle(parent, pos, radius, fill, attributes = {}) {
  attributes.cx = pos.x;
  attributes.cy = pos.y;
  attributes.r = radius;
  attributes.fill = fill;
  return CreateSVGObject(parent, "circle", attributes);
}

function CreateSVGRect(parent, pos, size, radius, fill, attributes = {}) {
  attributes.x = pos.x;
  attributes.y = pos.y;
  attributes.width = size.x;
  attributes.height = size.y;
  attributes.rx = radius.x;
  attributes.ry = radius.y;
  attributes.fill = fill;
  return CreateSVGObject(parent, "rect", attributes);
}

function CreateSVGPath(parent, id, d, fill, stroke, strokeWidth, attributes = {}) {
  attributes.id = id;
  attributes.d = d;
  attributes.fill = fill;
  attributes.stroke = stroke;
  attributes["stroke-width"] = strokeWidth;
  return CreateSVGObject(parent, "path", attributes);
}

function CreateSVGText(parent, attributes = {}) {
  return CreateSVGObject(parent, "text", attributes);
}

function CreateSVGTextPath(parent, href, text, attributes = {}) {
  attributes.href = href;
  let element = CreateSVGObject(parent, "textPath", attributes);
  element.textContent = text;
  return element;
}



// Paths
class SVGPathOperation {
  constructor(id, args) {
    this.id = id;
    this.args = args;
  }
  toString() {
    let string = this.id;

    if(!Array.isArray(this.args)) return this.id + " " + this.args;

    this.args.forEach(arg => {
      string += " " + arg;
    });

    return string;
  }
}

class SVGPath {
  constructor(ops) {
    this.ops = [];
    ops.forEach(op => {
      this.ops.push(new SVGPathOperation(op[0], op[1]));
    });
  }
  toString() {
    let string = "";
    this.ops.forEach(op => {
      string += " " + op;
    });
    return string;
  }
}