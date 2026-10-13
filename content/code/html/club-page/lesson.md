---
order: 13
unit: challenge
node: AC9TDI10K02 n2
moveId: html-challenge
reviews: [tag-pairs, nesting, css-rule, list-items, attribute-link, image-alt, class-pick, read-for-the-job, table-rows, page-sections, id-target, labelled-input]
assumes: [heading, paragraph, style-block, css-rule, text-colour, font, list, attribute, link, image, class, class-selector, table, semantic, id, link-in-page, form, button]
title: "Challenge: a club page"
summary: Build a whole club page in three milestones, from a coloured header and menu to sections, a results table and a sign-up form, then make it your own.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8133
  url: http://127.0.0.1:8133/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#finished
hook: "This is how real websites start: a header with a menu, sections, a table and a form, each a part you already know how to make."
---
Build a whole page for a school club, one milestone at a time. Everything you need, you have met before. There is no layout yet: the page runs down the screen in order, and colour does the work. Check the page after every change.

## Plan the page

```step
stage: investigate
code: page.html#finished
picture: page.html#finished
insight: "Seeing the finished page as named parts turns a big task into a list of small ones students have already done."
tasks:
  - check:
      type: match
      q: "Match each part of the finished page with how it is built."
      pairs:
        - ["The title and menu at the top", "a <header> holding an <h1> and a <nav> with a list of links"]
        - ["A menu link that jumps down the page", "href=\"#results\" matching id=\"results\" on a section"]
        - ["The winners in gold", "class=\"winner\" on their rows, and one .winner rule"]
        - ["Results this term", "a <table> of rows, with <th> and <td> cells"]
        - ["Join the club", "a <form> whose labels have a for that matches each box's id"]
        - ["Every h2 in one colour", "one rule for the tag, h2 { }"]
      explain: "Each part is a lesson you have done. Build them in order: header and menu, then sections, then the form and footer."
  - check:
      type: question
      q: "Two rows of the results table should be gold and the third should not. What does that?"
      options: ["class=\"winner\" on those two rows, and a .winner rule", "A tr rule with background-color: gold;", "An id=\"winner\" on both rows", "A different <table> for the winners"]
      answer: 0
      fault: logic
      explain: "A tag rule such as tr colours every row. A class picks some rows, and one .winner rule colours all of them. An id may name only one element."
```

The picture shows the page you will build.

### Name the parts

Which tag or rule makes each part?

### Pick some rows

Which tool colours only the winners?

## Build the page

```step
stage: modify
insight: "Three milestones with fading support: the full code, then an outline, then only the goals."
try: { playground: html, starter: "page.html#start", height: 560 }
tasks:
  - starter: "page.html#start"
    hint:
      - "Each rule has a tag, braces, a property, a colon and a semicolon."
      - "Type the `header`, `h1` and `a` rules inside the `<style>` block, exactly as the lesson shows them."
    check: { type: code, text: "Colour the header, the title and the links with tag rules.", rules: { contains: ["header {", "background-color:", "h1 {", "a {"] } }
    expected: page.html#sol-m1
  - starter: "page.html#m2"
    hint:
      - "Follow the outline in the comments: each comment becomes one section."
      - "`<section id=\"about\">` starts the first one. A table is written one row at a time, with `<tr>`, `<th>` and `<td>`."
      - "Winners: `<tr class=\"winner\">`, then a `.winner { background-color: gold; }` rule in the style block."
    check: { type: code, text: "Add the About and Results sections, with the winners marked by class.", rules: { tags: [section, ul, li, img, table, tr, th, td], contains: ["id=\"about\"", "id=\"results\"", "alt=\"", "class=\"winner\"", ".winner {"] } }
    expected: page.html#sol-m2
  - starter: "page.html#m3"
    hint:
      - "The goals list two parts: the sign-up section and the footer. Do one at a time and check the page after each."
      - "A sign-up section is `<section id=\"join\">` with an `<h2>` and a `<form>`. Each label and its box goes in a `<p>`."
      - "The footer goes after `</main>`. A `footer { }` rule colours it."
    check: { type: code, text: "Add a sign-up form with linked labels, and a footer.", rules: { tags: [form, p, label, input, select, option, button, footer], contains: ["id=\"join\"", "for=\"", "footer {"] } }
    expected: page.html#sol-m3
  - check: { type: reflect, text: "I clicked every menu link and every label, and each one went to the right place." }
```

### Milestone 1: header and menu

The page starts with a header and a menu. Colour it with three tag rules. Type these into the `<style>` block:

```html
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
</style>
```

### Milestone 2: sections

Follow the two comments inside `<main>`. Build:

- a section with `id="about"`: an `<h2>`, a paragraph, a list of three things to bring, and a picture with alt text;
- a section with `id="results"`: an `<h2>` and a table with a heading row and three players;
- the two winners marked with `class="winner"` and coloured by one `.winner` rule.

Menu links jump to a section when their `href` matches its `id`: click About and Results to check.

### Milestone 3: sign-up and footer

Goals only this time:

- a section with `id="join"`: an `<h2>` and a form with at least two labelled fields (one a drop-down) and a button, every label linked to its box;
- a footer after `</main>` with contact details;
- a `footer { }` rule to colour it.

### Test the page

Click every menu link and every label. A link that does not jump has an `href` that does not match an `id`. A label that does not find its box has a `for` that does not match its `id`.

## Make it yours

```step
stage: make
try: { playground: html, starter: "page.html#sol-m3", height: 560 }
hint:
  - "Change one thing at a time: the club name, then the words, then the colours."
  - "Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`."
check: { type: reflect, text: "I changed the club, its words and its colours, and every link and label still works." }
expected: page.html#sol-yours
```

Turn the page into one for a club or event you care about: a new name, your own words, your own colours, and a picture with alt text that fits. Add a rule or two of your own, such as a `font-family` for the headings. Then click every link and every label again.

```teacher
summary: Students build a coloured club page in three milestones with fading support (header and menu, sections with a list, picture and results table, then a sign-up form and footer), then make it their own.
time: 90
timing: "Plan 10 min · Milestone 1 15 min · Milestone 2 25 min · Milestone 3 25 min · Make it yours 15 min"
goals:
  - I can plan a page as a list of parts.
  - I can build a header with a jump-link menu, sections, a results table and a sign-up form.
  - I can colour the page with tag rules and pick the winners with a class.
  - I can test that every link and label works.
before: |
  Read the challenge primer "Running the final challenge", then build milestone 1 yourself and plan milestones 2 and 3 on paper.

  There is **nothing new** in this lesson, and no layout: Course B lays this same page out. Every milestone recalls earlier lessons: tags and nesting, tag rules and colours, lists, links, pictures and alt text, classes, tables, page sections, jump links, and forms. Support fades on purpose: milestone 1 gives the exact rules, milestone 2 an outline in comments, milestone 3 only the goals. Finishing this lesson marks **Challenge complete** on the course page.
running:
  - "Plan the page: match each part to how it is built. Write the parts on the board as a checklist."
  - "Milestone 1: everyone should finish this in the first lesson. The menu links do nothing yet, because the sections do not exist."
  - "Milestone 2: the outline is in the comments. Students who are stuck can use **Reset to this task's start** to load a working milestone 1. Now the menu links jump."
  - "Milestone 3: goals only. Ask students to plan the form's fields before typing. Click every label and every menu link."
  - "Make it yours: any club or event. Encourage pictures with good alt text and readable colours."
stuck:
  - see: A menu link does not jump.
    ask: Does the href, after the #, match the section's id exactly?
    fix: Make each pair match exactly, capitals included, and keep the # in the href only.
  - see: Clicking a label does nothing.
    ask: Does the label's for match the box's id?
    fix: Make them identical, for example for="name" and id="name".
  - see: Every table row is gold, or no row is.
    ask: Does the class go on the row's opening tag, and does the rule start with a dot?
    fix: Write <tr class="winner"> for the winners and .winner { } in the style block.
  - see: Part of the page suddenly looks wrong after an edit.
    ask: Which closing tag did you add or move last?
    fix: Check that every tag closes, in the right order, and that every property ends with a semicolon.
stretch: "Add a second table, a second list, or a rule that changes the font of the headings with font-family. Then look at the Course B challenge, which lays this page out."
support: "Let students use Reset to this task's start at each milestone, so everyone reaches milestone 3. Pair students for milestone 3: one plans the form, one the footer."
leads: "Course B (Layout and components) takes this same page and lays it out: menu in a row, cards, a hero, and a form styled as a card. The finished page is a portfolio piece: students can describe each part and the lesson it came from."
exit:
  q: "Name three parts of your page and the tag, attribute or rule behind each."
  a: "For example: the menu is a nav list of links, and each href matches a section's id; the gold winners are rows with class winner and a .winner rule; the sign-up labels work because each for matches a box's id."
explain: |
  The picture shows the finished page. Build it in this order, one milestone at a time:

  1. **Header and menu:** a `<header>` with a `<nav>` list of links to `#ids`, coloured by tag rules.
  2. **Sections:** a list, a picture and a results table, with the winners marked by a class.
  3. **Sign-up and footer:** a `<form>` with labels linked to their boxes, and a `<footer>`.

  Check the page after every change.
solutions:
  step-2#t1: page.html#sol-m1
  step-2#t2: page.html#sol-m2
  step-2#t3: page.html#sol-m3
  step-3: page.html#sol-yours
struggle: "Planning a whole page from parts they already know. Have them name the parts first and finish one milestone at a time; resist building it for them."
class:
  activities:
    - at: investigate
      kind: discussion
      title: Name the parts
      minutes: 4
      do: |
        With your partner, point to each part of the finished page and name the tag or rule behind it.
      notes: "Listen for the lesson each part came from. Write the checklist on the board for the build."
    - at: end
      kind: activity
      title: Click-test a neighbour's page
      minutes: 5
      do: |
        Swap pages with a partner. Click every menu link and every label. Say which parts work and which do not.
      notes: "For anything that fails, ask the owner to compare the href with the id, or the for with the id, before changing anything."
```

```code page.html#finished
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

```code page.html#start
<style>
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
  <!-- Milestone 2 comes next. -->
</main>
```

```code page.html#sol-m1
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
  <!-- Milestone 2 comes next. -->
</main>
```

```code page.html#m2
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
  <!-- Milestone 2, section 1: id="about" with an h2, a paragraph, a list of three things to bring and a picture. -->
  <!-- Milestone 2, section 2: id="results" with an h2 and a table of three players. Give the winners the class winner. -->
</main>
```

```code page.html#sol-m2
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
</main>
```

```code page.html#m3
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
  <!-- Milestone 3: the sign-up section and the footer. The goals are in the lesson. -->
</main>
```

```code page.html#sol-m3
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

```code page.html#sol-yours
<style>
  header {
    background-color: lavender;
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
    <form>
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
