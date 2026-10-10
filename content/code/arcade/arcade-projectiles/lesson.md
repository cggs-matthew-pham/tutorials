---
order: 7
unit: tools
title: Projectiles and lists
summary: Fire projectiles with the A button, then use a list of every sprite of a kind to do something to all of them at once.
language: makecode
explainPicture: projectiles.ts#predict
hook: "Space Invaders, Galaga and every 'shoot 'em up' since: you fire, and the game has to keep track of every shot and every alien on the screen at once."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@projectiles.ts#predict", lesson: "code/arcade/arcade-projectiles", target: "arcade" }
  caption: "A projectile is its own kind"
  say: "A projectile is fired from a sprite, and it's its own kind: Projectile."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "So a hit is a Projectile–Enemy overlap."
        say: "So a hit is an overlap between a projectile and an enemy."
    - caption:
        text: "array of sprites of kind Enemy is a list of every enemy."
        say: "Array of sprites of kind enemy is a list of every enemy right now."
    - click: "Run"
    - wait: 600
    - caption:
        text: "for element runs once for each item: one press destroys them all."
        say: "A for element loop runs once for each one, so one press destroys them all."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
So far each sprite had its own name: `ship`, `cat`, `car`. A game with shots flying everywhere cannot name them all. Arcade gives you two tools for that.

1. A **projectile** (in **Sprites**) is a sprite fired from another sprite. It is its **own kind**: **Projectile**. The engine removes it when it leaves the screen.
2. **array of sprites of kind** (in **Sprites**) gives you a **list**: every sprite of that kind in the game right now. A **for element** loop (in **Loops**) then does something to **each one**.

## Predict

```step
stage: predict
code: projectiles.ts#predict
check:
  type: predict
  q: "You press A (space on the keyboard) once, with the ship right under the alien. What happens?"
  options: ["The shot and the alien both disappear, and the score goes up by 1", "The ship disappears", "The shot goes through the alien", "Only the alien disappears"]
  actual: "The shot and the alien both disappear, and the score goes up by 1. The shot is a Projectile, the alien an Enemy, so the Projectile–Enemy overlap runs: sprite is the shot, otherSprite the alien."
```

The overlap event names two kinds: **Projectile** and **Enemy**.

## Run

```step
stage: run
code: projectiles.ts#predict
try: { playground: arcade, starter: "projectiles.ts#predict" }
check: { type: reflect, text: "I fired at the alien and compared what happened with my prediction." }
```

Press the **A** button (space on the keyboard). Then move the ship to one side and fire again: where does the shot go?

## Investigate

```step
stage: investigate
code: projectiles.ts#invaders
insight: "A projectile is its own kind (Projectile), so the overlap that catches a hit names Projectile, not Player. array of sprites of kind gives a list of every sprite of a kind, and a for element loop runs its blocks once for each one."
try: { playground: arcade, starter: "projectiles.ts#invaders" }
tasks:
  - check:
      type: match
      q: "Match each part of this game with what it does."
      pairs:
        - ["projectile from ship with vx 0, vy -100", "fires a shot straight up from the ship"]
        - ["on game update every 1000 ms", "makes a new alien each second"]
        - ["on Projectile overlaps Enemy", "runs when any shot touches any alien"]
        - ["sprite (in the overlap)", "the shot that hit"]
        - ["otherSprite (in the overlap)", "the alien that was hit"]
  - starter: projectiles.ts#freeze
    check:
      type: number
      q: "In this version, B freezes every alien: for each value in array of sprites of kind Enemy, set value vy to 0. There are 6 aliens on the screen when you press B. How many times does set value vy to 0 run?"
      answer: 6
      explain: "array of sprites of kind Enemy is a list of all 6 aliens. The for element loop runs its blocks once for each item in the list, with value as that alien: 6 times. Press B in the playground to see them all stop."
  - check:
      type: question
      q: "Ben wrote his own hit event (below). He fires at the aliens, but every shot passes straight through. Why?"
      options: ["The shot is too fast to hit anything", "A projectile is its own kind, Projectile, so a Player–Enemy overlap never notices a shot", "destroy only works on the player", "The overlap needs to be inside on A pressed"]
      answer: 1
      fault: logic
      misconception: projectile-kind
      explain: "The shot is made by the ship, but it is not the ship: it is a sprite of kind Projectile. Ben's event waits for a Player to touch an Enemy, which only happens if the ship itself crashes into an alien. The first kind should be Projectile."
```

### What does each part do?

Play the game, then match each part with its job.

### Freeze them all

Load the freeze version and press **B** (enter on the keyboard) when there are a few aliens.

### Ben's shots

Ben's hit event:

```makecode
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy()
    info.changeScoreBy(1)
})
```

## Modify

```step
stage: modify
insight: "Each pair of kinds has its own overlap event: Projectile–Enemy is a hit, Player–Enemy is a crash."
try: { playground: arcade, starter: "projectiles.ts#modify" }
tasks:
  - hint: ["on overlap is in Sprites › Overlaps. Choose the kinds Projectile and Enemy.", "Inside: destroy sprite, destroy otherSprite, change score by 1."]
    check: { type: code, text: "Make the shots work: a shot that hits an alien destroys both and scores a point.", rules: { inside: { "sprites.onOverlap(SpriteKind.Projectile,SpriteKind.Enemy,": ["destroy(", "info.changeScoreBy("] } } }
  - hint: ["Add a second on overlap, with the kinds Player and Enemy.", "Destroy the alien (otherSprite), and change life by -1."]
    check: { type: code, text: "When an alien crashes into the ship, the alien is destroyed and you lose a life.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy,": ["destroy(", "info.changeLifeBy(-"] } } }
```

### Make the shots work

The shots in this game pass through everything. Add the overlap that turns a shot into a hit.

### Crash!

Now the aliens can reach the ship without anything happening. Make a crash cost a life.

## Make

```step
stage: make
try: { playground: arcade, starter: "projectiles.ts#make" }
hint:
  - "Start with on B pressed (in Controller). Inside it, a for element loop from Loops."
  - "Drag array of sprites of kind (Sprites) into the loop's list slot, and choose Enemy."
  - "Inside the loop: destroy value, and change score by 1."
check: { type: code, text: "A smart bomb: pressing B destroys every alien on the screen and scores one point for each.", rules: { contains: ["ofsprites.allOfKind(SpriteKind.Enemy)"], inside: { "controller.B.onEvent(": ["destroy(", "info.changeScoreBy("] } } }
```

The aliens come twice as fast now. Make a **smart bomb** on the **B** button (enter on the keyboard):

- every alien on the screen is destroyed,
- you score **one point for each** alien.

Count the aliens before you press B, and check the score goes up by that many.

## Change a firework show

```step
stage: modify
try: { playground: arcade, starter: "projectiles.ts#fireworks" }
```

**A** launches a rocket; **B** makes every rocket in the sky burst off in a random direction. Make the rockets launch faster, and make **B** also change the background colour, so the sky flashes when they burst.
