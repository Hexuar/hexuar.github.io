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

    //if(buttonValue != 0) console.log(i + " " + buttonName + " " + buttonValue)

    gamepads[gamepadIndex][buttonName] = { pressed: buttonValue != 0, held: buttonValue != 0, released: false, value: buttonValue };
  }
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

  let gamepads = navigator.getGamepads();
  if (gamepads.length != 0) {
    for (let i = 0; i < gamepads.length; i++) {
      const gamepad = gamepads[i];
      if(gamepad == null) continue;
      HandleGamepadButtons(gamepad.buttons, i);
    }
  }

  requestAnimationFrame(UpdateInput);
}
UpdateInput();