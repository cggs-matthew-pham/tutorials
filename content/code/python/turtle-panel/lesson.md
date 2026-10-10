---
order: 13
unit: challenge
optional: true
title: "Optional: Control panel"
summary: Turn the game into an app with a panel of buttons made from lists.
language: python
modules: [ui]
hook: "Every app is a panel of controls over some state. Build the panel from data, and adding a control is one more item in a list."
app:
  command: "node \"$REPO_ROOT/tools/serve.mjs\" \"$REPO_ROOT/dist/_playground\" 8123"
  url: "http://127.0.0.1:8123/index.html"
  ready: Python code
  layout: full
voice: true
explainClip:
  query: { code: "@panel.py#solution", view: "output", autorun: 1, use: "ui" }
  caption: "Keep the buttons as data"
  say: "Apps have panels: rows of buttons that change what the program does."
  pacing: { keyDelayMs: 22 }
  clip:
    - wait: 800
    - caption:
        text: "The buttons are data: a list of names and a list of positions."
        say: "Instead of an if for every button, the buttons are kept in lists."
    - caption: "One loop draws a button for every name."
    - caption:
        text: "Another loop finds which button was clicked."
        say: "Another loop checks each button in turn, to find which one was clicked."
    - click: { selector: "#canvas", at: [-130, -170] }
    - wait: 2500
    - caption:
        text: "Adding a button is one more item in each list."
        say: "Adding a button is one more item in each list. Gradio works this way."
    - wait: 1500
    - expect: { selector: "#status", contains: "Running" }
---
Your game has one button. Real apps have panels: rows of controls that change what the program does. Here the buttons come from **lists**, so a loop draws them and a loop finds which one was clicked.

## Predict

```step
stage: predict
code: panel.py#panel
check:
  type: predict
  q: "You click at x = 0 on the row of buttons. Which button is pressed?"
  options: ["New game", "Pause", "Go", "None of them"]
  actual: "Pause: its button starts at bxs[1] = -60 and is 120 wide, so it covers x from -60 to 60."
```

`names` and `bxs` hold one button each at the same index. `draw_scene` loops over them to draw, and `clicked` loops over them to check.

## Run

```step
stage: run
code: panel.py#panel
try: { starter: "panel.py#panel", height: 500 }
check: { type: reflect, text: "I used New game, Pause and Go, and I can say which list each button's name and position come from." }
```

Press **New game**, play, pause, then go again.

## Investigate

```step
stage: investigate
code: panel.py#panel
insight: "Controls stored as data are drawn and checked by loops, so the panel grows by adding to lists, not by copying code."
tasks:
  - check:
      type: trace
      text: "A click at x = 100, y = -170. Follow the loop in clicked."
      table: |
        | i | bxs[i] | inside? |
        | 0 | -190 | no |
        | 1 | [-60] | [no] |
        | 2 | [70] | [yes] |
      explain: "Only the third button covers x = 100 (it runs from 70 to 190), so press(\"Go\") runs."
  - check:
      type: question
      q: "You add a fourth name to names but forget to add a position to bxs. What happens?"
      options: ["The button appears at x = 0", "An error: the loop asks for bxs[3], which does not exist", "Nothing changes", "Python adds a position for you"]
      answer: 1
      explain: "The loops go up to len(names), so they ask for a fourth position. Parallel lists must stay the same length."
```

### Follow a click

Which button does the loop find?

### Keep the lists in step

What if the lists disagree?

## Modify: difficulty row

```step
stage: modify
try: { starter: "panel.py#difficulty", height: 520 }
hint:
  - "Three new lists: levels = [\"Easy\", \"Medium\", \"Hard\"], lxs = [-190, -60, 70], delays = [1300, 1000, 700]."
  - "Copy the drawing loop in draw_scene, but use levels, lxs and y = -140."
  - "Copy the checking loop in clicked: when a level is clicked, delay = delays[i] (and add delay to the global line)."
check:
  type: code
  text: "A second row of buttons from lists, which sets the difficulty."
  rules: { contains: ["delays[i]", "for i in range(len(levels))"] }
```

Add a second row: **Easy**, **Medium** and **Hard**. Each one sets how fast the turtle hops. Three more lists, two more loops.

## Make: your own controls

```step
stage: make
try: { starter: "panel.py#solution", height: 520 }
hint:
  - "A theme row: names like \"Day\" and \"Night\" with a list of colours, and bgcolor(colours[i]) when one is clicked."
  - "A path chooser: two pairs of lists, and a button that swaps which pair xs and ys use."
check: { type: reflect, text: "I added a row of my own controls, built from lists." }
```

Add a row of controls you design. **Where this leads:** in Gradio, you list the controls (`gr.Button`, `gr.Radio`) and Gradio draws them and checks the clicks for you. On a web page, HTML draws the buttons and JavaScript listens for clicks. You have just built what both of them do.
