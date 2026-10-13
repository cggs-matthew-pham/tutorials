---
order: 8
unit: decide
reviews: [check-every-frame, engine-moves-it]
moveId: if-else-steer
title: Else and chasing
summary: Compare two positions to steer an enemy towards the player with if … else, then meet the follow block that does it for you.
language: makecode
introduces: [else]
explainPicture: lesson.ts#predict
hook: "The ghosts in Pac-Man, the zombies in Plants vs. Zombies, a guard walking up and down in a stealth game: each one asks 'where is the player?' and turns that way."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#predict", lesson: "code/arcade/arcade-chase", target: "arcade" }
  caption: "The enemy compares its position with the player's"
  say: "To chase, the enemy compares its position with the player's, every frame."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "If enemy x < player x, set vx positive: go right."
        say: "If the enemy is left of the player, a positive speed sends it right."
    - caption:
        text: "Else, set vx negative: go left. The same for y."
        say: "Otherwise a negative speed sends it left. Then the same for y."
    - click: "Run"
    - wait: 600
    - caption:
        text: "if … else always runs exactly one part."
        say: "if else always runs exactly one part. The follow block does this for you."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson an **if** in **on game update** kept asking a question. Now the enemy will ask a question about the **player**: *is my x less than the player's x?* If yes, the player is to the right, so go right. **Otherwise** (**else**), go left.

An **if … else** block has two parts, and **exactly one** of them runs: the first when the answer is yes, the else part when it is no. Click the **+** at the bottom of an if block to add **else**.

## Predict

```step
stage: predict
code: lesson.ts#predict
check:
  type: predict
  q: "The cat starts at x 20, the mouse at x 140. Nobody touches the keys. What does the cat do?"
  options: ["Walks right, towards the mouse", "Walks left, off the screen", "Stays where it is", "Walks right, past the mouse and off the screen"]
  actual: "It walks right, towards the mouse. Its x (20) is less than the mouse's x (140), so its vx is set to 30. When it reaches the mouse it wobbles on the spot: each frame the answer flips between yes and no."
```

`<` means "less than". **vx** is the speed across: positive goes right, negative goes left.

## Run

```step
stage: run
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I ran away from the cat with the arrow keys and compared what it did with my prediction." }
```

Now move the mouse with the arrow keys. Go left, right, up and down. What does the cat follow, and what does it ignore?

## Investigate

```step
stage: investigate
code: lesson.ts#predict
insight: "Comparing two positions tells a sprite which way to go: if my x is less than yours, you are to my right. if … else picks exactly one direction every frame, and the sign of vx decides which way that is."
try: { playground: arcade, starter: "lesson.ts#chase" }
tasks:
  - check:
      type: trace
      text: "For each position, which way does the if … else set the cat's vx?"
      table: |
        | cat x | mouse x | cat vx |
        | 20 | 140 | [30] |
        | 120 | 50 | [-30] |
        | 80 | 81 | [30] |
        | 80 | 80 | [-30] |
      explain: "When cat x is less than mouse x the first part runs (30, go right); otherwise the else part runs (-30, go left). At 80 and 80, 80 is not less than 80, so else runs: that is why the cat wobbles when it reaches the mouse."
  - check:
      type: question
      q: "Each frame, how many of the two set vx blocks run?"
      options: ["Both, one after the other", "Exactly one: the first when the answer is yes, the else part when it is no", "None, unless a button is pressed", "Only the first one"]
      answer: 1
      explain: "if … else always runs exactly one part. So the cat always has a direction: there is no frame where it forgets."
  - starter: lesson.ts#sign
    check:
      type: question
      q: "Zoe built her own cat (the playground has her version). The cat runs away from the mouse, then stops at the edge of the screen. Which part is wrong?"
      options: ["The < should be >, and the speeds are fine", "The speeds are the wrong way round: when the mouse is to the right, the cat's vx is set to a negative number", "It needs to be in on start", "30 is too slow to catch the mouse"]
      answer: 1
      fault: logic
      misconception: chase-sign
      explain: "When the cat's x is less than the mouse's x, the mouse is to the right, so the cat needs a positive vx (go right). Zoe's cat gets -30 and goes left. Swap the two speeds (or the < and >, but not both)."
```

### Which way?

Work out the cat's vx from the two positions.

### How many run?

### Zoe's cat

Zoe's blocks (load them in the playground and run them):

```makecode
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = -30
    } else {
        cat.vx = 30
    }
})
```

## Modify

```step
stage: modify
insight: "Up and down is the same question asked about y; and once you have built a chaser yourself, follow is the engine's ready-made version of the same steering."
try: { playground: arcade, starter: "lesson.ts#chase" }
tasks:
  - hint: ["Add a second if … else under the first one, inside on game update.", "Ask 'cat y < mouse y'. y counts down, so if the mouse is lower, the cat needs a positive vy."]
    check: { type: code, text: "Make the cat chase up and down too.", rules: { inside: { "game.onUpdate(": ["cat.vy="] }, count: { "}else{": 2 } } }
  - hint: ["on overlap is in Sprites › Overlaps. Choose Player and Enemy.", "game over is in Game."]
    check: { type: code, text: "When the cat catches the mouse, the game is over.", rules: { inside: { "sprites.onOverlap(": ["game.gameOver("] } } }
  - starter: lesson.ts#follow
    check:
      type: question
      q: "This cat has no if blocks at all, just one block: set cat follow mouse with speed 30. What does follow do?"
      options: ["Moves the cat to the mouse's position at once", "Steers the cat towards the mouse every frame, like your if … else blocks, in every direction", "Makes the mouse follow the cat", "Copies the mouse's speed"]
      answer: 1
      explain: "follow does the steering for you: every frame the engine turns the cat towards the mouse. It even goes diagonally. You built the same idea yourself, so now you know what the block does inside."
```

### Up and down

Your cat only chases across. Add a second **if … else** for up and down, using **y** and **vy**.

### Caught!

Make the game end when the cat touches the mouse.

### Meet the real tool

Load the **follow** version and run it. Arcade has a block (**follow**, in **Sprites**) that does your chasing in one block. Try a speed of 60.

## Mix it up

```step
stage: investigate
code: lesson.ts#review
insight: "An if inside on game update is asked every frame, so it acts as soon as its question becomes true."
check:
  type: question
  q: "This safe zone asks 'hero y < 30' inside on game update. You fly the hero up to y 20. When does the background change?"
  options: ["Straight away: the question is asked every frame", "Only when the game starts", "After one second", "Never: if only works in on start"]
  answer: 0
  explain: "on game update runs about 30 times a second, so the if notices within a frame that y is less than 30."
```

## Make

```step
stage: make
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Use on game update and one if block with an else if: one question for each end of the walk."
  - "If guard x > 140, set guard vx to -40 (walk left). Else if guard x < 20, set guard vx to 40."
  - "There is no else: in the middle of the walk, the guard keeps going the way it was going."
check: { type: code, text: "A guard that walks left and right between x 20 and x 140, turning at each end, in one if … else if.", rules: { inside: { "game.onUpdate(": ["elseif(", "guard.vx=-"] }, contains: ["guard.x"] } }
unlocks: [if-else]
```

Make a **guard** that patrols. The guard already walks right. Make it:

- turn round and walk **left** when it gets past x **140**,
- turn round and walk **right** when it gets past x **20**,

for ever. Use one **if** with an **else if** (the **+** on the if block adds more parts; the **−** takes one away).

## Change a sheepdog

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#sheepdog" }
```

Here the sheep runs **away** from the dog (you move the dog). Make the sheep run away up and down as well, and make it a bit slower than the dog so you can herd it.

```teacher
summary: Students build an enemy that chases the player with if … else by comparing positions, then meet the follow block that does the same steering for them.
time: 50
timing: "Predict and Run 8 min · Investigate 12 min · Modify 15 min · Make 10 min · Sheepdog 5 min"
goals:
  - I can use if … else so exactly one of two things happens.
  - I can compare two sprites' positions to decide which way one should move.
  - I can use else if to choose between more than two options.
  - I can explain what the follow block does, because I have built it myself.
before: |
  **if … else** has two parts and **exactly one** runs: the first when the question is true, the **else** part when it is false. **else if** adds another question, asked only when the ones above were false.

  The chaser asks *is cat x < mouse x?* If yes, the mouse is to the **right** of the cat, so the cat's **vx** (speed across) must be **positive**. Otherwise it is negative (go left). Up and down works the same with **y** and **vy**; y counts down, so a mouse lower on the screen has a bigger y and the cat needs a positive vy.

  The planted misconception (Zoe's cat) is a swapped sign: the cat runs away. It is easy to make, because "less than" and "go right" do not sound alike. Read it aloud: "if the mouse is to my right, go right."

  After students have built the chaser, they meet **follow** (Sprites), which does the steering in one block. This is "build it yourself, then meet the real tool": they now know what the block does inside. The Make (a patrolling guard) uses **else if** with no else, so the guard keeps walking in the middle.
running:
  - "Predict: most say the cat walks right. Ask what happens when it reaches the mouse (it wobbles: at equal x, else runs)."
  - "Run: let students run around. The cat only follows left and right: it ignores up and down. That is the first Modify."
  - "Investigate: the trace has one trap (80 and 80: not less than, so else). Zoe's cat: load it, run it, then fix it by swapping the two speeds."
  - "Modify: up and down is a copy of the first if … else with y and vy. Then the overlap ends the game. Then follow: one block replaces both ifs, and it moves diagonally."
  - "Make: the guard changes direction only at the ends. Without else, in the middle nothing changes, so it keeps walking."
  - "Sheepdog: the sheep runs away on purpose (signs swapped). Adding y is a copy of the x part."
stuck:
  - see: "The enemy runs away from the player."
    ask: "If the player is to the enemy's right, should vx be positive or negative?"
    fix: "Positive. Swap the two speeds in the if … else."
  - see: "The guard stops or shakes at one end."
    ask: "What does each part set vx to, and which way is the guard going when it gets there?"
    fix: "Past 140 it must walk left (negative vx); past 20, right (positive vx). Check both questions use the right edge."
  - see: "The cat only chases across, never up or down."
    ask: "Which blocks set the cat's vy?"
    fix: "None yet. Add a second if … else that compares cat y with mouse y and sets vy."
stretch: "Make two guards that patrol at different speeds and heights, and make the game end if either touches the player. Or make a cat that only chases when the mouse is close (an if around the chase)."
support: "Give students the first if … else ready-made and ask them to copy it for y. For the guard, give the if and else if with empty questions."
leads: "Next unit: projectiles and lists, so the player can fight back. Class ideas: a chase game with a cat that speeds up over time; a 'follow the leader' line of ducks using follow; discuss how ghosts in Pac-Man each chase differently."
exit:
  q: "An enemy is at x 100 and the player is at x 30. Should the enemy's vx be positive or negative to chase? Why?"
  a: "Negative. The player has a smaller x, so it is to the left, and a negative vx moves the enemy left."
explain: |
  To chase, the enemy compares its position with the player's, every frame:

  1. **if** enemy x **<** player x, the player is to the **right**: set vx to a **positive** number.
  2. **else**, set vx to a **negative** number (go left).
  3. Do the same with **y** and **vy** for up and down.

  **if … else** always runs **exactly one** part. The **follow** block does all of this steering for you.
solutions:
  step-4#t1: lesson.ts#sol-y
  step-4#t2: lesson.ts#sol-caught
  step-6: lesson.ts#sol-make
struggle: "Choosing the sign of vx from two positions. Ask them to say in words which side the player is on before choosing positive or negative."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what the cat does. Hold up 1, 2, 3 or 4 fingers.
      notes: "Ask: which way is the mouse from the cat? Which way is vx set?"
    - at: investigate
      title: Hot and cold
      minutes: 4
      do: |
        One student is the cat with eyes closed. The class calls "left" or "right" every second, depending on which side the mouse is.
      notes: "Exactly one word each time: that is if … else."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your patrolling guard to the next pair. Does it turn at both ends?
```

```code lesson.ts#predict
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 60)
controller.moveSprite(mouse)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 60)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
})
```

```code lesson.ts#chase
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
})
```

```code lesson.ts#sign
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 60)
controller.moveSprite(mouse)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 60)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = -30
    } else {
        cat.vx = 30
    }
})
```

```code lesson.ts#sol-y
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
    if (cat.y < mouse.y) {
        cat.vy = 30
    } else {
        cat.vy = -30
    }
})
```

```code lesson.ts#sol-caught
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
game.onUpdate(function () {
    if (cat.x < mouse.x) {
        cat.vx = 30
    } else {
        cat.vx = -30
    }
    if (cat.y < mouse.y) {
        cat.vy = 30
    } else {
        cat.vy = -30
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    game.gameOver(false)
})
```

```code lesson.ts#review
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
controller.moveSprite(hero)
game.onUpdate(function () {
    if (hero.y < 30) {
        scene.setBackgroundColor(7)
    }
})
```

```code lesson.ts#make
scene.setBackgroundColor(13)
let guard = sprites.create(img`
    . 8 8 .
    8 8 8 8
    . 1 1 .
    . 8 8 .
    `, SpriteKind.Enemy)
guard.setPosition(80, 60)
guard.vx = 40
```

```code lesson.ts#sol-make
scene.setBackgroundColor(13)
let guard = sprites.create(img`
    . 8 8 .
    8 8 8 8
    . 1 1 .
    . 8 8 .
    `, SpriteKind.Enemy)
guard.setPosition(80, 60)
guard.vx = 40
game.onUpdate(function () {
    if (guard.x > 140) {
        guard.vx = -40
    } else if (guard.x < 20) {
        guard.vx = 40
    }
})
```

```code lesson.ts#follow
scene.setBackgroundColor(7)
let mouse = sprites.create(img`
    . . . . d d
    . d d d d f
    d d d d d d
    . d . d . .
    `, SpriteKind.Player)
mouse.setPosition(140, 100)
controller.moveSprite(mouse)
mouse.setStayInScreen(true)
let cat = sprites.create(img`
    f . . f .
    f f f f .
    f 5 f 5 f
    f f f f f
    . f . f .
    `, SpriteKind.Enemy)
cat.setPosition(20, 20)
cat.follow(mouse, 30)
```

```code lesson.ts#sheepdog
scene.setBackgroundColor(7)
let dog = sprites.create(img`
    f f . . . .
    f 1 f f f f
    . f f f f .
    . f . . f .
    `, SpriteKind.Player)
dog.setPosition(80, 100)
controller.moveSprite(dog)
let sheep = sprites.create(img`
    . 1 1 1 1 .
    1 1 1 1 1 f
    1 1 1 1 1 f
    . f . . f .
    `, SpriteKind.Food)
sheep.setPosition(80, 60)
game.onUpdate(function () {
    if (sheep.x < dog.x) {
        sheep.vx = -20
    } else {
        sheep.vx = 20
    }
})
```
