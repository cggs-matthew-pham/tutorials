---
title: "Values and decisions"
subtitle: "Arduino · Writing C++ · Lesson 3"
---

# Values and decisions

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The night light on the micro:bit decided with a threshold. Same idea, new words: what does it look like in C++, and which two tiny slips stop it working?


:::teacher-note

**In one sentence:** Students read a sketch that stores a knob's reading in an int and switches an LED with if and else, test it across the threshold, meet the two classic slips (a missing ; that stops the upload, and = in an if that makes it always true), fix both, and light the LED in a band with &&.

**Students should be able to say:** I can declare an int and store a reading in it. I can write an if and else to decide. I can fix a missing ; and an = that should be a comparison.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The knob is turned all the way down. After level = analogRead(A0); what is level, and is the LED on?**

☐ LOW, and the LED is off

☐ 0, and the LED is on

☐ 1023, and the LED is on

☐ 0, and the LED is off

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** level is 0 (analogRead gives 0 to 1023), 0 is not greater than 500, so the else switches the LED off.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: two slips


:::keep-together

### Read it

1. $\text{int level = 0;}$ — A whole-number variable called level, starting at 0.
2. $\text{level = analogRead(A0);}$ — Store the knob's reading (0 to 1023) in level.
3. $\text{if (level > 500)}$ — Is it greater than 500? True or false.
4. $\text{true: digitalWrite(13, HIGH);}$ — The first { } runs: LED on.
5. $\text{false: digitalWrite(13, LOW);}$ — The else { } runs: LED off.

Now: what happens at exactly 500?

**The knob reads 500 exactly. Is the LED on?**

☐ Only if level is an int

☐ No: 500 is not greater than 500

☐ Yes: 500 is the threshold

☐ It flickers

:::


:::teacher-note

**Answer:** No: 500 is not greater than 500

level &gt; 500 is false for 500, so the else runs.

:::


:::keep-together

### Find the mistake

**Sam's LED stays on whatever the knob does. Click the line where Sam's sketch goes wrong.**

```
 1  int level = 0;
 2  
 3  void setup() {
 4    pinMode(13, OUTPUT);
 5  }
 6  
 7  void loop() {
 8    level = analogRead(A0);
 9    if (level = 500) {
10      digitalWrite(13, HIGH);
11    } else {
12      digitalWrite(13, LOW);
13    }
14  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

Line 9: level = 500 sets level to 500 and the if uses that value, which isn't 0, so it is always true. Comparing needs == (or here, &gt;).

:::


:::typical

## Vary: change one thing


**Below 300.** 

**Won't upload.** 

**Always on.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Conditions


:::keep-together

### Which is true?

**level is 300. Which condition is true?**

☐ level == 301

☐ level &gt; 300

☐ level &gt;= 300

☐ level &lt; 300

:::


:::teacher-note

**Answer:** level &gt;= 300

&gt;= includes the value itself.

:::


:::keep-together

### Between

**if (level &gt; 300 &amp;&amp; level &lt; 700) means…**

☐ level is below 300 or above 700

☐ Nothing: &amp;&amp; is a typo

☐ level is between 300 and 700

☐ level is 300 or 700

:::


:::teacher-note

**Answer:** level is between 300 and 700

&amp;&amp; means and: both must be true.

:::


## Make: a middle band


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Write an if that switches pin 13 on when level is 800 or more, and off otherwise.**

{{lines-3}}

:::


:::teacher-note

**Answer:** if (level &gt;= 800) { digitalWrite(13, HIGH); } else { digitalWrite(13, LOW); }

:::

