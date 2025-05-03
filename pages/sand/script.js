const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
canvas.width = innerWidth;
canvas.height = innerHeight;


function Array2D(cols, rows) {
    var array = []
    for(var x = 0; x < cols; x++) {
        array.push([]);
        for(var y = 0; y < rows; y++) {
            array[x].push(0);
        }
    }
    return array;
}

function DrawRect(x, y, w, h, color = "black") {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function Fill(color = "black") {
    DrawRect(0, 0, innerWidth, innerHeight, color);
}

class World {
    constructor(width, height, resolution, spacing) {
        this.width = width;
        this.height = height;
        this.resolution = resolution;
        this.spacing = spacing;
        this.matrix = Array2D(width, height);
    }

    Update() {
        const oldMatrix = structuredClone(this.matrix);
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                const c = oldMatrix[x][y];

                if(c == 0) continue;

                if(oldMatrix[x][y+1] == 0) {
                    this.matrix[x][y] = 0;
                    this.matrix[x][y+1] = c;
                }
                else {
                    if(x + 1 < this.width && oldMatrix[x+1][y] == 0 && oldMatrix[x+1][y+1] == 0) {
                        this.matrix[x][y] = 0;
                        this.matrix[x+1][y+1] = c;
                    }
                    else if(x > 0 && oldMatrix[x-1][y] == 0 && oldMatrix[x-1][y+1] == 0) {
                        this.matrix[x][y] = 0;
                        this.matrix[x-1][y+1] = c;
                    }
                }
            }
        }
    }

    Draw() {
        for(var x = 0; x < this.width; x++) {
            for(var y = 0; y < this.height; y++) {
                const c = this.matrix[x][y];
                DrawRect(x * this.resolution + this.spacing, y * this.resolution + this.spacing, this.resolution - this.spacing, this.resolution - this.spacing, "rgb(" + c + "," + c + "," + c + ")");
            }
        }
    }
}







const world = new World(128,128,5,0);


function Update() {
    Fill("gray");

    for(var i = 0; i < 20; i++) {
        world.matrix[Math.floor(Math.random()*world.width)][0] = Math.random() * 255;
    }
    

    world.Update();
    world.Draw();
}



function Tick() {
    Update();
    requestAnimationFrame(Tick);
}
Tick();