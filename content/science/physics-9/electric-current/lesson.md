---
order: 4
node: AC9S9U04 n3
unit: models
title: How does current flow?
summary: "In a conductor such as copper each atom lets go of an electron, so there are free electrons that can move. A battery pushes them round the circuit: this flow of charge is the current, and more volts push harder. In an insulator the electrons stay tied to their atoms, so there is no current. The electrons are not used up; the bulb transfers the battery's energy."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8291
  url: http://127.0.0.1:8291/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "A copper loop: the free electrons (blue −) are pushed round by the battery, and the bulb lights. The red + are the atoms, fixed in place." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Current in a wire"
  say: "Current is the flow of free electrons, pushed round by the battery."
  clip:
    - caption: { text: "A copper wire loop. The red + are atoms, fixed in place. The blue − are free electrons.", say: "The red plusses are fixed atoms. The blue minuses are free electrons." }
    - wait: 3400
    - caption: { text: "The battery pushes the electrons round. They are not used up: the bulb lights as they pass through.", say: "The battery pushes the electrons round. They are not used up." }
    - wait: 3600
    - click: "Battery: less"
    - click: "Battery: less"
    - click: "Battery: less"
    - caption: { text: "Fewer volts: a weaker push, a slower drift, a dimmer bulb.", say: "Fewer volts: a weaker push, a slower drift, a dimmer bulb." }
    - wait: 3200
hook: "A copper wire and a plastic ruler both contain millions of electrons. Only one of them can light a bulb. What is different?"
---
The last lesson was about charge standing still. Now it moves.

## Engage: what flows?

```step
stage: predict
insight: "Students often say electrons leave the battery and are used up in the bulb. The particle model says the free electrons are already in the wire, are pushed round, and are not used up."
check:
  type: predict
  q: "A battery is joined to a bulb by copper wire and the bulb lights. What is flowing round the circuit?"
  options: ["Electrons that were already in the wire, pushed round by the battery", "Electrons that come out of the battery and are used up in the bulb", "Protons, pushed round by the battery", "Nothing flows: the bulb makes the electricity"]
  actual: "Electrons that were already in the wire. A metal is full of free electrons; the battery pushes them round the loop. They are not used up: as many go back into the battery as come out. What the bulb uses is the energy they carry."
```

## Explore: wires and plastic

```step
stage: run
insight: "Switching between copper and plastic with the same battery isolates the one thing that matters, free electrons, and turning the volts up and down shows what the battery adds."
try: { playground: board, starter: "boards.yml#loop", height: 680 }
tasks:
  - starter: "boards.yml#loop"
    check: { type: board, text: "With copper wire, turn the battery up to 5 volts or more.", when: "m = 1 and v >= 5" }
  - starter: "boards.yml#loop"
    check: { type: board, text: "Now choose the plastic strip. Does the bulb light?", when: "m = 0" }
  - starter: "boards.yml#loop"
    check: { type: board, text: "Go back to copper and turn the battery down to 0 V.", when: "m = 1 and v = 0" }
```

### Light the bulb

Use the slider or the + and − buttons. Watch how fast the blue electrons drift.

### Plastic

### No push

## Explain: the particle model of current

```step
stage: investigate
insight: "Defining current as the flow of free electrons, distinguishing conductors and insulators by free versus bound electrons, and giving the battery's role covers the node's other two success criteria."
tasks:
  - check:
      type: question
      q: "What is an electric current in a metal wire?"
      options: ["A flow of free electrons", "A flow of protons", "A flow of atoms"]
      answer: 0
      feedback: [null, "Protons are locked in the nuclei and don't move through the wire.", "The atoms stay in their places in the solid."]
      explain: "The atoms are fixed; the free electrons between them drift along when pushed."
  - check:
      type: question
      q: "Why does copper conduct while plastic doesn't?"
      options: ["Copper has free electrons that can move; in plastic they are tied to their atoms", "Copper has more protons", "Plastic has no electrons"]
      answer: 0
      feedback: [null, "Number of protons isn't the difference.", "Plastic has electrons: they just can't move around."]
      explain: "Conductors have free electrons; insulators don't."
  - check:
      type: question
      q: "What does the battery do?"
      options: ["Pushes the free electrons round the circuit, giving them energy", "Makes the electrons", "Stores electrons and releases them until it is empty"]
      answer: 0
      feedback: [null, "The electrons were already in the wire.", "It runs flat because its stored chemical energy is used up, not its electrons."]
      explain: "The battery's voltage is the push. A bigger voltage pushes harder, so the electrons drift faster and more energy is delivered each second."
  - check:
      type: question
      q: "Are the electrons used up in the bulb?"
      options: ["No: the same number go in as come out; the bulb transfers the energy they carry as light and heat", "Yes: that is where the light comes from", "Only some of them"]
      answer: 0
      feedback: [null, "The light comes from the energy they carry, not from using up electrons.", "They all go round again."]
      explain: "Current is the same at every point in the loop; the energy, not the electrons, is what the bulb gets."
  - check:
      type: question
      q: "On the board, electrons drift round one way. By convention the current is drawn the other way. Why?"
      options: ["The convention was chosen before electrons were discovered, and has stuck", "Current is the flow of protons", "The board has a mistake"]
      answer: 0
      feedback: [null, "Protons don't flow in a wire.", "Both are correct: they are two ways of describing the same flow."]
      explain: "Conventional current is drawn from + to −, a choice made before electrons were known. Electrons actually flow the other way."
  - check: { type: reflect, text: "I can explain current as the flow of free electrons and say why conductors and insulators differ." }
```

### Current

### Conductor and insulator

### The battery

### Used up?

### Which way

### In your own words

In your book: draw a loop of wire with a battery and a bulb. Mark the electrons and the atoms, show the way the electrons move and the way conventional current is drawn, and write a caption about what the battery does.

## Elaborate: how bright?

```step
stage: modify
tier: typical
insight: "Predicting what a bigger voltage does, then testing it, links the push to the drift speed and the energy delivered."
try: { playground: board, starter: "boards.yml#loop", height: 680 }
tasks:
  - check: { type: board, text: "With copper, set 1 V. Watch the drift and the glow. Then set 6 V.", when: "m = 1 and v = 6" }
  - check:
      type: question
      q: "What happens to the electrons and the bulb when the voltage doubles?"
      options: ["The electrons drift faster, the current is bigger and the bulb is brighter", "The electrons get bigger", "Nothing changes: the bulb has a fixed brightness"]
      answer: 0
      feedback: [null, "Electrons don't change size.", "A bigger push means more energy is delivered each second."]
      explain: "More volts means a stronger push. The electrons drift faster, so more charge passes each second and more energy reaches the bulb."
```

### Volts up

### What changes

## Elaborate: in between

```step
stage: modify
tier: wider
insight: "Semiconductors blur the conductor and insulator line, and show that the free electron model is a starting point."
check:
  type: question
  q: "Silicon has only a few free electrons, far fewer than copper and far more than plastic. It is used in computer chips. Why is that useful?"
  options: ["Its conduction can be controlled (by adding other atoms, or a voltage), so it can act as a switch", "It is cheap", "It is a perfect insulator"]
  answer: 0
  feedback: [null, "Cost isn't the point of the physics.", "It isn't a perfect insulator: that's the point."]
  explain: "A material that sits between conductors and insulators can be switched on and off, which is how transistors in chips work."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about what flows in the circuit with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **conductor** has **free electrons**; an **insulator** has none: its electrons are tied to their atoms.
- A **current** is a flow of free electrons. The **battery** pushes them round; more volts means a stronger push.
- The electrons are **not used up**; the bulb transfers the energy they carry.
- **Conventional current** is drawn the opposite way to the electrons, by a historical choice.
