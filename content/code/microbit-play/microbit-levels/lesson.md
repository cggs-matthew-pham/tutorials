---
order: 9
unit: challenge
reviews: [list-place, remember-state, time-between, count-in-a-variable]
assumes: [variable, variable-update, if, else, list, list-index, length, random, bool-value, running-time]
optional: true
title: Fake-outs and levels
summary: Make the reaction game harder. Decoys you must not press, a list of target times that get tighter each level, and three lives.
language: makecode
explainPicture: levels.ts#targets
hook: "Arcade games keep you playing by getting harder as you improve, and by trying to trick you. Both are a few rules on top of the game you already built."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@levels.ts#targets", lesson: "code/microbit-play/microbit-levels", target: "microbit" }
  caption: "Levels from a list of target times"
  say: "Each level has a target time, kept in a list called targets."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "decoy is true while the cross shows, so a press then is caught."
        say: "decoy is true while the cross is showing, so a press then is caught."
    - caption:
        text: "The level is the place in the list: reaction < targets[level]."
        say: "The level is the place in the list, so each level's target is harder."
    - click: "Run"
    - wait: 600
    - caption:
        text: "When level reaches the list's length, you have won."
        say: "When the level reaches the length of the list, you have won."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
This lesson goes further than the Reaction timer, for one player. You will add three rules, one milestone each:

1. **Fake-outs:** sometimes a cross appears instead of the heart. Do **not** press!
2. **Levels:** each level has a target time to beat, kept in a **list**, and the targets get tighter.
3. **Lives:** three mistakes and it is game over.

## Predict

```step
stage: predict
code: levels.ts#decoy
check:
  type: predict
  q: "Over many rounds, how often does a cross appear instead of the heart?"
  options: ["Never", "About 1 round in 3", "About half the rounds", "Every round"]
  actual: "About 1 round in 3. pick random 0 to 2 gives 0, 1 or 2 equally often, and only 0 shows the cross."
```

## Run

```step
stage: run
code: levels.ts#decoy
try: { playground: microbit, starter: "levels.ts#decoy" }
check: { type: reflect, text: "I pressed B about ten times and counted how many crosses appeared." }
```

Press **B** about ten times. Count the crosses.

## Investigate

```step
stage: investigate
code: levels.ts#targets
insight: "A list can hold the rules of a game: one target per level, found by using the level number as the place."
tasks:
  - check:
      type: trace
      text: "targets is 800, 600, 450, 350, 300. What must you beat at each level?"
      table: |
        | level | target to beat (ms) |
        | 0 | [800] |
        | 2 | [450] |
        | 4 | [300] |
      explain: "The level number is the place in the list, counted from 0."
  - check:
      type: question
      q: "There are 5 targets. You beat level 4. What must the game do next?"
      options: ["Use place 5", "Stop: there is no place 5, so you have won (level equals the length of the list)", "Start again at place 1", "Show 300 again"]
      answer: 1
      explain: "Places run from 0 to 4. When level reaches 5, the length of the list, there are no targets left: the player has won."
```

The game keeps one target per level in a list. **A+B** shows the target for the current level.

### Targets per level

Look up the target for each level.

### After the last level

What happens when the list runs out?

## Milestone 1: fake-outs

```step
stage: modify
insight: "A second true/false variable remembers a second kind of moment, and else if tells the moments apart."
try: { playground: microbit, starter: "levels.ts#m1" }
hint:
  - "decoy is already set to true when the cross shows. In A, add else if decoy."
  - "Inside it: set decoy to false and show a skull (caught out)."
check: { type: code, text: "Pressing A while the cross shows catches you out.", rules: { contains: ["if(decoy)"] } }
```

`decoy` is true while the cross is showing. Make **A** catch you out when you press during a cross: add **else if decoy** and show a skull.

## Milestone 2: levels

```step
stage: modify
insight: "Comparing with a list item, chosen by a variable, lets the same rule get harder as the variable grows."
try: { playground: microbit, starter: "levels.ts#m2" }
hint:
  - "After working out reaction: if reaction < get value at level from targets."
  - "If so: change level by 1 and show it. Else: show a sad face."
check: { type: code, text: "Beat the target for your level to go up a level.", rules: { contains: ["targets[level]", "level+=1"] } }
```

Each good press must beat **targets[level]** to go up a level. Show the new level when you go up, and a sad face when you are too slow.

## Milestone 3: lives

```step
stage: make
insight: "Writing the end of the game from goals alone shows whether a student can manage several pieces of state at once."
try: { playground: microbit, starter: "levels.ts#m3" }
hint:
  - "A variable lives starts at 3. Change it by -1 for a press on a cross, and for a press that is too slow."
  - "At the end of A: if lives = 0, show Game over and the level, then reset level and lives. When level reaches the length of targets, show Champion."
check: { type: code, text: "Three lives, game over at zero, and a win after the last level.", rules: { contains: ["lives+=-1", "lives==0", "targets.length"] } }
```

Finish the game:

- You start with **3 lives**. Pressing on a cross or being too slow loses one.
- At **0 lives**: show Game over and your level, then start again.
- Beat the **last** target: you are the champion.

## Make it yours

```step
stage: modify
try: { playground: microbit, starter: "levels.ts#m3" }
```

Change the rules to make it your game. Ideas: more levels, a different chance of a fake-out, a shorter wait at higher levels, or a sound for each level.
