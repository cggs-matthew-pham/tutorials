---
order: 4
unit: print
title: Slicer trade-offs
summary: "The slicer's settings trade time and plastic for finish and strength. Halving the layer height doubles the time. Infill past about 20–30% costs a lot for little strength; extra walls add more strength for less."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The printer queue is a week long and your part takes four hours. Which settings can you change without making it worse, and which actually matter?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8525
  url: http://127.0.0.1:8525/index.html
  readySelector: ".fbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A block at 0.2 mm layers, 20% infill and 2 walls: 81 minutes, 17 g." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Time, plastic, strength"
  say: "Every setting trades something."
  clip:
    - caption: { text: "0.2 mm layers, 20% infill, 2 walls: 81 minutes and 17 g.", say: "These are typical starting settings." }
    - wait: 2200
    - caption: { text: "Thinner layers look smoother but take longer; more walls add strength cheaply.", say: "Choose the setting that buys what you need." }
    - wait: 1800
    - expect: { selector: "#gsum", contains: "81 min" }
---
The **slicer** turns a 3D model into layers and a path for the nozzle. The three settings that matter most:

- **Layer height**: thinner layers give a smoother finish, but there are more of them.
- **Infill**: how full the inside is (0% hollow, 100% solid).
- **Walls** (perimeters): how many lines thick the outside is.

## Predict: thinner layers

```step
stage: predict
insight: "Committing to the effect of halving layer height tests the new move: time scales with the number of layers."
check:
  type: predict
  q: "A part takes 80 minutes at 0.2 mm layers. At 0.1 mm layers it takes about…"
  options: ["160 minutes", "80 minutes", "40 minutes", "90 minutes"]
  actual: "About 160 minutes: twice as many layers, each taking about as long."
```

## Try: the settings

```step
stage: run
insight: "Changing one setting at a time on the board settles the prediction and shows infill's poor value."
try: { playground: board, starter: "board.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "Halve the layer height (0.1 mm). What happens to the time?", when: "l = 0.1", explain: "81 to 163 minutes: doubled." }
  - check: { type: board, text: "Put the layer height back to 0.2 and set infill to 100%. Compare the time and the strength with 20%.", when: "l = 0.2 and i = 100", explain: "Time and plastic more than double (81 to 192 minutes); strength rises from 51 to 79." }
```

### Layers

### Infill

## Worked example: what buys strength

```step
stage: investigate
insight: "Comparing walls and infill on time and strength models the move; Sam's 100% infill is planted after the method."
tasks:
  - check:
      type: question
      q: "From 2 walls and 20% infill, which change adds the most strength for the least extra time?"
      options: ["Add two walls (4 walls, 20% infill)", "Raise infill to 60%", "Halve the layer height", "Raise infill to 100%"]
      answer: 0
      feedback: [null, "Try it on the board: a lot of time for a little strength.", "That improves the finish, not the strength.", "The most time of all."]
      explain: "On the board: 4 walls gives strength 95 in about 106 minutes; 60% infill gives only 65 in about 137."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's print takes three hours and isn't much stronger. Click the line where Sam's reasoning first goes wrong."
      answer: 2
      fault: logic
      misconception: more-infill-better
      explain: "Line 2: most of a part's strength is in its walls. Past about 20–30%, infill costs lots of time and plastic for little strength; add walls instead."
```

### Walls or infill?

```worked
\text{layers } 0.2 \to 0.1 :: Twice the layers: twice the time. Buys finish, not strength.
\text{infill } 20\% \to 100\% :: More than twice the time and plastic; strength rises a little.
\text{walls } 2 \to 4 :: A little more time; strength rises a lot.
\text{strong and quick} :: More walls, modest infill, normal layers.
```

Now pick the best buy.

### Find the mistake

## Slice it for real

```step
stage: modify
tier: typical
insight: "The school's slicer gives the real time and grams for the same changes, so students calibrate the board's model."
check: { type: reflect, text: "In our slicer, I sliced my part at 0.2 mm / 20% / 2 walls, then changed one setting at a time, and wrote down the real time and grams for each." }
```

## Practise: trade-offs

```step
stage: practise
insight: "Choosing settings for different purposes."
check:
  type: sort
  q: "Which setting matters most for each part?"
  options: ["Thinner layers (finish)", "More walls (strength)", "Low infill (speed and plastic)"]
  items:
    - ["A display model to look at", "Thinner layers (finish)"]
    - ["A bracket that holds weight", "More walls (strength)"]
    - ["A quick test print to check a fit", "Low infill (speed and plastic)"]
    - ["A figurine with fine detail", "Thinner layers (finish)"]
    - ["A hook for a heavy bag", "More walls (strength)"]
  explain: "Choose the setting that buys what the part needs; everything else stays at the defaults."
```

## Make: strong and quick

```step
stage: make
insight: "Meeting two criteria at once (strength and time) forces the trade-off decision."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["Infill costs time; walls buy strength.", "Try lowering the infill and adding walls.", "4 walls and 0–10% infill at 0.2 mm layers."]
check: { type: board, text: "The bracket needs strength 80 or more, and the queue allows 100 minutes at most. Find settings that do both.", when: "s >= 80 and t <= 100", explain: "More walls and little infill: strength from the walls, time saved inside." }
```
