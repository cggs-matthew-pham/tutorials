---
order: 1
unit: motion
title: Cranks and sliders
assumes: [energy-transfer]
summary: "A crank and slider turns rotation into back-and-forth motion: one turn is one stroke out and back, and the stroke is twice the crank's radius, whatever the rod's length. Students find the stroke by turning, work out a pump's flow, and size a crank to a brief."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A motor turns round and round. A pump needs a piston that goes in and out. How do you get one from the other?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8530
  url: http://127.0.0.1:8530/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: crank.yml#explain, caption: "A 25 mm crank pushes the slider 50 mm out and back each turn: the stroke is twice the radius." }
explainClip:
  query: { code: "@crank.yml#explain", fresh: 1, id: explain }
  caption: "Round and round becomes back and forth"
  say: "The crank turns, and the rod pushes the slider along its track."
  clip:
    - caption: { text: "The crank's pin is 25 mm from the centre. The rod joins it to the slider.", say: "The pin is twenty-five millimetres from the centre." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 2600
    - caption: { text: "One turn: the slider goes out and back once. The graph is its position.", say: "One turn makes one stroke out and back." }
    - caption: { text: "The pin goes from 25 mm one side to 25 mm the other: a 50 mm stroke.", say: "So the stroke is twice the radius: fifty millimetres." }
    - wait: 1200
---
Motors spin. Many machines need something to go **back and forth** instead: a pump's piston, a saw blade, a sewing machine's needle. A **crank** (an arm or a pin on a wheel) and a **connecting rod** turn one into the other: the **slider** at the end of the rod runs along a straight track.

The **stroke** is how far the slider moves from one end of its travel to the other.

## Predict: how far does it go?

```step
stage: predict
insight: "The crank's radius is the number on show, so students expect it to be the stroke. Committing first makes the result stick: the pin goes from one side of the centre to the other, so the stroke is twice the radius."
check:
  type: predict
  q: "The crank's pin is 20 mm from the centre, and the rod is 80 mm long. How far does the slider move from one end of its travel to the other?"
  options: ["40 mm", "20 mm", "80 mm", "100 mm"]
  actual: "40 mm: twice the radius. The pin goes from 20 mm on one side of the centre to 20 mm on the other, and the slider follows it."
```

## Try: turn it

```step
stage: run
insight: "The trace settles the stroke; changing the rod and finding the same stroke separates the two lengths, which students tend to mix up."
try: { playground: board, starter: "crank.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "Press Turn the crank once and watch the graph of the slider's position.", when: "t = 1", explain: "One turn of the crank is one stroke out and one back." }
  - check:
      type: number
      q: "Read the graph: how far does the slider move from one end to the other (in mm)?"
      answer: 40
      feedback:
        - [20, "That is the crank's radius. Read from the bottom of the curve to the top."]
      explain: "40 mm: twice the 20 mm radius."
  - check: { type: board, text: "Make the rod longer, then turn the crank again. Does the stroke change?", when: "rod_mm > 80 and t = 1", explain: "No: still 40 mm. The rod's length moves where the slider runs, not how far." }
```

### One turn

### The stroke

### A longer rod

Was your prediction right? The stroke is **twice the crank radius**; the rod only sets where along the track it happens.

## Worked example: a pump

```step
stage: investigate
insight: "The worked example turns the crank into a useful number: stroke × piston area is the water per stroke, and turns a minute are strokes a minute. The faded example uses a 30 mm crank. Noah uses the radius as the stroke, planted after the method."
tasks:
  - check:
      type: answer
      q: "A 30 mm crank drives a piston 5 cm² in area. How much water does it push each stroke, in cm³?"
      answer: "30"
      feedback:
        - ["15", "The stroke is twice the radius: 6 cm, not 3 cm."]
        - ["150", "Work in centimetres: 30 mm is 3 cm, so the stroke is 6 cm."]
      explain: "Stroke 2 × 30 = 60 mm = 6 cm, so 5 × 6 = 30 cm³."
  - check:
      type: answer
      q: "At 40 turns a minute, how much water a minute, in cm³?"
      answer: "1200"
      feedback:
        - ["600", "That uses a 3 cm stroke. The stroke is 6 cm."]
      explain: "30 cm³ × 40 strokes = 1200 cm³ (1.2 litres) a minute."
  - check:
      type: bug
      code: "working.txt#noah"
      text: "Noah thinks his pump gives 600 cm³ a minute. Click the line where his working first goes wrong."
      answer: 2
      fault: logic
      misconception: stroke-equals-radius
      explain: "Line 2: the piston moves twice the crank's length, 6 cm, because the pin goes from one side of the centre to the other. So 30 cm³ a stroke and 1200 cm³ a minute."
```

### A 25 mm crank, then a 30 mm crank

```worked
\text{stroke} = 2 \times 25 = 50 \text{ mm} = 5 \text{ cm} :: The pin goes 25 mm one side of the centre and 25 mm the other.
\text{per stroke} = 4 \times 5 = 20 \text{ cm}^3 :: A piston 4 cm² in area moving 5 cm sweeps 20 cm³ of water.
60 \text{ turns a minute} = 60 \text{ strokes a minute} :: One turn of the crank is one stroke.
20 \times 60 = 1200 \text{ cm}^3 \text{ a minute} :: That is 1.2 litres a minute.
```

Now a 30 mm crank and a piston 5 cm² in area, at 40 turns a minute. Start with the water per stroke.

### A minute

### Find the mistake

## Vary: size the crank

```step
stage: modify
insight: "Reasoning from the stroke back to the radius, then a question that reverses the mechanism: in an engine the slider (piston) drives the crank."
try: { playground: board, starter: "crank.yml#vary", height: 560 }
tasks:
  - check: { type: board, text: "The brief asks for a 60 mm stroke. Set the crank and turn it.", when: "stroke_mm = 60 and t = 1", explain: "A 30 mm crank: 2 × 30 = 60 mm." }
  - check:
      type: question
      q: "In a car engine, which way does the motion go?"
      options: ["The pistons push back and forth and turn the crank", "The crank turns and pushes the pistons", "The rods spin the pistons", "The engine has no crank"]
      answer: 0
      feedback: [null, "That is a pump. In an engine, burning fuel pushes the pistons.", "Pistons only slide.", "Every piston engine has a crankshaft."]
      explain: "The same mechanism works both ways: a pump turns rotation into back and forth, an engine turns back and forth into rotation."
```

### A 60 mm stroke

### Backwards

## Practise: cranks

```step
stage: practise
insight: "Stroke from radius and back, strokes a minute from turns a minute, and volume from area × stroke."
tasks:
  - check:
      type: answer
      q: "A crank of radius 35 mm. What is the stroke, in mm?"
      answer: "70"
      explain: "2 × 35 = 70 mm."
  - check:
      type: answer
      q: "A saw blade must move 80 mm each stroke. What crank radius does it need, in mm?"
      answer: "40"
      feedback:
        - ["160", "Halve the stroke, don't double it."]
      explain: "80 ÷ 2 = 40 mm."
  - check:
      type: answer
      q: "A sewing machine's crank turns 900 times a minute. How many times does the needle go down each second?"
      answer: "15"
      explain: "900 strokes a minute ÷ 60 = 15 a second."
  - check:
      type: answer
      q: "A pump with a 4 cm stroke and a 3 cm² piston turns 50 times a minute. How much water a minute, in cm³?"
      answer: "600"
      explain: "3 × 4 = 12 cm³ a stroke, × 50 = 600 cm³."
```

### Stroke

### Radius

### Speed

### Flow

## Make: a pump to a brief

```step
stage: make
insight: "Students work back from the flow to the stroke and the radius, then test it on the board: the same brief-first reasoning as the other Mechanisms lessons."
try: { playground: board, starter: "crank.yml#make", height: 560 }
tasks:
  - hint: ["Per stroke = flow ÷ strokes a minute: 900 ÷ 30.", "Stroke = water per stroke ÷ piston area.", "30 cm³ ÷ 6 cm² = 5 cm = 50 mm, so the radius is 25 mm."]
    check: { type: board, text: "A garden pump must move 900 cm³ a minute at 30 turns a minute, with a piston 6 cm² in area. Set the crank radius and turn it.", when: "r_mm = 25 and t = 1", explain: "900 ÷ 30 = 30 cm³ a stroke; 30 ÷ 6 = 5 cm stroke; radius 25 mm." }
  - check: { type: reflect, text: "In one or two sentences: how you worked back from the flow to the crank, and what you would change to pump faster without a bigger crank." }
```

### A garden pump

### Evaluate
