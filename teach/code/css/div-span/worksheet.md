---
title: "Block and inline boxes"
subtitle: "Layout and components · Boxes · Lesson 3"
---

# Block and inline boxes

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every menu, card and banner on a website is a plain box that someone decided should stack or sit in a line.


:::teacher-note

**In one sentence:** Students find out that block elements start a new line and take the full width while inline ones sit in the line, that div and span are plain boxes for grouping, and that display switches between block and inline.

**Students should be able to say:** I can say which elements are block and which are inline. I can use a span for a few words and a div for a group of elements. I can switch an element between block and inline with display.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`<span>` and `<div>` are tags you have not met. Both are plain boxes that the class `mark` colours gold. Read the code. How wide is the gold in each place?

```html
<style>
  .mark {
    background-color: gold;
  }
</style>
<h2>Sports day</h2>
<p>Races start at <span class="mark">9 am</span> on the oval.</p>
<div class="mark">Bring a hat and water.</div>
<p>Read the <a href="https://example.com/rules">rules</a> first.</p>
```

:::keep-together

**Look at the gold background. How wide is it behind 9 am, and behind Bring a hat and water.?**

☐ Only the words, in both places

☐ Behind 9 am, only its words. Behind the hat line, the full width of the page

☐ Behind 9 am, the full width. Behind the hat line, only its words

☐ The full width of the page, in both places

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Only the words behind 9 am, and the full width behind the hat line. A span sits inside the line of text. A div is a block: it starts on a new line and takes the full width.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<div>
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

:::keep-together

### A div with no rule

**A student wraps two paragraphs in a &lt;div&gt; and writes no CSS. What changes on the page?**

☐ Nothing you can see: a div has no look of its own

☐ The two paragraphs get a grey background

☐ The two paragraphs join into one line

☐ A border appears around the two paragraphs

:::


:::teacher-note

**Answer:** Nothing you can see: a div has no look of its own

A div is a plain box. It changes nothing until a rule styles it. Its use is to group elements so that one rule, or one class, can style them together.

:::


:::keep-together

### Block or inline?

**Which three tags sit inside a line of text, instead of starting a new line?**

☐ &lt;strong&gt;, &lt;a&gt; and &lt;span&gt;

☐ &lt;p&gt;, &lt;h1&gt; and &lt;div&gt;

☐ &lt;span&gt;, &lt;div&gt; and &lt;a&gt;

☐ &lt;h2&gt;, &lt;strong&gt; and &lt;ul&gt;

:::


:::teacher-note

**Answer:** &lt;strong&gt;, &lt;a&gt; and &lt;span&gt;

Inline: strong, em, a, img and span. Block: p, h1 to h6, ul, ol, table and div. A block starts on a new line and takes the full width.

:::


:::typical

## Modify


**Labels on their own lines.** Each label should sit above its box.

**Group the paragraphs.** One `<div>` around both paragraphs, and one rule for it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Labels on their own lines:**

```html
<style>
  label {
    color: navy;
    display: block;
  }
</style>
<form>
  <label for="name">Name</label>
  <input id="name">
  <label for="year">Year</label>
  <input id="year">
</form>
<p>Bring a hat.</p>
<p>Bring water.</p>
```

**Group the paragraphs:**

```html
<style>
  label {
    color: navy;
    display: block;
  }
  .packing {
    background-color: lightyellow;
  }
</style>
<form>
  <label for="name">Name</label>
  <input id="name">
  <label for="year">Year</label>
  <input id="year">
</form>
<div class="packing">
  <p>Bring a hat.</p>
  <p>Bring water.</p>
</div>
```

:::

:::


## Mix it up

The words in the div and in the span should both be crimson and 20px. Right now they are navy and normal size. Change the page so both are crimson and 20px.

```html
<style>
  .alert {
    color: crimson;
  }
  span, div {
    color: navy;
  }
</style>
<div>Bring a hat and water.</div>
<p>Races start at <span>9 am</span> sharp.</p>
```

## Make

Highlight the most important phrase in this concert notice. Put a `<span>` with the class `highlight` around just those words, and write a `.highlight` rule with a background colour.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .highlight {
    background-color: lightyellow;
  }
</style>
<h1>Spring concert</h1>
<p>The concert is on <span class="highlight">Wednesday at 6 pm</span> in the hall.</p>
<p>Tickets are free. Bring a friend!</p>
```

:::


## Exit ticket

:::keep-together

**Why does a gold background on a span reach only its words, and on a div the whole width?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A span is inline, so it is only as wide as its words. A div is a block, so it takes the full width of the page.

:::

