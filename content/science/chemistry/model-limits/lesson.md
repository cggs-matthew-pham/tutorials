---
order: 5
node: AC9S7U05 n5
woven: [AC9S7H01, AC9S7I01, AC9S7I06]
unit: particles
title: What can't the particle model explain?
summary: "The particle model treats matter as tiny particles that move and attract each other. It explains states, diffusion, compressing gases and expansion very well. It can't explain colour, why substances react, or electricity, because it treats particles as plain balls with no parts. Scientists keep a model for what it does well and use other models for the rest."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-science" 8277
  url: http://127.0.0.1:8277/index.html
  readySelector: "#board svg"
  layout: full
explainPicture: { ref: boards.yml#explain, caption: "Two substances either side of a barrier. The particle model predicts they will spread into each other when it lifts: diffusion." }
explainClip:
  query: { code: "@boards.yml#explain", id: explain }
  caption: "A model's scope and limits"
  say: "A good model explains a lot, but never everything."
  clip:
    - caption: { text: "The model predicts: lift the barrier and the particles spread out.", say: "The model predicts that the particles will spread into each other." }
    - wait: 2600
    - click: "Lift the barrier"
    - caption: { text: "They do: diffusion. Moving particles explain it well.", say: "They do: diffusion. Moving particles explain it well." }
    - wait: 4000
    - caption: { text: "But plain balls can't explain colour, or why substances react.", say: "But plain balls can't explain colour, or why substances react." }
    - wait: 3000
hook: "A street map is perfect for finding a café and useless for knowing how steep the hill is. Scientific models are like that too."
---
A short lesson: what the particle model is good at, and where it stops.

## Engage: is the model wrong?

```step
stage: predict
insight: "Students tend to think a model is either right or wrong; 'useful for some things, not others' is the idea to build."
check:
  type: predict
  q: "The particle model can't explain why copper is orange. What does that mean?"
  options: ["The model has limits: it is still useful for what it does explain", "The model is wrong and should be thrown away", "Copper isn't made of particles", "Colour is not real"]
  actual: "The model has limits. It treats particles as plain balls with no parts, so it can't explain colour. It still explains states, diffusion and pressure very well, so scientists keep using it, alongside other models for other jobs."
```

## Explore: a prediction that works

```step
stage: run
insight: "Testing a prediction the model makes (diffusion, faster in gases) shows what the model is good at before asking what it can't do."
try: { playground: science, starter: "boards.yml#diffusion", height: 520 }
check: { type: board, text: "Lift the barrier for a gas and for a liquid. Which mixes faster?", expect: { done: true } }
```

## Explain: scope and limits

```step
stage: investigate
insight: "Reasoning from what the model assumes (plain moving particles that attract) to what it can and can't explain turns 'limits' into an argument, not a list."
tasks:
  - check:
      type: sort
      q: "Can the particle model explain it?"
      options: ["Explains it well", "Can't explain it"]
      items:
        - ["A smell spreading across a room", "Explains it well"]
        - ["Air being easy to squash but water not", "Explains it well"]
        - ["A metal bar getting longer when heated", "Explains it well"]
        - ["Why copper is orange and gold is yellow", "Can't explain it", "Plain balls have no colour of their own."]
        - ["Why iron rusts but gold doesn't", "Can't explain it", "Reactions need atoms with parts that join and swap."]
        - ["Why metals conduct electricity", "Can't explain it"]
  - check:
      type: question
      q: "Why can't the particle model explain why some substances react?"
      options: ["It treats particles as plain balls with no parts, so it says nothing about how they could join or swap", "Because reactions are too fast to see", "Because the model only works for gases"]
      answer: 0
      feedback: [null, "Speed is not the problem; the model has nothing inside the particles.", "It works for solids and liquids too."]
      explain: "To explain a phenomenon, a model needs the right parts. Reactions need atoms that can join and rearrange (Year 8), and electricity needs electrons (Year 9)."
  - check:
      type: question
      q: "What evidence supports the particle model?"
      options: ["Diffusion, gases being compressible, and tiny specks in water jiggling under a microscope", "We can see particles with our eyes", "It explains everything"]
      answer: 0
      feedback: [null, "Particles are far too small to see.", "It doesn't, and no model does."]
      explain: "The jiggling of tiny grains from pollen in water (Brownian motion) is the particles of water knocking them about: strong evidence, explained by Einstein in 1905."
  - check:
      type: question
      q: "The particle model explains a smell spreading across a room. Which part of the model does the explaining?"
      options: ["Particles are always moving, with space between them, so the smell's particles spread out between the air particles", "Smell particles are lighter than air, so they float up and spread", "Smell particles get bigger until they fill the room", "The smell spreads only because a breeze carries it"]
      answer: 0
      feedback: [null, "Smells spread downwards and sideways too, not just up: the particles move in every direction.", "Particles never change size. They spread out; they don't grow.", "A draught helps, but a smell still spreads in still air, because its particles move by themselves."]
      explain: "What the model assumes (moving particles with space between them) is exactly what diffusion needs. That is why it explains it well."
  - check: { type: reflect, text: "I can name something the particle model explains well and something it can't, with a reason for each." }
```

### Can it explain it?

### Reactions

### Evidence

### Why it explains smells

### In your own words

In your book: write one thing the particle model explains well and one thing it can't. For each, give the reason, starting "Because the model says particles…".

## Mix it up

```step
stage: practise
insight: "The model is judged by what it explains well. Squashing is a clear case of it working, to set against the cases where it cannot."
check:
  type: question
  q: "Looking back at squashing: a syringe of air can be squashed, but a syringe of water cannot. What does the particle model say is different?"
  options: ["Air particles are far apart, with space to move into; water particles are already close together", "Air particles are smaller than water particles", "Water particles are harder than air particles", "Air has no mass, so nothing pushes back"]
  answer: 0
  feedback: [null, "Particles of a substance are the same size in every state. The difference is the spacing.", "Particles never squash, in any state.", "Air does have mass: about 1.2 g in every litre."]
  explain: "The spacing explains it. This is the kind of job the particle model does well: explaining how substances behave from the arrangement and motion of their particles."
```

## Elaborate: a better model

```step
stage: modify
tier: typical
insight: "Seeing that the atomic model adds what was missing shows why scientists use several models."
check:
  type: question
  q: "In Year 8 the particles get parts: they are made of atoms of different types that can join. What can this new model explain that the plain particle model couldn't?"
  options: ["Why substances react and make new substances", "Why gases are easy to squash", "Why smells spread"]
  answer: 0
  feedback: [null, "The plain particle model already explains that.", "Diffusion was already explained."]
  explain: "A new model keeps what the old one did well and adds what it couldn't do. Scientists choose the simplest model that does the job."
```

## Elaborate: how the idea grew

```step
stage: modify
tier: wider
insight: "The long road from an idea to an accepted model shows that evidence, not argument alone, decides."
check:
  type: question
  q: "Ancient Greek thinkers suggested matter is made of tiny particles, but most people didn't accept it for over 2000 years. What changed?"
  options: ["Evidence: experiments on gases, chemical reactions and Brownian motion that the idea explained and predicted", "Someone saw a particle", "It was voted on"]
  answer: 0
  feedback: [null, "Atoms were first imaged in the 1950s, long after the model was accepted.", "Science doesn't settle ideas by vote."]
  explain: "Models are accepted when they explain and predict evidence better than the alternatives, and changed when new evidence doesn't fit."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about copper's colour with what I now think about models." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- The particle model says matter is made of tiny particles that move and attract each other.
- It explains states, diffusion, compressing gases and expansion very well, and evidence such as diffusion and Brownian motion supports it.
- It can't explain colour, reactions or electricity, because its particles are plain balls with no parts.
- Every model has a scope and limits. Scientists keep a model for what it does well and use or build other models for the rest.
