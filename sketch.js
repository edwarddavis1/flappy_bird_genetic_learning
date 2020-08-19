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

class Bird {
  constructor() {
    this.size = 10;
    this.jumpSpeed = 3;
    this.ySpeed = 0;
    this.accelerationConst = 1;
    this.gravity = 0.01;
    this.x = windowWidth / 10;
    this.y = windowHeight / 2;
  }
  jump() {
    // Sudden increase in upwards speed
    this.ySpeed = this.jumpSpeed;
    this.accelerationConst = 0;
    if (this.y > 0) {
      this.y -= this.ySpeed;
    }
  }
  step() {
    // Acceleration due to gravity
    this.ySpeed -= this.gravity * this.accelerationConst;

    // Stop bird going below window
    if (this.y < windowHeight - this.size) {
      this.y -= this.ySpeed;
      if (this.y > windowHeight - this.size) {
        this.y = windowHeight - this.size;
      }
    }

    // Stop bird going above window
    if (this.y < 0) {
      this.y = 0;
    }
    this.accelerationConst ++;

    // Draw bird
    fill(0);
    ellipse(this.x, this.y, this.size, this.size);
  }
}

let pipes = [];
var freq = 1;

function setup() {
  // Window setup
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Pipes setup
  var framesToPass = pipes.speed * windowWidth;
  var gap = 100;
  var speed = 2;
  var width = 50;
  for (let i = 0; i < freq; i++) {
    pipes[i] = new Pipe(gap = gap, speed = speed, width = width,
                          i * ((windowWidth + width) / (freq)));
  }

  // Birds setup
  bird = new Bird();
}

function draw() {
  background(255);

  // Draw pipes
  for (let i = 0; i < freq; i++) {
    pipes[i].step();
  }

  // Draw birds
  if (mouseIsPressed) {
    bird.jump();
  }
  bird.step();
}
