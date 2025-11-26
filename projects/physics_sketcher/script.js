let selected = "ball";

function Update() {
    Fill(BACKGROUND_COLOR);

    if(mouse.pressed(2)) {
        switch(selected) {
            case "ball":
                new Ball(mouse.pos, 100, "", true);
                break;
            case "box":
                new Box(mouse.pos, Vec2(), "", true);
                break;
            case "vector":
                new Vector(mouse.pos, Vec2(), "", true);
                break;
        }
    }

    objects.forEach(object => {
        object.Update();
    });
}