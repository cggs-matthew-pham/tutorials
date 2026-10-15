---
title: "Drive and stop"
subtitle: "Robotics challenges · Drive · Lesson 1"
---

# Drive and stop

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A parade float, a warehouse trolley and a robot lawn mower all start the same way: two wheels, each told how fast to turn, and for how long.


:::teacher-note

**In one sentence:** Students set each wheel's speed with robot motor tank, drive and turn for a time, and find that a timed move does not stop the motors by itself; they finish by driving a square.

**Students should be able to say:** I can set the left and right wheel speeds to drive, turn and curve. I can make a move last for a time, and stop the robot at the end. I can repeat a drive and a turn to make a shape.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

The **for … ms** part of a motor block (click its + to show it) is a time: the robot keeps that speed for that long, then the program moves on to the next block. 1000 ms is one second.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/91165a52e362.png?v=6e688e3dacdf203a)

:::keep-together

**The robot drives forward for 1 second, then turns for half a second. What happens next?**

☐ It drives forward again

☐ It turns back the way it came

☐ It stops: the program has finished

☐ It keeps spinning: nothing told the motors to stop

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It keeps spinning. 'for 500 ms' means wait half a second before the next block, not stop. With no next block, the motors keep going as they were.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

This version adds **robot motor stop** at the end, so the robot stops after its turn.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/66f0bf8a628e.png?v=8f9d82e42e0ee072)

:::keep-together

### Which way?

**Match each pair of wheel speeds with what the robot does.**

A. spins on the spot, to the right

B. drives straight backwards

C. curves gently to the right

D. drives straight ahead

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `left 50, right 50` | |
| `left 50, right −50` | |
| `left 50, right 20` | |
| `left −50, right −50` | |

:::


:::teacher-note

**Answer:** left 50, right 50 → D. drives straight ahead; left 50, right −50 → A. spins on the spot, to the right; left 50, right 20 → C. curves gently to the right; left −50, right −50 → B. drives straight backwards

:::


:::keep-together

### Ava's robot

Ava's program:

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/83841ba6a3b1.png?v=aa33366f65c0b66f)

**Ava wants her robot to drive, turn, drive again, and then stop. Her robot never stops. Why?**

☐ 1000 ms is too long

☐ Her last move has a time, but a time does not stop the motors: she needs robot motor stop at the end

☐ She needs a forever block

☐ Her turn is the wrong way

:::


:::teacher-note

**Answer:** Her last move has a time, but a time does not stop the motors: she needs robot motor stop at the end

The time on her last block only says when to move on. There is nothing after it, so the motors keep going. robot motor stop at the end fixes it.

:::


:::typical

## Modify


**Back it up.** After the turn, make the robot drive **backwards** for one second before it stops.

**Curve.** Add a gentle curve before the stop: left wheel **50**, right wheel **20**, for **2 seconds**. Which way does it curve?

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Back it up:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/81d8bff6a803.png?v=f09f2fd16cadc80c)

**Curve:**

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/26d74025e4a9.png?v=dca768afa6ec42dd)

:::

:::


## Make

Make the robot drive a **square**, like a delivery trolley going round the four sides of a room:

- inside a **repeat 4 times**: drive forward, then turn
- after the repeat: stop

The turn's time decides the angle. Start with **400 ms** and change it until the corners look square.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

![The program as blocks](https://studio.learningwaypoints.com/tutorials/_pictures/makecode/code/bfb99b79c21b.png?v=09c3211d82cff6e9)

:::


:::wider

## On a real robot

The square program runs on a real Cutebot too. Put it on the floor with room to move. Things to notice:

- **It will not be a perfect square.** One motor is always a little stronger, so the robot drifts. The **robot set motor drift** block corrects it.
- **The turn time changes with the floor** and the batteries. Tune it again on the real robot.
- Real robots without wheel sensors cannot measure angles, which is why we turn **for a time**.

:::


## Exit ticket

:::keep-together

**Why does a robot keep moving after its last 'for 500 ms' block?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The time only says when to move on to the next block. The motors keep their last speed until a block such as robot motor stop changes them.

:::

