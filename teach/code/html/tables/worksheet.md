---
title: "Tables"
subtitle: "Structure and style a page · Parts of a page · Lesson 9"
---

# Tables

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Timetables, sports results, price lists and school reports are tables: data in rows and columns.


:::teacher-note

**In one sentence:** Students build tables one row at a time with table, tr, th and td, and learn that every row needs the same number of cells.

**Students should be able to say:** I can build a table from rows (&lt;tr&gt;) of cells (&lt;th&gt; and &lt;td&gt;). I can explain why a table is written a row at a time and every row needs the same number of cells. I can add a row and a column to a table.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. `<table>` holds the table, and `<tr>` and `<th>` and `<td>` are new. How will the six words be arranged?

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

:::keep-together

**How will the six words be arranged on the page?**

☐ 3 rows of 2 words, because each &lt;tr&gt; is a column

☐ 6 lines, one word on each

☐ 1 row of 6 words

☐ 2 rows of 3 words, lined up in columns

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2 rows of 3 words. Each &lt;tr&gt; is one row going across, and its three cells line up under the cells of the other row to make 3 columns.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


:::keep-together

### Build a row

**Put the lines in order to make one row for the Kestrels: 7 points and 2 wins. One line is not needed.**

A. `<td>7</td>`

B. `<td>2</td>`

C. `<td>Kestrels</td>`

D. `</table>`

E. `</tr>`

F. `<tr>`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

&lt;tr&gt; opens the row, the three cells go inside it in the same order as the headings, and &lt;/tr&gt; closes it. &lt;/table&gt; would end the whole table.

```html
<tr>
  <td>Kestrels</td>
  <td>7</td>
  <td>2</td>
</tr>
```

:::


:::keep-together

### Sam's table

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

☐ 1, because every &lt;tr&gt; holds one cell

☐ 2, because there are names and points

☐ It shows an error

☐ 4, because there are four &lt;tr&gt; tags

:::


:::teacher-note

**Answer:** 1, because every &lt;tr&gt; holds one cell

Every &lt;tr&gt; is a row with one cell, so the page has four rows and one column. To get House and Points side by side, each house needs its own &lt;tr&gt; with both cells in it.

:::


:::keep-together

### The short row

**The Hawks have no points, and their row is shorter than the others. Click the line that causes it.**

```
 1  <table>
 2    <tr><th>House</th><th>Points</th></tr>
 3    <tr><td>Owls</td><td>12</td></tr>
 4    <tr><td>Hawks</td></tr>
 5    <tr><td>Kestrels</td><td>7</td></tr>
 6  </table>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4 has only one cell. Every row needs a cell for each column, so the Hawks row needs &lt;td&gt;9&lt;/td&gt; after the name. The browser shows the short row without any error.

:::


:::typical

## Modify


**Add a row.** Add the Kestrels, with 7 points.

**Add a column.** Add a `Wins` column: the Owls have 4, the Hawks 3 and the Kestrels 2.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Add a row:**

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
  <tr>
    <td>Kestrels</td>
    <td>7</td>
  </tr>
</table>
```

**Add a column:**

```html
<h2>House points</h2>
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
  <tr>
    <td>Hawks</td>
    <td>9</td>
    <td>3</td>
  </tr>
  <tr>
    <td>Kestrels</td>
    <td>7</td>
    <td>2</td>
  </tr>
</table>
```

:::

:::


## Mix it up

The Owls row is already gold and linked.

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

:::keep-together

**The Hawks win next week. Which row gives them the gold row and makes their name a link to https://example.com/hawks?**

☐ &lt;tr class="winner"&gt;&lt;td&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

☐ &lt;tr class=".winner"&gt;&lt;td&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

☐ &lt;tr&gt;&lt;td class="winner"&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

☐ &lt;tr class="winner"&gt;&lt;td&gt;&lt;a href="Hawks"&gt;https://example.com/hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

:::


:::teacher-note

**Answer:** &lt;tr class="winner"&gt;&lt;td&gt;&lt;a href="https://example.com/hawks"&gt;Hawks&lt;/a&gt;&lt;/td&gt;&lt;td&gt;9&lt;/td&gt;&lt;/tr&gt;

The class goes on the &lt;tr&gt; so the whole row takes the .winner rule, and the href goes on the &lt;a&gt; inside the name's cell.

:::


## Make

Make a table of your own: a timetable for two days, your sports results, or a list of games with their ratings. Give it a heading row and at least two rows of data.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Our week</h1>
<table>
  <tr>
    <th>Day</th>
    <th>Morning</th>
    <th>Afternoon</th>
  </tr>
  <tr>
    <td>Monday</td>
    <td>Maths</td>
    <td>Sport</td>
  </tr>
  <tr>
    <td>Tuesday</td>
    <td>Science</td>
    <td>Art</td>
  </tr>
</table>
```

:::


## Exit ticket

:::keep-together

**A table has 3 columns and 4 rows of data under the heading row. How many &lt;td&gt; cells does it need, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 12 cells: every one of the 4 rows needs a cell for each of the 3 columns (4 × 3).

:::

