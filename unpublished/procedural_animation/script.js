const color = "hsl(389.7748540242311 20% 50%)";



let r = 10;
let d = 50;
let n = 40;
let segments = [];
for (i = 0; i < n; i++) {
    segments.push(Vec2(200, 200 + 1.5 * d * i));
}




function Update(deltaTime) {
    Fill("hsl(209.77485402423108 20% 25%)");


    for (i = 0; i < n; i++) {
        FillCircle(segments[i], r, color);

        if (i == 0) {
            segments[i] = mouse.pos;
        }
        else {
            segments[i] = Vec2.add(segments[i - 1], Vec2.sub(segments[i], segments[i - 1]).normalize().mul(d));
        }
    }

}