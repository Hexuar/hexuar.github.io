// Element Class
class ClockElement extends HTMLCanvasElement {
  static observedAttributes = ["radius"];

  constructor() {
    self = super();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name=="radius") {
      this.width = newValue * 2;
      this.height = newValue * 2;
    }
  }
}
customElements.define("clock-element", ClockElement, { extends: "canvas" });


// Draw
function DrawClock(pos = new Vector2(50,50), radius = 90, color = "gray", backgroundColor = "lightGray", handleColors = ["green","red","orange","yellow"]) {
  let handleWidth = radius / 10;
  let date = new Date();

  let angles = [
    (date.getMilliseconds() - 0.001) / 1000 * 2 * Math.PI,
    (date.getSeconds() - 0.001) / 60 * 2 * Math.PI,
    (date.getMinutes() - 0.001) / 60 * 2 * Math.PI,
    (date.getHours() - 0.001) % 12 / 12 * 2 * Math.PI
  ]

  FillCircle(pos, radius, backgroundColor);
  StrokeCircle(pos, radius, color, handleWidth + 1.05);
  angles.forEach((angle, index) => {
    StrokeArc(pos, radius - handleWidth * (index+1), 0, angle, handleColors[index], handleWidth * 1.05);
  });
  FillCircle(pos, radius - handleWidth * 4.5, color, handleWidth + 1);
}


// Update
function UpdateClocks() {
  let clocks = document.querySelectorAll('canvas[is="clock-element"]');
  clocks.forEach(clock => {
    window.canvas = clock;
    window.ctx = clock.getContext("2d");

    radius = clock.getAttribute("radius");
    color = clock.getAttribute("color") || "gray";
    backgroundColor = clock.getAttribute("backgroundColor") || "lightGray";
    handleColors = [clock.getAttribute("millisecondColor") || "green", clock.getAttribute("secondColor") || "red", clock.getAttribute("minuteColor") || "orange", clock.getAttribute("hourColor") || "yellow"];

    DrawClock(new Vector2(radius,radius), radius * 0.9, color, backgroundColor, handleColors)
  });
  requestAnimationFrame(UpdateClocks);
}
UpdateClocks();
