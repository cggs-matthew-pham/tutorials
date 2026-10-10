---
order: 10
unit: worlds
title: Levels
summary: Keep the player's level in a variable, keep what changes per level in a list, and start each level with one function.
language: makecode
explainPicture: levels.ts#predict
hook: "Almost every game gets harder as you play: faster ghosts, more aliens, a new world. Behind it is one number, the level, and a list of what each level is like."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@levels.ts#predict", lesson: "code/arcade/arcade-levels", target: "arcade" }
  caption: "A variable level remembers where the player is"
  say: "A variable called level remembers where the player is, starting at zero."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "speeds[level] is the speed for this level."
        say: "A list holds what changes, so speeds at level is this level's speed."
    - caption:
        text: "startLevel clears enemies and sets up the next level."
        say: "start level clears the old enemies and sets up the new one."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Level up where the score changes."
        say: "Level up where the score changes, not in on game update."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
A game with levels needs three things you already know:

1. a **variable**, `level`, that remembers where the player is,
2. a **list** (in **Arrays**) that holds what changes from level to level, such as `speeds`: 40, 70, 100. Places in a list are counted from **0**, so level 0 is the first level,
3. a **function**, `startLevel`, that sets a level up: it clears away the old enemies (**destroy all sprites of kind**, in Sprites), shows the level with a **splash**, and makes a new enemy at the speed `speeds[level]`.

The splash uses **join** (in **Text**) to stick the word *Level* and a number together. Players count from 1, so it shows `level + 1`.

## Predict

```step
stage: predict
code: levels.ts#predict
check:
  type: predict
  q: "You collect 5 coins. What happens?"
  options: ["A splash says Level 2, and a faster enemy appears in place of the old one", "A splash says Level 1 again", "A second enemy joins the first one", "The game ends with a win"]
  actual: "A splash says Level 2 and a faster enemy replaces the old one. At 5 points level becomes 1, startLevel destroys the old enemy, shows level + 1, and makes a new enemy at speeds[1], which is 70."
```

Read **startLevel** first, then the Player–Food overlap.

## Run

```step
stage: run
code: levels.ts#predict
try: { playground: arcade, starter: "levels.ts#predict" }
check: { type: reflect, text: "I reached level 2 (or further) and compared with my prediction." }
```

Collect coins and dodge the purple enemy. Press **A** (space on the keyboard) to close each splash. Can you win?

## Investigate

```step
stage: investigate
code: levels.ts#predict
insight: "One variable remembers the level; a list holds what changes per level, looked up with the level as the place (counted from 0); startLevel clears the old level and sets up the new one. A level-up belongs where the score changes, because an if in on game update fires every frame while it stays true."
try: { playground: arcade, starter: "levels.ts#predict" }
tasks:
  - check:
      type: trace
      text: "speeds is 40, 70, 100. Fill in what startLevel does at each level."
      table: |
        | level | splash shows Level … | enemy speed |
        | 0 | 1 | [40] |
        | 1 | [2] | [70] |
        | 2 | [3] | [100] |
      explain: "The level is the place in the list, counted from 0, so level 0 uses 40. The splash adds 1, because players count levels from 1."
  - check:
      type: match
      q: "Match each block in this game with its job."
      pairs:
        - ["destroy all sprites of kind Enemy", "clears away the old level's enemy"]
        - ["speeds[level]", "the speed for this level, looked up in the list"]
        - ["change level by 1", "moves the player on to the next level"]
        - ["change goal by 5", "moves the target score up, so the next level-up needs 5 more points"]
        - ["if level = 3 then game over (win)", "ends the game after the last level"]
  - check:
      type: question
      q: "Zoe moved the level-up into on game update (below). The moment she reaches 5 points, the splashes never stop: Level 2, Level 3, Level 4, Level 5 … even though she collects no more coins. Why?"
      options: ["The list is too short", "on game update runs every frame, and the score stays 5 or more, so the if is true every frame and levels up every time", "startLevel adds points", "score ≥ 5 should be score > 5"]
      answer: 1
      fault: logic
      misconception: update-fires-every-frame
      explain: "An if in on game update is asked every frame. Once the score is 5, the question stays true, so the level goes up again and again. Level up where the score changes (in the overlap), or check a target that moves up (goal), so the question becomes false again."
```

### What startLevel does

Work out each level from the list.

### Which block does what?

Match each block with its job.

### Zoe's levels

Zoe's level-up:

```makecode
game.onUpdate(function () {
    if (info.score() >= 5) {
        level += 1
        startLevel()
    }
})
```

## Modify

```step
stage: modify
insight: "Anything that changes per level can go in a list and be set in startLevel, and anything in startLevel happens at the start of every level."
try: { playground: arcade, starter: "levels.ts#predict" }
tasks:
  - hint: ["Make a new list, colours, with three numbers, in on start. Arrays has the list block.", "In startLevel: set background color to (get value at level from colours)."]
    check: { type: code, text: "Each level has its own background colour, set in startLevel from a list.", rules: { inside: { "function startLevel (": ["scene.setBackgroundColor("] }, count: { "[level]": 3 } } }
  - hint: "change life by 1 (Info) goes inside startLevel."
    check: { type: code, text: "A bonus life at the start of every level, with one block in startLevel.", rules: { inside: { "function startLevel (": ["info.changeLifeBy("] } } }
```

### A colour per level

Give each level its own **background colour**, from a new list. Set it in **startLevel**.

### Bonus life

Give the player a **bonus life** at the start of every level. One block, in the right place.

## Make

```step
stage: make
try: { playground: arcade, starter: "levels.ts#make" }
hint:
  - "In on start: a list of three rock speeds (negative, they fly left), a list of three colours, and a goal of 10. Call startLevel."
  - "startLevel: destroy all Enemy sprites, set the background from the colours list, splash the level."
  - "In the timer, set rock vx to the speed for this level. After change score: if score ≥ goal, change level by 1, change goal by 10, then if level = 3 game over (win), else startLevel."
check: { type: code, text: "Three levels, each with its own background colour and rock speed, started by startLevel, and a win after level 3.", rules: { contains: ["game.gameOver(true)", "level+=1"], inside: { "function startLevel (": ["sprites.destroyAllSpritesOfKind(", "scene.setBackgroundColor(", "game.splash("], "game.onUpdateInterval(": ["[level]"] }, count: { "[level]": 2 } } }
```

This dodger scores a point for every rock. Give it **three levels**:

- each level has its own **background colour** and **rock speed** (faster each level), from lists,
- **startLevel** clears the old rocks, sets the colour and splashes the level,
- every 10 points, the level goes up (level up where the score changes, not in on game update),
- after level 3, the player **wins** (game over, win).

## Change a fishing game

```step
stage: modify
try: { playground: arcade, starter: "levels.ts#fishing" }
```

Catch fish with the net. Every 5 fish the water gets deeper and the fish swim faster. Add a **fourth level** (both lists need a fourth item, and the win must move), then make the deepest level's fish the fastest yet.
