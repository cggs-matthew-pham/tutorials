---
order: 1
unit: gears
title: Gear up the winch
summary: "A gear ratio trades speed for turning force: a small gear driving a big gear turns the output slower but stronger, by the same factor. Students test gears on a winch, work out the ratio, speed, strength and lift time, then choose a pair that meets a brief, and find a brief where the constraints conflict."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A small motor can lift 200 g. The bucket is 450 g. You can't change the motor, but you have a box of gears. How do you lift it, and what do you give up?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8500
  url: http://127.0.0.1:8500/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: winch.yml#explain-pic, caption: "An 8-tooth gear on the motor drives a 24-tooth gear on the winch: 3 times slower, 3 times stronger." }
explainClip:
  query: { code: "@winch.yml#explain", fresh: 1, id: explain }
  caption: "Trading speed for strength"
  say: "The small gear on the motor drives the big gear on the winch."
  clip:
    - caption: { text: "The motor's 8-tooth gear drives the winch's 24-tooth gear.", say: "Watch the orange dots." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 1900
    - caption: { text: "One motor turn moves the winch a third of a turn: 3 times slower.", say: "One motor turn is only a third of a winch turn." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(2)" }
    - wait: 4600
    - expect: { selector: "#gnote", contains: "Lifted" }
    - caption: { text: "But 3 times stronger: it lifts 600 g, not 200 g.", say: "Three times slower, but three times stronger." }
    - wait: 1500
---
A motor turns fast but can only lift a little. A **winch** winds rope onto a drum to lift a load. Put a **gear** on the motor (the **driver**) and a gear on the winch (the **driven** gear), and the teeth push each other round.

The brief: the motor turns **120 times a minute** and lifts **200 g** with no gears. The drum winds **0.1 m** of rope each turn. Lift a **450 g** bucket **1 m** in **15 s or less**. The kit has one each of 8, 16, 24 and 40-tooth gears.

## Predict: small gear, big gear

```step
stage: predict
insight: "Committing to what a small-to-big gear pair does tests the new move before students see it: slower and stronger, by the same factor. Each wrong option is a real slip: bigger is faster, or only one thing changes."
check:
  type: predict
  q: "The 8-tooth gear on the motor drives the 24-tooth gear on the winch. Compared with the motor, the winch turns…"
  options: ["3 times slower and 3 times stronger", "3 times faster and 3 times stronger", "3 times slower, but no stronger", "The same speed, but 3 times stronger"]
  actual: "3 times slower and 3 times stronger. The speed and the strength change by the same factor, in opposite directions."
```

## Try: turn it and load it

```step
stage: run
insight: "Counting winch turns settles the speed half of the prediction; adding load until it stalls settles the strength half. Numbers are hidden so students find both by testing."
try: { playground: board, starter: "winch.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "Press Turn the motor once and watch the orange dot on the winch gear. How far round does it go?", when: "turns_m >= 1", explain: "A third of a turn: the 8 teeth of the motor gear push 8 of the winch gear's 24 teeth past, and 8 is a third of 24." }
  - check: { type: board, text: "Add 50 g at a time and lift, until the winch stalls.", when: "s = 1 and load_g > 450", explain: "It lifts 600 g, then stalls at 650 g: three times what the motor lifts with no gears." }
  - check:
      type: number
      q: "What is the heaviest bucket the winch lifted (in grams)?"
      answer: 600
      feedback:
        - [650, "That is the load where it stalled. Take one 50 g step back."]
        - [200, "200 g is the motor with no gears. Test the gears on the board."]
      explain: "600 g: 3 × 200 g. The gears make the winch 3 times stronger."
```

### Count the turns

### Find the stall

### The heaviest lift

Was your prediction right? Slower **and** stronger, by the same 3.

## Worked example: does 8 → 24 meet the brief?

```step
stage: investigate
insight: "The worked example models the move with numbers: ratio = driven ÷ driver, divide the speed, multiply the strength, then the time and both criteria. The faded example practises it on 16 → 40. Sam's upside-down ratio is planted after the method."
tasks:
  - check:
      type: answer
      q: "Now 16 → 40 (ratio 2.5). How many turns a minute does the winch make?"
      answer: "48"
      feedback:
        - ["300", "That is 120 × 2.5. A big driven gear is slower: divide by the ratio."]
        - ["120", "The gears change the speed: divide the motor's 120 by the ratio."]
      explain: "120 ÷ 2.5 = 48 turns a minute."
  - check:
      type: answer
      q: "16 → 40: what is the heaviest bucket it can lift, in grams?"
      answer: "500"
      feedback:
        - ["80", "That is 200 ÷ 2.5. Slower means stronger: multiply by the ratio."]
        - ["200", "The gears change the strength too: multiply by the ratio."]
      explain: "200 × 2.5 = 500 g."
  - check:
      type: answer
      q: "16 → 40: how many seconds to lift the bucket 1 m?"
      answer: "12.5"
      feedback:
        - ["0.21", "That is in minutes. Times by 60 for seconds."]
        - ["4.8", "Divide the 10 winch turns by the 48 turns a minute, not the other way round."]
      explain: "1 m needs 10 winch turns. 10 ÷ 48 = 0.208 minutes = 12.5 s. It lifts 450 g (500 ≥ 450) within 15 s, so 16 → 40 passes too."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam's winch stalls with the 450 g bucket. Click the line where Sam's working first goes wrong."
      answer: 2
      fault: logic
      misconception: gear-ratio-upside-down
      explain: "Line 2: the ratio is driven ÷ driver. The 8-tooth gear is now the driven one, so the ratio is 8 ÷ 24 = 1/3. The winch turns 3 times faster and is 3 times weaker: it lifts only about 67 g."
```

### Check 8 → 24, then 16 → 40

```worked
\text{ratio} = 24 \div 8 = 3 :: Ratio = driven teeth ÷ driver teeth. The winch needs 3 motor turns for each of its own.
120 \div 3 = 40 \text{ turns a minute} :: Slower by the ratio: divide the motor's speed.
200 \times 3 = 600 \text{ g} :: Stronger by the same ratio: multiply what the motor lifts.
1 \div 0.1 = 10 \text{ winch turns} :: The drum winds 0.1 m each turn, so 1 m takes 10 turns.
10 \div 40 = 0.25 \text{ min} = 15 \text{ s} :: Time = turns ÷ turns a minute; times 60 for seconds.
600 \ge 450 \;\checkmark \quad 15 \le 15 \;\checkmark :: Check both criteria: strong enough and fast enough. 8 → 24 passes.
```

Now do the same for 16 → 40. The ratio is $40 \div 16 = 2.5$. Start with the winch's speed.

### Strength

### Time and criteria

### Find the mistake

Sam wants a faster lift, so swaps the gears round.

## Vary: change one thing

```step
stage: modify
insight: "Each task changes one thing in the brief: a lighter load, a faster motor, then a load so heavy that no pair meets both criteria. The last is the engineering point: constraints can conflict, and someone has to decide."
try: { playground: board, starter: "winch.yml#vary-light", height: 560 }
tasks:
  - starter: "winch.yml#vary-light"
    check: { type: board, text: "The bucket is now 300 g. Find the pair that lifts it fastest within 15 s, and lift with it.", when: "load_g = 300 and r = 1.5 and l = 1", explain: "16 → 24 (ratio 1.5): exactly strong enough (300 g) and the fastest at 7.5 s. A lighter load lets you give up less speed." }
  - starter: "winch.yml#vary-motor"
    check: { type: board, text: "A faster motor: 180 turns a minute, and the 450 g bucket again. Which pair is fastest now? Lift with it.", when: "rpm_w = 72 and l = 1 and load_g = 450", explain: "16 → 40 (8.3 s). 8 → 24 also passes (10 s); 8 → 40 is too slow (16.7 s)." }
  - starter: "winch.yml#vary-heavy"
    check: { type: board, text: "The bucket is now 700 g. Find a pair that can lift it at all, and lift.", when: "load_g = 700 and l = 1", explain: "Only 8 → 40 (ratio 5, up to 1000 g) lifts it, and it takes 25 s. No pair is both strong enough and fast enough." }
  - check:
      type: question
      q: "No pair lifts 700 g within 15 s. What should the engineer do?"
      options: ["Go back to the client with the trade-off: allow 25 s, lighten the load, or get a stronger motor", "Use 8 → 40 and say it meets the brief", "Put the 40-tooth gear on the motor to make it faster", "Nothing: the brief is impossible, so stop"]
      answer: 0
      feedback: [null, "It lifts it, but misses the time limit. Say so.", "Then it is 5 times weaker: it stalls.", "Engineers change a constraint or the design, and explain why."]
      explain: "When constraints conflict, an engineer shows what each choice costs and agrees which constraint can move."
```

### A lighter bucket

### A faster motor

### Too heavy

### When nothing passes

## Practise: ratios

```step
stage: practise
insight: "Ratio the right way up, divide for speed, multiply for strength, and a real-world trade-off."
tasks:
  - check:
      type: answer
      q: "The 16-tooth gear on the motor drives the 24-tooth gear on the winch. What is the ratio?"
      answer: "1.5"
      feedback:
        - ["2/3", "Driven ÷ driver: the winch's gear goes on top."]
      explain: "24 ÷ 16 = 1.5."
  - check:
      type: answer
      q: "Motor 120 turns a minute, ratio 5. How many turns a minute does the winch make?"
      answer: "24"
      feedback:
        - ["600", "A bigger driven gear turns slower: divide by the ratio."]
      explain: "120 ÷ 5 = 24."
  - check:
      type: number
      q: "The 24-tooth gear on the motor drives the 16-tooth gear on the winch. The motor lifts 200 g with no gears. What is the heaviest lift now, to the nearest gram?"
      answer: 133
      tolerance: 1
      feedback:
        - [300, "The driven gear is smaller here, so the ratio is 16 ÷ 24, less than 1: weaker, not stronger."]
      explain: "Ratio 16 ÷ 24 = 2/3, so 200 × 2/3 ≈ 133 g. Faster, but weaker."
  - check:
      type: question
      q: "On a bike's lowest gear (small gear at the pedals, big gear at the back wheel) hills feel easy. What do you give up?"
      options: ["Speed: you pedal many times for each turn of the wheel", "Nothing: lower gears are just better", "Strength: it is harder to push", "Grip on the road"]
      answer: 0
      feedback: [null, "Every gear is a trade.", "It is easier to push: that is the strength you gain.", "Gears don't change grip."]
      explain: "Small driving big: slower and stronger. Easy on hills, slow on the flat."
```

### Ratio

### Speed

### Strength

### A bike

## Make: write a brief

```step
stage: make
insight: "Writing a brief with exactly one passing pair reverses the process: students reason from the criteria to the gears, and the board tests every pair in the kit, as an engineer's checking tool would."
try: { playground: board, starter: "winch.yml#make", height: 600 }
tasks:
  - hint: ["Start from a pair and its numbers: what is the most it can lift, and how long does it take?", "Choose a load only one pair is strong enough for, or a time limit only one pair is fast enough for.", "For example 550 g: only 8 → 24 (600 g) and 8 → 40 (1000 g) are strong enough. Now pick a time limit only one of them meets."]
    check: { type: board, text: "Change the bucket and the time limit until exactly one pair in the kit meets the brief.", when: "n_pass = 1", explain: "One pair passes: you have reasoned from the criteria back to the gears." }
  - check: { type: reflect, text: "In one or two sentences: which pair meets your brief, how it meets each criterion, and what it gives up." }
```

### Exactly one pair

### Evaluate

Stretch: write a brief where no pair passes, then argue which constraint the client should relax, and why.
