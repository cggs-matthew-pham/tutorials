// region: predict
function setup() {
  createCanvas(300, 200);
  background(240);
  fill(255, 200, 0);
  circle(150, 100, 80);
  rect(20, 20, 60, 40);
}
// endregion
// region: run
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  noStroke();
  fill(255, 210, 0);
  circle(150, 100, 80);
  fill(255, 120, 160);
  rect(20, 20, 60, 40);
  fill(120, 220, 255);
  triangle(220, 160, 260, 90, 290, 160);
  stroke(255);
  line(0, 190, 300, 190);
}
// endregion
// region: bug
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  circle(150, 100, 80);
  fill(255, 210, 0);
}
// endregion
// region: sol-corner
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  noStroke();
  fill(255, 210, 0);
  circle(250, 160, 80);
  fill(255, 120, 160);
  rect(20, 20, 60, 40);
  fill(120, 220, 255);
  triangle(220, 160, 260, 90, 290, 160);
  stroke(255);
  line(0, 190, 300, 190);
}
// endregion
// region: sol-oval
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  noStroke();
  fill(255, 210, 0);
  circle(150, 100, 80);
  fill(255, 120, 160);
  ellipse(60, 40, 90, 40);
  fill(120, 220, 255);
  triangle(220, 160, 260, 90, 290, 160);
  stroke(255);
  line(0, 190, 300, 190);
}
// endregion
// region: make
function setup() {
  createCanvas(300, 200);
  background(20, 30, 60);
  // Your picture: a face, a house, a robot, a flag...
}
// endregion
// region: sol-make
function setup() {
  createCanvas(300, 200);
  background(120, 200, 255);
  noStroke();
  fill(90, 170, 90);
  rect(0, 150, 300, 50);
  fill(240, 220, 180);
  rect(90, 80, 120, 80);
  fill(180, 70, 60);
  triangle(80, 80, 150, 30, 220, 80);
  fill(120, 80, 50);
  rect(135, 110, 30, 50);
  fill(255, 210, 0);
  circle(260, 40, 50);
}
// endregion
