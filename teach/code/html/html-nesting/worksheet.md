---
title: "Tags inside tags"
subtitle: "Structure and style a page · Text and style · Lesson 2"
---

# Tags inside tags

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A news page puts a link inside a headline inside a box inside a page. Tags inside tags are how every page is built.


:::teacher-note

**In one sentence:** Students put one tag inside another, close the last one opened first, and find out that the browser guesses silently when tags are missing or cross.

**Students should be able to say:** I can put one tag inside another, such as &lt;em&gt; inside &lt;strong&gt;. I can close tags in the right order: the last one opened closes first. I can explain that the browser shows no error for a wrong closing tag, only a best guess.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. The `<em>` sits inside the `<strong>`. Which words will look both bold and slanted?

```html
<h1>Sports day</h1>
<p>Bring <strong>a hat, <em>water</em> and sunscreen</strong> on Friday.</p>
```

:::keep-together

**Which words will look both bold and slanted?**

☐ Only water

☐ None: a tag cannot go inside another tag

☐ a hat, water and sunscreen

☐ Only water, and it loses its bold: the inner tag replaces the outer one

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Only water. The &lt;em&gt; is inside the &lt;strong&gt;, so water gets both looks. a hat and sunscreen are only inside &lt;strong&gt;, so they are bold but not slanted.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Sports day</h1>
<p>Bring <strong>a hat and
<em>water</strong> on Friday</em>.</p>
```

:::keep-together

### Sam's notice

**Sam wants a hat and water bold, with water also slanted. The end of the paragraph looks wrong, but nothing reports an error. Click the line where the tags cross.**

```
 1  <h1>Sports day</h1>
 2  <p>Bring <strong>a hat and
 3  <em>water</strong> on Friday</em>.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3 closes &lt;/strong&gt; while &lt;em&gt; is still open, so the two tags overlap. The last tag opened must close first: &lt;/em&gt;, then &lt;/strong&gt;.

:::


:::keep-together

### No error message

A closing tag is missing from this page.

```html
<p>Bring a <strong>hat.</p>
<p>Wear sunscreen.</p>
<p>Races start at 9 am.</p>
```

**The first paragraph is missing its &lt;/strong&gt;. Fill in whether each line of text looks bold.**

{{rows 1}}

| text | bold? |
|---|---|
| Bring a | no |
| hat. | yes |
| Wear sunscreen. |   |
| Races start at 9 am. |   |

:::


:::teacher-note

**Answer:** yes, yes

The browser shows no error. It closes the tag at the end of the paragraph, then opens it again in the next ones, so the bold carries on to the end of the page. A missing closing tag changes the page without any warning.

:::


:::typical

## Modify


**Fix the order.** Swap the closing tags so the last one opened closes first.

**Both at once.** Make the word `Friday` important and stressed, with `<strong>` outside and `<em>` inside.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Fix the order:**

```html
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</em></strong> on Friday.</p>
```

**Both at once:**

```html
<h1>Sports day</h1>
<p>Bring <strong>a hat and <em>water</em></strong> on <strong><em>Friday</em></strong>.</p>
```

:::

:::


## Make

Finish this school trip notice. Mark the most important words with `<strong>`, and one word inside them with `<em>`, closing `</em>` right before `</strong>`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>School trip</h1>
<h2>When</h2>
<p>The trip is on Tuesday. The bus leaves at <strong>8 am <em>sharp</em></strong>.</p>
<h2>What to bring</h2>
<p>Bring <strong>lunch</strong>, a hat and a <em>water</em> bottle.</p>
```

:::


## Exit ticket

:::keep-together

**A student writes &lt;strong&gt;Friday &lt;em&gt;night&lt;/strong&gt;&lt;/em&gt;. What is wrong, and what will the browser say?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The tags cross: &lt;em&gt; was opened last so &lt;/em&gt; must come first. The browser says nothing; it makes a best guess and the page may look wrong.

:::

