---
title: Parts of a page in 5 minutes
---
## The idea in plain words

A **table** is rows (`<tr>`) of cells: `<th>` for a heading cell and `<td>` for a data cell. You write it one row at a time, and each row needs the same number of cells. The **page parts** `<header>`, `<nav>`, `<main>`, `<section>` and `<footer>` name the parts of a page; they look like plain blocks, and the names are for screen readers and search engines. An **id** gives one element a name no other element has, and a link written `href="#name"` jumps to it. A **form** collects answers: each `<label>` is joined to its box by `for` matching the box's `id`, and a `<button>` is the thing to press.

## Why it matters

- **Tables are for data.** Rows and columns that mean something, not for laying out a page.
- **Named parts help people.** A screen reader user can jump straight to `<nav>` or `<main>`.
- **Linked labels.** Clicking a label puts the cursor in its box, and a screen reader reads the label when the box is selected. A label that does not match gets neither.

## An everyday picture, and where it breaks

A form is a paper form: labelled boxes and a place to hand it in. Where it breaks: a paper form goes somewhere. An HTML form on its own sends nothing; code behind it has to do that, and this course stops before that.

## Try it yourself (5 minutes)

1. Make a table with a heading row and two data rows. Remove one cell from a row and see what happens.
2. Wrap your title in `<header>` and your text in `<main>`. Notice what does not change.
3. Give two headings an `id`, and add a menu of `#` links that jumps to each.
4. Add `<label for="email">Email</label><input id="email" type="email">`. Click the label.

## Questions students ask

- **"Why is my table wonky?"** One row has a different number of cells. Count them.
- **"Why doesn't `<header>` change anything?"** It names the part; it does not style it.
- **"Why does my link open a page not found?"** `href="results"` looks for a page called results. A jump link needs `#`.
- **"Why does my form do nothing?"** It is not connected to anything. That is expected here.

## How it connects

The challenge builds a club page that uses all of these. The Layout and components course then lays the same page out in rows and cards.
