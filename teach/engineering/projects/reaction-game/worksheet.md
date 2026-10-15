---
title: "Reaction game"
subtitle: "Capstone projects · Years 8–9: sense and respond · Lesson 3"
---

# Reaction game

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Who in the class has the fastest reactions? To find out fairly, the game has to stop people guessing when the light will come on.


:::teacher-note

**In one sentence:** A Years 8–9 design project: a fair reaction timer with a random wait, a button and millis(), planned as an ordered loop with a false-start test, built in Tinkercad and optionally on hardware, tested and evaluated.

**Students should be able to say:** I can plan a program as an ordered loop. I can time an event with millis(). I can test a design for unfair or unexpected use.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Inquire: the brief


:::keep-together

**Sort each line of the brief: a criterion (what it must do, which you can test) or a constraint (a limit you must work within)?**

Groups: Criterion, Constraint

- Waits a random 2 to 5 s before lighting: {{field-15}}
- Shows the reaction time in ms: {{field-15}}
- Catches a press before the light (false start): {{field-15}}
- Kit parts only: {{field-15}}
- USB power: {{field-15}}

:::


:::teacher-note

**Answer:** Waits a random 2 to 5 s before lighting → Criterion; Shows the reaction time in ms → Criterion; Catches a press before the light (false start) → Criterion; Kit parts only → Constraint; USB power → Constraint

Criteria are what you will test at the end; constraints decide what you are allowed to build with.

:::


## Develop: plan before you build


:::keep-together

### The loop

**Put the game's loop() in order.**

A. `lit = millis();`

B. `digitalWrite(13, HIGH);`

C. `start = millis();`

D. `digitalWrite(13, LOW);`

E. `waitTime = random(2000, 5001);`

F. `Serial.println(millis() - lit);`

G. `while (millis() - start < waitTime) { if (digitalRead(2) == HIGH) { falseStart(); return; } }`

H. `while (digitalRead(2) == LOW) { }`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

Wait a random time (watching for false starts), light the LED, note millis(), wait for the press, subtract, print.

```maths
waitTime = random(2000, 5001);
start = millis();
while (millis() - start < waitTime) { if (digitalRead(2) == HIGH) { falseStart(); return; } }
digitalWrite(13, HIGH);
lit = millis();
while (digitalRead(2) == LOW) { }
Serial.println(millis() - lit);
digitalWrite(13, LOW);
```

:::


:::keep-together

### Timing

**The LED lit at millis() = 41200 and the button was pressed at 41487. What is the reaction time in ms?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 287

41487 − 41200 = 287 ms.

:::


## Create: build it


**In the simulator.** 

**For real.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}


:::wider

## Test: run your table


**Run the tests.** 

**Fix and re-test.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Evaluate: against the brief


:::keep-together

### Which is evidence?

**Which is the strongest evidence that the design meets a criterion?**

☐ The code has no errors

☐ A test from the table that set the input and recorded the expected result

☐ My partner said it looks good

☐ It worked when I tried it

:::


:::teacher-note

**Answer:** A test from the table that set the input and recorded the expected result

A planned test with a recorded result is evidence; everything else is a feeling.

:::


## Exit ticket

:::keep-together

**Why can't a reaction game use a single delay() for its random wait?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Nothing is read during a delay, so a press before the light (a false start) can't be caught.

:::

