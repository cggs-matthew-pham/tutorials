---
order: 2
unit: newton
title: What is acceleration, exactly?
summary: Acceleration is the rate of change of velocity, a = Δv ÷ Δt, in m/s². It has a direction, the same as the net force. Slowing down is acceleration too (opposite to the motion), and on a speed–time graph acceleration is the gradient.
language: science
hook: "A Formula 1 car reaches 100 km/h in under 3 seconds. A train takes about 40. Both end up fast; one accelerates far more. Fast and accelerating are not the same thing."
---
In everyday talk "accelerate" means speed up. In physics it means something more exact.

## Engage: fast or accelerating?

```step
stage: predict
insight: "Students who equate acceleration with speed will choose the fast cruising car; the graph shows acceleration as change, not speed."
check:
  type: predict
  q: "Which has the bigger acceleration: a car cruising at a steady 100 km/h, or a cyclist going from 0 to 20 km/h in 4 seconds?"
  options: ["The car, because it is much faster", "The cyclist, because their speed is changing", "Both the same", "Neither has any acceleration"]
  actual: "The cyclist. The car's speed isn't changing, so its acceleration is zero, however fast it goes. Acceleration is how quickly velocity changes."
```

## Explore: read the graph

```step
stage: run
insight: "Watching a straight-line speed–time graph build up, with the acceleration read out, links the gradient to a rate before the formula appears."
try: { playground: board, starter: "boards.yml#speedup", height: 640 }
check: { type: board, text: "Run the trolley with a 6 N push for at least 4 seconds.", when: "t >= 4 and P = 6" }
```

Press **Play**. Watch how much the speed goes up each second (the graph and the numbers under it).

## Explain: a = Δv ÷ Δt

```step
stage: investigate
insight: "Calculating acceleration from data, then giving it a direction, turns the everyday word into a defined vector quantity."
tasks:
  - check:
      type: number
      q: "The trolley went from 0 to 12 m/s in 4 s. What was its acceleration, in m/s²?"
      answer: 3
      explain: "a = change in velocity ÷ time = (12 − 0) ÷ 4 = 3 m/s². Its speed went up by 3 m/s every second."
  - check:
      type: question
      q: "On the speed–time graph, where can you see the acceleration?"
      options: ["The gradient (steepness) of the line", "How high the line is", "Where the line ends"]
      answer: 0
      feedback: [null, "Height is the speed at that moment, not how fast it changes.", "The end shows the final speed and time."]
      explain: "A steeper line means the speed changes faster: bigger acceleration. A flat line means zero acceleration."
  - check:
      type: question
      q: "What are the units of acceleration?"
      options: ["m/s² (metres per second, per second)", "m/s", "N", "km/h"]
      answer: 0
      feedback: [null, "m/s is velocity. Acceleration is how many m/s are added each second.", "N is force.", "km/h is a speed."]
  - check:
      type: number
      q: "A cyclist goes from 2 m/s to 10 m/s in 4 s. Acceleration, in m/s²?"
      answer: 2
      explain: "(10 − 2) ÷ 4 = 2 m/s²."
  - check: { type: reflect, text: "I explained the difference between speed and acceleration, and how to calculate acceleration." }
```

### From the data

### On the graph

### Units

### Another one

### In your own words

In your book: explain why a car cruising at 100 km/h has zero acceleration, and a car pulling away from traffic lights has some.

## Elaborate: slowing down

```step
stage: modify
tier: typical
insight: "A negative acceleration (opposite to the motion) shows acceleration as a direction, not just 'more speed'."
try: { playground: board, starter: "boards.yml#slowdown", height: 640 }
tasks:
  - check: { type: board, text: "Let the moving trolley slow to a stop.", when: "t >= 1 and v = 0" }
  - check:
      type: number
      q: "It went from 8 m/s to 0 in 4 s. What was its acceleration, in m/s²? (Use a minus sign for slowing down.)"
      answer: -2
      explain: "(0 − 8) ÷ 4 = −2 m/s². The minus sign means the acceleration points backwards, opposite to the motion, the same way as the net force (friction)."
  - check:
      type: question
      q: "Which way did the net force point while it slowed down?"
      options: ["Backwards, the same way as the acceleration", "Forwards, the way it was moving", "There was no net force"]
      answer: 0
      feedback: [null, "Forwards would speed it up.", "Its speed changed, so there was a net force: friction."]
      explain: "Acceleration always points the same way as the net force."
```

### Watch it stop

### Negative acceleration

### Direction

## Elaborate: turning

```step
stage: modify
tier: wider
insight: "A constant-speed turn is acceleration with no change of speed, the hardest case for 'acceleration = speeding up'."
check:
  type: question
  q: "A car drives around a roundabout at a steady 30 km/h. Is it accelerating?"
  options: ["Yes: its direction is changing, so its velocity is changing", "No: its speed is constant", "Only if it speeds up"]
  answer: 0
  feedback: [null, "Velocity includes direction. A change of direction is a change of velocity.", "Speeding up is one kind; turning is another."]
  explain: "There must be a net force towards the centre of the roundabout: the friction of the tyres on the road."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the cruising car and the cyclist with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Acceleration** is the rate of change of velocity: **a = Δv ÷ Δt**, in **m/s²**.
- It has a **direction**, the same as the net force. Slowing down is acceleration opposite to the motion (negative).
- A fast object at a steady speed has **zero** acceleration.
- On a speed–time graph, acceleration is the **gradient**.
