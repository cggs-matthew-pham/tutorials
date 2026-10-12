---
order: 6
node: AC9S10U05 n6
woven: [AC9S9I04]
unit: newton
title: What forces act on it?
introduces: [free-body]
summary: "A free body diagram shows one object and every force acting on it, as arrows from the object: size by length, direction by the way it points. Add the forces along each direction to find the net force, then use Newton's laws to say what the object's motion will do."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8282
  url: http://127.0.0.1:8282/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#sled, caption: "A free body diagram of a sled: weight and the snow's push up balance; the rope's pull (60 N) is bigger than friction (40 N), so there is a net force of 20 N forward." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Free body diagrams"
  say: "Draw every force on one object, then add them up direction by direction."
  clip:
    - caption: { text: "Every force on the sled, as arrows from the sled.", say: "Every force acting on the sled, drawn as arrows from the sled." }
    - wait: 3000
    - caption: { text: "Up and down: weight and the snow's push balance.", say: "Up and down, the weight and the snow's push balance." }
    - wait: 3000
    - caption: { text: "Across: 60 N pull against 40 N friction. Net force 20 N forward: it speeds up.", say: "Across, sixty against forty: a net twenty newtons forward." }
    - wait: 3600
    - click: "Rope pulling: less"
    - caption: { text: "Pull with 40 N: balanced both ways. Steady speed, or still.", say: "Pull with forty newtons: balanced both ways." }
    - wait: 1600
hook: "A plane cruising at 900 km/h has four big forces on it, each hundreds of thousands of newtons. Yet the passengers can pour a drink without spilling it. How?"
---
You can find a net force along one line. This lesson draws all the forces on an object at once.

## Engage: the cruising plane

```step
stage: predict
insight: "Students who think a moving object needs an unbalanced force forward (the Aristotelian idea) or that 'no net force' means no forces pick the wrong options; the diagram makes both visible."
check:
  type: predict
  q: "A plane cruises at a steady speed and height. What can you say about the forces on it?"
  options: ["They balance both ways: lift equals weight, thrust equals drag", "Thrust is bigger than drag, or it would slow down", "There are no forces on it", "Lift is bigger than weight, or it would fall"]
  actual: "They balance in both directions. Steady speed in a straight line means no change in motion, so no net force (Newton's first law): lift balances weight, and thrust balances drag."
```

## Explore: draw it on the board

```step
stage: run
insight: "Adjusting forces on a diagram until both directions balance makes 'net force zero in each direction' something students do."
try: { playground: board, starter: "boards.yml#sled", height: 640 }
tasks:
  - starter: "boards.yml#sled"
    check: { type: board, text: "Change the rope's pull so the forces on the sled balance in both directions.", expect: { balanced: true } }
  - starter: "boards.yml#lift"
    check: { type: board, text: "A 500 kg lift moves up at a steady speed. Set the cable's pull so the forces balance.", expect: { balanced: true } }
```

### The sled

Up and down already balance; work on the forces across.

### The lift

g is 9.8 N/kg here.

## Explain: reading a free body diagram

```step
stage: investigate
insight: "Drawing only forces on the object, working each direction separately, then reading the motion from the net force combines the first and second laws."
tasks:
  - check:
      type: question
      q: "What goes on a free body diagram?"
      options: ["One object, and every force acting on that object", "Every object in the scene and all the forces between them", "Only the forces that make the object move"]
      answer: 0
      feedback: [null, "Forces the object exerts on other things belong on their diagrams, not this one.", "Every force goes on, including ones that balance."]
      explain: "One object, every force on it, each as an arrow starting at the object, labelled with what causes it and its size."
  - check:
      type: number
      q: "A 600 N skydiver has 450 N of air resistance acting up on her. What is the net force on her, in newtons, downwards?"
      answer: 150
      explain: "600 − 450 = 150 N downwards: she is still speeding up."
  - check:
      type: number
      q: "A 2 kg box is pushed right with 14 N against 6 N of friction. What is its acceleration, in m/s²?"
      answer: 4
      explain: "Net force 14 − 6 = 8 N right. a = F ÷ m = 8 ÷ 2 = 4 m/s²."
  - check:
      type: question
      q: "A lift's cable pulls up with exactly its weight. The lift is moving up. What is happening?"
      options: ["It moves up at a steady speed: balanced forces, no change in motion", "It must be stopped", "It is speeding up, because it is moving up"]
      answer: 0
      feedback: [null, "Balanced forces mean no change; it can still be moving.", "Speeding up needs a net force up."]
      explain: "First law: balanced forces keep the motion the same, here steady upward motion."
  - check: { type: reflect, text: "I can draw a free body diagram, find the net force in each direction and say what the motion will do." }
```

### What goes on it

### The skydiver

### The box

### The lift

### In your own words

In your book: draw a free body diagram for a cyclist riding at a steady speed on a flat road. Label four forces with their sizes, using made-up but sensible numbers that balance.

## Elaborate: four forces on a plane

```step
stage: modify
tier: typical
insight: "Balancing two directions at once with four forces is the full multi-force analysis in a real context."
try: { playground: board, starter: "boards.yml#plane", height: 640 }
tasks:
  - check: { type: board, text: "Set lift and thrust so the plane cruises: balanced in both directions.", expect: { balanced: true } }
  - check:
      type: question
      q: "The pilot now increases thrust a little and leaves everything else the same. What happens?"
      options: ["The plane speeds up: a net force forward", "Nothing changes", "The plane climbs straight up"]
      answer: 0
      feedback: [null, "The forces across no longer balance.", "Thrust is forward; climbing needs more lift."]
      explain: "Thrust bigger than drag gives a net force forward, so the plane accelerates (until the extra speed raises the drag to match)."
```

### Cruising

### More thrust

## Elaborate: the skydiver's fall

```step
stage: modify
tier: wider
insight: "A changing force (air resistance growing with speed) shows why free body diagrams change during a motion."
check:
  type: question
  q: "As a skydiver falls faster, air resistance grows. What happens to her free body diagram over time?"
  options: ["The upward arrow grows until it equals her weight; then she falls at a steady speed (terminal velocity)", "Her weight arrow shrinks", "The arrows stay the same throughout"]
  answer: 0
  feedback: [null, "Her weight stays the same.", "Air resistance depends on speed."]
  explain: "Net force downward shrinks to zero, so the acceleration does too. Opening the parachute makes air resistance jump, and she slows to a new, lower steady speed."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the cruising plane with the balanced diagram I made." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **free body diagram** shows one object and every force acting on it, as labelled arrows from the object.
- Work out the net force in each direction separately (up–down, left–right).
- Net force zero in every direction: no change in motion (still, or steady speed in a straight line).
- A net force: the object accelerates in that direction, with a = F ÷ m.
