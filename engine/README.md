# Hexuar's JavaScript Engine
A collection of useful functions sorted neatly into packages using a custom package system.

___

## The package system
When including **engine.js** into your HTML document, it will automatically load all of the engines built in packages (listed below), as well as any packages defined in a **packages.json** file in the same directory as the HTML file. The structure of **packages.json** is as follows:
```JSON
{
  "packageGroup": "Application",  // The console group to log in once loaded.
  "collapseGroup": false,          // Whether or not to collapse the log group (default = false).
  "packageDirectory": "src",      // The directory containing the below source files.
  "packages": [                   // A list of all included source files.
    "get_css_variables.js",
    "node.js",
    "main.js"
  ]
}
```
Once loaded, the engine will put a message in the console log to let you know which packages are loaded and if any of them had issues doing so.

___

## Built-in Packages

### **vec2.js**
Provides a simple 2d vector class.
```JS
let u = Vec2(1, 2);
let v = Vec2(3, 4);
console.log("u + v = " + Vec2.add(u, v)) //> "u + v = [4, 6]"
```

### **math.js**
Extends **Math** with a few useful functions.
```JS
Math.roundF(x, n = 0);      // Rounds a floating-point number to n digits.
Math.distance(a, b);        // Distance between points a & b.
Math.sq(x);                 // Square.
```

### **color.js**
Provides a simple color class.
```JS
let red = Color(255, 0, 0, 1);
let green = Color("green");
console.log("color: " + green); //> "color: rgb(0,255,0,1)"
```

### **canvas.js**
Creates a viewport-stretching canvas ready to use out of the box. Should you not want to use the canvas, it can of course be removed from the document in post:
```JS
document.body.removeChild(canvas);
```

### **draw.js**
Provides a multitude of functions used to draw on the canvas provided by **canvas.js**.
```JS
FillCircle(Vec2(100, 100), 150, "red"); // Renders a red circle with radius 150 at [100, 100].
```

### **input.js**
Provides a way of reading mouse-, keyboard- and controller input.
```JS
mouse.pressed(0);           // true if left mouse button was just pressed.
keyboard.held("Escape");    // true if escape is currently being held.
keyboard.released(" ");     // true if space was just released.
```

### **svg.js**
Provides functions for creating SVG elements.
```JS
const svgCanvas = CreateSVGCanvas();
CreateSVGRect(svgCanvas, Vec2(0, 0), Vec2(100, 100), Vec2(), BACKGROUND_COLOR);
```
