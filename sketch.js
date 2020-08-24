// Created by: Edward Davis
// Inspired by: https://www.youtube.com/watch?v=YtRA6tqgJBc&t=1063s

// The main script for the 'flappy bird' neuroevolution
// A bird will try to jump through gaps in pipes as they approach, gaining
// more points the further they get.
// A population of birds, controlled by nns, will try, fail and evolve such
// that it can score higher in the game.

function setup() {
  // Window setup
  createCanvas(windowWidth, windowHeight);
  background(255);
  population = new Population(50, 2, false);
}

function draw() {
  background(255);
  population.step();
}

// TODO: would be good to add a method of evolving without animating the
// game - maybe animating the progress after 100 or so generations
