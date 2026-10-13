---
order: 9
unit: layout
node: AC9TDI10K02 n2
moveId: component
reviews: [class-pick, fit-any-width]
introduces: []
assumes: [semantic, class, box, flex, flex-options]
title: A hero and a row of cards
summary: Build a card once with a class, copy its HTML for every card you need, and let one set of rules style them all.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8262
  url: http://127.0.0.1:8262/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.5 }
  caption: "A copied component is styled by the same rules"
  clip:
    - caption: "Each card is a section with the class card."
    - wait: 1500
    - caption: "One rule, .card, styles every element with that class."
    - wait: 1500
    - caption: "For a fourth card, copy a card's HTML."
    - type: { into: HTML code, text: "  <section class=\"card\"><h2>Drones</h2><p>Fly and film.</p></section>\n", after: "<h2>Coding</h2><p>Make games.</p></section>\n" }
    - expect: { selector: "#preview-text", contains: "Fly and film." }
    - caption: "No new CSS, and the new card already looks like the others."
    - wait: 2000
hook: "A shop shows hundreds of products in the same card: one design, written once, and a copy of the HTML for each product."
---
So far you have written the CSS for a page and then the HTML for it. A **component** is a chunk of HTML with a class, written once and copied for every place it is needed. The rules for its class are written once too.

## Predict

```step
stage: predict
code: page.html#cards
insight: "Students expect each new card to need its own rule; a shared class styles every copy."
check:
  type: predict
  q: "The club adds a fourth card, Drones. How much CSS must you write for it?"
  options:
    - "None: copy a card's HTML, change its words, and the .card rule styles it"
    - "About five lines: a new rule such as .card4 for the fourth card"
    - "One line in .cards, to make room for a fourth card"
    - "One line in .card for every card on the page"
  fault: logic
  misconception: class-per-copy
  actual: "None. Every card has class=\"card\", so the .card rule already styles a fourth. The wrapping row makes room for it on its own."
```

Read the code: a hero (a big opening section) and a row of three cards. How much CSS must you write to add a fourth card?

## Run

```step
stage: run
code: page.html#cards
try: { playground: html, starter: "page.html#cards", height: 480, boxes: true }
insight: "A component is HTML with a class; the rules for the class are written once and style every copy."
check: { type: reflect, text: "I can explain why a copied card needs no new CSS." }
unlocks: [card-component]
```

Compare with your prediction. Then copy one whole `<section class="card">` line, paste it under the last card and change its words. Next, change `gray` in the `.card` rule to `navy`: every card changes together.

| Code | What it does | Why |
|---|---|---|
| `<section class="card">…</section>` | One card: a heading and a paragraph | This is the component. It is plain tags with a class, and the words are the only part that differs between copies |
| `.card { … }` | Styles every element with the class `card` | One rule, however many cards. A new copy matches it at once, so adding a card is copying HTML, not writing CSS |
| `<div class="cards">` | The box that holds the cards | It has the flex row from the last lesson. `flex-wrap: wrap` makes room for another card on a new line |
| `<section class="hero">` | A big opening section | The hero is a component too, with one copy on the page. Its rule `.hero` gives it padding and a background |
| `class="card"` and not `card1`, `card2` | Every copy has the same class | A class names a kind of thing. If each copy had its own class, each would need its own rule |

## Investigate

```step
stage: investigate
code: page.html#cards
insight: "Copies share one class and one rule. A copy with a different spelling is not styled, and rules kept in one place can restyle every page."
tasks:
  - check:
      type: bug
      code: page.html#crad
      answer: 9
      fault: logic
      misconception: selector-mismatch
      text: "The Drones card is plain, while the other two have a border and padding, and there is no error. Click the line that causes it."
      explain: "Line 9 says crad. The class is card, so the .card rule does not match it. A copy only gets the style if its class is spelt exactly the same."
  - check:
      type: question
      code: page.html#percopy
      q: "Mia gave each card its own class and its own rule, and they look right. What goes wrong as the club grows?"
      options:
        - "Each new card needs a new rule, and changing the border means changing every rule"
        - "Nothing: this is the usual way to build cards"
        - "The browser shows an error for classes with numbers"
        - "Only the first card is styled"
      answer: 0
      fault: logic
      misconception: class-per-copy
      explain: "The three rules are identical, so the page repeats itself. With one class, card, and one rule, a new card is only HTML, and a new border colour is one change."
  - check:
      type: question
      q: "A school site has 40 pages that all use the same card class, and the rules sit in one file that every page loads. The school changes its colours. What is the best way to update the cards?"
      options:
        - "Change the .card rule once in that file, and all 40 pages follow"
        - "Edit the border on every card of all 40 pages"
        - "Give each card on each page a new class"
        - "Rewrite all 40 pages"
      answer: 0
      fault: logic
      misconception: class-per-copy
      explain: "The looks live in the rule, not in the cards. Change the rule once and every copy of the component, on every page that loads the file, follows."
```

### The card with no style

One card is plain.

### Rules for every copy

Mia's cards look right.

### Forty pages

One rule, many pages.

## Modify

```step
stage: modify
insight: "Changing one rule restyles every card, and copying one card adds another with no new CSS."
try: { playground: html, starter: "page.html#modify", height: 480, boxes: true }
tasks:
  - hint:
      - "The border is in the `.card` rule. Change the rule once."
      - "Change the border in `.card` to `border: 2px solid navy;`."
    check: { type: code, text: "Change the card border to 2px navy in one place.", rules: { contains: ["border: 2px solid navy;"] } }
    expected: page.html#sol-colour
  - hint:
      - "Copy a whole card line and change the words. Do not touch the CSS."
      - "Paste it under the last card and make the heading `Drones`: `<h2>Drones</h2>`."
    check: { type: code, text: "Add a third card, Drones, by copying a card's HTML.", rules: { contains: ["<h2>Drones</h2>"] } }
    expected: page.html#sol-copy
```

### One change, every card

Make the border of every card `2px solid navy` by changing the rule once.

### A copy

Add a third card with the heading `Drones` by copying one of the others.

## Mix it up

```step
stage: investigate
code: page.html#review
try: { playground: html, starter: "page.html#review", height: 440 }
insight: "Marking an element with the right class and letting a row wrap use two earlier moves together."
check:
  type: code
  text: "Fix the cards so all four look the same, and the row wraps instead of squashing them."
  rules: { contains: ["flex-wrap: wrap;", "min-width:", "class=\"card\"><h2>Drones"] }
expected: page.html#sol-review
hint:
  - "Two things are wrong: one card is not marked, and the row cannot wrap."
  - "Give the plain `<section>` the class `card`, and give the row `flex-wrap: wrap;` and the cards a `min-width`."
```

Two things are wrong on this page: one card looks different, and the cards are squashed.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 480, boxes: true }
hint:
  - "Start with the hero: one section with a heading, a line and a link, given a class. Then write the rule for that class."
  - "Write one card as `<section class=\"card\">` with an `h2` and a `p`, inside a `<div class=\"cards\">`. Then the `.cards` rule (a wrapping flex row) and the `.card` rule."
  - "When three cards work, copy one and change its words. A fourth card needs no new CSS."
check:
  type: code
  text: "Make a hero and a row of cards, built from a class and rules."
  rules: { tags: [section, h1, h2, a], contains: ["class=\"hero\"", "class=\"card\"", ".hero {", ".card {", "flex-wrap: wrap;"] }
expected: page.html#sol-make
```

Make a hero and three cards for a club or event you know: a big heading with a line and a link, and three cards with a heading and a line each, in a row that wraps. Then add a fourth card by copying one, and write no new CSS.

```teacher
summary: Students build a hero and a row of cards from classes, copy a card's HTML to add another, and find out that one set of rules styles every copy.
time: 45
timing: "Predict and Run 10 min · Investigate 10 min · Mix it up 5 min · Modify 8 min · Make 12 min"
goals:
  - I can build a card from tags and a class, and copy it to make another.
  - I can explain why a copied card needs no new CSS.
  - I can change every card at once by changing one rule.
before: |
  Do the Make task yourself in the playground (about 6 minutes).

  A **component** here means a chunk of HTML with a class that you copy: a card, or a hero (a big opening section). Nothing new is taught: it is the class, box and flex row from earlier lessons, used on purpose. The idea is that one rule styles every copy, so adding a card is copying HTML.

  The usual slip is writing a new class and rule for each copy (`card1`, `card2`). It works, but every change has to be made in each rule.
running:
  - "Predict and Run: ask students to count the lines of CSS they would add. Most say about five. Let them copy a card line and see it styled at once."
  - "Investigate: the crad typo is silent. Ask what the browser does with a class that no rule matches: it ignores it. The 40-page question shows why the looks live in one place."
  - "Mix it up: one card is missing its class and the row cannot wrap. Both are earlier lessons."
  - "Make: let students choose a topic. Check the fourth card was made by copying, with no new rule."
stuck:
  - see: A copied card looks plain.
    ask: Does the copy have the same class, spelt the same?
    fix: Check class="card" on the copy. A different spelling, such as crad, matches no rule, and the browser shows no error.
  - see: "The student has .card1, .card2 and .card3 rules."
    ask: How many lines of CSS would a tenth card need?
    fix: Give every card the class card, keep one .card rule, and delete the numbered ones.
  - see: The cards stay in one squashed line.
    ask: Does the row wrap, and do the cards have a minimum width?
    fix: Add flex-wrap wrap to the .cards rule and a min-width to the .card rule.
stretch: "Add a second component, a footer with a class, and use it on two pages worth of text. Or give the cards a third kind, card featured, that changes only the border colour."
support: "Give students the Run page and ask them only to add two cards by copying, and change one colour in the rule."
leads: "Next is the Course B challenge, which lays out the club page using everything so far. Class idea: look at a shop website and point out the parts that are the same component repeated."
exit:
  q: "A page has ten cards, all class card. How many .card rules does it need, and how do you add an eleventh card?"
  a: "One rule. Copy the HTML of a card, change its words, and the rule already styles it."
explain: |
  The video and the picture show the same steps (Boxes is on, so each card shows as a box):

  1. Each card is a `<section>` with the class `card`: a chunk of HTML.
  2. One rule, `.card`, styles every element with that class.
  3. For a fourth card, copy a card's HTML and change its words.
  4. No new CSS is needed: the new card already looks like the others.

  The hero works the same way: a section with a class and one rule.
solutions:
  step-4#t1: page.html#sol-colour
  step-4#t2: page.html#sol-copy
  step-6: page.html#sol-make
struggle: "Believing each copy needs its own rule. Ask what the new card has in common with the others before they write any CSS."
class:
  activities:
    - at: predict
      kind: discussion
      title: Count the lines
      minutes: 3
      do: |
        With your partner, decide how many lines of CSS you would write for the fourth card.
        Hold up 0, 1, 5 or 10 fingers for your answer.
      notes: "Take the vote before running. Ask a student who said 5 what the new rule would say, and how it differs from .card. The idea to land: it would say the same."
    - at: end
      kind: activity
      title: Copy and check
      minutes: 5
      do: |
        Swap pages with a partner. Add a card to their page by copying only HTML, without changing any rule.
        Check that it looks like the others.
      notes: "Watch for students who start to type CSS. Ask what the new card has that the others have."
```

```code page.html#cards
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
</div>
```

```code page.html#percopy
<style>
  .card1 {
    padding: 16px;
    border: 1px solid gray;
  }
  .card2 {
    padding: 16px;
    border: 1px solid gray;
  }
  .card3 {
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="card1"><h2>Robots</h2></section>
<section class="card2"><h2>Coding</h2></section>
<section class="card3"><h2>Design</h2></section>
```

```code page.html#crad
<style>
  .card {
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="card"><h2>Robots</h2></section>
<section class="card"><h2>Coding</h2></section>
<section class="crad"><h2>Drones</h2></section>
```

```code page.html#review
<style>
  .cards {
    display: flex;
    gap: 12px;
  }
  .card {
    flex: 1;
    border: 2px solid teal;
    padding: 10px;
  }
</style>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test robots every Tuesday.</p></section>
  <section class="card"><h2>Coding</h2><p>Write games and run them.</p></section>
  <section><h2>Drones</h2><p>Fly and film on the oval.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo for the club.</p></section>
</div>
```

```code page.html#sol-review
<style>
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    border: 2px solid teal;
    padding: 10px;
  }
</style>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test robots every Tuesday.</p></section>
  <section class="card"><h2>Coding</h2><p>Write games and run them.</p></section>
  <section class="card"><h2>Drones</h2><p>Fly and film on the oval.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo for the club.</p></section>
</div>
```

```code page.html#modify
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
</div>
```

```code page.html#sol-colour
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 2px solid navy;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
</div>
```

```code page.html#sol-copy
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 2px solid navy;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Drones</h2><p>Fly and film.</p></section>
</div>
```

```code page.html#make
<!-- Your hero and cards. Write the hero, three cards, then a fourth. -->
```

```code page.html#sol-make
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
  <section class="card"><h2>Drones</h2><p>Fly and film.</p></section>
</div>
```

```code page.html#explain-start
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
</div>
```

```code page.html#explain
<style>
  .hero {
    padding: 24px;
    background-color: lightblue;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .card {
    flex: 1;
    min-width: 150px;
    padding: 16px;
    border: 1px solid gray;
  }
</style>
<section class="hero">
  <h1>Robotics Club</h1>
  <p>Build, code and compete every Tuesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<div class="cards">
  <section class="card"><h2>Robots</h2><p>Build and test.</p></section>
  <section class="card"><h2>Coding</h2><p>Make games.</p></section>
  <section class="card"><h2>Design</h2><p>Draw a logo.</p></section>
  <section class="card"><h2>Drones</h2><p>Fly and film.</p></section>
</div>
```
