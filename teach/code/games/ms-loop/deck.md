---
marp: true
theme: default
html: true
---

# A game loop

Games with microStudio · The game loop

<!-- Speaker note: Students meet microStudio's game loop (init once, then update and draw 60 times a second), copy a moving-dot game into their own microStudio project, fix a missing global, then make a dot move up and bounce, and make two things move their own way. About 55 minutes (Predict and Run, with making the microStudio project 15 min · Investigate 10 min · Modify 15 min · Make 15 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** every game engine runs your game in a loop: init once, then update and draw about 60 times a second. Make a ball move across the screen in microStudio.

- I can make a game in microStudio and run it.
- I can say what init, update and draw each do, and when they run.
- I can make something move by changing a value in update and drawing it in draw.

<!-- Speaker note: Before class: Read the unit primer first. Students write their games on **microstudio.dev**, not on our site: before the lesson, open it on a student device at school, make a project, choose Python and press Run (the site's games here are only for playing). Decide on accounts: a **guest** can start at once with no email, but a guest's projects are deleted after about 15 days unless an account is made (a nickname and password; email is optional). For a short unit guests are fine if students keep a copy of their code; for longer work, make accounts with nicknames that are not real names. The lesson's Python is ordinary Python run by Brython: `global` is needed in update() for any variable it changes, exactly as in the turtle course's events lesson. microStudio's screen is 200 tall with (0, 0) in the middle and y up; its width depends on the window. -->

---

## Why it matters

> Every game you have played redraws the whole screen about 60 times a second. Between pictures, the game moves everything a tiny bit.

<!-- Speaker note: **microStudio** is a free game engine that runs in the browser. You write Python there, and it runs your game. These lessons show each game working on this page; you make your own copy on **microstudio.dev**. A microStudio game is three functions, and you never call them yourself: the engine does. - `init()` runs **once**, when the game starts: set things up here. - `update()` runs **60 times a second**: move things, check keys, keep score. - `draw()` runs after each update: clear the screen and draw everything where it is now. The middle of the screen is `(0, 0)`. `y` goes **up** to `100` at the top and down to `-100` at the bottom; `x` goes left and right from the middle. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def init():
    global x
    x = 0

def update():
    global x
    x += 1

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
```

**What happens when the game runs?**

- A yellow dot sits still in the middle
- Nothing: no function is called
- A yellow dot slides to the right and off the screen
- A yellow dot jumps to x = 1 and stops

<!-- Speaker note: What happens: The dot slides right. update() runs 60 times a second, so x goes up by 1 each time: 60 steps to the right every second. Nothing brings it back, so it slides off the edge. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: act it out: one student says update every time you clap, another moves one step. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 24px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The dot slides right. update() runs 60 times a second, so x goes up by 1 each time: 60 steps to the right every second. Nothing brings it back, so it slides off the edge.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/games/ms-loop/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/games/ms-loop/?full=step-2#step-2)

<!-- Speaker note: Watch the number at the top: that is `x`, going up by 1 sixty times a second. When it passes `100`, `update()` sends the dot back to `-100`. **Now make your own copy.** Open [microstudio.dev](https://microstudio.dev) in a new tab and click **Create**, then make a new project. Choose **Python** as its language (in the new project box, or later in the project's **Settings**). Open its **Code** tab, replace everything in the file `main` with the code above (use its Copy button), then press **Run** ▶. Keep this tab open for every lesson. Students should be able to say: I have watched x go up and the dot start again from the left. -->

<!-- Speaker note: Teacher: get every project made and running before Investigate; pair anyone stuck on the sign-in. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
def init():
    global x
    x = -100

def update():
    global x
    x += 1
    if x > 100:
        x = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
    screen.drawText("x = " + str(x), 0, 80, 10, "#FFF")
```

<!-- Speaker note: What this step is for: The engine calls init once, then update and draw again and again; a variable that update changes needs global, because it was made outside update. -->

<!-- Speaker note: Teacher: the bug is the forgotten global from the turtle events lesson. Ask who remembers it. -->

<style scoped>pre, marp-pre { font-size: 0.73em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## When does each run?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
def init():
    global x
    x = -100

def update():
    global x
    x += 1
    if x > 100:
        x = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
    screen.drawText("x = " + str(x), 0, 80, 10, "#FFF")
```

</div>
<div>

**Match each function with when the engine runs it.**

| | |
|---|---|
| `init()` | A. after each update, to show things |
| `update()` | B. 60 times a second, to change things |
| `draw()` | C. once, when the game starts |

* Answer: init() → C. once, when the game starts; update() → B. 60 times a second, to change things; draw() → A. after each update, to show things

</div>
</div>

<!-- Speaker note:  -->

<style scoped>section { font-size: 18px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How far?

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```python
def init():
    global x
    x = -100

def update():
    global x
    x += 1
    if x > 100:
        x = -100

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
    screen.drawText("x = " + str(x), 0, 80, 10, "#FFF")
```

</div>
<div>

**The game has run for 2 seconds. About how far has the dot moved?**

- 200 steps
- 2 steps
- 120 steps
- 60 steps

* Answer: 120 steps

</div>
</div>

<!-- Speaker note: update() runs 60 times a second and adds 1 to x each time: 2 × 60 = 120 steps (it wraps back to -100 after 200). -->

<style scoped>section { font-size: 23px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This stops with an error: cannot access local variable 'x'. Click the line where it goes wrong.**

```
 1  def init():
 2      global x
 3      x = 0
 4  
 5  def update():
 6      x += 1
 7  
 8  def draw():
 9      screen.clear("rgb(10,10,40)")
10      screen.fillRound(x, 0, 10, 10, "rgb(255,210,0)")
```

* Answer: line 6

<!-- Speaker note: x += 1 changes x, but update() has no global x line, so Python looks for an x made inside update() and finds none. Add global x as the first line of update(). -->

<style scoped>pre, marp-pre { font-size: 0.58em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Up, not across:** In your microStudio project, make the dot move **up** the screen instead, and start again at the bottom.
- **Bounce:** Make the dot **bounce** off each edge instead of starting again. The game on this page shows a bouncing dot.

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-loop/?full=step-4#step-4)

<!-- Speaker note: What this step is for: x moves left and right, y moves up and down; a speed kept in a variable can change sign to bounce. Hints, in order: Use y instead of x: the dot is drawn at (x, 0) now. Draw it at (0, y). / Start y at -100, add 1 to it in update(), and when y > 100, set it back to -100. / Keep a speed in a second variable, dx = 1, and add it: x += dx. / When x > 100 or x < -100, turn the speed round: dx = -dx. Both x and dx need to be in the global line. For students who need more support: Give the bounce as a sentence first ("a speed that turns round at the edges"), then the dx = -dx line. For early finishers: Make the dot change colour as it moves, or grow and shrink with a size variable. The hard part, on purpose: Getting into microStudio and the Python setting in the first 15 minutes, then the forgotten global. Have the project made before the lesson if time is short. When students get stuck: Nothing happens when they press Run, or the code turns red. Ask: Is the project set to Python? Fix: In the project's Settings, set the language to Python, then Run again. / cannot access local variable 'x' where it is not associated with a value. Ask: Which function changes x, and does it say global x? Fix: Add global x as the first line of that function. / The dot is drawn but never moves. Ask: Is x changed in update(), or only in init()? Fix: Add x += 1 inside update(). / IndentationError, or code that is half outside a function. Ask: Did the whole file get replaced, or was the code pasted under microStudio's own example? Fix: Select all in the file main, delete it, then paste. -->

<!-- Speaker note: Teacher: bouncing needs a second variable for the direction; let students try before the second hint. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: something that moves

Start from this empty game in microStudio and make at least **two things move** in different ways: one faster than the other, one going the other way, one changing size... The game on this page is one idea. `screen.fillRect(x, y, width, height, colour)` draws a box, `screen.fillRound(...)` a dot, and `screen.drawText(text, x, y, size, colour)` writes.

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-loop/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: a value changed in update and used in draw makes anything move. -->

<!-- Speaker note: Teacher: walk round and ask each pair which variable moves which thing. -->

---

## Where this leads

Every game engine works this way: Unity, Godot, Pico-8 and MakeCode Arcade all call an update and a draw function every frame. Next: move something with the arrow keys.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does draw() start with screen.clear(...)?**

* draw() runs 60 times a second; without clearing, every old picture of the dot would stay, making a smear.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: the arrow keys move a paddle. The same update-and-draw loop runs every engine, from MakeCode Arcade to Unity and Godot. -->
