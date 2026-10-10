---
order: 3
unit: sense
title: Stop before you crash
summary: Read the robot's distance sensor again and again, and stop before it hits something.
language: makecode
extensions: [robot]
explainPicture: stop.ts#investigate
hook: "A car's parking sensor beeps faster as you back towards a wall, and a robot vacuum turns before it bumps the couch. Both measure how far away things are, many times a second."
---
This robot has a **distance sensor** on its front. It sends out a sound too high for people to hear and times the echo, so it can tell how many centimetres away the nearest object is (up to 40). In blocks, **robot obstacle distance (cm)** gives that number. You find it in **Robot**.

In the simulator, the robot drives around a small arena with a looping track and some boxes. You can **drag the robot** and **drag the boxes** with the mouse.

## Predict

```step
stage: predict
code: stop.ts#predict
check:
  type: predict
  q: "A box is in front of the robot. What happens when the program runs?"
  options: ["The robot drives forward and stops a little before the box", "The robot crashes into the box, because it only checks the distance once", "The robot stops straight away, without moving", "The robot drives up to the box, then backs away"]
  actual: "It drives forward and stops a little before the box. forever reads the distance again and again, so the moment it drops below 15 cm, the robot stops."
```

The first block picks the robot (an Elecfreaks Cutebot). **robot motor tank** sets the left and right wheel speeds: 50 and 50 means straight ahead at half speed.

## Run

```step
stage: run
code: stop.ts#predict
try: { playground: microbit, starter: "stop.ts#predict" }
check: { type: reflect, text: "I dragged a box in front of the robot, watched what happened, and compared it with my prediction." }
```

The robot simulator appears beside the micro:bit. Drag a box into the robot's path (or drag the robot so it faces a box), then restart the simulator. Watch the blue wave: that is the sensor's beam.

## Investigate

```step
stage: investigate
code: stop.ts#investigate
insight: "The robot only knows how far away something is when the program reads the sensor. Reading it in forever, many times a second, lets it react in time."
tasks:
  - check:
      type: question
      q: "With nothing in front of the robot, what does obstacle distance give?"
      options: ["0", "40, the farthest the sensor can measure", "A random number", "Nothing: the block stops working"]
      answer: 1
      explain: "The sensor can measure up to 40 cm. With nothing in range, the robot reports 40, so 'distance < 15' is false and it keeps driving."
  - check:
      type: question
      q: "Why stop at 15 cm instead of 1 cm?"
      options: ["The sensor cannot measure 1 cm", "The robot keeps rolling a little after it is told to stop, so it needs room", "15 is the robot's top speed", "1 cm would make the robot reverse"]
      answer: 1
      explain: "Like a car, the robot slows down over a short distance after it is told to stop. Stopping early leaves room. Faster robots need more room."
  - check:
      type: question
      q: "Mia's robot crashes into every box. Which part is wrong?"
      options: ["The speed is too high", "The if is not inside forever, so the distance is checked once, at the very start", "15 should be 50", "motor stop is the wrong block"]
      answer: 1
      fault: logic
      misconception: run-once-vs-forever
      explain: "Without forever, the if runs once, before the robot has moved. The box is far away then, so the robot never checks again and drives straight into it."
```

This version also shows an **X** when it stops, so you can see the moment the question became true.

### What does it read?

Drag every box away from the robot and think about what the sensor sees.

### Why 15?

Look at how far the robot travels after the X appears.

### Mia's robot

Mia's program:

```makecode
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50)
if (robot.obstacleDistance() < 15) {
    robot.motorStop()
}
```

## Modify

```step
stage: modify
insight: "The number in the question decides how close the robot gets, and anything can happen when the question is true."
try: { playground: microbit, starter: "stop.ts#modify" }
tasks:
  - hint: "Change 15 to 25 in the if."
    check: { type: code, text: "Make the robot stop farther from the box: 25 cm.", rules: { contains: ["robot.obstacleDistance()<25"] } }
  - hint: ["show icon is in Basic.", "Put it inside the if, under robot motor stop. Choose the X."]
    check: { type: code, text: "Show an X when the robot stops.", rules: { inside: { "basic.forever": ["robot.motorStop()", "basic.showIcon(IconNames.No)"] } } }
```

### Stop farther away

Make the robot stop when the box is closer than **25 cm**. Drag a box in front and test it.

### Stop sign

Show an **X** on the micro:bit when the robot stops.

## Make

```step
stage: make
try: { playground: microbit, starter: "stop.ts#make" }
hint:
  - "Inside forever: if the distance is less than 10, stop. Else if it is less than 30, drive slowly. Else, drive at 50."
  - "Click the + on the if block to add else if and else. Slow is robot motor tank 20 20."
check: { type: code, text: "A parking robot: full speed when the way is clear, slow when something is near, and stop when it is close.", rules: { inside: { "basic.forever": ["robot.obstacleDistance()", "robot.motorStop()"] }, count: { "robot.motorTank(": 2 } } }
```

Make a **parking robot**, like a car easing into a parking space:

- closer than **10 cm**: stop
- closer than **30 cm**: drive slowly (20)
- otherwise: drive at 50

Test it by dragging a box towards the robot, and away again.

## On a real robot

```step
stage: info
```

The same program runs on a real Cutebot: download it and put the robot on the floor facing a wall or a box. Things to notice and tune:

- **Readings jump about.** Real sensors are noisy, and soft things (a jumper, a cushion) send back weak echoes. Test with a book or a box.
- **Stopping distance changes with the floor.** On carpet the robot stops sooner than on a smooth desk. Change 10 and 30 until it stops cleanly.
- **Batteries matter.** Weak batteries make the robot slower, so it may stop shorter.
