---
order: 3
unit: collide-score
title: Overlaps and kinds
summary: Make something happen when two sprites touch, and use kinds to decide which event runs.
language: makecode
introduces: [random]
explainPicture: overlaps.ts#kinds
hook: "Pac-Man eats a dot, Mario grabs a coin, a ghost catches you: every game is full of things touching, and each touch means something different."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@overlaps.ts#kinds", lesson: "code/arcade/arcade-overlaps", target: "arcade" }
  caption: "When two sprites touch, they overlap"
  say: "When two sprites touch, they overlap."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "on overlap names two kinds, such as Player and Food."
        say: "An on overlap event names two kinds, like Player and Food."
    - caption:
        text: "sprite is the first one, otherSprite the second."
        say: "Inside it, sprite is the first one, and other sprite the second."
    - click: "Run"
    - wait: 600
    - caption:
        text: "The kind you choose decides which overlap runs."
        say: "The kind you choose for a sprite decides which overlap events it runs."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson sprites moved, but flew straight through each other. Now they notice. When two sprites touch, they **overlap**, and an **on overlap** event can run.

Every sprite has a **kind**: Player, Food, Enemy or Projectile. Until now every sprite said **of kind Player**. This lesson the kind matters: it is how the game tells a coin from a monster.

Click the simulator, then steer with the arrow keys.

## Predict

```step
stage: predict
code: overlaps.ts#predict
check:
  type: predict
  q: "You steer the player onto the coin. What happens?"
  options: ["The coin vanishes and the score goes up by 1", "The player stops at the coin, like a wall", "Nothing: they pass through each other", "The player vanishes"]
  actual: "The coin vanishes and a score of 1 appears at the top of the screen. The player is of kind Player and the coin of kind Food, so the Player–Food overlap event runs."
```

The coin is made **of kind Food**. Look at the two kinds named in the **on overlap** block.

## Run

```step
stage: run
code: overlaps.ts#predict
try: { playground: arcade, starter: "overlaps.ts#predict" }
check: { type: reflect, text: "I steered onto the coin and compared what happened with my prediction." }
```

Steer onto the coin. Watch the top of the screen.

## Investigate

```step
stage: investigate
code: overlaps.ts#kinds
insight: "An overlap event runs when a sprite of the first kind touches a sprite of the second kind. The kinds decide which event runs: sprite is the first one, otherSprite the second."
try: { playground: arcade, starter: "overlaps.ts#kinds" }
tasks:
  - check:
      type: match
      q: "Match what touches with what happens in this game."
      pairs:
        - ["the player touches the coin (Food)", "the score goes up 1 and the coin jumps to a random place"]
        - ["the player touches the spike (Enemy)", "the score goes down 1 and the spike is destroyed"]
        - ["the coin and the spike touch", "nothing: no event names Food and Enemy"]
  - check:
      type: question
      q: "In the Player–Food event, which sprite is otherSprite?"
      options: ["The player", "The coin it touched", "Every Food sprite in the game", "The spike"]
      answer: 1
      explain: "The event hands over both sprites: sprite is the one of the first kind (Player), otherSprite the one of the second kind (Food). So setting otherSprite's position moves the coin that was touched."
  - check:
      type: question
      q: "Ava added a star to her game and steers onto it. Nothing happens: no score, the star stays. Why?"
      options: ["Stars cannot be destroyed", "The star was made of kind Player, so no Player–Food event runs", "The overlap event needs to be inside on start", "The score only counts coins"]
      answer: 1
      fault: logic
      misconception: kind-mismatch
      explain: "The create block starts with of kind Player, and Ava did not change it. Her overlap event is for Player touching Food, so a Player touching a Player runs nothing. Choose Food in the star's kind dropdown."
```

Collect the coin a few times, then touch the spike.

### Who touches whom?

Match each touch with what happens.

### Which sprite?

The event gives you two sprites. Work out which is which.

### Ava's star

Ava's overlap event is the same as this game's. She made her star like this:

```makecode
let star = sprites.create(img`
    . 5 .
    5 5 5
    . 5 .
    `, SpriteKind.Player)
```

## Modify

```step
stage: modify
insight: "The blocks inside an overlap event decide what a touch means. randint picks a new random number each time it runs."
try: { playground: arcade, starter: "overlaps.ts#modify" }
tasks:
  - hint: ["Take destroy out of the overlap event.", "Put set otherSprite position in its place. From Math, drag pick random 0 to 10 into x and into y.", "x between 10 and 150, y between 10 and 110 keeps the coin on the screen."]
    check: { type: code, text: "Instead of vanishing, the coin jumps to a random place when collected.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["otherSprite.setPosition(randint("] } } }
  - hint: "Change the 1 in change score by 1."
    check: { type: code, text: "Make each coin worth 5 points.", rules: { inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeScoreBy(5)"] } } }
```

### A coin that comes back

At the moment the game ends after one coin. Make the coin jump to a **random** spot each time it is collected.

### Worth more

Make each coin worth **5** points.

## Make

```step
stage: make
try: { playground: arcade, starter: "overlaps.ts#make" }
hint:
  - "Two new sprites: one of kind Food, one of kind Enemy. Click the kind in each create block."
  - "Two on overlap blocks (Sprites › Overlaps): Player with Food, and Player with Enemy."
  - "Food: change score by 1, then set otherSprite position to pick random numbers. Enemy: change score by -1, then destroy otherSprite."
check: { type: code, text: "A collector: touching Food scores 1 and moves it to a random place; touching an Enemy takes 1 away.", rules: { contains: ["SpriteKind.Food)", "SpriteKind.Enemy)"], inside: { "sprites.onOverlap(SpriteKind.Player,SpriteKind.Food": ["info.changeScoreBy(1)", "randint("], "sprites.onOverlap(SpriteKind.Player,SpriteKind.Enemy": ["info.changeScoreBy(-1)"] } } }
```

Make a **collector** game:

- **good food** (an apple, a gem): touching it scores **1**, and it jumps to a **random** place
- a **bad item** of kind **Enemy** (a worm, a bomb): touching it takes **1** away, and it is destroyed

Check every create block: is its kind right?

## Change a fruit stall game

```step
stage: modify
try: { playground: arcade, starter: "overlaps.ts#stall" }
```

Bananas fall into a basket at a market stall. Make them fall faster, then add a rotten tomato of kind **Enemy** that falls too and takes 2 points when caught.
