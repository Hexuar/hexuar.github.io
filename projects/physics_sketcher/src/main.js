const svgCanvas = CreateSVGCanvas(undefined, {style:"position:absolute; top:0px; left:0px; z-index:-1;"});
CreateSVGRect(svgCanvas, Vec2(), canvas.size, Vec2(), BACKGROUND_COLOR);

const interactionDialog = document.getElementById("interactionDialog");
const interactionTextInput = interactionDialog.getElementsByTagName("input")[0];

let selectedNode = null;
let selectedShape = null;
let mouseActivated = true;
let mode = "ball";
const root = new Node();


function HandleInput() {
    if(selectedShape != null) {
        if(mouse.pressed(0)|| keyboard.pressed("Escape") || keyboard.pressed("Enter")) {
            if(keyboard.pressed("Enter")) selectedShape.label = interactionTextInput.value;
            selectedShape.UpdateShape();
            selectedShape = null;
            interactionDialog.close();
            return;
        }

        if(keyboard.pressed("Delete")) {
            let index = selectedShape.parent.children.indexOf(selectedShape);
            selectedShape.parent.children.splice(index);
            selectedShape.RemoveShape();
            selectedShape = null;
            interactionDialog.close();
            return;
        }
    }

    if(mouse.pressed(0)) {
        interactionNodes.forEach(node => {
            if (node == selectedNode) return;
            if (!node.IsInRange(mouse.pos)) return;
            if (selectedNode != null) return;
            node.selected = true;
            selectedNode = node;
        });

        if (selectedNode != null) return;
        let s;
        switch(mode) {
            case "ball":
                s = new Ball(root, mouse.pos, 0, true);
                break;
            case "box":
                s = new Box(root, mouse.pos, Vec2(), true);
                break;
            case "line":
                s = new Line(root, mouse.pos, Vec2(), true);
                break;
        }
        s.children.forEach(node => {
            if (!(node instanceof InteractionNode)) return;
            if (node.selected) selectedNode = node;
        });
    }

    if(mouse.released(0)) {
        if (selectedNode == null) return;
        selectedNode.selected = false;
        selectedNode = null;
    }

    if(mouse.pressed(2)) {
        if (selectedNode != null) return;
        shapes.forEach(shape => {
            if(!shape.IsInside(mouse.pos)) return;
            interactionDialog.show();
            interactionDialog.style.left = mouse.pos.x + 5 + "px";
            interactionDialog.style.top = mouse.pos.y - 30 + "px";
            interactionTextInput.value = shape.label;
            selectedShape = shape;
        });
    }
}

function Update() {
    Clear();

    if (mouseActivated) HandleInput();

    root.UpdateChildren();
}