---
order: 4
unit: structure
title: Tables
summary: Put data in rows and columns with table, row and cell tags, and keep every row the same length.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8127
  url: http://127.0.0.1:8127/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 40
explainPicture: { ref: page.html#explain, boxes: true }
voice: true
explainClip:
  query: { code: "", boxes: 1, zoom: 1.5 }
  caption: "A table is rows, and each row is cells"
  clip:
    - caption: "<table> opens the whole table."
    - type: { into: HTML code, text: "<table>\n", append: true }
    - caption: "<tr> is one row, and each <th> is a heading cell in it."
    - type: { into: HTML code, text: "  <tr>\n    <th>House</th>\n    <th>Points</th>\n  </tr>\n", append: true }
    - caption: "The next row holds ordinary cells: <td>."
    - type: { into: HTML code, text: "  <tr>\n    <td>Owls</td>\n    <td>12</td>\n  </tr>\n", append: true }
    - caption: "</table> closes the table."
    - type: { into: HTML code, text: "</table>", append: true }
    - expect: { selector: "#preview-text", contains: "Owls" }
    - caption: "Rows go down, cells go across. Every row needs the same number of cells."
    - wait: 2500
hook: "Timetables, sports results, price lists and school reports are tables: data in rows and columns."
---
Some information is a grid: rows going down, columns going across. HTML builds it one row at a time.

## Predict

```step
stage: predict
code: page.html#results
insight: "Students expect spreadsheet grid lines; a table only lines things up, and the look comes later with CSS."
check:
  type: predict
  q: "Will the table have lines around its cells?"
  options:
    - "Yes, a grid of lines like a spreadsheet"
    - "Only a line around the outside"
    - "No lines: just the words lined up in columns"
    - "A line under the heading row only"
  actual: "No lines. A table lines the words up in rows and columns; lines and colours come later, with CSS."
```

`<table>` holds rows (`<tr>`), and each row holds cells. Read the code. Will the table have lines around its cells?

## Run

```step
stage: run
code: page.html#results
try: { playground: html, starter: "page.html#results", height: 420 }
insight: "A table is built row by row; the browser lines up the cells in columns."
check: { type: reflect, text: "I can say which tag makes a row and which makes a cell." }
unlocks: [table]
```

Compare the page with your prediction. Then click **Boxes** to see each row and cell. Turn it off again when you are done.

## Investigate

```step
stage: investigate
code: page.html#results
insight: "Rows hold cells, so the cell count is rows times columns, and a short row breaks the grid."
tasks:
  - check:
      type: match
      q: "Match each tag with its job."
      pairs:
        - ["<table>", "the whole table"]
        - ["<tr>", "one row (table row)"]
        - ["<th>", "a heading cell"]
        - ["<td>", "an ordinary cell (table data)"]
      explain: "A table holds rows, and each row holds cells. Heading cells use <th>, and the browser shows them bold."
  - check:
      type: number
      q: "This table has a heading row and two houses. How many <td> cells does it have?"
      answer: 4
      explain: "Two rows of data, each with two cells: 2 × 2 = 4. The heading row uses <th>, not <td>."
  - check:
      type: parsons
      code: page.html#parsons
      extra: ["</table>"]
      text: "Put the lines in order to make one row for the Kestrels with 7 points. One line is not needed."
      explain: "<tr> opens the row, the two <td> cells sit inside it, and </tr> closes it. </table> would end the whole table."
  - check:
      type: bug
      code: page.html#missing
      answer: 4
      fault: logic
      misconception: table-row-cells
      text: "The Hawks have no points, and their row is shorter than the others. Click the line that causes it."
      explain: "Line 4 has only one cell. Every row needs a cell for each column, so the Hawks row needs <td>9</td> after the name."
  - picture: { ref: page.html#combos, boxes: true }
    check:
      type: question
      q: "What can go inside a <td> cell?"
      options: ["Only plain text", "Text, and other tags too: links, pictures, strong words", "Only numbers", "Only another <tr>"]
      answer: 1
      explain: "A cell is a box like any other. Put a link, a picture or a <strong> word inside it, and close it before the </td>."
```

### Match the tags

What does each tag do?

### Count the cells

Count the cells inside the rows.

### Build a row

Put the scrambled lines in order.

### The short row

One row in this table is broken.

### What goes in a cell?

A cell can hold more than words: a link, a picture, an important word.

```html
<tr>
  <td><a href="https://example.com/owls">Owls</a></td>
  <td><strong>12</strong></td>
  <td><img src="trophy.svg" alt="Trophy" width="40"></td>
</tr>
```

## Modify

```step
stage: modify
insight: "Adding a row, then a column (a heading cell plus one cell in every row)."
try: { playground: html, starter: "page.html#results", height: 440 }
tasks:
  - hint: "Copy a whole row, from `<tr>` to `</tr>`, then change the words."
    check: { type: code, text: "Add a row for the Kestrels.", rules: { contains: ["<td>Kestrels</td>"] } }
    expected: page.html#sol-row
  - hint:
      - "A new column needs a heading cell in the first row."
      - "Then every other row needs one more `<td>`."
    check: { type: code, text: "Add a Wins column.", rules: { contains: ["<th>Wins</th>"] } }
    expected: page.html#sol-col
  - hint:
      - "The link goes inside the cell: `<td>`, then `<a href=\"...\">`, then the name."
      - "Close `</a>` before `</td>`."
    check: { type: code, text: "Link the Owls cell to the Owls page.", rules: { contains: ["<td><a href=\"https://example.com/owls\">Owls</a></td>"] } }
    expected: page.html#sol-cell-link
```

### Add a row

Add the Kestrels, with 7 points.

### Add a column

Add a `Wins` column: the Owls have 4, the Hawks 3 and the Kestrels 2.

### Link a house

Make `Owls` a link to `https://example.com/owls`, inside its cell.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "Plan it first: what are the column headings? How many rows?"
  - "Build the heading row with `<th>`, then one row at a time with `<td>`."
check:
  type: code
  text: "Make a table with a heading row and at least two rows of data."
  rules: { tags: [table, tr, th, td] }
expected: page.html#sol-make
```

Make a table of your own: a timetable for two days, your sports results, or a list of games with their ratings. Give it a heading row and at least two rows of data.

## Fix the canteen price list

```step
stage: modify
try: { playground: html, starter: "page.html#canteen", height: 460 }
insight: "A real table with a broken row and no heading cells, fixed and extended."
expected: page.html#sol-canteen
```

This price list has two problems. One item has no price (it is $4.50), and the first row should be headings, not ordinary cells. Fix both, then add `Banana bread` for $3.00.
