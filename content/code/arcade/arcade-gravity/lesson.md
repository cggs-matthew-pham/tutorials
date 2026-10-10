---
order: 9
unit: worlds
title: Gravity and jumping
summary: Give a sprite gravity, build a floor with an if, and make it jump, but only from the ground.
language: makecode
explainPicture: gravity.ts#jumper
hook: "Mario, Sonic and every runner game on a phone: you press jump, you rise, you slow down, you fall back. That curve is two numbers and one rule."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@gravity.ts#jumper", lesson: "code/arcade/arcade-gravity", target: "arcade" }
  caption: "ay is gravity"
  say: "ay is gravity: every frame it adds a little to the falling speed."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "A jump is a speed upwards: vy = -150."
        say: "A jump is a speed upwards. Gravity slows it, stops it, and brings it down."
    - caption:
        text: "An if in on game update makes a floor."
        say: "There's no floor, so an if in on game update makes one."
    - click: "Run"
    - wait: 600
    - caption: "Only jump from the ground: put the jump inside an if."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
You know **velocity**: vx and vy say how far the engine moves a sprite every frame. Arcade has a third number, **ay**: the **acceleration** down. Every frame, the engine adds a little to **vy**, so the sprite falls **faster and faster**. That is gravity.

A **jump** is just a speed **upwards**: a **negative vy** (y counts down, so up is negative). Gravity then slows the sprite, stops it, and pulls it back down. Set ay in **Sprites**: the same block as set vx, with **ay** chosen in its dropdown.

## Predict

```step
stage: predict
code: gravity.ts#fall
check:
  type: predict
  q: "The ball starts near the top with ay 300 and nothing else. What does it do?"
  options: ["Falls faster and faster, and drops off the bottom of the screen", "Falls and stops at the bottom edge", "Falls at the same speed all the way", "Stays where it is"]
  actual: "It falls faster and faster and drops off the bottom of the screen. ay makes vy grow every frame, and nothing tells the ball where the ground is."
```

## Run

```step
stage: run
code: gravity.ts#fall
try: { playground: arcade, starter: "gravity.ts#fall" }
check: { type: reflect, text: "I watched the ball fall (restart to see it again) and compared with my prediction." }
```

Watch the ball closely: does it fall at a steady speed? Press the restart button under the simulator to see it again.

## Investigate

```step
stage: investigate
code: gravity.ts#jumper
insight: "Gravity is acceleration: the engine adds ay to vy every second, a little each frame, so a fall speeds up and a jump (a negative vy) slows, stops and comes back. With no tilemap there is no floor, so an if in on game update builds one, and a jump must check the player is on it."
try: { playground: arcade, starter: "gravity.ts#jumper" }
tasks:
  - check:
      type: trace
      text: "A sprite starts still (vy 0) with ay 300. Gravity adds 300 to vy every second. Fill in vy."
      table: |
        | seconds | vy (speed down) |
        | 0 | 0 |
        | 0.5 | [150] |
        | 1 | [300] |
        | 2 | [600] |
      explain: "Every second vy grows by ay, 300. That is why a fall speeds up: the sprite moves further each frame than the frame before."
  - check:
      type: number
      q: "Now the player jumps: vy is set to -150 (up), with ay 300. How many seconds until it stops rising (vy is 0)?"
      answer: 0.5
      tolerance: 0.05
      explain: "Gravity adds 300 every second, so after 0.5 seconds -150 has become 0: the top of the jump. Then vy is positive and the player falls back down."
  - check:
      type: question
      q: "This is Leo's jumper. Pressing A once jumps well, but pressing it again and again makes his player fly off the top of the screen. Why?"
      options: ["-150 is too big a number", "Nothing checks the player is on the ground, so every press jumps again, even in mid-air", "ay should be negative", "The floor in on game update pushes him up"]
      answer: 1
      fault: logic
      misconception: jump-midair
      explain: "A jump only sets vy to -150. Leo's A event does that on every press, wherever the player is, so each press in the air starts a new jump higher up. The jump should only happen when the player stands on the floor."
```

Leo's player has gravity, a floor and a jump. Run and jump with the **A** button (space on the keyboard).

**The floor.** There is no ground in this game, so the program builds one. In **on game update**, every frame: *if player bottom > 100*, put the bottom back at 100 and set vy to 0. **bottom** is the y of the sprite's bottom edge (choose it in the dropdown of the x block).

In Python the floor is the same if, inside the function the game calls every frame:

```python
def on_on_update():
    if player.bottom > 100:
        player.bottom = 100
        player.vy = 0
game.on_update(on_on_update)
```

**Engine note.** Arcade can do the floor for you. A **tilemap** is a game world drawn from squares (tiles) in the tile editor; tiles marked as **walls** stop sprites by themselves, and the **camera** can scroll along a world much bigger than the screen. That is why platformers suit Arcade so well. This course builds the floor by hand first, so tile walls make sense when you meet them: a wall is this if, done by the engine.

### Faster and faster

Work out vy as the seconds go by.

### Top of the jump

How long does the jump go up for?

### Leo's jump

Leo's A event sets vy to -150 on every press. In the playground, press A three times, quickly.

## Modify

```step
stage: modify
insight: "A jump belongs in an if: the press only counts when the player is standing on the floor."
try: { playground: arcade, starter: "gravity.ts#jumper" }
tasks:
  - hint: ["Drag an if into the on A pressed block, around set vy.", "The question: player bottom ≥ 100 (from Logic, with bottom from Sprites)."]
    check: { type: code, text: "Fix the flying: A only jumps when the player is on the ground.", rules: { inside: { "controller.A.onEvent(": ["if(", "player.vy=-"] } } }
  - hint: ["Make the jump weaker or stronger: a smaller or bigger negative vy.", "Then change ay: try 100 for the Moon, 600 for a heavy planet."]
    check: { type: reflect, text: "I changed the jump and the gravity, and found a pair that feels right for my game." }
```

### No flying

This is Leo's game. Fix it: **A** only jumps when the player is **on the ground**.

### Moon jump

Change the jump speed and the gravity. What does ay 100 feel like? And ay 600? Pick the pair you like best.

## Make

```step
stage: make
try: { playground: arcade, starter: "gravity.ts#make" }
hint:
  - "Gravity, a floor in on game update and a jump from the ground: the same blocks as your fixed jumper."
  - "A timer (on game update every 1500 ms) makes a rock at x 160 near the floor, with a negative vx so it slides left."
  - "A Player–Enemy overlap: destroy the rock and change life by -1."
check: { type: code, text: "A runner: gravity, a floor, a jump from the ground, rocks on a timer, and a hit costs a life.", rules: { contains: [".ay=", "game.onUpdateInterval("], inside: { "game.onUpdate(": ["if(", "vy=0"], "controller.A.onEvent(": ["if(", "vy=-"], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,": ["info.changeLifeBy(-"] } } }
```

Make a **runner**. The player stays on the left; the world comes to them:

- the player has **gravity** and stands on a **floor** at y 100,
- **A** jumps, but only from the ground,
- a **rock** slides in from the right every 1.5 seconds,
- a hit costs a **life** (three lives, then game over).

## Change a trampoline

```step
stage: modify
try: { playground: arcade, starter: "gravity.ts#trampoline" }
```

This acrobat never stops bouncing: the floor sets vy to **-180** instead of 0. Make the bounces higher, then make the trampoline a little higher up the screen (both numbers in the if must change).
