---
order: 6
node: AC9S9U04 n4
woven: [AC9S9H02]
unit: models
title: How does light bend?
summary: "The wave model explains two things you can see. In reflection, wave fronts bounce off a surface and the angle of reflection equals the angle of incidence. In refraction, light slows down in a denser material such as glass or water, so the wave fronts bunch up and the direction bends towards the normal; light going straight in at 90° does not bend."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8293
  url: http://127.0.0.1:8293/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Light enters glass at 45°. The wave fronts slow down and bunch together, so the direction bends towards the normal (28°)." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Refraction"
  say: "Light bends because the waves slow down in glass."
  clip:
    - caption: { text: "Wave fronts of light coming down from the air towards glass.", say: "Wave fronts of light come down from the air towards glass." }
    - wait: 3000
    - caption: { text: "In glass the waves are slower, so the fronts are closer together.", say: "In glass the waves are slower, so the fronts are closer together." }
    - wait: 3400
    - caption: { text: "That makes the direction bend towards the normal: 45° becomes 28°.", say: "That bends the direction towards the normal: forty five degrees becomes twenty eight." }
    - wait: 3200
hook: "A straw in a glass of water looks snapped at the surface. The straw is fine. What is the light doing?"
---
The last lesson said light is a wave. Here the wave model explains two things you can see every day.

## Engage: into the glass

```step
stage: predict
insight: "Students guess the ray bends away, or by a rule they can't justify. Slowing down in the denser material, and the wave fronts changing direction as a result, is the explanation the wave model gives."
check:
  type: predict
  q: "A ray of light goes from air into glass at an angle. Which way does it bend?"
  options: ["Towards the normal (the line at right angles to the glass)", "Away from the normal", "It doesn't bend", "It depends on the colour of the glass"]
  actual: "Towards the normal. Light travels more slowly in glass than in air. The wave fronts bunch up and swing round so that the direction of travel is closer to the normal."
```

## Explore: wave fronts at a boundary

```step
stage: run
insight: "Seeing the wave fronts, not just the ray, shows why the bend happens: the fronts are closer together in the glass, so the direction must change."
try: { playground: board, starter: "boards.yml#glass", height: 680 }
tasks:
  - starter: "boards.yml#glass"
    check: { type: board, text: "Set the angle of incidence to 60°. What is the angle of refraction?", when: "i = 60" }
  - starter: "boards.yml#glass"
    check: { type: board, text: "Set the angle to 0°, straight in. Does the ray bend?", when: "i = 0" }
```

### 60 degrees

The blue lines are the crests of the waves. Watch what happens to the gap between them as they enter the glass.

### Straight in

## Explain: reflection and refraction

```step
stage: investigate
insight: "Applying the wave model to refraction, then the law of reflection, then the everyday straw, meets the node's second success criterion."
tasks:
  - check:
      type: question
      q: "Why does light bend as it goes from air into glass at an angle?"
      options: ["It slows down, so the wave fronts change direction", "It speeds up, so the wave fronts change direction", "The glass pushes it sideways"]
      answer: 0
      feedback: [null, "In glass light is slower, not faster.", "Nothing pushes it: the change of speed turns the wave fronts."]
      explain: "One end of each wave front enters the glass first and slows down while the other end is still travelling faster in the air. The front swings round, like a line of marchers when one end slows."
  - check:
      type: question
      q: "A ray goes straight into glass along the normal (angle of incidence 0°). What happens?"
      options: ["It slows down but doesn't change direction", "It bends towards the normal", "It bends away from the normal"]
      answer: 0
      feedback: [null, "There is no angle to reduce: the whole front enters at once.", "It doesn't bend."]
      explain: "The whole wave front reaches the glass at the same moment and slows together, so it doesn't turn."
  - check:
      type: question
      q: "A ray hits a mirror at 35° to the normal. At what angle does it reflect?"
      options: ["35° on the other side of the normal", "55°", "It depends on the mirror"]
      answer: 0
      feedback: [null, "That would be the angle to the surface, not the normal.", "The law holds for every flat mirror."]
      explain: "The angle of reflection equals the angle of incidence, measured from the normal."
  - check:
      type: question
      q: "Why does a straw in water look bent at the surface?"
      options: ["Light from the part under water bends as it leaves the water, so it seems to come from a different place", "The water bends the straw", "Water makes light go faster"]
      answer: 0
      feedback: [null, "The straw is straight; it is the light that bends.", "Light is slower in water than in air."]
      explain: "Light leaving the water speeds up and bends away from the normal. Your brain assumes it travelled in a straight line, so the underwater part seems shifted."
  - check: { type: reflect, text: "I can use the wave model to explain reflection and refraction." }
```

### Why it bends

### Straight in

### Mirror

### The straw

### In your own words

In your book: draw a ray going from air into glass with the normal, the angle of incidence and the angle of refraction. Add three wave fronts in each, closer together in the glass, and write one sentence saying why the ray bends.

## Elaborate: mirror, glass, diamond

```step
stage: modify
tier: typical
insight: "Comparing a mirror with glass, then glass with diamond, shows reflection as a bounce, refraction as a bend, and the amount of bending as the change in speed."
try: { playground: board, starter: "boards.yml#mirror", height: 680 }
tasks:
  - check: { type: board, text: "On the mirror, set 50°. What is the angle of reflection?", when: "i = 50 and e = 1" }
  - starter: "boards.yml#choose"
    check: { type: board, text: "Now choose Diamond at 60°. Then try Glass at the same angle.", when: "n = 2.4 and i = 60" }
  - check:
      type: question
      q: "Diamond bends light more than glass. What does that tell you about the speed of light in diamond?"
      options: ["Light is slower in diamond than in glass", "Light is faster in diamond", "It is the same: only the angle changes"]
      answer: 0
      feedback: [null, "More bending means a bigger change in speed, so a slower speed in the diamond.", "A different bend means a different speed."]
      explain: "The more the light slows down, the more the wave fronts bunch up and the more the direction changes."
```

### Mirror

### Diamond

### Why more

## Elaborate: fibre optics

```step
stage: modify
tier: wider
insight: "Total internal reflection is the limit of refraction; fibre optics shows how an idea from the wave model carries the internet."
check:
  type: question
  q: "If light inside glass hits the surface at a very shallow angle, it can't get out: it reflects back in. This is why light can run along a glass fibre for kilometres. What makes fibre optic cables useful?"
  options: ["They carry signals as light, which has a high frequency and so can carry a lot of information", "They are cheaper than copper wire", "Light moves faster in glass than in air"]
  answer: 0
  feedback: [null, "Cost isn't the reason.", "Light is slower in glass."]
  explain: "Light waves vibrate hundreds of trillions of times a second, so they can carry far more information than radio waves or electric currents in wires."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the bending of the ray with what I saw." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Reflection**: the angle of reflection equals the angle of incidence, both measured from the normal.
- **Refraction**: light slows down in a denser material, so the wave fronts bunch up and the direction bends **towards the normal**. Going out, it bends away.
- Light going straight in (along the normal) slows down but doesn't bend.
- The more the light slows, the more it bends.
