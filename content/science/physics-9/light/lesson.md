---
order: 5
node: AC9S9U04 n4
unit: models
title: What is the electromagnetic spectrum?
summary: "Light is a transverse wave, and it is one small part of a family of electromagnetic waves: radio, microwave, infrared, visible light, ultraviolet, X-rays and gamma rays. They all travel at the same speed in a vacuum (300 000 km/s) and differ in frequency and wavelength. Higher frequency means a shorter wavelength and more energy, which decides what each is used for and how careful we must be with it."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8292
  url: http://127.0.0.1:8292/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "The electromagnetic spectrum: from radio waves (long, low energy) to gamma rays (short, high energy). Visible light is a narrow band in the middle." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "The electromagnetic spectrum"
  say: "Radio waves, light and X-rays are the same kind of wave, with different frequencies."
  clip:
    - caption: { text: "Ultraviolet, one of seven kinds of electromagnetic wave.", say: "Ultraviolet is one of seven kinds of electromagnetic wave." }
    - wait: 2400
    - click: "Radio"
    - caption: { text: "Radio: long waves, low frequency, low energy.", say: "Radio: long waves, low frequency, low energy." }
    - wait: 2800
    - click: "Gamma"
    - caption: { text: "Gamma: short waves, high frequency, high energy.", say: "Gamma: short waves, high frequency, high energy." }
    - wait: 3000
    - caption: { text: "All travel at 300 000 km/s in a vacuum. Visible light is a narrow band in the middle.", say: "All travel equally fast in a vacuum, and light is a narrow band." }
    - wait: 3200
hook: "A sunburn, a microwave oven, a TV remote and a hospital X-ray all use the same kind of wave. What makes them so different?"
---
Sound needed particles to carry it. Light doesn't. This lesson meets the wave model for light and for its whole family.

## Engage: more energy

```step
stage: predict
insight: "Students rank by familiarity or by 'power' (microwaves heat food). Frequency, not the device, sets the energy of each wave."
check:
  type: predict
  q: "Microwaves and X-rays are both electromagnetic waves. Which has more energy in each wave?"
  options: ["X-rays: a higher frequency means more energy", "Microwaves: they can cook food", "They are the same, because they travel at the same speed", "You can't compare them"]
  actual: "X-rays. Energy goes up with frequency, and X-rays have a frequency tens of thousands of times higher than microwaves. A microwave oven cooks food because it is powerful, not because each wave has a lot of energy."
```

## Explore: the seven bands

```step
stage: run
insight: "Visiting every band and reading wavelength, frequency, use and risk side by side builds the pattern: shorter waves, higher frequency, more energy, more risk."
try: { playground: board, starter: "boards.yml#spectrum", height: 680 }
tasks:
  - starter: "boards.yml#spectrum"
    check: { type: board, text: "Click each of the seven bands, from Radio to Gamma, and read the details.", when: "n = 7" }
  - starter: "boards.yml#spectrum"
    check: { type: board, text: "Find the band that causes sunburn.", when: "b = 4" }
  - starter: "boards.yml#spectrum"
    check: { type: board, text: "Find the band used to look at bones.", when: "b = 5" }
```

### Every band

Watch the wave at the bottom change: not to scale, but the pattern is real.

### Sunburn

### Bones

## Explain: the wave model of light

```step
stage: investigate
insight: "Transverse, speed in a vacuum, and the link between frequency, wavelength and energy are the node's three success criteria; the uses sort connects the pattern to technologies."
tasks:
  - check:
      type: question
      q: "Light is a transverse wave. What does that mean?"
      options: ["The vibration is at right angles to the direction the wave travels", "The vibration is along the direction of travel, like sound", "The wave needs particles to travel through"]
      answer: 0
      feedback: [null, "That is a longitudinal wave: sound.", "Light needs no medium: it crosses empty space from the Sun."]
      explain: "Transverse: like a rope shaken sideways, the vibration is across the direction of travel. Electromagnetic waves are vibrating electric and magnetic fields, so they need no particles."
  - check:
      type: question
      q: "Radio waves and gamma rays travel through a vacuum. How do their speeds compare?"
      options: ["They are the same: 300 000 km/s", "Gamma rays are much faster", "Radio waves are faster because they are longer"]
      answer: 0
      feedback: [null, "Speed in a vacuum is the same for every electromagnetic wave.", "Longer waves aren't faster."]
      explain: "All electromagnetic waves travel at the same speed in a vacuum, the speed of light. They differ in frequency and wavelength, not speed."
  - check:
      type: question
      q: "Going from radio to gamma, what happens to the wavelength and the energy?"
      options: ["The wavelength gets shorter and the energy greater", "The wavelength gets longer and the energy greater", "The wavelength gets shorter and the energy smaller"]
      answer: 0
      feedback: [null, "Longer wavelength goes with lower frequency and less energy.", "Short wavelength goes with high frequency and high energy."]
      explain: "Speed is fixed, so a higher frequency means a shorter wavelength, and a higher frequency means more energy in each wave."
  - check:
      type: match
      q: "Match each wave to a use."
      pairs:
        - ["Radio waves", "Broadcasting to radios and TVs"]
        - ["Microwaves", "Cooking food, Wi-Fi and mobile phones"]
        - ["Infrared", "TV remotes and thermal cameras"]
        - ["Ultraviolet", "Sterilising water and checking banknotes"]
        - ["X-rays", "Imaging bones and checking luggage"]
        - ["Gamma rays", "Treating cancer and sterilising equipment"]
  - check:
      type: question
      q: "Why are UV, X-rays and gamma rays more dangerous to living cells than radio waves?"
      options: ["Each wave carries a lot more energy, enough to damage cells", "They are brighter", "They travel faster"]
      answer: 0
      feedback: [null, "Brightness is about visible light only.", "They all travel at the same speed."]
      explain: "High-frequency waves carry much more energy in each wave, enough to damage the molecules in cells. Low-frequency waves such as radio don't."
  - check: { type: reflect, text: "I can describe light as a transverse wave, and say how wavelength, frequency and energy change across the spectrum." }
```

### Transverse

### Same speed

### Wavelength and energy

### Uses

### Danger

### In your own words

In your book: draw a line with the seven bands from radio to gamma. Under it write 'longer wavelength, lower frequency, less energy' at one end and the opposite at the other, then add one use to each band.

## Elaborate: choosing a wave

```step
stage: modify
tier: typical
insight: "Choosing a band for a job from wavelength, frequency and risk applies the pattern to real communication and medical technologies."
try: { playground: board, starter: "boards.yml#spectrum", height: 680 }
tasks:
  - check: { type: board, text: "Find the band with a wavelength of about 12 cm.", when: "b = 1" }
  - check:
      type: question
      q: "Why does a mobile phone use microwaves and not X-rays?"
      options: ["Microwaves carry information well and are safe at low power, but X-rays would damage cells", "X-rays travel too slowly", "Microwaves are visible"]
      answer: 0
      feedback: [null, "They travel at the same speed.", "Microwaves can't be seen."]
      explain: "A communication technology needs waves that carry signals and are safe to use all around us. High-energy X-rays would be dangerous."
```

### Wavelength 12 cm

### Microwave or X-ray

## Elaborate: sun safety

```step
stage: modify
tier: wider
insight: "Linking the wave model to UV damage explains protective behaviour through the wave property that matters, frequency."
check:
  type: question
  q: "Why does Australian sun safety advice focus on UV, even on cool, cloudy days?"
  options: ["UV has enough energy per wave to damage skin cells, and you can't feel it as heat", "UV is the hottest part of sunlight", "Clouds make UV stronger"]
  answer: 0
  feedback: [null, "Infrared carries most of the heat you feel.", "Clouds don't block all UV."]
  explain: "UV is invisible and not felt as heat, but each wave carries enough energy to damage skin cells. That's why shade, clothing, a hat and sunscreen matter on any bright day."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about microwaves and X-rays with what I found." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- Light is a **transverse wave** and one part of the **electromagnetic spectrum**: radio, microwave, infrared, visible, ultraviolet, X-ray, gamma.
- All travel at the **same speed** in a vacuum (300 000 km/s), with no medium needed.
- Radio to gamma: **shorter wavelength, higher frequency, more energy per wave**.
- Frequency decides use and risk: low-energy waves carry signals; high-energy waves can damage cells.
