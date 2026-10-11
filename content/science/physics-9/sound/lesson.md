---
order: 2
node: AC9S9U04 n2
unit: models
title: How does sound travel?
summary: "Sound is a longitudinal wave: a vibrating source makes compressions (particles squashed together) and rarefactions (particles spread out) that travel through a medium, with each particle only vibrating to and fro in place. Frequency sets the pitch and amplitude sets the loudness. Without particles, as in a vacuum, there is nothing to carry the wave."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8289
  url: http://127.0.0.1:8289/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A sound wave in air: squashed and spread-out patches travel along, while each particle (like the orange one) only moves to and fro." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "A sound wave"
  say: "A sound wave is a pattern of squashed and spread-out particles that travels."
  clip:
    - caption: { text: "The speaker pushes and pulls the air. Squashed patches and spread-out patches travel along.", say: "The speaker makes squashed patches and spread-out patches that travel along." }
    - wait: 2800
    - caption: { text: "Follow the orange particle: it only moves to and fro. The wave travels; the particles don't.", say: "The orange particle only moves to and fro. The wave travels, the particle does not." }
    - wait: 3000
    - click: "Pitch: more"
    - click: "Pitch: more"
    - caption: { text: "More vibrations each second: a higher pitch, and shorter waves.", say: "More vibrations each second give a higher pitch and shorter waves." }
    - wait: 3200
    - click: "Loudness: more"
    - click: "Loudness: more"
    - caption: { text: "Bigger vibrations: a louder sound.", say: "Bigger vibrations make a louder sound." }
    - wait: 2800
hook: "In space, an explosion is completely silent. Yet on Earth you can hear a thunderclap from kilometres away. What is sound actually made of?"
---
You have heard sounds all your life. This lesson looks at what is happening in the air between a sound and your ear.

## Engage: one particle of air

```step
stage: predict
insight: "Students picture air particles streaming from the speaker to the ear. The wave model says the pattern travels while each particle only vibrates in place; this is the idea the whole unit builds on."
check:
  type: predict
  q: "A speaker plays a note. As the sound passes through the air, what does one particle of air do?"
  options: ["It vibrates to and fro in about the same place", "It travels from the speaker all the way to your ear", "It speeds up, then stops", "It doesn't move: only the sound does"]
  actual: "It vibrates to and fro in about the same place. Each particle bumps its neighbour and returns. What travels is the pattern of squashing, not the particles."
```

## Explore: make some sounds

```step
stage: run
insight: "Controlling pitch and loudness separately and watching the wavelength and the height of the pressure graph change separates the two properties that everyday words blur together."
try: { playground: board, starter: "boards.yml#sound", height: 680 }
tasks:
  - starter: "boards.yml#sound"
    check: { type: board, text: "Make a high, quiet sound: pitch 4 or more, loudness 2 or less. Wait for it to reach the listener.", when: "f >= 4 and a <= 2 and h = 1" }
  - starter: "boards.yml#sound"
    check: { type: board, text: "Now a low, loud sound: pitch 2 or less, loudness 4 or more.", when: "f <= 2 and a >= 4 and h = 1" }
```

### High and quiet

Use the sliders or the + and − buttons. Follow the orange particle. What changes about the waves, and what changes about the particles?

### Low and loud

## Explain: the wave model of sound

```step
stage: investigate
insight: "Naming compressions and rarefactions, tying frequency to pitch and amplitude to loudness, and explaining why a vacuum is silent covers the node's three success criteria."
tasks:
  - check:
      type: question
      q: "What is a compression in a sound wave?"
      options: ["A place where the particles are squashed closer together", "A place where the particles are spread further apart", "The sound getting quieter"]
      answer: 0
      feedback: [null, "That is a rarefaction.", "Quietness is about amplitude, not compressions."]
      explain: "A compression is a squashed patch; a rarefaction is a stretched, spread-out patch. A sound wave is a line of them, one after the other."
  - check:
      type: question
      q: "In sound, the particles vibrate backwards and forwards along the direction the wave travels. What do we call this kind of wave?"
      options: ["Longitudinal", "Transverse", "Stationary"]
      answer: 0
      feedback: [null, "In a transverse wave the vibration is at right angles to the direction of travel, like a wave on a rope shaken up and down.", "Stationary isn't a kind of wave in this sense."]
      explain: "Longitudinal: the vibration is along the direction of travel. That is why sound is squashes and stretches."
  - check:
      type: question
      q: "You raise the pitch. What has increased?"
      options: ["The frequency: more vibrations each second, so shorter waves", "The amplitude: bigger vibrations", "The speed of every particle"]
      answer: 0
      feedback: [null, "Amplitude sets the loudness, not the pitch.", "Pitch is about how often, not how fast."]
      explain: "Higher pitch means higher frequency (more compressions pass each second). Loudness depends on amplitude, the size of the vibration."
  - check:
      type: match
      q: "Match the change to the effect on the sound."
      pairs:
        - ["Bigger vibrations (larger amplitude)", "Louder"]
        - ["More vibrations each second (higher frequency)", "Higher pitch"]
        - ["Fewer vibrations each second", "Lower pitch"]
  - check:
      type: question
      q: "Why can't sound travel through a vacuum?"
      options: ["There are no particles to vibrate and pass the energy on", "A vacuum absorbs the sound", "Sound is too slow in a vacuum"]
      answer: 0
      feedback: [null, "Nothing absorbs it: there is simply nothing there to carry it.", "It isn't slow: it doesn't travel at all."]
      explain: "Sound is energy passed from particle to particle. With no particles, there is nothing to pass it along."
  - check: { type: reflect, text: "I can describe a sound wave using compressions and rarefactions, and link pitch and loudness to frequency and amplitude." }
```

### Compression

### Longitudinal

### Pitch

### Matching

### Vacuum

### In your own words

In your book: draw a row of dots for air before a sound arrives, then again with a compression and a rarefaction marked. Add one sentence saying what each particle does.

## Elaborate: different media

```step
stage: modify
tier: typical
insight: "Comparing air, steel and a vacuum links the wave model to the particle model: closer, more tightly bonded particles pass the vibration on faster, and no particles means no sound."
try: { playground: board, starter: "boards.yml#choose", height: 680 }
tasks:
  - check: { type: board, text: "Choose Vacuum from the menu. Watch the listener.", when: "m = 0" }
  - check: { type: board, text: "Now choose Steel. Wait for the sound to arrive.", when: "m = 3 and h = 1" }
  - check:
      type: question
      q: "Sound travels at about 340 m/s in air, 1500 m/s in water and 5000 m/s in steel. Why is it fastest in steel?"
      options: ["The particles are closer together and tightly bonded, so each passes the vibration on sooner", "Steel particles are heavier", "Steel is warmer"]
      answer: 0
      feedback: [null, "Weight isn't the reason: tightly bonded neighbours respond faster.", "Temperature isn't what makes the difference between materials."]
      explain: "In a solid the particles are packed close together and joined to their neighbours, so a vibration is passed on very quickly. In a gas they are far apart, so it takes longer."
```

### Vacuum

### Steel

### Why faster

## Elaborate: an instrument

```step
stage: modify
tier: wider
insight: "Applying the wave model to a real instrument shows pitch and loudness set by the vibrating air and the size of the instrument."
check:
  type: question
  q: "A yidaki (didjeridu) is a hollow wooden tube. The player's lips vibrate the air inside it. A longer tube makes a lower note. Using the wave model, which is the best explanation?"
  options: ["The longer column of air vibrates more slowly, so the frequency is lower and the pitch is lower", "A longer tube makes the sound louder, so it sounds lower", "Sound travels slower in longer tubes"]
  answer: 0
  feedback: [null, "Loudness and pitch are different properties.", "The speed in the air stays about the same; the vibration slows down."]
  explain: "A longer air column vibrates at a lower frequency, so the pitch is lower. The material and shape of the tube also affect how the sound carries."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the air particle with what I saw." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Sound is a **longitudinal wave**: particles vibrate to and fro along the direction the wave travels.
- A wave is a line of **compressions** (squashed) and **rarefactions** (spread out). The pattern travels; the particles stay in place.
- **Frequency** (vibrations per second) sets the **pitch**; **amplitude** (size of the vibration) sets the **loudness**.
- Sound needs a **medium**: it cannot travel through a vacuum. It is faster in solids than in gases because the particles are closer together.
