// region: predict
function setup() {
  console.log(dist(10, 10, 13, 14));
}
// endregion
// region: run
let balls = [];
let score = 0;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let ball of balls) {
    circle(ball.x, ball.y, 24);
    ball.y = ball.y + ball.speed;
    if (ball.y > 210) {
      restart(ball);
    }
  }
  fill(255);
  text("Score: " + score, 10, 20);
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}
// endregion
// region: bug
function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) > 20) {
      score = score + 1;
      restart(ball);
    }
  }
}
// endregion
// region: sol-lives
let balls = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  if (lives > 0) {
    fill(255, 210, 0);
    for (let ball of balls) {
      circle(ball.x, ball.y, 24);
      ball.y = ball.y + ball.speed;
      if (ball.y > 210) {
        lives = lives - 1;
        restart(ball);
      }
    }
    fill(255);
    text("Score: " + score + "   Lives: " + lives, 10, 20);
  } else {
    fill(255, 100, 100);
    textSize(24);
    text("GAME OVER", 80, 100);
    textSize(12);
    fill(255);
    text("Score: " + score, 120, 125);
  }
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}
// endregion
// region: sol-restart
let balls = [];
let score = 0;
let lives = 3;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  if (lives > 0) {
    fill(255, 210, 0);
    for (let ball of balls) {
      circle(ball.x, ball.y, 24);
      ball.y = ball.y + ball.speed;
      if (ball.y > 210) {
        lives = lives - 1;
        restart(ball);
      }
    }
    fill(255);
    text("Score: " + score + "   Lives: " + lives, 10, 20);
  } else {
    fill(255, 100, 100);
    textSize(24);
    text("GAME OVER", 80, 100);
    textSize(12);
    fill(255);
    text("Score: " + score + "   Press R to play again", 60, 125);
  }
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}

function keyPressed() {
  if (key === "r" && lives === 0) {
    score = 0;
    lives = 3;
  }
}
// endregion
// region: make
let balls = [];
let score = 0;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5) });
  }
}

function draw() {
  background(20, 30, 60);
  fill(255, 210, 0);
  for (let ball of balls) {
    circle(ball.x, ball.y, 24);
    ball.y = ball.y + ball.speed;
    if (ball.y > 210) {
      restart(ball);
    }
  }
  fill(255);
  text("Score: " + score, 10, 20);
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      score = score + 1;
      restart(ball);
    }
  }
}

// Your own power-up: a different kind of ball (gold? faster?) worth more points.
// endregion
// region: sol-make
let balls = [];
let score = 0;

function setup() {
  createCanvas(300, 200);
  for (let i = 0; i < 4; i++) {
    balls.push({ x: random(20, 280), y: random(-100, 0), speed: random(1, 2.5), gold: false });
  }
  balls.push({ x: 150, y: -50, speed: 3.5, gold: true });
}

function draw() {
  background(20, 30, 60);
  for (let ball of balls) {
    if (ball.gold) {
      fill(255, 255, 255);
    } else {
      fill(255, 210, 0);
    }
    circle(ball.x, ball.y, 24);
    ball.y = ball.y + ball.speed;
    if (ball.y > 210) {
      restart(ball);
    }
  }
  fill(255);
  text("Score: " + score, 10, 20);
}

function restart(ball) {
  ball.x = random(20, 280);
  ball.y = -10;
}

function mousePressed() {
  for (let ball of balls) {
    if (dist(mouseX, mouseY, ball.x, ball.y) < 20) {
      if (ball.gold) {
        score = score + 5;
      } else {
        score = score + 1;
      }
      restart(ball);
    }
  }
}
// endregion
