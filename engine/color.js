let colorDiv = document.createElement("div");
document.head.appendChild(colorDiv);

function Color(r = 0, g = 0, b = 0, a = 1) {
    if (!(this instanceof Color)) return new Color(r, g, b, a);
    if (typeof r === 'string') return Color.fromString(r);
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
}

Color.prototype = {
    toString : function() {
        return "rgb(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")";
    }
}

Color.setAlpha = function(color, a) {
    return new Color(color.r, color.g, color.b, a);
}

Color.fromString = function(color) {
    colorDiv.style.color = color;

    let rgb_string = window.getComputedStyle(colorDiv).color;
    rgb_string = rgb_string.substring(4, rgb_string.length - 1);
    rgb_string = rgb_string.replaceAll(' ', '');

    rgb_values = rgb_string.split(',');
    rgb_values.forEach((value, index) => { rgb_values[index] = Number(value); });
    if (rgb_values.length == 3) rgb_values.push(1);

    return new Color(rgb_values[0], rgb_values[1], rgb_values[2], rgb_values[3]);
}