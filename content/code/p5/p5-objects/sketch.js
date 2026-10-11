// region: predict
function setup() {
  let star = { x: 20, y: 30, speed: 2 };
  star.y = star.y + star.speed;
  console.log(star.y);
}
// endregion
// region: run
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
// endregion
// region: bug
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
// endregion
// region: sol-more
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 12; i++) {
    stars.push({ x: 15 + i * 24, y: random(200), speed: random(1, 3) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
// endregion
// region: sol-size
let stars = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3), size: random(6, 18) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, star.size);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
// endregion
// region: make
let stars = [];
let clouds = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
  // Your own list of things: clouds, snowflakes, bubbles...
}
// endregion
// region: sol-make
let stars = [];
let clouds = [];

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 6; i++) {
    stars.push({ x: 25 + i * 50, y: random(200), speed: random(1, 3) });
  }
  for (let i = 0; i < 3; i++) {
    clouds.push({ x: random(300), y: 30 + i * 50, speed: random(0.3, 1) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(200, 200, 220);
  for (let cloud of clouds) {
    ellipse(cloud.x, cloud.y, 60, 20);
    cloud.x = cloud.x + cloud.speed;
    if (cloud.x > 330) {
      cloud.x = -30;
    }
  }
  fill(255, 210, 0);
  for (let star of stars) {
    circle(star.x, star.y, 12);
    star.y = star.y + star.speed;
    if (star.y > 210) {
      star.y = -10;
    }
  }
}
// endregion
