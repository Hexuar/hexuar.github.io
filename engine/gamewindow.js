let GameWindowList = [];
class GameWindow {
    constructor(fullScreen = true) {
        let canvas = document.createElement("canvas");
        if(fullScreen) canvas.style = "position:absolute; top:0px; left:0px"
        document.body.appendChild(canvas);

        this.canvas = canvas;
        this.ctx = canvas.getContext("2d");
        this.fullScreen = fullScreen;

        GameWindowList.push(this);
    }
    update() {}
}

function UpdateGameWindows() {
    GameWindowList.forEach(gameWindow => {

        if(gameWindow.fullScreen) {
            if(gameWindow.canvas.width != window.innerWidth) gameWindow.canvas.width = window.innerWidth;
            if(gameWindow.canvas.height != window.innerHeight) gameWindow.canvas.height = window.innerHeight;
        }

        window.canvas = gameWindow.canvas;
        window.ctx = gameWindow.ctx;

        gameWindow.update();
    });
    requestAnimationFrame(UpdateGameWindows);
}
UpdateGameWindows();