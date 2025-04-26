InputDevice = class {
  constructor() {
    this.pressed = function (key) {
      if (this[key] == undefined) return false;
      return this[key].pressed;
    }
    this.held = function (key) {
      if (this[key] == undefined) return false;
      return this[key].held;
    }
    this.released = function (key) {
      if (this[key] == undefined) return false;
      return this[key].released;
    }
    this.value = function (key) {
      if (this[key] == undefined) return false;
      return this[key].value;
    }
  }
}


// Keyboard
let keyboard = new InputDevice();

window.addEventListener('keydown', function (e) {
  keyboard[e.key] = { pressed: true, held: true, released: false };
});

window.addEventListener('keyup', function (e) {
  keyboard[e.key] = { pressed: false, held: false, released: true };
});


// Mouse
let displayCursor = true;
let mouse = new InputDevice();

document.addEventListener('mousedown', function (e) {
  mouse[e.button] = { pressed: true, held: true, released: false };
});

document.addEventListener('mouseup', function (e) {
  mouse[e.button] = { pressed: false, held: false, released: true };
});

document.addEventListener('mousemove', function (e) {
  mouse.pos = new Vector2(e.x, e.y);
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  return false;
});


// Gamepads
window.addEventListener("gamepadconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  gamepads[gp.index] = new InputDevice();
  gamepads[gp.index].leftStick = new Vector2(0,0);
  gamepads[gp.index].rightStick = new Vector2(0,0);
  console.log(
    "Gamepad connected at index %d: %s. %d buttons, %d axes.",
    gp.index,
    gp.id,
    gp.buttons.length,
    gp.axes.length,
  );
});

window.addEventListener("gamepaddisconnected", (e) => {
  const gp = navigator.getGamepads()[e.gamepad.index];
  gamepads[gp.index] = undefined;
  console.log(
    "Gamepad disconnected at index %d: %s. %d buttons, %d axes.",
    gp.index,
    gp.id,
    gp.buttons.length,
    gp.axes.length,
  );
});

let gamepads = [];
const gamepadButtonMaps = [
  [
    "cross",
    "circle",
    "square",
    "triangle",
    "l1",
    "r1",
    "l2",
    "r2",
    "share",
    "options",
    "l3",
    "r3",
    "up",
    "down",
    "left",
    "right",
    "ps",
    "touchpad"
  ]
]

function HandleGamepadButtons(buttons, gamepadIndex) {
  for (let i = 0; i < buttons.length; i++) {
    const buttonValue = buttons[i].value;

    if(i < gamepadButtonMaps[0].length) buttonName = gamepadButtonMaps[0][i];
    else buttonName = i;

    gamepads[gamepadIndex][buttonName] = { pressed: buttonValue != 0, held: buttonValue != 0, released: false, value: buttonValue };
  }
}

function HandleGamepadAxes(axes, gamePadIndex) {
  gamepads[gamePadIndex].leftStick = new Vector2(axes[0]||0, axes[1]||0);
  gamepads[gamePadIndex].rightStick = new Vector2(axes[2]||0, axes[3]||0);
  gamepads[gamePadIndex]["l2"].value = axes[4] ? (axes[4]+1)/2 : 0;
  gamepads[gamePadIndex]["l3"].value = axes[5] ? (axes[5]+1)/2: 0;
}


function UpdateInput() {
  if (!displayCursor) document.body.style.cursor = 'none';
  else document.body.style.cursor = 'default';

  Object.values(mouse).forEach(key => {
    if (key != "pos") {
      key.pressed = false;
      key.released = false;
    }
  });
  Object.values(keyboard).forEach(key => {
    key.pressed = false;
    key.released = false;
  });

  if (navigator.getGamepads().length != 0) {
    for (let i = 0; i < navigator.getGamepads().length; i++) {
      const gamepad = navigator.getGamepads()[i];
      HandleGamepadButtons(gamepad.buttons, i);
      HandleGamepadAxes(gamepad.axes, i);
    }
  }

  requestAnimationFrame(UpdateInput);
}
UpdateInput();