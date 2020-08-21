// Created by: Edward Davis
// Inspired by: https://www.youtube.com/watch?v=YtRA6tqgJBc&t=1063s

// This class controls the birds using this.brain (nn) and animates the bird
// using this.step()

class Bird {
  constructor(brain) {
    this.size = 10;
    this.jumpSpeed = 4;
    this.ySpeed = 0;
    this.accelerationConst = 1;
    this.gravity = 0.01;
    this.x = windowWidth / 10;
    this.y = windowHeight / 2;
    this.score = 0;
    this.alive = true;

    if (brain) {
      this.brain = brain;
    } else {
      this.brain = new NeuralNetwork(4, 4, 1);
    }
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

      // Bird decides if it's going to jump or not
      let inputs = [this.y, pipes.x, pipes.yUpper, pipes.yLower];
      let output = this.brain.predict(inputs);
      if (output > 0.5) {
        this.jump();
      }

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
      fill(0, 50);
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