---
title: "Tables"
subtitle: "HTML & CSS · Structure · Lesson 4"
---

# Tables

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Timetables, sports results, price lists and school reports are tables: data in rows and columns.


:::teacher-note

**In one sentence:** Students build tables row by row with <table>, <tr>, <th> and <td>, and learn that every row needs the same number of cells.

**Students should be able to say:** I can build a table from rows (&lt;tr&gt;) of cells (&lt;th&gt; and &lt;td&gt;). I can add a row and a column to a table. I can explain why every row needs the same number of cells. I can say when a table is the right choice (data in rows and columns).

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<table>` holds rows (`<tr>`), and each row holds cells. Read the code. Will the table have lines around its cells?

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

:::keep-together

**Will the table have lines around its cells?**

☐ Yes, a grid of lines like a spreadsheet

☐ Only a line around the outside

☐ No lines: just the words lined up in columns

☐ A line under the heading row only

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** No lines. A table lines the words up in rows and columns; lines and colours come later, with CSS.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Match the tags

**Match each tag with its job.**

A. one row (table row)

B. an ordinary cell (table data)

C. a heading cell

D. the whole table

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<table>` | |
| `<tr>` | |
| `<th>` | |
| `<td>` | |

:::


:::teacher-note

**Answer:** &lt;table&gt; → D. the whole table; &lt;tr&gt; → A. one row (table row); &lt;th&gt; → C. a heading cell; &lt;td&gt; → B. an ordinary cell (table data)

A table holds rows, and each row holds cells. Heading cells use &lt;th&gt;, and the browser shows them bold.

:::


:::keep-together

### Count the cells

**This table has a heading row and two houses. How many &lt;td&gt; cells does it have?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 4

Two rows of data, each with two cells: 2 × 2 = 4. The heading row uses &lt;th&gt;, not &lt;td&gt;.

:::


:::keep-together

### Build a row

**Put the lines in order to make one row for the Kestrels with 7 points. One line is not needed.**

A. `</tr>`

B. `<td>Kestrels</td>`

C. `<tr>`

D. `<td>7</td>`

E. `</table>`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

&lt;tr&gt; opens the row, the two &lt;td&gt; cells sit inside it, and &lt;/tr&gt; closes it. &lt;/table&gt; would end the whole table.

```html
<tr>
  <td>Kestrels</td>
  <td>7</td>
</tr>
```

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

Line 4 has only one cell. Every row needs a cell for each column, so the Hawks row needs &lt;td&gt;9&lt;/td&gt; after the name.

:::


:::keep-together

### What goes in a cell?

A cell can hold more than words: a link, a picture, an important word.

```html
<tr>
  <td><a href="https://example.com/owls">Owls</a></td>
  <td><strong>12</strong></td>
  <td><img src="trophy.svg" alt="Trophy" width="40"></td>
</tr>
```

**What can go inside a &lt;td&gt; cell?**

☐ Only plain text

☐ Only numbers

☐ Only another &lt;tr&gt;

☐ Text, and other tags too: links, pictures, strong words

:::


:::teacher-note

**Answer:** Text, and other tags too: links, pictures, strong words

A cell is a box like any other. Put a link, a picture or a &lt;strong&gt; word inside it, and close it before the &lt;/td&gt;.

:::


:::typical

## Modify


**Add a row.** Add the Kestrels, with 7 points.

**Add a column.** Add a `Wins` column: the Owls have 4, the Hawks 3 and the Kestrels 2.

**Link a house.** Make `Owls` a link to `https://example.com/owls`, inside its cell.

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

**Link a house:**

```html
<h2>House points</h2>
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
    <th>Wins</th>
  </tr>
  <tr>
    <td><a href="https://example.com/owls">Owls</a></td>
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


:::wider

## Fix the canteen price list

This price list has two problems. One item has no price (it is $4.50), and the first row should be headings, not ordinary cells. Fix both, then add `Banana bread` for $3.00.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Canteen prices</h1>
<table>
  <tr>
    <th>Item</th>
    <th>Price</th>
  </tr>
  <tr>
    <td>Apple</td>
    <td>$1.00</td>
  </tr>
  <tr>
    <td>Sandwich</td>
    <td>$4.50</td>
  </tr>
  <tr>
    <td>Water</td>
    <td>$2.00</td>
  </tr>
  <tr>
    <td>Banana bread</td>
    <td>$3.00</td>
  </tr>
</table>
```

:::

:::


## Exit ticket

:::keep-together

**A table has 3 columns and 4 rows of data under the heading row. How many &lt;td&gt; cells does it need, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 12 cells: every one of the 4 rows needs a cell for each of the 3 columns (4 × 3).

:::

