---
order: 4
unit: levers
title: Pulleys
summary: "One pulley changes the direction of a pull, not its size. Ropes that hold up a moving block share the load, so the pull shrinks, but you pull more rope by the same factor. Students test pulleys, work out pulls and rope lengths, see that work in equals work out, and choose a pulley system for a brief."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A 400 N sack has to go up onto a stage. You can pull 150 N. How many pulleys do you need, and how much rope will you pull?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8529
  url: http://127.0.0.1:8529/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: pulleys.yml#explain, caption: "Four ropes hold the bottom block: each takes 100 N of the 400 N sack, and you pull 4 m of rope to lift it 1 m." }
explainClip:
  query: { code: "@pulleys.yml#explain", fresh: 1, id: explain }
  caption: "Ropes share the load"
  say: "Count the ropes that hold up the bottom block."
  clip:
    - caption: { text: "Four ropes hold up the bottom block. The orange rope you pull does not.", say: "Four ropes hold up the bottom block." }
    - caption: { text: "They share the 400 N sack: 400 ÷ 4 = 100 N each, so you pull 100 N.", say: "They share the load, so you pull a quarter." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 2100
    - expect: { selector: "#gnote", contains: "Lifted" }
    - caption: { text: "To lift it 1 m, each of the four ropes must shorten 1 m: you pull 4 m.", say: "But you pull four metres of rope to lift it one metre." }
    - wait: 1500
---
A **pulley** is a wheel with a rope over it. A **block** holds one or more pulleys. In this lesson a **top block** hangs from a beam, a **bottom block** carries the load, and ropes run between them. The rope you pull goes over the top block.

The job: lift a **400 N** sack (about 40 kg) **1 m**. You can pull **150 N** at most.

## Predict: one pulley

```step
stage: predict
insight: "Many students expect any pulley to make lifting easier. Committing first makes the result stick: a single fixed pulley only changes direction, like an idler gear. Each wrong option is a real slip: halving, or the turning wheel helping."
check:
  type: predict
  q: "One pulley at the top, and the rope goes from the sack, over the pulley and down to your hand. To lift the 400 N sack you pull…"
  options: ["400 N, but downwards", "200 N: the pulley halves it", "Less than 400 N, because the wheel turns", "800 N: the rope goes up and down"]
  actual: "400 N. One fixed pulley changes the direction of the pull (you can pull down, using your weight), not its size."
```

## Try: add ropes

```step
stage: run
insight: "One rope fails at 150 N; adding ropes that hold the bottom block until it lifts settles the size question, and the rope pulled is reported, so students meet the cost before the rule."
try: { playground: board, starter: "pulleys.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "With one rope holding the sack, press Pull.", when: "s = 1 and n = 1", explain: "It does not move: one rope holds the whole 400 N, and you can pull only 150 N." }
  - check: { type: board, text: "Add ropes (more pulleys) until your 150 N lifts the sack. Use as few as you can.", when: "l = 1 and n = 3", explain: "Three ropes: each holds 400 ÷ 3 ≈ 133 N, and 133 N is less than 150 N. Two ropes would each need 200 N." }
  - check:
      type: number
      q: "With 3 ropes, how much rope did you pull to lift the sack 1 m (in metres)?"
      answer: 3
      feedback:
        - [1, "The sack rose 1 m. Look at the note after the lift: how much rope did you pull?"]
      explain: "3 m: each of the three ropes holding the block shortens by 1 m, and all of that rope comes out through your hands."
```

### One rope

### Add ropes

### Rope pulled

Was your prediction right? One pulley changes only the direction. Ropes that hold the **moving** block share the load.

## Worked example: count the ropes

```step
stage: investigate
insight: "The worked example gives two rules from one count: pull = load ÷ supporting ropes, rope pulled = height × supporting ropes, and shows work in = work out. The faded example uses 6 ropes. Mia counts the rope she pulls, planted after the method."
tasks:
  - check:
      type: answer
      q: "6 ropes hold up the bottom block, and the load is 600 N. What pull lifts it, in newtons?"
      answer: "100"
      feedback:
        - ["3600", "The ropes share the load: divide by 6."]
        - ["85.71", "Count only the ropes holding the bottom block: 6, not 7."]
      explain: "600 ÷ 6 = 100 N."
  - check:
      type: answer
      q: "With those 6 ropes, how much rope do you pull to lift the load 2 m, in metres?"
      answer: "12"
      feedback:
        - ["2", "The load rises 2 m, but each of the 6 ropes shortens 2 m."]
        - ["0.33", "More ropes means more rope to pull, not less: 6 × 2."]
      explain: "6 × 2 = 12 m. Work in: 100 N × 12 m = 1200 J. Work out: 600 N × 2 m = 1200 J."
  - check:
      type: bug
      code: "working.txt#mia"
      text: "Mia thinks she needs only 80 N. Click the line where Mia's working first goes wrong."
      answer: 2
      fault: logic
      misconception: pulley-count-pull-rope
      explain: "Line 2: the rope she pulls goes over the top block, so it does not hold the bottom block up. Four ropes share the load: 400 ÷ 4 = 100 N, and she pulls 4 m."
```

### Four ropes, then six

```worked
4 \text{ ropes hold the bottom block} :: Count only the ropes between the blocks. The rope you pull goes over the top, so it does not hold the load up.
400 \div 4 = 100 \text{ N} :: The ropes share the load: each holds 100 N, and so does your hand.
4 \times 1 = 4 \text{ m} :: To lift the block 1 m, each of the 4 ropes must get 1 m shorter: you pull 4 m.
100 \times 4 = 400 \quad 400 \times 1 = 400 :: Work = force × distance. Work in (100 N × 4 m) equals work out (400 N × 1 m): no free lunch.
```

Now 6 ropes hold up a 600 N load. Start with the pull.

### Rope

### Find the mistake

Mia builds a block and tackle with 4 ropes between the blocks.

## Vary: choose a system

```step
stage: modify
insight: "Students reason from the brief to the fewest ropes, then connect the fixed pulley back to the idler gear: a mechanism can change direction without changing force."
try: { playground: board, starter: "pulleys.yml#vary-brief", height: 560 }
tasks:
  - starter: "pulleys.yml#vary-brief"
    check: { type: board, text: "A 900 N engine, and you can pull 200 N. Lift it with as few ropes as you can (fewer ropes means less rope to pull).", when: "load_n = 900 and l = 1 and n = 5", explain: "900 ÷ 200 = 4.5, so 5 ropes: 180 N each. 4 ropes would need 225 N." }
  - check:
      type: question
      q: "If one fixed pulley does not make the pull smaller, why use one?"
      options: ["It changes the direction: you can pull down, using your own weight, instead of lifting up", "It makes the load lighter", "It makes you pull less rope", "There is no reason to"]
      answer: 0
      feedback: [null, "The load weighs the same: 400 N needs 400 N.", "One rope, one metre: the same as lifting directly.", "A flagpole or a well bucket would be much harder to lift straight up."]
      explain: "Like an idler gear, a fixed pulley changes the direction, not the size. Flagpoles, curtains, and the top pulley of every block and tackle do this."
```

### Fewest ropes

### Why one pulley?

## Practise: pulleys

```step
stage: practise
insight: "Count the supporting ropes, divide for the pull, multiply for the rope, and the same trade as levers and gears."
tasks:
  - check:
      type: answer
      q: "3 ropes hold up a 750 N load. What pull lifts it, in newtons?"
      answer: "250"
      explain: "750 ÷ 3 = 250 N."
  - check:
      type: answer
      q: "A crane's hook hangs on 8 ropes. To raise the hook 5 m, how much rope does the winch wind in, in metres?"
      answer: "40"
      feedback:
        - ["0.625", "More ropes means more rope wound: 8 × 5."]
      explain: "8 × 5 = 40 m."
  - check:
      type: question
      q: "Which uses less rope to lift a 600 N load 2 m: 3 ropes or 6 ropes?"
      options: ["3 ropes: 6 m of rope instead of 12 m, but a 200 N pull instead of 100 N", "6 ropes: more pulleys always means less work", "They use the same rope", "You cannot tell without the pulley sizes"]
      answer: 0
      feedback: [null, "6 ropes halve the pull but double the rope: the work is the same.", "Rope = ropes × height: 6 m and 12 m.", "Pulley size does not change the rope count or the rope pulled."]
      explain: "Rope = ropes × height. Fewer ropes: more pull, less rope."
  - check:
      type: match
      q: "Each mechanism trades one thing for another. Match each to what it gives up to make your force bigger."
      pairs:
        - ["Gears, small driving big", "Speed of the output"]
        - ["Lever, pivot near the load", "Distance your hand moves"]
        - ["Block and tackle", "Length of rope you pull"]
      explain: "All three make your force bigger, and all three make you move farther or faster by the same factor: work in equals work out."
```

### Pull

### Rope

### Trade-off

### Same idea everywhere

## Make: a brief that needs four ropes

```step
stage: make
insight: "Writing a brief with a given answer reverses the reasoning: the load ÷ the pull must be more than 3 and no more than 4."
try: { playground: board, starter: "pulleys.yml#make", height: 600 }
tasks:
  - hint: ["With 4 ropes the pull is load ÷ 4. With 3 ropes it is load ÷ 3.", "You need the 3-rope pull to be too big for you, and the 4-rope pull to be small enough.", "For example, a 600 N load: 3 ropes need 200 N, 4 ropes need 150 N. Which pull would you choose?"]
    check: { type: board, text: "Set a load and your pull so that 4 ropes is the fewest that works. Then choose 4 ropes and lift.", when: "n = 4 and l = 1 and n_min = 4", explain: "The load ÷ your pull is more than 3 and no more than 4: 4 ropes is the fewest that works." }
  - check: { type: reflect, text: "In one or two sentences: your brief, why 3 ropes fail and 4 work, and how much rope you pull to lift the load 1 m." }
```

### Four ropes

### Evaluate

Stretch: real pulleys have friction, and the bottom block has weight. Would you need more or fewer ropes in real life? Why?
