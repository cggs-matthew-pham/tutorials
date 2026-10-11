---
order: 4
node: AC9S7U03 n3
unit: moon
title: Why isn't there an eclipse every month?
summary: "A solar eclipse happens at new moon when the moon's shadow falls on Earth; a lunar eclipse at full moon when the moon passes through Earth's shadow. The moon's orbit is tilted about 5°, so most months the shadows miss: eclipses come in seasons about six months apart."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8225
  url: http://127.0.0.1:8225/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "From above and from the side: the moon's orbit tilted about 5°, so most new and full moons miss the shadow." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Eclipses are rare"
  say: "The moon's orbit is tilted about five degrees, so eclipses are rare."
  clip:
    - caption: { text: "At every new moon, the moon passes between the Earth and the sun.", say: "At every new moon, the moon passes between the Earth and the sun." }
    - wait: 3940
    - click: "Next full moon"
    - wait: 1500
    - click: "Next new moon"
    - wait: 1500
    - caption: { text: "But its orbit is tilted about 5°, so its shadow usually misses Earth.", say: "But its orbit is tilted about five degrees, so its shadow usually misses." }
    - wait: 3940
    - click: "Next full moon"
    - wait: 1500
    - click: "Next new moon"
    - wait: 1500
    - caption: { text: "An eclipse needs a new or full moon right where the orbits cross.", say: "An eclipse needs a new or full moon right where the orbits cross." }
    - wait: 600
hook: "There's a new moon every month, with the moon between us and the sun. Yet the next total solar eclipse seen from Sydney, on 22 July 2028, will be the first there in over 150 years."
---
You know where the moon is at each phase. This lesson: when the sun, Earth and moon line up exactly.

## Engage: every month?

```step
stage: predict
insight: "Students who reason in 2D expect an eclipse at every new and full moon; the side view shows the tilt that prevents it."
check:
  type: predict
  q: "At every new moon the moon is between the Earth and the sun. How often do you think there's a solar eclipse somewhere on Earth?"
  options: ["Every month", "About twice a year", "Once every hundred years", "Never: they are too rare to predict"]
  actual: "About twice a year (between two and five times), and each one is seen only from part of the Earth. Most months the moon passes just above or below the line to the sun."
```

## Explore: step through a year

```step
stage: run
insight: "Stepping through a year of new and full moons and watching the side view shows eclipses only when the moon is near the plane of Earth's orbit."
try: { playground: board, starter: "boards.yml#year", height: 660 }
check: { type: board, text: "Step through new and full moons until you have seen a solar eclipse and a lunar eclipse.", when: "s >= 1 and u >= 1" }
```

Press **Next full moon** / **Next new moon** again and again. Watch the side view: where is the moon compared with the plane of Earth's orbit? Watch the top view: where is the orange crossing line when an eclipse happens?

## Explain: conditions for an eclipse

```step
stage: investigate
insight: "Stating the conditions for each type, the two kinds of shadow and the tilt explanation are the node's three criteria."
tasks:
  - check:
      type: sort
      q: "Solar eclipse or lunar eclipse?"
      options: ["Solar eclipse", "Lunar eclipse"]
      items:
        - ["Happens at new moon", "Solar eclipse"]
        - ["Happens at full moon", "Lunar eclipse"]
        - ["The moon is between the sun and the Earth", "Solar eclipse"]
        - ["The Earth is between the sun and the moon", "Lunar eclipse"]
        - ["The moon's shadow falls on part of Earth", "Solar eclipse"]
        - ["The moon turns a dark red", "Lunar eclipse", "Sunlight bent through Earth's air reaches the moon and is reddened, like a sunset."]
  - check:
      type: match
      q: "Match each shadow to what you'd see from inside it."
      pairs:
        - ["Umbra", "The dark centre: the light source is completely blocked (a total eclipse)"]
        - ["Penumbra", "The outer part: the light source is partly blocked (a partial eclipse)"]
  - check:
      type: question
      q: "Why isn't there a solar eclipse at every new moon?"
      options: ["The moon's orbit is tilted about 5° to Earth's, so the moon usually passes above or below the line from the sun to the Earth", "The moon is too small", "The sun is sometimes too bright", "The moon moves too fast"]
      answer: 0
      feedback: [null, "It's just big enough to cover the sun when it's exactly in line.", "Brightness doesn't stop the shadow.", "Speed doesn't matter: the line-up does."]
  - check: { type: reflect, text: "I can state the conditions for solar and lunar eclipses, describe the umbra and penumbra, and explain why eclipses don't happen every month." }
```

### Solar or lunar

### Shadows

### The tilt

### In your own words

In your book: draw a side view of the sun, Earth and moon for a lunar eclipse, and for a full moon without one. Shade the umbra and penumbra.

## Elaborate: a flat orbit

```step
stage: modify
tier: typical
insight: "Removing the tilt in the model and getting an eclipse every time shows the tilt is the reason, not a detail."
try: { playground: board, starter: "boards.yml#flat", height: 680 }
tasks:
  - check: { type: board, text: "Flatten the moon's orbit and step through at least four new and full moons.", when: "f = 1 and l >= 4" }
  - check:
      type: question
      q: "With a flat orbit, how often were there eclipses?"
      options: ["At every new moon and every full moon", "About twice a year", "Never", "Only in summer"]
      answer: 0
      feedback: [null, "Look at the log: every one.", "That's the real, tilted orbit.", "Every line-up gave one."]
```

### Flat orbit

### How often

## Elaborate: predicting eclipses

```step
stage: modify
tier: wider
insight: "Seeing why eclipses seemed unpredictable without a 3D model connects the physics to the history of science."
check:
  type: question
  q: "Many ancient peoples recorded eclipses carefully but found them hard to predict. Babylonian astronomers eventually noticed eclipses repeat in a cycle of about 18 years. Which missing idea makes eclipses predictable from first principles?"
  options: ["The moon's tilted orbit, and where it crosses Earth's orbit plane: eclipses happen only when that crossing line points at the sun", "The size of the moon", "The speed of light", "The exact date of every new and full moon"]
  answer: 0
  feedback: [null, "Size matters for total or annular, not for when.", "Not needed to predict them.", "Those dates tell you when a line-up is possible, but not whether the moon passes above, below or through the line."]
  explain: "Long records let people find patterns (like the 18-year saros cycle) even without the model; the 3D model explains why the pattern exists."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first prediction about how often eclipses happen with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Solar eclipse:** new moon, moon between sun and Earth, the moon's shadow falls on part of Earth.
- **Lunar eclipse:** full moon, Earth between sun and moon, the moon passes through Earth's shadow (it often looks red).
- **Umbra:** full shadow (total eclipse). **Penumbra:** partial shadow (partial eclipse).
- The moon's orbit is **tilted about 5°**, so most new and full moons miss: eclipses come in **eclipse seasons** about every six months.
