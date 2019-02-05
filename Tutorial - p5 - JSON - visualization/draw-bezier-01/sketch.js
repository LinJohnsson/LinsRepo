let anchor1;
let control1;
let control2;
let anchor12;

let circles = [];

const circleSize = 20;

function setup() {
  createCanvas(windowWidth, windowHeight);
  stroke(255);
  noFill();

  anchor1 = new Circle((width * 1) / 5, height / 2, circleSize, "anchor1");
  control1 = new Circle((width * 2) / 5, height / 2, circleSize * 2 / 3, "control1");
  control2 = new Circle((width * 3) / 5, height / 2, circleSize * 2/3, "control2");
  anchor2 = new Circle((width * 4) / 5, height / 2, circleSize, "anchor2");

  circles = [anchor1, control1, control2, anchor2];

}

function draw() {
  background(0);

  stroke(150);
  line(anchor1.x, anchor1.y, control1.x, control1.y);
  line(control2.x, control2.y, anchor2.x, anchor2.y);

  stroke(255);
  bezier(anchor1.x, anchor1.y, control1.x, control1.y, control2.x, control2.y, anchor2.x, anchor2.y);

  for(let i = 0; i < circles.length; i ++) {
    circles[i].update();
    circles[i].draw();
  }
  
}

class Circle {
  constructor(x, y, size, name) {
    this._x = x;
    this._y = y;
    this._size = size;

    this._name = name;

    this._color = 0;
    this._thisIsPressed = false;
  }

  update() {
    if (dist(this._x, this._y, mouseX, mouseY) <= 4) {
      this._color = 100;

      if (mouseIsPressed) {
        this._thisIsPressed = true;

      }

    } else {
        this._color = 0;  

    }

    if (this._thisIsPressed) {
      if (mouseIsPressed != true) {
        this._thisIsPressed = false;

      } else {
        this._x = mouseX;
        this._y = mouseY;

        this._color = 200;

      }


    }

  }

  draw() {
    stroke(255);
    fill(this._color);
    ellipse(this._x, this._y, this._size, this._size);
    fill(255);
    ellipse(this._x, this._y, 4, 4);
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }
}