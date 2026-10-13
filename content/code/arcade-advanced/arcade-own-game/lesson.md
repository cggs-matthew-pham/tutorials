---
order: 12
unit: challenge
assumes: [variable, random, if, else, function, variable-update, list, list-index, bool-value, for-of]
optional: true
title: Your own game
summary: Turn your pitch card into a real game. Get the core loop working, add a way to win and lose, then polish it with one idea from the course.
language: makecode
explainPicture: lesson.ts#prototype
hook: "Every game studio works this way: a one-page pitch, a rough prototype, then playtest, fix, and add one thing at a time until it is fun."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#prototype", lesson: "code/arcade-advanced/arcade-own-game", target: "arcade" }
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
code: lesson.ts#prototype
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
code: lesson.ts#prototype
try: { playground: arcade, starter: "lesson.ts#prototype" }
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
try: { playground: arcade, starter: "lesson.ts#start" }
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

```teacher
summary: An optional, open project. Students turn the pitch card and prototype from Will it work in Arcade? into a game of their own, in three milestones with goals only, then look ahead to tilemaps, animation and extensions.
time: 120
timing: "Predict and Run 10 min · Milestone 1 30 min · Milestone 2 25 min · Milestone 3 and playtest 40 min · Arcade's real tools 15 min (two or more lessons)"
goals:
  - I can plan a game and choose the building blocks it needs.
  - I can build a game in playable milestones, testing after each one.
  - I can improve my game from what I see when someone else plays it.
before: |
  This lesson is **optional** and open: it is the high ceiling of the course. Students start from the **pitch card** and one-screen prototype they made in **Will it work in Arcade?** (genre, building blocks, the hard part and a workaround). There is no starter code and no new block; every milestone is a goal, not a recipe. Only Milestone 1 has a code check (sprites, an overlap event and something from Info, such as score or lives); the others are honest ticks after testing, because every game ends and polishes differently.

  **Scope is the main risk.** Students aim for a big game and finish nothing. Hold the line: Milestone 1 must be playable before anything else is added, and Milestone 3 is **one** polish, not three. A small finished game beats a big unfinished one. If a pitch card is "not a good fit" for Arcade (3D, realistic physics, typing-heavy), steer back to its workaround from Will it work in Arcade?.

  **Playtesting** is the habit to build: after each milestone someone else plays for one minute while the maker watches in silence and notes where they got stuck. Then the maker changes one thing. Budget **two to four lessons** for a full project; one lesson gets most students through Milestone 2.

  Students' work is saved in this browser only. Copying from the Will it work in Arcade? playground (switch to JavaScript, select all, copy, paste) keeps the prototype; the editor's Download saves a file as a backup.
running:
  - "Predict and Run: Kai's prototype has a goal but no danger and no ending. Use it to name the three milestones before anyone builds."
  - "Before Milestone 1: each student reads their pitch card to a partner in 30 seconds. The partner asks: what is the player, the goal, the danger?"
  - "Milestone 1: check that it is playable after 20 to 30 minutes. If a student is still drawing sprites, set a 5-minute art limit: rough art first, nice art last."
  - "Milestone 2: ask students to test both endings. Lives and countdowns end the game by themselves; a target score needs game over (true)."
  - "Milestone 3: one polish only. Point students back to the lesson that taught it (Levels, Power-ups, Else and chasing, Gravity and jumping)."
  - "Playtest: pairs swap seats. The player plays; the maker watches silently and writes down one thing. Swap back and fix it."
  - "Arcade's real tools: a teacher-led option. Tilemaps are the big one: a walled maze or a platform level with a scrolling camera is a good next project."
stuck:
  - see: "The student is still drawing sprites after 20 minutes."
    ask: "Can someone play your game yet?"
    fix: "Use simple shapes for now; make the art nice after the game works."
  - see: "Nothing happens when sprites touch."
    ask: "Which kinds are your sprites, and which kinds does each overlap event name?"
    fix: "Make the kinds match the event, as in the Overlaps lesson."
  - see: "A hit takes all the lives, or a coin scores again and again."
    ask: "What happens to the other sprite after the touch?"
    fix: "Destroy it (or move it) inside the overlap event."
  - see: "The game never ends."
    ask: "Which ending did you choose, and where does it happen?"
    fix: "Set life (and lose lives in an overlap), start a countdown, or call game over when the target is reached."
  - see: "The student wants to add everything at once."
    ask: "Which one change would make your game more fun for the player who just tested it?"
    fix: "Add that one, test it, then decide on the next."
stretch: "Start a second, bigger project with tilemaps: a maze with walls, or a platformer whose camera follows the player across a level wider than the screen."
support: "A working Milestone 1 is a good result. Offer Space dodger (end of Arcade Foundations) or the Power-ups game as a base: change the sprites, the kinds and one rule to make it a new game."
leads: "This ends Arcade advanced skills. The Game Maker Guide skillmap (arcade.makecode.com/skillmaps) is the next step for students building their own games. Class ideas: an arcade afternoon where everyone plays everyone's games and leaves one sticky note of praise and one of advice; a short design diary (pitch, what changed after playtesting, what you would add next). Students who want more can explore tilemaps and animation, or move to games in text code later."
exit:
  q: "What did you change after someone else played your game, and why?"
  a: "Any change tied to what the player did, for example: they kept losing straight away, so I slowed the enemies down."
explain: |
  Build a game in **milestones**, and play it after each one:

  1. **Core loop**: a player, something to collect, a danger, a score.
  2. **Win and lose**: lives, a countdown, or a target that calls game over.
  3. **One polish**: levels, a power-up, a chaser or gravity.

  Then ask someone else to play it, watch, and change one thing.
solutions:
  step-3#t1: lesson.ts#sol-m1
  step-3#t2: lesson.ts#sol-m2
  step-3#t3: lesson.ts#sol-m3
struggle: "Scoping their own game and playtesting early. Ask whether someone can play it yet, before more sprites are drawn."
```

```code lesson.ts#prototype
let flower: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
scene.setBackgroundColor(7)
let bee = sprites.create(img`
    . . 1 1 . .
    . . 1 1 . .
    5 f 5 f 5 .
    5 f 5 f 5 f
    . 5 f 5 . .
    `, SpriteKind.Player)
controller.moveSprite(bee)
bee.setStayInScreen(true)
game.onUpdateInterval(1500, function () {
    flower = sprites.create(img`
        . 3 . 3 .
        3 3 5 3 3
        . 3 3 3 .
        . . 7 . .
        `, SpriteKind.Food)
    flower.setPosition(randint(10, 150), randint(10, 110))
})
```

```code lesson.ts#start
scene.setBackgroundColor(9)
```

```code lesson.ts#sol-m1
let fish: Sprite = null
let seal: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(-3)
})
scene.setBackgroundColor(9)
let penguin = sprites.create(img`
    . f f .
    f 1 1 f
    f 1 1 f
    . 4 4 .
    `, SpriteKind.Player)
controller.moveSprite(penguin)
penguin.setStayInScreen(true)
game.onUpdateInterval(1000, function () {
    fish = sprites.create(img`
        . 4 4 . 4
        4 4 4 4 .
        . 4 4 . 4
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
})
game.onUpdateInterval(3000, function () {
    seal = sprites.create(img`
        . c c c .
        c f c c c
        c c c c c
        `, SpriteKind.Enemy)
    seal.setPosition(160, randint(10, 110))
    seal.vx = -40
    seal.setFlag(SpriteFlag.AutoDestroy, true)
})
```

```code lesson.ts#sol-m2
let fish: Sprite = null
let seal: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 20) {
        game.gameOver(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
scene.setBackgroundColor(9)
let penguin = sprites.create(img`
    . f f .
    f 1 1 f
    f 1 1 f
    . 4 4 .
    `, SpriteKind.Player)
controller.moveSprite(penguin)
penguin.setStayInScreen(true)
info.setLife(3)
info.startCountdown(60)
game.onUpdateInterval(1000, function () {
    fish = sprites.create(img`
        . 4 4 . 4
        4 4 4 4 .
        . 4 4 . 4
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
})
game.onUpdateInterval(3000, function () {
    seal = sprites.create(img`
        . c c c .
        c f c c c
        c c c c c
        `, SpriteKind.Enemy)
    seal.setPosition(160, randint(10, 110))
    seal.vx = -40
    seal.setFlag(SpriteFlag.AutoDestroy, true)
})
```

```code lesson.ts#sol-m3
let fish: Sprite = null
let seal: Sprite = null
sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeScoreBy(1)
    if (info.score() == 20) {
        game.gameOver(true)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    otherSprite.destroy()
    info.changeLifeBy(-1)
})
scene.setBackgroundColor(9)
let penguin = sprites.create(img`
    . f f .
    f 1 1 f
    f 1 1 f
    . 4 4 .
    `, SpriteKind.Player)
controller.moveSprite(penguin)
penguin.setStayInScreen(true)
info.setLife(3)
info.startCountdown(60)
let orca = sprites.create(img`
    f f f f . f
    f 1 f f f f
    f f f f . f
    `, SpriteKind.Enemy)
orca.setPosition(150, 110)
orca.follow(penguin, 25)
game.onUpdateInterval(1000, function () {
    fish = sprites.create(img`
        . 4 4 . 4
        4 4 4 4 .
        . 4 4 . 4
        `, SpriteKind.Food)
    fish.setPosition(randint(10, 150), randint(10, 110))
})
game.onUpdateInterval(3000, function () {
    seal = sprites.create(img`
        . c c c .
        c f c c c
        c c c c c
        `, SpriteKind.Enemy)
    seal.setPosition(160, randint(10, 110))
    seal.vx = -40
    seal.setFlag(SpriteFlag.AutoDestroy, true)
})
```
