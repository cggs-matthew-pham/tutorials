---
order: 3
node: AC9S7U04 n3
woven: [AC9S7H02, AC9S7I02]
unit: forces
title: What does an unbalanced force do?
summary: An unbalanced force changes an object's motion, in the direction of the net force. Speeding up, slowing down, stopping, reversing and turning are all changes in motion, and every one needs an unbalanced force.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8202
  url: http://127.0.0.1:8202/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Net force 2 N to the left: the motion changes towards the left, whichever way the puck was moving." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "What an unbalanced force does"
  say: "An unbalanced force changes the motion, in the direction of the net force."
  clip:
    - caption: { text: "A puck slides right. A push to the left keeps acting on it.", say: "A puck slides right on ice, while a push to the left keeps acting." }
    - click: "Play"
    - wait: 1600
    - caption: { text: "First it slows down…", say: "First it slows down." }
    - wait: 900
    - caption: { text: "…stops, then speeds up to the left.", say: "It stops, and then speeds up to the left." }
    - expect: { selector: "body", contains: "speed -" }
    - caption: { text: "One unbalanced force: slowing, stopping and reversing are all one change.", say: "Slowing, stopping and reversing are all changes caused by one unbalanced force." }
    - wait: 800
hook: "A curling stone glides 40 metres across the ice. Sweep in front of it and it slides further; let it hit another stone and it stops dead. Every time its motion changes, something has pushed or pulled it."
---
Last lesson: balanced forces keep the motion the same. This lesson: what an unbalanced force changes.

## Engage: the sliding puck

```step
stage: predict
insight: "Students readily link a net force to speeding up, but expect a backward force only to stop things; the board shows the same force slowing, stopping and reversing the puck."
check:
  type: predict
  q: "A puck slides to the right across smooth ice. A steady push to the left starts acting on it and keeps acting. What do you predict happens?"
  options: ["It stops straight away", "It slows down and stops, then stays still", "It slows down, stops, then moves off to the left, faster and faster", "It keeps sliding right at the same speed: it is already moving"]
  actual: "It slows down, stops, then moves off to the left, faster and faster. The net force points left the whole time, so the motion keeps changing towards the left: first slower, then reversed."
```

## Explore: push against the motion

```step
stage: run
insight: "One steady force producing three different-looking changes (slowing, stopping, reversing) is the evidence that all of them are one effect: a change in motion towards the net force."
try: { playground: board, starter: "boards.yml#puck", height: 640 }
check: { type: board, text: "With a push to the left, make the puck turn round and move to the left.", when: "t >= 1 and v < 0" }
```

The puck starts moving right at 4 m/s, and the ice has no friction. Press **Play** and watch the dots and the speed–time graph: a speed below zero means moving to the left. Try a bigger and a smaller push (**Reset** to start again).

## Explain: any change in motion

```step
stage: investigate
insight: "Widening 'change in motion' from speeding up to slowing, stopping, reversing and turning is the node's checkpoint: any change in motion needs an unbalanced force."
tasks:
  - check:
      type: question
      q: "On the board, why did the puck turn round?"
      options: ["The push kept acting: the net force pointed left, so the puck slowed, stopped and then sped up to the left", "The puck ran out of the force that was carrying it right", "The push only started working once the puck had stopped"]
      answer: 0
      feedback: [null, "Nothing was carrying it right: on frictionless ice it would slide on forever. What did the push do?", "Look at the graph: the speed started falling the moment the push acted."]
      explain: "An unbalanced force changes the motion in the direction of the net force for as long as it acts. Slowing down, stopping and reversing were all the same change: towards the left."
  - check:
      type: sort
      q: "Is the motion changing? (If it is, there must be an unbalanced force.)"
      options: ["Changing: unbalanced force", "Not changing: balanced forces"]
      items:
        - ["A cyclist braking at the lights", "Changing: unbalanced force"]
        - ["A car going round a roundabout at a steady 30 km/h", "Changing: unbalanced force", "Its speed is steady but its direction keeps changing: that is a change in motion."]
        - ["A lift rising at a steady speed", "Not changing: balanced forces"]
        - ["A ball thrown upwards, slowing as it rises", "Changing: unbalanced force", "Weight pulls it down the whole time: it slows, stops at the top and falls."]
        - ["A book resting on a desk", "Not changing: balanced forces"]
        - ["A netball changing direction when it bounces off the backboard", "Changing: unbalanced force"]
        - ["A train sitting at a platform", "Not changing: balanced forces"]
  - check:
      type: question
      q: "A car drives round a bend at a steady 40 km/h. Are the forces on it balanced?"
      options: ["No: its direction is changing, so there is a net force towards the inside of the bend", "Yes: its speed isn't changing", "There are no forces on it"]
      answer: 0
      feedback: [null, "Steady speed in a straight line means balanced. Is it going in a straight line?", "The road grips the tyres, or the car would slide straight on."]
      explain: "A change of direction is a change in motion, so it needs an unbalanced force. Here the tyres' grip on the road pulls the car towards the inside of the bend."
  - check:
      type: question
      q: "A cyclist rides to the right and is slowing down. Which force diagram fits?"
      options: ["Forward push 40 N to the right, air resistance and friction 70 N to the left", "Forward push 70 N to the right, air resistance and friction 40 N to the left", "Forward push 50 N to the right, air resistance and friction 50 N to the left", "No forward push, and no other forces"]
      answer: 0
      feedback: [null, "A net force to the right would speed her up.", "Equal and opposite: balanced, so a steady speed.", "With no forces at all, she would keep going at the same speed."]
      explain: "Slowing down to the right means a net force to the left: the backward arrow is longer (70 N − 40 N = 30 N to the left)."
  - check: { type: reflect, text: "I explained, with a force diagram, why the puck slowed, stopped and turned round, and named a change in motion that is only a change of direction." }
```

### Why it turned round

### Changing or not

### Round the bend

### Which diagram?

### In your own words

In your book: draw force diagrams for two changes in motion, one where the speed changes and one where only the direction changes. Under each, name the unbalanced force.

## Elaborate: from standing still

```step
stage: modify
tier: typical
insight: "Starting from rest with friction adds the third kind of change (starting) and makes students compare two arrows to find the net force before predicting."
try: { playground: board, starter: "boards.yml#start", height: 640 }
tasks:
  - check: { type: board, text: "The box is at rest on a rough floor. Set the push so it starts moving to the right.", when: "t >= 1 and v > 0" }
  - check:
      type: number
      q: "The push is 7 N to the right and friction is 4 N to the left. What is the net force, in newtons?"
      answer: 3
      explain: "7 N − 4 N = 3 N to the right: unbalanced, so the box speeds up to the right. With a push of 4 N or less, friction matches it and the box stays still."
```

### Get it moving

### The net force

## Elaborate: longer pushes

```step
stage: modify
tier: wider
insight: "A fair test and a First Peoples tool both turn on the same idea: the force, and how long it acts, decide how big the change in motion is."
tasks:
  - check:
      type: question
      q: "You want to test whether a bigger push changes a trolley's speed more quickly. Which plan is a fair test?"
      options: ["Use the same trolley on the same surface, and change only the size of the push", "Use a heavier trolley for the bigger push", "Push one trolley on carpet and the other on tiles"]
      answer: 0
      feedback: [null, "Changing the mass as well means you can't tell which change made the difference.", "Different surfaces give different friction: two things changed."]
      explain: "Change one variable (the push), measure one (how quickly the speed changes) and keep the rest the same (trolley, surface)."
  - check:
      type: question
      q: "A spearthrower lets the thrower keep pushing on the spear over a longer arc. Why does the spear leave faster?"
      options: ["The unbalanced force acts on the spear for longer, so its speed keeps increasing for longer", "The spearthrower makes the spear lighter", "The spearthrower stores the spear's speed and releases it"]
      answer: 0
      feedback: [null, "The spear's mass doesn't change.", "Nothing is stored: the speed builds up while the push acts."]
      explain: "The longer an unbalanced force acts, the more the motion changes. Spearthrowers, used by First Peoples across much of mainland Australia, extend the throwing arm so the push lasts longer."
```

### A fair test

### The spearthrower

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the sliding puck with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- An **unbalanced** force (a net force that isn't zero) **changes the motion**, in the direction of the net force.
- A change in motion can be **starting, speeding up, slowing down, stopping, reversing or changing direction**. Every one needs an unbalanced force.
- A force against the motion doesn't just stop an object: if it keeps acting, the object turns round and speeds up the other way.
- Steady speed round a bend is still a change in motion (direction), so the forces are unbalanced.
