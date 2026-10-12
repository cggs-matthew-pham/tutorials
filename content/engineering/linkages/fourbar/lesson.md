---
order: 3
unit: motion
title: Four-bar linkages
summary: "Four bars joined at pivots turn a crank into a rocking arm, if their lengths allow it. Students find a crank that jams, learn the rule that predicts whether it can turn all the way (shortest + longest ≤ the other two), and design a windscreen wiper with a big enough swing."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A windscreen wiper swings back and forth, but its motor turns round and round. Four bars do it. Why can't they be any lengths you like?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8532
  url: http://127.0.0.1:8532/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: fourbar.yml#explain, caption: "Crank 30, coupler 80, rocker 60 and ground 70 mm: the crank turns all the way and the rocker swings back and forth." }
explainClip:
  query: { code: "@fourbar.yml#explain", fresh: 1, id: explain }
  caption: "Turning becomes rocking"
  say: "The blue crank turns; the purple rocker swings."
  clip:
    - caption: { text: "Four bars: the crank (blue), the coupler, the rocker (purple), and the frame between the pivots.", say: "Four bars, joined at four pivots." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 3200
    - caption: { text: "The crank goes all the way round; the rocker only swings back and forth.", say: "The crank turns all the way; the rocker swings." }
    - caption: { text: "Shortest + longest = 30 + 80 = 110, no more than 60 + 70 = 130, so the crank can turn.", say: "The lengths decide whether the crank can turn." }
    - wait: 1200
---
A **linkage** is bars joined at pivots. In a **four-bar linkage**, one bar is the **frame** (the ground: it doesn't move, and holds two pivots), the **crank** turns on one pivot, the **rocker** swings on the other, and the **coupler** joins their ends.

Four-bar linkages are everywhere: windscreen wipers, bike pedals and legs, oil pumps, folding chairs, excavator arms.

## Predict: a longer crank

```step
stage: predict
insight: "A longer crank looks like it simply gives a bigger swing. Committing first makes the jam surprising: past a certain length the bars cannot reach, and the crank cannot turn all the way."
check:
  type: predict
  q: "The crank is 30 mm and turns all the way round. Make it 55 mm (the other bars stay the same). What happens?"
  options: ["It jams part of the way round", "It turns all the way, with a bigger swing", "It turns all the way, with the same swing", "The rocker turns all the way round too"]
  actual: "It jams. With a 55 mm crank, at some angles the coupler and rocker together can't reach the crank's end, so the linkage locks."
```

## Try: find the jam

```step
stage: run
insight: "Students lengthen the crank in steps and find the last length that still turns: the rule comes after they have met it."
try: { playground: board, starter: "fourbar.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "Turn the crank once. Watch the rocker.", when: "t = 1 and full = 1", explain: "The crank turns all the way; the rocker swings back and forth." }
  - check: { type: board, text: "Make the crank 55 mm and turn it.", when: "a_mm = 55 and jam = 1", explain: "It jams: the bars can't reach at some angles." }
  - check:
      type: number
      q: "Try crank lengths between 30 and 55 mm. What is the longest crank that still turns all the way (in mm)?"
      answer: 50
      feedback:
        - [55, "55 mm jams. Try one step shorter."]
      explain: "50 mm. 50 + 80 = 130, exactly the other two (60 + 70); any longer and it jams."
```

### Turn it

### Too long

### The longest crank

## Worked example: the rule

```step
stage: investigate
insight: "The rule (Grashof's): add the shortest and longest bars; if that is no more than the other two added, one bar can turn all the way, and it is the crank if the crank is the shortest. Ava adds the wrong pair, planted after the method."
tasks:
  - check:
      type: question
      q: "Bars 40, 90, 60 and 70 mm (crank 40). Can the crank turn all the way?"
      options: ["Yes: 40 + 90 = 130 is no more than 60 + 70 = 130", "No: 40 + 90 is more than 60 + 70", "Yes: 40 + 60 = 100 is less than 90 + 70", "No: the coupler is too long"]
      answer: 0
      feedback: [null, "130 is not more than 130: equal is allowed (only just).", "Add the shortest and the longest: 40 and 90.", "Check with the rule: shortest + longest against the other two."]
      explain: "Shortest + longest = 40 + 90 = 130, the other two = 130. Not more, and the crank is the shortest, so it turns (only just)."
  - check:
      type: bug
      code: "working.txt#ava"
      text: "Ava thinks her crank turns all the way. Click the line where her working first goes wrong."
      answer: 2
      fault: logic
      misconception: grashof-wrong-pair
      explain: "Line 2: add the shortest and the longest: 55 + 80 = 135. That is more than 60 + 70 = 130, so the crank jams."
```

### Check 30, 80, 60, 70, then 55, 80, 60, 70

```worked
\text{sorted: } 30, 60, 70, 80 :: List the four lengths, shortest to longest.
30 + 80 = 110 :: Add the shortest and the longest.
60 + 70 = 130 :: Add the other two.
110 \le 130 \;\checkmark :: No more than the other two: one bar can go all the way round. The crank is the shortest, so it is the crank.
55 + 80 = 135 > 60 + 70 = 130 \;\times :: With a 55 mm crank: more than the other two, so no bar can go all the way round. It jams.
```

### Find the mistake

## Vary: a wiper

```step
stage: modify
insight: "A longer crank gives a bigger swing, up to the limit the rule sets: students meet a swing criterion within the rule."
try: { playground: board, starter: "fourbar.yml#vary", height: 600 }
tasks:
  - hint: ["A longer crank swings the rocker farther.", "Keep shortest + longest no more than the other two.", "Try 40 mm."]
    check: { type: board, text: "A wiper must swing at least 100°, and its crank must turn all the way. Change the crank and turn it.", when: "full = 1 and swing >= 100 and t = 1", explain: "A 40 mm crank swings the rocker 100°, and 40 + 80 ≤ 60 + 70." }
  - check:
      type: question
      q: "If the shortest bar is the frame (the ground), and the rule holds, what happens?"
      options: ["Both the crank and the rocker can turn all the way round", "Nothing can turn", "Only the coupler turns", "It is the same as a crank and rocker"]
      answer: 0
      feedback: [null, "The rule holds, so something turns all the way.", "The coupler isn't on a fixed pivot.", "Which bar is shortest changes which bars turn fully."]
      explain: "With the frame shortest, both bars on fixed pivots can turn fully: a double crank, used in some train wheels and drag-link mechanisms."
```

### A wiper

### Shortest frame

## Practise: the rule

```step
stage: practise
insight: "Apply the rule to new lengths, find a limit, and name what a long crank gives."
tasks:
  - check:
      type: question
      q: "Bars 20, 50, 40 and 45 mm (crank 20). Can the crank turn all the way?"
      options: ["Yes", "No"]
      answer: 0
      shuffle: false
      explain: "20 + 50 = 70, no more than 40 + 45 = 85."
  - check:
      type: question
      q: "Bars 35, 100, 50 and 70 mm (crank 35). Can the crank turn all the way?"
      options: ["Yes", "No"]
      answer: 1
      shuffle: false
      explain: "35 + 100 = 135, more than 50 + 70 = 120: it jams."
  - check:
      type: answer
      q: "Coupler 90, rocker 70 and ground 80 mm. What is the longest crank (shorter than all of them) that still turns all the way, in mm?"
      answer: "60"
      feedback:
        - ["150", "That is 70 + 80. Take away the longest bar, 90."]
      explain: "crank + 90 ≤ 70 + 80 = 150, so the crank can be up to 150 − 90 = 60 mm."
```

### Yes or no

### Again

### A limit

## Make: a wiper to a range

```step
stage: make
insight: "Several bars may change now: students search a design space with the rule as a guide and the board as the test."
try: { playground: board, starter: "fourbar.yml#make", height: 620 }
tasks:
  - hint: ["Start by making the crank longer: that grows the swing.", "If it jams, check the rule: shortest + longest against the other two.", "A shorter rocker also swings farther."]
    check: { type: board, text: "Design a linkage whose crank turns all the way and whose rocker swings between 110° and 130°. Change any bars and turn it.", when: "full = 1 and swing >= 110 and swing <= 130 and t = 1", explain: "For example crank 40, coupler 70, rocker 50, ground 70 (110°), or crank 45, coupler 80, rocker 60, ground 70 (118°)." }
  - check: { type: reflect, text: "In one or two sentences: your four lengths, how you used the rule, and what you changed to get the swing into range." }
```

### Into range

### Evaluate
