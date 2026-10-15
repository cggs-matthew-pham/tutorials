---
title: "Challenge: a club page"
subtitle: "Structure and style a page · Final challenge: a club page · Lesson 13"
---

# Challenge: a club page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** This is how real websites start: a header with a menu, sections, a table and a form, each a part you already know how to make.


:::teacher-note

**In one sentence:** Students build a coloured club page in three milestones with fading support (header and menu, sections with a list, picture and results table, then a sign-up form and footer), then make it their own.

**Students should be able to say:** I can plan a page as a list of parts. I can build a header with a jump-link menu, sections, a results table and a sign-up form. I can colour the page with tag rules and pick the winners with a class. I can test that every link and label works.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Plan the page

The picture shows the page you will build.

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

:::keep-together

### Name the parts

**Match each part of the finished page with how it is built.**

A. class="winner" on their rows, and one .winner rule

B. href="#results" matching id="results" on a section

C. a &lt;table&gt; of rows, with &lt;th&gt; and &lt;td&gt; cells

D. one rule for the tag, h2 { }

E. a &lt;header&gt; holding an &lt;h1&gt; and a &lt;nav&gt; with a list of links

F. a &lt;form&gt; whose labels have a for that matches each box's id

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The title and menu at the top` | |
| `A menu link that jumps down the page` | |
| `The winners in gold` | |
| `Results this term` | |
| `Join the club` | |
| `Every h2 in one colour` | |

:::


:::teacher-note

**Answer:** The title and menu at the top → E. a &lt;header&gt; holding an &lt;h1&gt; and a &lt;nav&gt; with a list of links; A menu link that jumps down the page → B. href="#results" matching id="results" on a section; The winners in gold → A. class="winner" on their rows, and one .winner rule; Results this term → C. a &lt;table&gt; of rows, with &lt;th&gt; and &lt;td&gt; cells; Join the club → F. a &lt;form&gt; whose labels have a for that matches each box's id; Every h2 in one colour → D. one rule for the tag, h2 { }

Each part is a lesson you have done. Build them in order: header and menu, then sections, then the form and footer.

:::


:::keep-together

### Pick some rows

**Two rows of the results table should be gold and the third should not. What does that?**

☐ A tr rule with background-color: gold;

☐ An id="winner" on both rows

☐ A different &lt;table&gt; for the winners

☐ class="winner" on those two rows, and a .winner rule

:::


:::teacher-note

**Answer:** class="winner" on those two rows, and a .winner rule

A tag rule such as tr colours every row. A class picks some rows, and one .winner rule colours all of them. An id may name only one element.

:::


:::typical

## Build the page


**Milestone 1: header and menu.** The page starts with a header and a menu. Colour it with three tag rules. Type these into the `<style>` block:

**Milestone 2: sections.** Follow the two comments inside `<main>`. Build:

- a section with `id="about"`: an `<h2>`, a paragraph, a list of three things to bring, and a picture with alt text;
- a section with `id="results"`: an `<h2>` and a table with a heading row and three players;
- the two winners marked with `class="winner"` and coloured by one `.winner` rule.

Menu links jump to a section when their `href` matches its `id`: click About and Results to check.

**Milestone 3: sign-up and footer.** Goals only this time:

- a section with `id="join"`: an `<h2>` and a form with at least two labelled fields (one a drop-down) and a button, every label linked to its box;
- a footer after `</main>` with contact details;
- a `footer { }` rule to colour it.

**Test the page.** Click every menu link and every label. A link that does not jump has an `href` that does not match an `id`. A label that does not find its box has a `for` that does not match its `id`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Milestone 1: header and menu:**

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

**Milestone 2: sections:**

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

**Milestone 3: sign-up and footer:**

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

:::

:::


## Make it yours

Turn the page into one for a club or event you care about: a new name, your own words, your own colours, and a picture with alt text that fits. Add a rule or two of your own, such as a `font-family` for the headings. Then click every link and every label again.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
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

:::


## Exit ticket

:::keep-together

**Name three parts of your page and the tag, attribute or rule behind each.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: the menu is a nav list of links, and each href matches a section's id; the gold winners are rows with class winner and a .winner rule; the sign-up labels work because each for matches a box's id.

:::

