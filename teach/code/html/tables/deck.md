---
marp: true
theme: default
html: true
---

# Tables

Structure and style a page · Parts of a page

<!-- Speaker note: Students build tables one row at a time with table, tr, th and td, and learn that every row needs the same number of cells. About 45 minutes (Predict and Run 10 min · Investigate 12 min · Modify 8 min · Mix it up 4 min · Make 10 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** put data in a table by writing it one row at a time, with the same number of cells in every row.

- I can build a table from rows (&lt;tr&gt;) of cells (&lt;th&gt; and &lt;td&gt;).
- I can explain why a table is written a row at a time and every row needs the same number of cells.
- I can add a row and a column to a table.

<!-- Speaker note: Before class: Do the Make task yourself (about 5 minutes). A table is built **row by row**: `<tr>` is a table row, `<th>` a heading cell and `<td>` an ordinary cell ("table data"). Columns are not written anywhere: they appear because every row has its cells in the same order. Students who think in columns, or in spreadsheets, often write all of one column first. Tables are for data; the look (lines, colours) comes from rules, and page layout is a later course. Teacher: Mix it up: the row takes the class and the name's cell holds the link. Ask where each piece goes before they answer. -->

---

## Why it matters

> Timetables, sports results, price lists and school reports are tables: data in rows and columns.

<!-- Speaker note: Some information is a grid: rows going across, columns going down. HTML has no tag for a column. You write the table **one row at a time** and the columns appear. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
    <th>Wins</th>
  </tr>
  <tr>
    <td>Owls</td>
    <td>12</td>
    <td>4</td>
  </tr>
</table>
```

**How will the six words be arranged on the page?**

- 3 rows of 2 words, because each &lt;tr&gt; is a column
- 6 lines, one word on each
- 1 row of 6 words
- 2 rows of 3 words, lined up in columns

<!-- Speaker note: What happens: 2 rows of 3 words. Each &lt;tr&gt; is one row going across, and its three cells line up under the cells of the other row to make 3 columns. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: the tempting wrong answer is 3 rows of 2 words, reading each `<tr>` as a column. Run it with **Boxes** on to see each row as a box going across. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 23px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Rows or columns? <span style="font-size:.6em;color:#64748b">(3 min)</span>

Look at the code. Is the first `<tr>` a row going across or a column going down?
Point with your arm, then tell your partner why.

<!-- Speaker note: Most students point across when asked, then say 3 rows of 2 when asked what the page shows. Let them see the clash before running. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ctable%3E%0A++%3Ctr%3E%0A++++%3Cth%3EHouse%3C%2Fth%3E%0A++++%3Cth%3EPoints%3C%2Fth%3E%0A++++%3Cth%3EWins%3C%2Fth%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EOwls%3C%2Ftd%3E%0A++++%3Ctd%3E12%3C%2Ftd%3E%0A++++%3Ctd%3E4%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/tables/?full=step-2#step-2)

<!-- Speaker note: Compare the page with your prediction. **Boxes** is on, so each row and each cell shows as a box. Switch it off when you are done. | Code | What it does | Why | |---|---|---| | `<table> … </table>` | Holds the whole table | Everything in a table sits between these two tags | | `<tr> … </tr>` | Makes one row, going across | `tr` is "table row". You write the table a row at a time | | `<th>House</th>` | Makes a heading cell | `th` is "table heading". The browser makes it bold and centred | | `<td>Owls</td>` | Makes an ordinary cell | `td` is "table data". The tag says what it is; the look is the browser's | | three cells in each row | Make three columns | There is no column tag. A column is the cells in the same place in each row, so every row needs the same number of cells | | no lines around the cells | The table has no grid | The browser draws none. Colours and text styles come from rules, as for any other tag | Students should be able to say: I can say which tag makes a row and which makes a cell. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* 2 rows of 3 words. Each &lt;tr&gt; is one row going across, and its three cells line up under the cells of the other row to make 3 columns.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Build a row

**Put the lines in order to make one row for the Kestrels: 7 points and 2 wins. One line is not needed.**

```html
  <td>7</td>
  <td>2</td>
  <td>Kestrels</td>
</table>
</tr>
<tr>
```

<!-- Speaker note: <tr> opens the row, the three cells go inside it in the same order as the headings, and </tr> closes it. </table> would end the whole table. Correct order: <tr> <td>Kestrels</td> <td>7</td> <td>2</td> </tr> -->

<!-- Speaker note: Teacher: the row-building task and Sam's table are the same idea from two sides: the cells of one house belong in one `<tr>`. The short row is the quiet failure: the browser shows it without complaint, so count cells per row. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Sam's table

Sam wrote the table a column at a time.

```html
<table>
  <tr><td>Owls</td></tr>
  <tr><td>Hawks</td></tr>
  <tr><td>12</td></tr>
  <tr><td>9</td></tr>
</table>
```

**Sam wrote the names first, then the points, with one &lt;tr&gt; for each. Sam wanted two columns, House and Points. How many columns does the page have?**

- 1, because every &lt;tr&gt; holds one cell
- 2, because there are names and points
- It shows an error
- 4, because there are four &lt;tr&gt; tags

* Answer: 1, because every &lt;tr&gt; holds one cell

<!-- Speaker note: Every <tr> is a row with one cell, so the page has four rows and one column. To get House and Points side by side, each house needs its own <tr> with both cells in it. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 20px; }</style>

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

<!-- Speaker note: Line 4 has only one cell. Every row needs a cell for each column, so the Hawks row needs <td>9</td> after the name. The browser shows the short row without any error. -->

<style scoped>pre, marp-pre { font-size: 0.85em; line-height: 1.25; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Add a row:** Add the Kestrels, with 7 points.
- **Add a column:** Add a `Wins` column: the Owls have 4, the Hawks 3 and the Kestrels 2.

<!-- Speaker note: What this step is for: Adding a row is one new <tr>; adding a column touches every row. Hints, in order: Copy a whole row, from `<tr>` to `</tr>`, then change the words. / A new column needs a heading cell in the first row. / Then every other row needs one more `<td>`. For students who need more support: Give students the Modify starter and ask them only to copy the Hawks row and change it to the Kestrels. For early finishers: Add a caption with <caption>House points</caption> just after <table>, and a totals row at the bottom. Style the heading cells with a th rule. The hard part, on purpose: Building a table row by row with the same number of cells in each. Have them count the cells per row before they look at the page. When students get stuck: One row is shorter than the others, or a value sits in the wrong column. Ask: Does every row have the same number of cells, in the same order? Fix: Add the missing <td> so each row has a cell for every column. / Text appears above the table instead of inside it. Ask: Is that text inside a <td> or <th>? Fix: All text in a table goes inside cells; a title goes above the <table> in an <h2>. / The new column only has a heading. Ask: Which rows have a cell for the new column? Fix: Add one <td> to every data row, in the same position. -->

<!-- Speaker note: Teacher: adding a column is the hard part. It needs a `<th>` in the heading row and a `<td>` in every other row. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Ch2%3EHouse+points%3C%2Fh2%3E%0A%3Ctable%3E%0A++%3Ctr%3E%0A++++%3Cth%3EHouse%3C%2Fth%3E%0A++++%3Cth%3EPoints%3C%2Fth%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EOwls%3C%2Ftd%3E%0A++++%3Ctd%3E12%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A++%3Ctr%3E%0A++++%3Ctd%3EHawks%3C%2Ftd%3E%0A++++%3Ctd%3E9%3C%2Ftd%3E%0A++%3C%2Ftr%3E%0A%3C%2Ftable%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/tables/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
<style>
  th {
    background-color: navy;
    color: white;
  }
  .winner {
    background-color: gold;
  }
</style>
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
  </tr>
  <tr class="winner">
    <td><a href="https://example.com/owls">Owls</a></td>
    <td>12</td>
  </tr>
  <tr>
    <td>Hawks</td>
    <td>9</td>
  </tr>
</table>
```

<!-- Speaker note: The Owls row is already gold and linked. What this step is for: A row can carry a class and hold a link: one cell to read, one row to colour. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The Hawks win next week. Which row gives them the gold row and makes their name a link to https://example.com/hawks?**

- &lt;tr class="winner"&gt;&lt;td&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;
- &lt;tr class=".winner"&gt;&lt;td&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;
- &lt;tr&gt;&lt;td class="winner"&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;
- &lt;tr class="winner"&gt;&lt;td&gt;&lt;a href="Hawks"&gt;https://example.com/hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

* Answer: &lt;tr class="winner"&gt;&lt;td&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

<!-- Speaker note: The class goes on the <tr> so the whole row takes the .winner rule, and the href goes on the <a> inside the name's cell. What this step is for: A row can carry a class and hold a link: one cell to read, one row to colour. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 16px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a table of your own: a timetable for two days, your sports results, or a list of games with their ratings. Give it a heading row and at least two rows of data.

<!-- Speaker note: Hints, in order: Plan it first: what are the column headings? How many rows? / Build the heading row with `<th>`, then one row at a time with `<td>`. Count the cells in each row. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Your+table+goes+here.+Start+with+%3Ctable%3E%2C+then+one+%3Ctr%3E+for+each+row.+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/html/tables/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Class survey table <span style="font-size:.6em;color:#64748b">(5 min)</span>

Choose two things to ask the class (favourite sport and pet, say). Write the heading row, then one row for each person who answers.

<!-- Speaker note: Check every row has the same number of cells. Ask: what would you change to add a third question? -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A table has 3 columns and 4 rows of data under the heading row. How many &lt;td&gt; cells does it need, and why?**

* 12 cells: every one of the 4 rows needs a cell for each of the 3 columns (4 × 3).

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson names the parts of a page with header, nav, main and footer. Tables also lead to data work: the same rows and columns are a spreadsheet, a CSV file, and later a list of lists in Python. Class idea: collect class data (favourite sport, pets) and publish it as a table. -->
