---
order: 1
unit: show-move
reviews: []
moveId: place-a-sprite
title: Sprites on the screen
summary: Put pictures called sprites on the game screen, and place each one with x and y.
language: makecode
introduces: [variable]
explainPicture: lesson.ts#corners
hook: "Every 2D game you have played, from Pac-Man to Mario, is pictures placed on a grid of tiny squares, then moved."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@lesson.ts#corners", lesson: "code/arcade/arcade-sprites", target: "arcade" }
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
code: lesson.ts#predict
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
code: lesson.ts#predict
try: { playground: arcade, starter: "lesson.ts#predict" }
check: { type: reflect, text: "I found the duck in the simulator and compared it with my prediction." }
```

Find the duck. Was it where you predicted?

## Investigate

```step
stage: investigate
code: lesson.ts#corners
insight: "x counts across from the left edge (0 to 160) and y counts down from the top edge (0 to 120), so (0, 0) is the top left corner and a bigger y is lower on the screen."
try: { playground: arcade, starter: "lesson.ts#corners" }
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
try: { playground: arcade, starter: "lesson.ts#modify" }
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
try: { playground: arcade, starter: "lesson.ts#make" }
hint:
  - "Each sprite needs two blocks: set … to sprite of kind Player, then set … position."
  - "Near the top means a small y (about 10 to 25). Near the bottom means a big y (about 100 to 115)."
check: { type: code, text: "A scene with at least four sprites, each placed with set position.", rules: { count: { "sprites.create(": 4, ".setPosition(": 4 } } }
unlocks: [set-position]
```

Make a **scene at the pond** (or anywhere you like):

- something in the **sky**, near the top
- something on the **ground**, near the bottom
- something in the **middle**
- something tucked into a **corner**

## Change a start screen

```step
stage: modify
try: { playground: arcade, starter: "lesson.ts#title" }
```

This game's start screen is upside down: the title sits at the bottom and the characters float at the top. Move the title near the top, and stand the hero and the monster near the bottom, facing each other.

```teacher
summary: Students place sprites on the Arcade screen and see that x counts across from the left and y counts down from the top.
time: 45
timing: "Predict and Run 10 min · Investigate 10 min · Modify 10 min · Make 10 min · Start screen 5 min"
goals:
  - I can make a sprite and draw its picture.
  - I can place a sprite with x and y, and say where on the screen a position is.
  - I can explain why a bigger y is lower on a game screen.
before: |
  A **sprite** is a small picture the game can place, move and test (characters, coins, clouds). The Arcade screen is **160 pixels across and 120 down**. A position is **(x, y)**: x counts across from the **left** edge, and y counts **down** from the **top** edge, so (0, 0) is the top left corner and (80, 60) is the middle. This is the opposite of a maths graph, where y counts up; nearly every computer screen works this way. Each sprite block says **of kind Player**: ignore the kind for now, it matters from lesson 4. Try the Make task yourself: four sprites, two blocks each.
running:
  - "Predict: most students who know graphs put the duck near the top. Let them commit, then Run."
  - "Run: point at the duck and say it plainly: y counts down from the top."
  - "Investigate: the match builds a mental map of the screen. Mia's sun is the graph habit (bigger y is higher); have students fix it in the playground."
  - "Modify: each new sprite needs a new variable name, or it replaces the old one. Show the dropdown on the variable name."
  - "Make: four sprites, each with create and set position. The sprite picture editor opens when you click the picture."
  - "Start screen: no new ideas, just practice reading and changing positions."
stuck:
  - see: "A sprite ends up near the bottom when the student wanted it at the top."
    ask: "Which way does y count on a game screen?"
    fix: "Down from the top. Use a small y (about 15) to go near the top."
  - see: "Adding a new sprite makes an old one vanish."
    ask: "What is the new sprite's variable called?"
    fix: "Both use the same name, so the new one replaces the old one. Click the name and choose New variable."
  - see: "A sprite cannot be seen."
    ask: "What are its x and y?"
    fix: "x must be between 0 and 160 and y between 0 and 120, or it is off the screen. Also check the picture is not the same colour as the background."
stretch: "Make a scene that tells a tiny story with five sprites, and place one sprite exactly in the middle of the screen."
support: "Give students a grid sketch of the screen with (0, 0), (80, 60) and (160, 120) marked, and let them plan positions on paper first."
leads: "Next lesson the sprites move: with the controller, and with a speed. Class ideas: recreate a famous painting or a classroom layout as a scene; a 'where is it?' game where a partner guesses a position from the screen."
exit:
  q: "A sprite is at (80, 20). Is it near the top or near the bottom? How do you know?"
  a: "Near the top. y counts down from the top edge, and 20 is small, so it is close to the top."
explain: |
  The screen is **160 pixels across** and **120 down**. A sprite's position is two numbers, **(x, y)**:

  1. **x** counts across from the **left** edge.
  2. **y** counts **down** from the **top** edge.
  3. So **(0, 0)** is the top left corner, **(80, 60)** is the middle, and a **bigger y is lower** on the screen.
solutions:
  step-4#t2: lesson.ts#sol-third
  step-5: lesson.ts#sol-make
struggle: "y counts down from the top on a game screen, the opposite of maths graphs. Ask them to predict where a sprite will go before placing it."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Point to where you think the duck will appear: top or bottom, left or right.
      notes: "Students who know graphs point up. Don't settle it: run it."
    - at: investigate
      title: Human screen
      minutes: 4
      do: |
        The classroom floor is the screen: the front left corner is (0, 0). The teacher calls a position; a student walks there.
      notes: "Call (80, 110): the student walks to the back. y counts down from the front."
    - at: end
      title: Show a friend
      minutes: 3
      do: |
        Show your scene to the next pair. They guess each sprite's x and y before you show the blocks.
```

```code lesson.ts#predict
scene.setBackgroundColor(9)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
```

```code lesson.ts#corners
scene.setBackgroundColor(9)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(140, 15)
let cloud = sprites.create(img`
    . . . 1 1 . . . . .
    . 1 1 1 1 1 . . . .
    1 1 1 1 1 1 1 1 1 .
    1 1 1 1 1 1 1 1 1 1
    . 1 1 1 1 1 1 1 1 .
    `, SpriteKind.Player)
cloud.setPosition(80, 30)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
```

```code lesson.ts#modify
scene.setBackgroundColor(9)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(140, 15)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
```

```code lesson.ts#sol-restyle
scene.setBackgroundColor(8)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(20, 15)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
```

```code lesson.ts#sol-third
scene.setBackgroundColor(9)
let sun = sprites.create(img`
    . . 5 5 5 5 . .
    . 5 5 5 5 5 5 .
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    5 5 5 5 5 5 5 5
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    `, SpriteKind.Player)
sun.setPosition(140, 15)
let duck = sprites.create(img`
    . . . . . . . .
    . . . 5 5 . . .
    . . 5 5 f 5 4 4
    . . . 5 5 5 . .
    5 5 5 5 5 5 5 .
    . 5 5 5 5 5 5 .
    . . 5 5 5 5 . .
    . . . . . . . .
    `, SpriteKind.Player)
duck.setPosition(20, 100)
let flower = sprites.create(img`
    . 2 . 2 .
    2 2 5 2 2
    . 2 2 2 .
    . . 7 . .
    . . 7 . .
    `, SpriteKind.Player)
flower.setPosition(120, 110)
```

```code lesson.ts#make
scene.setBackgroundColor(7)
```

```code lesson.ts#sol-make
scene.setBackgroundColor(7)
let moon = sprites.create(img`
    . 1 1 1 .
    1 1 1 . .
    1 1 . . .
    1 1 1 . .
    . 1 1 1 .
    `, SpriteKind.Player)
moon.setPosition(10, 10)
let bird = sprites.create(img`
    f . . . f
    . f . f .
    . . f . .
    `, SpriteKind.Player)
bird.setPosition(80, 20)
let frog = sprites.create(img`
    . 7 . 7 .
    7 f 7 f 7
    7 7 7 7 7
    . 7 7 7 .
    `, SpriteKind.Player)
frog.setPosition(80, 60)
let log = sprites.create(img`
    e e e e e e e e e e
    e d d d d d d d d e
    e e e e e e e e e e
    `, SpriteKind.Player)
log.setPosition(40, 112)
```

```code lesson.ts#title
scene.setBackgroundColor(15)
let title = sprites.create(img`
    2 2 2 . 2 2 2 . 2 . 2 . 2 2 2
    2 . . . 2 . 2 . 2 2 2 . 2 . .
    2 . 2 . 2 2 2 . 2 . 2 . 2 2 .
    2 . 2 . 2 . 2 . 2 . 2 . 2 . .
    2 2 2 . 2 . 2 . 2 . 2 . 2 2 2
    `, SpriteKind.Player)
title.setPosition(80, 100)
let hero = sprites.create(img`
    . 4 4 .
    4 4 4 4
    . 8 8 .
    . 8 8 .
    `, SpriteKind.Player)
hero.setPosition(30, 20)
let monster = sprites.create(img`
    a . . a
    a a a a
    a 1 1 a
    a a a a
    `, SpriteKind.Player)
monster.setPosition(130, 20)
```
