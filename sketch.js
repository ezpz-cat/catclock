let pendulum; 
let tail;
let body;
function preload() {
  tail = loadImage('images/tail.png')
  body = loadImage('images/body.png')
}
class Pendulum {
  constructor(x, y, r) {
    // Fill all variables
    this.origin = createVector(x, height/2);
    this.position = createVector();
    this.r = r;
    this.angle = PI / 4;

    this.aVelocity = 0.0;
    this.aAcceleration = 0.0;
    this.damping = 0.998; // Arbitrary damping

    this.dragging = false;
  }
  update() {
    if (!this.dragging) {
      let gravity = 0.6;
      this.aAcceleration = (-1 * gravity / this.r) * sin(this.angle);
      this.aVelocity += this.aAcceleration;
      this.aVelocity *= this.damping;
      this.angle += this.aVelocity;
    }
  }

  display() {
    this.position.set(this.r * sin(this.angle), this.r * cos(this.angle), 0);
    this.position.add(this.origin);   
    push();
    translate(this.position.x,this.position.y)
    imageMode(CENTER)
    rotate(-1*this.angle)
    image(tail, 0, -200, 0, 0);
    pop();
    push();
    translate(width/2,715);
    imageMode(CENTER);
    image(body,0,0,0,0);
    pop();
  }
  clicked(mx, my) {
    let d = dist(mx, my, this.position.x, this.position.y);
    if (d < this.origin); {
      this.dragging = true;
    }
  }
  stopDragging() {
    this.aVelocity = 0; // No velocity once you let go
    this.dragging = false;
  }

  drag() {
    if (this.dragging) {
      let diff = p5.Vector.sub(this.origin, createVector(mouseX, mouseY)); // Difference between 2 points
      this.angle = atan2(-1 * diff.y, diff.x) - radians(90); // Angle relative to vertical axis
    }
  }
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  pendulum = new Pendulum(width / 2, 0, 417)
}
function draw() {
  background(255,60,0);
  pendulum.update();
  pendulum.drag(); // for user interaction
  pendulum.display();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  pendulum.clicked(mouseX, mouseY);
}
function mouseReleased() {
  pendulum.stopDragging();
}
