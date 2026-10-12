---
order: 5
unit: losses
title: Real machines lose energy
assumes: [efficiency, energy-conservation, energy-transfer]
summary: "Every real gear mesh and pulley wheel turns a little of the work into heat and sound. Students find a gear train lifts less than the ideal, that adding pulleys stops helping, work out overall efficiency by multiplying, and redesign a brief with friction in it."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The ideal block and tackle said more pulleys always means less pull. Real riggers stop at about six. Why?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8600
  url: http://127.0.0.1:8600/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: losses.yml#explain, caption: "Four ropes with friction: each wheel passes on 90%, so the system is 66% efficient and the pull is 153 N, not 100 N." }
explainClip:
  query: { code: "@losses.yml#explain", fresh: 1, id: explain }
  caption: "Where the work goes"
  say: "Four ropes hold the sack, but every pulley wheel rubs a little."
  clip:
    - caption: { text: "Ideal: 400 N ÷ 4 ropes = 100 N. Each wheel here passes on only 90%.", say: "Each wheel passes on only ninety percent." }
    - caption: { text: "Four wheels: 0.9 × 0.9 × 0.9 × 0.9 = 0.66, so 66% efficient.", say: "Four wheels multiply to about two thirds." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 2100
    - caption: { text: "You pull 153 N over 4 m: 610 J in, 400 J out. The other 210 J becomes heat and sound.", say: "The missing work becomes heat and sound." }
    - wait: 1200
---
The earlier Mechanisms boards had no friction, so **work in = work out**: a smaller force over a longer distance did exactly the same work. Real machines rub. Each gear mesh and each pulley wheel turns a little of the work into **heat** and **sound**, and the energy is still all there (it is conserved), but less of it is **useful**.

**Efficiency** = useful work out ÷ work in. Here each **gear mesh** passes on **95%** of the turning force, and each **pulley wheel** passes on **90%** of the pull.

## Predict: more and more pulleys

```step
stage: predict
insight: "The frictionless rule (more ropes, less pull) invites 'add pulleys for ever'. Committing first makes the levelling-off a surprise worth explaining."
check:
  type: predict
  q: "Each pulley wheel loses 10% of the pull. You keep adding pulleys. The pull you need…"
  options: ["Gets smaller at first, then stops getting smaller", "Keeps getting smaller for ever, as before", "Gets bigger straight away", "Stays the same: friction cancels out"]
  actual: "Smaller at first, then it levels off (here at about 9 ropes) and starts to grow. Each new rope shares the load, but each new wheel wastes 10% more."
```

## Try: friction in the winch and the pulleys

```step
stage: run
insight: "The gear train lifts less than its ideal 3000 g; the pulley's fewest ropes rise from 3 to 5, and ropes 9 and 10 give the same pull."
try: { playground: board, starter: "losses.yml#run-train", height: 520 }
tasks:
  - starter: "losses.yml#run-train"
    check: { type: board, text: "The winch's compound train (ratio 15) should lift 3000 g with no friction. Add 50 g at a time and lift, until it stalls.", when: "s = 1 and load_g > 2700", explain: "It lifts 2700 g and stalls at 2750 g: two meshes at 95% pass on 90% of the force." }
  - check:
      type: number
      q: "What is the heaviest bucket it lifted, in grams?"
      answer: 2700
      feedback:
        - [3000, "That is the frictionless lift. Test it: where does it stall?"]
      explain: "2700 g. 3000 × 0.95 × 0.95 = 2707.5, so 2700 g lifts and 2750 g stalls."
  - starter: "losses.yml#run-pulley"
    check: { type: board, text: "Pulleys with friction: find the fewest ropes that let your 150 N lift the 400 N sack.", when: "l = 1 and n = 5", explain: "5 ropes (135 N). With no friction 3 would do; with friction 3 ropes need 183 N and 4 need 153 N." }
  - starter: "losses.yml#run-pulley"
    check: { type: board, text: "Now try 9 ropes, then 10. Compare the pulls.", when: "n = 10", explain: "Both need about 115 N. The tenth rope shares the load, but its wheel wastes as much as it saves." }
```

### The winch

### Its heaviest lift

### Fewest ropes

### 9 or 10?

Was your prediction right? Past about 9 ropes, more pulleys stop helping.

## Worked example: multiply the losses

```step
stage: investigate
insight: "Each stage passes on a fraction of what it gets, so efficiencies multiply. Work in = work out ÷ efficiency, and the difference is the energy lost as heat and sound."
tasks:
  - check:
      type: answer
      q: "Three gear meshes, each 95% efficient. What is the overall efficiency, to the nearest percent?"
      answer: "86"
      tolerance: 0.5
      feedback:
        - ["85", "Multiply, don't subtract: 0.95 × 0.95 × 0.95."]
      explain: "0.95³ = 0.857, about 86%."
  - check:
      type: answer
      q: "A machine is 80% efficient and must do 400 J of useful work. How much work must go in, in joules?"
      answer: "500"
      feedback:
        - ["320", "That is 80% of 400. The work in is bigger than the work out: 400 ÷ 0.8."]
      explain: "400 ÷ 0.8 = 500 J; 100 J becomes heat and sound."
  - check:
      type: question
      q: "Where does the 'lost' work go?"
      options: ["It becomes heat and sound in the rubbing parts: the energy is still there, just not useful", "It is destroyed by friction", "It goes back into the motor", "It stays in the rope"]
      answer: 0
      feedback: [null, "Energy is never destroyed.", "Friction doesn't return energy.", "The rope doesn't store it."]
      explain: "Energy is conserved. Friction transfers some of it to heat (and a little sound), which is no use for lifting."
```

### Four pulleys, step by step

```worked
0.9 \times 0.9 \times 0.9 \times 0.9 = 0.66 :: Each of the 4 wheels passes on 90% of what it gets: multiply.
\text{pull} = \frac{400}{4 \times 0.66} = 153 \text{ N} :: The ideal pull (400 ÷ 4) divided by the efficiency.
\text{work in} = 153 \times 4 = 610 \text{ J} :: You still pull 4 m of rope to lift the sack 1 m.
\text{work out} = 400 \times 1 = 400 \text{ J} :: The useful work: the sack's weight times the height.
610 - 400 = 210 \text{ J of heat and sound} :: Efficiency = 400 ÷ 610 = 66%.
```

### The work in

### Where it goes

## Vary: a brief with friction

```step
stage: modify
insight: "Students redo a pulley brief with losses: the frictionless answer (3 ropes) now fails, and the rule of thumb becomes 'test it'."
try: { playground: board, starter: "losses.yml#vary", height: 560 }
hint: ["Without friction, 900 ÷ 300 = 3 ropes would do. Try it.", "Each extra rope helps less. Keep adding and test each time."]
check: { type: board, text: "Lift a 900 N engine with a pull of at most 300 N, using the fewest ropes. Each wheel is 90% efficient.", when: "load_n = 900 and l = 1 and n = 6", explain: "6 ropes (282 N). 5 ropes need 305 N: just too much. Without friction 3 would do." }
```

## Practise: efficiency

```step
stage: practise
insight: "Multiply stage efficiencies, divide for work in, and the losses link to Science's efficiency."
tasks:
  - check:
      type: answer
      q: "Two stages, 90% and 80% efficient. What is the overall efficiency, in percent?"
      answer: "72"
      explain: "0.9 × 0.8 = 0.72 = 72%."
  - check:
      type: answer
      q: "A winch is 75% efficient. It lifts a 600 N load 2 m. How much work goes in, in joules?"
      answer: "1600"
      explain: "Work out = 600 × 2 = 1200 J; work in = 1200 ÷ 0.75 = 1600 J."
  - check:
      type: question
      q: "Which change makes a gear train more efficient?"
      options: ["Fewer meshes (for example one bigger stage instead of two small ones), or better lubrication", "More meshes", "A faster motor", "Heavier gears"]
      answer: 0
      feedback: [null, "Each mesh wastes a little more.", "Speed doesn't fix friction.", "Heavier gears usually waste more."]
      explain: "Every mesh loses some energy, so fewer meshes and less rubbing (oil, bearings) mean less waste. That trades against gear size."
```

### Two stages

### Work in

### Better

## Make: the winch again, with friction

```step
stage: make
insight: "The Gear trains brief, redone with 95% per mesh: the frictionless answer (ratio 7.5) now stalls, so students need a slightly bigger ratio and a looser time limit."
try: { playground: board, starter: "losses.yml#make", height: 600 }
tasks:
  - hint: ["With friction the train lifts 200 × ratio × 0.9 grams (two meshes).", "1500 ÷ (200 × 0.9025) ≈ 8.3: you need a ratio of at least 8.3.", "The time is 5 × ratio seconds, so 45 s allows a ratio up to 9. Which two stages multiply to between 8.3 and 9?"]
    check: { type: board, text: "Lift 1500 g within 45 s with a compound train, now that each mesh is 95% efficient.", when: "load_g = 1500 and l = 1 and time_s <= 45", explain: "A ratio of 9 (8 → 24 = 8 → 24, 45 s) or 8.33 (8 → 40 = 24 → 40, 41.7 s). Ratio 7.5, the frictionless answer, now lifts only 1354 g." }
  - check: { type: reflect, text: "In one or two sentences: how friction changed your design, and where the extra energy goes." }
```

### With friction

### Evaluate
