---
order: 8
node: AC9S8U02 n4
unit: systems
title: Organ systems
summary: "An organ system is a group of organs that work together to do a job the whole organism needs. In an animal, the circulatory system (heart, blood vessels, blood) delivers oxygen and nutrients; in a plant, the vascular system (xylem and phloem in roots, stems and leaves) carries water and sugars. If one organ fails, the system fails."
language: science
voice: { name: bf_emma, speed: 1.05 }
hook: "Your heart can't keep you alive on its own, and neither can your lungs. Why do organs only make sense as a team?"
---
A short lesson with no simulation. You have met cells, tissues and organs. Now organs join up.

## Engage: one organ goes wrong

```step
stage: predict
insight: "Students treat each organ as independent. A system is defined by organs doing a job together, so failure of one affects the whole."
check:
  type: predict
  q: "In the circulatory system, the heart pumps blood through blood vessels to all parts of the body. If the blood vessels to one leg are blocked, what is most likely?"
  options: ["That leg doesn't get enough oxygen and nutrients, so the system as a whole can no longer do its job there", "Nothing: the heart still works", "The other leg gets more blood so the body is fine", "Only the heart is affected"]
  actual: "The leg is starved of oxygen and nutrients. A system only works when every organ in it does its part: pump, vessels and blood together."
```

## Explain: systems at work

```step
stage: investigate
insight: "Naming organs and their jobs, explaining how they coordinate, and comparing a plant and an animal system as answers to one problem meets the three success criteria."
tasks:
  - check:
      type: match
      q: "Match each organ of the circulatory system to its job."
      pairs:
        - ["Heart", "Pumps blood around the body"]
        - ["Arteries", "Carry blood away from the heart at high pressure"]
        - ["Veins", "Carry blood back to the heart"]
        - ["Capillaries", "Thin walls let oxygen and nutrients pass into cells"]
        - ["Blood", "Carries oxygen, nutrients and waste"]
  - check:
      type: match
      q: "Match each part of a plant's vascular system to its job."
      pairs:
        - ["Roots", "Take in water and minerals from the soil"]
        - ["Xylem", "Carries water and minerals up the plant"]
        - ["Phloem", "Carries sugars from the leaves to where they are needed"]
        - ["Leaves", "Make sugars by photosynthesis and lose water vapour"]
  - check:
      type: question
      q: "What survival problem do the circulatory system and a plant's vascular system both solve?"
      options: ["Moving materials (nutrients, water, gases) to every cell that needs them", "Making sound", "Getting rid of heat"]
      answer: 0
      feedback: [null, "Neither is about sound.", "Heat is a side issue: both systems are about delivery."]
      explain: "Cells deep inside a body can't get what they need by themselves, so both kinds of organism use a transport system."
  - check:
      type: question
      q: "How is the plant's system different from the animal's?"
      options: ["A plant has no pump: water is pulled up by evaporation from the leaves, and the tubes are fixed in place", "A plant has a heart in its roots", "Plants carry no water"]
      answer: 0
      feedback: [null, "Plants have no heart.", "Water is the main thing carried in the xylem."]
      explain: "Animals actively pump a liquid round a loop; plants move water upward in tubes as it evaporates from the leaves. Different bodies, same problem."
  - check: { type: reflect, text: "I can name the organs of one animal system and one plant system, and say how they work as a system." }
```

### Circulatory system

### Plant system

### The shared problem

### The difference

### In your own words

In your book: draw a simple circulatory system and a plant's vascular system side by side. Label three organs in each and write one sentence on how they work together.

## Elaborate: the digestive system

```step
stage: modify
tier: typical
insight: "A second animal system shows that the same analysis (organs, jobs, coordination) works for any system."
check:
  type: question
  q: "In digestion, food goes mouth, then stomach, then small intestine. If the small intestine fails to absorb nutrients, what is the effect on the system?"
  options: ["The system fails at its job: food is broken down but the nutrients never get into the blood", "No effect because the stomach still works", "The mouth does the absorbing instead"]
  answer: 0
  feedback: [null, "The job isn't finished until nutrients reach the blood.", "The small intestine is where absorption happens."]
  explain: "Each organ does a step in the job. If any step fails, the system fails to do its whole job."
```

## Elaborate: a machine for an organ

```step
stage: modify
tier: wider
insight: "Artificial organs show the function an organ must perform, because engineers must copy it."
check:
  type: question
  q: "A dialysis machine cleans the blood of someone whose kidneys no longer work. What does it do that the kidney does?"
  options: ["Filters waste out of the blood, while keeping useful things in", "Pumps the blood round the body", "Makes new blood cells"]
  answer: 0
  feedback: [null, "That is the heart's job.", "That happens in the bone marrow."]
  explain: "To replace an organ you must copy what it does. Here the machine filters waste out of the blood, as the kidney does."
```

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my prediction about the blocked vessel with how an organ system works." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- An **organ system** is a group of organs working together to do a job the whole organism needs.
- Animal example: **circulatory** (heart, vessels, blood). Plant example: **vascular** (roots, xylem, phloem, leaves).
- If any organ in a system fails, the system can't do its job.
- Both systems solve the same problem: **moving materials to every cell**.
