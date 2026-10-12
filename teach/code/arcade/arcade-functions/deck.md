---
marp: true
theme: default
html: true
---

# Functions

MakeCode Arcade · Collections and tools

<!-- Speaker note: Students name a job (making an enemy) as a function with a speed parameter, call it from several places, and see in Python that every event block is a function the game calls. About 50 minutes (Predict and Run 8 min · Investigate 15 min · Modify 10 min · Make 12 min · Aquarium 5 min). -->

---

## Today

**We are learning to** name a job once as a function, give it a parameter so it can do the job differently each time, and see that every event block is a function too.

- I can make a function and call it from more than one place.
- I can give a function a parameter and call it with different values.
- I can explain that an event block is a function the game calls for me.

<!-- Speaker note: Before class: A **function** is a named job: some blocks with a name, made once in **Functions** (under Advanced in the toolbox). Making it does **not** run it. It runs when a **call** block calls it, once per call. A **parameter** is an input to the function, such as `speed` in *spawnEnemy(speed)*: the call hands in a number (*spawnEnemy(50)*), and inside the function `speed` is that number. So one function can make a slow bug and a fast bug. This lesson starts the **Python peek**: the **Python** button at the top of the editor shows the same program as text. The big reveal is that every event block (*on game update every*, *on overlap*, *on A pressed*) becomes a `def` in Python, handed to the game, which calls it when the event happens. Students only read the Python; nobody needs to write it. MakeCode adds a `global bug` line inside the function: it means "use the bug variable from outside, not a new one". Students can ignore it. The bug variable is declared at the top as `let bug: Sprite = null` (blocks make this line by themselves). Try the Make task yourself: it is about ten blocks. Teacher: Then switch the editor to Python together and read it line by line before the match. Say it plainly: an event block is a function. You make it; the game calls it. Teacher: Aquarium: the second parameter is the stretch inside the task. Show where Add a parameter is on the function block. -->

---

## Why it matters

> A game makes the same thing again and again: another enemy, another coin, another wave. Programmers write that job once, give it a name, and use the name everywhere.

<!-- Speaker note: Making an enemy takes several blocks: create it, place it, set its speed. When a game needs that job in several places, you can **name** the blocks once as a **function**, then **call** the function by name wherever you need it. A function can also take a **parameter**: a value handed in by the call. **spawnEnemy(speed)** makes an enemy, and the call says how fast: *spawnEnemy(20)*, *spawnEnemy(100)*. Make a function in **Functions › Make a Function** (in the toolbox, under Advanced). Its **call** block then appears in the same drawer. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:272](https://tutorials.learningwaypoints.com/_pictures/makecode/code/4dd9f398080f.png?v=ebbf0f6cc1de3cda)

**on start calls spawnEnemy three times, with 20, 50 and 100. What do you see?**

- One bug, flying at speed 100
- Three bugs flying right at the same speed
- Three bugs flying right, each at a different speed
- Nothing: the function is never used

<!-- Speaker note: What happens: Three bugs flying right, each at a different speed. Each call runs the function's blocks once, and speed is the number that call handed in: 20, then 50, then 100. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: some students expect the function to make one bug, or three identical ones. Point at the three calls and the three numbers. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* Three bugs flying right, each at a different speed. Each call runs the function's blocks once, and speed is the number that call handed in: 20, then 50, then 100.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[tutorials.learningwaypoints.com/code/arcade/arcade-functions/?full=step-2#step-2](https://tutorials.learningwaypoints.com/code/arcade/arcade-functions/?full=step-2#step-2)

<!-- Speaker note: Watch the three bugs. Which one was **spawnEnemy(100)**? Press the restart button under the simulator to watch again (the heights are random). Students should be able to say: I counted the bugs, watched their speeds and compared with my prediction. -->

<!-- Speaker note: Teacher: ask which bug is the 100 one. The parameter is the only difference between the calls. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:360](https://tutorials.learningwaypoints.com/_pictures/makecode/code/9db3db39451e.png?v=d33c1050d08295ed)

<!-- Speaker note: The game: a bug flies in from the left every second. Dodge them. What this step is for: A function names a job once; its blocks run only when it is called, once per call, and a parameter lets each call do the job differently. Every event block is a function too: in Python you can see the blocks handed to the game to call. -->

<!-- Speaker note: Teacher: Ava's mistake (making but never calling) is this lesson's misconception. Ask: who does the job if nobody asks for it? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Ava's bugs

Ava's program:

![h:259](https://tutorials.learningwaypoints.com/_pictures/makecode/code/b0f71da4d86c.png?v=9ae12c75afda75ee)

**Ava made the spawnEnemy function and an empty timer (below). She runs the game and no bugs ever appear. Why?**

- Nothing calls spawnEnemy: making a function does not run it
- speed has no value, so the bugs are invisible
- The timer is too slow
- Functions only work in on start

* Answer: Nothing calls spawnEnemy: making a function does not run it

<!-- Speaker note: Making a function only names the job. Its blocks run when a call block runs them. Ava's timer is empty, so the job is never done. A call spawnEnemy block inside the timer makes a bug every second. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How many bugs?

**The game runs for 10 seconds. The timer calls spawnEnemy(40) every 1000 ms. How many times do the blocks inside spawnEnemy run?**

* Answer: 10

<!-- Speaker note: Once per call, and the timer calls it once a second: about 10 times in 10 seconds, so about 10 bugs. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## The same game in Python

MakeCode can show every program in Python. Here is part of this one:

```python
def spawn_enemy(speed):
    global bug
    bug = sprites.create(img("""..."""), SpriteKind.enemy)
    bug.set_position(0, randint(10, 110))
    bug.vx = speed

def on_update_interval():
    spawn_enemy(40)
game.on_update_interval(1000, on_update_interval)

def on_on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)
```

Look at what Python did with **on game update every** and **on overlap**: each one is a `def`, a function, and the line after it **hands** that function to the game. The game calls it for you: every second, or every time two sprites touch. Every event block you have used is a function.

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The same game in Python

**This is the game in Python (press Python at the top of the editor). Match each Python line with what it does.**

| | |
|---|---|
| `def spawn_enemy(speed):` | A. hands that function to the game to call every second |
| `bug.vx = speed` | B. uses whatever number the call handed in |
| `def on_update_interval():` | C. makes the function, with a parameter called speed |
| `game.on_update_interval(1000, on_update_interval)` | D. makes a function from the blocks inside on game update every |
| `spawn_enemy(40)` | E. calls spawn_enemy, with speed 40 |

* Answer: def spawn_enemy(speed): → C. makes the function, with a parameter called speed; bug.vx = speed → B. uses whatever number the call handed in; def on_update_interval(): → D. makes a function from the blocks inside on game update every; game.on_update_interval(1000, on_update_interval) → A. hands that function to the game to call every second; spawn_enemy(40) → E. calls spawn_enemy, with speed 40

<!-- Speaker note:  -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Random speeds:** Make every bug fly at a **random** speed between 20 and 100. Change the **call**, not the function.
- **A point per bug:** Score a point for **every bug** that is made: a survival score. Change the **function**, so every call scores, wherever it is called from.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-functions/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One function can be called with a different value each time, and changing the function once changes every call. Hints, in order: pick random is in Math. / Drag pick random into the call's number slot: spawnEnemy(pick random 20 to 100). / Put the block inside the function, not inside the timer. / change score by 1 (Info) goes at the end of spawnEnemy. For students who need more support: Give students the makeCoin function already made, and ask them only to add the four calls. For early finishers: Give spawnEnemy a second parameter, the y position, and make a wave function that calls it five times in a column. The hard part, on purpose: Making a function does nothing until it is called. When nothing appears, ask which block calls the function. When students get stuck: No enemies (or coins) ever appear. Ask: Which block calls your function? Fix: Add a call block (from Functions) where the job should happen: in on start, the timer or the overlap. / The call block is missing from the toolbox. Ask: Have you made the function yet? Fix: Make the function first; its call block then appears in the Functions drawer. / Every bug flies at the same speed, whatever number the call has. Ask: Inside the function, what is vx set to? Fix: Drag the speed variable out of the function's header into set vx, instead of a fixed number. / Only one coin is ever on the screen, or coins pile up. Ask: How many times is makeCoin called in on start, and where else? Fix: Three calls in on start, and one in the overlap after the coin is destroyed. -->

<!-- Speaker note: Teacher: the first task changes a call, the second changes the function. Ask: which change affects every bug, wherever it comes from? -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a **coin collector** that never runs out of coins:

- a function **makeCoin** makes one coin (kind **Food**) at a random place,
- **on start** calls it three times, so there are three coins,
- every time a coin is collected, the overlap calls it again, so there are always three.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-functions/?full=step-5#step-5)

<!-- Speaker note: Hints, in order: Make a Function called makeCoin. Inside: set coin to sprite of kind Food, then set its position to random x and y. / Call makeCoin three times in on start. / In the overlap, after destroy and change score, call makeCoin once more. -->

<!-- Speaker note: Teacher: makeCoin is called four times in the code (three in on start, one in the overlap). The overlap call is what keeps the game going. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change an aquarium

This aquarium uses one function, **addFish(speed)**, to add every fish. **A** (space on the keyboard) adds a fish at a random speed. Start the tank with five fish instead of three, then add a second parameter so each call also chooses how high the fish swims.

[Open this step](https://tutorials.learningwaypoints.com/code/arcade/arcade-functions/?full=step-6#step-6)

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**You make a function spawnEnemy(speed) but never call it. What happens when the game runs?**

* No enemies appear: a function's blocks only run when something calls it.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit: gravity and levels. Lesson 10 uses a startLevel function, so the whole level set-up is one call. From here, lessons can include a short Python peek. Class ideas: list every job in a favourite game that a function could name (spawn a ghost, reset the ball). -->
