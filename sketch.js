class Pipe {
  constructor(gap, gapLoc, speed, width) {
    this.gap = gap;
    this.gapLoc = random(0, windowHeight);
    this.speed = speed;
    this.width = width;
    this.x = windowWidth;
    this.yUpper = windowHeight - this.gapLoc - (this.gap / 2);
    this.yLower = windowHeight - this.yUpper;

  }

  reset() {
    // Starts the pipe pair from the right of the window with new gap
    this.x = windowWidth;
    this.gapLoc = random(0, windowHeight);
  }

  step() {
    // Steps the pipes along the screen
    fill(51);
    // Lower pipe
    this.yLower = this.gapLoc - (this.gap / 2);
    rect(this.x, 0, this.width, this.yLower);
    // Upper pipe
    rect(this.x, this.yLower + this.gap, this.width,
          windowHeight - this.gap - this.yLower);
    // Move
    if (this.x > -this.width) {
      this.x -= this.speed;
    } else {
      this.reset();
    }
  }

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  pipe = new Pipe(100, 400, 2, 50);
}

function draw() {
  background(255);

  pipe.step();
}
