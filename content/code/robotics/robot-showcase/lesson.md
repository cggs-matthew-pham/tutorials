---
order: 10
unit: challenge
title: Showcase
summary: Build a robot dance show to a tune in three milestones, from a moves library to a finale with an emergency stop.
language: makecode
extensions: [robot]
explainPicture: show.ts#predict
hook: "Robot shows at theme parks and festivals are built like this: a library of moves, a soundtrack in sections, a cue for each section, and a stop button for safety."
---
Time to put the course together in a **show**. A conductor micro:bit plays a tune phrase by phrase and sends a cue as each phrase starts (lesson 8). Dancer robots do a move for each cue, and each move is a function with its own lights (lesson 2). You will build it in three milestones, with less help each time.

In the simulator, press **A+B** on the first micro:bit to start the show; the **second** robot dances.

## Predict

```step
stage: predict
code: show.ts#predict
check:
  type: predict
  q: "You press A+B on the first micro:bit. What does the second robot do?"
  options: ["Wiggles twice with pink lights during the first phrase, then spins with blue lights during the second", "Spins first, then wiggles", "Does every move at once", "Nothing, because the moves are in functions"]
  actual: "It wiggles twice (pink) as the first phrase starts, then spins (blue) when the second phrase starts. Each move sets its own lights at its start."
```

## Run

```step
stage: run
code: show.ts#predict
try: { playground: microbit, starter: "show.ts#predict" }
check: { type: reflect, text: "I started the show and watched the moves and lights change with the music." }
```

Press **A+B** on the first micro:bit, with the sound on if you can.

## Investigate

```step
stage: investigate
code: show.ts#predict
insight: "A show has three layers: moves (functions), cues (phrases that send a number, then play until done), and the dancer's choice of move for each cue. Each layer can change without touching the others."
tasks:
  - check:
      type: sort
      q: "Which layer of the show does each part belong to?"
      options: ["Move", "Cue", "Dancer's choice"]
      items:
        - ["wiggle: turn right, turn left, stop, with pink lights", "Move", "A move is a function: what the robot does."]
        - ["phraseB: send 2, then play F F E E D D C until done", "Cue", "A phrase sends its cue, then plays its notes."]
        - ["if receivedNumber = 2, call spin", "Dancer's choice", "The dancer decides which move each cue means."]
        - ["spin: turn for 1.2 seconds, stop, with blue lights", "Move", "Another move function."]
  - check:
      type: question
      q: "The director wants every wiggle in the show to be slower. Where is the one place to change?"
      options: ["Every place wiggle is called", "Inside the wiggle function", "In each phrase's notes", "In on radio received"]
      answer: 1
      explain: "Every call runs the same wiggle function, so changing its times once changes every wiggle in the show."
```

### Three layers

Sort each part into its layer.

### Slower wiggles

Think about where wiggle's blocks live.

## Milestone 1: a moves library

```step
stage: modify
insight: "A move library is a set of functions, each a short move with its own lights that ends with a stop."
try: { playground: microbit, starter: "show.ts#m1" }
hint:
  - "In Advanced › Functions, make a function called spin, and another called shuffle."
  - "spin: set color, motor tank 50 −50 for 1200 ms, stop. shuffle: set color, forward for 300 ms, back for 300 ms, stop."
check: { type: code, text: "Add two moves to the library: spin and shuffle, each with its own lights and ending with a stop.", rules: { contains: ["function spin(", "function shuffle("], count: { "robot.setColor(": 3, "robot.motorStop()": 3 } } }
```

The show so far has one move, **wiggle**, and one phrase. Add two more moves:

1. **spin**: its own colour, turn for 1.2 seconds, then stop.
2. **shuffle**: its own colour, forward a little, back a little, then stop.

Test each by calling it from wiggle's branch for a moment, then put wiggle back.

## Milestone 2: cue the show

```step
stage: modify
insight: "Each phrase is a cue; the dancer needs one branch per cue."
try: { playground: microbit, starter: "show.ts#sol-m1" }
hint:
  - "phraseB sends 2 and plays F F E E D D C -. phraseC sends 3 and plays G G F F E E D -."
  - "Call the phrases in order on A+B. In on radio received, add else if branches for 2 (spin) and 3 (shuffle twice)."
check: { type: code, text: "Three phrases, cues 1, 2 and 3, and a different move for each cue.", rules: { contains: ["radio.sendNumber(2)", "radio.sendNumber(3)", "receivedNumber==2", "receivedNumber==3"] } }
```

Turn the moves into a show:

- Add **phraseB** (cue 2) and **phraseC** (cue 3), and play all three phrases in order on **A+B**.
- The dancer does a **different move** for each cue.

Twinkle's next phrases are **F F E E D D C -** and **G G F F E E D -**.

## Milestone 3: finale and safety stop

```step
stage: make
insight: "Combining functions, cues and decisions into a whole show is the course's ideas working together."
try: { playground: microbit, starter: "show.ts#sol-m2" }
hint:
  - "A fourth phrase sends 4. A finale function changes colour several times as it moves, then stops and shows a picture."
  - "The logo sends 0. In on radio received, an else at the end stops the robot and turns its lights off."
check: { type: code, text: "A finale on cue 4 with changing lights, and the logo sends a stop that every dancer obeys.", rules: { contains: ["radio.sendNumber(4)", "receivedNumber==4", "radio.sendNumber(0)", "input.onLogoEvent("], count: { "robot.setColor(": 5 } } }
```

Finish the show:

- A **finale**: a fourth phrase with cue **4**, and a big final move with **changing lights** that ends in a pose (stopped, with a picture on the micro:bit).
- A **safety stop**: touching the conductor's **logo** sends a cue that makes every dancer stop and turn its lights off.

Then make it yours: change the tune, the moves or the colours.

## On a real robot

```step
stage: info
```

For a class show, one micro:bit (not in a robot) conducts and every robot in its radio group dances. Practise on the real floor: moves that look right in the simulator often need longer or shorter times. A dancer finishes the move it is doing before it obeys the stop, so keep moves short. Real shows have a person whose only job is the stop button.
