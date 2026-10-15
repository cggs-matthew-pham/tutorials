---
title: "Pick some with a class"
subtitle: "Structure and style a page · Lists, links and pictures · Lesson 7"
---

# Pick some with a class

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website marks the parts that matter, like sale prices or warnings, with a class so one rule can style them all.


:::teacher-note

**In one sentence:** Students mark chosen elements with a class and style only those with a dot rule, and find out that the names must match and the dot stays in the CSS.

**Students should be able to say:** I can mark an element with class="name" and style it with .name in the CSS. I can use one class on several elements. I can find a class rule that matches nothing, because of a different name or a dot in the HTML.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`class="note"` marks a paragraph with a name, and `.note { }` is a rule for that name. Read the code. Which lines of text will turn crimson?

```html
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p>Races start at 9 am.</p>
```

:::keep-together

**Which lines of text turn crimson?**

☐ All four paragraphs

☐ Only Bring a hat., the first one marked

☐ None of them, because there is no tag called note

☐ Bring a hat. and Bring water., the two paragraphs marked class="note"

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Bring a hat. and Bring water. The rule .note picks every element marked class="note", however many there are, and leaves the other paragraphs alone.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p>Races start at 9 am.</p>
```

:::keep-together

### The rule that does nothing

**Bring a hat should be crimson, but it stays black, and there is no error. Click the line in the CSS that causes it.**

```
 1  <style>
 2    .Notice {
 3      color: crimson;
 4    }
 5  </style>
 6  <p>Sports day is on Friday.</p>
 7  <p class="notice">Bring a hat.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 2

Line 2 says .Notice, but the paragraph's class is notice. Class names must match exactly, capitals included. A selector that matches nothing is simply ignored.

:::


:::keep-together

### The dot in the wrong place

**Bring a hat should be crimson, but it stays black. The CSS is right. Click the line that causes it.**

```
 1  <style>
 2    .note {
 3      color: crimson;
 4    }
 5  </style>
 6  <p>Sports day is on Friday.</p>
 7  <p class=".note">Bring a hat.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

Line 7 puts the dot in the HTML. The dot is only in the CSS, where it means a class: the tag says class="note" and the rule says .note.

:::


:::typical

## Modify


**Mark one more.** Add `class="note"` to the last paragraph, so it joins the others.

**Change the colour.** Change `crimson` to `navy` in the rule. Every marked paragraph changes together.

**A second class.** Add a class named `big` with `font-size: 24px;`, and use it on the first paragraph.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Mark one more:**

```html
<style>
  .note {
    color: crimson;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note">Races start at 9 am.</p>
```

**Change the colour:**

```html
<style>
  .note {
    color: navy;
  }
</style>
<h1>Sports day</h1>
<p>Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note">Races start at 9 am.</p>
```

**A second class:**

```html
<style>
  .note {
    color: navy;
  }
  .big {
    font-size: 24px;
  }
</style>
<h1>Sports day</h1>
<p class="big">Sports day is on Friday.</p>
<p class="note">Bring a hat.</p>
<p class="note">Bring water.</p>
<p class="note">Races start at 9 am.</p>
```

:::

:::


## Mix it up

Two things are wrong on this page, one in the CSS and one in the HTML.

```html
<style>
  h2 {
    color: teal
    font-size: 28px;
  }
</style>
<h2>Winners</h2>
<img src="trophy.svg">
<p>First place: Owls</p>
```

:::keep-together

**The heading stays plain, and a screen reader has nothing to say about the picture. Click the two lines to fix.**

```
 1  <style>
 2    h2 {
 3      color: teal
 4      font-size: 28px;
 5    }
 6  </style>
 7  <h2>Winners</h2>
 8  <img src="trophy.svg">
 9  <p>First place: Owls</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3 and 8

Line 3 needs a ; at its end: without it the browser drops both declarations, and the h2 rule does nothing. Line 8 needs alt, to say what the picture shows.

:::


## Make

This is a results page. Use a class named `winner` for the first-place paragraphs and a class named `runner` for the second-place paragraphs, then write a rule for each, with two different colours.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .winner {
    color: darkgreen;
  }
  .runner {
    color: navy;
  }
</style>
<h1>Race results</h1>
<p class="winner">First place: Owls</p>
<p class="runner">Second place: Hawks</p>
<p class="winner">First place: Eagles</p>
<p class="runner">Second place: Falcons</p>
```

:::


## Exit ticket

:::keep-together

**A rule .sale { color: red; } does nothing. Name two things that could be wrong.**

{{lines-3}}

:::


:::teacher-note

**Answer:** No element has class="sale", or the name is spelt differently in the HTML. Another possibility is class=".sale" with the dot in the HTML.

:::

