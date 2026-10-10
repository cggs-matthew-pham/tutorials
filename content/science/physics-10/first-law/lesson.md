---
order: 1
unit: newton
title: Does a moving thing need a push?
summary: "Newton's first law: an object at rest stays at rest, and a moving object keeps moving at a constant velocity, unless a net force acts. Moving things slow down because of friction, not because their push runs out."
language: science
hook: "Kick a ball on grass and it rolls to a stop. Slide a puck on ice and it goes much further. In space, a probe launched decades ago is still coasting out of the solar system with its engines off."
---
For 2000 years people believed, with Aristotle, that motion needs a force to keep it going. This lesson tests that idea.

## Engage: the sliding puck

```step
stage: predict
insight: "The Aristotelian answers (the force stays in the puck; it needs a push to keep going) are the target; committing first makes the coasting puck surprising."
check:
  type: predict
  q: "A hockey stick hits a puck, then stops touching it. The puck slides across perfectly smooth ice (no friction). What do you predict happens?"
  options: ["It slows down as the force of the hit runs out", "It keeps sliding at the same speed", "It stops straight away", "It speeds up"]
  actual: "It keeps sliding at the same speed. With no net force, nothing changes its motion. The 'force of the hit' isn't stored inside it: the force only acted while the stick touched it."
```

## Explore: push, then let go

```step
stage: run
insight: "Removing every force from a moving object and watching it coast confronts the 'motion needs force' belief directly."
try: { playground: board, starter: "boards.yml#puck", height: 640 }
check: { type: board, text: "Get the puck moving, then turn the push to 0 and friction off, and watch it coast for a few seconds.", when: "t >= 3 and P = 0 and F = 0 and v > 0" }
```

Press **Play** to push the puck. After a second or two, slide **Push** to 0 and turn **Friction** off. Watch the graph and the dots.

## Explain: the first law

```step
stage: investigate
insight: "Stating the law, then using it to explain the coasting puck and the everyday slowing down, replaces the Aristotelian model instead of adding to it."
tasks:
  - check:
      type: question
      q: "With no push and no friction, what did the puck do?"
      options: ["Kept moving at a constant speed", "Slowed down gradually", "Stopped"]
      answer: 0
      feedback: [null, "Check the graph: a flat line means constant speed.", "Check the dots: they stayed evenly spaced."]
      explain: "No net force, no change in motion: Newton's first law."
  - check:
      type: question
      q: "Which statement is Newton's first law?"
      options: ["An object stays at rest or keeps moving at a constant velocity unless a net force acts on it", "A moving object needs a force to keep it moving", "Every object eventually comes to rest", "Heavier objects are harder to keep moving"]
      answer: 0
      feedback: [null, "That is Aristotle's idea, which the puck contradicts.", "Only when a force (often friction) stops it.", "Mass makes it harder to change motion, not to keep it going."]
  - check:
      type: question
      q: "So why does a ball rolling on grass slow down and stop?"
      options: ["Friction and air resistance act against it: a net force backwards", "Its force runs out", "Gravity pulls it backwards", "Balls naturally stop"]
      answer: 0
      feedback: [null, "There is no store of force inside the ball.", "Gravity pulls down, not backwards, on flat ground.", "Only because a force acts: on smooth ice it goes much further."]
      explain: "The 'hidden' forces, friction and air resistance, are the net force that slows it."
  - check:
      type: question
      q: "What is inertia?"
      options: ["An object's tendency to resist changes in its motion (more mass, more inertia)", "A force that keeps objects moving", "The friction on a moving object"]
      answer: 0
      feedback: [null, "Inertia isn't a force: it is resistance to a change in motion.", "Friction is a force; inertia is a property of the object."]
  - check: { type: reflect, text: "I explained why a moving object doesn't need a force to keep moving, and what really slows things down." }
```

### Coasting

### The law

### Why things slow down

### Inertia

### In your own words

In your book: someone says "the puck keeps going because the force of the hit is still in it". Write a reply using Newton's first law.

## Elaborate: friction is the hidden force

```step
stage: modify
tier: typical
insight: "Running the same puck with friction on shows the everyday slowing as a net force effect, completing the replacement of the Aristotelian model."
try: { playground: board, starter: "boards.yml#friction", height: 640 }
tasks:
  - check: { type: board, text: "Let the moving puck slide with no push (friction on) until it stops.", when: "t >= 1 and v = 0" }
  - check:
      type: question
      q: "Friction is 2 N and the puck's mass is 1 kg. While it slides, what is happening?"
      options: ["A net force of 2 N backwards makes it slow down steadily", "Its push slowly runs out", "Friction is balanced by its motion"]
      answer: 0
      feedback: [null, "There is no push: Push is 0.", "Motion isn't a force; nothing balances friction here."]
      explain: "The only horizontal force is friction, so it is the net force. The graph slopes down in a straight line: steady slowing."
```

### Let it slide

### What slows it

## Elaborate: seatbelts

```step
stage: modify
tier: wider
insight: "The unrestrained passenger is the first law in a high-stakes setting: the car is stopped by a force; the passenger isn't."
check:
  type: question
  q: "A car hits a barrier and stops suddenly. A passenger isn't wearing a seatbelt. Using the first law, what happens to them?"
  options: ["They keep moving forward at the car's old speed until something (the dashboard, windscreen) exerts a force on them", "They are thrown forward by a force from the crash", "They stop with the car"]
  answer: 0
  feedback: [null, "No force throws them forward: they simply keep going while the car stops.", "Only if a force acts on them: the seatbelt provides it, gently, over a longer time."]
  explain: "A seatbelt applies the force that stops the passenger along with the car, spread over a little more time and a wide area."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the puck with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Newton's first law:** an object stays at rest, or keeps moving at a constant velocity, unless a **net force** acts on it.
- A moving object does **not** need a force to keep moving. A force is needed to **change** motion.
- Everyday objects slow down because of **friction and air resistance**: hidden forces that are the net force.
- **Inertia** is an object's resistance to changes in its motion; more mass, more inertia.
