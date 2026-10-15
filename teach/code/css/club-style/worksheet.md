---
title: "Challenge: lay out the club page"
subtitle: "Layout and components · Final challenge: lay out the club page · Lesson 10"
---

# Challenge: lay out the club page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Take a page that only runs down the screen and give it a layout: a menu on the right, cards in a row, a sign-up card.


:::teacher-note

**In one sentence:** Students lay out the Course A club page in three milestones with fading support (header and menu, then a hero and a wrapping row of cards, then the table, a sign-up card and the footer), then make it their own.

**Students should be able to say:** I can plan a layout as a list of parts. I can put a name and a menu on one line with Flexbox, and style the menu links with nav a. I can build a hero and a row of cards that wraps, sharing one class. I can lay out a table, a form card and a footer.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Plan the layout

The picture shows the page you will build.

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

:::keep-together

### Name the parts

**Match each part of the laid-out page with the rule that makes it.**

A. one class on all three, and one .card rule

B. nav ul { display: flex; } and nav a { }

C. flex-wrap: wrap, with flex: 1 and a min-width on the card

D. display: block on label

E. display: flex and justify-content: space-between on the header

F. padding and border

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The club name on the left, the menu on the right` | |
| `The menu links in a row, without underlines` | |
| `Three cards that share one look` | |
| `Cards that drop to a new line on a phone` | |
| `Room inside each card, and a line around it` | |
| `Each form label on its own line` | |

:::


:::teacher-note

**Answer:** The club name on the left, the menu on the right → E. display: flex and justify-content: space-between on the header; The menu links in a row, without underlines → B. nav ul { display: flex; } and nav a { }; Three cards that share one look → A. one class on all three, and one .card rule; Cards that drop to a new line on a phone → C. flex-wrap: wrap, with flex: 1 and a min-width on the card; Room inside each card, and a line around it → F. padding and border; Each form label on its own line → D. display: block on label

Each part is a lesson you have done. Build them in order: header and menu, then the hero and cards, then the table, form and footer.

:::


:::keep-together

### Count the cost

**You add a fourth card to the row. How much new CSS do you write?**

☐ None: copy a card, and the .card rule styles it too

☐ A new row with display: flex

☐ A new width for all four cards

☐ A new .card4 rule

:::


:::teacher-note

**Answer:** None: copy a card, and the .card rule styles it too

A class is shared by every copy. Adding a card is copying HTML, not writing CSS.

:::


:::typical

## Build the layout


**Milestone 1: header and menu.** The name and the menu sit one above the other. Put them on one line. Replace the `header` rule with this one, and add the two rules below it:

The header holds the name and the menu, so the header is the flex box. The menu list holds the links, so `nav ul` is a flex box too. `nav a` styles only the links inside the menu.

**Milestone 2: a hero and cards.** Follow the comments. Build:

- a hero: a `<section class="hero">` with an `<h2>`, a paragraph and a link to `#join`, styled by a `.hero` rule;
- a `<section class="cards">` holding three `<div class="card">`, each with an `<h3>` and a paragraph;
- a `.cards` rule that makes a row that wraps, with a gap;
- one `.card` rule for all three cards, so they share the row and do not squash.

**Milestone 3: table, form and footer.** Goals only this time:

- the results table has padding and a border on its cells;
- the sign-up form is a card, with each label on its own line;
- the footer has padding.

**Test the layout.** Raise the cards' `min-width` (try `300px`). The cards should drop onto new lines and none should squash. Then click every menu link and every label.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Milestone 1: header and menu:**

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

**Milestone 2: a hero and cards:**

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

**Milestone 3: table, form and footer:**

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

:::

:::


## Make it yours

Turn the page into one for a club or event you care about: a new name, your own words, your own colours. Add a fourth card by copying one. Try `justify-content: center` on the cards, or a different `gap`. Then check the narrow view again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
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

:::


## Exit ticket

:::keep-together

**Name three parts of your layout and the rule behind each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: the name left and the menu right is display flex with justify-content space-between on the header; the cards share one .card rule; the cards wrap because the row has flex-wrap wrap.

:::

