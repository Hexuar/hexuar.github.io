function CreateSVGRuneString(parent, id, text, d, fill, stroke) {
    let runeString = CreateSVGObject(parent, "g", {"class":"runeString","id":id});
    CreateSVGPath(runeString, id+".pathA", d, "none", stroke, 12);
    CreateSVGPath(runeString, id+".pathB", d, "none", fill, 10);
    let textElement = CreateSVGText(runeString, {fontSize:"16px", fill:stroke});
    CreateSVGTextPath(textElement, "#"+id+".pathA", text, {"dominant-baseline":"central","id":id+".textPath"});

    return runeString;
}

function SetSVGRunePathAttributes(element, attributes) {
    SetAttributes(document.getElementById(element.id+".pathA"), attributes);
    SetAttributes(document.getElementById(element.id+".pathB"), attributes);
}