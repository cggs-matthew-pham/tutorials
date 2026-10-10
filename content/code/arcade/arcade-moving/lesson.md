---
order: 2
unit: show-move
title: Move with the controller
summary: Fly a sprite with the arrow keys, and set a speed so the engine keeps another sprite moving by itself.
language: makecode
explainPicture: moving.ts#drift
hook: "A car in a racing game, a cloud drifting past, a ball in pong: none of them is pushed by hand every frame. The game is told a speed, and keeps them moving."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$OUT_DIR\" 8131"
  url: "http://127.0.0.1:8131/_playground-explain/index.html"
  readySelector: "#stage[data-ready]"
  layout: full
voice: true
explainClip:
  query: { code: "@moving.ts#drift", lesson: "code/arcade/arcade-moving", target: "arcade" }
  caption: "A sprite has a position and a velocity"
  say: "A sprite has a position and a velocity."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 600
    - caption:
        text: "Position (x, y) is where it is now. Setting it moves it once."
        say: "Position is where it is now. Setting it moves the sprite once."
    - caption:
        text: "Velocity (vx, vy) is a speed, in pixels per second."
        say: "Velocity is a speed. The engine moves the sprite a little every frame."
    - click: "Run"
    - wait: 600
    - caption:
        text: "It keeps moving until something changes it."
        say: "So it keeps moving until something changes it, like a wall or a new speed."
    - wait: 1200
    - expect: { selector: "#out h2", contains: "Running" }
---
Last lesson every sprite stood still. Now they move, in two ways:

- **with the controller**: the player steers with the arrow keys (or W, A, S, D).
- **with a speed**, called a **velocity**: the game engine moves the sprite by itself, a little every frame. A **frame** is one redraw of the screen, about 30 times a second.

Click the simulator first, so it hears the keyboard. The **A** button is space (or Z) on the keyboard.

## Predict

```step
stage: predict
code: moving.ts#predict
check:
  type: predict
  q: "The ball's velocity is set to 50 across and 0 down. What does the ball do?"
  options: ["Moves 50 pixels right, then stops", "Keeps moving right, off the edge of the screen", "Jumps to x 50 and stays there", "Moves 50 pixels down, then stops"]
  actual: "It keeps moving right and leaves the screen. A velocity is a speed (50 pixels every second), not a distance, so the engine keeps moving the ball until something changes the speed."
```

There is no loop here: the blocks in **on start** run once. Lock in what you think the ball will do.

## Run

```step
stage: run
code: moving.ts#predict
try: { playground: arcade, starter: "moving.ts#predict" }
check: { type: reflect, text: "I watched the ball and compared it with my prediction." }
```

Watch the ball. Press the restart button under the simulator to see it again.

## Investigate

```step
stage: investigate
code: moving.ts#drift
insight: "A position is where a sprite is now; setting it moves the sprite once. A velocity is a speed in pixels per second: the engine moves the sprite a little every frame, so it keeps moving until something changes the velocity."
try: { playground: arcade, starter: "moving.ts#drift" }
tasks:
  - check:
      type: match
      q: "Match each block with what it does to a sprite."
      pairs:
        - ["set position", "puts it at one place, once"]
        - ["set velocity", "keeps it moving by itself, a little every frame"]
        - ["move with buttons", "lets the arrow keys steer it"]
        - ["set stay in screen", "stops it at the edge of the screen"]
        - ["set bounce on wall", "turns it back when it hits an edge"]
  - check:
      type: number
      q: "The cloud starts at x 80 with a velocity of 30 across. After 2 seconds, how many pixels has it moved?"
      answer: 60
      explain: "A velocity of 30 means 30 pixels every second. In 2 seconds the engine moves it 30 + 30 = 60 pixels, a tiny step each frame."
  - check:
      type: question
      q: "Leo wants A to make his rocket hop 30 pixels to the right. He presses A once. What happens?"
      options: ["The rocket hops 30 pixels and stops", "The rocket keeps sliding right, off the edge of the screen", "Nothing: vx only works in on start", "The rocket moves 30 pixels up"]
      answer: 1
      fault: logic
      misconception: position-vs-velocity
      explain: "vx is a speed, not a distance. Setting it to 30 starts the rocket moving 30 pixels every second, and nothing ever sets it back to 0. A hop of 30 pixels changes the position: change x by 30."
```

Fly the plane with the arrow keys. Press **A** (space) and see what that event does. Watch the cloud.

### What does it do?

Match each block with what it does.

### How far?

Work out a distance from a speed.

### Leo's rocket

Leo's rocket is not moved by the controller. He added this event:

```makecode
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    rocket.vx = 30
})
```

## Modify

```step
stage: modify
insight: "The two numbers in move with buttons are speeds across and down. Changing a position in an event moves a sprite once, each time the event happens."
try: { playground: arcade, starter: "moving.ts#modify" }
tasks:
  - hint: ["Click the + on the move plane with buttons block to show two speeds.", "The second number is the speed up and down. 0 means no up and down at all."]
    check: { type: code, text: "Make the plane fly only left and right, not up and down.", rules: { contains: ["controller.moveSprite(plane,", ",0)"] } }
  - hint: ["Drag in on A button pressed from Controller.", "From Sprites, drag change plane x by inside it, and make it 30."]
    check: { type: code, text: "Make A dash the plane 30 pixels to the right, once per press.", rules: { inside: { "controller.A.onEvent(": ["plane.x+=30"] } } }
```

### Only across

Make the plane fly left and right only, like a ship along the bottom of the screen.

### Dash

Add an event: each press of **A** dashes the plane 30 pixels to the right. Press it a few times. Does it stop after each dash?

## Make

```step
stage: make
try: { playground: arcade, starter: "moving.ts#make" }
hint:
  - "Plane: move with buttons (Controller) and set stay in screen (Sprites)."
  - "Cloud: a new sprite with its own name, then set velocity and set bounce on wall (both in Sprites)."
  - "Give the cloud a velocity down as well as across, so it drifts at a slant and bounces off every wall."
check: { type: code, text: "A plane the player flies that stays on the screen, and a cloud with a velocity that bounces off the walls.", rules: { contains: ["controller.moveSprite(plane", "plane.setStayInScreen(true)", ".setVelocity(", ".setBounceOnWall(true)"], count: { "sprites.create(": 2 } } }
```

Make a **sky game**:

- the player flies the **plane** with the arrow keys
- the plane **cannot leave** the screen
- a **cloud** drifts by itself and **bounces** off the walls

Try to fly through the cloud. (Nothing happens yet: next lesson sprites notice when they touch.)

## Change a conveyor belt

```step
stage: modify
try: { playground: arcade, starter: "moving.ts#conveyor" }
```

This factory belt carries boxes to the right, and the worker moves along the floor. Make the belt run twice as fast, add a third box, then make **A** stop the belt by setting each box's vx to 0.
