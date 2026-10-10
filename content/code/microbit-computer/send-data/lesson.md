---
order: 1
unit: usb
title: Send data to the computer
summary: A micro:bit sends each sensor reading down the USB cable as a line of text, such as light:128. The computer turns the stream of lines into a graph.
language: makecode
introduces: [serial-write]
explainPicture: send.ts#predict
hook: "Weather stations, heart-rate monitors and the sensors in a science lab all do the same simple thing: send a reading, wait, send the next. A computer collects the readings and draws the graph."
---
In micro:bit Foundations, everything you made stayed on the micro:bit. Now it talks to the computer it is plugged into. A cable that sends text one line at a time is called **serial**.

## Predict

```step
stage: predict
code: send.ts#predict
check:
  type: predict
  q: "This program runs on a micro:bit plugged into a computer. What arrives at the computer every half second?"
  options: ["A line of text, such as light:128", "A graph", "Just the number 128", "A picture of the LEDs"]
  actual: "A line of text: the name light, a colon, and the reading. The computer draws the graph from the lines; the micro:bit only sends text."
```

## Run

```step
stage: run
code: send.ts#predict
try: { playground: microbit, starter: "send.ts#predict" }
check: { type: reflect, text: "I changed the light level in the simulator and watched the values change under Show data." }
```

Run it in the simulator. Under the micro:bit, click **Show data** (it appears once a program sends values) to see the readings as numbers and as a graph. Drag the simulator's **light level** up and down.

## On a real micro:bit

```step
stage: run
tier: typical
insight: "The same lines arrive from a real micro:bit, and a different program (this board) can graph them: the text format is what connects the two."
try: { playground: board, starter: "boards.yml#graph", height: 640 }
check: { type: board, text: "Download the program to a micro:bit, connect it, and collect at least 10 light readings.", when: "n_light >= 10" }
```

Click **Download** in the editor and copy the program to your micro:bit. Leave it plugged in, then click **Connect a micro:bit** below and choose it. Cover the micro:bit with your hand, then shine a torch on it.

## Investigate

```step
stage: investigate
code: send.ts#predict
insight: "Each reading is a named line of text sent again and again; the name tells values apart and the pause sets how often a reading is sent."
tasks:
  - check:
      type: question
      q: "Why does each line start with a name (light:)?"
      options: ["So the computer can tell different values apart when there are several", "The cable needs a name to work", "To make the number bigger", "So the micro:bit remembers it"]
      answer: 0
      explain: "With light:128 and temperature:21 arriving on the same cable, the name says which is which. The graph draws one line per name."
  - check:
      type: question
      q: "You delete the pause. What happens?"
      options: ["Readings pour out as fast as the micro:bit can send them, far more than you need", "Nothing is sent", "One reading is sent, then it stops", "The readings get more accurate"]
      answer: 0
      explain: "Forever repeats as fast as it can. The pause sets how many readings a second you get: 500 ms is two a second."
  - check:
      type: question
      q: "Ben's program sends one reading when the micro:bit starts, then nothing. Why?"
      options: ["The block is in on start, not in forever, so it runs only once", "The cable is broken", "Light level only works once", "The board can only read one line"]
      answer: 0
      explain: "A logger has to read and send again and again: the send goes in forever, with a pause."
```

### Names

### No pause

### Ben's logger

Ben's program:

```makecode
serial.writeValue("light", input.lightLevel())
```

## Modify

```step
stage: modify
insight: "A second named value appears as its own line on the graph; changing the pause changes how often readings arrive."
try: { playground: microbit, starter: "send.ts#predict" }
tasks:
  - hint: "Add a second serial write value inside forever, named temperature, with temperature (°C) from Input."
    check: { type: code, text: "Send the temperature as well as the light level, each with its own name.", rules: { inside: { "basic.forever": ["serial.writeValue(\"light\",input.lightLevel())", "serial.writeValue(\"temperature\",input.temperature())"] } } }
  - hint: "Change the pause so it sends ten readings a second."
    check: { type: code, text: "Send ten light readings a second.", rules: { contains: ["basic.pause(100)", "serial.writeValue(\"light\""] } }
```

### Two values

Send the **temperature** too, with its own name. In Show data (or on the board), each name gets its own line.

### Faster

Make it send **ten readings a second**.

## Make

```step
stage: make
try: { playground: microbit, starter: "send.ts#make" }
hint:
  - "Acceleration (mg) is in Input; choose x, then y."
  - "Two serial write value blocks in forever: x and y. On button A pressed: serial write line mark."
check: { type: code, text: "A tilt logger: send x and y acceleration five times a second, and send the line mark when A is pressed.", rules: { inside: { "basic.forever": ["Dimension.X", "Dimension.Y", "basic.pause(200)"], "input.onButtonPressed": ["serial.writeLine(\"mark\")"] }, count: { "serial.writeValue(": 2 } } }
```

Make a **tilt logger**: send the micro:bit's **x** and **y** acceleration five times a second, and send the line **mark** when **A** is pressed, so you can mark a moment on the record. Tilt it in the simulator and watch Show data.
