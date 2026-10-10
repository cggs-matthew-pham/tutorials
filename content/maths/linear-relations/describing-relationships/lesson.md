---
order: 5
unit: rules
node: AC9M7A04 n2
title: Describing a relationship
summary: "Describe how one measurement changes as the other increases, one section of the graph at a time: it increases, decreases or stays constant."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "A graph tells a story about how two things change together. Telling that story in words, section by section, is how scientists and journalists use graphs."
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8149
  url: http://127.0.0.1:8149/index.html
  readySelector: "#sl-cursor"
  layout: full
explainPicture: { ref: data.yml#pic, caption: "A bike ride. 0 to 2 hours: the distance from home increases. 2 to 3 hours: it stays constant (stopped). 3 to 5 hours: it decreases (riding home)." }
explainClip:
  query: { code: "@data.yml#explain", fresh: 1, id: explain }
  caption: "Describe one section at a time"
  say: "Describe the graph one section at a time."
  clip:
    - caption: { text: "0 to 2 h: distance from home increases.", say: "From zero to two hours, the distance from home increases." }
    - click: Move the cursor right
    - click: Move the cursor right
    - wait: 400
    - expect: { selector: "#gread", contains: "Distance from home = 60 km" }
    - caption: { text: "2 to 3 h: it stays constant. The cyclist has stopped.", say: "From two to three hours it stays constant: the cyclist has stopped." }
    - click: Move the cursor right
    - wait: 400
    - expect: { selector: "#gread", contains: "Distance from home = 60 km" }
    - caption: { text: "3 to 5 h: it decreases, back to 0.", say: "From three to five hours it decreases, back to zero." }
    - click: Move the cursor right
    - click: Move the cursor right
    - wait: 400
    - expect: { selector: "#gread", contains: "Distance from home = 0 km" }
    - wait: 1200
---
A graph does not just give values. It shows how one measurement **changes** as the other changes. Look at one section at a time, and ask: as the time goes on, does the other measurement **increase**, **decrease**, or stay **constant** (not change)? The data on these graphs are examples.

## Predict: which story?

```step
stage: predict
insight: "Committing to a story for a line that rises, flattens and falls exposes reading the graph as a picture of hills instead of as distance changing with time."
check:
  type: predict
  q: "A graph shows a cyclist's distance from home against time. The line goes up, then is flat, then goes down. Which story fits?"
  options: ["Rides away, stops for a rest, rides home", "Rides up a hill, along the flat, then down a hill", "Rides away, then faster, then slower", "Rides away, then home, then away again"]
  actual: "Rides away, stops for a rest, rides home. Up means the distance from home is increasing, flat means it is not changing (stopped), and down means it is decreasing (riding back). The graph shows distance, not the shape of the road."
```

What is measured up the side? What would the line do if the cyclist stopped?

## Run: follow the ride

```step
stage: run
insight: "Moving the cursor section by section shows what the distance does while the time goes on, and that a flat line still has time passing."
try: { playground: board, starter: "data.yml#run", height: 560 }
check: { type: board, text: "Move the cursor $R$ along the whole ride, to 4 hours. Was your prediction right?", when: "x(R) = 4" }
```

Move the cursor a step at a time. For each section, say what the distance from home does as time goes on.

## Investigate: describing sections

```step
stage: investigate
insight: "Describe each section by comparing its start and end: the measurement increases, decreases or is constant as time increases; a line going down does not mean going downhill."
tasks:
  - picture: { ref: data.yml#ride-plain, caption: "The bike ride: distance from home (km) against time (h)." }
    check:
      type: question
      q: "Between 2 and 3 hours, which sentence is true?"
      options: ["As time increases, the distance from home stays constant", "As time increases, the distance from home increases", "As time increases, the distance from home decreases"]
      answer: 0
      explain: "The line is flat from 2 to 3 hours: the distance is 60 km at both times, so it does not change. The cyclist has stopped."
  - picture: { ref: data.yml#ride-plain, caption: "The same ride." }
    check:
      type: question
      q: "What is the cyclist doing between 3 and 5 hours?"
      options: ["Riding back towards home", "Riding down a hill", "Riding away from home"]
      answer: 0
      explain: "The distance from home decreases from 60 km to 0 km: the cyclist is riding back towards home."
  - check:
      type: bug
      code: "working.txt#omar"
      text: "Omar describes the ride from 3 to 5 hours. Click the line where his reasoning goes wrong."
      answer: 3
      fault: logic
      misconception: graph-as-picture
      explain: "Line 3: the graph does not show hills. The line goes down because the distance from home is getting smaller: the cyclist is riding home."
```

### A rest

Here is how to describe a graph, one section at a time.

```worked
\text{0 to 2 h: } 0 \to 60 \text{ km} :: Take one section at a time and compare its start and end. The distance increases.
\text{2 to 3 h: } 60 \to 60 \text{ km} :: The distance does not change. It is constant.
\text{3 to 5 h: } 60 \to 0 \text{ km} :: The distance decreases.
\text{increases} \to \text{constant} \to \text{decreases} :: Put the sections in order. Say it: "As time increases, the distance from home increases, then stays constant, then decreases."
```

### Riding home

### Find the mistake

Read Omar's working one line at a time. What is the line really showing?

## Modify: other stories

```step
stage: modify
insight: "One change at a time: a story with a turning point, two graphs on one set of axes, and a measurement that decreases at a slowing rate."
try: { playground: board, starter: "data.yml#bath", height: 560 }
tasks:
  - starter: "data.yml#bath"
    hint: "The water stops rising when the line goes flat. When does it start to go down?"
    check: { type: board, text: "Water in a bath (L) against time (min). Move $R$ to the moment the water starts to go down.", when: "x(R) = 6", explain: "The water is level from 4 to 6 minutes and starts to go down after 6 minutes (the plug is pulled)." }
  - picture: { ref: data.yml#walkers-plain, caption: "Ali and Beth walk to school: distance (m) against time (min)." }
    check:
      type: question
      q: "Beth waits for 5 minutes, then walks. What does the graph say at 10 minutes?"
      options: ["Beth has walked further than Ali", "Ali has walked further than Beth", "They are at the same place"]
      answer: 0
      explain: "At 10 minutes Beth is at 1000 m and Ali is at 800 m. Beth waited, then walked faster, and passed Ali."
  - picture: { ref: data.yml#cooling-plain, caption: "A hot drink cooling: temperature (°C) against time (min)." }
    check:
      type: question
      q: "Which sentence describes the graph?"
      options: ["As time increases, the temperature decreases, quickly at first and then more slowly", "As time increases, the temperature decreases at the same rate", "As time increases, the temperature decreases and then increases"]
      answer: 0
      explain: "The line always goes down, so the temperature decreases. It drops 30 degrees in the first 10 minutes but only 3 degrees in the last 10: it slows down."
```

### The bath

Each task loads a new graph. Describe the sections before you answer.

### Two walkers

### A cooling drink

## Practise: describe and match

```step
stage: practise
insight: "Describing and matching on new graphs, with one reading question mixed in so students must decide whether a question asks for a value or a description; the review is reading a value from the last lesson."
tasks:
  - picture: { ref: data.yml#ride-plain, caption: "The bike ride." }
    check:
      type: question
      q: "Which sentence describes the ride from 0 to 2 hours?"
      options: ["As time increases, the distance from home increases", "As time increases, the distance from home stays constant", "The cyclist rides up a hill"]
      answer: 0
      explain: "The line goes up from 0 to 60 km: the distance from home increases."
  - picture: { ref: data.yml#tank-plain, caption: "Water in a tank (L) against time (min)." }
    check:
      type: question
      q: "Which story fits the graph?"
      options: ["The tank fills slowly, the water is left, then it fills faster", "The tank fills, then drains, then fills again", "The tank fills at the same rate the whole time"]
      answer: 0
      explain: "From 0 to 3 min it rises (30 L). From 3 to 6 min it is flat (nothing added). From 6 to 9 min it rises 60 L, faster than before."
  - picture: { ref: data.yml#cooling-plain, caption: "The cooling drink." }
    check:
      type: answer
      q: "Review: what is the temperature at 20 minutes, in °C?"
      answer: "45"
      feedback:
        - ["20", "That is the time. Read the temperature up the side."]
      explain: "At 20 min the line is at 45 °C: the point is (20, 45)."
  - picture: { ref: data.yml#bath-plain, caption: "Water in a bath (L) against time (min)." }
    check:
      type: question
      q: "Between 6 and 8 minutes, the amount of water..."
      options: ["increases", "decreases", "stays constant"]
      answer: 1
      explain: "The line goes down from 80 L to 40 L: the water decreases (the plug is pulled)."
```

### The ride

### A tank

### Review

### The bath again

## Make: draw a bath

```step
stage: make
insight: "Making a graph from a story reverses describing: students choose each value to fit the words, and must keep the flat part flat."
try: { playground: board, starter: "data.yml#make", height: 560 }
hint: ["The bath starts empty: what is the water at 0 minutes?", "A flat part means two points at the same height."]
check: { type: board, text: "Draw this story: a bath is empty at 0 minutes. It fills until 4 minutes, stays the same from 4 to 6 minutes, then empties and is empty again at 10 minutes.", when: "y(A) = 0 and y(B) > y(A) and y(C) > y(B) and y(D) = y(C) and y(E) < y(D) and y(E) > y(F) and y(F) = 0", explain: "For example 0, 40, 80, 80, 40, 0: it rises, stays level, then falls back to zero." }
```

Drag each point up or down. Then describe your graph in a sentence.

Stretch: draw a bath that fills quickly at first, then slowly.
