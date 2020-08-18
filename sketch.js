class Pipe {
  constructor(gap, gapLoc, speed, width) {
    this.gap = gap;
    this.gapLoc = gapLoc;
    this.speed = speed;
    this.width = width;
    this.x = windowWidth;
    this.yUpper = windowHeight - gapLoc - (gap / 2);
    this.yLower = windowHeight - this.yUpper;

  }

  step() {
    // Steps the pipes along the screen
    fill(51);
    // Lower pipe
    rect(this.x, 0, this.width, this.yLower);
    // Upper pipe
    rect(this.x, this.yLower + this.gap, this.width, this.yUpper);
    // Move
    this.x -= this.speed;
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  pipes = new Pipe(100, 400, 1, 50);
}

function draw() {
  background(255);

  pipe.step();
}
