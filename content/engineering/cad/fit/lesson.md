---
order: 2
unit: size
title: Parts that fit
summary: "Drawn the same size, a printed peg won't go in its hole: printers make holes smaller and pegs bigger. Plan a clearance: about 0.2–0.4 mm for a sliding fit, less for a tight press fit. Every printer differs, so calibrate with a test card."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The lid you designed is exactly the size of the box's opening. You print both, and the lid won't go on. Nothing was measured wrongly. What happened?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8523
  url: http://127.0.0.1:8523/index.html
  readySelector: ".fbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "A 10 mm peg and a 10.6 mm hole: printed, 0.3 mm of clearance, a sliding fit." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Plan the clearance"
  say: "A printer makes holes smaller and pegs bigger."
  clip:
    - caption: { text: "Drawn the same, 10 mm: printed, the hole is 9.8 and the peg 10.1. It won't go in.", say: "Same size on screen does not fit in plastic." }
    - wait: 2200
    - caption: { text: "Draw the hole bigger: about 0.3 mm of clearance after printing slides nicely.", say: "Plan a clearance into the design." }
    - wait: 1800
    - expect: { selector: "#gsum", contains: "won't go in" }
---
**Clearance** is the gap between parts that fit together. **Tolerance** is how far a real size can be from the drawn size. A typical FDM printer squashes each line of plastic outwards a little, so **holes print about 0.2 mm smaller** and **pegs about 0.1 mm bigger**. (Yours may differ: that's what a test card is for.)

| printed clearance | fit |
|---|---|
| under 0 | won't go in |
| 0 to 0.15 mm | press fit (tight, stays put) |
| 0.15 to 0.4 mm | sliding fit |
| over 0.4 mm | loose (wobbles) |

## Predict: same size

```step
stage: predict
insight: "Committing to what happens with a same-size peg and hole tests the new move before the printer's effect is shown."
check:
  type: predict
  q: "A 10 mm peg and a 10 mm hole are printed. The peg…"
  options: ["Won't go in", "Fits perfectly", "Slides in loosely", "Fits, but only one way round"]
  actual: "It won't go in: the hole prints at about 9.8 mm and the peg at about 10.1 mm."
```

## Try: make it slide

```step
stage: run
insight: "Opening the hole up on the board settles the prediction and shows how much clearance a sliding fit needs."
try: { playground: board, starter: "board.yml#run", height: 560 }
check: { type: board, text: "Make the hole bigger, a little at a time, until the peg slides in.", when: "f = 2", explain: "Around 10.5 to 10.7 mm drawn: 0.2 to 0.4 mm of clearance after printing." }
```

## Worked example: design the hole

```step
stage: investigate
insight: "Working the hole size from the peg, the printer's effect and the clearance wanted models the move. Sam's 'same size fits' is planted after the method."
tasks:
  - check:
      type: answer
      q: "A 10 mm peg, a sliding fit with 0.3 mm of clearance after printing. What size should the hole be drawn (mm)?"
      answer: "10.6"
      feedback:
        - ["10.3", "Allow for the printer too: the hole shrinks 0.2 and the peg grows 0.1."]
        - ["10", "Same size won't go in."]
      explain: "printed peg 10.1, so the printed hole must be 10.4; drawn 10.4 + 0.2 = 10.6 mm."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's lid peg won't go in its hole. Click the line where Sam's reasoning first goes wrong."
      answer: 2
      fault: logic
      misconception: same-size-fits
      explain: "Line 2: the hole needs a planned clearance. Drawn the same, the printed hole is smaller than the printed peg."
```

### Work it out

```worked
\text{peg drawn } 10 \to \text{printed } 10.1 :: Pegs print about 0.1 mm bigger.
\text{want clearance } 0.3 :: A sliding fit.
\text{hole printed} = 10.1 + 0.3 = 10.4 :: The hole must come out this big.
\text{hole drawn} = 10.4 + 0.2 = 10.6 :: Holes print 0.2 mm smaller, so draw it bigger.
```

Now check it with the numbers.

### Find the mistake

## Vary: change one thing

```step
stage: modify
insight: "A press fit needs less clearance, and a different peg size needs the same added clearance, not the same hole."
try: { playground: board, starter: "board.yml#vary-press", height: 560 }
tasks:
  - starter: "board.yml#vary-press"
    check: { type: board, text: "A press fit for a 10 mm peg (it should stay put without glue).", when: "p = 10 and f = 1", explain: "A hole drawn about 10.35–10.4 mm: 0.05–0.1 mm of clearance." }
  - starter: "board.yml#vary-six"
    check: { type: board, text: "A 6 mm peg with a sliding fit.", when: "p = 6 and f = 2", explain: "About 6.5–6.7 mm: the same clearance added to a different peg." }
```

### Press fit

### A 6 mm peg

## Print a test card

```step
stage: modify
tier: typical
insight: "A tolerance test card turns the board's typical numbers into your printer's real ones."
check: { type: reflect, text: "We printed a tolerance test card (pegs and holes drawn 0.1, 0.2, 0.3, 0.4 and 0.5 mm apart) on the school printer and recorded which clearance slides and which presses. Our printer's numbers are in our notes." }
```

## Practise: fits

```step
stage: practise
insight: "Fit sizes both ways with the same printer model."
tasks:
  - check:
      type: question
      q: "A 5 mm peg, hole drawn 5.2 mm. Printed clearance, and fit?"
      options: ["−0.1 mm: won't go in", "0.2 mm: sliding fit", "0.1 mm: press fit", "0.5 mm: loose"]
      answer: 0
      feedback: [null, "Allow for the printer: hole 5.0, peg 5.1.", "Allow for the printer.", "Allow for the printer."]
      explain: "Hole prints 5.0, peg 5.1: −0.1 mm."
  - check:
      type: answer
      q: "A 12 mm peg, a press fit with 0.1 mm of clearance after printing. Hole drawn (mm)?"
      answer: "12.4"
      feedback:
        - ["12.1", "Add the printer's 0.2 and 0.1 too."]
      explain: "Peg prints 12.1; hole must print 12.2; draw 12.4."
```

### Will it go in?

### Press fit

## Make: a lid peg

```step
stage: make
insight: "Designing a hole for a given peg and clearance range applies the whole calculation."
try: { playground: board, starter: "board.yml#make", height: 560 }
hint: ["The peg is 8 mm. Work out the hole for 0.2 and for 0.3 mm of clearance.", "8.1 + 0.2 + 0.2 = 8.5; 8.1 + 0.3 + 0.2 = 8.6.", "Set the hole between 8.5 and 8.6."]
check: { type: board, text: "A lid with an 8 mm peg should lift off easily but not rattle: 0.2 to 0.3 mm of clearance after printing.", when: "p = 8 and c >= 0.2 and c <= 0.3", explain: "A hole drawn 8.5 to 8.6 mm." }
```
