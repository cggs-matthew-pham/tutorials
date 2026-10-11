---
order: 4
node: AC9S9U01 n5
unit: control
title: How does your body stay at 37 °C?
summary: "Homeostasis keeps internal conditions near a set point by negative feedback: a change away from the set point is detected, and the response reverses it. Body temperature is controlled by the hypothalamus through sweating, shivering and blood flow."
language: science
voice: { name: bf_emma, speed: 1.05 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8216
  url: http://127.0.0.1:8216/index.html
  readySelector: "#gpanel"
  layout: full
explainClip:
  query: { code: "@boards.yml#explain", fresh: 1, id: explain }
  caption: "Negative feedback"
  say: "Negative feedback keeps body temperature near its set point."
  clip:
    - caption: { text: "Body temperature stays near 37 °C, its set point.", say: "Body temperature stays near thirty seven degrees, its set point." }
    - wait: 2950
    - click: { selector: "#air" }
    - press: "End"
    - caption: { text: "Very hot air: the body starts to warm.", say: "In very hot air, the body starts to warm." }
    - wait: 2500
    - caption: { text: "Sweating and flushed skin bring it back down: negative feedback.", say: "Sweating and flushed skin bring it back down: negative feedback." }
    - wait: 2500
    - press: "Home"
    - caption: { text: "Cold air: shivering warms it back up.", say: "In cold air, shivering warms it back up." }
    - wait: 3000
hook: "On a 45 °C day in Marble Bar or a frosty morning in Canberra, your body stays within about half a degree of 37 °C. Something is constantly correcting it."
---
Responses follow a pathway. This lesson: a pathway whose response feeds back to switch off its own stimulus.

## Engage: what keeps it steady?

```step
stage: predict
insight: "Students who think the body is simply 'at 37' don't expect constant correction; the board shows temperature wobble and recover."
check:
  type: predict
  q: "You walk from air-conditioning into a 42 °C day. What happens to your body temperature?"
  options: ["It stays exactly 37 °C because that's your temperature", "It starts to rise, the body detects it and responds, and it comes back near 37 °C", "It rises to 42 °C", "It drops"]
  actual: "It starts to rise, receptors detect it, the hypothalamus switches on sweating and sends more blood to the skin, and it comes back near 37 °C. It is corrected, not fixed."
```

## Explore: push it and watch it recover

```step
stage: run
insight: "Driving the temperature off the set point twice and watching the effectors switch on and off makes negative feedback a loop students have operated."
try: { playground: board, starter: "boards.yml#temp", height: 600 }
check: { type: board, text: "Push the body temperature away from 37 °C and let it recover, twice (once hot, once cold).", when: "r >= 2" }
```

Drag the **Air** slider far up or down. Watch the body temperature on the graph, and the message under the loop saying which corrective response is on. When the body has recovered, push it the other way.

## Explain: negative feedback

```step
stage: investigate
insight: "Naming each part of the loop and why it is 'negative' is the hinge."
tasks:
  - check:
      type: sort
      q: "Too hot or too cold: which responses switch on?"
      options: ["Too hot", "Too cold"]
      items:
        - ["Sweating", "Too hot"]
        - ["Shivering", "Too cold"]
        - ["Blood vessels near the skin widen (skin flushes)", "Too hot"]
        - ["Blood vessels near the skin narrow (skin goes pale)", "Too cold"]
        - ["Hairs stand up (goosebumps)", "Too cold"]
  - check:
      type: question
      q: "Why is it called negative feedback?"
      options: ["The response reverses the change: a rise causes a fall, a fall causes a rise", "It is bad for the body", "It makes the temperature go down only", "The receptors stop working"]
      answer: 0
      feedback: [null, "Negative means 'opposing the change', not harmful.", "It also brings a low temperature up.", "Receptors keep detecting all the time."]
  - check:
      type: question
      q: "On the board, what happens to sweating once body temperature is back at 37 °C?"
      options: ["It switches off, because the stimulus (too hot) has gone", "It keeps going all day", "It gets stronger", "It turns into shivering"]
      answer: 0
      feedback: [null, "Then you'd cool below 37 °C.", "Stronger sweating would overshoot.", "Shivering only starts if you get too cold."]
  - check: { type: reflect, text: "I can explain how negative feedback brings body temperature back towards the set point from either direction." }
```

### Hot or cold

### Negative

### Switching off

### In your own words

In your book: draw the feedback loop for body temperature with the receptors, the hypothalamus and the effectors, and arrows showing what happens when you get too hot.

## Elaborate: blood sugar

```step
stage: modify
tier: typical
insight: "The same loop with a hormone as the message shows negative feedback is a pattern."
check:
  type: sort
  q: "Order the steps when blood sugar rises after lunch."
  options: ["1st", "2nd", "3rd", "4th"]
  items:
    - ["Blood sugar rises above the set point", "1st"]
    - ["Cells in the pancreas detect it and release insulin", "2nd"]
    - ["Liver and muscle cells take up glucose", "3rd"]
    - ["Blood sugar falls, so the pancreas releases less insulin", "4th"]
```

## Elaborate: break the loop

```step
stage: modify
tier: wider
insight: "Breaking one part of the loop and watching control fail shows every part is needed."
try: { playground: board, starter: "boards.yml#broken", height: 640 }
tasks:
  - check: { type: board, text: "Break one part of the loop, then push the temperature off 37 °C.", when: "b = 1 and d > 1" }
  - check:
      type: question
      q: "If the sweat glands couldn't work (as in some burns patients), what would happen on a hot day?"
      options: ["The body couldn't cool down enough and could overheat, even though the brain detects the rise", "Nothing: the brain would fix it", "The body would get cold"]
      answer: 0
      feedback: [null, "The brain can detect but needs effectors to respond.", "Losing a cooling effector makes overheating more likely, not cooling."]
```

### Break it

### Real failure

## Evaluate: look back

```step
stage: info
check: { type: reflect, text: "I compared my first answer about walking into the heat with what I now know." }
```

Write one sentence: "At first I thought… Now I think… because…"

**Revision summary**

- **Homeostasis:** keeping internal conditions (temperature, blood sugar, water) near a **set point**.
- **Negative feedback:** a change is detected, and the response **reverses** it; once back at the set point, the response switches off.
- Too hot: sweating, skin blood vessels widen. Too cold: shivering, skin blood vessels narrow, goosebumps. The **hypothalamus** is the control centre.
