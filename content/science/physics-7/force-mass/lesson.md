---
order: 5
node: AC9S7U04 n5
woven: [AC9S7I04, AC9S7I05]
unit: forces
title: Same push, different mass
summary: "For the same unbalanced force, a heavier object accelerates less than a lighter one. For the same mass, a bigger unbalanced force gives a bigger acceleration. Data from a force investigation show the pattern: acceleration goes up with force and down with mass."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8294
  url: http://127.0.0.1:8294/index.html
  readySelector: "#gpanel"
  layout: full
hook: "A rugby front-rower and a winger sprint off the same line with the same push from the ground. Who gets going faster, and why?"
---
You know that an unbalanced force changes motion. This lesson puts force, mass and acceleration together.

## Engage: the trolley

```step
stage: predict
insight: "Students say the heavier object accelerates more because it has more 'stuff', or that mass makes no difference. The pattern is that mass resists change in motion."
check:
  type: predict
  q: "You give an empty trolley and a full trolley exactly the same steady push. Which one speeds up more?"
  options: ["The empty one: a smaller mass accelerates more for the same force", "The full one: it has more mass to push", "They speed up equally", "Neither: a steady push only gives a steady speed"]
  actual: "The empty one. For the same unbalanced force, a bigger mass means a smaller acceleration. Mass resists changes in motion."
```

## Explore: load the trolley

```step
stage: run
insight: "Changing only the mass, then only the force, and reading the acceleration each time is the controlled investigation the node's data analysis comes from."
try: { playground: board, starter: "boards.yml#trolley", height: 640 }
tasks:
  - starter: "boards.yml#trolley"
    check: { type: board, text: "The push is 6 N. Set the mass to 2 kg and read the acceleration.", when: "m = 2 and a = 3" }
  - starter: "boards.yml#trolley"
    check: { type: board, text: "Double the mass to 4 kg. What happens to the acceleration?", when: "m = 4 and a = 1.5" }
```

### 2 kg

The push stays at 6 N. Change only the mass.

### 4 kg

## Explain: the pattern

```step
stage: investigate
insight: "Stating the relationship in words, predicting which object accelerates more, and reading the pattern from two data tables meets the three success criteria."
tasks:
  - check:
      type: question
      q: "The same unbalanced force acts on a 2 kg object and an 8 kg object. Which accelerates more?"
      options: ["The 2 kg object", "The 8 kg object", "Both the same"]
      answer: 0
      feedback: [null, "More mass means more resistance to a change in motion.", "On the board, doubling the mass from 2 kg to 4 kg halved the acceleration: mass matters."]
      explain: "For the same force, the smaller mass accelerates more."
  - check:
      type: question
      q: "Which statement is right?"
      options: ["A bigger unbalanced force gives a bigger acceleration, and a bigger mass gives a smaller one", "A bigger mass gives a bigger acceleration", "Force and mass don't affect acceleration"]
      answer: 0
      feedback: [null, "It is the other way round for mass.", "On the board, changing the mass changed the acceleration, and changing the push does too."]
      explain: "More force, more acceleration. More mass, less acceleration."
  - check:
      type: number
      q: "Same trolley, 2 kg. Pushing with 2 N gives 1 m/s², 4 N gives 2 m/s², 6 N gives 3 m/s². What acceleration would 10 N give (m/s²)?"
      answer: 5
      explain: "The acceleration goes up by the same amount for each extra newton: 10 N gives 5 m/s²."
  - check:
      type: number
      q: "Same push of 8 N. A 1 kg trolley accelerates at 8 m/s², 2 kg at 4 m/s², 4 kg at 2 m/s². What acceleration would 8 kg give (m/s²)?"
      answer: 1
      explain: "Each time the mass doubles, the acceleration halves: 8 kg gives 1 m/s²."
  - check: { type: reflect, text: "I can say how force and mass affect acceleration, and read the pattern from data." }
```

### Which accelerates more

### The relationship

### Force data

### Mass data

### In your own words

In your book: draw two bar graphs from the data above: acceleration against force, and acceleration against mass. Under each, write the pattern in one sentence.

## Mix it up

```step
stage: practise
insight: "Acceleration needs an unbalanced force, so the effect of a net force on motion comes back before force and mass are compared."
check:
  type: question
  q: "Looking back at unbalanced forces: a box slides to the right. Friction pulls it left with 6 N and nothing pushes it. What does the box do?"
  options: ["It slows down", "It keeps sliding at a steady speed", "It speeds up to the right", "It stops straight away"]
  answer: 0
  feedback: [null, "A steady speed needs balanced forces. Here friction is not balanced by anything.", "The net force points left, against the motion, so it cannot speed up to the right.", "The net force changes the speed gradually. The box slows down first."]
  explain: "The net force is 6 N to the left, against the motion, so the box slows down."
```

## Elaborate: hit a target

```step
stage: modify
tier: typical
insight: "Choosing the force to hit a target acceleration for a given mass uses the pattern in reverse."
try: { playground: board, starter: "boards.yml#adjust", height: 640 }
tasks:
  - check: { type: board, text: "The trolley is 5 kg. Set the push so the acceleration is 2 m/s².", when: "m = 5 and a = 2" }
  - check:
      type: question
      q: "You change the mass to 10 kg and keep the same push. What must happen to the acceleration?"
      options: ["It halves", "It doubles", "It stays the same"]
      answer: 0
      feedback: [null, "More mass, less acceleration.", "The push is the same, but now there is twice as much mass to speed up."]
      explain: "Doubling the mass halves the acceleration for the same push."
```

### The push you need

### Double the mass

## Elaborate: rockets and roads

```step
stage: modify
tier: wider
insight: "Engineers use the same pattern: to accelerate faster, raise the force or cut the mass."
check:
  type: question
  q: "A rocket burns fuel, so its mass falls while the thrust stays the same. What happens to its acceleration?"
  options: ["It increases", "It decreases", "It stays the same"]
  answer: 0
  feedback: [null, "Less mass means more acceleration.", "The mass changes, so the acceleration does."]
  explain: "The same force on a smaller mass gives a bigger acceleration. This is one reason rockets are built in stages that fall away."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the trolleys with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- For the **same unbalanced force**, a **larger mass** gives a **smaller acceleration**.
- For the **same mass**, a **larger unbalanced force** gives a **larger acceleration**.
- Data show the pattern: acceleration rises with force and falls as mass rises.
