---
order: 2
unit: gears
title: Gear trains
summary: "More than two gears. A gear between two others (an idler) changes the direction but not the ratio; two gears on one axle make a compound train, whose stage ratios multiply. Students test an idler, work out compound trains, find one for a heavy brief, and see why big ratios come in stages."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "The bucket is now 1500 g: more than any pair in the box can lift. You can use as many gears as you like. How?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8509
  url: http://127.0.0.1:8509/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: trains.yml#explain, caption: "8 → 24, then 8 → 40 on the same axle: 3 × 5 = 15 times slower and stronger." }
explainClip:
  query: { code: "@trains.yml#explain", fresh: 1, id: explain }
  caption: "Two stages multiply"
  say: "The 24-tooth gear and the second 8-tooth gear share an axle."
  clip:
    - caption: { text: "Stage 1: 8 → 24, ratio 3. Stage 2: 8 → 40 on the same axle, ratio 5.", say: "The first stage is a ratio of 3. The second is 5." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 1900
    - caption: { text: "One motor turn is a fifteenth of a winch turn: 3 × 5 = 15.", say: "Together they multiply: 3 times 5 is 15." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(2)" }
    - wait: 4700
    - expect: { selector: "#gnote", contains: "Lifted" }
    - caption: { text: "15 times stronger, so it lifts 1500 g. But 15 times slower: 75 s.", say: "Fifteen times stronger, and fifteen times slower." }
    - wait: 1500
---
In Gear up the winch, one pair of gears traded speed for strength. The strongest pair in the box, 8 → 40, makes the winch 5 times stronger: it lifts 1000 g.

The new brief: the same motor (**120 turns a minute**, lifts **200 g** with no gears) and drum (**0.1 m** a turn). Lift a **1500 g** bucket **1 m** in **40 s or less**. The box now has **as many** 8, 16, 24 and 40-tooth gears as you need.

Two new moves: a gear **between** two others, and two gears on **one axle**.

## Predict: a gear in the middle

```step
stage: predict
insight: "A big gear in the middle looks as if it must change something. Committing first makes the result stick: an idler changes the direction only. Each wrong option is a real slip: the middle gear's own ratio, or multiplying both meshes without noticing they cancel."
check:
  type: predict
  q: "Put a 40-tooth gear between the 8 and the 24: 8 → 40 → 24. Compared with 8 → 24 on its own, the winch now…"
  options: ["Turns at the same speed with the same strength, but the other way round", "Turns 5 times slower and is 5 times stronger (40 ÷ 8)", "Turns 15 times slower and is 15 times stronger (5 × 3)", "Turns faster, because the big gear spins it"]
  actual: "Same speed, same strength, other direction. 40 ÷ 8 × 24 ÷ 40 = 24 ÷ 8: the idler's teeth cancel out, and each mesh reverses the turn."
```

## Try: the idler

```step
stage: run
insight: "Watching the dots settles the direction; loading until it stalls settles the strength (the same 600 g as 8 → 24). Swapping the idler for another size and still lifting 600 g shows its size does not matter."
try: { playground: board, starter: "trains.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "Press Turn the motor once. Watch the orange dots on the motor and winch gears: which way does each turn?", when: "turns_m >= 1", explain: "The motor and the winch turn the same way: two meshes, and each one reverses the turn. With 8 → 24 alone they turn opposite ways." }
  - check: { type: board, text: "Add 50 g at a time and lift, until the winch stalls.", when: "s = 1 and load_g > 450", explain: "It lifts 600 g and stalls at 650 g: exactly what 8 → 24 does on its own." }
  - check: { type: board, text: "Change Gear 2 (the idler) to another size and lift 600 g again.", when: "l = 1 and load_g = 600 and t_2 < 40", explain: "Any idler gives the same 600 g. The ratio is still last ÷ first: 24 ÷ 8 = 3." }
  - check:
      type: number
      q: "With the idler in place, what is the heaviest bucket the winch can lift (in grams)?"
      answer: 600
      feedback:
        - [1000, "That is 8 → 40 on its own. The 40 is an idler here: it passes the turn on to the 24."]
        - [3000, "That multiplies 3 and 5, but the meshes are 40 ÷ 8 and 24 ÷ 40: the 40s cancel."]
      explain: "600 g, the same as 8 → 24: 40 ÷ 8 × 24 ÷ 40 = 3, and 200 × 3 = 600."
```

### Which way?

### Find the stall

### Change the idler

### The heaviest lift

Was your prediction right? An idler changes the **direction**, not the ratio. Engineers use one to reverse a turn, or to bridge a gap between two gears.

## Worked example: two gears on one axle

```step
stage: investigate
insight: "The worked example models the compound move: put a small gear on the same axle as a big one, so the next stage starts again from a small driver. Stage ratios multiply. The first train is strong enough but too slow; the faded one passes. Kai's adding is planted after the method."
tasks:
  - check:
      type: answer
      q: "Now 16 → 40, then 8 → 24 on the same axle as the 40. What is the overall ratio?"
      answer: "7.5"
      feedback:
        - ["5.5", "That adds 2.5 and 3. Stages multiply: 2.5 × 3."]
        - ["3", "That is only the second stage. Multiply by the first stage, 40 ÷ 16."]
      explain: "40 ÷ 16 = 2.5, 24 ÷ 8 = 3, and 2.5 × 3 = 7.5."
  - check:
      type: answer
      q: "16 → 40 = 8 → 24: what is the heaviest bucket it can lift, in grams?"
      answer: "1500"
      feedback:
        - ["1100", "That uses 5.5, the stages added. The overall ratio is 2.5 × 3 = 7.5."]
      explain: "200 × 7.5 = 1500 g: just enough."
  - check:
      type: answer
      q: "16 → 40 = 8 → 24: how many seconds to lift the bucket 1 m?"
      answer: "37.5"
      feedback:
        - ["0.625", "That is in minutes. Times by 60 for seconds."]
        - ["1.6", "Divide the 10 winch turns by the winch's 16 turns a minute, not the other way round."]
      explain: "The winch turns 120 ÷ 7.5 = 16 times a minute. 10 turns ÷ 16 = 0.625 min = 37.5 s. It lifts 1500 g within 40 s: it passes."
  - check:
      type: bug
      code: "working.txt#kai"
      text: "Kai thinks the train lifts the 1500 g bucket. Click the line where Kai's working first goes wrong."
      answer: 4
      fault: logic
      misconception: compound-ratios-add
      explain: "Line 4: stage ratios multiply, they don't add. Each stage makes the next one 3 times (then 5 times) slower and stronger again: 3 × 5 = 15, so it lifts 3000 g (but takes 75 s)."
```

### Check 8 → 24 = 8 → 40, then 16 → 40 = 8 → 24

```worked
\text{stage 1: } 24 \div 8 = 3 :: The motor's 8 drives a 24: a ratio of 3, as before.
\text{stage 2: } 40 \div 8 = 5 :: An 8 on the 24's axle turns with it, and drives a 40: the next stage starts small again.
3 \times 5 = 15 :: Stages multiply: the second stage slows down a gear that is already 3 times slower.
120 \div 15 = 8 \text{ turns a minute} :: Slower by the overall ratio.
200 \times 15 = 3000 \text{ g} :: Stronger by the same ratio.
10 \div 8 = 1.25 \text{ min} = 75 \text{ s} :: 1 m takes 10 winch turns.
3000 \ge 1500 \;\checkmark \quad 75 \le 40 \;\times :: Strong enough, but too slow. Too much ratio costs time.
```

Now 16 → 40 = 8 → 24. Stage 1 is $40 \div 16 = 2.5$. Start with the overall ratio.

### Strength

### Time and criteria

### Find the mistake

Kai uses the same train as the worked example.

## Vary: choose your train

```step
stage: modify
insight: "Students choose all four gears to meet the brief, then to lift a heavier load as fast as possible: the same reasoning from criteria back to ratio, now with products. The question names why compound trains exist."
try: { playground: board, starter: "trains.yml#vary-brief", height: 600 }
tasks:
  - starter: "trains.yml#vary-brief"
    hint: ["The time limit sets the most ratio you can afford: 40 s is a ratio of 8 at most.", "The load sets the least: 1500 g ÷ 200 g = 7.5.", "Which two stage ratios multiply to between 7.5 and 8? Try 2.5 (16 → 40) and 3 (8 → 24)."]
    check: { type: board, text: "Choose four gears that lift 1500 g within 40 s, and lift with them.", when: "load_g = 1500 and l = 1 and time_s <= 40", explain: "A ratio of exactly 7.5 does it, in 37.5 s: 16 → 40 = 8 → 24, or 16 → 24 = 8 → 40 (1.5 × 5). Either order of stages works." }
  - starter: "trains.yml#vary-heavy"
    check: { type: board, text: "A 2500 g bucket, no time limit. Find the fastest train that can lift it, and lift.", when: "load_g = 2500 and l = 1 and r = 12.5", explain: "It needs a ratio of 2500 ÷ 200 = 12.5 or more; 5 × 2.5 = 12.5 (8 → 40 = 16 → 40) is the smallest, so the fastest: 62.5 s." }
  - check:
      type: question
      q: "A ratio of 15 from one pair would need an 8-tooth gear driving a 120-tooth gear. Why do engineers use two stages (3 × 5) instead?"
      options: ["A 120-tooth gear is 15 times as wide as the small one; two stages give 15 with gears that fit", "Two stages make the winch stronger than one pair with the same ratio", "One pair can only give a ratio up to 5", "Two stages turn the winch faster"]
      answer: 0
      feedback: [null, "The same ratio gives the same strength (and, with friction, two stages lose a little more).", "Any ratio is possible with one pair; the gears just get huge.", "The same ratio gives the same speed."]
      explain: "Big ratios come in stages so the gears stay a sensible size. Clocks, car gearboxes and electric screwdrivers all do this."
```

### Meet the brief

### Heavier still

### Why stages?

## Practise: trains

```step
stage: practise
insight: "Stage ratios multiply, idlers cancel, each mesh reverses the turn, and the overall ratio does speed and strength as before."
tasks:
  - check:
      type: answer
      q: "10 → 30, then 10 → 20 on the same axle. What is the overall ratio?"
      answer: "6"
      feedback:
        - ["5", "That adds 3 and 2. Stages multiply."]
      explain: "30 ÷ 10 = 3, 20 ÷ 10 = 2, and 3 × 2 = 6."
  - check:
      type: answer
      q: "A simple train 8 → 16 → 24: the 16 is an idler. What is the ratio?"
      answer: "3"
      feedback:
        - ["2", "That is only the first mesh. The 24 is the gear on the winch."]
        - ["6", "16 ÷ 8 × 24 ÷ 16: the 16s cancel, so it is just 24 ÷ 8."]
      explain: "Last ÷ first: 24 ÷ 8 = 3. The idler cancels out."
  - check:
      type: question
      q: "Three gears in a row, each meshing with the next. The motor gear turns clockwise. Which way does the last gear turn?"
      options: ["Clockwise", "Anticlockwise", "It depends on the sizes of the gears"]
      answer: 0
      feedback: [null, "Each mesh reverses the turn, and there are two meshes.", "Sizes change the speed, not the direction."]
      explain: "Two meshes: clockwise, then anticlockwise, then clockwise again."
  - check:
      type: answer
      q: "Motor 120 turns a minute, train 8 → 40 = 8 → 24 (ratio 15). How many turns a minute does the winch make?"
      answer: "8"
      feedback:
        - ["1800", "A bigger ratio is slower: divide by it."]
        - ["15", "Divide the motor's 120 by the ratio, 15."]
      explain: "120 ÷ 15 = 8."
  - check:
      type: question
      q: "A clock's hour hand turns 12 times slower than its minute hand. Its gears do this in two stages, 3 × 4. Which pairs could do it?"
      options: ["8 → 24, then 10 → 40 on the same axle", "8 → 24, then 8 → 40 on the same axle", "8 → 96 in one pair, then an idler", "12 → 24, then 12 → 36 on the same axle"]
      answer: 0
      feedback: [null, "24 ÷ 8 × 40 ÷ 8 = 3 × 5 = 15, not 12.", "That works, but it is one stage: a 96-tooth gear is the size problem stages avoid.", "24 ÷ 12 × 36 ÷ 12 = 2 × 3 = 6."]
      explain: "24 ÷ 8 = 3 and 40 ÷ 10 = 4: 3 × 4 = 12."
```

### Compound ratio

### Idler

### Direction

### Speed

### A clock

## Make: a brief only a train can meet

```step
stage: make
insight: "Writing a brief no single pair can meet, then meeting it, reverses the process again: students reason from the load to the least ratio, from the time to the most, then to two stages that multiply into the gap."
try: { playground: board, starter: "trains.yml#make", height: 640 }
tasks:
  - hint: ["The strongest single pair is 8 → 40: ratio 5, so 1000 g at most. Your bucket must be heavier.", "Each second of time limit allows a ratio of 0.2 here (40 s for a ratio of 8), so set a limit that leaves room.", "Find the least ratio (load ÷ 200), the most (time limit ÷ 5), then two stages that multiply to fit between."]
    check: { type: board, text: "Set a bucket heavier than 1000 g and a time limit, then choose a train that meets your brief and lift with it.", when: "load_g > 1000 and p = 1 and l = 1", explain: "No single pair lifts more than 1000 g, so only a compound train meets your brief." }
  - check: { type: reflect, text: "In one or two sentences: your brief, the train that meets it, how each stage's ratio adds up to the overall ratio, and what the train gives up." }
```

### A brief for a train

### Evaluate

Stretch: real meshes each lose about 5% of the turning force. Work out what your train can really lift, and whether it still meets your brief.
