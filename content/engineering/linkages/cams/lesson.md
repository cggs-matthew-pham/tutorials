---
order: 2
unit: motion
title: Cams and followers
summary: "A cam is a shaped wheel; a follower rests on it and rises and falls as it turns. The cam's shape decides the follower's path, which a displacement graph shows. Students read graphs from four cams, match cams to jobs, and choose a cam for a toy."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A toy bird must pop up, wait, and drop. A motor just turns. What shape of wheel turns one into the other?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8531
  url: http://127.0.0.1:8531/index.html
  readySelector: ".gearsvg"
  layout: full
explainPicture: { ref: cams.yml#explain, caption: "A snail cam lifts the follower slowly for a whole turn, then drops it suddenly." }
explainClip:
  query: { code: "@cams.yml#explain", fresh: 1, id: explain }
  caption: "A shape becomes a path"
  say: "The follower rests on the cam, and rides up and down its edge."
  clip:
    - caption: { text: "A snail cam: its edge gets farther from the axle all the way round, then steps back in.", say: "This is a snail cam." }
    - click: { selector: "#gpanel .oprow button:nth-of-type(1)" }
    - wait: 2600
    - caption: { text: "The graph shows the follower's height: a slow, steady rise, then a sudden drop.", say: "The follower rises slowly, then drops suddenly." }
    - caption: { text: "The cam's shape decides the follower's path.", say: "The shape decides the path." }
    - wait: 1000
---
A **cam** is a wheel with a shaped edge, turned by an axle. A **follower** rests on the edge and slides up and down in a guide as the cam turns. A **displacement graph** shows the follower's height against how far the cam has turned.

Cams time things: engine valves, toys, sewing machines, music boxes.

## Predict: a round cam off centre

```step
stage: predict
insight: "An eccentric cam is a circle on an off-centre axle. Students expect the follower to rise by the offset; it rises by twice the offset, the same move as the crank's stroke."
check:
  type: predict
  q: "A round cam has its axle 10 mm off centre. As it turns once, the follower moves up and down by…"
  options: ["20 mm", "10 mm", "0 mm: it is round", "30 mm"]
  actual: "20 mm. The edge is 10 mm closer than average on one side and 10 mm farther on the other: twice the offset, like a crank's stroke."
```

## Try: four cams

```step
stage: run
insight: "Turning each cam and reading its graph builds the link between shape and path before any rules: rest (dwell), steady rise, sudden drop."
try: { playground: board, starter: "cams.yml#run", height: 540 }
tasks:
  - check: { type: board, text: "Turn the eccentric cam once and watch the graph.", when: "c = 1 and t = 1", explain: "A smooth rise and fall: the graph is a wave." }
  - check: { type: board, text: "Choose the pear cam and turn it.", when: "c = 2 and t = 1", explain: "The follower rests for half a turn (a dwell), then rises and falls quickly." }
  - check: { type: board, text: "Choose the snail cam and turn it.", when: "c = 3 and t = 1", explain: "A slow, steady rise for a whole turn, then a sudden drop." }
  - check: { type: board, text: "Choose the heart cam and turn it.", when: "c = 4 and t = 1", explain: "A steady rise for half a turn and a steady fall for the other half: straight lines on the graph." }
```

### Eccentric

### Pear

### Snail

### Heart

Was your prediction right? The round cam's follower moved 20 mm: twice the offset.

## Worked example: read the graph

```step
stage: investigate
insight: "A steady rise is a straight line, so height is a proportion of the angle; students read and calculate heights at an angle. A match ties each shape to its path, and a question names why a snail cam must turn one way."
tasks:
  - check:
      type: answer
      q: "A snail cam with a 30 mm lift rises steadily for a whole turn. How high is the follower after 120°, in mm?"
      answer: "10"
      feedback:
        - ["20", "A snail cam takes the whole turn (360°) to rise, not half."]
      explain: "120 is a third of 360, and a third of 30 is 10 mm."
  - check:
      type: match
      q: "Match each cam to its follower's path."
      pairs:
        - ["Eccentric", "Smooth wave up and down"]
        - ["Pear", "Rests for half a turn, then up and down"]
        - ["Snail", "Slow steady rise, then a sudden drop"]
        - ["Heart", "Steady rise, steady fall"]
      explain: "Where the edge is the same distance from the axle, the follower rests; where it gets farther away steadily, the follower rises steadily."
  - check:
      type: question
      q: "Why must a snail cam always turn the same way?"
      options: ["Turned backwards, the follower would hit the step and jam", "It would rise too quickly", "The motor can only turn one way", "It would not matter"]
      answer: 0
      feedback: [null, "Backwards, it meets the cliff edge, not a slope.", "Motors can reverse; the cam is the problem.", "It matters: try it with your hand on a real one."]
      explain: "Forwards, the follower drops off the step. Backwards, it would have to climb a vertical step, so it jams."
```

### A heart cam's height

```worked
\text{heart cam, lift } 20 \text{ mm} :: It rises steadily for half a turn (180°), then falls steadily.
90 \div 180 = \tfrac{1}{2} :: At 90°, the cam has turned half of its rising part.
\tfrac{1}{2} \times 20 = 10 \text{ mm} :: A steady rise is a straight line, so the height is the same fraction of the lift.
\text{at } 270^\circ\text{: } (360 - 270) \div 180 \times 20 = 10 \text{ mm} :: On the way down, count the degrees left until 360°.
```

Now a snail cam, which rises for the whole turn.

### Shape and path

### One way only

## Vary: choose the cam

```step
stage: modify
insight: "Students choose a cam for each job from the motion it needs: the move from graph to design."
try: { playground: board, starter: "cams.yml#vary", height: 560 }
tasks:
  - check: { type: board, text: "A toy bird must rest for half a turn, then pop up and down. Choose the cam and turn it.", when: "c = 2 and t = 1", explain: "The pear cam: a dwell for half a turn, then a rise and fall." }
  - check: { type: board, text: "A toy hammer must lift slowly and fall with a bang. Choose the cam and turn it.", when: "c = 3 and t = 1", explain: "The snail cam: a slow rise and a sudden drop." }
  - check: { type: board, text: "A model pump rod must move up and down smoothly, with no sudden changes, by 10 mm. Choose the cam, set the lift and turn it.", when: "c = 1 and lift_mm = 10 and t = 1", explain: "The eccentric cam with a 10 mm lift (its axle 5 mm off centre)." }
```

### A bird

### A hammer

### A pump

## Practise: cams

```step
stage: practise
insight: "Lift from an eccentric's offset, heights from straight-line rises, and which cam fits a description."
tasks:
  - check:
      type: answer
      q: "An eccentric cam's axle is 8 mm off centre. What is the follower's lift, in mm?"
      answer: "16"
      explain: "2 × 8 = 16 mm."
  - check:
      type: answer
      q: "A heart cam with a 24 mm lift. How high is the follower at 45°, in mm?"
      answer: "6"
      explain: "45 ÷ 180 = 1/4, and 1/4 of 24 = 6 mm."
  - check:
      type: question
      q: "On a displacement graph, a flat line means…"
      options: ["The follower is resting (a dwell)", "The cam has stopped", "The follower is at its highest", "The follower is falling"]
      answer: 0
      feedback: [null, "The cam keeps turning; the edge there is a circle round the axle.", "A flat line can be at any height.", "Falling slopes down."]
      explain: "A flat line: the follower's height doesn't change while the cam turns, because that part of the edge is a circle round the axle."
```

### Eccentric

### Heart

### Dwell

## Make: a cam for a toy

```step
stage: make
insight: "Students turn a written motion into a cam and a lift, then test it: the full move from brief to mechanism."
try: { playground: board, starter: "cams.yml#vary", height: 560 }
tasks:
  - hint: ["Steady rise and steady fall: which graph is made of straight lines?", "The heart cam. Now set how far it must rise."]
    check: { type: board, text: "A toy fish must rise 25 mm at a steady speed and sink at a steady speed, over and over. Choose the cam, set the lift and turn it.", when: "c = 4 and lift_mm = 25 and t = 1", explain: "The heart cam with a 25 mm lift: straight-line rise and fall." }
  - check: { type: reflect, text: "In one or two sentences: describe a toy of your own, the cam it needs, and what its displacement graph would look like." }
```

### A fish

### Your own toy
