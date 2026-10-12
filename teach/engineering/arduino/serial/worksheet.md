---
title: "Talking to the computer"
subtitle: "Arduino · Writing C++ · Lesson 4"
---

# Talking to the computer

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Your sketch decides from a number you can't see. When the LED does something odd, how do you find out what the board actually read?


:::teacher-note

**In one sentence:** Students open the serial line in setup(), print a knob's reading every loop and watch it change, build lines with print and println, meet C++'s "words" + number trap (it moves along the text instead of joining), fix a missing Serial.begin, and print a percentage with map.

**Students should be able to say:** I can print a value to the serial monitor. I can use print and println to build a line. I can use printing to find out what my sketch sees.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict


:::keep-together

**The knob is halfway. loop() runs Serial.println(level); after level = analogRead(A0);. What does the serial monitor show?**

☐ level

☐ Nothing

☐ 512, on a new line each time

☐ Level: 512

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 512 (halfway on 0 to 1023), one line every time loop() runs. println prints the variable's value, not its name.

:::


## Run

Try it on the board in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Worked example: print and println


:::keep-together

### Build a line

1. $\text{Serial.begin(9600);}$ — In setup(): open the line. Nothing prints without it.
2. $\text{Serial.print("Level: ");}$ — Send the words. The cursor stays on this line.
3. $\text{Serial.println(level);}$ — Send the value of level (512), then a new line.
4. $\text{monitor: Level: 512}$ — One line per loop().

Now pick the pair that does this.

**Which pair of lines prints Level: 512 on one line, then starts a new line?**

☐ Serial.println("Level: "); Serial.print(level);

☐ Serial.println("Level: "); Serial.println(level);

☐ Serial.print("Level: "); Serial.print(level);

☐ Serial.print("Level: "); Serial.println(level);

:::


:::teacher-note

**Answer:** Serial.print("Level: "); Serial.println(level);

print stays on the line; println ends it.

:::


:::keep-together

### Find the mistake

**Sam's monitor shows bits of Level: and then nonsense instead of Level: 512. Click the line where Sam's sketch goes wrong.**

```
 1  int level = 0;
 2  
 3  void setup() {
 4    Serial.begin(9600);
 5  }
 6  
 7  void loop() {
 8    level = analogRead(A0);
 9    Serial.println("Level: " + level);
10    delay(250);
11  }
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 9

Line 9: in C++, "Level: " + level doesn't join them (as Python would); it moves level characters along the text and prints what is there. Use Serial.print("Level: "); then Serial.println(level);

:::


:::typical

## Vary: change one thing


**Add a label.** 

**Nothing printed.** 

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


:::typical

## Build it in Tinkercad


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::


## Printing


:::keep-together

### Print and println

**loop() is Serial.print(1); Serial.print(2); Serial.println(3);. What does the monitor show after two loops?**

☐ 123123 on one line

☐ 6, then 6

☐ 123 on one line, then 123 on the next

☐ 1, 2 and 3 on separate lines, twice

:::


:::teacher-note

**Answer:** 123 on one line, then 123 on the next

print, print, println: one line of 123 per loop.

:::


:::keep-together

### Debugging

**A night light comes on in daylight. What is the most useful first step?**

☐ Print the reading and compare it with the threshold

☐ Rewrite the whole sketch

☐ Add a longer delay

☐ Swap the LED

:::


:::teacher-note

**Answer:** Print the reading and compare it with the threshold

Printing the value shows whether the reading or the threshold is the problem.

:::


## Make: print a percentage


Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

## Exit ticket

:::keep-together

**Write the two lines in loop() that print Temp: and then the value of temp on one line.**

{{lines-3}}

:::


:::teacher-note

**Answer:** Serial.print("Temp: "); Serial.println(temp);

:::

