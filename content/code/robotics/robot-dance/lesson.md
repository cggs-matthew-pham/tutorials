---
order: 2
unit: drive
title: Moves as functions
summary: Name each dance move as a function, then build a routine by calling them.
language: makecode
extensions: [robot]
explainPicture: dance.ts#investigate
hook: "A dance crew learns named moves (the shuffle, the twirl), then a routine is just the names in order. Robot shows and drone light shows are built the same way."
---
In micro:bit Foundations you made **functions**: a named group of blocks that runs when you **call** it. A robot's moves are a good use for them: build each move once, give it a name, then a dance is just a list of names. You find functions in **Advanced › Functions**.

## Predict

```step
stage: predict
code: dance.ts#predict
check:
  type: predict
  q: "What happens when you press A?"
  options: ["The robot wiggles twice, then stops", "The robot wiggles once", "Nothing: making a function is not enough", "The robot wiggles forever"]
  actual: "It wiggles twice, then stops. Button A calls wiggle two times, and each wiggle turns right, turns left, then stops."
```

**wiggle** is a function: a quick turn right, a quick turn left, then stop.

## Run

```step
stage: run
code: dance.ts#predict
try: { playground: microbit, starter: "dance.ts#predict" }
check: { type: reflect, text: "I pressed A on the simulator and compared the dance with my prediction." }
```

Press **A** on the simulator's micro:bit. Press it again to dance again.

## Investigate

```step
stage: investigate
code: dance.ts#investigate
insight: "A function is a named move. Making it does nothing on its own; calling it runs the move, as often as you like."
tasks:
  - check:
      type: question
      q: "This version has a second move, spin. How many times does each block inside spin run when you press B once?"
      options: ["None", "Once", "Twice", "Forever"]
      answer: 1
      explain: "B calls spin once, so its blocks run once: turn for 1.2 seconds, then stop."
  - check:
      type: question
      q: "Leo made a spin function. When he presses A, his robot only drives forward. Why?"
      options: ["His spin function is broken", "Nothing calls spin: button A has drive blocks instead of a call to spin", "Functions only work with button B", "He needs a forever block"]
      answer: 1
      fault: logic
      misconception: define-not-call
      explain: "Making a function only names the move. Its blocks run when something calls it, and nothing calls spin. Button A needs call spin."
```

This version has two moves: **wiggle** on A and **spin** on B.

### Spin once

Press **B** and watch.

### Leo's robot

Leo's program:

```makecode
function spin () {
    robot.motorTank(50, -50, 1200)
    robot.motorStop()
}
input.onButtonPressed(Button.A, function () {
    robot.motorTank(50, 50, 1000)
    robot.motorStop()
})
robot.elecfreaksCuteBot.start()
```

## Modify

```step
stage: modify
insight: "Once a move has a name, a routine is just calls in order."
try: { playground: microbit, starter: "dance.ts#modify" }
tasks:
  - hint: ["In Functions, click Make a Function and call it spin.", "Inside it: robot motor tank 50 −50 for 1200 ms, then robot motor stop. Then put call spin inside on button B pressed."]
    check: { type: code, text: "Make a spin function and call it from button B.", rules: { contains: ["function spin("], inside: { "input.onButtonPressed(Button.B": ["spin()"] } } }
  - hint: "Inside on button A pressed: call wiggle, call spin, call wiggle."
    check: { type: code, text: "Make A do a routine: wiggle, spin, wiggle.", rules: { contains: ["input.onButtonPressed(Button.A,function(){wiggle()spin()wiggle()"] } }
```

### A new move

Make a second move: a function called **spin** that turns for 1200 ms, then stops. Make button **B** call it.

### A routine

Change button **A** so it dances **wiggle, spin, wiggle**.

## Make

```step
stage: make
try: { playground: microbit, starter: "dance.ts#make" }
hint:
  - "Make two new functions, each a short move that ends with robot motor stop. Ideas: a shuffle (forward then back), a twirl (spin the other way)."
  - "Use on button A+B pressed (change A to A+B). Call your moves in order, using one of them twice."
check: { type: code, text: "A dance: at least two new moves of your own, and a routine on A+B that calls them, one move twice.", rules: { defs: 3, calls: 2, contains: ["Button.AB"] } }
```

Make a **dance routine** for a robot show:

- make at least **two new moves**, each its own function
- on **A+B**, call your moves in order, with one move used **twice**

Name your moves so a reader can picture them, like **shuffle** or **twirl**.

## On a real robot

```step
stage: info
```

Real robots dance differently from the simulator: on a smooth desk they slide, on carpet they turn less. Tune each move's times on your floor. Because each move is a function, you fix it in **one place** and every call in the routine gets the fix. Later in the course, music and radio cues let several robots dance together.
