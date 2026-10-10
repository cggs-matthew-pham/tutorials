---
order: 4
unit: rules
node: AC9M7A04 n1
title: Reading a graph
summary: A point on a graph of real data pairs two measurements. Find one value on its axis, go to the line, and read across to the other axis.
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Weather maps, phone battery meters and sports stats all use graphs. Before you can use one, you need to read it: which number is on which axis?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8148
  url: http://127.0.0.1:8148/index.html
  readySelector: "#sl-cursor"
  layout: full
explainPicture: { ref: data.yml#pic, caption: "At 15 hours the temperature is 24 °C: find 15 on the Time axis, go up to the line, read across to the Temperature axis. The point is $(15, 24)$." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "Find one value, go to the line, read the other"
  say: "Find one value on its axis, go to the line, read the other."
  clip:
    - caption: { text: "Time is across. Temperature is up.", say: "Time is along the bottom. Temperature is up the side." }
    - wait: 400
    - click: Move the cursor right
    - click: Move the cursor right
    - click: Move the cursor right
    - wait: 400
    - caption: { text: "At 9 h, go up to the line: 14 °C.", say: "At nine hours, go up to the line: fourteen degrees." }
    - expect: { selector: "#gread", contains: "Temperature = 14 °C" }
    - click: Move the cursor right
    - click: Move the cursor right
    - wait: 400
    - caption: { text: "At 15 h it is 24 °C: the point (15, 24).", say: "At fifteen hours it is twenty-four degrees: the point fifteen, twenty-four." }
    - expect: { selector: "#gread", contains: "Temperature = 24 °C" }
    - wait: 1200
---
A graph of real data pairs two measurements. Each point says: **when this one was measured, that one was measured**. To read a graph, first check the **axis labels**: what is measured across, and what is measured up. The data on these graphs are examples.

## Predict: what does a point say?

```step
stage: predict
insight: "Committing to what (15, 24) means exposes swapped axes and reading the point as one number, before any graph is shown."
check:
  type: predict
  q: "A graph shows temperature (°C) up the side and time (h) along the bottom. One point on it is $(15, 24)$. What does that point say?"
  options: ["At 15 hours the temperature is 24 °C", "At 24 hours the temperature is 15 °C", "The temperature went up by 15, then by 24", "It is 15 °C for 24 hours"]
  actual: "At 15 hours the temperature is 24 °C. The first number is read along the bottom axis (Time), the second up the side (Temperature), just as when you plotted points. (At 24 hours the temperature is 15 °C swaps the axes.)"
```

Which axis is the first number read from? What are the units of each number?

## Run: move the cursor

```step
stage: run
insight: "Moving the cursor along the line shows both readings change together: the time on the bottom axis and the temperature at the line."
try: { playground: board, starter: "data.yml#run", height: 560 }
check: { type: board, text: "Move the cursor $R$ to 15 hours. Was your prediction right?", when: "x(R) = 15" }
```

Use the slider, the − and + buttons, or click on the graph. The readout names both values with their units. At 15 hours, how hot is it?

## Investigate: reading values

```step
stage: investigate
insight: "Reading a graph is four moves: check the axes, find the known value on its own axis, go to the line, read across to the other axis; the units go in the answer. Swapping the axes is the common slip."
tasks:
  - picture: { ref: data.yml#temp-plain, caption: "Temperature (°C) over one day. Time (h) is along the bottom." }
    check:
      type: answer
      q: "What is the temperature at 9 hours?"
      answer: "14"
      feedback:
        - ["9", "That is the time you were given. Go up from 9 on the Time axis to the line, then read across to the Temperature axis."]
        - ["12", "Check the gridlines: the line at 9 h is between 10 and 15."]
      explain: "At 9 h the line is at 14 °C, so the point is (9, 14)."
  - picture: { ref: data.yml#temp-plain, caption: "The same graph." }
    check:
      type: answer
      q: "At what time (in hours) is the temperature highest?"
      answer: "15"
      feedback:
        - ["24", "24 is the highest temperature, read up the side. The question asks for the time, read along the bottom."]
      explain: "The highest point is (15, 24): the temperature is highest at 15 h."
  - check:
      type: bug
      code: "working.txt#priya"
      text: "Priya reads the temperature at 6 hours from the graph. Click the line where she goes wrong."
      answer: 4
      fault: logic
      misconception: axes-swapped
      explain: "Line 4: the line is at 9 when the time is 6, and 9 is read up the side, so it is the temperature. At 6 hours the temperature is 9 °C. Priya swapped the two numbers."
```

### Temperature

Here is how to read a graph, step by step.

```worked
\text{Axes: Time (h) across, Temperature (°C) up} :: Check the labels first.
\text{Time} = 9 \text{ h} :: Find the value you know on its own axis.
(9, \; ?) :: Go up from 9 to the line.
\text{Temperature} = 14 \text{ °C} :: Read across to the other axis.
\text{At 9 h the temperature is 14 °C.} :: Say it in a sentence, with the units.
```

### The highest point

### Find the mistake

Read Priya's working one line at a time. Which number came from which axis?

## Modify: other graphs

```step
stage: modify
insight: "One change at a time: read the other way (from the up-axis to the across-axis), a flat section, and negative values below the axis."
try: { playground: board, starter: "data.yml#fuel", height: 560 }
tasks:
  - starter: "data.yml#fuel"
    hint: "Read up the side to find 26, then follow across to the line."
    check: { type: board, text: "A car's fuel tank: fuel (L) against distance (km). Move $R$ to where 26 litres are left. How far has it gone?", when: "y(R) = 26", explain: "The line is at 26 L when the distance is 200 km: the point is (200, 26)." }
  - picture: { ref: data.yml#plant-plain, caption: "A plant's height (cm) week by week." }
    check:
      type: question
      q: "What happens to the plant's height from week 3 to week 6?"
      options: ["It increases", "It decreases", "It stays the same (a flat line)"]
      answer: 2
      explain: "The line is flat from week 3 to week 6: the height is 14 cm each time, so it does not change."
  - picture: { ref: data.yml#night-plain, caption: "Temperature (°C) through a winter night. Below the axis is below zero." }
    hint: "A point below the Time axis has a negative temperature."
    check:
      type: answer
      q: "What is the lowest temperature on the night graph, in °C?"
      answer: "-6"
      feedback:
        - ["6", "The lowest point is below the axis, so the temperature is negative."]
      explain: "The lowest point is (8, −6): at 8 hours the temperature is −6 °C."
```

### Fuel

Each task loads a new graph. Read the axis labels first.

### A flat line

### Below zero

## Practise: read the graph

```step
stage: practise
insight: "Reading both ways on new graphs, mixed with a sentence-meaning question so students must decide which axis each number comes from; the review is substitution from an earlier lesson."
tasks:
  - picture: { ref: data.yml#temp-plain, caption: "Temperature (°C) over one day." }
    check:
      type: answer
      q: "What is the temperature at 21 hours?"
      answer: "16"
      feedback:
        - ["21", "That is the time. Read the temperature up the side."]
      explain: "At 21 h the line is at 16 °C: the point is (21, 16)."
  - picture: { ref: data.yml#fuel-plain, caption: "Fuel (L) against distance (km)." }
    check:
      type: answer
      q: "How much fuel is left after 300 km, in litres?"
      answer: "14"
      feedback:
        - ["300", "That is the distance. The fuel is read up the side."]
      explain: "At 300 km the line is at 14 L: the point is (300, 14)."
  - check:
      type: question
      q: "A graph of cost ($) against time (hours) has the point $(4, 30)$. Which sentence is true?"
      options: ["4 hours cost $30", "30 hours cost $4", "The cost went up by $4 over 30 hours"]
      answer: 0
      explain: "The first number is the time (4 hours) and the second is the cost ($30)."
  - check:
      type: answer
      q: "Review: find $y = 4x + 1$ when $x = 3$."
      answer: "13"
      feedback:
        - ["43", "4x means 4 × x, not 4 then 3."]
      explain: "y = 4 × 3 + 1 = 12 + 1 = 13."
```

### The time

### The fuel

### Which sentence?

### Review

## Make: tell a story with a graph

```step
stage: make
insight: "Making a graph from a story reverses reading: students choose each value to fit the words."
try: { playground: board, starter: "data.yml#make", height: 560 }
hint: ["The battery starts full. What is the battery at 0 hours?", "Each point must be lower than the one before it, and the last one is 20."]
check: { type: board, text: "Mia's phone is fully charged (100%) at 0 hours. It goes down every two hours, and is at 20% after 8 hours. Drag each point up or down to draw it.", when: "y(A) = 100 and y(B) < y(A) and y(C) < y(B) and y(D) < y(C) and y(E) = 20", explain: "Start at 100 and end at 20, lower each time, such as 100, 80, 60, 40, 20 (a steady fall) or 100, 70, 50, 30, 20." }
```

The points move up and down only. Then answer: what does your graph say about the battery at 4 hours?

Stretch: draw a graph where the battery falls quickly at first, then slowly.
