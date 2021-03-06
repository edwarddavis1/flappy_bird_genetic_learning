// Created by: Edward Davis
// Inspired by: https://www.youtube.com/watch?v=YtRA6tqgJBc&t=1063s

// This class controls the dimensions of the pipes, gaps in the pipes as well
// as their speed and frequency.
// These parameters can be changed to vary the game difficulty

class Pipe {
  constructor(gap, speed, width, startDelay, graphics=true) {
    this.gap = gap;
    this.gapLoc = random(0, windowHeight);
    // this.gapLoc = 0;
    this.constGapCounter = 0;
    this.speed = speed;
    this.width = width;
    this.startDelay = startDelay;
    this.x = windowWidth + startDelay;
    this.yLower = windowHeight - this.gapLoc - (this.gap / 2);
    this.yUpper = windowHeight - this.yLower;
    this.lowerPipeColour = [51, 51, 51];
    this.upperPipeColour = [51, 51, 51];
    this.graphics = graphics;
  }
  setSpeed(newSpeed) {
    this.speed = newSpeed;
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
    this.yUpper = this.gapLoc - (this.gap / 2);
    // Lower pipe
    this.yLower = this.yUpper + this.gap;
    // Animate
    if (this.graphics) {
      fill(this.upperPipeColour);
      rect(this.x, 0, this.width, this.yUpper);
      fill(this.lowerPipeColour);
      rect(this.x, this.yLower, this.width,
            windowHeight - this.gap - this.yUpper);
    }
    // Move
    if (this.x > -this.width) {
      this.x -= this.speed;
    } else {
      this.reset();
    }
  }
  isCollidingWith(bird) {
    // Returns true if bird colliding with pipe, false otherwise
    if (bird.x >= this.x && bird.x <= this.x + this.width && bird.alive) {
      if (bird.y < this.yUpper) {
        // Check upper pipe
        this.upperPipeColour = [255, 0, 0];
        return true;
      } else if (bird.y > this.yLower) {
        // Check lower pipe
        this.lowerPipeColour = [255, 0, 0];
        return true;
      } else {
        this.lowerPipeColour = [51, 51, 51];
        this.upperPipeColour = [51, 51, 51];
        return false;
      }
    }
  }
}
