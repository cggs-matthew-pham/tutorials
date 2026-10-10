---
order: 5
unit: sense
title: Follow the line
summary: Use the two line sensors to tell which side the line is on, and steer to stay on it.
language: makecode
introduces: [and-or]
extensions: [robot]
explainPicture: line.ts#investigate
hook: "In many warehouses and hospitals, robots carry boxes and medicines along coloured lines on the floor. They do not know where they are; they only know whether each sensor still sees the line."
---
Under the front of the robot are two **line sensors**, a little to the left and a little to the right. Each one shines light at the floor and measures what bounces back: a dark line reflects less than the floor around it. In blocks, **robot detect line left** is **true** when the left sensor is over the line. You find it in **Robot**.

The simulator's arena has a dark loop to follow. If the robot does not start on the line, drag it onto the line, facing along it.

## Predict

```step
stage: predict
code: line.ts#predict
check:
  type: predict
  q: "This robot uses only its left sensor. It starts on the line. What does it do?"
  options: ["It follows the line, swinging a little left and right as it goes", "It drives straight off the line", "It spins in a small circle", "It stops, because one sensor is not enough"]
  actual: "It follows the line by swinging: on the line, it steers left until the sensor slips off; off the line, it steers right until the sensor finds it again. It follows the left edge of the line."
```

**robot motor tank 10 40** steers left (the right wheel is faster). **40 10** steers right.

## Run

```step
stage: run
code: line.ts#predict
try: { playground: microbit, starter: "line.ts#predict" }
check: { type: reflect, text: "I watched the robot on the loop and compared it with my prediction." }
```

Watch the robot go round the loop. Look closely at how it moves: smoothly, or in small swings?

## Investigate

```step
stage: investigate
code: line.ts#investigate
insight: "Each line sensor says which side the line is on. Steer towards the side that still sees it; when both see it, drive straight."
tasks:
  - check:
      type: match
      q: "Match what the sensors see with what the robot should do."
      pairs:
        - ["both see the line", "drive straight"]
        - ["only the left sees the line", "steer left"]
        - ["only the right sees the line", "steer right"]
        - ["neither sees the line", "stop: the line is lost"]
  - check:
      type: question
      q: "Kai's robot runs off the loop at the first bend. Which part is wrong?"
      options: ["His speeds are too slow", "His turns are swapped: when only the left sensor sees the line, he steers right, away from it", "He needs a forever block", "Line sensors only work on straight lines"]
      answer: 1
      fault: logic
      misconception: line-steer-wrong-way
      explain: "When only the left sensor sees the line, the line is to the left, so the robot must steer left, towards it. Kai steers away, so the robot leaves the line."
```

This version uses **both** sensors, so the robot knows which way it has drifted. It drives straight while both see the line, and steers only when one slips off. *Both see the line* is an **and** block (in **Logic**): it is true only when the question on each side is true.

### What should it do?

Match each case to the right move. Watch the robot in the simulator to check.

### Kai's robot

Kai's program:

```makecode
robot.elecfreaksCuteBot.start()
basic.forever(function () {
    if (robot.detectLine(RobotLineDetector.Left) && robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(40, 40)
    } else if (robot.detectLine(RobotLineDetector.Left)) {
        robot.motorTank(40, 10)
    } else if (robot.detectLine(RobotLineDetector.Right)) {
        robot.motorTank(10, 40)
    } else {
        robot.motorStop()
    }
})
```

## Modify

```step
stage: modify
insight: "Each case can be tuned on its own: speed on straights, a warning when lost."
try: { playground: microbit, starter: "line.ts#modify" }
tasks:
  - hint: "Change the first robot motor tank (both sensors see the line) to 60 60."
    check: { type: code, text: "Go faster on straight sections: 60 when both sensors see the line.", rules: { contains: ["robot.motorTank(60,60)"] } }
  - hint: "robot set color is in Robot. Put it in the last else, after robot motor stop, and choose red."
    check: { type: code, text: "Turn the lights red when the line is lost.", rules: { contains: ["robot.setColor("] } }
```

### Faster on straights

Delivery robots go faster where the line is straight. Make the robot drive at **60** when both sensors see the line. Does it still get round the bends?

### Lost the line

When neither sensor sees the line, the robot stops. Make its lights turn **red** too, so a person knows it needs help.

## Make

```step
stage: make
try: { playground: microbit, starter: "line.ts#make" }
hint:
  - "Add one more question at the very top of the if: robot obstacle distance < 10. Its move is robot motor stop."
  - "Click + on the if to add another else if, then drag the questions so the distance one comes first."
check: { type: code, text: "A delivery robot: follow the line, but stop if something blocks the line ahead.", rules: { inside: { "basic.forever": ["robot.detectLine(", "robot.obstacleDistance()", "robot.motorStop()"] } } }
```

Make a **delivery robot**: it follows the loop, but if something is on the line ahead, it **stops** and waits until it is moved.

- Drag a box onto the line to test it, then drag the box away. Does the robot carry on?
- Which question should the robot ask **first**: the distance, or the line sensors? Why?

## On a real robot

```step
stage: info
```

For a real track, use black electrical tape (about 2 cm wide) on a light floor or a large sheet of paper. Things to notice:

- Real line sensors are not simply on or off: shiny floors, shadows and tape edges confuse them. If yours misbehaves, try a different surface.
- Sharp corners are hard. Slow down, or make the tape curve gently.
- Robots that read **how dark** the floor is (not just on or off) can steer smoothly, turning more the further they drift. That is how competition line followers work.
