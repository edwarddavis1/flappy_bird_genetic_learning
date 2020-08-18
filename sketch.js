class Pipe {
  constructor(gap, speed, width, startDelay) {
    this.gap = gap;
    this.gapLoc = random(0, windowHeight);
    this.speed = speed;
    this.width = width;
    this.startDelay = startDelay;
    this.x = windowWidth + startDelay;
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
let pipes = [];
var frame = 0;
var freq = 3;
function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);

  var framesToPass = pipes.speed * windowWidth;
  var gap = 100;
  var speed = 2;
  var width = 50;
  for (let i = 0; i < freq; i++) {
    pipes[i] = new Pipe(gap = gap, speed = speed, width = width,
                          i * ((windowWidth + width) / (freq)));
  }
}

function draw() {
  background(255);
  frame += 1;

  for (let i = 0; i < freq; i++) {
    pipes[i].step();
  }
}
