---
title: "Reading the C++"
subtitle: "Arduino · A new board · Lesson 2"
---

# Reading the C++

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** MakeCode had 'on start' and 'forever'. An Arduino sketch has the same two parts, written as C++. Which part runs when, and how many times?


:::teacher-note

**In one sentence:** Students watch setup() run once and loop() repeat, trace board time through a blink, see why blink code in setup() blinks only once, and change delays to set a blink's timing, including a lighthouse from its timing.

**Students should be able to say:** I can say what setup() and loop() each do. I can work out a blink's timing from its delays. I can choose delays for a timing.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The blink sketch runs for 10 seconds. How many times does setup() run?**

☐ Never: only loop() runs

☐ Twice

☐ Once

☐ Every time loop() runs

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Once, when the board starts. Then loop() runs again and again: 10 times in 10 seconds here, as each loop takes 1 s.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: time it


:::keep-together

### Board time

1. $\text{setup(): pinMode(13, OUTPUT)}$ — Runs once, at 0 ms. Pin 13 is now an output.
2. $\text{loop(): digitalWrite(13, HIGH)}$ — LED on. Writing takes (almost) no time.
3. $\text{delay(500)}$ — Wait 500 ms with the LED on.
4. $\text{digitalWrite(13, LOW); delay(500)}$ — LED off for 500 ms.
5. $\text{end of loop()} \to \text{start of loop()}$ — 1000 ms per blink, for ever.

Now fill in the times.

**Fill in the board time after each line of loop(), starting at 0 ms.**

{{rows 1}}

| line | LED | time (ms) |
|---|---|---|
| digitalWrite(13, HIGH); | on | 0 |
| delay(500); | on |   |
| digitalWrite(13, LOW); | off |   |
| delay(500); | off |   |

:::


:::teacher-note

**Answer:** 500, 500, 1000

Only delay takes time: the LED is on from 0 to 500 ms and off from 500 to 1000 ms, then loop() starts again.

:::


:::keep-together

### Sam's blink

```cpp
void setup() {
  pinMode(13, OUTPUT);
  digitalWrite(13, HIGH);
  delay(500);
  digitalWrite(13, LOW);
  delay(500);
}

void loop() {
}
```

**Sam put the blink lines in setup() and left loop() empty (below). What does the LED do?**

☐ Blinks for ever

☐ Stays on

☐ Never lights

☐ Blinks once, then stays off

:::


:::teacher-note

**Answer:** Blinks once, then stays off

setup() runs once, so the LED blinks once. Anything that should repeat goes in loop().

:::


:::typical

## Vary: change the timing


**Twice as fast.** 

**A flash.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Timing


:::keep-together

### Count the blinks

**loop() is: HIGH, delay(300), LOW, delay(700). How many blinks in 10 seconds?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 10

Each loop takes 1000 ms, so 10 blinks in 10 s.

:::


:::keep-together

### Where it goes

**Where does pinMode(13, OUTPUT); belong?**

☐ In loop(): so it keeps working

☐ In setup(): it only needs doing once

☐ Before setup(), outside both

☐ It doesn't matter

:::


:::teacher-note

**Answer:** In setup(): it only needs doing once

Set up once in setup(); repeat in loop().

:::


## Make: a lighthouse


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**What is the difference between setup() and loop()?**

{{lines-3}}

:::


:::teacher-note

**Answer:** setup() runs once when the board starts; loop() runs again and again after it.

:::

