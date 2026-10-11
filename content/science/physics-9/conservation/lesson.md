---
order: 8
node: AC9S9U05 n1
unit: conservation
title: Where does the energy go?
summary: "Energy is never made or destroyed: it only moves and changes type. This is the law of conservation of energy. When energy seems to disappear (a ball bounces lower, a car slows down), it has gone into heat and sound in the surroundings. The total is always the same."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8286
  url: http://127.0.0.1:8286/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Potential, kinetic, and heat and sound: the three bars always add up to the same total, marked by the dashed line." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Conservation of energy"
  say: "Energy is never made or destroyed. The total always stays the same."
  clip:
    - caption: { text: "Turn friction on and run the coaster. Watch the three bars and the total line.", say: "Turn friction on and run the coaster. Watch the bars and the total." }
    - click: "Friction: off"
    - wait: 2600
    - click: "Play"
    - caption: { text: "Potential becomes kinetic; friction turns some into heat and sound.", say: "Potential becomes kinetic, and friction turns some into heat and sound." }
    - wait: 4200
    - caption: { text: "The bars change, but they always add up to the same total. Nothing is lost.", say: "The bars change, but they always add up to the same total." }
    - wait: 3200
hook: "Drop a ball and it bounces back up, but never quite as high. Each bounce is lower until it stops. Has its energy been used up?"
---
In Year 8 you followed energy through systems and found by-products. This lesson turns that into a law.

## Engage: the bouncing ball

```step
stage: predict
insight: "'Used up' and 'disappears' are the hinge misconceptions; the bouncing ball forces a choice between losing energy and moving it."
check:
  type: predict
  q: "A ball bounces lower each time until it stops. What happened to its energy?"
  options: ["It became heat and sound in the ball, the floor and the air", "It was used up", "It disappeared when the ball stopped", "It went back into the person who dropped it"]
  actual: "It became heat and sound. Each bounce, some of the ball's energy is transformed into heat (the ball and floor warm very slightly) and sound (the bounce you hear). None of it disappears: it is spread into the surroundings."
```

## Explore: count it all

```step
stage: run
insight: "Running with and without friction, and seeing the total line never move, makes 'the total stays the same' an observation before it is a law."
try: { playground: board, starter: "boards.yml#coaster", height: 640 }
tasks:
  - check: { type: board, text: "Run the coaster with friction off. Does the total change?", when: "r >= 1 and f = 0" }
  - check: { type: board, text: "Now turn friction on and run it. Where does energy go, and does the total change?", when: "f = 1 and q >= 20" }
```

### No friction

### With friction

## Explain: the law

```step
stage: investigate
insight: "Stating the law, accounting for every joule in a calculation, and re-reading 'lost' energy as 'transferred to the surroundings' resolves the hinge."
tasks:
  - check:
      type: question
      q: "What does the law of conservation of energy say?"
      options: ["Energy can't be made or destroyed, only transferred or transformed; the total stays the same", "You should save energy by switching things off", "Energy is used up when things move"]
      answer: 0
      feedback: [null, "That's 'conserving' energy in everyday speech, a different idea.", "Moving transforms energy; it doesn't use it up."]
      explain: "In any system, total energy in = total energy out."
  - check:
      type: number
      q: "A coaster car has 150 kJ in total. At one point it has 90 kJ of potential energy and 40 kJ of kinetic energy. How many kJ have become heat and sound?"
      answer: 20
      explain: "150 − 90 − 40 = 20 kJ. Every kJ is accounted for."
  - check:
      type: question
      q: "People say a car 'loses' energy when it brakes. What really happens?"
      options: ["Its kinetic energy becomes heat in the brakes, which spreads into the air", "The energy is destroyed by the brakes", "The energy goes back into the fuel"]
      answer: 0
      feedback: [null, "Energy can't be destroyed.", "It never flows back into fuel. (Hybrid and electric cars turn some of it into electrical energy stored in a battery.)"]
      explain: "'Lost' means 'transferred somewhere we can't use it'. Feel a bike's brakes after a long downhill: they're hot."
  - check:
      type: question
      q: "Why can a pendulum never swing higher than where it started?"
      options: ["It would need more energy than it had: energy can't be made", "Gravity gets stronger", "Pendulums only swing lower"]
      answer: 0
      feedback: [null, "Gravity doesn't change.", "That's what happens, but why?"]
      explain: "With no extra energy put in, the most it can do is reach its starting height, and friction makes it a little lower each swing."
  - check: { type: reflect, text: "I can state the law of conservation of energy and use it to account for all the energy in a system." }
```

### The law

### Count every kJ

### Braking

### The pendulum

### In your own words

In your book: draw the three bars for the coaster at the start, at the bottom of the first dip and at the end (with friction). Show that each set adds up to the same total.

## Elaborate: a lot of friction

```step
stage: modify
tier: typical
insight: "A car that comes to rest shows the end point of every real system: all the energy spread out as heat."
try: { playground: board, starter: "boards.yml#stuck", height: 640 }
tasks:
  - check: { type: board, text: "This track has much more friction. Run the car until it stops.", when: "r >= 1" }
  - check:
      type: question
      q: "The car ended up stopped in a dip. Where is its starting energy now?"
      options: ["Most is heat and sound in the surroundings; the rest is potential energy where it rests", "It has all gone", "It is kinetic energy, waiting to be used"]
      answer: 0
      feedback: [null, "The total line didn't change.", "A stopped car has no kinetic energy."]
      explain: "The bars still add up to the total: heat and sound, plus the potential energy of its resting height."
```

### Lots of friction

### Where it went

## Elaborate: perpetual motion

```step
stage: modify
tier: wider
insight: "Perpetual motion machines are a classic test of the law: any that claim to run forever while doing work break it."
check:
  type: question
  q: "An inventor claims a wheel that keeps spinning forever and also powers a light. Why is this impossible?"
  options: ["The light's energy and the friction heat must come from somewhere; with no energy in, the wheel must slow down", "Wheels can't power lights", "It would spin too fast"]
  answer: 0
  feedback: [null, "Generators do exactly that, when something keeps turning them.", "Speed isn't the problem; energy is."]
  explain: "Energy out (light, heat) with nothing in would mean making energy. Every machine needs an input."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the bouncing ball with what the coaster showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Conservation of energy:** energy is never made or destroyed; it is only transferred or transformed. The total stays the same.
- Energy that seems "lost" or "used up" has been transferred to the surroundings, usually as heat and sound.
- Total energy in = total energy out, so you can account for every joule.
