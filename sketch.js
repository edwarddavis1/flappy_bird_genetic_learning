class Pipe {
  constructor(gap, speed, width, startDelay) {
    this.gap = gap;
    this.gapLoc = random(0, windowHeight);
    this.speed = speed;
    this.width = width;
    this.startDelay = startDelay;
    this.x = windowWidth + startDelay;
    this.yLower = windowHeight - this.gapLoc - (this.gap / 2);
    this.yUpper = windowHeight - this.yLower;
    this.lowerPipeColour = [51, 51, 51];
    this.upperPipeColour = [51, 51, 51];
  }

  reset() {
    // Starts the pipe pair from the right of the window with new gap
    this.x = windowWidth;
    this.gapLoc = random(0, windowHeight);
    this.lowerPipeColour = [51, 51, 51];
    this.upperPipeColour = [51, 51, 51];
  }

  step() {
    // Steps the pipes along the screen
    // Upper pipe
    fill(this.upperPipeColour);
    this.yUpper = this.gapLoc - (this.gap / 2);
    rect(this.x, 0, this.width, this.yUpper);
    // Lower pipe
    fill(this.lowerPipeColour);
    this.yLower = this.yUpper + this.gap;
    rect(this.x, this.yLower, this.width,
          windowHeight - this.gap - this.yUpper);
    // Move
    if (this.x > -this.width) {
      this.x -= this.speed;
    } else {
      this.reset();
    }
  }
  isCollidingWith(bird) {
    if (bird.x >= this.x && bird.x <= this.x + this.width && bird.alive) {
      if (bird.y < this.yUpper) {
        // Check upper pipe
        this.upperPipeColour = [255, 0, 0];
        console.log('Upper collision');
        return true;
      } else if (bird.y > this.yLower) {
        // Check lower pipe
        this.lowerPipeColour = [255, 0, 0];
        console.log('Lower collision');
        return true;
      } else {
        this.lowerPipeColour = [51, 51, 51];
        this.upperPipeColour = [51, 51, 51];
        return false;
      }
    }
  }
}

class Bird {
  constructor() {
    this.size = 10;
    this.jumpSpeed = 4;
    this.ySpeed = 0;
    this.accelerationConst = 1;
    this.gravity = 0.01;
    this.x = windowWidth / 10;
    this.y = windowHeight / 2;
    this.score = 0;
    this.alive = true;
  }
  jump() {
    if (this.alive) {
      // Sudden increase in upwards speed
      this.ySpeed = this.jumpSpeed;
      this.accelerationConst = 0;
      if (this.y > 0) {
        this.y -= this.ySpeed;
      }
    }
  }
  step(pipes) {
    if (this.alive) {
      this.score += 1;

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

    } else {
      // If the bird hits a pipe
      if (this.x > 0) {
        // Pipe speed
        this.x -= pipes.speed;
        fill(255, 0, 0);
        ellipse(this.x, this.y, this.size, this.size);
      }
    }
  }
  dead() {
    this.alive = false;
  }
}

let pipes = [];
var freq = 2;
function setup() {
  // Window setup
  createCanvas(windowWidth, windowHeight);
  background(255);

  // Pipes setup
  var framesToPass = pipes.speed * windowWidth;
  var gap = 100;
  var speed = 7;
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
  var leadX = windowWidth;
  var leadPipeIndex = 0;
  for (let i = 0; i < freq; i++) {
    if (pipes[i].x < leadX) {
      leadX = pipes[i].x;
      leadPipeIndex = i;
    }
    pipes[i].step();
  }

  // Draw birds
  if (mouseIsPressed) {
    bird.jump();
  }
  bird.step(pipes[leadPipeIndex]);
  console.log(leadPipeIndex);

  // THIS MAY BE TOO LATE
  // Check if birds hit pipe in front
  if (pipes[leadPipeIndex].isCollidingWith(bird)) {
    bird.dead();
  }

}
