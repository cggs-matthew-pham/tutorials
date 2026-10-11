---
order: 8
node: AC9S10U05 n8
unit: newton
title: Newton's laws in the real world
summary: "Newton's laws explain why safety features and techniques work. Seat belts and head restraints deal with inertia (first law); airbags and crumple zones lengthen the stopping time to cut the force (F = ma); rockets push gases back and are pushed forward (third law); and a spearthrower (woomera) extends the thrower's arm so the force acts for longer and over a greater distance, so the spear leaves faster."
language: science
voice: { name: bf_emma, speed: 1.05 }
hook: "A crash test dummy hits an airbag and the force on it is far smaller than hitting the dashboard. Same crash, same dummy. What does a bag of air change?"
---
A short lesson with no simulation. You have all three laws. Here you use them to explain things people have designed.

## Engage: the airbag

```step
stage: predict
insight: "Students say an airbag 'cushions' the blow. The law-based explanation is that it spreads the stopping over a longer time, which cuts the acceleration and so the force."
check:
  type: predict
  q: "A crash dummy goes from 15 m/s to a stop either against a hard dashboard in 0.02 s or against an airbag in 0.2 s. Compared with the dashboard, the force from the airbag is:"
  options: ["About ten times smaller, because the acceleration is ten times smaller", "The same, because the speed change is the same", "About ten times bigger", "Zero: the airbag absorbs it all"]
  actual: "About ten times smaller. The change in speed is the same, but taking ten times as long makes the acceleration ten times smaller, and F = ma."
```

## Explain: design with the laws

```step
stage: investigate
insight: "Applying more than one law to a design feature, explaining a First Nations technology and evaluating a safety feature with numbers are the node's three success criteria."
tasks:
  - check:
      type: match
      q: "Match each feature to the law that explains it."
      pairs:
        - ["Seat belt keeps you in your seat when the car stops", "First law: your body keeps moving unless a force acts"]
        - ["Airbag spreads the stop over more time", "Second law: a smaller acceleration means a smaller force"]
        - ["Rocket gases go down, rocket goes up", "Third law: action and reaction forces"]
        - ["A heavier ball is harder to accelerate", "Second law: more mass, less acceleration"]
  - check:
      type: question
      q: "A spearthrower (woomera) is a long, light lever that holds the back of the spear. Why does it make a spear go faster than throwing by hand?"
      options: ["It makes the arm effectively longer, so the force acts on the spear for a longer time and distance, giving a bigger acceleration and a higher launch speed", "It makes the spear heavier", "It removes air resistance"]
      answer: 0
      feedback: [null, "A heavier spear would accelerate less.", "Air resistance is still there."]
      explain: "A longer push means more time to accelerate the spear, so it leaves at a higher speed. The same idea explains why a longer bow draw or a golf club swing launches faster."
  - check:
      type: number
      q: "A 1000 kg car going 20 m/s is stopped by crumple zones in 0.5 s. What is its acceleration (m/s², size only)?"
      answer: 40
      explain: "a = 20 ÷ 0.5 = 40 m/s²."
  - check:
      type: number
      q: "What average force is needed to stop it (N, size only)?"
      answer: 40000
      explain: "F = ma = 1000 × 40 = 40 000 N."
  - check:
      type: question
      q: "A better crumple zone stops the same car in 1.0 s instead of 0.5 s. What happens to the force on the people inside?"
      options: ["It halves, so injuries are likely to be less serious", "It doubles", "It stays the same"]
      answer: 0
      feedback: [null, "A longer stop reduces the force.", "The time changes, so the acceleration and force do."]
      explain: "Twice the stopping time gives half the acceleration and so half the force: 20 000 N."
  - check: { type: reflect, text: "I can use Newton's laws to explain a design or technique, and evaluate a safety feature with a calculation." }
```

### Which law

### The woomera

### Crumple zone

### Crumple zone force

### A better crumple zone

### In your own words

In your book: choose a real design (helmet, seat belt, rocket, kicking technique or a woomera). Say which of Newton's laws it uses and explain in two sentences how.

## Elaborate: sport

```step
stage: modify
tier: typical
insight: "Sport techniques apply the laws to the human body and show how the follow-through lengthens the time of the force."
check:
  type: question
  q: "A footballer follows through when kicking a ball. In terms of force and time, why does the ball go further?"
  options: ["The foot stays in contact and pushes for longer, so the ball gains more speed", "The follow-through keeps pushing the ball after it has left the foot", "A follow-through reduces air resistance"]
  answer: 0
  feedback: [null, "Once the ball leaves the foot, nothing pushes it forward: the follow-through matters only while they are touching.", "Air resistance is the same."]
  explain: "A longer contact time means the force acts for longer, which gives the ball a higher launch speed."
```

## Elaborate: braking by itself

```step
stage: modify
tier: wider
insight: "A driverless braking system needs the laws and numbers, not just sensors."
check:
  type: question
  q: "An automatic emergency braking system detects an obstacle 25 m ahead of a 1500 kg car at 20 m/s. What does it need to work out?"
  options: ["Whether the braking force the car can apply gives a stopping distance shorter than 25 m", "The colour of the obstacle", "Whether the car is under the speed limit"]
  answer: 0
  feedback: [null, "Colour doesn't change the physics.", "Being under the limit doesn't mean it can stop in 25 m: that depends on its speed, mass and braking force."]
  explain: "It must compare the stopping distance from the car's speed and best possible braking force with the distance to the obstacle, quickly enough to act."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the airbag with the calculation." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **First law** (inertia): seat belts and head restraints stop passengers carrying on moving when the car stops.
- **Second law**: airbags and crumple zones lengthen the stopping time, so the acceleration and the **force** are smaller. A spearthrower extends the push, so the spear gets a higher launch speed.
- **Third law**: a rocket pushes gas back and the gas pushes the rocket forward.
- Numbers show how much a design helps: twice the stopping time halves the force.
