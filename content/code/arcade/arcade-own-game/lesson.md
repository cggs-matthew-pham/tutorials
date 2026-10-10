---
order: 14
unit: challenge
optional: true
title: Your own game
summary: Turn your pitch card into a real game. Get the core loop working, add a way to win and lose, then polish it with one idea from the course.
language: makecode
explainPicture: own.ts#prototype
hook: "Every game studio works this way: a one-page pitch, a rough prototype, then playtest, fix, and add one thing at a time until it is fun."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@own.ts#prototype", lesson: "code/arcade/arcade-own-game", target: "arcade" }
  caption: "Build a game in milestones"
  say: "Build your game in milestones, and play it after each one."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "1. Core loop: a player, a prize, a danger, a score."
        say: "First the core loop: a player, something to collect, a danger, a score."
    - caption:
        text: "2. Win and lose. 3. One polish."
        say: "Then a way to win and lose. Then one piece of polish."
    - click: "Run"
    - wait: 600
    - caption:
        text: "Then watch someone else play, and change one thing."
        say: "Then watch someone else play it, and change one thing."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
In **Will it work in Arcade?** you wrote a **pitch card** (the genre, the building blocks, the hard part and a workaround) and built a one-screen prototype. Now you make it a real game, in three milestones. This time there is no code to start from: only goals. Keep your pitch card beside you.

Big games are built in small, playable steps. After each milestone, **play your game** and ask someone else to play it too.

## Predict

```step
stage: predict
code: own.ts#prototype
check:
  type: predict
  q: "This is Kai's prototype for a bee game. You collect 10 flowers. What happens?"
  options: ["You win", "Nothing: the score keeps going up and the game never ends", "A harder level starts", "You lose a life"]
  actual: "Nothing. The game has a player, a goal and a score, but no danger and no way to win or lose, so it never ends."
```

Kai's pitch card: *a bee collects flowers before winter comes; the hard part is a wasp that chases the bee*.

## Run

```step
stage: run
code: own.ts#prototype
try: { playground: arcade, starter: "own.ts#prototype" }
check:
  type: question
  q: "Which part of Kai's pitch card is still missing from the prototype?"
  options: ["The bee", "The flowers", "The danger (a chasing wasp) and an ending (winter)", "The score"]
  answer: 2
  explain: "A prototype only tests the core idea. Kai's next milestones are a danger and a way to win and lose: the same milestones you will build."
```

Play Kai's prototype. A prototype is meant to be rough: it only tests whether the core idea is fun.

## Build your game

```step
stage: make
insight: "Building a game from a plan, in playable milestones, shows whether a student can choose the building blocks a game needs and put them together without step-by-step help."
try: { playground: arcade, starter: "own.ts#start" }
tasks:
  - hint:
      - "Look at the building blocks on your pitch card. Which kind is the player, which is the goal (Food?) and which is the danger (Enemy?)."
      - "Each touch that matters needs an overlap event naming two kinds. Score and lives are in Info."
    check: { type: code, text: "The core loop works: a player you control, something to collect or reach, a danger, and a score.", rules: { contains: ["sprites.create(", "sprites.onOverlap(", "info."] } }
  - hint:
      - "Choose how the game ends: lives that run out, a countdown, or a target score that calls game over (win)."
      - "game over has a true or false: true is a win, false is a loss."
    check: { type: reflect, text: "My game can be won and lost, and I have tested both endings." }
  - hint:
      - "Pick the one polish that fits your pitch card best, and only one. Look back at the lesson that taught it."
      - "Play it after each change. If the game is less fun, undo the change."
    check: { type: reflect, text: "I added one polish, and someone else played my game and told me one thing to improve." }
```

Build your prototype again here (you planned it, so it is quick), or copy it across: in your **Will it work in Arcade?** playground switch to **JavaScript**, copy everything, then paste it into **JavaScript** here.

### Milestone 1: the core loop

The smallest version of your game that someone could play:

- a **player** the controller moves (or makes jump),
- something to **collect** or **reach**,
- a **danger** to avoid,
- a **score**.

Play it for one minute. Is the core idea fun? If not, change it now, before you add more.

### Milestone 2: win and lose

Give your game an ending. Choose what fits your pitch card:

- **lives** that run out (the game ends at zero by itself),
- a **countdown** (the game ends when time is up),
- a **target**: reach a score, or a place, and call **game over** with a win.

Test both endings: win once and lose once.

### Milestone 3: one polish

Choose **one** idea from the course:

- **levels** that get harder (a level variable and a list),
- a **power-up** (a true/false variable and a timer),
- a **chaser** that follows the player,
- **gravity** and jumping.

Then ask someone to play your game. Watch without helping, and write down where they got stuck.

## Arcade's real tools

```step
stage: info
check: { type: reflect, text: "I chose one of Arcade's real tools I would like to explore, and what my game would use it for." }
```

You have built a whole game from the course's building blocks. Real Arcade games use a few more tools that are worth exploring next, with your teacher:

- **Tilemaps** (in Scene): draw a level from tiles, with walls the player cannot pass and floors to stand on. The camera can follow the player through a world much bigger than the screen. Platformers, mazes and adventures use them.
- **Animation**: a sprite can flip through several pictures, so a character walks or a coin spins.
- **Extensions** (in the toolbox, the Extensions button): extra blocks other people have written, for example for menus, dialogue or saving a game.

Which one would make your game better, and how?
