const WAVE_SPEED = 400;
const MAX_WAVE_RADIUS = Vec2(canvas.width, canvas.height).length;


const waves = [];
class Wave {
    constructor(position, amplitude) {
        this.radius = 0;
        this.position = position;
        this.amplitude = amplitude;

        waves.push(this);
    }

    Update(deltaTime) {
        this.radius += WAVE_SPEED * deltaTime;

        if (this.radius > MAX_WAVE_RADIUS)  waves.splice(waves.indexOf(this), 1);

        this.Draw();
    }

    Draw() {
        StrokeCircle(this.position, this.radius, "red");
    }
}


const sources = [];
class Source {
    constructor(position, amplitude, frequency) {
        this.position = position;
        this.amplitude = amplitude;
        this.frequency = frequency;
        this.period_time = 1 / frequency;
        this.sendTime = new Date().getTime() / 1000 - this.period_time;

        sources.push(this);
    }

    Update() {
        const time = new Date().getTime() / 1000;
        if (time - this.sendTime > this.period_time) {
            new Wave(this.position, this.amplitude);
            this.sendTime = time;
        };
    }
}


const detectors = [];
class Detector {
    constructor(position, width) {
        this.position = position;
        this.detections = [];
        this.detected = false;
        this.width;

        detectors.push(this);
    }

    Update(deltaTime) {
        this.width = WAVE_SPEED * deltaTime;

        if(this.detected) {
            this.detected = false;
        }
        else {
            let data = ctx.getImageData(this.position.x, this.position.y, Math.ceil(this.width), Math.ceil(this.width)).data;

            let detection = false;
            for (let i = 0; i < data.length; i++) {
                if(data[i] != 255) {
                    detection = true;
                    break;
                }
            }
            if (detection) {
                let t = new Date().getTime();
                this.detections.push(t);
                this.detected = true;
            }
        }

        this.Draw();
    }

    Draw() {
        FillRectangle(this.position, Vec2(this.width, this.width), "black");
    }
}




//new Source(Vec2(700, 600), 1, 1);

let O = Vec2(500, 500), R = Vec2(0, -300);
let A = new Detector(Vec2.add(O, R));
R.theta += 2*Math.PI/3;
let B = new Detector(Vec2.add(O, R));
R.theta += 2 * Math.PI / 3;
let C = new Detector(Vec2.add(O, R));

let p1 = new Vec2(), p2 = new Vec2(), p3 = new Vec2();
let lA = new Vec2(), lB = new Vec2(), lC = new Vec2(), lD = new Vec2(), lE = new Vec2(), lF = new Vec2();


function handleData() {
    if(A.detections.length != 0 && B.detections.length != 0 && C.detections.length != 0) {
        let a = A.detections[0];
        let b = B.detections[0];
        let c = C.detections[0];

        let ab = Vec2.sub(A.position, B.position);
        let ac = Vec2.sub(A.position, C.position);
        let bc = Vec2.sub(B.position, C.position);

        let d1 = (b - a)/1000 * WAVE_SPEED;
        p1 = new Vec2.sum([B.position, Vec2.div(ab, 2), Vec2.mul(Vec2.normalize(ab), d1/2)]);

        let d2 = (c - a)/1000 * WAVE_SPEED;
        p2 = new Vec2.sum([C.position, Vec2.div(ac, 2), Vec2.mul(Vec2.normalize(ac), d2/2)]);

        let d3 = (c - b)/1000 * WAVE_SPEED;
        p3 = new Vec2.sum([C.position, Vec2.div(bc, 2), Vec2.mul(Vec2.normalize(bc), d3/2)]);

        ab.normalize();
        ac.normalize();

        lA = Vec2(ab.dot(p1) / ab.x, 0);
        lB = Vec2((ab.dot(p1) - ab.y * canvas.height) / ab.x, canvas.height);
        lC = Vec2(ac.dot(p2) / ac.x, 0);
        lD = Vec2((ac.dot(p2) - ac.y * canvas.height) / ac.x, canvas.height);
        lE = Vec2(bc.dot(p3) / bc.x, 0);
        lF = Vec2((bc.dot(p3) - bc.y * canvas.height) / bc.x, canvas.height);

        A.detections.shift();
        B.detections.shift();
        C.detections.shift();
    }
}


function Update(deltaTime) {
    Fill("white");

    FillCircle(p1, 5, "red");
    FillCircle(p2, 5, "green");
    FillCircle(p3, 5, "blue");

    StrokeLine(lA, lB, "red");
    StrokeLine(lC, lD, "green");
    StrokeLine(lE, lF, "blue");

    if (mouse.pressed(0)) new Wave(mouse.pos, 1);

    sources.forEach(source => {
        source.Update();
    });

    waves.forEach(wave => {
        wave.Update(deltaTime);
    });

    detectors.forEach(detector => {
        detector.Update(deltaTime);
    });

    handleData();
}