---
order: 2
unit: atoms
title: What comes out of a decaying nucleus?
summary: "An unstable nucleus decays by giving out alpha particles (2 protons and 2 neutrons), beta particles (fast electrons made in the nucleus) or gamma rays (energy). Alpha and beta decay change the element; gamma does not. Alpha is stopped by paper, beta by aluminium, and gamma is only reduced by lead."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8260
  url: http://127.0.0.1:8260/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Alpha is stopped by paper and beta by a few millimetres of aluminium; gamma gets through, weakened by thick lead." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Alpha, beta and gamma"
  say: "Alpha and beta decay change the element. Gamma only carries energy away."
  clip:
    - caption: { text: "Uranium-238 is unstable: its nucleus will decay.", say: "Uranium two thirty eight is unstable: its nucleus will decay." }
    - wait: 2600
    - click: "Alpha decay"
    - wait: 1200
    - caption: { text: "Alpha: 2 protons and 2 neutrons leave. Now it is thorium-234.", say: "Alpha: two protons and two neutrons leave. Now it is thorium." }
    - wait: 3600
    - click: "Beta decay"
    - wait: 1200
    - caption: { text: "Beta: a neutron becomes a proton, and an electron leaves. Protactinium-234.", say: "Beta: a neutron becomes a proton, and an electron leaves." }
    - wait: 3400
    - click: "Gamma ray"
    - wait: 1200
    - caption: { text: "Gamma: only energy leaves. Still protactinium-234.", say: "Gamma: only energy leaves. Same element, same mass." }
    - wait: 2400
hook: "Radon is a gas that seeps out of some rocks and into houses. It is invisible and has no smell, yet the air in a closed cellar can carry atoms that are turning, one by one, into lead."
---
Isotopes of an element have different numbers of neutrons, and some are unstable. This lesson asks what an unstable nucleus gives out, and what it becomes.

## Engage: what is left?

```step
stage: predict
insight: "Predicting the product of one alpha decay tests whether students track protons (the element) and nucleons (the mass) separately; the distractors are a change to the mass only, no change, and the wrong direction."
check:
  type: predict
  q: "Radon-222 has 86 protons. Its nucleus gives out an alpha particle: 2 protons and 2 neutrons. What is left?"
  options: ["Polonium-218 (84 protons)", "Radon-220 (86 protons)", "Radon-222: nothing changes", "Radium-226 (88 protons)"]
  actual: "Polonium-218. Losing 2 protons takes the atomic number from 86 to 84, which is polonium; losing 4 particles in all takes the mass number from 222 to 218. A different number of protons means a different element."
```

## Explore: decay and stopping

```step
stage: run
insight: "Pressing each kind of decay and watching what leaves and how the numbers change makes the three kinds comparable side by side; the shield board adds the third property, how far each gets."
try: { playground: board, starter: "boards.yml#radon", height: 720 }
tasks:
  - starter: "boards.yml#radon"
    check: { type: board, text: "Make radon-222 give out one alpha particle. What is it now?", when: "z = 84 and a = 218" }
  - starter: "boards.yml#shield"
    check: { type: board, text: "Fire alpha, beta and gamma at the barriers.", when: "f >= 3" }
```

### Decay

Press **Alpha decay**, **Beta decay** or **Gamma ray** and watch what leaves the nucleus. Red: protons. Grey: neutrons. The board says whether that is how the isotope really decays. **Start again** to try another kind.

### Stopping

Fire each kind of radiation at paper, aluminium and lead.

## Explain: three kinds of radiation

```step
stage: investigate
insight: "Comparing the three on the same three questions (what leaves, what changes in the nucleus, how far it gets) is the hinge; the number checks make students track the atomic and mass numbers themselves."
tasks:
  - check:
      type: sort
      q: "Alpha, beta or gamma?"
      options: ["Alpha", "Beta", "Gamma"]
      items:
        - ["2 protons and 2 neutrons (a helium nucleus)", "Alpha"]
        - ["A fast electron made when a neutron turns into a proton", "Beta", "The electron comes from the nucleus, not from the shells."]
        - ["Energy only: no mass and no charge", "Gamma"]
        - ["Atomic number down 2, mass number down 4", "Alpha"]
        - ["Atomic number up 1, mass number the same", "Beta", "One neutron fewer, one proton more: the same number of particles in the nucleus."]
        - ["Atomic number and mass number both the same", "Gamma"]
        - ["Stopped by a sheet of paper or a few centimetres of air", "Alpha"]
        - ["Stopped by a few millimetres of aluminium", "Beta"]
        - ["Reduced by thick lead or concrete, never stopped completely", "Gamma"]
  - check:
      type: number
      q: "Uranium-238 (92 protons) decays by alpha decay. What is the mass number of the new nucleus?"
      answer: 234
      explain: "An alpha particle takes 4 particles (2 protons, 2 neutrons): 238 − 4 = 234. The atomic number drops to 90, which is thorium: thorium-234."
  - check:
      type: number
      q: "Carbon-14 (6 protons) decays by beta decay. What is the atomic number of the new nucleus?"
      answer: 7
      explain: "A neutron turns into a proton, so 6 + 1 = 7 protons: nitrogen. The mass number stays 14, so carbon-14 becomes nitrogen-14, which is stable."
  - check:
      type: question
      q: "A nucleus gives out a gamma ray. What changes?"
      options: ["Only its energy: it is the same isotope, calmer", "It becomes the next element", "It loses 4 from its mass number"]
      answer: 0
      feedback: [null, "That is beta decay.", "That is alpha decay."]
      explain: "Gamma is energy, with no particles, so the protons and neutrons stay the same. Gamma rays usually come straight after an alpha or beta decay, carrying away the new nucleus's extra energy."
  - check:
      type: question
      q: "A detector picks up radiation from a source through paper, but nothing once 5 mm of aluminium is in the way. What is the source giving out?"
      options: ["Beta", "Alpha", "Gamma"]
      answer: 0
      feedback: [null, "Alpha would not get through the paper.", "Gamma would still get through the aluminium."]
      explain: "Through paper but stopped by a few millimetres of aluminium: beta."
  - check:
      type: question
      q: "Why is alpha stopped so much sooner than gamma?"
      options: ["Alpha particles are big, slow and charged, so they hit and knock electrons off atoms almost at once; gamma has no mass or charge", "Alpha particles have less energy than gamma rays", "Paper absorbs helium"]
      answer: 0
      feedback: [null, "Alpha particles carry a lot of energy; they lose it fast by colliding with atoms.", "It is the particle's size and charge, not the paper's chemistry."]
      explain: "The bigger and more charged the radiation, the more it collides with atoms in its path and the sooner it gives up its energy. That also makes alpha the most damaging if its source gets inside the body."
  - check: { type: reflect, text: "I can say what alpha, beta and gamma are, how alpha and beta decay change the nucleus, and how far each gets." }
```

### Three kinds

### Alpha

### Beta

### Gamma

### Stopping power

### Why

### In your own words

In your book: draw a table with rows alpha, beta, gamma and columns "What leaves", "Atomic number", "Mass number", "Stopped by". Then write the decay of radon-222 by alpha as "radon-222 → … + alpha".

## Elaborate: radiation in medicine

```step
stage: modify
tier: typical
insight: "Matching the kind of radiation to a job (treat from inside, image from outside) uses penetrating power as a reason, not a fact to recall."
try: { playground: board, starter: "boards.yml#iodine", height: 720 }
tasks:
  - check: { type: board, text: "Iodine-131 is used to treat thyroid cancer. Decay it the way it really decays, until it is stable.", when: "s = 1 and r >= 1" }
  - check:
      type: question
      q: "Iodine-131 collects in the thyroid gland and gives out beta particles. Why does that suit treating thyroid cancer?"
      options: ["Beta travels only a few millimetres in the body, so it damages cells near the iodine and few others", "Beta goes straight through the body, so it does no harm", "Beta turns cancer cells into xenon"]
      answer: 0
      feedback: [null, "Beta is absorbed within millimetres of tissue: that is the point.", "Only the iodine atoms change into xenon; the cells are damaged by the radiation."]
      explain: "Inside the body, beta travels only millimetres, so its energy is delivered to the thyroid itself."
  - check:
      type: question
      q: "To make a picture of an organ, doctors inject a substance that gives out gamma rays and use a camera outside the body. Why gamma?"
      options: ["It gets out of the body to the camera, and it is less damaging on the way than alpha or beta", "It is stopped inside the organ", "It changes the organ into another element"]
      answer: 0
      feedback: [null, "Then the camera would see nothing.", "Gamma changes neither the atomic number nor the mass number."]
      explain: "Gamma passes out of the body, so a camera can detect where it came from. Isotopes for imaging also have short half-lives, so they don't stay active for long (half-life is next)."
```

### Treating with beta

### Why beta

### Seeing with gamma

## Elaborate: in the home

```step
stage: modify
tier: wider
insight: "The same alpha that a sheet of paper stops is safe in a smoke alarm and dangerous when breathed in: penetration and harm depend on where the source is."
try: { playground: board, starter: "boards.yml#americium", height: 720 }
tasks:
  - check: { type: board, text: "Smoke alarms hold a speck of americium-241, which gives out alpha particles. Decay it once the way it really decays.", when: "z = 93 and a = 237" }
  - check:
      type: question
      q: "Why is the americium in a smoke alarm safe to have on the ceiling?"
      options: ["Its alpha particles are stopped by a few centimetres of air and the alarm's case", "Americium does not decay", "Its gamma rays are too weak to matter"]
      answer: 0
      feedback: [null, "It decays all the time; that is how the alarm works.", "It gives out alpha particles, and they never leave the alarm."]
      explain: "Alpha cannot get out of the alarm. Inside, it knocks electrons off air molecules so a small current flows; smoke stops the current, and the alarm sounds."
  - check:
      type: question
      q: "Radon gas gives out alpha particles too. Why is breathing it in a health risk, when the alarm is not?"
      options: ["Inside the lungs there is nothing between the alpha particles and living cells, and alpha does the most damage close up", "Radon's alpha particles are a different kind that go through walls", "Breathing makes radon decay faster"]
      answer: 0
      feedback: [null, "Alpha is alpha: it is where the source is that changes.", "Breathing has no effect on how fast a nucleus decays."]
      explain: "Outside the body, skin and air stop alpha. Inside, alpha delivers all its energy to the cells next to it. That is why homes over some rocks are tested for radon and ventilated."
```

### Americium

### On the ceiling

### In the lungs

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about radon-222 with what the board showed." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- An unstable nucleus decays by giving out radiation. It is random for one atom, but predictable for many.
- **Alpha**: 2 protons and 2 neutrons (a helium nucleus). Atomic number −2, mass number −4: a new element. Stopped by paper or a few centimetres of air.
- **Beta**: a neutron turns into a proton and a fast electron, which leaves. Atomic number +1, mass number the same: a new element. Stopped by a few millimetres of aluminium.
- **Gamma**: energy only, usually just after alpha or beta. No change to the atomic or mass number. Reduced by thick lead or concrete.
- The more massive and charged the radiation, the sooner it is stopped, and the more damage it does close up.
