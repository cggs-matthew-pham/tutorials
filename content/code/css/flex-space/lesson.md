---
order: 7
unit: layout
moveId: flex-space
reviews: [box-model, flex-row]
introduces: [flex-options]
assumes: [flex, box]
title: Space out a row
summary: Set the space between the items in a row, where the row sits them, and how they line up across it.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8260
  url: http://127.0.0.1:8260/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "justify-content places items along the row, align-items across it"
  clip:
    - caption: "The items sit in a row, all bunched at the left."
    - wait: 1500
    - caption: "justify-content decides where the items sit along the row."
    - type: { into: HTML code, text: "    justify-content: space-between;\n", after: "display: flex;\n" }
    - caption: "The first item goes to one end, the last to the other."
    - wait: 1500
    - caption: "align-items decides how they line up across the row."
    - type: { into: HTML code, text: "    align-items: center;\n", after: "justify-content: space-between;\n" }
    - expect: { selector: "#preview-text", contains: "Join" }
    - caption: "Now the items sit halfway down the bar."
    - wait: 2000
hook: "A menu bar with the logo on the left and the links on the right is one flex row with three properties."
---
A flex row puts items side by side, but they all bunch at one end. Three more properties on the same box say where the items go, and how much space sits between them.

## Predict

```step
stage: predict
code: page.html#bar
insight: "Students expect justify-content to change the text inside the items; it places the items themselves along the row."
check:
  type: predict
  q: "Where do the three items sit along the bar?"
  options:
    - "Robotics Club at the left end, Join at the right end, and Events between them"
    - "All three bunched at the left, with 20px between them"
    - "All three bunched together in the middle of the bar"
    - "The words inside each item are spread out and lined up to the right"
  fault: logic
  misconception: justify-aligns-text
  actual: "Robotics Club at the left end, Join at the right end, and Events between them. justify-content places the items along the row. It does not change the text inside an item. align-items: center also puts them halfway down the 100px bar."
```

`justify-content`, `align-items` and `gap` are new, and all three go on the box with `display: flex`. Read the code. Where do the three items sit along the bar?

## Run

```step
stage: run
code: page.html#bar
try: { playground: html, starter: "page.html#bar", height: 380 }
insight: "justify-content places the items along the row, align-items across it, and gap is the least space between neighbours."
check: { type: reflect, text: "I can say which property moves the items along the row and which moves them across it." }
unlocks: [flex-row]
```

Compare the bar with your prediction. Then change `space-between` to `center`, then to `flex-end`, and watch the whole group move. Change `align-items` to `flex-start`, then `flex-end`, and watch the items move up and down.

| Code | What it does | Why |
|---|---|---|
| `display: flex;` | Puts the items in a row | As in the last lesson, it goes on the box that holds the items |
| `justify-content: space-between;` | Sends the first item to the start, the last to the end, and shares the leftover space between them | `justify-content` works along the row, in the direction the items run. Other values: `flex-start`, `center`, `flex-end` |
| `align-items: center;` | Centres each item across the row, halfway down the bar | `align-items` works across the row, at right angles to it. The bar is 100px tall, so there is room to see it |
| `gap: 20px;` | Puts at least 20px between neighbouring items | `gap` is space between items only, not at the ends. `justify-content` then shares out whatever room is left |
| `height: 100px;` | Makes the bar taller than its items | Without spare room across the row, `align-items` has nothing to show |

## Investigate

```step
stage: investigate
code: page.html#bar
insight: "justify-content and align-items are two different directions, and both go on the row, not on the items."
tasks:
  - check:
      type: match
      q: "Match each line with what it does to a flex row."
      pairs:
        - ["justify-content: space-between", "first item at the start, last at the end, the rest spread between"]
        - ["justify-content: flex-end", "all items packed at the end of the row"]
        - ["align-items: center", "items centred across the row, halfway down"]
        - ["gap: 20px", "the least space between neighbouring items"]
      explain: "Two properties set where the items sit: justify-content along the row and align-items across it. gap sets the space between neighbours."
  - check:
      type: question
      code: page.html#cards
      q: "Each card holds a word. What does justify-content: center centre?"
      options:
        - "The three cards, as a group, along the row"
        - "The word inside each card"
        - "The cards, halfway down the row"
        - "The 12px gap"
      answer: 0
      fault: logic
      misconception: justify-aligns-text
      explain: "justify-content places the items, here the cards, along the row. It does not touch the words inside a card. The words move only if the card itself has room around them."
  - check:
      type: question
      code: page.html#top
      q: "The star and the club name sit at the top of the 100px bar. Which line centres them up and down?"
      options:
        - "align-items: center;"
        - "justify-content: center;"
        - "gap: 50px;"
        - "height: 50px;"
      answer: 0
      fault: logic
      misconception: justify-align-swapped
      explain: "The row runs left to right, so up and down is across it: align-items. justify-content would slide both items to the middle of the row, but leave them at the top."
  - check:
      type: bug
      code: page.html#gapitem
      answer: 6
      fault: logic
      misconception: flex-on-items
      text: "The three items should have 20px between them, but they touch, and there is no error. Click the line that causes it."
      explain: "Line 6 puts gap on each item. gap spaces the items inside a box, so it goes on the row that holds them: .strip { gap: 20px; }."
```

### Match the lines

Which line does which job?

### What gets centred

Look at the cards.

### Up and down

The items are at the top of the bar.

### The gap that does nothing

The row is right this time.

## Modify

```step
stage: modify
insight: "Spacing a menu with gap, centring it with justify-content, and lining up a logo with align-items: each on the row's rule."
try: { playground: html, starter: "page.html#modify", height: 460 }
tasks:
  - hint:
      - "Space between items is a job for the row, not for each link."
      - "Add `gap: 24px;` to the `.menu` rule."
    check: { type: code, text: "Put 24px between the menu links.", rules: { contains: ["gap: 24px;"] } }
    expected: page.html#sol-gap
  - hint:
      - "Where the group of links sits along the row: justify-content."
      - "Add `justify-content: center;` to the `.menu` rule."
    check: { type: code, text: "Centre the menu links in their row.", rules: { contains: ["justify-content: center;"] } }
    expected: page.html#sol-centre
  - hint:
      - "The star and the name should line up across the bar. Which property works across the row?"
      - "Add `align-items: center;` to the `.bar` rule."
    check: { type: code, text: "Centre the star and the name up and down in the bar.", rules: { contains: ["align-items: center;"] } }
    expected: page.html#sol-align
```

### Space the links

Put `24px` between the three menu links.

### Centre the menu

Move the group of links to the middle of the row.

### Line up the logo

The star and the club name sit at the top of the bar. Centre them up and down.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "Margin is space outside an item's border, gap is space between items in the row: using the box model and a flex row together shows the difference."
check:
  type: question
  q: "The row gives each item margin: 10px. Another row gives its items no margin and uses gap: 10px. How do they differ?"
  options:
    - "The margin row also has 10px between the first item and the row's border; the gap row has none there"
    - "The gap row has 10px between the first item and the row's border; the margin row has none there"
    - "They look the same: margin and gap both add 10px outside every item"
    - "The margin row puts 10px of space inside each item, like padding"
  answer: 0
  fault: logic
  explain: "Margin is outside each item's border on every side, so it leaves space at the ends of the row as well. gap sits only between neighbouring items. Between two items, margin on both gives 20px."
```

Here is a row of three items with the margin version.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 420 }
hint:
  - "There are two items inside the header: the `h1` and the `nav` that holds the links. The row goes on the header."
  - "In `.bar` add `display: flex;`, then the property that puts the first item at one end and the last at the other."
  - "Then `align-items: center;` so the title and the links line up across the bar."
check:
  type: code
  text: "Put the club name on the left and the menu on the right of the header."
  rules: { tags: [header, nav], contains: ["display: flex;", "justify-content: space-between;", "align-items: center;"] }
expected: page.html#sol-make
```

The club's header has a name and a menu, one above the other. Make the header a row with the name at the left and the menu at the right, lined up across the bar.

```teacher
summary: Students space a flex row with gap, place its items with justify-content and line them up with align-items, and find out that these go on the row and work in two directions.
time: 40
timing: "Predict and Run 10 min · Investigate 10 min · Mix it up 4 min · Modify 8 min · Make 8 min"
goals:
  - I can use gap to put space between the items in a flex row.
  - I can use justify-content to place the items along the row.
  - I can use align-items to line the items up across the row.
before: |
  Do the Make task yourself in the playground (about 4 minutes).

  A **flex row** is a box with `display: flex`: its children (the **items**) sit side by side. `justify-content` works along the row, the way the items run. `align-items` works across it, at right angles, so with a row it means up and down. The common slip is to swap them. All three properties go on the box that holds the items, never on the items.
running:
  - "Predict and Run: some students think `justify-content` aligns the words inside each item. Change it to `center` and `flex-end` and watch the whole group slide, with the words unchanged."
  - "Investigate: the 'up and down' question is the one students get wrong. Ask: which direction does the row run? Then which direction is across it?"
  - "Mix it up: margin sits outside every item, gap only between them. Let students draw the bar on paper and mark the gaps."
  - "Modify and Make: all three tasks are one line added to the row's rule. If a student writes a rule for the links, ask which box holds them."
stuck:
  - see: The items do not move when justify-content is added.
    ask: Does the same rule also have display flex?
    fix: justify-content and align-items only work on a box that has display flex. Add display flex to the same rule.
  - see: "align-items: center changes nothing."
    ask: Is the row taller than its items?
    fix: align-items needs spare room across the row. Give the bar a height, or put the items in a box with more content.
  - see: The menu links move apart but the club name does not.
    ask: Which box did you put display flex on?
    fix: Put it on the header that holds both the name and the menu. The menu links are inside nav, so they are not items of the header.
stretch: "Put the menu in a second flex row of its own, inside the nav, and give it a gap. Then try space-around and space-evenly beside space-between."
support: "Give students the Run page and ask them only to change the word after justify-content, five times, and say what each did."
leads: "Next lesson makes a row wrap when it runs out of room, so it fits a phone as well as a laptop. Class idea: look at the menu bars of three websites and decide which values of justify-content and align-items they use."
exit:
  q: "A flex row has justify-content: center. Which way do the items move, and what happens to the words inside each item?"
  a: "The group of items moves to the middle of the row. The words stay where they are inside their item."
explain: |
  The video and the picture show the same steps:

  1. `display: flex` puts the items in a row, bunched at one end.
  2. `justify-content: space-between` sends the first item to one end and the last to the other.
  3. `align-items: center` centres the items across the row.
  4. `gap` is the least space between neighbours.

  In the picture, the bar is 100px tall so you can see the items sit halfway down.
solutions:
  step-4#t1: page.html#sol-gap
  step-4#t2: page.html#sol-centre
  step-4#t3: page.html#sol-align
  step-6: page.html#sol-make
struggle: "Telling along from across. Ask which way the row runs, and which property works in that direction, before telling them."
class:
  activities:
    - at: predict
      kind: discussion
      title: Where do they go?
      minutes: 3
      do: |
        With your partner, point to where Events will sit in the bar.
        Then each choose one of the four options and hold up fingers.
      notes: "Take a vote before running. Ask a student who chose the last option what they think justify-content does to words. The idea to land: it places the items."
    - at: end
      kind: activity
      title: Be the row
      minutes: 5
      do: |
        Three students stand in a line as a flex row. The class calls out justify-content values and the line moves along the row.
        Then call out align-items values and they step forward and back.
      notes: "Listen for pupils who mix up the two directions. Ask which way the row runs."
```

```code page.html#bar
<style>
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<div class="bar">
  <h2>Robotics Club</h2>
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/join">Join</a>
</div>
```

```code page.html#cards
<style>
  .cards {
    display: flex;
    justify-content: center;
    gap: 12px;
  }
  .card {
    width: 90px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="cards">
  <div class="card"><p>Robots</p></div>
  <div class="card"><p>Coding</p></div>
  <div class="card"><p>Drones</p></div>
</div>
```

```code page.html#top
<style>
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

```code page.html#gapitem
<style>
  .strip {
    display: flex;
  }
  .item {
    gap: 20px;
    border: 1px solid gray;
  }
</style>
<div class="strip">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```code page.html#review
<style>
  .strip {
    display: flex;
    border: 2px solid navy;
  }
  .item {
    margin: 10px;
    padding: 10px;
    border: 1px solid gray;
  }
</style>
<div class="strip">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```code page.html#modify
<style>
  .menu {
    display: flex;
  }
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

```code page.html#sol-gap
<style>
  .menu {
    display: flex;
    gap: 24px;
  }
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

```code page.html#sol-centre
<style>
  .menu {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

```code page.html#sol-align
<style>
  .menu {
    display: flex;
    gap: 24px;
    justify-content: center;
  }
  .bar {
    display: flex;
    align-items: center;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<nav class="menu">
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/robots">Robots</a>
  <a href="https://example.com/join">Join</a>
</nav>
<div class="bar">
  <img src="star.svg" alt="Club star" width="50">
  <h2>Robotics Club</h2>
</div>
```

```code page.html#make
<style>
  .bar {
    background-color: lightblue;
    padding: 10px;
  }
</style>
<header class="bar">
  <h1>Robotics Club</h1>
  <nav>
    <a href="https://example.com/events">Events</a>
    <a href="https://example.com/robots">Robots</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
```

```code page.html#sol-make
<style>
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: lightblue;
    padding: 10px;
  }
</style>
<header class="bar">
  <h1>Robotics Club</h1>
  <nav>
    <a href="https://example.com/events">Events</a>
    <a href="https://example.com/robots">Robots</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
```

```code page.html#explain-start
<style>
  .bar {
    display: flex;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<div class="bar">
  <h2>Robotics Club</h2>
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/join">Join</a>
</div>
```

```code page.html#explain
<style>
  .bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
    border: 2px solid navy;
  }
</style>
<div class="bar">
  <h2>Robotics Club</h2>
  <a href="https://example.com/events">Events</a>
  <a href="https://example.com/join">Join</a>
</div>
```
