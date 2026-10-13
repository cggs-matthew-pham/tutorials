---
order: 10
unit: challenge
node: AC9TDI10K02 n2
moveId: layout-challenge
reviews: [tag-pairs, nesting, css-rule, list-items, attribute-link, image-alt, class-pick, read-for-the-job, table-rows, page-sections, id-target, labelled-input, html-challenge, rules-combine, inside-selector, block-inline, box-model, read-the-stylesheet, flex-row, flex-space, fit-any-width, component]
assumes: [heading, paragraph, style-block, css-rule, text-colour, font, list, attribute, link, image, class, class-selector, table, semantic, id, link-in-page, form, button, group-selector, descendant-selector, div-span, display, box, flex, flex-options]
title: "Challenge: lay out the club page"
summary: Lay out the Course A club page in three milestones, from a header with the menu on the right to a hero, a row of cards, a table, a sign-up card and a footer, then make it your own.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8133
  url: http://127.0.0.1:8133/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#finished
hook: "Take a page that only runs down the screen and give it a layout: a menu on the right, cards in a row, a sign-up card."
---
In Course A you built a club page that runs down the screen in order. Now lay it out. Everything you need, you have met before. Check the page after every change.

## Plan the layout

```step
stage: investigate
code: page.html#finished
picture: page.html#finished
insight: "Seeing the laid-out page as named parts turns a big task into a list of small ones students have already done."
tasks:
  - check:
      type: match
      q: "Match each part of the laid-out page with the rule that makes it."
      pairs:
        - ["The club name on the left, the menu on the right", "display: flex and justify-content: space-between on the header"]
        - ["The menu links in a row, without underlines", "nav ul { display: flex; } and nav a { }"]
        - ["Three cards that share one look", "one class on all three, and one .card rule"]
        - ["Cards that drop to a new line on a phone", "flex-wrap: wrap, with flex: 1 and a min-width on the card"]
        - ["Room inside each card, and a line around it", "padding and border"]
        - ["Each form label on its own line", "display: block on label"]
      explain: "Each part is a lesson you have done. Build them in order: header and menu, then the hero and cards, then the table, form and footer."
  - check:
      type: question
      q: "You add a fourth card to the row. How much new CSS do you write?"
      options: ["None: copy a card, and the .card rule styles it too", "A new .card4 rule", "A new row with display: flex", "A new width for all four cards"]
      answer: 0
      fault: logic
      misconception: class-per-copy
      explain: "A class is shared by every copy. Adding a card is copying HTML, not writing CSS."
```

The picture shows the page you will build.

### Name the parts

Which rule makes each part?

### Count the cost

How much CSS does a fourth card need?

## Build the layout

```step
stage: modify
insight: "Three milestones with fading support: the full code, then an outline, then only the goals."
try: { playground: html, starter: "page.html#start", height: 600 }
tasks:
  - starter: "page.html#start"
    hint:
      - "Replace the `header` rule with the one in the lesson, then add the `nav ul` and `nav a` rules below it."
      - "`display: flex` goes on the box that holds the items: the header holds the name and the menu, and the `ul` holds the links."
      - "`justify-content: space-between` pushes the name left and the menu right."
    check: { type: code, text: "Put the club name on the left and the menu in a row on the right, and style the links with nav a.", rules: { contains: ["display: flex", "justify-content: space-between", "nav ul {", "nav a {"] } }
    expected: page.html#sol-m1
  - starter: "page.html#m2"
    hint:
      - "Follow the outline in the comments: each comment becomes one piece of HTML or one rule."
      - "The cards row is a `<section class=\"cards\">` that holds three `<div class=\"card\">`. Put `display: flex`, `flex-wrap: wrap` and `gap` on `.cards`."
      - "Put `flex: 1` and `min-width: 200px` on `.card`, with `padding` and a `border`. Adding a fourth card needs no new CSS."
    check: { type: code, text: "Add a hero and three cards in a row that wraps, with one class for the cards.", rules: { tags: [section, div, h3], contains: ["class=\"hero\"", "class=\"card\"", ".hero {", ".card {", "flex-wrap: wrap", "gap:"] } }
    expected: page.html#sol-m2
  - starter: "page.html#m3"
    hint:
      - "The goals list three parts: the table, the sign-up form and the footer. Do one at a time and check the page after each."
      - "The form is a card: reuse the class you already have, `<form class=\"card\">`. No new rule is needed for that."
      - "Labels are inline, so they sit beside their box. `display: block` on `label` gives each its own line."
    check: { type: code, text: "Style the table cells, make the sign-up form a card with each label on its own line, and pad the footer.", rules: { tags: [form, label, input, footer], contains: ["<form class=\"card\">", "label {", "display: block", "footer {", "padding:"] } }
    expected: page.html#sol-m3
  - check: { type: reflect, text: "I raised the cards' min-width so they dropped onto new lines, and I checked every menu link and label." }
```

### Milestone 1: header and menu

The name and the menu sit one above the other. Put them on one line. Replace the `header` rule with this one, and add the two rules below it:

```html
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
</style>
```

The header holds the name and the menu, so the header is the flex box. The menu list holds the links, so `nav ul` is a flex box too. `nav a` styles only the links inside the menu.

### Milestone 2: a hero and cards

Follow the comments. Build:

- a hero: a `<section class="hero">` with an `<h2>`, a paragraph and a link to `#join`, styled by a `.hero` rule;
- a `<section class="cards">` holding three `<div class="card">`, each with an `<h3>` and a paragraph;
- a `.cards` rule that makes a row that wraps, with a gap;
- one `.card` rule for all three cards, so they share the row and do not squash.

### Milestone 3: table, form and footer

Goals only this time:

- the results table has padding and a border on its cells;
- the sign-up form is a card, with each label on its own line;
- the footer has padding.

### Test the layout

Raise the cards' `min-width` (try `300px`). The cards should drop onto new lines and none should squash. Then click every menu link and every label.

## Make it yours

```step
stage: make
try: { playground: html, starter: "page.html#sol-m3", height: 600 }
hint:
  - "Change one thing at a time: the club name, then the words, then the colours."
  - "Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`."
check: { type: reflect, text: "I changed the club, its words and its colours, and the layout still works when I raise the cards' min-width." }
expected: page.html#sol-yours
```

Turn the page into one for a club or event you care about: a new name, your own words, your own colours. Add a fourth card by copying one. Try `justify-content: center` on the cards, or a different `gap`. Then check the narrow view again.

```teacher
summary: Students lay out the Course A club page in three milestones with fading support (header and menu, then a hero and a wrapping row of cards, then the table, a sign-up card and the footer), then make it their own.
time: 90
timing: "Plan 10 min · Milestone 1 15 min · Milestone 2 25 min · Milestone 3 25 min · Make it yours 15 min"
goals:
  - I can plan a layout as a list of parts.
  - I can put a name and a menu on one line with Flexbox, and style the menu links with nav a.
  - I can build a hero and a row of cards that wraps, sharing one class.
  - I can lay out a table, a form card and a footer.
before: |
  Read the challenge primer "Running the final challenge", then build milestone 1 yourself and plan milestones 2 and 3 on paper.

  There is **nothing new** in this lesson. The starter is the finished Course A club page, so students who skipped Course A can still start here. Every milestone recalls earlier lessons: rules that combine and `nav a`, block and inline, the box, Flexbox rows, `gap`, `justify-content`, wrapping and components. Support fades on purpose: milestone 1 gives the exact code, milestone 2 an outline in comments, milestone 3 only the goals. There is no separate review step, because the whole lesson is review. Finishing this lesson marks **Challenge complete** on the course page.
running:
  - "Plan the layout: match each part to its rule. Write the parts on the board as a checklist."
  - "Milestone 1: everyone should finish this in the first lesson. Ask where display: flex goes, and why there are two flex boxes."
  - "Milestone 2: the outline is in the comments. Students who are stuck can use **Reset to this task's start** to load a working milestone 1."
  - "Milestone 3: goals only. Ask students to name which earlier rule each goal reuses before typing."
  - "Make it yours: any club or event. Ask for a fourth card made by copying, with no new CSS."
stuck:
  - see: Nothing moved in the header.
    ask: Which box holds the name and the menu, and does it have display flex?
    fix: Put display flex on the header, the box that holds them, not on the h1 or the nav.
  - see: The menu links are still stacked in a column.
    ask: Which box holds the links?
    fix: Put display flex on nav ul, the list that holds the li items.
  - see: The cards stay in one row and squash when they have no min-width.
    ask: Does the row have flex-wrap wrap, and does the card have a min-width?
    fix: Add flex-wrap wrap to .cards, and flex 1 with min-width 200px to .card.
  - see: The labels still sit beside their boxes.
    ask: Are labels block or inline?
    fix: "Labels are inline. Add label { display: block; }."
stretch: "Add a fourth card, then a second row of cards. Try justify-content: center on the cards and see what changes. Try the optional lessons on Grid and on making the page react."
support: "Let students use Reset to this task's start at each milestone, so everyone reaches milestone 3. Pair students for milestone 3: one does the table, one the form."
leads: "The finished page is a portfolio piece: students can name each part and the lesson it came from. Optional lessons follow: Grid for whole-page layouts, and Make it react for a first look at JavaScript."
exit:
  q: "Name three parts of your layout and the rule behind each."
  a: "For example: the name left and the menu right is display flex with justify-content space-between on the header; the cards share one .card rule; the cards wrap because the row has flex-wrap wrap."
explain: |
  The picture shows the laid-out page. Build it in this order, one milestone at a time:

  1. **Header and menu:** Flexbox on the header and on the menu list, and `nav a` for the links.
  2. **Hero and cards:** a hero section and a wrapping row of cards that share one class.
  3. **Table, form and footer:** padded cells, the form as a card, and a padded footer.

  Check the page after every change.
solutions:
  step-2#t1: page.html#sol-m1
  step-2#t2: page.html#sol-m2
  step-2#t3: page.html#sol-m3
  step-3: page.html#sol-yours
struggle: "Planning a whole layout from parts they already know, and putting display flex on the right box. Have them name the box that holds the items first."
class:
  activities:
    - at: investigate
      kind: discussion
      title: Name the parts
      minutes: 4
      do: |
        With your partner, point to each part of the laid-out page and name the rule behind it.
      notes: "Listen for the box that holds the items. Write the checklist on the board for the build."
    - at: end
      kind: activity
      title: Squeeze a neighbour's page
      minutes: 5
      do: |
        Swap pages with a partner. Raise the cards' min-width on their page and say which parts fit and which do not.
      notes: "For anything that squashes, ask the owner whether the row wraps and whether the card has a min-width."
```

```code page.html#finished
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
    padding: 16px;
  }
  .hero {
    background-color: lightyellow;
    text-align: center;
    padding: 32px;
    margin: 16px 0;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1;
    min-width: 200px;
    padding: 16px;
    border: 2px solid navy;
  }
  table {
    width: 100%;
  }
  td, th {
    padding: 8px;
    border: 1px solid gray;
    text-align: left;
  }
  label {
    display: block;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Welcome to Chess club</h2>
    <p>Learn the moves, play a friend and win a trophy.</p>
    <p><a href="#join">Join us today</a></p>
  </section>
  <section class="cards">
    <div class="card">
      <h3>When</h3>
      <p>Every Wednesday at lunch.</p>
    </div>
    <div class="card">
      <h3>Where</h3>
      <p>In the library.</p>
    </div>
    <div class="card">
      <h3>Who</h3>
      <p>Everyone, at any level.</p>
    </div>
  </section>
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form class="card">
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#start
<style>
  header {
    background-color: lightblue;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form>
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#sol-m1
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form>
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#m2
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
  }
  /* Hero: a light background, centred text, padding and a margin above and below. */
  /* Cards: a row that wraps, with a gap between cards. */
  /* One card rule: flex: 1 and a min-width so the cards share the row, then padding and a border. */
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <!-- Hero: a section with class hero. An h2, a paragraph and a link to #join. -->
  <!-- Cards: a section with class cards holding three divs with class card. Each has an h3 and a paragraph (When, Where, Who). -->
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form>
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#sol-m2
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
  }
  .hero {
    background-color: lightyellow;
    text-align: center;
    padding: 32px;
    margin: 16px 0;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1;
    min-width: 200px;
    padding: 16px;
    border: 2px solid navy;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Welcome to Chess club</h2>
    <p>Learn the moves, play a friend and win a trophy.</p>
    <p><a href="#join">Join us today</a></p>
  </section>
  <section class="cards">
    <div class="card">
      <h3>When</h3>
      <p>Every Wednesday at lunch.</p>
    </div>
    <div class="card">
      <h3>Where</h3>
      <p>In the library.</p>
    </div>
    <div class="card">
      <h3>Who</h3>
      <p>Everyone, at any level.</p>
    </div>
  </section>
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form>
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#m3
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
  }
  .hero {
    background-color: lightyellow;
    text-align: center;
    padding: 32px;
    margin: 16px 0;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1;
    min-width: 200px;
    padding: 16px;
    border: 2px solid navy;
  }
  /* Milestone 3: the goals are in the lesson. */
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Welcome to Chess club</h2>
    <p>Learn the moves, play a friend and win a trophy.</p>
    <p><a href="#join">Join us today</a></p>
  </section>
  <section class="cards">
    <div class="card">
      <h3>When</h3>
      <p>Every Wednesday at lunch.</p>
    </div>
    <div class="card">
      <h3>Where</h3>
      <p>In the library.</p>
    </div>
    <div class="card">
      <h3>Who</h3>
      <p>Everyone, at any level.</p>
    </div>
  </section>
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form>
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#sol-m3
<style>
  header {
    background-color: lightblue;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lightblue;
    text-align: center;
    padding: 16px;
  }
  .hero {
    background-color: lightyellow;
    text-align: center;
    padding: 32px;
    margin: 16px 0;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1;
    min-width: 200px;
    padding: 16px;
    border: 2px solid navy;
  }
  table {
    width: 100%;
  }
  td, th {
    padding: 8px;
    border: 1px solid gray;
    text-align: left;
  }
  label {
    display: block;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Welcome to Chess club</h2>
    <p>Learn the moves, play a friend and win a trophy.</p>
    <p><a href="#join">Join us today</a></p>
  </section>
  <section class="cards">
    <div class="card">
      <h3>When</h3>
      <p>Every Wednesday at lunch.</p>
    </div>
    <div class="card">
      <h3>Where</h3>
      <p>In the library.</p>
    </div>
    <div class="card">
      <h3>Who</h3>
      <p>Everyone, at any level.</p>
    </div>
  </section>
  <section id="about">
    <h2>About the club</h2>
    <p>We play chess every Wednesday at lunch in the library. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a snack</li>
      <li>your best opening</li>
    </ul>
    <img src="trophy.svg" alt="A gold trophy" width="100">
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr><th>Player</th><th>Wins</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form class="card">
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

```code page.html#sol-yours
<style>
  header {
    background-color: lavender;
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  nav ul {
    display: flex;
    gap: 16px;
    margin: 0;
    padding: 0;
  }
  nav a {
    text-decoration: none;
  }
  h1 {
    color: navy;
  }
  a {
    color: darkblue;
  }
  h2 {
    color: darkblue;
  }
  .winner {
    background-color: gold;
  }
  footer {
    background-color: lavender;
    text-align: center;
    padding: 16px;
  }
  .hero {
    background-color: lightyellow;
    text-align: center;
    padding: 32px;
    margin: 16px 0;
  }
  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
  }
  .card {
    flex: 1;
    min-width: 200px;
    padding: 16px;
    border: 2px solid navy;
  }
  table {
    width: 100%;
  }
  td, th {
    padding: 8px;
    border: 1px solid gray;
    text-align: left;
  }
  label {
    display: block;
  }
</style>
<header>
  <h1>Choir club</h1>
  <nav>
    <ul>
      <li><a href="#about">About</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Welcome to Choir club</h2>
    <p>Sing with friends, learn new songs and perform at the concert.</p>
    <p><a href="#join">Join us today</a></p>
  </section>
  <section class="cards">
    <div class="card">
      <h3>When</h3>
      <p>Every Thursday at lunch.</p>
    </div>
    <div class="card">
      <h3>Where</h3>
      <p>In the music room.</p>
    </div>
    <div class="card">
      <h3>Who</h3>
      <p>Everyone, at any level.</p>
    </div>
  </section>
  <section id="about">
    <h2>About the club</h2>
    <p>We sing every Thursday at lunch in the music room. All levels welcome.</p>
    <p>Bring:</p>
    <ul>
      <li>a friend</li>
      <li>a water bottle</li>
      <li>your best voice</li>
    </ul>
    <img src="music.svg" alt="Music notes" width="100">
  </section>
  <section id="results">
    <h2>Concert results</h2>
    <table>
      <tr><th>Singer</th><th>Solos</th></tr>
      <tr class="winner"><td>Ada</td><td>5</td></tr>
      <tr class="winner"><td>Sam</td><td>5</td></tr>
      <tr><td>Priya</td><td>3</td></tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form class="card">
      <p><label for="name">Name</label>
      <input id="name" type="text"></p>
      <p><label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Singers</option>
        <option>Champions</option>
      </select></p>
      <button>Join</button>
    </form>
  </section>
</main>
<footer>
  <p>Contact: choir@example.com</p>
</footer>
```