---
order: 6
node: AC9S7U02 n4
woven: [AC9S7H03, AC9S7I01]
assumes: [AC9S7U02 n3]   # abiotic factors and population effects: taught in class (no tutorial yet)
unit: foodwebs
title: What if the dingo disappeared?
summary: A biotic factor is a living part of an ecosystem. When one population changes, the effect ripples along the food web, beyond the species directly linked to it. Tracing the links lets you predict the cascade.
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8211
  url: http://127.0.0.1:8211/index.html
  readySelector: "#gpanel"
  layout: full
explainPicture: { ref: boards.yml#explain-pic, caption: "Remove the foxes: more rabbits survive, so they eat more grass. The change passes along the web." }
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "A cascade"
  say: "A change in one population passes along the food web, one link at a time."
  clip:
    - caption: { text: "Foxes eat rabbits; rabbits eat grass. Remove the foxes.", say: "Foxes eat rabbits, and rabbits eat grass; now remove the foxes." }
    - click: "Remove the fox"
    - caption: { text: "Fewer predators: more rabbits.", say: "With no foxes eating them, there are more rabbits." }
    - click: "Rabbit"
    - caption: { text: "More rabbits eat more grass: less grass.", say: "More rabbits eat more grass, so there is less grass." }
    - click: "Grass"
    - click: "Grass"
    - click: "Check my predictions"
    - caption: { text: "The effect passed along the web, link by link: a cascade.", say: "The effect passed along the web one link at a time: a cascade." }
    - wait: 1200
hook: "Where dingoes were removed to protect sheep, kangaroos and foxes boomed, and some small native animals nearly vanished. How could removing one predator harm small animals it rarely ate?"
---
You can build a web and follow its energy. This lesson uses the web to predict.

## Engage: remove the dingo

```step
stage: predict
insight: "Students usually predict only the immediate effect (prey increase); the cascade to bandicoots is the reasoning the node targets."
check:
  type: predict
  q: "In a web where dingoes eat kangaroos, rabbits and foxes, and foxes eat rabbits and bandicoots, the dingoes are removed. What do you predict happens to the bandicoots?"
  options: ["They increase: one less predator in the area", "They decrease", "No change: dingoes didn't eat them", "They disappear immediately"]
  actual: "They decrease. Without dingoes, foxes increase, and foxes eat bandicoots. The effect travels along the web, two links away."
```

## Explore: predict, then check

```step
stage: run
insight: "Committing to a prediction for every population before seeing the model's reasons makes students trace each link themselves."
try: { playground: board, starter: "boards.yml#dingo", height: 620 }
check: { type: board, text: "Remove the dingo, predict every other population, then check.", when: "h = 1" }
```

Press **Remove the dingo**. Then click each organism to choose **↑ more**, **↓ fewer** or **– little change**. When you have predicted all of them, press **Check my predictions** and read the reason for each.

## Explain: tracing a cascade

```step
stage: investigate
insight: "Naming biotic factors and tracing a cascade step by step turns the board's reasons into the student's own reasoning."
tasks:
  - check:
      type: sort
      q: "Biotic or abiotic?"
      options: ["Biotic (living)", "Abiotic (non-living)"]
      items:
        - ["A new predator arriving", "Biotic (living)"]
        - ["A disease spreading through rabbits", "Biotic (living)"]
        - ["A drought", "Abiotic (non-living)"]
        - ["Competition between kangaroos and rabbits for grass", "Biotic (living)"]
        - ["The temperature dropping", "Abiotic (non-living)"]
        - ["A plant species dying out", "Biotic (living)"]
  - check:
      type: parsons
      code: "steps.txt#cascade"
      text: "Put the cascade in order."
      explain: "Each step follows one link in the web: that's how an effect reaches species that never met the dingo."
  - check:
      type: question
      q: "On the board, the insects could go either way. Why?"
      options: ["Two effects pull opposite ways: less grass (their food) but fewer bandicoots (which eat them)", "Insects aren't in the food web", "The board can't tell"]
      answer: 0
      feedback: [null, "They are: they eat grass and bandicoots eat them.", "It can: it shows that two effects disagree, and which ones."]
      explain: "Real outcomes depend on which effect is stronger. Scientists would need to measure."
  - check: { type: reflect, text: "I traced one cascade, link by link, from the dingo to a species it never ate." }
```

### Biotic factors

### The chain of effects

### Either way

### In your own words

In your book: explain why removing dingoes can lead to fewer bandicoots, one link at a time.

## Elaborate: wolves in Yellowstone

```step
stage: modify
tier: typical
insight: "A famous real cascade, with evidence, connects the model to observed ecology."
check:
  type: question
  q: "Wolves were returned to Yellowstone National Park (USA) in 1995. Elk numbers fell and elk stopped grazing near rivers. Willow and aspen trees then grew back along the rivers, and beavers returned. Which explains the beavers?"
  options: ["Fewer elk eating young trees meant more trees, which beavers use for food and dams", "Wolves eat beavers' predators", "Beavers followed the wolves"]
  answer: 0
  feedback: [null, "Wolves do eat some beaver predators, but the main link scientists describe is through the trees.", "Beavers depend on trees, not on wolves directly."]
  explain: "Wolves → fewer elk → more trees → more beavers: a three-link cascade, observed in the field. (Scientists still debate how strong each link was.)"
```

## Elaborate: your own removal

```step
stage: modify
tier: wider
insight: "Choosing which species to remove and predicting the whole web tests transfer to an unfamiliar web."
try: { playground: board, starter: "boards.yml#choose", height: 620 }
check: { type: board, text: "Choose a species to remove, predict every other population, then check.", when: "h = 1" }
```

Pick any plant or animal to remove. Which removal do you think changes the most populations? Try a producer and a top predator.

## Elaborate: the dingo fence

```step
stage: modify
tier: typical
insight: "Weighing a real Australian choice against several kinds of consideration shows that a scientific response helps some people and costs others."
tasks:
  - check:
      type: sort
      q: "Some ecologists propose letting dingoes back into parts of the land inside the fence. What kind of consideration is each point?"
      options: ["Environmental", "Economic", "Social", "Ethical"]
      items:
        - ["Small native mammals could recover as dingoes keep foxes in check", "Environmental"]
        - ["Sheep graziers could lose stock, and income, to dingo attacks", "Economic"]
        - ["Keeping thousands of kilometres of fence in repair costs a lot every year", "Economic", "Money spent or saved is an economic consideration, even when the spender is a government."]
        - ["Dingoes matter in many First Nations cultures, and Traditional Owners want a say in how they are managed", "Social", "Who is heard, and whose culture is affected, is a social consideration."]
        - ["Is it fair to kill a native predator to protect introduced livestock?", "Ethical", "A question about what is right or fair is ethical, even when it also has costs."]
  - check:
      type: question
      q: "A report recommends one plan for the fence. What is the best way to judge it?"
      options: ["Weigh its likely effects on native animals, farmers' incomes, communities and fairness, using evidence from places where it has been tried", "Pick whatever helps native animals most; the other points don't matter", "Pick whatever costs the least", "Pick the plan the biggest farm wants"]
      answer: 0
      feedback: [null, "The environment matters, but a plan that ignores farmers' livelihoods and other views is unlikely to work or be fair.", "Cost is one consideration, not the only one: the cheapest plan might harm native animals or communities.", "One group's wishes leave out the evidence and everyone else."]
      explain: "Scientific responses to an issue have impacts on many groups. Good decisions use evidence and weigh environmental, economic, social and ethical considerations together."
```

The **Dingo Fence** runs about 5,600 km across south-eastern Australia to keep dingoes away from sheep. Studies comparing the two sides found more foxes and kangaroos, and fewer small native mammals, where dingoes are kept out: the cascade you traced. So should the fence stay, move, or let dingoes back in some places?

### Four kinds of consideration

### Judging a plan

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the bandicoots with the model's reasons." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- A **biotic factor** is a living part of an ecosystem: predators, prey, competitors, disease.
- Changing one population affects the species linked to it, and then the species linked to those: a **cascade**.
- Trace it **one link at a time**: fewer predators → more prey → less of what the prey eats…
- When two effects pull opposite ways, the result could go either way; scientists measure to find out.
