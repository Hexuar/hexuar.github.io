let div = document.getElementById("SVGcanvas");



// SVG
let svg = CreateSVGElement(div, {"viewBox":"0,0,100,100"});
CreateSVGRect(svg, new Vector2(), new Vector2(100, 100), new Vector2(), "lightgray");

let A = new Point(10,80);
let B = new Point(10,20);
let C = new Point(10,10);
let D = new Point(20,10);
let E = new Point(80,10);
let F = new Point(90,10);
let G = new Point(90,20);
let H = new Point(90,80);
let I = new Point(90,90);
let J = new Point(80,90);
let K = new Point(20,90);
let L = new Point(10,90);

let path = new SVGPath([["M",A], ["L",B], ["Q",[C,D]], ["L",E], ["Q",[F,G]], ["L",H], ["Q",[I,J]], ["L", K], ["Q",[L,A]]]);
let runeString = CreateSVGRuneString(svg, "runeString", document.getElementById("runeInput").value, path , "lightgray", "red");



// GUI
Draw.AddLayer("gui", 1);
Draw.canvas.style.width = div.getBoundingClientRect().width + "px";
Draw.canvas.style.height = div.getBoundingClientRect().height + "px";
Draw.canvas.width = 1000;
Draw.canvas.height = 1000;
Draw.canvas.size = new Vector2(Draw.canvas.width, Draw.canvas.height);
div.appendChild(Draw.canvas);



// Update
let mousePos = new Vector2();
function GetCanvasMousePos() {
    let rect = div.getBoundingClientRect();
    if(mouse.pos != undefined) mousePos = Vector2.divide(Vector2.subtract(mouse.pos, Vector2.new(rect)), new Vector2(rect.width, rect.height)).multiply(100);
}

function Update() {
    GetCanvasMousePos();

    Clear();

    points.forEach(point => {
        point.Draw();
    });

    requestAnimationFrame(Update);
}
Update();