---
order: 1
node: AC9S10U05 n1
unit: newton
title: What is the net force?
summary: "A force is a vector: it has a size and a direction. Forces along one line add if they point the same way and subtract if they point opposite ways. What is left is the net (resultant) force, and that is what changes motion."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8267
  url: http://127.0.0.1:8267/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A driving force of 1200 N against 500 N of air resistance and 300 N of rolling resistance: a net force of 400 N forward." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Net force"
  say: "Add forces that point the same way; subtract those that point opposite ways."
  clip:
    - caption: { text: "Forward: 1200 N. Backward: 500 + 300 = 800 N.", say: "Forward, twelve hundred newtons. Backward, five hundred plus three hundred: eight hundred." }
    - wait: 4400
    - caption: { text: "Net force: 1200 − 800 = 400 N forward.", say: "Net force: twelve hundred minus eight hundred, four hundred newtons forward." }
    - wait: 4200
    - click: "Driving force: less"
    - caption: { text: "Drive with 800 N: forward and backward balance. Net force zero.", say: "With eight hundred newtons forward, the forces balance. The net force is zero." }
    - wait: 4000
hook: "A car's engine pushes it forward with 2000 newtons. So why doesn't it keep speeding up for ever?"
---
In Year 7 you drew forces as arrows. This lesson adds them up.

## Engage: three forces on a car

```step
stage: predict
insight: "Students who add every force regardless of direction (2800 N), or pick the biggest, show they are treating forces as numbers, not vectors."
check:
  type: predict
  q: "A car's driving force is 2000 N forward. Air resistance is 500 N and rolling resistance 300 N, both backward. What is the net force on the car?"
  options: ["1200 N forward", "2800 N forward", "2000 N forward", "Zero: the forces cancel"]
  actual: "1200 N forward. The two backward forces add to 800 N; opposite to the 2000 N forward, so they subtract: 2000 − 800 = 1200 N, in the direction of the bigger side (forward)."
```

## Explore: add and subtract

```step
stage: run
insight: "Changing one force and watching the net force move by the same amount makes 'add along one line, subtract opposite ways' something students do, not recite."
try: { playground: board, starter: "boards.yml#car", height: 640 }
tasks:
  - check: { type: board, text: "Change the driving force until the net force is zero.", when: "f = 0" }
  - check: { type: board, text: "Now make the net force 1000 N backward (to the left). You can change both adjustable forces.", when: "f = -1000" }
```

### Balance them

Use **+** and **−** to change a force. The net force is shown under the board.

### Net force backward

A net force backward on a car moving forward slows it down.

## Explain: forces as vectors

```step
stage: investigate
insight: "Working net forces by hand, with a sign or a direction every time, and then tying the net force to changes in motion, is the node and the link to Newton's laws."
tasks:
  - check:
      type: question
      q: "Why is force called a vector?"
      options: ["It has a size and a direction, and both matter", "It is measured in newtons", "It can only act in a straight line"]
      answer: 0
      feedback: [null, "Mass has a unit too, but no direction: it is not a vector.", "Forces can act any way; the point is that direction matters."]
      explain: "A vector has size and direction. 10 N left and 10 N right are different forces, and they cancel."
  - check:
      type: number
      q: "Two people push a stalled car forward with 300 N and 250 N. Friction acts backward with 400 N. What is the net force, in newtons? (forward is positive)"
      answer: 150
      explain: "Forward: 300 + 250 = 550 N. Backward: 400 N. Net: 550 − 400 = 150 N forward."
  - check:
      type: number
      q: "In a tug of war, Team A pulls left with 1800 N and Team B pulls right with 2100 N. What is the size of the net force, in newtons?"
      answer: 300
      explain: "Opposite directions: subtract. 2100 − 1800 = 300 N, to the right (Team B's way)."
  - check:
      type: question
      q: "A skydiver weighs 700 N. Air resistance on her is 700 N up. What is happening to her motion?"
      options: ["Nothing is changing: net force zero, so she falls at a steady speed", "She is speeding up, because weight is pulling her down", "She must be stopped in the air"]
      answer: 0
      feedback: [null, "Weight is balanced by air resistance, so there is no net force to speed her up.", "Zero net force means no change in motion, not no motion."]
      explain: "Balanced forces give a net force of zero: the motion doesn't change. She keeps falling at the same speed (terminal velocity)."
  - check:
      type: sort
      q: "What will the motion do?"
      options: ["Change (speed up, slow down or turn)", "Stay the same"]
      items:
        - ["Net force 500 N forward", "Change (speed up, slow down or turn)"]
        - ["Net force 200 N backward on a moving bike", "Change (speed up, slow down or turn)", "It slows down."]
        - ["Forward 900 N, backward 900 N", "Stay the same"]
        - ["A puck sliding on ice with no friction", "Stay the same", "No forces along its path: no net force."]
  - check:
      type: sort
      q: "Contact or non-contact force?"
      options: ["Contact force", "Non-contact force"]
      items:
        - ["Friction between the tyres and the road", "Contact force"]
        - ["Air resistance on a cyclist", "Contact force", "The air touches the cyclist, so it is a contact force."]
        - ["A table pushing up on a book (the normal force)", "Contact force"]
        - ["Gravity pulling a skydiver down (her weight)", "Non-contact force", "Gravity acts across a distance, with nothing touching."]
        - ["A magnet pulling a paperclip from a few centimetres away", "Non-contact force"]
  - check: { type: reflect, text: "I can add and subtract forces along one line to find the net force, and say what it does to motion." }
```

### Size and direction

### A push and friction

### Tug of war

### Balanced

### What happens next

### Touching or not

### In your own words

In your book: draw a force diagram for the car in the prediction, with all three forces as arrows to scale. Write the calculation of the net force, with its direction.

## Elaborate: a four-person tug of war

```step
stage: modify
tier: typical
insight: "Four forces, two adjustable, make students combine same-direction forces before subtracting, the full one-axis method."
try: { playground: board, starter: "boards.yml#tug", height: 640 }
tasks:
  - check: { type: board, text: "Change Ana's or Cai's pull until the rope doesn't move: net force zero.", when: "f = 0" }
  - check:
      type: question
      q: "Ana pulls 400 N and Ben 300 N to the left. Cai pulls 450 N to the right. How hard must Dee pull right for the net force to be zero?"
      options: ["250 N", "700 N", "150 N"]
      answer: 0
      feedback: [null, "700 N is the whole left team; Cai already provides 450 N of it.", "Check: 450 + 150 = 600, not 700."]
      explain: "Left: 400 + 300 = 700 N. Right must also be 700 N: 450 + 250 = 700."
```

### Balance the rope

### Dee's pull

## Elaborate: driving at a steady speed

```step
stage: modify
tier: wider
insight: "Running the board with a zero net force shows the car keeps its speed, the bridge to Newton's first law next lesson."
try: { playground: board, starter: "boards.yml#cruise", height: 640 }
tasks:
  - check: { type: board, text: "The car starts at 20 m/s. Set the driving force so it keeps a steady speed, then press Play and run it for at least 3 seconds.", when: "t >= 3 and f = 0 and v > 0" }
  - check:
      type: question
      q: "The car's engine is still pushing with 1500 N, but it isn't speeding up. Why?"
      options: ["Air and rolling resistance add up to 1500 N backward, so the net force is zero", "The engine's force is used up", "Moving things always slow down unless pushed harder"]
      answer: 0
      feedback: [null, "Forces aren't used up; they are balanced.", "With a net force of zero, the speed stays the same (next lesson)."]
      explain: "Net force zero: no change in motion. The engine only needs to cancel the resistance to keep a steady speed."
```

### Steady speed

### Why no speeding up

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the car's net force with the board." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A force is a **vector**: it has a size (in newtons) and a direction.
- Along one line, forces in the same direction **add**; forces in opposite directions **subtract**. Choose one direction as positive.
- What is left is the **net force** (resultant force), in the direction of the bigger side.
- A net force changes motion (speeds up, slows down, turns). A net force of zero leaves the motion unchanged: still, or at a steady speed.
