---
order: 6
unit: decide
title: Else and chasing
summary: Compare two positions to steer an enemy towards the player with if … else, then meet the follow block that does it for you.
language: makecode
explainPicture: chase.ts#predict
hook: "The ghosts in Pac-Man, the zombies in Plants vs. Zombies, a guard walking up and down in a stealth game: each one asks 'where is the player?' and turns that way."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@chase.ts#predict", lesson: "code/arcade/arcade-chase", target: "arcade" }
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
code: chase.ts#predict
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
code: chase.ts#predict
try: { playground: arcade, starter: "chase.ts#predict" }
check: { type: reflect, text: "I ran away from the cat with the arrow keys and compared what it did with my prediction." }
```

Now move the mouse with the arrow keys. Go left, right, up and down. What does the cat follow, and what does it ignore?

## Investigate

```step
stage: investigate
code: chase.ts#predict
insight: "Comparing two positions tells a sprite which way to go: if my x is less than yours, you are to my right. if … else picks exactly one direction every frame, and the sign of vx decides which way that is."
try: { playground: arcade, starter: "chase.ts#chase" }
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
  - starter: chase.ts#sign
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
try: { playground: arcade, starter: "chase.ts#chase" }
tasks:
  - hint: ["Add a second if … else under the first one, inside on game update.", "Ask 'cat y < mouse y'. y counts down, so if the mouse is lower, the cat needs a positive vy."]
    check: { type: code, text: "Make the cat chase up and down too.", rules: { inside: { "game.onUpdate(": ["cat.vy="] }, count: { "}else{": 2 } } }
  - hint: ["on overlap is in Sprites › Overlaps. Choose Player and Enemy.", "game over is in Game."]
    check: { type: code, text: "When the cat catches the mouse, the game is over.", rules: { inside: { "sprites.onOverlap(": ["game.gameOver("] } } }
  - starter: chase.ts#follow
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

## Make

```step
stage: make
try: { playground: arcade, starter: "chase.ts#make" }
hint:
  - "Use on game update and one if block with an else if: one question for each end of the walk."
  - "If guard x > 140, set guard vx to -40 (walk left). Else if guard x < 20, set guard vx to 40."
  - "There is no else: in the middle of the walk, the guard keeps going the way it was going."
check: { type: code, text: "A guard that walks left and right between x 20 and x 140, turning at each end, in one if … else if.", rules: { inside: { "game.onUpdate(": ["elseif(", "guard.vx=-"] }, contains: ["guard.x"] } }
```

Make a **guard** that patrols. The guard already walks right. Make it:

- turn round and walk **left** when it gets past x **140**,
- turn round and walk **right** when it gets past x **20**,

for ever. Use one **if** with an **else if** (the **+** on the if block adds more parts; the **−** takes one away).

## Change a sheepdog

```step
stage: modify
try: { playground: arcade, starter: "chase.ts#sheepdog" }
```

Here the sheep runs **away** from the dog (you move the dog). Make the sheep run away up and down as well, and make it a bit slower than the dog so you can herd it.
