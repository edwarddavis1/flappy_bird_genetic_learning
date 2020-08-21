// The population class uses the bird and pipe derived classes to animate the
// entire game.
// This class allows for the gradual evolution of the bird population over
// multiple generations

class Population {
  constructor(numBirds, pipeFreq) {
    this.numBirds = numBirds;
    this.pipeFreq = pipeFreq;
    this.pipes = [];
    this.birds = [];
    this.deadBirds = 0;
    this.generation = 1;
    this.currentScore = 1;
    this.bestScore = 0;

    // Pipes setup
    var gap = 100;
    var speed = 7;
    var framesToPass = speed * windowWidth;
    var width = 50;
    for (let i = 0; i < this.pipeFreq; i++) {
      this.pipes[i] = new Pipe(gap = gap, speed = speed, width = width,
                            i * ((windowWidth + width) / (this.pipeFreq)));
    }

    // Birds setup
    for (let i = 0; i < this.numBirds; i++) {
      this.birds[i] = new Bird();
    }
  }

  step() {
    // Update text
    textSize(32);
    fill(0);
    text('Generation: ' + this.generation, 10, 30);
    text('Current Score: ' + this.currentScore, 10, 80);
    text('Best Score: ' + this.bestScore, 10, 130);

    // Draw pipes
    var leadX = windowWidth;
    var leadPipeIndex = 0;
    for (let i = 0; i < this.pipeFreq; i++) {
      // Only check for collisions with the leading pipe
      if (this.pipes[i].x < leadX) {
        leadX = this.pipes[i].x;
        leadPipeIndex = i;
      }
      this.pipes[i].step();
    }

    // Draw birds
    for (let i = 0; i < this.numBirds; i++) {
      // Manual bird control
      // if (mouseIsPressed) {
      //   bird.jump();
      // }

      this.birds[i].step(this.pipes[leadPipeIndex]);

      // Check if birds hit pipe in front
      if (this.pipes[leadPipeIndex].isCollidingWith(this.birds[i])) {
        if (this.birds[i].score > self.bestScore) {
          self.bestScore = this.birds[i].score;
        }
        this.birds[i].dead();
        this.deadBirds += 1;
      }
    }

    // Check for when last bird dies
    if (this.deadBirds == this.numBirds) {
      // Go to next generation
    } else {
      this.currentScore += 1;
    }
  }

  evolve() {
    // Restarts the game with successful bird genes being passed along

  }
}
