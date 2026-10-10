---
order: 9
unit: talk
title: Report back
summary: A patrol robot sends an alert to a base station when its way is blocked, once, using a variable to remember it has already told.
language: makecode
extensions: [robot]
explainPicture: report.ts#predict
hook: "Inspection robots patrol pipelines, warehouses and bush tracks on their own. They only call a person when they find something: a leak, a spill, a fallen tree."
---
So far a person told the robot what to do. Now the robot does its job on its own and **reports back**. It follows the line (lesson 5); when something blocks it, it stops and sends **"blocked"** by radio to a **base station**.

Both micro:bits run the same program, so each one has a **role**. Every micro:bit starts as a **robot**. Pressing **A+B** makes it the **base**: it stops driving and listens for alerts.

## Predict

```step
stage: predict
code: report.ts#predict
check:
  type: predict
  q: "Press A+B on the second micro:bit (the base). Then drag a box onto the line in front of the first robot. What does the base do?"
  options: ["Shows an X and beeps once", "Shows an X and beeps again and again while the box is there", "Nothing: the base cannot hear the robot", "Its own robot drives to help"]
  actual: "It shows an X and beeps once. The robot sends 'blocked' and sets alerted to true, so it does not send again until the way is clear."
```

## Run

```step
stage: run
code: report.ts#predict
try: { playground: microbit, starter: "report.ts#predict" }
check: { type: reflect, text: "I made one micro:bit the base, blocked the other robot with a box, and watched the base." }
```

Press **A+B** on the second micro:bit: it shows **B** and its robot stops. Drag a box onto the line in front of the first robot. Then drag the box away and let it patrol on.

## Investigate

```step
stage: investigate
code: report.ts#predict
insight: "forever keeps checking, so an alert in forever would be sent again every time round. A true/false variable remembers that the robot has already told, so it tells once."
tasks:
  - check:
      type: question
      q: "What is the variable alerted for?"
      options: ["It counts the alerts", "It remembers that the robot has already sent 'blocked', so it only sends once until the way is clear", "It stops the robot", "It chooses the radio group"]
      answer: 1
      explain: "alerted becomes true when the alert is sent. While the box stays, forever sees alerted is true and does not send again. When the way is clear, alerted goes back to false, ready for next time."
  - check:
      type: question
      q: "Noah's base beeps again and again, very fast, while the box is in front of his robot. Why?"
      options: ["His base is broken", "His robot sends 'blocked' every time forever runs while the box is there, because nothing remembers it has already told", "The radio echoes", "He needs a bigger distance"]
      answer: 1
      fault: logic
      misconception: alert-repeats
      explain: "forever runs many times a second. While the box is close, Noah's if is true every time, so it sends every time. A variable like alerted lets it send once."
```

### Tell once

Look at where **alerted** is set to true, and where it goes back to false.

### Noah's patrol

Noah's robot (the rest of his program is the same):

```makecode
basic.forever(function () {
    if (role == "robot") {
        if (robot.obstacleDistance() < 15) {
            robot.motorStop()
            radio.sendString("blocked")
        } else {
            followLine()
        }
    }
})
```

## Modify

```step
stage: modify
insight: "The robot and the base agree on a few message words; each new word needs a sender and a meaning."
try: { playground: microbit, starter: "report.ts#modify" }
tasks:
  - hint: ["In the robot's else, before alerted is set to false: if alerted, send 'clear'.", "On the base: if receivedString = 'clear', show a tick (icon Yes); else show the X and beep."]
    check: { type: code, text: "When the way is clear again, the robot sends 'clear' once, and the base shows a tick.", rules: { contains: ["radio.sendString(\"clear\")"], inside: { "radio.onReceivedString": ["IconNames.Yes"] } } }
  - hint: ["Make a variable alerts. On the base, when the message is not 'clear': change alerts by 1.", "Then show number alerts instead of the X."]
    check: { type: code, text: "The base counts the alerts and shows how many there have been.", rules: { inside: { "radio.onReceivedString": ["+=1", "basic.showNumber("] } } }
```

### All clear

A person at the base wants to know when the problem is fixed. When the way is clear again, the robot sends **"clear"** (once), and the base shows a **tick**.

### Count the alerts

Make the base **count** the alerts and show how many there have been, like a log of a shift's problems.

## Make

```step
stage: make
try: { playground: microbit, starter: "report.ts#make" }
hint:
  - "In the robot's forever: if the distance is less than 15, stop, red lights, send 'snake', pause 2000, then turn round (motor tank 50 −50 for 1200 ms). Else follow the line."
  - "On the base: if the message is 'snake', show icon snake and play an alarm. Once it has turned round, the box is behind it, so it sends once."
check: { type: code, text: "A snake spotter: the robot patrols, and when something is in the way it stops, alerts 'snake', waits, then turns back; the base shows a snake and sounds an alarm.", rules: { contains: ["radio.sendString(\"snake\")"], inside: { "radio.onReceivedString": ["IconNames.Snake"] } } }
```

Make a **snake spotter** for a bush track. The robot patrols the line; when something is in the way it:

- stops, shows **red** lights and sends **"snake"** to the base
- waits two seconds, then **turns round** and patrols back

The base shows the **snake** picture and sounds an **alarm**.

## On a real robot

```step
stage: info
```

With real micro:bits, one stays with a person as the base (press A+B on it) and the other goes in the robot. Things to notice:

- Use your own radio group, as in lesson 7.
- Radio has a range: a patrol robot that goes too far, or behind a wall, cannot be heard. Real inspection robots store their alerts and send them when they are back in range.
- A real sensor sees walls and people too: a patrol robot needs a clear track.
