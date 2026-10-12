---
marp: true
theme: default
html: true
---

# Final challenge: Catch the circle

Drawing and animation with p5.js · Final challenge: Catch the circle

<!-- Speaker note: Students play a click-to-catch game, learn that mousePressed runs on its own and that touching means a small distance, fix a catch that scores for every miss, add lives with a game over and a restart key, and make a power-up ball. About 60 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 20 min). -->

---

## Today

**We are learning to** click the falling circles to score. Fix a catch that works backwards, add lives and a game over, then add a power-up of your own.

- I can make a game with a score that changes when the player clicks.
- I can use dist to tell when two things touch.
- I can add lives and a game over to a game.

<!-- Speaker note: Before class: Read the unit primer first. This is the Python Catch the turtle challenge in JavaScript, and it completes the course. Everything has been taught except events and joining text: `mousePressed()` and `keyPressed()` are functions p5 calls for you. Click coordinates are the sketch's `mouseX` and `mouseY`. The common slip is `>` where `<` belongs, so the bug task is a logic error with no red line: students must read the condition and play. The game needs the sketch to be clicked first for keys to work. This lesson marks "Challenge complete". -->

---

## Why it matters

> Everything you have learned in one game: a list of objects, a loop, a function, a decision, and a click.

<!-- Speaker note: Your game has falling circles. When you **click** one, you score and it starts again at the top. If one reaches the bottom, it starts again too. Two new ideas: - An **event** function runs when something happens. p5 calls `mousePressed()` each time the mouse is clicked, and `keyPressed()` each time a key is pressed. You never call them yourself. - To show a score, **join** text and a number with `+`: `"Score: " + score`. **The hard part** is "close". Two things touch when the distance between them is **small**: `dist(...) < 20`. It is easy to write `>` and have the game score for every click that misses. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```javascript
function setup() {
  console.log(dist(10, 10, 13, 14));
}
```

**What does console.log(dist(10, 10, 13, 14)) show?**

- 3
- 4
- 5
- 7

<!-- Speaker note: What happens: 5. The two points are 3 apart across and 4 apart down, and the straight-line distance is 5. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw a 3-4-5 triangle on the board. -->

<style scoped>pre, marp-pre { font-size: 0.81em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 5. The two points are 3 apart across and 4 apart down, and the straight-line distance is 5.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/p5/p5-game/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/p5/p5-game/?full=step-2#step-2)

<!-- Speaker note: Click the circles before they fall off the bottom. Students should be able to say: I clicked the circles, the score went up, and a missed circle started again at the top. -->

<!-- Speaker note: Teacher: let students play for a minute and call out their scores. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 38 lines long: open it in the tutorial and read it together._

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-game/?full=step-3#step-3)

<!-- Speaker note: What this step is for: An event function runs on its own when something happens; dist(...) < 20 asks 'is the click close enough?' -->

<!-- Speaker note: Teacher: for the bug, ask 'when is the distance big?' -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Which part does what?

**Match each piece with what it does.**

| | |
|---|---|
| `mousePressed()` | A. the click is within 20 pixels of this ball |
| `dist(mouseX, mouseY, ball.x, ball.y) < 20` | B. joins the words and the number into one piece of text |
| `restart(ball);` | C. sends this ball back to the top at a new x |
| `"Score: " + score` | D. p5 runs it each time the mouse is clicked |

* Answer: mousePressed() → D. p5 runs it each time the mouse is clicked; dist(mouseX, mouseY, ball.x, ball.y) &lt; 20 → A. the click is within 20 pixels of this ball; restart(ball); → C. sends this ball back to the top at a new x; "Score: " + score → B. joins the words and the number into one piece of text

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When does the score go up?

**Where does the score go up?**

- Inside restart()
- Inside setup()
- Inside mousePressed, in the if that checks the click is close
- Every frame in draw()

* Answer: Inside mousePressed, in the if that checks the click is close

<!-- Speaker note: The score should change when a catch happens, once. mousePressed runs once per click, so the if inside it decides whether the click was a catch. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**In this game every click that misses scores. Click the line that is wrong.**

```
 1  function mousePressed() {
 2    for (let ball of balls) {
 3      if (dist(mouseX, mouseY, ball.x, ball.y) > 20) {
 4        score = score + 1;
 5        restart(ball);
 6      }
 7    }
 8  }
```

* Answer: line 3

<!-- Speaker note: The condition is true when the click is more than 20 away. A catch is when it is less than 20 away: dist(...) < 20. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Lives:** Give the player **3 lives** and a GAME OVER screen. Start from the game above.
- **Play again:** Press **R** after GAME OVER to start again.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-game/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A variable for lives and a decision about it add a way to lose; a key event adds a way to start again. Hints, in order: Make let lives = 3; at the top. When a ball falls off the bottom, take one away. / In draw(), only move and draw the balls if (lives > 0); otherwise show GAME OVER with text(). / Add a keyPressed() function. p5 gives you key, the key that was pressed. / if (key === "r" && lives === 0) { score = 0; lives = 3; } For students who need more support: Give the lives code and ask only for the restart key, or give the gold ball and ask for a second power-up. For early finishers: Make the balls get faster as the score rises, or add a high score kept in a variable. The hard part, on purpose: Close means a small distance. Play the buggy version and say what is happening before reading the code. When students get stuck: Every click scores, even misses. Ask: Is the distance supposed to be bigger or smaller than 20 for a catch? Fix: Use dist(...) < 20. / Pressing R does nothing. Ask: Has the sketch been clicked first, and is lives zero? Fix: Click the picture, play until GAME OVER, then press R. / Lives go below zero or the game keeps moving after GAME OVER. Ask: Is the movement inside if (lives > 0)? Fix: Wrap the loop in if (lives > 0) { ... } else { ... }. / The power-up looks the same as the others. Ask: Where is its fill chosen? Fix: Choose fill with an if on the property before drawing the circle. -->

<!-- Speaker note: Teacher: ask where lives are taken away, and where the check for zero lives belongs. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a power-up

Add a **power-up**: a different kind of ball (fast, small, gold) that is worth more points. Give it a property such as `gold: true`, draw it in its own colour, and score more when it is clicked. Finish by asking a friend to play it and change one thing because of what you saw.

[Open this step](https://tutorials.learningwaypoints.com/code/p5/p5-game/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a second kind of ball that behaves differently and is worth more, made with a property. -->

<!-- Speaker note: Teacher: pairs list the power-up's property and the two lines that change before coding. -->

---

## Where this leads

You have built a game from lists, objects, decisions, functions and events. That is a real programme: games bigger than this are the same pieces in more places.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why is the catch test dist(...) &lt; 20 and not &gt; 20?**

* Two things touch when the distance between them is small.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Optional next lesson: moving art with sin, cos and map. -->
