// region: predict
function drawFlower(x, y) {
  fill(255, 120, 160);
  circle(x - 14, y, 18);
  circle(x + 14, y, 18);
  circle(x, y - 14, 18);
  circle(x, y + 14, 18);
  fill(255, 210, 0);
  circle(x, y, 18);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  drawFlower(80, 100);
  drawFlower(200, 60);
}
// endregion
// region: run
function drawFlower(x, y, size) {
  fill(255, 120, 160);
  circle(x - size, y, size);
  circle(x + size, y, size);
  circle(x, y - size, size);
  circle(x, y + size, size);
  fill(255, 210, 0);
  circle(x, y, size);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  drawFlower(70, 100, 20);
  drawFlower(180, 60, 12);
  drawFlower(230, 140, 16);
}
// endregion
// region: bug
function drawFlower(x, y) {
  fill(255, 120, 160);
  circle(x - 14, y, 18);
  circle(x + 14, y, 18);
  fill(255, 210, 0);
  circle(x, y, 18);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  drawflower(80, 100);
}
// endregion
// region: sol-many
function drawFlower(x, y, size) {
  fill(255, 120, 160);
  circle(x - size, y, size);
  circle(x + size, y, size);
  circle(x, y - size, size);
  circle(x, y + size, size);
  fill(255, 210, 0);
  circle(x, y, size);
}

function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  for (let i = 0; i < 5; i++) {
    drawFlower(40 + i * 55, 60 + (i % 2) * 70, 14);
  }
}
// endregion
// region: sol-touch
function drawFlower(x, y, size) {
  fill(255, 120, 160);
  circle(x - size, y, size);
  circle(x + size, y, size);
  circle(x, y - size, size);
  circle(x, y + size, size);
  fill(255, 210, 0);
  circle(x, y, size);
}

function isNear(x1, y1, x2, y2) {
  return dist(x1, y1, x2, y2) < 30;
}

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(120, 200, 140);
  drawFlower(150, 100, 16);
  if (isNear(mouseX, mouseY, 150, 100)) {
    fill(255);
    text("Hello!", 120, 30);
  }
}
// endregion
// region: make
function setup() {
  createCanvas(300, 200);
  background(120, 200, 140);
  // Write a function that draws your own thing, then use it three times.
}
// endregion
// region: sol-make
function drawTree(x, y, height) {
  fill(120, 80, 50);
  rect(x - 5, y - height, 10, height);
  fill(40, 130, 60);
  circle(x, y - height, height);
}

function setup() {
  createCanvas(300, 200);
  background(150, 210, 255);
  fill(90, 170, 90);
  rect(0, 150, 300, 50);
  drawTree(60, 160, 60);
  drawTree(150, 150, 40);
  drawTree(240, 170, 80);
}
// endregion
