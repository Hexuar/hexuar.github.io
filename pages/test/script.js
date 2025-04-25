let mainWindow = new GameWindow();
let playerPos = new Vector2(100, 100);

mainWindow.update = function () {
    Fill("teal");

    FillCircle(playerPos, 20, "white");

    if (keyboard.held("ArrowUp")) playerPos.y--;
    if (keyboard.held("ArrowDown")) playerPos.y++;
    if (keyboard.held("ArrowLeft")) playerPos.x--;
    if (keyboard.held("ArrowRight")) playerPos.x++;

    if(gamepads[0] != undefined) {
      playerPos.x -= gamepads[0].value("left");
      playerPos.x += gamepads[0].value("right");
      playerPos.y -= gamepads[0].value("up");
      playerPos.y += gamepads[0].value("down");
    }
}