let oldMousePos = new Vector2();


Fill("#244524");
//FillText(new Vector2(100, 100), "Hello World!", 20, "white", 2);

FillRegularPolygon(new Vector2(100, 100), 10, 40, "red");

function update() {

  if(mouse.held(0)) {
    StrokeLine(oldMousePos, mouse.pos, "white", 5);
    oldMousePos.eq(mouse.pos);
  }

  if(!mouse.held(0)) {
    oldMousePos = new Vector2();
  }

}