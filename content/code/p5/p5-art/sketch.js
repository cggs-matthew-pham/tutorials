// region: predict
function setup() {
  createCanvas(300, 300);
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = i * 30;
    circle(150 + cos(radians(angle)) * 100, 150 + sin(radians(angle)) * 100, 20);
  }
}
// endregion
// region: run
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
// endregion
// region: sol-trail
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60, 30);
  for (let i = 0; i < 12; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let x = 150 + cos(angle) * 100;
    let y = 150 + sin(angle) * 100;
    fill(map(i, 0, 11, 255, 120), map(i, 0, 11, 120, 220), 200);
    circle(x, y, 20);
  }
}
// endregion
// region: sol-spiral
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 24; i++) {
    let angle = frameCount * 0.02 + i * 0.5;
    let radius = 10 + i * 5;
    let x = 150 + cos(angle) * radius;
    let y = 150 + sin(angle) * radius;
    fill(map(i, 0, 23, 255, 120), map(i, 0, 23, 120, 220), 200);
    circle(x, y, 12);
  }
}
// endregion
// region: make
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  // Your own moving pattern: use a loop, sin or cos, and map to change colour or size.
}
// endregion
// region: sol-make
function setup() {
  createCanvas(300, 300);
  noStroke();
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < 20; i++) {
    let x = map(i, 0, 19, 20, 280);
    let y = 150 + sin(frameCount * 0.05 + i * 0.5) * 80;
    fill(255, map(i, 0, 19, 100, 220), map(i, 0, 19, 200, 100));
    circle(x, y, 14 + sin(frameCount * 0.1 + i) * 6);
  }
}
// endregion
