class Slider extends HTMLElement {
  constructor() {
    super();
  }

  set min(val) {
    this.setAttribute("min", val);
    this.childNodes.forEach(child => {
      child.min = val;
    });
  }
  get min() {
    return this.getAttribute("min")
  }
  set max(val) {
    this.setAttribute("max", val);
    this.childNodes.forEach(child => {
      child.max = val;
    });
  }
  get max() {
    return this.getAttribute("max")
  }
  set value(val) {
    this.setAttribute("value", val);
    this.childNodes.forEach(child => {
      child.value = val;
    });
  }
  get value() {
    return this.getAttribute("value")
  }

  connectedCallback() {
    if (this.min == null) this.min = 0;
    if (this.max == null) this.max = 0;
    if (this.value == null) this.value = 0;

    let range = document.createElement("input");
    range.type = "range";
    range.min = this.min;
    range.max = this.max;
    range.value = this.value;
    this.appendChild(range);

    let number = document.createElement("input");
    number.type = "number";
    number.min = this.min;
    number.max = this.max;
    number.value = this.value;
    this.appendChild(number);

    range.addEventListener("input", () => {
      this.value = range.value;
      number.value = range.value;
    });

    number.addEventListener("input", () => {
      this.value = number.value;
      range.value = number.value;
    });
  }
}
window.customElements.define("number-slider", Slider);