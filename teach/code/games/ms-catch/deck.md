---
marp: true
theme: default
html: true
---

# Catch and score

Games with microStudio · A whole game

<!-- Speaker note: Students put the paddle and the stars together, test touching with abs() and and, see why a caught star must restart, fix a score that sets instead of adds, then add lives, a game over, a restart on Space, and a power-up of their own. About 55 minutes (Predict and Run 10 min · Investigate 10 min · Modify 20 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put the paddle and the stars together: a star that touches the paddle scores a point and starts again. Add lives, a game over and a restart, then a power-up of your own.

- I can check whether two things touch, every frame.
- I can keep a score and lives, and end the game when the lives run out.
- I can start a game again by calling init().

<!-- Speaker note: Before class: Read the unit primer first. This is the turtle course's Catch the turtle and Objects with turtles' falling stars, in a game engine. `touches()` compares the distance across and the distance up and down with `abs()` (a distance without its sign); both must be small, hence `and`. Lives change one thing in the structure: the bottom check moves out of `move()` into `update()`, so a missed star can cost a life (the first Modify's second hint says so). Calling `init()` again resets the game, because init() sets every variable. -->

---

## Why it matters

> A game is a loop, things that move, and one question asked every frame: are these two touching?

<!-- Speaker note: This is the whole game: the paddle from Keys and movement, the stars from Stars as objects, and a `touches()` method that asks whether a star is close to the paddle. When it is, the score goes up and the star starts again from the top. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def touches(sx, sy, x, y):
    return abs(sx - x) < 12 and abs(sy - y) < 8

print(touches(10, -76, 0, -80))
print(touches(30, -80, 0, -80))
```

**What does it print?**

- True, then False
- True, then True
- False, then True
- False, then False

<!-- Speaker note: What happens: True, then False. The first star is 10 across and 4 up from the paddle: both are close enough (under 12 and under 8). The second is 30 across, too far. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: draw the paddle at (0, -80) and the two stars on squared paper; measure across and up. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* True, then False. The first star is 10 across and 4 up from the paddle: both are close enough (under 12 and under 8). The second is 30 across, too far.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/games/ms-catch/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/games/ms-catch/?full=step-2#step-2)

<!-- Speaker note: Click the game and catch some stars. Then put this code in a microStudio project and run it there. Students should be able to say: I have caught stars and watched the score go up, here and in microStudio. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

_The program is 53 lines long: open it in the tutorial and read it together._

[Open this step](https://studio.learningwaypoints.com/tutorials/code/games/ms-catch/?full=step-3#step-3)

<!-- Speaker note: What this step is for: Collision is a question asked every frame for every star: close enough across and close enough up and down. -->

<!-- Speaker note: Teacher: ask what or would do, then try it in microStudio. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Close enough

**Why does touches() use and, not or?**

- A star must be close across and close up and down at the same time to touch
- It makes no difference
- and is faster than or
- or would never be true

* Answer: A star must be close across and close up and down at the same time to touch

<!-- Speaker note: With or, a star anywhere in the same column (close across, far above) would count as a catch. Touching needs both distances small. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Why restart?

**What would happen without star.restart() after score += 1?**

- Nothing would change
- The star scores once and disappears
- The star stays on the paddle and scores a point every frame
- The game stops with an error

* Answer: The star stays on the paddle and scores a point every frame

<!-- Speaker note: The star would still be touching the paddle next frame, so the score would jump by 60 a second. restart() moves it back to the top. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**The score never goes past 1, however many stars you catch. Click the line that is wrong.**

```
 1  def init():
 2      global score
 3      score = 0
 4  
 5  def update():
 6      global score
 7      for star in stars:
 8          star.move()
 9          if star.touches(px, -80):
10              score = 1
11              star.restart()
```

* Answer: line 10

<!-- Speaker note: score = 1 sets the score to 1 every time. score += 1 adds one to what it was. -->

<style scoped>pre, marp-pre { font-size: 0.53em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Lives:** Give the player **3 lives**: a star that reaches the bottom takes one. At 0 lives, stop the game and show **GAME OVER**.
- **Play again:** After GAME OVER, pressing **Space** starts a new game. The game on this page has both changes.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/games/ms-catch/?full=step-4#step-4)

<!-- Speaker note: What this step is for: A second counter counts misses; an if at the top of update stops the game, and calling init again starts it over. Hints, in order: Start lives at 3 in init(). In update(), when a star falls past the bottom (star.y < -100), take a life and restart the star. / Take the y < -100 check out of move(), so update() can count it. At the start of update(): if lives == 0: return, and draw GAME OVER when lives is 0. / When lives is 0, check pressed("SPACE"). / Calling init() sets everything back to the start: stars, score and lives. For students who need more support: Give the lives code for update() and ask students only for the GAME OVER text in draw(). For early finishers: Make the stars fall a little faster each time the score reaches 10, or keep a high score that survives a restart (set it outside init()). The hard part, on purpose: Lives: moving the bottom check out of move() so update() can count a miss. Talk it through before students type. When students get stuck: The score never goes above 1. Ask: Does the line add one, or set the score to one? Fix: score += 1. / Lives go down even when the star is caught. Ask: Is the miss check an elif after the catch, or a separate if? Fix: Use elif star.y < -100, so a caught star is not counted as a miss. / Lives never go down. Ask: Does move() still send the star back to the top before update() can see it fall? Fix: Take the y < -100 check out of move() and do it in update(). / Space does nothing after GAME OVER. Ask: Is the Space check before the return? Fix: Inside if lives == 0:, check pressed("SPACE") and call init() before return. -->

<!-- Speaker note: Teacher: let students play each other's game before Make: is 3 lives too many? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a power-up

Add a **power-up**: a star that looks different and is worth more when caught (a gold star worth 5, a heart that gives back a life, a slow star that freezes the others...). It can be its own class, or a `Star` with an extra value. The game on this page has a fast gold star worth 5.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/games/ms-catch/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: one kind of star that is different (faster, another colour) and worth more, told apart when it is caught. -->

<!-- Speaker note: Teacher: ask how the game tells the power-up apart when it is caught. -->

---

## Where this leads

You have now built a whole game in a real engine: a loop, input, objects, collisions and a score. Next: draw your own sprites, add sound, and share it.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does a caught star call restart()?**

* Otherwise it is still touching the paddle next frame and scores again, 60 times a second.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: their own sprites, sound and sharing the game. Collision checks like touches() are in every engine, usually as boxes around sprites. -->
