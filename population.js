// Created by: Edward Davis
// Inspired by: https://www.youtube.com/watch?v=YtRA6tqgJBc&t=1063s

// The population class uses the bird and pipe derived classes to animate the
// entire game.
// This class allows for the gradual evolution of the bird population over
// multiple generations

// Mutation function
function mutate(x) {
  if (random(1) < 0.1) {
    console.log('mutating');
    let offset = randomGaussian() * 0.5;
    let newx = x + offset;
    return newx;
  } else {
    return x;
  }
}

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
    this.currentPopulationScore = 0;
    this.bestPopulationScore = 0;
    this.mostSuccessfulBird = null;
    this.avgY = 0;

    // Pipes setup
    this.gap = 200;
    this.speed = 9;
    this.framesToPass = this.speed * windowWidth;
    this.width = 50;
    for (let i = 0; i < this.pipeFreq; i++) {
      this.pipes[i] = new Pipe(this.gap, this.speed, this.width,
                            i * ((windowWidth + this.width) / (this.pipeFreq)));
    }

    // Birds setup
    for (let i = 0; i < this.numBirds; i++) {
      this.birds[i] = new Bird();
    }
  }

  populationScore() {
    this.currentPopulationScore = 0;
    for (let i = 0; i < this.numBirds; i++) {
      this.currentPopulationScore += this.birds[i].score;
    }
    this.currentPopulationScore /= this.numBirds;
  }

  step() {
    // Update text
    textSize(32);
    fill(0);
    text('Generation: ' + this.generation, 10, 30);
    text('Current Score: ' + this.currentScore, 10, 80);
    text('Best Score: ' + this.bestScore, 10, 130);
    this.populationScore();
    text('Current Population Score: ' + this.currentPopulationScore, 10, 180);
    text('Best Population Score: ' + this.bestPopulationScore, 10, 230);
    text('Birds Remaining: ' + (this.numBirds - this.deadBirds), 10, 280);

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
    let sumY = 0;
    let avgYDivisor = 0;
    for (let i = 0; i < this.numBirds; i++) {
      // Manual bird control
      // if (mouseIsPressed) {
      //   bird.jump();
      // }

      // Get average position
      if (this.birds[i].alive) {
        sumY += this.birds[i].y;
        avgYDivisor += 1;
      }

      this.birds[i].step(this.pipes[leadPipeIndex]);

      // Check if birds hit pipe in front
      if (this.pipes[leadPipeIndex].isCollidingWith(this.birds[i])) {
        if (this.birds[i].score > this.bestScore) {
          this.bestScore = this.birds[i].score;
        }
        this.birds[i].dead();
        this.deadBirds += 1;
      }
    }

    // Draw average bird
    this.avgY = sumY / avgYDivisor;
    fill(255, 255, 0, 50);
    ellipse(windowWidth / 10, this.avgY, 20, 20);

    // Check for when last bird dies
    if (this.deadBirds == this.numBirds) {
      // Total score
      if (this.currentPopulationScore > this.bestPopulationScore) {
        this.bestPopulationScore = this.currentPopulationScore;
      }
      // Get fitnesses
      this.getFitnesses();
      // Go to next generation
      this.evolve();
    } else {
      this.currentScore += 1;
    }
  }

  restart() {
    this.deadBirds = 0;
    this.currentScore = 1;
    this.pipes = [];

    // Pipes setup
    for (let i = 0; i < this.pipeFreq; i++) {
      this.pipes[i] = new Pipe(this.gap, this.speed, this.width,
                            i * ((windowWidth + this.width) / (this.pipeFreq)));
    }
  }

  getFitnesses() {
    for (let i = 0; i < this.numBirds; i++) {
      this.birds[i].fitness = this.birds[i].score / this.bestScore;
    }
  }

  evolve() {
    // Find most successful bird
    for (let i = 0; i < this.numBirds; i++) {
      if (this.birds[i].score >= this.bestScore) {
        this.mostSuccessfulBird = this.birds[i];
      }
    }
    // Copy its brain
    var nextGenBrain = this.mostSuccessfulBird.brain.copy();

    // Delete old population
    this.birds = [];

    // Use the new brain for the next population, but with mutations
    for (let i = 0; i < this.numBirds - 1; i++) {
      let mutatedBrain = nextGenBrain.mutate(mutate);
      this.birds[i] = new Bird(mutatedBrain);
    }
    // Keep the best brain exactly the same for one of the birds
    this.birds[this.numBirds - 1] = new Bird(nextGenBrain);

    // Restart the game
    this.generation += 1;
    this.restart();
  }
}
