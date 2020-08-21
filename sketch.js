// The main script for the 'flappy bird' neuroevolution
// A bird will try to jump through gaps in pipes as they approach, gaining
// more points the further they get.
// A population of birds, controlled by nns, will try, fail and evolve such
// that it can score higher in the game.

function setup() {
  // Window setup
  createCanvas(windowWidth, windowHeight);
  background(255);
  population = new Population(250, 2);
}

function draw() {
  background(255);
  population.step();
}
