---
marp: true
theme: default
html: true
---

# Page layout with Grid

HTML & CSS · Final challenge: a club page

<!-- Speaker note: An optional lesson. Students use CSS Grid to lay out a page in columns (a menu and the main content) and a gallery in rows and columns, and choose between Grid and Flexbox. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Gallery 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** arrange a page and a gallery in rows and columns with CSS Grid, and choose between Grid and Flexbox.

- I can lay out a page in columns with display grid and grid-template-columns.
- I can explain what 1fr means: one share of the space left over.
- I can make a gallery whose rows line up, with repeat and gap.
- I can choose between Grid and Flexbox for a layout.

<!-- Speaker note: Before class: This lesson is **optional**. It builds on Flexbox (lesson 7): Grid also goes on the **parent**, but it lines items up in columns **and** rows. Only three ideas are new: `display: grid;`, `grid-template-columns` (a list of widths, such as `150px 1fr`) and `repeat(3, 1fr)` for equal columns. `gap` is the same as in Flexbox. `fr` means one share of the space that is left after fixed widths. `1fr 2fr` gives the second column twice the first. Items fill the columns in order and start a new row when a row is full. Do the Make task yourself first. Teacher: Columns that will not form: the same mistake as Flexbox on the items. Grid goes on the box that holds them. Teacher: Grid or Flexbox: one direction (a menu) is Flexbox; columns and rows that line up (a page, a gallery) is Grid. Many pages use both. Teacher: Gallery: compare with a Flexbox gallery that wraps; with Grid every row lines up, even the last one. -->

---

## Why it matters

> News sites, shops and photo galleries line everything up in columns and rows: that is CSS Grid.

<!-- Speaker note: Flexbox lines items up in one row. **Grid** lines them up in **columns and rows** at once, which suits whole page layouts and galleries. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

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

**Where does the main content go?**

- To the right of the menu, filling the rest of the width
- Side by side, both 150 pixels wide
- On top of the menu
- Under the menu, as before

<!-- Speaker note: What happens: To the right of the menu, filling the rest of the width. The first column is 150px; 1fr means one share of the space left over. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: many students expect main to stay under the menu. Run, then try 250px, 1fr 1fr and 1fr 2fr. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.page+%7B%0A++++display%3A+grid%3B%0A++++grid-template-columns%3A+150px+1fr%3B%0A++++gap%3A+16px%3B%0A++%7D%0A++nav+%7B%0A++++background-color%3A+lightblue%3B%0A++%7D%0A++main+%7B%0A++++background-color%3A+lightyellow%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22page%22%3E%0A++%3Cnav%3EMenu%3C%2Fnav%3E%0A++%3Cmain%3EThe+main+content+of+the+page.%3C%2Fmain%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/grid/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction. Change `150px` to `250px`. Then try `1fr 1fr` (two equal columns) and `1fr 2fr` (the second twice as wide). Students should be able to say: I can say what 150px 1fr means. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* To the right of the menu, filling the rest of the width. The first column is 150px; 1fr means one share of the space left over.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

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

<!-- Speaker note: What this step is for: Grid goes on the parent like Flexbox; its columns are listed, and items fill them in order, row after row. -->

<!-- Speaker note: Teacher: count rows on the board for 7 pictures in 3 columns (3 + 3 + 1). -->

<style scoped>pre, marp-pre { font-size: 0.6em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the parts

**Match each part with what it does.**

| | |
|---|---|
| `display: grid` | A. one share of the space left over |
| `grid-template-columns: 150px 1fr` | B. two columns: 150 pixels, then the rest |
| `1fr` | C. space between the columns and rows |
| `repeat(3, 1fr)` | D. three equal columns |
| `gap: 16px` | E. arranges the box's children in columns and rows |

* Answer: display: grid → E. arranges the box's children in columns and rows; grid-template-columns: 150px 1fr → B. two columns: 150 pixels, then the rest; 1fr → A. one share of the space left over; repeat(3, 1fr) → D. three equal columns; gap: 16px → C. space between the columns and rows

<!-- Speaker note: Grid goes on the box that holds the items. The items fill the columns in order, starting a new row when a row is full. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the rows

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

* Answer: 3

<!-- Speaker note: Three per row: 3 + 3 + 1. The seventh picture starts a third row, in the first column. -->

<style scoped>pre, marp-pre { font-size: 0.52em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Columns that will not form

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

* Answer: line 2

<!-- Speaker note: Line 2 gives the grid to the nav and the main themselves. Grid, like Flexbox, goes on the box that holds them: .page { display: grid; ... }. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Grid or Flexbox?

**When is Grid a better choice than Flexbox?**

- When items must line up in columns and rows, such as a page layout or a gallery
- For a single row, such as a menu
- Never: they do the same thing
- Only for tables

* Answer: When items must line up in columns and rows, such as a page layout or a gallery

<!-- Speaker note: Flexbox is for one direction (a menu, a toolbar). Grid is for two (rows and columns that line up). Many pages use both: Grid for the page, Flexbox inside each part. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 27px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Two columns:** Put the menu on the left (`160px`) and the main content on the right.
- **Some space:** Put a gap between the two columns.
- **Cards in three columns:** Lay the six cards out in three equal columns, with a gap.

<!-- Speaker note: What this step is for: Laying out a real page with Grid: two columns for the page, then three for the cards. Hints, in order: Grid goes on the parent too. Which box holds the nav and the main? / The `.page` box holds the nav and the main: give it `display: grid;`. / Then `grid-template-columns: 160px 1fr;` / `gap: 16px;` in the `.page` rule. / The cards' parent becomes the grid, and the columns rule says how many columns and how wide. / A `.cards` rule: `display: grid;`, `grid-template-columns: repeat(3, 1fr);` and a gap. For students who need more support: Do the first Modify task together. Keep the hint open for the cards: it is the same as the page rule with repeat(3, 1fr). For early finishers: Make one card span two columns with grid-column: span 2; or change the gallery to repeat(auto-fill, minmax(120px, 1fr)) so the number of columns follows the width. The hard part, on purpose: Reading grid-template-columns and what 1fr means. Ask them to predict each column's width before looking, then check with the page. When students get stuck: The menu and the main content still stack. Ask: Which rule has display grid? Is it on the box that holds them? Fix: Put display grid and grid-template-columns in the .page rule, not on nav or main. / Everything is in one column even with display grid. Ask: Did you list the columns with grid-template-columns? Fix: Add grid-template-columns, for example 160px 1fr or repeat(3, 1fr). / The columns are the wrong widths. Ask: How many widths are listed, and which ones are fixed? Fix: List one width per column; use fr for columns that share the space left over. -->

<!-- Speaker note: Teacher: the page first, then the cards inside main: a grid inside a grid. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++nav+%7B%0A++++background-color%3A+lightblue%3B%0A++++padding%3A+8px%3B%0A++%7D%0A++.card+%7B%0A++++padding%3A+12px%3B%0A++++border%3A+2px+solid+teal%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cheader%3E%0A++%3Ch1%3EChess+club%3C%2Fh1%3E%0A%3C%2Fheader%3E%0A%3Cdiv+class%3D%22page%22%3E%0A++%3Cnav%3E%0A++++%3Cp%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fhome%22%3EHome%3C%2Fa%3E%3C%2Fp%3E%0A++++%3Cp%3E%3Ca+href%3D%22https%3A%2F%2Fexample.com%2Fjoin%22%3EJoin%3C%2Fa%3E%3C%2Fp%3E%0A++%3C%2Fnav%3E%0A++%3Cmain%3E%0A++++%3Ch2%3EGroups%3C%2Fh2%3E%0A++++%3Cdiv+class%3D%22cards%22%3E%0A++++%3Cdiv+class%3D%22card%22%3EBeginners%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EPlayers%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EChampions%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3ECoaches%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EParents%3C%2Fdiv%3E%0A++++%3Cdiv+class%3D%22card%22%3EVisitors%3C%2Fdiv%3E%0A++++%3C%2Fdiv%3E%0A++%3C%2Fmain%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/grid/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a page for an event with two columns: the main information, and a side box (tickets, times or a map). Choose the column widths: a fixed width and `1fr`, or two shares such as `2fr 1fr`.

<!-- Speaker note: Hints, in order: Plan the parts first: one parent box holding two or more parts, then a rule that makes the parent a grid. / A `<div class="page">` holding two parts, such as a `<main>` and a side box. / A `.page` rule with `display: grid;`, `grid-template-columns` and a `gap`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Your+page+layout%3A+a+.page+box+holding+a+menu+and+the+main+content%2C+laid+out+with+display%3A+grid.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/grid/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Lay out the photo gallery

These six photos stack one under another. Lay them out in three equal columns with a gap, `420px` wide, so every row lines up.

<!-- Speaker note: What this step is for: A real gallery where every row lines up: the job Grid does better than Flexbox. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Lay out the photo gallery

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Cstyle%3E%0A++.photo+%7B%0A++++padding%3A+8px%3B%0A++++border%3A+1px+solid+gray%3B%0A++++text-align%3A+center%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Ch1%3EOur+year+in+pictures%3C%2Fh1%3E%0A%3Cdiv+class%3D%22photos%22%3E%0A++%3Cdiv+class%3D%22photo%22%3E%3Cimg+src%3D%22ball.svg%22+alt%3D%22Soccer+final%22+width%3D%2270%22%3E%3Cp%3ESoccer+final%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22photo%22%3E%3Cimg+src%3D%22music.svg%22+alt%3D%22Music+night%22+width%3D%2270%22%3E%3Cp%3EMusic+night%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22photo%22%3E%3Cimg+src%3D%22book.svg%22+alt%3D%22Book+week%22+width%3D%2270%22%3E%3Cp%3EBook+week%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22photo%22%3E%3Cimg+src%3D%22star.svg%22+alt%3D%22Awards%22+width%3D%2270%22%3E%3Cp%3EAwards%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22photo%22%3E%3Cimg+src%3D%22trophy.svg%22+alt%3D%22Trophy+day%22+width%3D%2270%22%3E%3Cp%3ETrophy+day%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22photo%22%3E%3Cimg+src%3D%22medal.svg%22+alt%3D%22Sports+day%22+width%3D%2270%22%3E%3Cp%3ESports+day%3C%2Fp%3E%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/grid/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**Write the rule for a gallery box with four equal columns and a gap, and say why it goes on the gallery, not on each picture.**

* .gallery { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; } It goes on the box that holds the pictures, because Grid arranges that box's children.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Back in the club page, students can use Grid for the cards or the whole page. The DOM course and later web projects use both Grid (for page layout) and Flexbox (inside each part). -->
