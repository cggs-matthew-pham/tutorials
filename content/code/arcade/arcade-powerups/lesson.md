---
order: 12
unit: challenge
title: Power-ups
summary: Add a shield that runs out and a blaster with limited ammo to Space dodger, then design a power-up of your own.
language: makecode
explainPicture: powerups.ts#predict
hook: "A mushroom in Mario, a power pellet in Pac-Man, a shield in a space shooter: each one is a variable that changes the rules for a while."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@powerups.ts#predict", lesson: "code/arcade/arcade-powerups", target: "arcade" }
  caption: "A power-up has three parts"
  say: "A power-up has three parts: a variable, an event, and a rule."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "The variable: shield is true while it is on."
        say: "The variable remembers it: shield is true while it's on."
    - caption:
        text: "The event: catching a star sets it to true."
        say: "The event changes it: catching a star sets shield to true."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The rule: if shield, a rock costs no life."
        say: "The rule uses it: if shield is on, a rock costs no life."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Your Space dodger now has a yellow **star** that floats past every 5 seconds. Catch it and you get a **shield**: while the shield is on, a rock that hits you is smashed for 5 points instead of costing a life. You will add three power-ups, one milestone each, with less help each time.

**Behind the code:** a variable can hold **true** or **false** (in **Logic**). `shield` is true while the shield is on. **if shield** asks whether it is true right now.

## Predict

```step
stage: predict
code: powerups.ts#predict
check:
  type: predict
  q: "You catch one star. How long does the shield last?"
  options: ["5 seconds", "Until the next rock hits you", "For the rest of the game", "One frame"]
  actual: "For the rest of the game. Catching the star sets shield to true, and no block ever sets it back to false."
```

Read the two overlap events first. The background turns dark blue while the shield is on.

## Run

```step
stage: run
code: powerups.ts#predict
try: { playground: arcade, starter: "powerups.ts#predict" }
check: { type: reflect, text: "I caught a star and saw the shield never ran out." }
```

Catch a star, then fly into the rocks. Is this power-up fair?

## Investigate

```step
stage: investigate
code: powerups.ts#predict
insight: "Arcade's engine moves sprites, notices touches and ends the game; the rules (what a touch means, when a power-up is on) are the blocks you write, and a true/false variable is how those rules remember what is happening now."
try: { playground: arcade, starter: "powerups.ts#predict" }
tasks:
  - check:
      type: match
      q: "Who decides each thing: Arcade's engine, or a game rule in your blocks? Match them."
      pairs:
        - ["Each rock slides left a little every frame", "engine: velocity moves it every frame"]
        - ["The game ends when the lives reach 0", "engine: info ends the game at zero lives"]
        - ["A star that leaves the screen is removed", "engine: auto destroy removes it"]
        - ["Catching a star turns the shield on", "game rule: your overlap event decides"]
        - ["A rock costs no life while the shield is on", "game rule: your if decides"]
      explain: "The engine does the same jobs in every game. The rules are what make this game yours, and they are where the bugs (and the fun) live."
  - check:
      type: trace
      text: "Fill in what happens when a rock hits the ship."
      table: |
        | shield | lives before | lives after | score change |
        | false | 3 | [2] | [0] |
        | true | 3 | [3] | [5] |
        | false | 1 | [0] | [0] |
      explain: "The if asks shield every time a rock hits. True: 5 points and no life lost. False: lose a life (and at 0 lives the engine ends the game)."
  - check:
      type: question
      q: "Sam wants the shield to switch off when shieldTime reaches 0. He puts the blocks below in on start. He catches a star, and shieldTime counts down to 0. What happens to the shield?"
      options: ["It switches off at 0", "It never switches off: the if was asked once, at the start, before the star was caught", "It switches off straight away", "The game ends"]
      answer: 1
      fault: logic
      misconception: check-in-start
      explain: "Blocks in on start run once, before the game begins. The if is never asked again. A check that must keep happening goes in a timer or in on game update."
```

Play again and look at which blocks you wrote and which jobs Arcade does for you.

### Game rule or engine?

Sort the jobs.

### Shield on, shield off

Trace a rock hitting the ship.

```python
def on_overlap(sprite, otherSprite):
    otherSprite.destroy()
    if shield:
        info.change_score_by(5)
    else:
        info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_overlap)
```

The same overlap event in Python: `if shield:` asks whether `shield` is `True`.

### Sam's shield

```makecode
let shield = false
let shieldTime = 0
if (shieldTime == 0) {
    shield = false
    scene.setBackgroundColor(15)
}
```

## Milestone 1: the shield runs out

```step
stage: modify
insight: "A number that counts down in a timer turns a true/false variable back off, so a power-up lasts a set time."
try: { playground: arcade, starter: "powerups.ts#m1" }
hint:
  - "Catching a star already sets shieldTime to 5. In the timer that runs every 1000 ms, add: if shield, change shieldTime by -1."
  - "Inside that if, add another: if shieldTime = 0, set shield to false and set the background back to colour 15 (black)."
check: { type: code, text: "The shield switches off by itself after 5 seconds.", rules: { contains: ["shieldTime+=-1"], count: { "shield=false": 2 } } }
```

A new variable, `shieldTime`, is set to **5** when you catch a star.

1. Every second while the shield is on, take 1 off `shieldTime`.
2. When `shieldTime` reaches **0**, set `shield` to **false** and put the black background back.

## Milestone 2: a blaster with limited ammo

```step
stage: modify
insight: "A number variable limits an action: the button event asks the variable first, and a power-up refills it."
try: { playground: arcade, starter: "powerups.ts#m2" }
hint:
  - "In the else of the star overlap: set ammo to 5. Then add on A button pressed with if ammo > 0."
  - "Inside the if: projectile from ship with vx 100, vy 0, then change ammo by -1. A Projectile–Enemy overlap destroys both and adds points."
check: { type: code, text: "A star sometimes refills the ammo; A fires only while there is ammo, and each shot uses one.", rules: { count: { "ammo=": 2 }, inside: { "controller.A.onEvent(ControllerButtonEvent.Pressed": ["if(ammo>0", "createProjectileFromSprite(", "ammo+=-1"] } } }
```

Now a star gives a random prize: `prize` is 0 (the shield) or 1 (the blaster, still empty).

- Prize 1 sets `ammo` to **5**.
- **A** (space on the keyboard) fires a shot only **if ammo > 0**, and each shot takes 1 from `ammo`.
- A shot that hits a rock destroys both.

## Milestone 3: your own power-up

```step
stage: make
insight: "Designing a power-up from goals alone shows whether a student can turn a game idea into a variable, an event that changes it, and a rule that uses it."
try: { playground: arcade, starter: "powerups.ts#sol-m2" }
hint:
  - "Change prize to pick random 0 to 2, and add else if prize = 1 for the blaster. The last else is yours."
  - "Ideas: an extra life, a slow-down (a variable the rock timer uses for vx), or a magnet that makes stars follow the ship."
check: { type: code, text: "A star gives one of three prizes, and the third is a power-up you designed.", rules: { count: { "prize==": 2 } } }
```

Design a **third power-up** and add it to the prizes:

- Decide what it does and how long it lasts.
- A star now picks one of **three** prizes.
- Play it: is it too strong, too weak, or just right?

## Change a sprint boost

```step
stage: modify
code: powerups.ts#boost
try: { playground: arcade, starter: "powerups.ts#boost" }
```

A runner with a sprint boost on **B** (enter on the keyboard): 3 seconds of extra speed, then back to normal. Make it a fair power-up. Ideas: the boost can only be used again after a rest, a counter of boosts left, or a background colour while boosting.
