---
order: 9
unit: parts
moveId: table-rows
reviews: [class-pick, attribute-link]
introduces: [table]
assumes: [attribute, link, class-selector]
title: Tables
summary: Put data in a table by writing it one row at a time, with the same number of cells in every row.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8127
  url: http://127.0.0.1:8127/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", boxes: 1, zoom: 1.5 }
  caption: "A table is rows, and each row is cells"
  clip:
    - caption: "<table> opens the whole table."
    - type: { into: HTML code, text: "<table>\n", append: true }
    - caption: "<tr> is one row. Each <th> in it is a heading cell."
    - type: { into: HTML code, text: "  <tr>\n    <th>House</th>\n    <th>Points</th>\n  </tr>\n", append: true }
    - caption: "The next row holds ordinary cells: <td>."
    - type: { into: HTML code, text: "  <tr>\n    <td>Owls</td>\n    <td>12</td>\n  </tr>\n", append: true }
    - caption: "</table> closes the table."
    - type: { into: HTML code, text: "</table>", append: true }
    - expect: { selector: "#preview-text", contains: "Owls" }
    - caption: "Columns appear by themselves, so every row needs the same number of cells."
    - wait: 2500
hook: "Timetables, sports results, price lists and school reports are tables: data in rows and columns."
---
Some information is a grid: rows going across, columns going down. HTML has no tag for a column. You write the table **one row at a time** and the columns appear.

## Predict

```step
stage: predict
code: page.html#shape
insight: "Students who think in columns write a table a column at a time; committing to a layout first shows what a row is."
check:
  type: predict
  q: "How will the six words be arranged on the page?"
  options:
    - "2 rows of 3 words, lined up in columns"
    - "3 rows of 2 words, because each <tr> is a column"
    - "1 row of 6 words"
    - "6 lines, one word on each"
  fault: logic
  misconception: table-by-column
  actual: "2 rows of 3 words. Each <tr> is one row going across, and its three cells line up under the cells of the other row to make 3 columns."
```

Read the code. `<table>` holds the table, and `<tr>` and `<th>` and `<td>` are new. How will the six words be arranged?

## Run

```step
stage: run
code: page.html#shape
try: { playground: html, starter: "page.html#shape", height: 420, boxes: true }
insight: "A table is written row by row, and the browser lines the cells up into columns."
check: { type: reflect, text: "I can say which tag makes a row and which makes a cell." }
unlocks: [table]
```

Compare the page with your prediction. **Boxes** is on, so each row and each cell shows as a box. Switch it off when you are done.

| Code | What it does | Why |
|---|---|---|
| `<table> … </table>` | Holds the whole table | Everything in a table sits between these two tags |
| `<tr> … </tr>` | Makes one row, going across | `tr` is "table row". You write the table a row at a time |
| `<th>House</th>` | Makes a heading cell | `th` is "table heading". The browser makes it bold and centred |
| `<td>Owls</td>` | Makes an ordinary cell | `td` is "table data". The tag says what it is; the look is the browser's |
| three cells in each row | Make three columns | There is no column tag. A column is the cells in the same place in each row, so every row needs the same number of cells |
| no lines around the cells | The table has no grid | The browser draws none. Colours and text styles come from rules, as for any other tag |

## Investigate

```step
stage: investigate
insight: "A table is rows of cells: build a row, read a table written the wrong way round, and spot the short row."
tasks:
  - check:
      type: parsons
      code: page.html#parsons
      extra: ["</table>"]
      text: "Put the lines in order to make one row for the Kestrels: 7 points and 2 wins. One line is not needed."
      explain: "<tr> opens the row, the three cells go inside it in the same order as the headings, and </tr> closes it. </table> would end the whole table."
  - check:
      type: question
      q: "Sam wrote the names first, then the points, with one <tr> for each. Sam wanted two columns, House and Points. How many columns does the page have?"
      options:
        - "1, because every <tr> holds one cell"
        - "2, because there are names and points"
        - "4, because there are four <tr> tags"
        - "It shows an error"
      answer: 0
      fault: logic
      misconception: table-by-column
      feedback:
        - null
        - "Sam grouped the cells by column, but the browser reads the code a row at a time. How many cells are in each <tr>?"
        - "Four <tr> tags make four rows. Columns are counted across a row."
        - "The browser does not complain about a table written the wrong way round; it shows what the code says."
      explain: "Every <tr> is a row with one cell, so the page has four rows and one column. To get House and Points side by side, each house needs its own <tr> with both cells in it."
  - check:
      type: bug
      code: page.html#missing
      answer: 4
      fault: logic
      misconception: table-row-cells
      text: "The Hawks have no points, and their row is shorter than the others. Click the line that causes it."
      explain: "Line 4 has only one cell. Every row needs a cell for each column, so the Hawks row needs <td>9</td> after the name. The browser shows the short row without any error."
```

### Build a row

Put the scrambled lines in order.

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

### The short row

One row in this table is broken.

## Modify

```step
stage: modify
insight: "Adding a row is one new <tr>; adding a column touches every row."
try: { playground: html, starter: "page.html#modify", height: 440 }
tasks:
  - hint: "Copy a whole row, from `<tr>` to `</tr>`, then change the words."
    check: { type: code, text: "Add a row for the Kestrels.", rules: { contains: ["<td>Kestrels</td>"] } }
    expected: page.html#sol-row
  - hint:
      - "A new column needs a heading cell in the first row."
      - "Then every other row needs one more `<td>`."
    check: { type: code, text: "Add a Wins column.", rules: { contains: ["<th>Wins</th>"] } }
    expected: page.html#sol-col
```

### Add a row

Add the Kestrels, with 7 points.

### Add a column

Add a `Wins` column: the Owls have 4, the Hawks 3 and the Kestrels 2.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "A row can carry a class and hold a link: one cell to read, one row to colour."
check:
  type: question
  q: "The Hawks win next week. Which row gives them the gold row and makes their name a link to https://example.com/hawks?"
  options:
    - '<tr class="winner"><td><a href="https://example.com/hawks">Hawks</a></td><td>9</td></tr>'
    - '<tr class=".winner"><td><a href="https://example.com/hawks">Hawks</a></td><td>9</td></tr>'
    - '<tr><td class="winner"><a href="https://example.com/hawks">Hawks</a></td><td>9</td></tr>'
    - '<tr class="winner"><td><a href="Hawks">https://example.com/hawks</a></td><td>9</td></tr>'
  answer: 0
  shuffle: false
  feedback:
    - null
    - "In the CSS the dot belongs to .winner. In the HTML the class is just the name."
    - "That puts the class on one cell, so only the name turns gold. Which tag is the whole row?"
    - "The address goes in href. The words people click go between <a> and </a>."
  explain: "The class goes on the <tr> so the whole row takes the .winner rule, and the href goes on the <a> inside the name's cell."
```

The Owls row is already gold and linked.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "Plan it first: what are the column headings? How many rows?"
  - "Build the heading row with `<th>`, then one row at a time with `<td>`. Count the cells in each row."
check:
  type: code
  text: "Make a table with a heading row and at least two rows of data."
  rules: { tags: [table, tr, th, td] }
expected: page.html#sol-make
```

Make a table of your own: a timetable for two days, your sports results, or a list of games with their ratings. Give it a heading row and at least two rows of data.

```teacher
summary: Students build tables one row at a time with table, tr, th and td, and learn that every row needs the same number of cells.
time: 45
timing: "Predict and Run 10 min · Investigate 12 min · Modify 8 min · Mix it up 4 min · Make 10 min"
goals:
  - I can build a table from rows (<tr>) of cells (<th> and <td>).
  - I can explain why a table is written a row at a time and every row needs the same number of cells.
  - I can add a row and a column to a table.
before: |
  Do the Make task yourself (about 5 minutes).

  A table is built **row by row**: `<tr>` is a table row, `<th>` a heading cell and `<td>` an ordinary cell ("table data"). Columns are not written anywhere: they appear because every row has its cells in the same order. Students who think in columns, or in spreadsheets, often write all of one column first. Tables are for data; the look (lines, colours) comes from rules, and page layout is a later course.
running:
  - "Predict: the tempting wrong answer is 3 rows of 2 words, reading each `<tr>` as a column. Run it with **Boxes** on to see each row as a box going across."
  - "Investigate: the row-building task and Sam's table are the same idea from two sides: the cells of one house belong in one `<tr>`. The short row is the quiet failure: the browser shows it without complaint, so count cells per row."
  - "Modify: adding a column is the hard part. It needs a `<th>` in the heading row and a `<td>` in every other row."
  - "Mix it up: the row takes the class and the name's cell holds the link. Ask where each piece goes before they answer."
stuck:
  - see: One row is shorter than the others, or a value sits in the wrong column.
    ask: Does every row have the same number of cells, in the same order?
    fix: Add the missing <td> so each row has a cell for every column.
  - see: Text appears above the table instead of inside it.
    ask: Is that text inside a <td> or <th>?
    fix: All text in a table goes inside cells; a title goes above the <table> in an <h2>.
  - see: The new column only has a heading.
    ask: Which rows have a cell for the new column?
    fix: Add one <td> to every data row, in the same position.
stretch: "Add a caption with <caption>House points</caption> just after <table>, and a totals row at the bottom. Style the heading cells with a th rule."
support: "Give students the Modify starter and ask them only to copy the Hawks row and change it to the Kestrels."
leads: "Next lesson names the parts of a page with header, nav, main and footer. Tables also lead to data work: the same rows and columns are a spreadsheet, a CSV file, and later a list of lists in Python. Class idea: collect class data (favourite sport, pets) and publish it as a table."
exit:
  q: "A table has 3 columns and 4 rows of data under the heading row. How many <td> cells does it need, and why?"
  a: "12 cells: every one of the 4 rows needs a cell for each of the 3 columns (4 × 3)."
explain: |
  The video and the picture show the same steps:

  1. `<table>` opens the whole table.
  2. `<tr>` is one row. In the first row, each `<th>` is a heading cell.
  3. The next row holds ordinary cells: `<td>`.
  4. `</table>` closes the table.
  5. Columns appear by themselves, so every row needs the same number of cells.

  In the picture, Boxes is on: the table holds two rows, and each row holds cells.
solutions:
  step-4#t1: page.html#sol-row
  step-4#t2: page.html#sol-col
  step-6: page.html#sol-make
struggle: "Building a table row by row with the same number of cells in each. Have them count the cells per row before they look at the page."
class:
  activities:
    - at: predict
      kind: discussion
      title: Rows or columns?
      minutes: 3
      do: |
        Look at the code. Is the first `<tr>` a row going across or a column going down?
        Point with your arm, then tell your partner why.
      notes: "Most students point across when asked, then say 3 rows of 2 when asked what the page shows. Let them see the clash before running."
    - at: end
      kind: activity
      title: Class survey table
      minutes: 5
      do: |
        Choose two things to ask the class (favourite sport and pet, say). Write the heading row, then one row for each person who answers.
      notes: "Check every row has the same number of cells. Ask: what would you change to add a third question?"
```

```code page.html#shape
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

```code page.html#parsons
<tr>
  <td>Kestrels</td>
  <td>7</td>
  <td>2</td>
</tr>
```

```code page.html#missing
<table>
  <tr><th>House</th><th>Points</th></tr>
  <tr><td>Owls</td><td>12</td></tr>
  <tr><td>Hawks</td></tr>
  <tr><td>Kestrels</td><td>7</td></tr>
</table>
```

```code page.html#modify
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

```code page.html#sol-row
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

```code page.html#sol-col
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

```code page.html#review
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

```code page.html#make
<!-- Your table goes here. Start with <table>, then one <tr> for each row. -->
```

```code page.html#sol-make
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

```code page.html#explain
<table>
  <tr>
    <th>House</th>
    <th>Points</th>
  </tr>
  <tr>
    <td>Owls</td>
    <td>12</td>
  </tr>
</table>
```
