---
order: 20
unit: algorithms
node: [AC9M8SP04 n1, AC9M8SP04 n2]
uses: [AC9M8SP01 n1, AC9M8SP01 n2, AC9M7SP04 n1]
title: Algorithms for congruence
summary: "An algorithm can decide whether two triangles are congruent, similar or neither by asking about their equal parts in a careful order: the congruence tests first, then the similarity conditions, and 'not enough to tell' when nothing fits. You test it on one pair of every kind, find what it misses, and fix it."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A design program has to decide whether two parts it is given will fit each other exactly, fit after scaling, or not fit at all. What questions should it ask, and in what order?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8326
  url: http://127.0.0.1:8326/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@keys.yml#explain", fresh: 1, id: explain }
  caption: "Following the algorithm"
  say: "Ask about the equal parts, one question at a time."
  clip:
    - caption: { text: "Sides 4 and 9 with 50° between. All three sides equal? Not known: No.", say: "Are all three pairs of sides equal? We don't know, so no." }
    - click: "No"
    - caption: { text: "Two sides and the angle between them? Yes: congruent by SAS.", say: "Two sides and the angle between them? Yes. Congruent by S A S." }
    - click: "Yes"
    - expect: { selector: "body", contains: "Congruent (SAS)" }
    - wait: 1500
---
An algorithm can decide whether two triangles are **congruent**, **similar** or **neither**. It looks at the parts that are known to be equal (or in the same ratio) and asks yes/no questions about them.

Three things make it work:

- **Order**: test congruence before similarity, because congruent triangles are similar too.
- **Every case**: each test (SSS, SAS, ASA or AAS, RHS, and AA, SSS and SAS for similarity) has a path, and "not enough to tell" catches the rest.
- **Testing**: run it on one pair of every kind, including SSA, which must not be called congruent.

## Predict: angles only

```step
stage: predict
insight: "Committing to what an angles-only algorithm says about a big and a small triangle shows whether they see that equal angles give similar, not congruent."
check:
  type: predict
  q: "An algorithm asks only: 'Are all three pairs of angles equal? Yes: congruent.' Two triangles both have angles 40°, 60° and 80°, but one is twice as big. What does it say?"
  options: ["Congruent", "Similar", "Not enough to tell"]
  actual: "Congruent, which is wrong. Equal angles make the triangles similar; congruence needs a matching side too."
```

## Run: six pairs

```step
stage: run
insight: "Running the full algorithm on one pair of each kind shows every path, and that SSA ends at 'not enough to tell'."
try: { playground: board, starter: "keys.yml#run", height: 640 }
check: { type: board, text: "Follow the algorithm for all six pairs of triangles. Answer each question from what the description says is equal. How does it handle the twice-as-big pair, compared with your prediction?", when: "n = 6", explain: "Every pair reaches its own answer. Equal angles with unequal matching sides give 'similar', and SSA gives 'not enough to tell'." }
```

Answer "yes" only when the description tells you the parts are equal. Open **The whole key** to see the algorithm as numbered steps.

## Investigate: build and check it

```step
stage: investigate
insight: "Ordering the steps shows why congruence comes first; an algorithm that accepts any angle lets SSA through (Raj); tracing a pair checks a path."
tasks:
  - check:
      type: parsons
      code: "steps.txt#algo"
      text: "Put the steps of a short algorithm in order. It leaves out RHS and the other similarity tests; the Run algorithm has them."
      extra: ["If two pairs of sides and any angle are equal, say \"congruent\" and stop."]
      explain: "List the parts, test SSS, then SAS, then two angles (with or without a matching side), and finish with 'not enough to tell'."
  - check:
      type: bug
      code: "working.txt#raj"
      text: "Raj tests his algorithm on triangles with sides 6 cm and 8 cm and a 30° angle opposite the 6 cm side, and it says congruent. Click the line that is wrong."
      answer: 3
      fault: logic
      misconception: ssa-is-test
      explain: "Line 3: 'any pair of angles' lets SSA through. The angle must be between the two sides (SAS)."
  - check:
      type: question
      q: "Two triangles both have angles 50° and 60°. The sides between those angles are 5 cm and 10 cm. Trace the Run algorithm. Where does it end?"
      options: ["Similar (AA): two angles equal, but the matching sides are not", "Congruent (ASA)", "Congruent (SSS)", "Neither"]
      answer: 0
      feedback: [null, "The matching sides are 5 and 10, not equal.", "No sides are equal.", "Two equal angles make them similar."]
      explain: "A no, B no, C yes (two angles), D no (5 ≠ 10): similar with scale factor 2."
```

### Order the steps

Why must the congruence questions come before "two pairs of angles equal"?

### Find the mistake

Read Raj's algorithm. Which step lets the SSA pair through?

### Trace a pair

## Modify: find a gap and fix it

```step
stage: modify
insight: "A pair the first algorithm wrongly sends to 'not enough to tell' (SAS similarity) shows a gap; adding a step and re-testing is the fix."
try: { playground: board, starter: "keys.yml#better", height: 640 }
tasks:
  - check:
      type: question
      q: "One triangle has sides 4 cm and 6 cm with 50° between them; the other has 8 cm and 12 cm with 50° between them. Where does the first algorithm (the Run board) send this pair?"
      options: ["Neither, or not enough to tell: it has no step for this", "Similar (AA)", "Congruent (SAS)", "Similar (SSS)"]
      answer: 0
      feedback: [null, "Only one pair of angles is known.", "The sides are not equal.", "Only two pairs of sides are known."]
      explain: "It answers no at every step. But the pair is similar: two sides in the ratio 2 with the angle between them equal (SAS similarity)."
  - starter: "keys.yml#better"
    check: { type: board, text: "This algorithm has a new step G. Run it on all seven pairs. Does every pair, including the new one, reach the right answer?", when: "n = 7", explain: "Step G catches SAS similarity, and the six old pairs still get the same answers." }
  - check:
      type: number
      q: "In the improved algorithm, how many questions does it ask before it says 'Neither, or not enough to tell'?"
      answer: 6
      tolerance: 0
      feedback:
        - ["5", "Count A, B, C, E, F and the new G."]
      explain: "A, B, C, E, F, G: six questions. Pairs that are congruent by SSS need only one."
  - check:
      type: question
      q: "Why must a fixed algorithm be tested on the old pairs again, not only the new one?"
      options: ["A change can break a path that used to work", "To make it faster", "The old pairs might change", "It doesn't need to be"]
      answer: 0
      feedback: [null, "Testing checks it is right, not fast.", "The pairs stay the same; the algorithm changed.", "Changes can have side effects."]
      explain: "Re-running every test case checks the fix didn't break anything else."
```

### A gap

### The fix

### The longest path

### Test again

## Practise: tracing algorithms

```step
stage: practise
insight: "Tracing pairs to their answers and describing the logic, mixed; SSA called congruent is the planted slip; the quadrilateral review keeps properties fresh."
tasks:
  - check:
      type: question
      q: "Both triangles have a right angle, a 10 cm hypotenuse and a 6 cm side. Which answers does the algorithm give, in order?"
      options: ["No, No, No, then Yes at E: congruent (RHS)", "Yes at A: congruent (SSS)", "No, Yes: congruent (SAS)", "No, No, Yes: two angles"]
      answer: 0
      feedback: [null, "Only two pairs of sides are known.", "The right angle is not between the hypotenuse and the 6 cm side.", "Only one pair of angles is known."]
      explain: "A no, B no (the right angle is not between them), C no, E yes: RHS."
  - check:
      type: question
      q: "Both triangles have sides 7 cm and 5 cm, and a 40° angle opposite the 5 cm side (not between them). What should a correct algorithm say?"
      options: ["Not enough to tell", "Congruent (SAS)", "Similar", "Congruent (RHS)"]
      answer: 0
      feedback: [null, "The angle is not between the sides: SSA.", "No angles or ratios show similarity.", "There is no right angle."]
      explain: "SSA can give two different triangles, so the algorithm must not say congruent."
  - check:
      type: question
      q: "Which describes the algorithm best?"
      options: ["It checks the congruence tests first, then the similarity conditions, and says 'not enough to tell' if none fit", "It measures every side and angle", "It checks similarity first, then congruence", "It only checks sides"]
      answer: 0
      feedback: [null, "It uses only what is known to be equal.", "Similar first would name congruent pairs 'similar'.", "Angles are checked at B, C and E."]
      explain: "Most specific first (congruent), then the wider class (similar), then a catch-all."
  - check:
      type: number
      q: "Review: in parallelogram ABCD, angle A = 75°. What is angle B, in degrees?"
      answer: 105
      tolerance: 0
      explain: "A and B are neighbours (co-interior): 180 − 75 = 105°."
```

### RHS

### SSA

### Describe it

### Review: parallelograms

## Make: your own algorithm

```step
stage: make
insight: "Designing and testing their own algorithm shows whether they order the tests, cover every case and check it."
try: { playground: board, starter: "keys.yml#better", height: 640 }
hint: ["Start from the tests you know: SSS, SAS, ASA or AAS, RHS.", "Write one test pair of triangles for each answer, including SSA."]
check: { type: reflect, text: "I wrote my own algorithm (a flowchart or numbered steps) that says congruent, similar or not enough to tell, tested it on one pair of every kind, and fixed what went wrong." }
```

Write an algorithm that sorts pairs of triangles into **congruent**, **similar** and **not enough to tell**. Draw it as a flowchart or write numbered steps. Swap with a partner: trace their algorithm on your test pairs, and describe in words how it works.
