class InputDevice {
    constructor() {
        this.pressed = function(key) {
            if(this[key] == undefined) return false;
            return this[key].pressed;
        }
        this.held = function(key) {
            if(this[key] == undefined) return false;
            return this[key].held;
        }
        this.released = function(key) {
            if(this[key] == undefined) return false;
            return this[key].released;
        }
    }
}

class Key {
    constructor() {
        this.pressed = false;
        this.held = false;
        this.released = false;
    }
}

const keyboard = new InputDevice();

function inputloop() {
    for (const [key, value] of Object.entries(keyboard)) {
        value.pressed = false;
        value.released = false;
    }
    mouse.scroll = 0;
}

window.addEventListener('keydown', function(e){
    if(keyboard[e.key] == undefined) {
        keyboard[e.key] = new Key();
    }
    keyboard[e.key].pressed = true;
    keyboard[e.key].held = true;
});

window.addEventListener('keyup', function(e){
    if(keyboard[e.key] == undefined) {
        keyboard[e.key] = new Key();
    }
    keyboard[e.key].released = true;
    keyboard[e.key].held = false;
});

const mouse = {};
mouse.scroll = 0;
mouse.pos = {x:0, y:0};

window.addEventListener('mousemove', function(e) {
    mouse.pos.x = e.clientX;
    mouse.pos.y = e.clientY;
});

window.addEventListener('wheel', function(e) {
    mouse.scroll = Math.sign(e.deltaY);
});