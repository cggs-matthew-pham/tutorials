---
order: 7
node: AC9S9U04 n5
unit: models
title: Wave or particle?
summary: "A model is a tool, not a photograph. The particle model explains conduction, convection and static charge; the wave model explains sound, reflection, refraction and the electromagnetic spectrum. Light shows both wave-like and particle-like behaviour, so neither model alone explains it all: each is useful for some phenomena and weak for others."
language: science
voice: { name: bf_emma, speed: 1.05 }
hook: "Is light a wave or a stream of particles? Scientists argued for 300 years. The answer turned out to be: the question is a bit too simple."
---
A short lesson with no simulation. You have used two models this unit. Now you decide where each one works.

## Engage: who is right?

```step
stage: predict
insight: "Students treat a model as true or false. The node asks them to see models as tools with a domain of usefulness."
check:
  type: predict
  q: "One scientist says 'light is a wave'. Another says 'light is a stream of particles'. What is the best way to think about this?"
  options: ["Each model is a tool: it explains some things well and others badly, so we use the one that suits the question", "One of them is right and the other is wrong", "Scientists don't really know anything about light", "It depends on which scientist you ask"]
  actual: "Each model is a tool. The wave model explains reflection, refraction and the spectrum. The particle idea (photons) explains some effects the wave model can't. Scientists use whichever helps with the question in hand."
```

## Explain: where each model works

```step
stage: investigate
insight: "Sorting phenomena by the model that explains them, explaining a failure, and stating that models are tools meets all three success criteria."
tasks:
  - check:
      type: sort
      q: "Which model explains it best?"
      options: ["Wave model", "Particle model"]
      items:
        - ["An echo: sound bouncing back off a cliff", "Wave model", "Sound reflects, like any wave."]
        - ["Heat passing along a metal spoon", "Particle model", "Collisions between particles pass the energy on."]
        - ["Light bending as it goes into glass", "Wave model", "The wave fronts slow down and turn."]
        - ["Warm water rising in a pot", "Particle model", "Bulk movement of particles, driven by density."]
        - ["A higher note having a shorter wavelength", "Wave model"]
        - ["A balloon charged by rubbing", "Particle model", "Electrons move from one material to the other."]
  - check:
      type: question
      q: "The particle model explains conduction well. Why can't it explain how the Sun's energy reaches Earth?"
      options: ["Space is a vacuum, with no particles to pass the energy on; the wave model of light needs no medium", "The Sun is too hot", "Energy can't cross space"]
      answer: 0
      feedback: [null, "Temperature isn't the problem.", "It does cross space: as electromagnetic waves."]
      explain: "Conduction and convection need matter. Electromagnetic waves carry energy across empty space, so the wave model is the useful one here."
  - check:
      type: question
      q: "Light shining on some metals knocks electrons out, but only if the light's frequency is high enough, however bright it is. A wave model has trouble with this. What does it suggest?"
      options: ["Light also behaves as packets of energy (photons), each with an energy set by its frequency", "Light isn't really a wave at all", "The metals are faulty"]
      answer: 0
      feedback: [null, "Light still shows wave behaviour in other experiments.", "The effect is real and reliable."]
      explain: "Light behaves like a wave when it bends and spreads, and like a stream of photons when it hands energy to single electrons. Neither model alone covers everything."
  - check:
      type: question
      q: "Which statement about scientific models is best?"
      options: ["A model is a tool with a domain of usefulness, not a literal description of reality", "A good model is true in every situation", "A model that fails once should be thrown away completely"]
      answer: 0
      feedback: [null, "No model covers everything; that is why scientists keep several.", "A model that works well in its domain stays useful, even if it needs another model beside it."]
      explain: "We keep a model for as long as it helps us explain and predict, and we know where it stops working."
  - check: { type: reflect, text: "I can say where the wave model and the particle model are each useful, and why models are tools." }
```

### Sort

### Space

### Photons

### Models are tools

### In your own words

In your book: choose two phenomena from this unit, one explained best by the wave model and one by the particle model. For each, name the model and write one sentence saying why it fits.

## Elaborate: evaluate

```step
stage: modify
tier: typical
insight: "Evaluating both models against one phenomenon makes students weigh strengths and limits, not just match labels."
check:
  type: question
  q: "Sound travels through air as a wave, but air is also made of particles. How can both models be right?"
  options: ["They describe the same thing at different levels: the particle model says what air is made of, the wave model describes the pattern that travels through it", "One of them is wrong", "Sound is a wave in space and particles in air"]
  answer: 0
  feedback: [null, "Both are useful, for different questions.", "Sound can't travel in space at all."]
  explain: "The wave model of sound is built on the particle model of air: the wave is the pattern of squashing and stretching in the particles. Which one you use depends on the question."
```

## Elaborate: photons

```step
stage: modify
tier: wider
insight: "The photoelectric effect is the standard case where the wave model of light alone fails; naming the evidence helps students see why models change."
check:
  type: question
  q: "Bright red light cannot knock electrons out of a metal, but a dim ultraviolet lamp can. Using photons, why?"
  options: ["Each ultraviolet photon carries enough energy to free an electron; a red photon doesn't, however many arrive", "Ultraviolet is brighter than red light", "Red light travels more slowly"]
  answer: 0
  feedback: [null, "Brightness is the number of photons, not the energy of each.", "All light travels at the same speed in a vacuum."]
  explain: "An electron absorbs one photon at a time. Only a photon with enough energy (high enough frequency) can free it, so many low-energy photons together can't do what one high-energy photon can."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the 'right' model with what I now think about models." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The **particle model** explains conduction, convection and static charge; the **wave model** explains sound, reflection, refraction and the electromagnetic spectrum.
- Light behaves like a wave when it bends and spreads, and like **photons** when it gives energy to single electrons.
- A scientific **model is a tool** with a domain of usefulness, not a literal picture of reality.
