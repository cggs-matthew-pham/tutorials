---
title: "Page layout with Grid"
subtitle: "HTML & CSS · Final challenge: a club page · Lesson 12"
---

# Page layout with Grid

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** News sites, shops and photo galleries line everything up in columns and rows: that is CSS Grid.


:::teacher-note

**In one sentence:** An optional lesson. Students use CSS Grid to lay out a page in columns (a menu and the main content) and a gallery in rows and columns, and choose between Grid and Flexbox.

**Students should be able to say:** I can lay out a page in columns with display grid and grid-template-columns. I can explain what 1fr means: one share of the space left over. I can make a gallery whose rows line up, with repeat and gap. I can choose between Grid and Flexbox for a layout.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`display: grid` and `grid-template-columns` are new. Read the code. Where does the main content go?

```html
<style>
  .page {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 16px;
  }
  nav {
    background-color: lightblue;
  }
  main {
    background-color: lightyellow;
  }
</style>
<div class="page">
  <nav>Menu</nav>
  <main>The main content of the page.</main>
</div>
```

:::keep-together

**Where does the main content go?**

☐ To the right of the menu, filling the rest of the width

☐ Side by side, both 150 pixels wide

☐ On top of the menu

☐ Under the menu, as before

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** To the right of the menu, filling the rest of the width. The first column is 150px; 1fr means one share of the space left over.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  .page {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 16px;
  }
  nav {
    background-color: lightblue;
  }
  main {
    background-color: lightyellow;
  }
</style>
<div class="page">
  <nav>Menu</nav>
  <main>The main content of the page.</main>
</div>
```

:::keep-together

### Match the parts

**Match each part with what it does.**

A. one share of the space left over

B. two columns: 150 pixels, then the rest

C. space between the columns and rows

D. three equal columns

E. arranges the box's children in columns and rows

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `display: grid` | |
| `grid-template-columns: 150px 1fr` | |
| `1fr` | |
| `repeat(3, 1fr)` | |
| `gap: 16px` | |

:::


:::teacher-note

**Answer:** display: grid → E. arranges the box's children in columns and rows; grid-template-columns: 150px 1fr → B. two columns: 150 pixels, then the rest; 1fr → A. one share of the space left over; repeat(3, 1fr) → D. three equal columns; gap: 16px → C. space between the columns and rows

Grid goes on the box that holds the items. The items fill the columns in order, starting a new row when a row is full.

:::


:::keep-together

### Count the rows

Seven pictures in three columns.

```html
<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    width: 240px;
  }
</style>
```

**This gallery has three columns and seven pictures. How many rows does it fill?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 3

Three per row: 3 + 3 + 1. The seventh picture starts a third row, in the first column.

:::


:::keep-together

### Columns that will not form

**The menu and the main content should be two columns, but they stack, with no error. Click the line that causes it.**

```
 1  <style>
 2    nav, main {
 3      display: grid;
 4      grid-template-columns: 150px 1fr;
 5    }
 6    nav {
 7      background-color: lightblue;
 8    }
 9    main {
10      background-color: lightyellow;
11    }
12  </style>
13  <div class="page">
14    <nav>Menu</nav>
15    <main>The main content of the page.</main>
16  </div>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2 gives the grid to the nav and the main themselves. Grid, like Flexbox, goes on the box that holds them: .page { display: grid; ... }.

:::


:::keep-together

### Grid or Flexbox?

**When is Grid a better choice than Flexbox?**

☐ When items must line up in columns and rows, such as a page layout or a gallery

☐ For a single row, such as a menu

☐ Never: they do the same thing

☐ Only for tables

:::


:::teacher-note

**Answer:** When items must line up in columns and rows, such as a page layout or a gallery

Flexbox is for one direction (a menu, a toolbar). Grid is for two (rows and columns that line up). Many pages use both: Grid for the page, Flexbox inside each part.

:::


:::typical

## Modify


**Two columns.** Put the menu on the left (`160px`) and the main content on the right.

**Some space.** Put a gap between the two columns.

**Cards in three columns.** Lay the six cards out in three equal columns, with a gap.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Two columns:**

```html
<style>
  nav {
    background-color: lightblue;
    padding: 8px;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
  .page {
    display: grid;
    grid-template-columns: 160px 1fr;
  }
</style>
<header>
  <h1>Chess club</h1>
</header>
<div class="page">
  <nav>
    <p><a href="https://example.com/home">Home</a></p>
    <p><a href="https://example.com/join">Join</a></p>
  </nav>
  <main>
    <h2>Groups</h2>
    <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
    <div class="card">Coaches</div>
    <div class="card">Parents</div>
    <div class="card">Visitors</div>
    </div>
  </main>
</div>
```

**Some space:**

```html
<style>
  nav {
    background-color: lightblue;
    padding: 8px;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
  .page {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 16px;
  }
</style>
<header>
  <h1>Chess club</h1>
</header>
<div class="page">
  <nav>
    <p><a href="https://example.com/home">Home</a></p>
    <p><a href="https://example.com/join">Join</a></p>
  </nav>
  <main>
    <h2>Groups</h2>
    <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
    <div class="card">Coaches</div>
    <div class="card">Parents</div>
    <div class="card">Visitors</div>
    </div>
  </main>
</div>
```

**Cards in three columns:**

```html
<style>
  nav {
    background-color: lightblue;
    padding: 8px;
  }
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
  .page {
    display: grid;
    grid-template-columns: 160px 1fr;
    gap: 16px;
  }
  .cards {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }
</style>
<header>
  <h1>Chess club</h1>
</header>
<div class="page">
  <nav>
    <p><a href="https://example.com/home">Home</a></p>
    <p><a href="https://example.com/join">Join</a></p>
  </nav>
  <main>
    <h2>Groups</h2>
    <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
    <div class="card">Coaches</div>
    <div class="card">Parents</div>
    <div class="card">Visitors</div>
    </div>
  </main>
</div>
```

:::

:::


## Make

Make a page for an event with two columns: the main information, and a side box (tickets, times or a map). Choose the column widths: a fixed width and `1fr`, or two shares such as `2fr 1fr`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .page {
    display: grid;
    grid-template-columns: 1fr 200px;
    gap: 20px;
  }
  main {
    background-color: lavender;
    padding: 12px;
  }
  .side {
    background-color: lightyellow;
    padding: 12px;
  }
</style>
<div class="page">
  <main>
    <h1>Music night</h1>
    <p>Friday at 7 pm in the hall. Bands, choirs and solo acts.</p>
  </main>
  <div class="side">
    <h2>Tickets</h2>
    <p>Free, from the office.</p>
  </div>
</div>
```

:::


:::wider

## Lay out the photo gallery

These six photos stack one under another. Lay them out in three equal columns with a gap, `420px` wide, so every row lines up.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .photo {
    padding: 8px;
    border: 1px solid gray;
    text-align: center;
  }
  .photos {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
    width: 420px;
  }
</style>
<h1>Our year in pictures</h1>
<div class="photos">
  <div class="photo"><img src="ball.svg" alt="Soccer final" width="70"><p>Soccer final</p></div>
  <div class="photo"><img src="music.svg" alt="Music night" width="70"><p>Music night</p></div>
  <div class="photo"><img src="book.svg" alt="Book week" width="70"><p>Book week</p></div>
  <div class="photo"><img src="star.svg" alt="Awards" width="70"><p>Awards</p></div>
  <div class="photo"><img src="trophy.svg" alt="Trophy day" width="70"><p>Trophy day</p></div>
  <div class="photo"><img src="medal.svg" alt="Sports day" width="70"><p>Sports day</p></div>
</div>
```

:::

:::


## Exit ticket

:::keep-together

**Write the rule for a gallery box with four equal columns and a gap, and say why it goes on the gallery, not on each picture.**

{{lines-3}}

:::


:::teacher-note

**Answer:** .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; } It goes on the box that holds the pictures, because Grid arranges that box's children.

:::

