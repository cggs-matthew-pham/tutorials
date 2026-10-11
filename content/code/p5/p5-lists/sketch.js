// region: predict
let heights = [50, 120, 80, 150];

function setup() {
  createCanvas(300, 200);
  background(240);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 40 + 20, 200 - heights[i], 30, heights[i]);
  }
}
// endregion
// region: run
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 10; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 30 + 5, 200 - heights[i], 20, heights[i]);
  }
}
// endregion
// region: bug
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 10; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 30 + 5, heights[i], 20, heights[i]);
  }
}
// endregion
// region: sol-more
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 20; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let i = 0; i < heights.length; i++) {
    rect(i * 15 + 2, 200 - heights[i], 10, heights[i]);
  }
}
// endregion
// region: sol-colour
let heights = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 10; i++) {
    heights.push(random(20, 180));
  }
}

function draw() {
  background(20, 30, 60);
  for (let i = 0; i < heights.length; i++) {
    if (heights[i] > 100) {
      fill(255, 120, 160);
    } else {
      fill(255, 210, 0);
    }
    rect(i * 30 + 5, 200 - heights[i], 20, heights[i]);
  }
}
// endregion
// region: make
let values = [];

function setup() {
  createCanvas(300, 200);
  // Fill the list, then draw one thing for each value in it.
}

function draw() {
  background(20, 30, 60);
}
// endregion
// region: sol-make
let sleep = [7, 6, 8, 5, 9, 10, 8];

function setup() {
  createCanvas(300, 200);
}

function draw() {
  background(20, 30, 60);
  fill(120, 220, 255);
  for (let i = 0; i < sleep.length; i++) {
    circle(30 + i * 40, 190 - sleep[i] * 15, sleep[i] * 5);
  }
  fill(255);
  text("Hours of sleep, Monday to Sunday", 10, 20);
}
// endregion
