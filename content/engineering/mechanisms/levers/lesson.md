---
order: 3
unit: levers
title: Levers
summary: "A lever trades force for distance: a small push far from the pivot lifts a big load near it, and your hand moves farther than the load. Students find where to put a pivot by testing, work out the push from turning effects, meet the three classes of lever (including the one in their arm), and design a lever to a brief."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A 600 N rock, a 2 m bar, and a block to rest it on. You can push 200 N at most. Where does the block go?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8528
  url: http://127.0.0.1:8528/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: levers.yml#explain, caption: "Pivot 0.5 m from a 600 N rock: a 200 N push 1.5 m away lifts it, and your hand moves 3 times as far." }
explainClip:
  query: { code: "@levers.yml#explain", fresh: 1, id: explain }
  caption: "Trading force for distance"
  say: "The pivot is close to the rock; you push far from it."
  clip:
    - caption: { text: "Rock: 600 N, 0.5 m from the pivot. Push: 1.5 m from the pivot.", say: "The rock is close to the pivot. Your push is three times as far away." }
    - caption: { text: "600 × 0.5 = 300, and 300 ÷ 1.5 = 200 N: just enough.", say: "So a third of the force is enough." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 1700
    - expect: { selector: "#gnote", contains: "Lifted" }
    - caption: { text: "But your hand moves 0.3 m to lift the rock 0.1 m: 3 times as far.", say: "But your hand moves three times as far as the rock." }
    - wait: 1500
---
Gears trade speed for turning force. A **lever** makes the same kind of trade with a bar and a **pivot** (the point it turns on, also called a fulcrum).

The job: a **600 N** rock (about 60 kg) sits on one end of a **2 m** bar. You can push down on the other end with **200 N** at most. Where should the pivot go?

Forces are in **newtons** (N); 10 N is about the weight of 1 kg.

## Predict: move the pivot

```step
stage: predict
insight: "Committing to which way the push changes as the pivot moves tests the new move before the board shows it. Each wrong option is a real slip: the middle is best, nothing changes, or the push depends on speed."
check:
  type: predict
  q: "The pivot starts in the middle of the bar. You move it closer to the rock. The push you need…"
  options: ["Gets smaller", "Gets bigger", "Stays the same: the rock weighs the same", "Is smallest with the pivot in the middle"]
  actual: "Smaller. With the pivot near the rock, your push is far from the pivot and the rock is close to it, so each newton of push turns the bar more."
```

## Try: find the spot

```step
stage: run
insight: "Testing settles the prediction: with the pivot in the middle the rock does not move; slide it towards the rock until a 200 N push lifts it. The numbers are hidden so students find the spot."
try: { playground: board, starter: "levers.yml#run", height: 520 }
tasks:
  - check: { type: board, text: "With the pivot in the middle, press Push.", when: "s = 1 and f_m = 1", explain: "It does not move: in the middle, you would need to push as hard as the rock weighs, 600 N." }
  - check: { type: board, text: "Slide the pivot towards the rock, pushing each time, until the rock lifts.", when: "l = 1", explain: "Close enough to the rock, your 200 N lifts it." }
  - check:
      type: number
      q: "What is the farthest from the rock the pivot can be, and still lift it (in metres)?"
      answer: 0.5
      feedback:
        - [0.6, "At 0.6 m the rock does not move. Try one step closer."]
        - [1.5, "That is the distance from the pivot to your push. How far is the pivot from the rock?"]
      explain: "0.5 m. Any closer also works, but 0.5 m is the last spot where 200 N is enough."
```

### Middle

### Find the spot

### How far?

Was your prediction right? The closer the pivot is to the load, the smaller the push.

## Worked example: turning effects balance

```step
stage: investigate
insight: "The worked example gives the rule: force × distance from the pivot (a turning effect, or moment) is the same on both sides when it balances. Then the trade: the hand moves farther by the same factor. The faded example has a pivot at 0.4 m. Leo measures from the end of the bar, planted after the method."
tasks:
  - check:
      type: answer
      q: "Now the pivot is 0.4 m from the 600 N rock, and you push at the other end. What push balances it, in newtons?"
      answer: "150"
      feedback:
        - ["120", "Your push is 1.6 m from the pivot, not 2 m: measure from the pivot."]
        - ["2400", "Turning effects balance: 600 × 0.4 = push × 1.6. Divide to find the push."]
      explain: "600 × 0.4 = 240, and 240 ÷ 1.6 = 150 N."
  - check:
      type: answer
      q: "With the pivot at 0.4 m, how far does your hand move to lift the rock 0.1 m, in metres?"
      answer: "0.4"
      feedback:
        - ["0.025", "Your hand is farther from the pivot than the rock, so it moves farther, not less."]
        - ["0.1", "Your hand is 4 times as far from the pivot as the rock, so it moves 4 times as far."]
      explain: "1.6 ÷ 0.4 = 4, so your hand moves 4 × 0.1 = 0.4 m. A quarter of the force, four times the distance."
  - check:
      type: bug
      code: "working.txt#leo"
      text: "Leo thinks the push is 120 N. Click the line where Leo's working first goes wrong."
      answer: 3
      fault: logic
      misconception: lever-distance-from-end
      explain: "Line 3: distances are measured from the pivot, not the end of the bar. The push is 1.6 m from the pivot, so it is 240 ÷ 1.6 = 150 N."
```

### Balance 600 N with the pivot at 0.5 m, then 0.4 m

```worked
600 \times 0.5 = 300 :: The rock's turning effect: its force times its distance from the pivot.
2 - 0.5 = 1.5 \text{ m} :: Your push is at the other end: 1.5 m from the pivot.
300 \div 1.5 = 200 \text{ N} :: Your push must turn as much: push × 1.5 = 300.
\text{advantage} = 600 \div 200 = 3 :: The lever makes your push 3 times as strong (its mechanical advantage).
1.5 \div 0.5 = 3 :: Your hand is 3 times as far from the pivot as the rock…
0.1 \times 3 = 0.3 \text{ m} :: …so to lift the rock 0.1 m, your hand moves 0.3 m. Less force, more distance.
```

Now the pivot is 0.4 m from the rock. Start with the push.

### Distance

### Find the mistake

Leo puts the pivot 0.4 m from the rock.

## Vary: three kinds of lever

```step
stage: modify
insight: "The pivot need not be in the middle. In a wheelbarrow the load sits between the pivot (the wheel) and the push; in an arm the push (the muscle) sits between the pivot (the elbow) and the load. The arm needs more force than the load, and the question asks why a body would do that: it gains distance and speed."
try: { playground: board, starter: "levers.yml#vary-barrow", height: 540 }
tasks:
  - starter: "levers.yml#vary-barrow"
    check: { type: board, text: "A wheelbarrow: the wheel is the pivot and you lift the handles. Slide the 600 N load towards the wheel until your 200 N lifts it.", when: "l = 1 and k = 2", explain: "At 0.5 m from the wheel: 600 × 0.5 = 300 = 200 × 1.5. The load between the pivot and the push is a class 2 lever." }
  - starter: "levers.yml#vary-arm"
    check: { type: board, text: "Your forearm: the elbow is the pivot, the muscle pulls 5 cm from it, and a 50 N ball is in your hand 35 cm away. Lift the ball.", when: "l = 1 and k = 3", explain: "It lifts, but the muscle pulls 350 N: 7 times the ball's weight. A push between the pivot and the load is a class 3 lever." }
  - check:
      type: number
      q: "How hard must the muscle pull to hold the 50 N ball (in newtons)?"
      answer: 350
      feedback:
        - [7, "That is how many times farther the hand is from the elbow. Times the 50 N."]
      explain: "50 × 0.35 = 17.5, and 17.5 ÷ 0.05 = 350 N."
  - check:
      type: question
      q: "Your arm needs 350 N to hold 50 N. Why is it built that way?"
      options: ["The hand moves 7 times as far and as fast as the muscle, so a small muscle movement swings the hand a long way", "It is a design fault", "The muscle is weak, so it needs a big force", "A class 3 lever needs less force than the load"]
      answer: 0
      feedback: [null, "Bodies trade force for speed and reach on purpose: think of throwing.", "The muscle is strong: 350 N.", "It needs more: 350 N for 50 N."]
      explain: "Every lever trades force for distance. A class 3 lever gives up force to gain distance and speed: arms, tweezers, fishing rods, a hockey stick."
```

### A wheelbarrow

### Your arm

### Muscle force

### Why?

## Practise: levers

```step
stage: practise
insight: "Turning effects from the pivot, the distance trade, and the three classes by where the pivot, the load and the push sit."
tasks:
  - check:
      type: answer
      q: "A seesaw: a 300 N child sits 1.2 m from the pivot. Where must a 400 N child sit to balance, in metres from the pivot?"
      answer: "0.9"
      feedback:
        - ["1.6", "The heavier child sits closer, not farther: 300 × 1.2 = 400 × distance."]
      explain: "300 × 1.2 = 360, and 360 ÷ 400 = 0.9 m."
  - check:
      type: answer
      q: "A crowbar: the load is 0.1 m from the pivot and you push 0.8 m from it. How many times as strong is your push (the mechanical advantage)?"
      answer: "8"
      feedback:
        - ["0.125", "Your distance over the load's: 0.8 ÷ 0.1."]
      explain: "0.8 ÷ 0.1 = 8: your push is 8 times as strong, and your hand moves 8 times as far."
  - check:
      type: sort
      q: "Where is the pivot? Sort each tool by its kind of lever."
      options: ["Class 1: pivot in the middle", "Class 2: load in the middle", "Class 3: push in the middle"]
      items:
        - ["Scissors", "Class 1: pivot in the middle"]
        - ["Crowbar lifting a rock", "Class 1: pivot in the middle"]
        - ["Wheelbarrow", "Class 2: load in the middle"]
        - ["Nutcracker", "Class 2: load in the middle"]
        - ["Bottle opener", "Class 2: load in the middle"]
        - ["Tweezers", "Class 3: push in the middle"]
        - ["Fishing rod", "Class 3: push in the middle"]
      explain: "Find the pivot first. Then ask which is in the middle: the pivot, the load or the push. Classes 1 and 2 can make your push stronger; class 3 always makes it weaker, but faster."
  - check:
      type: question
      q: "A lever lets a 100 N push lift a 500 N load. The load rises 4 cm. How far does the push move?"
      options: ["20 cm", "4 cm", "0.8 cm", "500 cm"]
      answer: 0
      feedback: [null, "Less force means more distance.", "That divides by 5; the push moves farther, not less.", "Use the advantage, 5, not the load."]
      explain: "5 times the force, so 5 times the distance: 5 × 4 = 20 cm."
```

### Seesaw

### Crowbar

### Three kinds

### Distance

## Make: a lever to a brief

```step
stage: make
insight: "Two criteria pull against each other: more advantage means more hand travel. Students reason from both to a narrow band of pivot positions (or move the push in), the same move as the gear briefs."
try: { playground: board, starter: "levers.yml#make", height: 600 }
tasks:
  - hint: ["The load is 900 N and you push 200 N: you need an advantage of at least 900 ÷ 200 = 4.5.", "Your hand may move 0.5 m to lift the load 0.1 m: an advantage of at most 5.", "Your distance from the pivot ÷ the load's distance must be between 4.5 and 5. With the push at the end, try a pivot between 0.3 m and 0.4 m."]
    check: { type: board, text: "Lift 900 N with a 200 N push, with your hand moving no more than 0.5 m. Move the pivot (or your push) and lift.", when: "load_n = 900 and push_n = 200 and travel_m = 0.5 and p = 1 and l = 1", explain: "An advantage between 4.5 and 5 meets both: for example the pivot at 0.35 m (advantage 4.7, hand moves 0.47 m)." }
  - check: { type: reflect, text: "In one or two sentences: where your pivot and push are, how the design meets each criterion, and what it gives up." }
```

### Two criteria

### Evaluate

Stretch: a real bar has weight. Which side of the pivot would its weight help, and which would it hinder?
