---
order: 1
node: AC9S7U04 n1
unit: forces
title: How big, which way?
summary: A force has a size and a direction, so we draw it as an arrow. In a force diagram every force on an object gets an arrow of the right length, pointing the right way, with its name.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8200
  url: http://127.0.0.1:8200/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "A force diagram: each force on the box as a named arrow, its length showing the size." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Forces as arrows"
  say: "A force has a size and a direction, so we draw it as an arrow."
  clip:
    - caption: { text: "Each force is an arrow: its length is the size, it points the way the force acts.", say: "Each arrow's length shows the size, and it points the way the force acts." }
    - click: "Push: more"
    - click: "Push: more"
    - caption: { text: "A bigger push: a longer arrow.", say: "A bigger push gets a longer arrow." }
    - expect: { selector: "body", contains: "Push 30 N" }
    - caption: { text: "Every force on the box is drawn and named: weight, support, push.", say: "A force diagram shows every force on the object, each one named." }
    - wait: 1200
hook: "Push a shopping trolley gently, then hard. Same direction, different force. Push it from the other side: same size, different force. Two things to get right every time."
---
Forces are invisible, so scientists draw them. This lesson is about drawing them precisely.

## Engage: what does an arrow tell you?

```step
stage: predict
insight: "Students who think only direction matters, or only size, will choose those options; the board shows the arrow carrying both."
check:
  type: predict
  q: "In a force diagram, each force is drawn as an arrow. What do you predict the arrow shows?"
  options: ["Only which way the force acts", "Only how big the force is", "Both how big it is (its length) and which way it acts (its direction)", "Which way the object will move"]
  actual: "Both. The arrow's length shows the size of the force and it points the way the force acts. (It does not always point the way the object moves.)"
```

## Explore: push the trolley

```step
stage: run
insight: "Changing one force and watching its arrow grow makes 'length = size' concrete before any rules are stated."
try: { playground: board, starter: "boards.yml#trolley", height: 600 }
check: { type: board, text: "Make the push 30 N.", when: "P = 30" }
```

Use the **Push** slider. Watch the push arrow, and watch friction too.

## Explain: reading a force diagram

```step
stage: investigate
insight: "Naming each force and reading size and direction from arrows is the precision skill every later node uses."
tasks:
  - check:
      type: question
      q: "When you made the push bigger, what happened to its arrow?"
      options: ["It got longer, pointing the same way", "It changed direction", "It stayed the same; only the number changed"]
      answer: 0
      feedback: [null, "The push still acted to the right. Only its size changed.", "Look again: the arrow's length grows with the force."]
      explain: "Length shows size. A force twice as big gets an arrow twice as long."
  - check:
      type: match
      q: "Match each force to what causes it."
      pairs:
        - ["Weight", "Earth's gravity pulling the object down"]
        - ["Support (normal force)", "A surface pushing back up on the object"]
        - ["Friction", "Surfaces rubbing, acting against sliding"]
        - ["Air resistance", "Air pushing against a moving object"]
        - ["Push or pull", "Something in contact pushing or pulling"]
  - check:
      type: question
      q: "The trolley's weight is 50 N and the support is 50 N. How should their arrows look?"
      options: ["The same length, pointing in opposite directions", "Weight longer, because it is heavier", "Both pointing down"]
      answer: 0
      feedback: [null, "Equal forces get equal arrows.", "The ground pushes up: support always points away from the surface."]
      explain: "Equal sizes, equal lengths. Weight points down; the support from the ground points up."
  - check: { type: reflect, text: "I can say what an arrow's length and direction show, and name the forces on the trolley." }
```

### Length is size

### Naming forces

### Two equal forces

### In your own words

In your book: draw the trolley with all four forces, each arrow the right length, labelled.

## Practise: draw it right

```step
stage: practise
insight: "Repeated diagrams with immediate feedback build precision: correct direction, relative size and a name for every force."
try: { playground: board, starter: "boards.yml#book", height: 560 }
tasks:
  - starter: "boards.yml#book"
    check: { type: board, text: "A 2 kg book rests on a table (its weight is 20 N). Set the table's push so the diagram is right.", when: "N = 20" }
  - starter: "boards.yml#tug"
    check: { type: board, text: "In a tug of war, Team A pulls with 300 N and Team B with 300 N. Set both pulls.", when: "L = 300 and R = 300" }
  - starter: "boards.yml#skydiver"
    check: { type: board, text: "A skydiver (weight 800 N) has reached a steady speed: air resistance now equals her weight. Set it.", when: "A = 800" }
```

### A book on a table

The book isn't moving up or down. What does that tell you about the table's push?

### A tug of war

### A skydiver

## Elaborate: four situations

```step
stage: modify
tier: typical
insight: "Matching diagrams to situations (at rest, speeding up, slowing down, falling) uses arrows as reasoning, not decoration."
check:
  type: sort
  q: "Which diagram fits each situation? (Forward is the way the object moves.)"
  options: ["Forward arrow longer than backward arrow", "Forward and backward arrows equal", "Backward arrow longer than forward arrow"]
  items:
    - ["A cyclist speeding up", "Forward arrow longer than backward arrow"]
    - ["A car driving at a steady 60 km/h", "Forward and backward arrows equal", "Steady speed: the forces cancel."]
    - ["A sled slowing down on flat snow", "Backward arrow longer than forward arrow"]
    - ["A box being pushed but not moving", "Forward and backward arrows equal", "Friction matches the push."]
    - ["A runner speeding up out of the blocks", "Forward arrow longer than backward arrow"]
```

## Elaborate: a boomerang

```step
stage: modify
tier: wider
insight: "A shaped object in flight shows forces that aren't pushes in contact, extending the list of forces students can name."
check:
  type: question
  q: "First Peoples of Australia shaped boomerangs with a curved upper surface, like an aircraft wing. In flight, as air moves over it, which force does that shape mainly create?"
  options: ["Lift: air pushing the boomerang up (and sideways, which curves its path)", "Friction with the ground", "More weight"]
  answer: 0
  feedback: [null, "In flight it isn't touching the ground.", "Weight depends only on mass and gravity, not on shape."]
  explain: "The aerofoil shape makes the air push on it: lift. Spinning, the lift tilts the boomerang so it curves back. Its force diagram: weight down, lift, and air resistance against its motion."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about what an arrow shows with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A force has a **size** (newtons, N) and a **direction**, so it is drawn as an **arrow**.
- The arrow's **length** shows the size; it **points** the way the force acts.
- A **force diagram** shows every force on one object, each one named.
- Common forces: weight (down), support (up from a surface), friction (against sliding), air resistance (against motion through air), pushes and pulls.
