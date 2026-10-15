---
marp: true
theme: default
html: true
---

# Space dodger

Arcade Foundations · Final challenge: Space dodger

<!-- Speaker note: Students build a complete dodging game in three milestones, using a timer, random positions, velocity, overlaps, lives, score and the high score. About 60 minutes (Predict, Run, Investigate 12 min · Milestone 1 10 min · Milestone 2 12 min · Milestone 3 15 min · Road crossing 10 min). -->

---

## Today

**We are learning to** build a complete game that uses everything so far. Steer a ship through rocks, keep your lives, and beat your high score.

- I can make sprites appear on a timer and move them with velocity.
- I can make a hit cost exactly one life by destroying what was hit.
- I can combine timers, overlaps, lives and score into a game, and use the high score.

<!-- Speaker note: Before class: This lesson uses everything from the course, with only two new blocks: **auto destroy** (the **set flag** block in Sprites removes a sprite once it leaves the screen) and **high score** (in Info: the best score so far in this browser, shown on the game over screen by itself). The game: a **timer** (`on game update every 1000 ms`) makes a rock at the right edge, and a negative **vx** carries it left; an **overlap** event between Player and Enemy destroys the rock and takes a life; a second timer adds 1 to the score every second. The milestones fade the help: Milestone 1 gives nearly all the code, Milestone 2 an outline, Milestone 3 only goals. Play it yourself first. The core is Milestones 1 and 2; Milestone 3 and the road crossing finish the lesson for most students. Teacher: Leo's game revisits the Score and lives lesson: an overlap runs every frame while the sprites touch, so a rock that is not destroyed eats every life at once. Teacher: Milestone 1: two blocks. Auto destroy changes nothing you can see, so explain it as tidying up: the console only has so much memory. Teacher: Milestone 2: read the overlap aloud: 'when the ship touches a rock, remove that rock and lose a life'. otherSprite is the rock. Teacher: Milestone 3: goals only. A second timer is fine; several timers can run at once. The high score lives in the browser, so it survives the restart button. Teacher: Road crossing: the same building blocks on their side. Good for students who finish early, or as a homework remix. -->

---

## Why it matters

> Asteroids, Flappy Bird and every endless runner are the same game underneath: things come at you, you dodge, and the longer you last the better you score.

<!-- Speaker note: Your ship sits on the left and moves up and down. Rocks fly in from the right. Touch one and you lose a life; survive and your score climbs. You will build it in three milestones, with less help each time. You already know every idea it needs. Two blocks are new, and each comes with a **Behind the code** note when you need it. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

![h:338](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b807e5156d67.png?v=c989dcc7a3408b12)

**Where do the rocks fly across the screen?**

- From the left to the right
- All along the same line, through the middle
- They do not move
- At a different height each time

<!-- Speaker note: What happens: All along the same line. Every rock starts at (160, 60), so they all come through the middle, where the ship starts. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: every rock comes down the middle, so the game is easy (or impossible if you sit still). Ask what one change would make it a real game. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* All along the same line. Every rock starts at (160, 60), so they all come through the middle, where the ship starts.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

Open the lesson at this step and try it together.

[studio.learningwaypoints.com/tutorials/code/arcade/arcade-dodger/?full=step-2#step-2](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-dodger/?full=step-2#step-2)

<!-- Speaker note: Move with the up and down arrows (or W and S). Is it hard to dodge rocks that always come the same way? Students should be able to say: I watched the rocks come in and dodged them with the up and down arrows. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

![h:338](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/b807e5156d67.png?v=c989dcc7a3408b12)

<!-- Speaker note: This is the working start of the game. Read it, and change numbers in the playground to test your answers. What this step is for: A timer makes a new sprite every second, and velocity carries it across: the engine moves every rock, and the blocks only decide where it starts and how fast it goes. -->

<!-- Speaker note: Teacher: the match is the whole game in four blocks. The reaction-time sum shows why speed matters. The 'where do rocks go' question sets up auto destroy. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Who does what

Match each block with its job.

The timer in Python:

```python
def on_update_interval():
    global rock
    rock = sprites.create(img("""..."""), SpriteKind.enemy)
    rock.set_position(160, 60)
    rock.vx = -50
game.on_update_interval(1000, on_update_interval)
```

The timer becomes a `def`: a named job handed to the game, which runs it every second. Blocks write this for you. (Functions are the first lesson of Arcade advanced skills.)

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 28px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Who does what

**Match each block with its job in the game.**

| | |
|---|---|
| `on game update every 1000 ms` | A. starts each rock at the right edge |
| `set rock position to (160, 60)` | B. lets the ship move up and down only |
| `set rock vx to -50` | C. moves each rock left, every frame |
| `move ship with buttons, vx 0, vy 100` | D. makes a new rock every second |

* Answer: on game update every 1000 ms → D. makes a new rock every second; set rock position to (160, 60) → A. starts each rock at the right edge; set rock vx to -50 → C. moves each rock left, every frame; move ship with buttons, vx 0, vy 100 → B. lets the ship move up and down only

<!-- Speaker note: The timer makes the rocks, the position says where each starts, and velocity keeps it moving. The ship's 0 across means left and right do nothing. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How long to react?

**A rock starts at x 160 and moves 50 pixels left every second. The ship is at x 20. How many seconds does the rock take to reach the ship?**

* Answer: 2.8

<!-- Speaker note: The rock travels 160 - 20 = 140 pixels at 50 pixels a second: 140 / 50 = 2.8 seconds. A bigger speed gives the player less time. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Where do the rocks go?

**Ava plays for a minute. A rock goes past the ship and off the left edge. What happens to it?**

- It turns around
- It keeps flying left forever, off the screen, and the game keeps track of it
- It comes back on the right
- It is removed when it leaves the screen

* Answer: It keeps flying left forever, off the screen, and the game keeps track of it

<!-- Speaker note: Nothing destroys it, so it keeps moving off the screen. After a few minutes there are hundreds of rocks nobody can see. Milestone 1 fixes this. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Leo's game

![h:136](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/4157f57f428e.png?v=ed56f0b2eaaa871f)

**Leo adds an overlap event for Player and Enemy that takes away a life, but forgets to destroy the rock. He starts with 3 lives. A rock touches his ship. What happens?**

- He loses all 3 lives almost at once and the game ends
- He loses 1 life and the rock flies on
- He loses 1 life and the rock disappears
- Nothing: the rock must be destroyed first

* Answer: He loses all 3 lives almost at once and the game ends

<!-- Speaker note: The overlap event runs every frame while the rock still touches the ship, about 30 times a second, so 3 lives go in a tenth of a second. Destroy the rock in the event. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Plan the milestones <span style="font-size:.6em;color:#64748b">(4 min)</span>

On the board, list what the finished game needs: random rocks, lives, a hit, a score, a high score. Next to each, write the block or event that does it.

<!-- Speaker note: This list is the plan for the three milestones. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 1: rocks from anywhere

**Behind the code:** **set rock auto destroy on** (Sprites, the **set flag** block) tells the engine to remove the sprite as soon as it leaves the screen. Without it, every rock that missed the ship keeps flying forever.

1. Start each rock at a **random height**, from 10 to 110.
2. Set each rock to **auto destroy**.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-dodger/?full=step-4#step-4)

<!-- Speaker note: What this step is for: One random number turns a predictable pattern into a game, and auto destroy lets the engine clean up what the player can no longer see. Hints, in order: In the timer, replace the 60 in set rock position with pick random 10 to 110 (from Math). / Drag set rock auto destroy (Sprites, set flag) into the timer, under set rock vx. For students who need more support: Pair students for Milestone 3: one reads the goals aloud while the other builds. A student who finishes Milestone 2 has a complete, playable game. For early finishers: Make the rocks faster as the score grows: set rock vx to 0 - (50 + score), so a long game gets harder by itself. The hard part, on purpose: Combining a timer, velocity and overlaps in one game. Point them to the milestone they're on and ask them to get that part playing first. When students get stuck: All lives vanish at the first hit. Ask: What happens to the rock after it touches the ship? Fix: Destroy otherSprite inside the overlap event, so it touches only once. / Rocks pass through the ship and nothing happens. Ask: Which kinds does the overlap event name, and which kinds are the ship and the rock? Fix: The ship must be a Player and the rock an Enemy, matching the event. / All rocks still come along one line. Ask: Where is pick random? Fix: It must be in the y of set position, inside the timer, so each rock gets a new number. / The score goes up very fast. Ask: Which block is the score in? Fix: Use on game update every 1000 ms, not on game update (which runs every frame). -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Milestone 2: lives and a hit

Give the player **3 lives**, and make a hit count:

- When the ship touches a rock, **destroy the rock** and **lose a life**.
- At zero lives, the game ends by itself.

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-dodger/?full=step-5#step-5)

<!-- Speaker note: What this step is for: A hit is an overlap event between two kinds; destroying the rock is what makes it count once. Hints, in order: Set life to 3 in on start. Then drag in on sprite of kind Player overlaps otherSprite of kind Enemy. / Inside the overlap: destroy otherSprite, then change life by -1. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make: Milestone 3: score and high score

**Behind the code:** **high score** (in **Info**) is the best score so far in this browser. The game over screen shows it by itself; you can also use it in your blocks.

Finish the game:

- The score goes up by **1 every second** the player survives.
- Use **high score** to show the player when they are beating their best (a new background colour, a splash, or your own idea).
- Play three games. Does the game over screen show your best?

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-dodger/?full=step-6#step-6)

<!-- Speaker note: What this step is for: A score for time survived is a second timer, and the high score is a value the engine keeps between games, so a player can see they improved. Hints, in order: Add a second on game update every 1000 ms. Inside it: change score by 1. / high score is in Info. Try: if score > high score, set the background to a new colour, so the player sees they are beating their best. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Change a road crossing

The same game turned on its side: cars drive across, and the chick scores by reaching the top. Make it yours. Ideas: faster cars as the score goes up, cars from both sides, a second lane of logs, or a short effect when a car hits (Sprites › Effects).

[Open this step](https://studio.learningwaypoints.com/tutorials/code/arcade/arcade-dodger/?full=step-7#step-7)

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## High-score board <span style="font-size:.6em;color:#64748b">(4 min)</span>

Write your high score on the board. Swap games and suggest one change that makes the next pair's game fairer or harder.

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Why must the rock be destroyed inside the overlap event?**

* The overlap event runs every frame the two sprites touch. Destroying the rock makes it touch once, so a hit costs one life, not all of them.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Course complete. Next: Arcade advanced skills (functions, gravity, levels and power-ups). For more practice building whole games, MakeCode's Beginner Skillmap (arcade.makecode.com/skillmaps) uses the same blocks. Class ideas: a class high-score board on the whiteboard; swap games with a partner and suggest one change that makes it fairer or harder. -->
