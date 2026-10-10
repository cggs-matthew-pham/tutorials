---
order: 2
unit: earth
title: Why is summer hot?
summary: "Seasons are caused by the Earth's tilted axis, not its distance from the sun. Leaning towards the sun gives a higher noon sun (concentrated light) and longer days: summer. The two hemispheres have opposite seasons."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8227
  url: http://127.0.0.1:8227/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Earth's orbit from above, its axis always leaning the same way; from the side, Canberra tilted towards the sun in December." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Why summer is hot"
  say: "Seasons come from the Earth's tilt, not its distance from the sun."
  clip:
    - caption: { text: "December: Canberra leans towards the sun. Long days, high noon sun.", say: "In December, Canberra leans towards the sun: long days and a high noon sun." }
    - wait: 800
    - click: { selector: "#skyd" }
    - caption: { text: "July: Canberra leans away. Short days, low sun: winter.", say: "In July, Canberra leans away: short days, a low sun, winter." }
    - wait: 1200
    - caption: { text: "Earth is closest to the sun in January, so distance isn't the cause.", say: "Earth is closest to the sun in January, so distance isn't the cause." }
    - wait: 600
hook: "On 4 January the Earth is at its closest to the sun all year, five million kilometres closer than in July. That day it's summer in Canberra and winter in London."
---
The Earth's axis is tilted and always points the same way. This lesson: what that does across a year.

## Engage: why is it hotter?

```step
stage: predict
insight: "The distance misconception is persistent; students who hold it will choose 'closer', and the board's distance readout contradicts it."
check:
  type: predict
  q: "Why is it hotter in Canberra in December than in June?"
  options: ["The Earth is closer to the sun in December", "The Earth's tilt makes the Southern Hemisphere lean towards the sun in December", "The sun gives out more heat in December", "There are fewer clouds in December"]
  actual: "The tilt. In December the Southern Hemisphere leans towards the sun: the noon sun is high and the days are long. The Earth is in fact closest to the sun in early January, but that changes the sunlight by only about 7%."
```

## Explore: December and June

```step
stage: run
insight: "Reading daylight, noon sun height and distance for both solstices puts the evidence against distance in front of the student."
try: { playground: board, starter: "boards.yml#canberra", height: 640 }
check: { type: board, text: "Compare Canberra in late December and late June (daylight, noon sun and distance).", when: "g >= 4" }
```

Move the **Date** slider between December and June. Note the daylight, how high the sun is at noon, and the distance from the sun each time.

## Explain: tilt, not distance

```step
stage: investigate
insight: "Linking tilt to sun angle and day length, and confronting distance with evidence, is the hinge."
tasks:
  - check:
      type: question
      q: "In late December, when it's summer in Canberra, how far is the Earth from the sun compared with late June?"
      options: ["About 5 million km closer", "About 5 million km farther", "The same distance", "Twice as close"]
      answer: 0
      feedback: [null, "Check the distance on the board: about 147 in December and 152 in June.", "The orbit is nearly a circle, but not quite.", "Nowhere near: the orbit is almost a circle."]
  - check:
      type: question
      q: "If distance caused seasons, what would be true?"
      options: ["Both hemispheres would have summer at the same time", "Australia would have summer in December", "Seasons would be opposite in the two hemispheres", "Nothing would change"]
      answer: 0
      feedback: [null, "Australia does have summer in December, but so would London if distance caused it.", "That's what really happens, and distance can't explain it.", "Distance changes would affect the whole Earth at once."]
  - check:
      type: sort
      q: "Which go with Canberra's summer, and which with its winter?"
      options: ["Summer", "Winter"]
      items:
        - ["Southern Hemisphere leans towards the sun", "Summer"]
        - ["Noon sun high in the sky", "Summer"]
        - ["About 9½ hours of daylight", "Winter"]
        - ["Sunlight hits the ground at a low angle, spread over a bigger area", "Winter"]
        - ["About 14½ hours of daylight", "Summer"]
  - check: { type: reflect, text: "I can explain seasons using tilt, sun height and day length, and explain why distance can't be the cause." }
```

### Distance

### A test of distance

### Summer and winter

### In your own words

In your book: draw a torch shining straight down and at a slant onto paper. Use it to explain why a high sun heats the ground more.

## Practise: the other hemisphere

```step
stage: practise
tier: typical
insight: "Seeing opposite seasons on the same date in London and Canberra is the strongest evidence for the tilt explanation."
try: { playground: board, starter: "boards.yml#hemispheres", height: 640 }
tasks:
  - check: { type: board, text: "Pick one date and compare London with an Australian city.", when: "q = 2" }
  - check:
      type: question
      q: "On 22 June, London has about 16½ hours of daylight and Canberra about 9½. Why?"
      options: ["The Northern Hemisphere leans towards the sun in June, and the Southern Hemisphere leans away", "London is closer to the sun", "London is nearer the equator", "The sun is bigger in London"]
      answer: 0
      feedback: [null, "Both cities are the same distance from the sun.", "London is farther from the equator than Canberra.", "It's the same sun."]
```

### Same date

### Why opposite

## Elaborate: no tilt

```step
stage: modify
tier: wider
insight: "Removing the tilt in the model and watching the seasons disappear shows tilt is the cause, not just a correlation."
try: { playground: board, starter: "boards.yml#tilt", height: 680 }
tasks:
  - check: { type: board, text: "Set the tilt to 0° and look at three different months.", when: "t = 0 and m >= 3" }
  - check:
      type: question
      q: "With no tilt, what happens to Canberra's seasons?"
      options: ["They disappear: about 12 hours of daylight and the same noon sun all year", "They get stronger", "They swap", "Nothing changes"]
      answer: 0
      feedback: [null, "Check the daylight at three dates.", "Try a bigger tilt for stronger seasons.", "Look again: the daylight stops changing."]
  - check:
      type: question
      q: "In Kakadu, Bininj people recognise six seasons, marked by changes in rain, wind, plants and animals, rather than four. Why can both systems be useful?"
      options: ["The tilt model explains why the year changes; a six-season calendar describes the changes people actually observe in that place", "Only the four-season model is science", "The six seasons are caused by a different tilt", "Kakadu has no seasons"]
      answer: 0
      feedback: [null, "Careful observation of local signs over many generations is knowledge too.", "Same Earth, same tilt.", "Near the tropics the big change is wet and dry, which a four-season calendar doesn't show well."]
```

### No tilt

### Seasons without tilt

### Six seasons

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about summer with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Seasons are caused by the Earth's **tilt**, not its distance from the sun (we are closest in January).
- Leaning **towards** the sun: the noon sun is **higher** (light concentrated on a smaller area) and days are **longer**: summer.
- The two hemispheres have **opposite** seasons. Near the equator the changes are small.
