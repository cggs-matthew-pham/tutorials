// region: predict
let x = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  circle(x, 100, 40);
  x = x + 2;
}
// endregion
// region: run
let x = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(x, 100, 40);
  fill(255);
  text(x, 10, 20);
  x = x + 2;
}
// endregion
// region: bug
function setup() {
  createCanvas(300, 200);
}

function draw() {
  let x = 0;
  background(20, 30, 60);
  circle(x, 100, 40);
  x = x + 2;
}
// endregion
// region: sol-down
let y = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(150, y, 40);
  fill(255);
  text(y, 10, 20);
  y = y + 2;
}
// endregion
// region: sol-two
let x = 0;
let y = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  circle(x, 60, 40);
  fill(255, 120, 160);
  circle(300 - y, 140, 30);
  x = x + 2;
  y = y + 4;
}
// endregion
// region: make
let t = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  t = t + 1;
  // Make at least two things move, in different ways.
}
// endregion
// region: sol-make
let t = 0;

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  t = t + 1;
  fill(255, 210, 0);
  circle(t % 300, 60, 30);
  fill(255, 120, 160);
  circle(300 - (t % 300), 140, 30);
  fill(255);
  text(t, 10, 20);
}
// endregion
