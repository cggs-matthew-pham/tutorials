---
order: 1
unit: drive
title: Drive and stop
summary: Set the speed of each wheel, drive for a time, turn, and stop.
language: makecode
extensions: [robot]
explainPicture: drive.ts#investigate
hook: "A parade float, a warehouse trolley and a robot lawn mower all start the same way: two wheels, each told how fast to turn, and for how long."
---
This robot has **two wheels**, one on each side, each with its own motor. In blocks, **robot motor tank** sets the speed of the **left** and **right** wheel, from −100 (full speed backwards) to 100 (full speed forwards). You find it in **Robot**.

Every robot program starts with a block that picks the robot: here, an **Elecfreaks Cutebot**.

## Predict

```step
stage: predict
code: drive.ts#predict
check:
  type: predict
  q: "The robot drives forward for 1 second, then turns for half a second. What happens next?"
  options: ["It stops: the program has finished", "It keeps spinning: nothing told the motors to stop", "It drives forward again", "It turns back the way it came"]
  actual: "It keeps spinning. 'for 500 ms' means wait half a second before the next block, not stop. With no next block, the motors keep going as they were."
```

The **for … ms** part of a motor block (click its + to show it) is a time: the robot keeps that speed for that long, then the program moves on to the next block. 1000 ms is one second.

## Run

```step
stage: run
code: drive.ts#predict
try: { playground: microbit, starter: "drive.ts#predict" }
check: { type: reflect, text: "I watched what the robot did after the turn, and compared it with my prediction." }
```

Watch the robot in the simulator. If it drives off the edge or into a box, drag it back to the middle and restart the simulator.

## Investigate

```step
stage: investigate
code: drive.ts#investigate
insight: "A motor keeps doing what it was last told. A time on a motor block only says when to move on to the next block, so a robot needs a stop."
tasks:
  - check:
      type: match
      q: "Match each pair of wheel speeds with what the robot does."
      pairs:
        - ["left 50, right 50", "drives straight ahead"]
        - ["left 50, right −50", "spins on the spot, to the right"]
        - ["left 50, right 20", "curves gently to the right"]
        - ["left −50, right −50", "drives straight backwards"]
  - check:
      type: question
      q: "Ava wants her robot to drive, turn, drive again, and then stop. Her robot never stops. Why?"
      options: ["Her turn is the wrong way", "Her last move has a time, but a time does not stop the motors: she needs robot motor stop at the end", "1000 ms is too long", "She needs a forever block"]
      answer: 1
      fault: logic
      misconception: timed-move-stops
      explain: "The time on her last block only says when to move on. There is nothing after it, so the motors keep going. robot motor stop at the end fixes it."
```

This version adds **robot motor stop** at the end, so the robot stops after its turn.

### Which way?

Match each pair of wheel speeds with the move it makes. Try any you are unsure of in the simulator.

### Ava's robot

Ava's program:

```makecode
robot.elecfreaksCuteBot.start()
robot.motorTank(50, 50, 1000)
robot.motorTank(-50, 50, 500)
robot.motorTank(50, 50, 1000)
```

## Modify

```step
stage: modify
insight: "Changing the two speeds changes the move; the time changes how far it goes."
try: { playground: microbit, starter: "drive.ts#modify" }
tasks:
  - hint: ["Add another robot motor tank before robot motor stop.", "Make both speeds −50. Click the + on the block to add a time, and set it to 1000 ms."]
    check: { type: code, text: "After the turn, drive backwards for 1 second, then stop.", rules: { contains: ["robot.motorTank(-50,-50"] } }
  - hint: ["Add a robot motor tank before robot motor stop.", "Left 50, right 20, for 2000 ms."]
    check: { type: code, text: "Before stopping, curve to the right: left 50, right 20, for 2 seconds.", rules: { contains: ["robot.motorTank(50,20,2000)"] } }
```

### Back it up

After the turn, make the robot drive **backwards** for one second before it stops.

### Curve

Add a gentle curve before the stop: left wheel **50**, right wheel **20**, for **2 seconds**. Which way does it curve?

## Make

```step
stage: make
try: { playground: microbit, starter: "drive.ts#make" }
hint:
  - "repeat is in Loops. Put one drive and one turn inside it, and set it to 4."
  - "Drive with 50 50 for 1000 ms; turn with 50 −50. Change the turn's time until each corner looks square. Put robot motor stop after the repeat."
check: { type: code, text: "A square: drive and turn, repeated 4 times, then stop.", rules: { inside: { "for(": ["robot.motorTank("] }, count: { "robot.motorTank(": 2 }, contains: ["robot.motorStop()"] } }
```

Make the robot drive a **square**, like a delivery trolley going round the four sides of a room:

- inside a **repeat 4 times**: drive forward, then turn
- after the repeat: stop

The turn's time decides the angle. Start with **400 ms** and change it until the corners look square.

## On a real robot

```step
stage: info
```

The square program runs on a real Cutebot too. Put it on the floor with room to move. Things to notice:

- **It will not be a perfect square.** One motor is always a little stronger, so the robot drifts. The **robot set motor drift** block corrects it.
- **The turn time changes with the floor** and the batteries. Tune it again on the real robot.
- Real robots without wheel sensors cannot measure angles, which is why we turn **for a time**.
