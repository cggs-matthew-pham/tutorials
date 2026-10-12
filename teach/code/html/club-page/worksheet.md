---
title: "Final challenge: a club page"
subtitle: "HTML & CSS · Final challenge: a club page · Lesson 10"
---

# Final challenge: a club page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** This is how real websites are built: a header, a hero, cards, a table and a form, each one a part you already know how to make.


:::teacher-note

**In one sentence:** Students build a whole club page (header and menu, hero, cards, results table, sign-up form, footer) from every component in the course, in three milestones with fading support, then make it their own.

**Students should be able to say:** I can plan a page as a list of components. I can build a header with a Flexbox menu, a hero, and a row of cards. I can add a table, a form with linked labels and a footer to a page. I can make a page my own and check every part works.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Plan the page

This is the page you will build. The picture shows it finished.

```html
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
  }
  .hero {
    padding: 32px;
    background-color: lightyellow;
    text-align: center;
  }
  .cards {
    display: flex;
    gap: 16px;
  }
  .card {
    width: 160px;
    padding: 12px;
    border: 2px solid teal;
  }
  th, td {
    padding: 6px 12px;
    border: 1px solid gray;
  }
  .signup {
    width: 260px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
  footer {
    padding: 12px;
    background-color: lightblue;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul class="menu">
      <li><a href="#groups">Groups</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Think ahead</h2>
    <p>Chess every Wednesday at lunch in the library. All levels welcome.</p>
    <a href="#join">Join us</a>
  </section>
  <section class="cards" id="groups">
    <div class="card">
      <img src="star.svg" alt="A star" width="50">
      <h2>Beginners</h2>
      <p>Learn the moves.</p>
    </div>
    <div class="card">
      <img src="medal.svg" alt="A medal" width="50">
      <h2>Players</h2>
      <p>Weekly games.</p>
    </div>
    <div class="card">
      <img src="trophy.svg" alt="A trophy" width="50">
      <h2>Champions</h2>
      <p>School tournaments.</p>
    </div>
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr>
        <th>Player</th>
        <th>Wins</th>
      </tr>
      <tr>
        <td>Ada</td>
        <td>5</td>
      </tr>
      <tr>
        <td>Sam</td>
        <td>4</td>
      </tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form class="signup">
      <label for="name">Name</label>
      <input id="name" type="text">
      <label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select>
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

A. cards: boxes with padding and a border, in a Flexbox row

B. a hero: a &lt;section&gt; with padding, a background and centred text

C. a &lt;table&gt; of rows and cells

D. a &lt;footer&gt;

E. a &lt;header&gt; with a &lt;nav&gt; list made into a Flexbox row

F. a &lt;form&gt; with labels linked to their boxes

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `The title and menu at the top` | |
| `The big welcome` | |
| `Three groups side by side` | |
| `Results this term` | |
| `Join the club` | |
| `Contact details` | |

:::


:::teacher-note

**Answer:** The title and menu at the top → E. a &lt;header&gt; with a &lt;nav&gt; list made into a Flexbox row; The big welcome → B. a hero: a &lt;section&gt; with padding, a background and centred text; Three groups side by side → A. cards: boxes with padding and a border, in a Flexbox row; Results this term → C. a &lt;table&gt; of rows and cells; Join the club → F. a &lt;form&gt; with labels linked to their boxes; Contact details → D. a &lt;footer&gt;

Six parts, six lessons. Build them in order: header and menu, then the hero and cards, then the table, form and footer.

:::


:::keep-together

### The row of cards

**Which rule makes the three cards sit side by side?**

☐ section { display: flex; }

☐ .hero { text-align: center; }

☐ .card { display: flex; }

☐ .cards { display: flex; }

:::


:::teacher-note

**Answer:** .cards { display: flex; }

Flexbox goes on the box that holds the cards. Putting it on each card, or on every section, would not give one row of cards.

:::


:::typical

## Build the page


**Milestone 1: header and menu.** The page starts with a header, a menu and an empty `<main>`. Style the header with a background colour and padding, and turn the menu into a row: `display: flex;`, a gap, no bullets (`list-style: none;`) and `padding: 0;`.

**Milestone 2: hero and cards.** Follow the first comment inside `<main>`. Build a hero section with a heading, a line of text and a link to `#join`. Then a section of three cards in a row, each with a picture, a heading and a line of text. Style the hero, the row and the cards.

**Milestone 3: results, sign-up and footer.** Goals only this time:

- a results section (`id="results"`) with a heading and a table: a heading row and at least two rows of data;
- a sign-up section (`id="join"`) with a form: at least two labelled fields (one a drop-down) and a button, every label linked;
- a footer after `</main>` with contact details;
- style the table cells, the form as a card, and the footer.

The menu links jump to these sections, because their `href` matches each section's `id`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Milestone 1: header and menu:**

```html
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul class="menu">
      <li><a href="#groups">Groups</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <!-- Milestone 2: a hero section, then three cards in a row (id="groups"). -->
  <!-- Milestone 3: a results table (id="results"), a sign-up form (id="join"), and a footer after main. -->
</main>
```

**Milestone 2: hero and cards:**

```html
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
  }
  .hero {
    padding: 32px;
    background-color: lightyellow;
    text-align: center;
  }
  .cards {
    display: flex;
    gap: 16px;
  }
  .card {
    width: 160px;
    padding: 12px;
    border: 2px solid teal;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul class="menu">
      <li><a href="#groups">Groups</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Think ahead</h2>
    <p>Chess every Wednesday at lunch in the library. All levels welcome.</p>
    <a href="#join">Join us</a>
  </section>
  <section class="cards" id="groups">
    <div class="card">
      <img src="star.svg" alt="A star" width="50">
      <h2>Beginners</h2>
      <p>Learn the moves.</p>
    </div>
    <div class="card">
      <img src="medal.svg" alt="A medal" width="50">
      <h2>Players</h2>
      <p>Weekly games.</p>
    </div>
    <div class="card">
      <img src="trophy.svg" alt="A trophy" width="50">
      <h2>Champions</h2>
      <p>School tournaments.</p>
    </div>
  </section>
  <!-- Milestone 3: a results table (id="results"), a sign-up form (id="join"), and a footer after main. -->
</main>
```

**Milestone 3: results, sign-up and footer:**

```html
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
  }
  .hero {
    padding: 32px;
    background-color: lightyellow;
    text-align: center;
  }
  .cards {
    display: flex;
    gap: 16px;
  }
  .card {
    width: 160px;
    padding: 12px;
    border: 2px solid teal;
  }
  th, td {
    padding: 6px 12px;
    border: 1px solid gray;
  }
  .signup {
    width: 260px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
  footer {
    padding: 12px;
    background-color: lightblue;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul class="menu">
      <li><a href="#groups">Groups</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Think ahead</h2>
    <p>Chess every Wednesday at lunch in the library. All levels welcome.</p>
    <a href="#join">Join us</a>
  </section>
  <section class="cards" id="groups">
    <div class="card">
      <img src="star.svg" alt="A star" width="50">
      <h2>Beginners</h2>
      <p>Learn the moves.</p>
    </div>
    <div class="card">
      <img src="medal.svg" alt="A medal" width="50">
      <h2>Players</h2>
      <p>Weekly games.</p>
    </div>
    <div class="card">
      <img src="trophy.svg" alt="A trophy" width="50">
      <h2>Champions</h2>
      <p>School tournaments.</p>
    </div>
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr>
        <th>Player</th>
        <th>Wins</th>
      </tr>
      <tr>
        <td>Ada</td>
        <td>5</td>
      </tr>
      <tr>
        <td>Sam</td>
        <td>4</td>
      </tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form class="signup">
      <label for="name">Name</label>
      <input id="name" type="text">
      <label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select>
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

Turn the page into one for a club or event you care about: a new name, your own words, your own colours, and at least one picture in the header or the hero. Check it with **Boxes** and **Box model**, and click every label and every menu link.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  header {
    background-color: lightblue;
    padding: 12px;
  }
  .menu {
    display: flex;
    gap: 24px;
    list-style: none;
    padding: 0;
  }
  .hero {
    padding: 32px;
    background-color: lavender;
    text-align: center;
  }
  .cards {
    display: flex;
    gap: 16px;
  }
  .card {
    width: 160px;
    padding: 12px;
    border: 2px solid teal;
  }
  th, td {
    padding: 6px 12px;
    border: 1px solid gray;
  }
  .signup {
    width: 260px;
    padding: 16px;
    border: 2px solid teal;
  }
  label {
    display: block;
    margin-top: 8px;
  }
  footer {
    padding: 12px;
    background-color: lightblue;
  }
</style>
<header>
  <img src="music.svg" alt="Music notes" width="60">
  <h1>Choir club</h1>
  <nav>
    <ul class="menu">
      <li><a href="#groups">Groups</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Sing with us</h2>
    <p>Every Thursday at lunch in the music room. No experience needed.</p>
    <a href="#join">Join us</a>
  </section>
  <section class="cards" id="groups">
    <div class="card">
      <img src="star.svg" alt="A star" width="50">
      <h2>Beginners</h2>
      <p>Learn the moves.</p>
    </div>
    <div class="card">
      <img src="medal.svg" alt="A medal" width="50">
      <h2>Players</h2>
      <p>Weekly games.</p>
    </div>
    <div class="card">
      <img src="trophy.svg" alt="A trophy" width="50">
      <h2>Champions</h2>
      <p>School tournaments.</p>
    </div>
  </section>
  <section id="results">
    <h2>Results this term</h2>
    <table>
      <tr>
        <th>Player</th>
        <th>Wins</th>
      </tr>
      <tr>
        <td>Ada</td>
        <td>5</td>
      </tr>
      <tr>
        <td>Sam</td>
        <td>4</td>
      </tr>
    </table>
  </section>
  <section id="join">
    <h2>Join the club</h2>
    <form class="signup">
      <label for="name">Name</label>
      <input id="name" type="text">
      <label for="group">Group</label>
      <select id="group">
        <option>Beginners</option>
        <option>Players</option>
        <option>Champions</option>
      </select>
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

**Name three parts of your page and the tag or CSS rule that makes each one.**

{{lines-3}}

:::


:::teacher-note

**Answer:** For example: the menu row is a nav list with display flex on .menu; the cards are divs with padding and a border inside .cards with display flex; the sign-up is a form with labels linked by for and id.

:::

