const WAVE_SPEED = 200;
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




new Source(Vec2(300, 200), 1, 10);
let A = new Detector(Vec2(200, 200));
let B = new Detector(Vec2(800, 200));
let C = new Vec2();


function handleData() {
    if(A.detections.length != 0 && B.detections.length != 0) {
        let a = A.detections[0];
        let b = B.detections[0];

        let dt = (b - a)/1000;
        let dd = dt * WAVE_SPEED;
        let ab = Vec2.sub(A.position, B.position);
        let p = Vec2.sum([B.position, Vec2.div(ab, 2), Vec2.mul(Vec2.normalize(ab), dd/2)]);

        C = p;
        if(Math.abs(dd - ab.length) < 1) C = new Vec2();

        lineA = Vec2.add(p, Vec2.mul(ab.left, 1000));
        lineB = Vec2.add(p, Vec2.mul(ab.left, -1000))

        A.detections.shift();
        B.detections.shift();
    }
}


function Update(deltaTime) {
    Fill("white");

    FillCircle(C, 5, "green");

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