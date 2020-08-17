class Pipe {
    init(gap, gap_loc, speed, width) {
        this.gap = gap;
        this.gap_loc = gap_loc;
        this.speed = speed;
        this.width = width;
        this.x = windowWidth;
        this.y_upper = windowHeight - gap_loc - (gap / 2);
        this.y_lower = windowHeight - this.y_upper;
    }
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 255, 255);

}

function draw() {
    background(255, 255, 255)

    // Pipes
    pipe = Pipe(100, 1, 50)

    // Upper pipe
    rect(pipe.x, pipe.y_upper, windowHeight - pipe.y_upper, pipe.width)
}
