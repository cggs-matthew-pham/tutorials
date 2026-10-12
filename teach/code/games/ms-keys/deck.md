---
marp: true
theme: default
html: true
---

# Keys and movement

Games with microStudio · The game loop

<!-- Speaker note: Students check the arrow keys every frame in update() to move a paddle, trace its position frame by frame, find why keyboard.LEFT fails before a key is pressed, keep the paddle on the screen, add up and down, and make a player with an extra key of their own. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 15 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** check the arrow keys in update() and move a paddle, keep it on the screen, then make a player that moves four ways and speeds up.

- I can move something with the arrow keys in a game loop.
- I can keep a value between two limits with if.
- I can explain why a held key moves something smoothly.

<!-- Speaker note: Before class: Read the unit primer first. `pressed(key)` is a recipe: two lines students copy into every game. It is needed because microStudio's `keyboard` has no `LEFT` until the first key press, so `keyboard.LEFT` fails at the start (the bug task); `hasattr(keyboard, key)` asks first. Students need not understand hasattr yet. In microStudio the arrow names also answer to W, A, S and D. Games on our page need a click before they get the keys; so does the game in microStudio's run window. -->

---

## Why it matters

> A game asks the keyboard a question 60 times a second: is the left arrow down right now?

<!-- Speaker note: In the turtle course, pressing a key **called** a function once. A game engine works the other way round: every frame, `update()` **asks** whether a key is down, and moves a little if it is. Hold the key and it moves smoothly; let go and it stops. `pressed("LEFT")` is a short helper at the top of the game: it is true while that key is down. Copy it as it is into every game (why it is needed is in Investigate). -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
```

**You hold the right arrow for one second. What happens to the paddle?**

- It moves 120 steps right, smoothly
- It moves right and keeps going after you let go
- It moves 2 steps right, once
- It jumps to the right edge

<!-- Speaker note: What happens: It moves 120 steps right. update() runs 60 times in that second, and each time the key is down px goes up by 2. Let go and pressed("RIGHT") is false, so it stops. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: ask how many times update() runs in one second, then how far 2 steps each time adds up to. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* It moves 120 steps right. update() runs 60 times in that second, and each time the key is down px goes up by 2. Let go and pressed("RIGHT") is false, so it stops.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/games/ms-keys/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/games/ms-keys/?full=step-2#step-2)

<!-- Speaker note: Click the game, then hold the arrow keys. Then put this code in your microStudio project (a new project, or replace the code in last lesson's) and run it there. Students should be able to say: I have moved the paddle with the arrow keys here and in my own microStudio project. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```python
def pressed(key):
    return hasattr(keyboard, key) and keyboard[key] != 0

def init():
    global px
    px = 0

def update():
    global px
    if pressed("LEFT"):
        px -= 2
    if pressed("RIGHT"):
        px += 2

def draw():
    screen.clear("rgb(10,10,40)")
    screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
    screen.drawText("px = " + str(px), 0, 80, 10, "#FFF")
```

<!-- Speaker note: What this step is for: Movement in a game is a question asked every frame: if the key is down, change the position a little. -->

<!-- Speaker note: Teacher: fill in the trace table on the board; ask what a frame with no key does. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Trace the paddle

**px starts at 0. Fill in px after each frame.**

| frame | key down | px |
|---|---|---|
| 1 | RIGHT | 2 |
| 2 | RIGHT | ? |
| 3 | none | ? |
| 4 | LEFT | ? |

* Answer: 4, 4, 2

<!-- Speaker note: Each frame with RIGHT down adds 2, a frame with no key changes nothing, and LEFT takes 2 away. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Faster

**How would you make the paddle move faster?**

- Change px -= 2 and px += 2 to a bigger number, such as 4
- Hold the key down harder
- Call update() twice
- Change -80 to a bigger number

* Answer: Change px -= 2 and px += 2 to a bigger number, such as 4

<!-- Speaker note: The paddle moves 2 steps a frame. 4 steps a frame is twice as fast. -80 is how high up the paddle is drawn. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Spot the bug

**This looks right, but it stops with AttributeError: no attribute 'LEFT' before any key is pressed. Click the line where it goes wrong.**

```
 1  def init():
 2      global px
 3      px = 0
 4  
 5  def update():
 6      global px
 7      if keyboard.LEFT:
 8          px -= 2
 9      if keyboard.RIGHT:
10          px += 2
11  
12  def draw():
13      screen.clear("rgb(10,10,40)")
14      screen.fillRect(px, -80, 24, 6, "rgb(100,200,255)")
```

* Answer: line 7

<!-- Speaker note: microStudio adds keyboard.LEFT only after the first key press, so asking for it before then fails. The pressed() helper first checks the key is there with hasattr, so it is safe from the first frame. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Stay on the screen:** Hold the right arrow for a while: the paddle disappears off the edge. Make it **stop at both edges**. The game on this page does.
- **Up and down too:** Make the up and down arrows move the paddle too.

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-keys/?full=step-4#step-4)

<!-- Speaker note: What this step is for: An if after the move keeps a value inside limits; each key is its own if, so two keys can work at once. Hints, in order: After moving, check the edges: if px > 90, set it back to 90. / Do the same for the left edge: if px < -90, px = -90. / Add a second variable, py, for the height. Start it at -80 and draw the box at (px, py). / UP adds to py and DOWN takes away (y goes up the screen). Put py in both global lines. For students who need more support: Give the edge check for the right side and ask students to write the left one. For early finishers: Make the paddle wrap round to the other side at the edges, or give it a short dash on Space that only works every few seconds. The hard part, on purpose: Thinking in frames: a key held for a second is 60 small moves. The trace table is the moment to slow down. When students get stuck: The keys do nothing. Ask: Did you click the game first? Fix: Click inside the game, then press the keys. / AttributeError: 'Javascript Object' object has no attribute 'LEFT'. Ask: Does the code use keyboard.LEFT directly? Fix: Copy the pressed() helper in and write pressed("LEFT"). / The paddle goes up when DOWN is pressed. Ask: Which way does y count in microStudio? Fix: y goes up the screen: UP adds, DOWN takes away. / Only the first key works when two are held. Ask: Is the second check an elif? Fix: Use a separate if for each key. -->

<!-- Speaker note: Teacher: ask where the edge check goes: before or after the move? (after). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: a player that moves

Make a player you can move all four ways, then add one thing of your own: a key that makes it go faster, a different colour when it is moving, wrapping round to the other side at the edges... Key names include `"SPACE"`, `"ENTER"` and letters such as `"Q"` (`"LEFT"` and the other arrows also work with W, A, S and D). The game on this page goes fast while you hold Space.

[Open this step](https://tutorials.learningwaypoints.com/code/games/ms-keys/?full=step-5#step-5)

<!-- Speaker note: What this step is for: Goals only: keys change variables in update, and draw shows them. -->

<!-- Speaker note: Teacher: let pairs test each other's player and name the extra key. -->

---

## Where this leads

Asking every frame is called **polling**; MakeCode and Godot can do both, polling and events. Next: lots of stars falling at once, each one an object.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why does the paddle stop when you let go of the key?**

* Each frame update() asks whether the key is down; when it is not, px is not changed, so the paddle stays where it is.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson: falling stars as objects, which they have already made with turtles. Polling (asking every frame) and events (a function called on a key) are the two ways every engine reads keys. -->
