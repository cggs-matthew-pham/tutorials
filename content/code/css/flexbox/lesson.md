---
order: 6
unit: layout
moveId: flex-row
reviews: [inside-selector, box-model]
introduces: [flex]
assumes: [box, class, class-selector, list, semantic, link, image, div-span, descendant-selector, style-block, css-rule, heading, paragraph]
title: A row with Flexbox
summary: Put boxes side by side in a row with Flexbox, and find out that it goes on the box that holds them.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: true
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "display: flex on the parent lines its children up in a row"
  clip:
    - caption: "A list stacks its items, one under another."
    - wait: 1600
    - caption: "display: flex goes on the box that holds them: the ul."
    - type: { into: HTML code, text: "    display: flex;\n", after: "list-style: none;\n" }
    - expect: { selector: "#preview-text", contains: "Home" }
    - caption: "Its children, the li items, now sit side by side."
    - wait: 1600
    - caption: "Put it on each li instead, and the items stack again."
    - type: { into: HTML code, text: "<style>\n  li {\n    display: flex;\n  }\n</style>\n<ul>\n  <li>Home</li>\n  <li>Events</li>\n  <li>Join</li>\n</ul>" }
    - wait: 2000
hook: "Almost every menu bar, toolbar and row of cards on the web is a Flexbox row."
---
So far, boxes stack down the page. **Flexbox** lines them up in a row.

## Predict

```step
stage: predict
code: page.html#menu
insight: "Students rarely guess that one property on the list rearranges all its items; seeing the row appear makes the parent-child idea concrete."
check:
  type: predict
  q: "How will the three menu items be placed?"
  options:
    - "Side by side in a row"
    - "One under another, as before"
    - "Only the bullets go; the items stay stacked"
    - "Two on the first line and one on the next"
  fault: logic
  misconception: flex-parent-no-effect
  actual: "Side by side in a row. display: flex on the ul lines up its children, the li items. (list-style: none removes the bullets, as on real menus, and the margin on each li keeps the words apart.)"
```

`display: flex` is new. `list-style: none` removes a list's bullets, and the `margin-right` on each `li` keeps the words apart. Read the code. How will the menu items be placed?

## Run

```step
stage: run
code: page.html#menu
try: { playground: html, starter: "page.html#menu", height: 360 }
insight: "display: flex goes on the box that holds the items; its children line up in a row."
check: { type: reflect, text: "I can say which box gets display: flex, and what happens to its children." }
```

Compare with your prediction. Then delete the `display: flex;` line to see the menu stack again, and put it back.

| Code | What it does | Why |
|---|---|---|
| `ul { display: flex; }` | Puts the `ul`'s children in a row | The box that holds the items is the **parent**, and its boxes inside are its **children**. Flex goes on the parent, and the children line up |
| the three `li` | Sit side by side | They are the parent's children. Without `display: flex` they are block boxes, and block boxes start a new line |
| `list-style: none;` | Removes the bullets | Not Flexbox: real menus have no bullets, so it is a tidy-up on the list |
| `li { margin-right: 24px; }` | Keeps the words apart | A margin on each item. Items in a row touch otherwise |

## Investigate

```step
stage: investigate
code: page.html#cards
picture: page.html#cards
insight: "Flexbox goes on the parent, the box that holds the items, and only its children line up."
tasks:
  - picture: page.html#cards
    check:
      type: question
      q: "To put the three cards in a row, which rule gets display: flex?"
      options:
        - ".cards, the div that holds the cards"
        - ".card, each card"
        - "body, the whole page"
        - "img, the pictures inside the cards"
      answer: 0
      shuffle: false
      fault: logic
      misconception: flex-on-items
      feedback:
        - null
        - "That would line up the insides of each card (its picture and text), not the cards themselves. The cards need a parent to line them up."
        - "Flexbox lines up the children of the box it is on. Only the boxes directly inside the body would line up, and here that is one div."
        - "The pictures are inside the cards. Flexbox would affect only the boxes inside each picture, which are none."
      explain: "display: flex goes on the box that holds the items: .cards. Its children, the three .card boxes, line up in a row. A card can hold a picture and text and still be one item in the row."
  - check:
      type: bug
      code: page.html#items
      answer: 2
      fault: logic
      misconception: flex-on-items
      text: "This menu should be a row, but the items still stack, and there is no error. Click the line that picks the wrong box."
      explain: "Line 2 puts display: flex on each li, so each item lines up its own insides. It belongs on the ul that holds them: ul { display: flex; }."
  - check:
      type: question
      q: "The ul has display: flex. Each li holds an a link. Which boxes are lined up in the row?"
      options:
        - "The li items, the children of the ul"
        - "The a links, inside the li items"
        - "The ul itself"
        - "All of them"
      answer: 0
      shuffle: false
      fault: logic
      misconception: flex-reaches-descendants
      feedback:
        - null
        - "The links are inside the li items, one level further down. They stay inside their li."
        - "The ul is the parent: it holds the row. Its children line up inside it."
        - "Only the boxes directly inside the parent line up."
      explain: "Flexbox lines up the children of the box it is on. The li items are the ul's children, so they form the row, and each link stays inside its li."
```

The picture shows a row of cards: the `div` holds them, and each card holds a picture and a name.

### Which box?

Look at the cards.

### The menu that will not line up

This should be a row.

### Which boxes line up?

Think about how the boxes nest.

## Modify

```step
stage: modify
insight: "Building a menu row and a row of cards, always putting display: flex on the parent."
try: { playground: html, starter: "page.html#modify", height: 480 }
tasks:
  - hint:
      - "Flexbox goes on the parent, the box that holds the items. Which rule is that?"
      - "Add `display: flex;` to the `.menu` rule."
    check: { type: code, text: "Put the menu in a row.", rules: { contains: [".menu{", "display:flex;"] } }
    expected: page.html#sol-row
  - hint:
      - "The cards are inside a `div` with the class `cards`. That div is the parent."
      - "Write a new `.cards` rule and put `display: flex;` first in it."
    check: { type: code, text: "Put the cards in a row.", rules: { contains: [".cards{display:flex;"] } }
    expected: page.html#sol-cards
  - hint: "The list has its own space around it. Which two box properties would remove it? Set them in the `.menu` rule."
    check: { type: code, text: "Remove the menu's own spacing.", rules: { contains: ["margin:0;", "padding:0;"] } }
    expected: page.html#sol-tidy
```

### A menu in a row

Put the menu items side by side.

### Cards in a row

The three cards are stacked. Put them in a row.

### Tidy the list

A list has space of its own around it. Remove it from the menu with `margin: 0;` and `padding: 0;`.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "A selector with a space picks the links inside the menu, and padding gives the header room inside its edge."
check:
  type: question
  q: "The menu links should lose their underline without changing the link in the story, and the header should have room between its edge and its words. Which two rules do both jobs?"
  options:
    - "nav a { text-decoration: none; } and header { padding: 16px; }"
    - "a { text-decoration: none; } and header { padding: 16px; }"
    - "nav a { text-decoration: none; } and header { margin: 16px; }"
    - "nav { text-decoration: none; } and header { margin: 16px; }"
  answer: 0
  shuffle: false
  fault: logic
  misconception: space-means-both
  feedback:
    - null
    - "a picks every link on the page, including the one in the story. A space and nav in front picks only the menu's links."
    - "Margin is space outside the header's edge. Room inside the edge, around the words, is padding."
    - "A rule on nav does not reach its links, which have their own underline, and margin is space outside the header."
  explain: "nav a picks only the links inside the nav. Padding is the room inside the header's edge, around its words, and margin would put the space outside it."
```

The header holds the title and the menu row. The story below has a link of its own.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "A menu is a list of links inside a `<nav>`. Which box holds the items?"
  - "Build a `<header>` with an `<h1>` and a `<nav>` holding a `<ul>` of links, then write a rule for the `ul` that starts with `display: flex;`."
  - "Add `list-style: none;`, and a margin on each `li` so the words do not touch."
check:
  type: code
  text: "Put the club menu in a row inside the header."
  rules: { tags: [header, nav, ul, li, a, style], contains: ["display:flex;"] }
expected: page.html#sol-make
```

Make the top of the club page: a `<header>` with the club name and, under it, a `<nav>` holding a list of at least three links. Put the links in a row, without bullets.

```teacher
summary: Students put boxes in a row with display flex, and find out that it goes on the box that holds them, not on the items.
time: 45
timing: "Predict and Run 10 min · Investigate 12 min · Mix it up 4 min · Modify 10 min · Make 9 min"
goals:
  - I can put a box's children in a row with display flex on the parent.
  - I can say which box is the parent and which are its children.
  - I can explain why display flex on the items does nothing.
before: |
  Read the unit primer "Layout and components in 5 minutes", then do the Make task yourself.

  The one idea of the lesson: `display: flex;` goes on the **parent** (the box that holds the items), and its **children** line up in a row. Only the direct children line up. Spacing, centring and wrapping are the next lessons, so here the space between items is a `margin` on each item. `list-style: none;` is not Flexbox: it removes a list's bullets, which every real menu does.
running:
  - "Predict: most students do not expect one line on the `ul` to rearrange its items. It does, because the items are its children. Ask one pair from each answer to say why. Listen for who says bullets: list-style is not Flexbox."
  - "Run: delete and restore `display: flex;` to see the switch."
  - "Investigate: ask which box is the parent before every rule. The menu that will not line up has `display: flex` on each `li`: each item lines up its own insides, so nothing visible changes and there is no error."
  - "Mix it up: both rules are from earlier lessons. Ask which links `nav a` picks, and where padding goes."
  - "Modify: menu first, then the cards (a new rule on the div that holds them), then the tidy-up."
  - "Make: several answers are fine. The check wants the nav parts and `display: flex`."
stuck:
  - see: The items still stack after adding display flex.
    ask: Which box did you put display flex on? Is it the box that holds the items?
    fix: Move display flex to the parent's rule (the ul, or the div that holds the cards).
  - see: The words in the row touch each other.
    ask: What puts space outside each item?
    fix: Add a margin to the li items, such as margin-right 24px. The next lesson has a better tool for the space between items.
  - see: Bullets sit oddly beside the menu items.
    ask: What removes a list's bullets?
    fix: Add list-style none; to the ul's rule.
stretch: "Make the cards a row too, with a picture in each, and predict what happens if a card has display flex as well."
support: "Give students the Modify starter and do the first task together, saying out loud: the menu is the parent, so display flex goes in .menu."
leads: "Next lesson spaces the row out: gap, justify-content and align-items, so the club name sits left and the menu right. Class idea: find three websites and sketch which parts are Flexbox rows (menus, toolbars, rows of cards)."
exit:
  q: "A student wants three cards side by side. They write .card { display: flex; } but the cards still stack. What is wrong, and what should they write?"
  a: "display flex is on the items. It goes on the box that holds the cards, for example .cards { display: flex; } with the cards inside a div with class cards."
explain: |
  The video and the picture show the same steps:

  1. A list stacks its items, one under another.
  2. `display: flex;` goes on the box that **holds** the items: here the `ul` (the **parent**).
  3. Its children, the `li` items, now sit side by side in a row.
  4. On each `li` instead, it does nothing for the row: the items need a parent to line them up.

  The rule to remember: Flexbox goes on the parent, and the children line up.
solutions:
  step-4#t1: page.html#sol-row
  step-4#t2: page.html#sol-cards
  step-4#t3: page.html#sol-tidy
  step-6: page.html#sol-make
struggle: "display: flex goes on the parent, not the items. When the row doesn't appear, ask which box holds the items before saying anything else."
class:
  activities:
    - at: end
      kind: activity
      title: Parent or child?
      minutes: 4
      do: |
        Swap menus with a partner. Point at the box that holds the items and the boxes that line up, then say which rule has display flex.
      notes: "Listen for students who point at the links. Ask what the links sit inside."
```

```code page.html#menu
<style>
  ul {
    display: flex;
    list-style: none;
  }
  li {
    margin-right: 24px;
  }
</style>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
```

```code page.html#cards
<style>
  .cards {
    background-color: aliceblue;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
    margin: 8px;
  }
</style>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

```code page.html#items
<style>
  li {
    display: flex;
  }
</style>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
```

```code page.html#review
<style>
  header {
    background-color: lightblue;
  }
  .menu {
    display: flex;
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
</style>
<header>
  <h1>Robotics Club</h1>
  <nav>
    <ul class="menu">
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/events">Events</a></li>
      <li><a href="https://example.com/join">Join</a></li>
    </ul>
  </nav>
</header>
<p>We meet every Tuesday. <a href="https://example.com/map">Find the STEM lab</a>.</p>
```

```code page.html#modify
<style>
  .menu {
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

```code page.html#sol-row
<style>
  .menu {
    display: flex;
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

```code page.html#sol-cards
<style>
  .menu {
    display: flex;
    list-style: none;
  }
  .menu li {
    margin-right: 24px;
  }
  .cards {
    display: flex;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

```code page.html#sol-tidy
<style>
  .menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .menu li {
    margin-right: 24px;
  }
  .cards {
    display: flex;
  }
  .card {
    padding: 8px;
    border: 2px solid teal;
    margin: 6px;
  }
</style>
<ul class="menu">
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/events">Events</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<div class="cards">
  <div class="card">
    <img src="trophy.svg" alt="Trophy" width="50">
    <p>Owls</p>
  </div>
  <div class="card">
    <img src="medal.svg" alt="Medal" width="50">
    <p>Hawks</p>
  </div>
  <div class="card">
    <img src="star.svg" alt="Star" width="50">
    <p>Kestrels</p>
  </div>
</div>
```

```code page.html#make
<!-- Make the top of the club page. -->
<h2>We meet every Tuesday at lunch.</h2>
```

```code page.html#sol-make
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .menu li {
    margin-right: 24px;
  }
</style>
<header>
  <h1>Robotics Club</h1>
  <nav>
    <ul class="menu">
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/events">Events</a></li>
      <li><a href="https://example.com/join">Join</a></li>
    </ul>
  </nav>
</header>
<h2>We meet every Tuesday at lunch.</h2>
```

```code page.html#explain-start
<style>
  ul {
    list-style: none;
  }
</style>
<ul>
  <li>Home</li>
  <li>Events</li>
  <li>Join</li>
</ul>
```

```code page.html#explain
<style>
  ul {
    list-style: none;
    display: flex;
  }
  li {
    margin-right: 24px;
  }
</style>
<ul>
  <li>Home</li>
  <li>Events</li>
  <li>Join</li>
</ul>
```
