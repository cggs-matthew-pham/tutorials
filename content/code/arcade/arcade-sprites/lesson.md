---
order: 1
unit: show-move
title: Sprites on the screen
summary: Put pictures called sprites on the game screen, and place each one with x and y.
language: makecode
explainPicture: sprites.ts#corners
hook: "Every 2D game you have played, from Pac-Man to Mario, is pictures placed on a grid of tiny squares, then moved."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@sprites.ts#corners", lesson: "code/arcade/arcade-sprites", target: "arcade" }
  caption: "The screen is 160 across and 120 down"
  say: "The screen is 160 pixels across, and 120 down."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption: "x counts across from the left edge."
    - caption:
        text: "y counts down from the top edge."
        say: "y counts down from the top edge, so a bigger y is lower."
    - click: "Run"
    - wait: 600
    - caption:
        text: "(0, 0) is the top left. (80, 60) is the middle."
        say: "Zero zero is the top left corner. 80, 60 is the middle."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
In Arcade, every character, coin and cloud is a **sprite**: a small picture the game can place, move and test. You program with **blocks**, and the **simulator** (the little game console beside the blocks) runs your game straight away.

The screen is **160** squares (pixels) across and **120** down. A sprite's place is two numbers: **x** (across) and **y** (down).

## Predict

```step
stage: predict
code: sprites.ts#predict
check:
  type: predict
  q: "The duck is set to x 20, y 100. Where on the screen does it appear?"
  options: ["Near the bottom left", "Near the top left", "Near the bottom right", "In the middle"]
  actual: "Near the bottom left. x 20 is near the left edge. y counts down from the top, so y 100 is near the bottom (the screen is 120 tall)."
```

These blocks sit in **on start**. Lock in where you think the duck will be.

## Run

```step
stage: run
code: sprites.ts#predict
try: { playground: arcade, starter: "sprites.ts#predict" }
check: { type: reflect, text: "I found the duck in the simulator and compared it with my prediction." }
```

Find the duck. Was it where you predicted?

## Investigate

```step
stage: investigate
code: sprites.ts#corners
insight: "x counts across from the left edge (0 to 160) and y counts down from the top edge (0 to 120), so (0, 0) is the top left corner and a bigger y is lower on the screen."
try: { playground: arcade, starter: "sprites.ts#corners" }
tasks:
  - check:
      type: match
      q: "Match each position with where a sprite there appears."
      pairs:
        - ["(0, 0)", "the top left corner"]
        - ["(80, 60)", "the middle of the screen"]
        - ["(160, 120)", "the bottom right corner"]
        - ["(80, 110)", "near the bottom, halfway across"]
        - ["(150, 10)", "near the top right corner"]
  - check:
      type: number
      q: "A sprite is at (80, 60). You change its y to 90. How many pixels does it move down?"
      answer: 30
      explain: "y counts down, so 90 is 30 more than 60: the sprite moves 30 pixels down the screen."
  - check:
      type: question
      q: "Mia wants her sun high in the sky. She sets its position to (140, 110), because 'a bigger y is higher'. Where does her sun appear?"
      options: ["High in the top right", "Low, near the bottom right", "Off the screen", "In the middle"]
      answer: 1
      fault: logic
      misconception: screen-y-up
      explain: "On a game screen y counts down from the top, so 110 is near the bottom. For a sun high in the sky, Mia needs a small y, such as 15."
```

This scene has a sun, a cloud and the duck. Change the numbers in the playground to test your answers.

### Where is it?

Match each position with its place on the screen.

### Down by how much?

Work out a move from the numbers.

### Mia's sun

Mia changed one block:

```makecode
sun.setPosition(140, 110)
```

## Modify

```step
stage: modify
insight: "Changing x moves a sprite across; changing y moves it up or down. Each new sprite needs its own create and set position blocks."
try: { playground: arcade, starter: "sprites.ts#modify" }
tasks:
  - hint: ["Click the colour in set background color to choose another.", "The other top corner is near x 20, y 15."]
    check: { type: reflect, text: "I changed the background colour and moved the sun to the other top corner." }
  - hint: ["Drag in another set mySprite to sprite of kind Player block from Sprites, then click its picture to draw.", "Then drag in set mySprite position from Sprites, and choose your new sprite's name in its dropdown."]
    check: { type: code, text: "Add a third sprite of your own and place it near the bottom of the screen.", rules: { count: { "sprites.create(": 3, ".setPosition(": 3 } } }
```

### Change the sky

Pick a new sky colour, and move the sun to the other top corner.

### Add your own sprite

Draw a third sprite (a flower, a rock, a bug) and place it near the bottom. Give it its own name: click the variable's name in its block and choose **New variable**.

## Make

```step
stage: make
try: { playground: arcade, starter: "sprites.ts#make" }
hint:
  - "Each sprite needs two blocks: set … to sprite of kind Player, then set … position."
  - "Near the top means a small y (about 10 to 25). Near the bottom means a big y (about 100 to 115)."
check: { type: code, text: "A scene with at least four sprites, each placed with set position.", rules: { count: { "sprites.create(": 4, ".setPosition(": 4 } } }
```

Make a **scene at the pond** (or anywhere you like):

- something in the **sky**, near the top
- something on the **ground**, near the bottom
- something in the **middle**
- something tucked into a **corner**

## Change a start screen

```step
stage: modify
try: { playground: arcade, starter: "sprites.ts#title" }
```

This game's start screen is upside down: the title sits at the bottom and the characters float at the top. Move the title near the top, and stand the hero and the monster near the bottom, facing each other.
