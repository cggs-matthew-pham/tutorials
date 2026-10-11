// region: predict
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  circle(x, 100, 40);
  x = x + speed;
  if (x > 300) {
    speed = -speed;
  }
}
// endregion
// region: run
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  if (speed > 0) {
    fill(255, 210, 0);
  } else {
    fill(120, 220, 255);
  }
  circle(x, 100, 40);
  x = x + speed;
  if (x > 300 || x < 0) {
    speed = -speed;
  }
}
// endregion
// region: bug
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  circle(x, 100, 40);
  x = x + speed;
  if (x = 300) {
    speed = -speed;
  }
}
// endregion
// region: sol-mouse
let x = 150;
let speed = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  if (mouseX > 150) {
    fill(255, 120, 160);
  } else {
    fill(120, 220, 255);
  }
  circle(x, 100, 40);
  x = x + speed;
  if (x > 300 || x < 0) {
    speed = -speed;
  }
}
// endregion
// region: sol-corners
let x = 150;
let y = 100;
let dx = 3;
let dy = 2;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(x, y, 40);
  x = x + dx;
  y = y + dy;
  if (x > 300 || x < 0) {
    dx = -dx;
  }
  if (y > 200 || y < 0) {
    dy = -dy;
  }
}
// endregion
// region: make
let ballX = 150;
let ballY = 60;
let dx = 3;
let dy = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(ballX, ballY, 20);
  ballX = ballX + dx;
  ballY = ballY + dy;
  // Bounce off the walls, then add a paddle that follows mouseX.
}
// endregion
// region: sol-make
let ballX = 150;
let ballY = 60;
let dx = 3;
let dy = 3;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(ballX, ballY, 20);
  fill(120, 220, 255);
  rect(mouseX - 30, 185, 60, 8);
  ballX = ballX + dx;
  ballY = ballY + dy;
  if (ballX > 300 || ballX < 0) {
    dx = -dx;
  }
  if (ballY < 0) {
    dy = -dy;
  }
  if (ballY > 175 && dy > 0 && ballX > mouseX - 30 && ballX < mouseX + 30) {
    dy = -dy;
  }
  if (ballY > 200) {
    ballY = 0;
  }
}
// endregion
