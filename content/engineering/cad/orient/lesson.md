---
order: 3
unit: print
title: Design for the printer
summary: "A printer builds in layers: an overhang more than about 45° from vertical needs supports, and a part is weakest across its layer lines. Choose the way up that needs no supports and runs the layers along the load."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two brackets, same file, same printer, same plastic. One holds a shelf of books; the other snaps the first day. The only difference is which way up they were printed."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8524
  url: http://127.0.0.1:8524/index.html
  readySelector: ".fbsvg"
  layout: full
explainPicture: { ref: board.yml#explain-pic, caption: "Printed flat on its side: no supports, and the layers run along both arms." }
explainClip:
  query: { code: "@board.yml#explain", fresh: 1, id: explain }
  caption: "Which way up?"
  say: "The printer builds in layers."
  clip:
    - caption: { text: "Foot down: no supports, but the layers run across the arm. It snaps along a layer.", say: "Layers across the load are weak." }
    - wait: 2000
    - click: "Try the next way round"
    - caption: { text: "Flat on its side: no supports, and the layers run along the arms.", say: "Layers along the load are strong." }
    - wait: 1800
    - expect: { selector: "#gsum", contains: "layers along the load" }
---
Each layer sits on the one below. A wall leaning more than about **45°** from vertical has nothing underneath, so the slicer adds **supports** (extra plastic you break off later). And layers stick to each other less well than plastic sticks to itself along a layer, so a printed part is **weakest across its layer lines**.

## Predict: strongest way

```step
stage: predict
insight: "Committing to the strongest orientation before seeing layers tests the 'equally strong every way' picture."
check:
  type: predict
  q: "An L-shaped bracket will hold up a shelf. Which way should it be printed to be strongest?"
  options: ["Flat on its side", "Foot down, arm up", "Upside down", "It makes no difference"]
  actual: "Flat on its side: no supports, and every layer runs along both arms, so the load pulls along the layers, not across them."
```

## Try: turn it round

```step
stage: run
insight: "Turning the bracket through all four ways settles the prediction: supports in one, weak layers in three."
try: { playground: board, starter: "board.yml#run", height: 560 }
tasks:
  - check: { type: board, text: "Turn the bracket round until it needs supports.", when: "s = 1", explain: "Upside down: the foot sticks out over nothing." }
  - check: { type: board, text: "Find the way that needs no supports and puts the layers along the load.", when: "s = 0 and k = 1", explain: "Flat on its side." }
```

### Supports

### Strongest

## Worked example: two questions for every part

```step
stage: investigate
insight: "Asking 'what overhangs?' and 'which way does the load pull?' of every part models the move. Sam's 'equally strong every way' is planted after the method."
tasks:
  - check:
      type: question
      q: "A hook will hang a bag from its curved end. The load pulls down the hook's length. Which way up should it be printed?"
      options: ["Flat, so the layers run along the hook", "Standing up, curve at the top", "Standing up, curve at the bottom", "It makes no difference"]
      answer: 0
      feedback: [null, "Then the load pulls the layers apart.", "Then the load pulls the layers apart.", "Layer direction decides where it snaps."]
      explain: "Flat: no tall overhangs, and the layers run along the load."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's bracket snaps across the arm the first day. Click the line where Sam's reasoning first goes wrong."
      answer: 3
      fault: logic
      misconception: print-strength-equal
      explain: "Line 3: a printed part is weakest across its layers. Foot down, the shelf load bends the arm across them."
```

### Overhang, then load

```worked
\text{overhang} > 45^\circ \Rightarrow \text{supports} :: Each layer needs something under it.
\text{layers across the load} \Rightarrow \text{weak} :: Layers bond less well to each other.
\text{bracket: flat on its side} :: No overhangs, and the layers run along both arms.
\text{check both, every part} :: Supports cost plastic and finish; weak layers cost the part.
```

Now try a hook.

### Find the mistake

## Make it in the slicer

```step
stage: modify
tier: typical
insight: "In the school's slicer, supports and layer direction are visible before printing: the habit to build."
check: { type: reflect, text: "I opened my bracket in our slicer, laid it each way (lay on face), sliced, and compared the support plastic and print time. I chose flat on its side." }
```

## Practise: which way?

```step
stage: practise
insight: "Applying both questions to new parts."
check:
  type: sort
  q: "Which of these need supports printed as described?"
  options: ["Needs supports", "No supports"]
  items:
    - ["A letter T standing up, its bar at the top", "Needs supports"]
    - ["A letter T lying flat", "No supports"]
    - ["A pyramid standing on its base", "No supports"]
    - ["A pyramid standing on its point", "Needs supports"]
    - ["A cube with a round hole straight through, top to bottom", "No supports"]
  explain: "Anything that sticks out sideways over nothing (the T's bar, an upside-down pyramid) needs supports; sloping in at 45° or less doesn't."
```

## Make: choose and justify

```step
stage: make
insight: "Choosing an orientation for a new part and giving both reasons is the design decision students will make on every print."
tasks:
  - check:
      type: question
      q: "A phone stand is a flat back plate with a ledge sticking out at the bottom. It will be printed lying on its back. What happens to the ledge?"
      options: ["It points up from the bed: no supports, and the layers run along the plate", "It overhangs and needs supports", "It can't be printed", "It prints but is weak across the plate"]
      answer: 0
      feedback: [null, "Lying on its back, the ledge points straight up.", "Nothing sticks out sideways.", "The plate's layers run along it."]
      explain: "On its back, every feature grows straight up from the plate."
  - check: { type: reflect, text: "For my own part, I wrote down: which way up I'll print it, what overhangs (and whether it needs supports), and which way the load pulls compared with the layers." }
```

### A phone stand

### My part
