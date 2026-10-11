---
order: 3
unit: core
optional: true
title: Reaction game
summary: "Design a reaction timer: an LED lights after a random wait, the player presses a button, and the game shows their time in milliseconds, fairly."
language: maths
shape: design
hook: "Who in the class has the fastest reactions? To find out fairly, the game has to stop people guessing when the light will come on."
---
**Client:** the class, for a lunchtime competition. **Context:** two players take turns.

**Brief:** after a **random wait of 2 to 5 seconds** an LED lights; the player presses a button; the game shows the **reaction time in ms**. Pressing **before** the light is a false start and must be caught. Kit parts only; USB power; it must explain itself on the serial monitor or an LCD.

## Inquire: the brief

```step
stage: predict
insight: "Separating what the design must do (criteria) from the limits it works within (constraints) is the first move of any design brief."
check:
  type: sort
  q: "Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?"
  options: ["Criterion", "Constraint"]
  items:
    - ["Waits a random 2 to 5 s before lighting", "Criterion"]
    - ["Shows the reaction time in ms", "Criterion"]
    - ["Catches a press before the light (false start)", "Criterion"]
    - ["Kit parts only", "Constraint"]
    - ["USB power", "Constraint"]
  explain: "Criteria are what you will test at the end; constraints decide what you are allowed to build with."
```

## Develop: plan before you build

```step
stage: investigate
insight: "Putting the game loop in order and tracing its timing plans the logic; the false-start check is the part most designs forget."
tasks:
  - check:
      type: parsons
      code: "game.ino#loop"
      text: "Put the game's loop() in order."
      explain: "Wait a random time (watching for false starts), light the LED, note millis(), wait for the press, subtract, print."
  - check:
      type: number
      q: "The LED lit at millis() = 41200 and the button was pressed at 41487. What is the reaction time in ms?"
      answer: 287
      explain: "41487 − 41200 = 287 ms."
  - check: { type: reflect, text: "My plan has: the button (with a pull-down or INPUT_PULLUP) and LED wiring, the loop in order, and a test table including a deliberate false start." }
```

### The loop

### Timing

### The plan

## Create: build it

```step
stage: make
insight: "Building in the simulator first catches wiring and code slips cheaply; the real build then tests the design against the world."
tasks:
  - check: { type: reflect, text: "In Tinkercad: a button on pin 2, an LED on pin 13, and my sketch using random() and millis(). I played it and saw my time on the serial monitor." }
  - check: { type: reflect, text: "For real (if you have the kit): built, uploaded and played by at least three people." }
```

### In the simulator

### For real

## Test: run your table

```step
stage: modify
insight: "Running the test table written in Develop, and recording every result including failures, is the evidence for the evaluation."
tasks:
  - check: { type: reflect, text: "I ran my tests: ten normal rounds (all times shown, all waits between 2 and 5 s), and three deliberate false starts (each one caught), and recorded the results." }
  - check: { type: reflect, text: "I fixed at least one failure and ran that test again, and I recorded what I changed and why." }
```

### Run the tests

### Fix and re-test

## Evaluate: against the brief

```step
stage: practise
insight: "Judging the design criterion by criterion, with evidence from the tests, is what separates an evaluation from a description."
tasks:
  - check:
      type: question
      q: "Which is the strongest evidence that the design meets a criterion?"
      options: ["A test from the table that set the input and recorded the expected result", "It worked when I tried it", "My partner said it looks good", "The code has no errors"]
      answer: 0
      feedback: [null, "Which input did you try, and was it the one the criterion is about?", "Opinions aren't measurements.", "Code with no errors can still do the wrong thing."]
      explain: "A planned test with a recorded result is evidence; everything else is a feeling."
  - check: { type: reflect, text: "I wrote my evaluation: for each criterion, met or not, with the test that shows it; one improvement I would make and why; and who else could use it." }
```

### Which is evidence?

### Write it up
