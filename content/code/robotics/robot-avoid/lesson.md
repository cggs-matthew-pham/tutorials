---
order: 4
unit: sense
title: Avoid and explore
summary: Turn away when something is close, and keep exploring, choosing between two moves with if and else.
language: makecode
extensions: [robot]
explainPicture: avoid.ts#predict
hook: "A robot vacuum never plans a route round your living room. It drives until it senses something, turns, and drives again, and in time it covers the whole floor."
---
Last lesson the robot stopped before a box. A robot that only stops is not much use for cleaning a floor. This time, when something is close, the robot **turns away** and keeps going: an **if … else** chooses between the two moves, again and again.

## Predict

```step
stage: predict
code: avoid.ts#predict
check:
  type: predict
  q: "The robot drives towards a box. What happens?"
  options: ["It turns away from the box and keeps exploring", "It stops in front of the box", "It crashes into the box", "It spins round and round on the spot forever"]
  actual: "It turns away and keeps exploring. When the box is closer than 15 cm, it turns for half a second; once the way is clear, else drives it forward again."
```

## Run

```step
stage: run
code: avoid.ts#predict
try: { playground: microbit, starter: "avoid.ts#predict" }
check: { type: reflect, text: "I watched the robot meet a few boxes and compared what it did with my prediction." }
```

Let the robot drive around for a while. Drag the boxes into its path. The arena has walls, but this simulator's sensor only sees **boxes and other robots**, so it may bump into a wall and slide along it. A real robot's sensor would see the wall too.

## Investigate

```step
stage: investigate
code: avoid.ts#predict
insight: "Inside forever, if … else chooses one of two moves every time round. The robot never plans: it keeps checking and choosing."
tasks:
  - check:
      type: question
      q: "After turning away, how does the robot know to drive forward again?"
      options: ["The turn block tells it to", "forever runs the if again: the box is no longer close, so else drives forward", "It remembers that it has turned", "It waits for a button press"]
      answer: 1
      explain: "forever checks again straight after the turn. The way is clear now, so the question is false and else runs: drive forward."
  - check:
      type: question
      q: "Zara's robot spins on the spot in open space, and drives straight into boxes. Which part is wrong?"
      options: ["The turn is too short", "The > should be <: her robot turns when things are far away and drives when they are close", "She needs robot motor stop", "The speeds should be 100"]
      answer: 1
      fault: logic
      misconception: comparison-direction
      explain: "'distance > 15' is true when nothing is near, so Zara's robot turns in open space. When a box is close, the question is false and else drives straight at it."
```

### Back to forward

Watch the robot turn, then think about what forever does next.

### Zara's robot

Zara's program:

```makecode
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.obstacleDistance() > 15) {
        robot.motorTank(50, -50, 500)
    } else {
        robot.motorTank(50, 50)
    }
})
```

## Modify

```step
stage: modify
insight: "Each branch can hold a short routine, not just one move."
try: { playground: microbit, starter: "avoid.ts#modify" }
tasks:
  - hint: "Inside the if, before the turn: robot motor tank −50 −50 for 300 ms."
    check: { type: code, text: "Back up a little before turning away.", rules: { contains: ["robot.motorTank(-50,-50"] } }
  - hint: ["robot set color is in Robot. Click the colour to choose one.", "One at the top of the if (red), one at the top of the else (green)."]
    check: { type: code, text: "Red lights when it turns away, green lights when it drives.", rules: { count: { "robot.setColor(": 2 } } }
```

### Back up first

Real robot vacuums back up a little before they turn, so they do not scrape the furniture. Add that to the **if**.

### Indicator lights

Show **red** lights while the robot is turning away and **green** while it drives, like a warning light on a forklift.

## Make

```step
stage: make
try: { playground: microbit, starter: "avoid.ts#make" }
hint:
  - "Put a second if … else inside the first if, after the back-up: one branch turns right, the other turns left."
  - "Its question: pick random 0 to 1 (in Math) = 0."
check: { type: code, text: "A robot vacuum: when something is close, back up, then turn left or right at random.", rules: { contains: ["randint(0,1)"], inside: { "basic.forever": ["robot.obstacleDistance()"] }, count: { "robot.motorTank(": 4 } } }
```

A robot that always turns the same way can get stuck going round the same corner. Make a **robot vacuum** that turns a **random** way:

- when something is close: back up, then turn **left or right at random**
- otherwise: drive forward

**pick random 0 to 1** (in **Math**) gives 0 or 1, like a coin toss.

## On a real robot

```step
stage: info
```

On a real floor, try your vacuum in a box or a corner of the room built from books. Things to notice:

- A real sensor **sees walls**, and a robot that approaches a wall at an angle may get a weak echo: it can scrape along before it turns.
- Soft things (cushions, clothes) return weak echoes too. Real robot vacuums add bump sensors for the things their eyes miss.
- If it turns too little to get clear, make the turn longer.
