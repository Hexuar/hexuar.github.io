class Room {
    constructor(dir) {
        this.doors = new Map();
        if(dir != null) this.doors.set(dir, true);
    }
}



class Dungeon {
    constructor(origin, maxSize, endChance, spawnChance) {
        this.rooms = new Map();
        this.origin = origin;
        this.maxSize = maxSize;
        this.endChance = endChance;
        this.spawnChance = spawnChance;
    }

    Generate() {
        console.groupCollapsed("Generated Rooms");

        this.rooms = new Map();
        this.AddRoom();

        console.groupEnd();
    }

    Draw(size, color) {
        this.rooms.forEach((room, pos) => {
            let c = pos.x == pos.y && pos.y == 0 ? "red" : color;
            let worldCoords = Vec2.add(this.origin, Vec2.mul(pos, size*6/4));

            FillRectangle(worldCoords, new Vec2(size, size), c);
            room.doors.forEach((bool, door) => {
                StrokeLine(Vec2.add(worldCoords, size/2), Vec2.add(Vec2.add(worldCoords, size/2),Vec2.mul(door, size*3/4)), c, size/2);
            });
        });
    }

    AddRoom(pos = new Vec2(0,0), dir = new Vec2(1,0)) {
        if(this.rooms.size > this.maxSize) return;
        console.log(this.rooms.size + "/" + this.maxSize, pos, dir);

        if(!this.rooms.has(pos)) this.rooms.set(pos, new Room(pos.x == pos.y && pos.y == 0 ? null : dir));

        if(Math.random() < -1 / this.rooms.size + 1 - (1 + this.endChance)) return;

        let doorDir = dir;
        let possibleDirections = 3 + (pos.x == pos.y && pos.y == 0)
        for(let i = 0; i < possibleDirections; i++) {
            doorDir = new Vec2(doorDir.y, -doorDir.x);

            if(Math.random() < 1 / this.rooms.size + this.spawnChance) {
                this.AddRoom(Vec2.add(pos, doorDir), Vec2.mul(doorDir, -1));
                this.rooms.get(pos).doors.set(doorDir, true);
            }
        }
    }
}




let dungeon = new Dungeon(new Vec2(canvas.center.x, canvas.center.y), 20, 0.1, 0.25);
dungeon.Generate();

function Update() {
    Fill("white");

    if (keyboard.pressed(" ")) {
        dungeon.Generate();
    }

    dungeon.Draw(20, "black");
}