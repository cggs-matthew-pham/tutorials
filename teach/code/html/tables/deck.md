---
marp: true
theme: default
html: true
---

# Tables

HTML & CSS · Structure

<!-- Speaker note: Students build tables row by row with <table>, <tr>, <th> and <td>, and learn that every row needs the same number of cells. About 50 minutes (Predict and Run 10 min · Investigate 15 min · Modify 10 min · Make 10 min · Canteen 5 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put data in rows and columns with table, row and cell tags, and keep every row the same length.

- I can build a table from rows (&lt;tr&gt;) of cells (&lt;th&gt; and &lt;td&gt;).
- I can add a row and a column to a table.
- I can explain why every row needs the same number of cells.
- I can say when a table is the right choice (data in rows and columns).

<!-- Speaker note: Before class: Do the Make task yourself (about 5 minutes). A table is built **row by row**: `<tr>` is a table row, `<th>` a heading cell and `<td>` an ordinary cell ("table data"). Columns are not written anywhere: they appear because every row has its cells in the same order. Tables are for data. Old websites used them for page layout; today that is done with CSS (Flexbox, in Unit 3). Teacher: The short row: a row with a missing cell. The browser shows it without complaint, so careful reading (or Boxes) is how you find it. Teacher: Canteen: the same short-row fault in a real page, plus turning the first row into headings. -->

---

## Why it matters

> Timetables, sports results, price lists and school reports are tables: data in rows and columns.

<!-- Speaker note: Some information is a grid: rows going down, columns going across. HTML builds it one row at a time. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<h2>House points</h2>
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
  </tr>
  <tr>
    <td>Owls</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Hawks</td>
    <td>9</td>
  </tr>
</table>
```

**Will the table have lines around its cells?**

- Yes, a grid of lines like a spreadsheet
- Only a line around the outside
- No lines: just the words lined up in columns
- A line under the heading row only

<!-- Speaker note: What happens: No lines. A table lines the words up in rows and columns; lines and colours come later, with CSS. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect grid lines like a spreadsheet. A plain table has none; lines and colours come with CSS in the next unit. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 21px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch2%3EHouse+points%3C%2Fh2%3E%0A%3Ctable%3E%0A++%3Ctr%3E%0A++++%3Cth%3EHouse%3C%2Fth%3E%0A++++%3Cth%3EPoints%3C%2Fth%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EOwls%3C%2Ftd%3E%0A++++%3Ctd%3E12%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EHawks%3C%2Ftd%3E%0A++++%3Ctd%3E9%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/tables/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. Then click **Boxes** to see each row and cell. Turn it off again when you are done. Students should be able to say: I can say which tag makes a row and which makes a cell. -->

<!-- Speaker note: Teacher: switch on **Boxes** to see each row and cell as a box. It makes "rows hold cells" visible. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* No lines. A table lines the words up in rows and columns; lines and colours come later, with CSS.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
<h2>House points</h2>
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
  </tr>
  <tr>
    <td>Owls</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Hawks</td>
    <td>9</td>
  </tr>
</table>
```

<!-- Speaker note: What this step is for: Rows hold cells, so the cell count is rows times columns, and a short row breaks the grid. -->

<!-- Speaker note: Teacher: the count task (2 rows × 2 cells) prepares for adding a column, where every row needs one more cell. -->

<style scoped>pre, marp-pre { font-size: 0.68em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the tags

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h2>House points</h2>
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
  </tr>
  <tr>
    <td>Owls</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Hawks</td>
    <td>9</td>
  </tr>
</table>
```

</div>
<div>

**Match each tag with its job.**

| | |
|---|---|
| `<table>` | A. one row (table row) |
| `<tr>` | B. an ordinary cell (table data) |
| `<th>` | C. a heading cell |
| `<td>` | D. the whole table |

* Answer: &lt;table&gt; → D. the whole table; &lt;tr&gt; → A. one row (table row); &lt;th&gt; → C. a heading cell; &lt;td&gt; → B. an ordinary cell (table data)

</div>
</div>

<!-- Speaker note: A table holds rows, and each row holds cells. Heading cells use <th>, and the browser shows them bold. -->

<style scoped>section { font-size: 19px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Count the cells

<div class="side" style="display:grid;grid-template-columns:1fr 1fr;gap:1em">
<div>

```html
<h2>House points</h2>
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
  </tr>
  <tr>
    <td>Owls</td>
    <td>12</td>
  </tr>
  <tr>
    <td>Hawks</td>
    <td>9</td>
  </tr>
</table>
```

</div>
<div>

**This table has a heading row and two houses. How many &lt;td&gt; cells does it have?**

* Answer: 4

</div>
</div>

<!-- Speaker note: Two rows of data, each with two cells: 2 × 2 = 4. The heading row uses <th>, not <td>. -->

<style scoped>section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Build a row

**Put the lines in order to make one row for the Kestrels with 7 points. One line is not needed.**

```html
</tr>
  <td>Kestrels</td>
<tr>
  <td>7</td>
</table>
```

<!-- Speaker note: <tr> opens the row, the two <td> cells sit inside it, and </tr> closes it. </table> would end the whole table. Correct order: <tr> <td>Kestrels</td> <td>7</td> </tr> -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The short row

**The Hawks have no points, and their row is shorter than the others. Click the line that causes it.**

```
 1  <table>
 2    <tr><th>House</th><th>Points</th></tr>
 3    <tr><td>Owls</td><td>12</td></tr>
 4    <tr><td>Hawks</td></tr>
 5    <tr><td>Kestrels</td><td>7</td></tr>
 6  </table>
```

* Answer: line 4

<!-- Speaker note: Line 4 has only one cell. Every row needs a cell for each column, so the Hawks row needs <td>9</td> after the name. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What goes in a cell?

A cell can hold more than words: a link, a picture, an important word.

```html
<tr>
  <td><a href="https://example.com/owls">Owls</a></td>
  <td><strong>12</strong></td>
  <td><img src="trophy.svg" alt="Trophy" width="40"></td>
</tr>
```

**What can go inside a &lt;td&gt; cell?**

- Only plain text
- Only numbers
- Only another &lt;tr&gt;
- Text, and other tags too: links, pictures, strong words

* Answer: Text, and other tags too: links, pictures, strong words

<!-- Speaker note: A cell is a box like any other. Put a link, a picture or a <strong> word inside it, and close it before the </td>. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add a row:** Add the Kestrels, with 7 points.
- **Add a column:** Add a `Wins` column: the Owls have 4, the Hawks 3 and the Kestrels 2.
- **Link a house:** Make `Owls` a link to `https://example.com/owls`, inside its cell.

<!-- Speaker note: What this step is for: Adding a row, then a column (a heading cell plus one cell in every row). Hints, in order: Copy a whole row, from `<tr>` to `</tr>`, then change the words. / A new column needs a heading cell in the first row. / Then every other row needs one more `<td>`. / The link goes inside the cell: `<td>`, then `<a href="...">`, then the name. / Close `</a>` before `</td>`. For students who need more support: Give students the Modify starter and ask them only to copy the Hawks row and change it to the Kestrels. For early finishers: Add a caption with <caption>House points</caption> just after <table>, and a totals row at the bottom. The hard part, on purpose: Building a table row by row with the same number of cells in each. Have them count the cells per row before they look at the page. When students get stuck: One row is shorter than the others, or a value sits in the wrong column. Ask: Does every row have the same number of cells, in the same order? Fix: Add the missing <td> so each row has a cell for every column. / Text appears above the table instead of inside it. Ask: Is that text inside a <td> or <th>? Fix: All text in a table goes inside cells; a title goes above the <table> in an <h2>. / The new column only has a heading. Ask: Which rows have a cell for the new column? Fix: Add one <td> to every data row, in the same position. -->

<!-- Speaker note: Teacher: adding a column is the hard part. It needs a `<th>` in the heading row and a `<td>` in every other row. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch2%3EHouse+points%3C%2Fh2%3E%0A%3Ctable%3E%0A++%3Ctr%3E%0A++++%3Cth%3EHouse%3C%2Fth%3E%0A++++%3Cth%3EPoints%3C%2Fth%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EOwls%3C%2Ftd%3E%0A++++%3Ctd%3E12%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EHawks%3C%2Ftd%3E%0A++++%3Ctd%3E9%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/tables/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a table of your own: a timetable for two days, your sports results, or a list of games with their ratings. Give it a heading row and at least two rows of data.

<!-- Speaker note: Hints, in order: Plan it first: what are the column headings? How many rows? / Build the heading row with `<th>`, then one row at a time with `<td>`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3C%21--+Your+table+goes+here.+Start+with+%3Ctable%3E%2C+then+one+%3Ctr%3E+for+each+row.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/tables/?full=step-5#step-5)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Fix the canteen price list

This price list has two problems. One item has no price (it is $4.50), and the first row should be headings, not ordinary cells. Fix both, then add `Banana bread` for $3.00.

<!-- Speaker note: What this step is for: A real table with a broken row and no heading cells, fixed and extended. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Fix the canteen price list

{{embed: https://tutorials.learningwaypoints.com/_playground-html/index.html?code=%3Ch1%3ECanteen+prices%3C%2Fh1%3E%0A%3Ctable%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EItem%3C%2Ftd%3E%0A++++%3Ctd%3EPrice%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EApple%3C%2Ftd%3E%0A++++%3Ctd%3E%241.00%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3ESandwich%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EWater%3C%2Ftd%3E%0A++++%3Ctd%3E%242.00%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://tutorials.learningwaypoints.com/code/html/tables/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A table has 3 columns and 4 rows of data under the heading row. How many &lt;td&gt; cells does it need, and why?**

* 12 cells: every one of the 4 rows needs a cell for each of the 3 columns (4 × 3).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next unit is Style: CSS adds borders, colours and spacing, so this table will get its grid lines. Tables also lead to data work: the same rows and columns are a spreadsheet, a CSV file, and later a list of lists in Python. Class idea: collect class data (favourite sport, pets) and publish it as a table. -->
