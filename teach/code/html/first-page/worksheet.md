---
title: "Tags label text"
subtitle: "Structure and style a page · Text and style · Lesson 1"
---

# Tags label text

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website you have visited, from your school page to a shop, starts as text with tags like these.


:::teacher-note

**In one sentence:** Students label text with headings and paragraphs, and find out that the browser ignores line breaks in the code.

**Students should be able to say:** I can use &lt;h1&gt;, &lt;h2&gt; and &lt;p&gt; to say what each piece of text is. I can explain why line breaks in my code do not show on the page. I can start a new paragraph with its own &lt;p&gt; and &lt;/p&gt;.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. Each `<p>` starts a paragraph and `</p>` ends it. How many lines of normal text will the page show?

```html
<h1>Sports day</h1>
<p>Sports day is on Friday.
Bring a hat
and water.</p>
<p>Races start at 9 am.</p>
```

:::keep-together

**How many lines of normal text (not counting the heading) will the page show?**

☐ 2 lines

☐ 1 line

☐ 3 lines

☐ 4 lines, one for each line of text in the code

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2 lines. The browser ignores line breaks in the code, so the three lines of the first paragraph join into one. Each &lt;p&gt; starts a new paragraph.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

:::keep-together

### Match the parts

**Match each part of the page with its job.**

A. a paragraph

B. a heading for one section

C. the main heading of the page

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<h1>Sports day</h1>` | |
| `<h2>What to bring</h2>` | |
| `<p> … </p>` | |

:::


:::teacher-note

**Answer:** &lt;h1&gt;Sports day&lt;/h1&gt; → C. the main heading of the page; &lt;h2&gt;What to bring&lt;/h2&gt; → B. a heading for one section; &lt;p&gt; … &lt;/p&gt; → A. a paragraph

Each tag says what its text is. The browser chooses the look: big and bold for headings, plain text with a gap for paragraphs.

:::


:::keep-together

### One line of code

**A page has &lt;p&gt;Bring a hat.&lt;/p&gt;&lt;p&gt;Bring water.&lt;/p&gt; all on one line of code. How many paragraphs does the page show?**

☐ It shows an error

☐ 2, because there are two &lt;p&gt; tags

☐ 1, because it is one line of code

☐ 1, because there is no gap in the code

:::


:::teacher-note

**Answer:** 2, because there are two &lt;p&gt; tags

Tags decide, not lines. Two &lt;p&gt; tags make two paragraphs, even when they are on one line of code.

:::


:::keep-together

### Sam's notice

**Sam wants Bring a towel. and Races start at 9 am. on separate lines, but the page shows them on one line. Click the line that causes it.**

```
 1  <h1>Swimming carnival</h1>
 2  <p>The carnival is on Thursday.</p>
 3  <p>Bring a towel.
 4  Races start at 9 am.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4 starts a new sentence inside the same paragraph, and the browser ignores the break in the code. End the paragraph with &lt;/p&gt; and start the next with &lt;p&gt;.

:::


:::typical

## Modify


**Change the event.** Make this a notice for a different event on a different day.

**Two paragraphs.** Split the long paragraph so the date and what to bring are separate.

**Add two sections.** Add an `<h2>` heading above each paragraph: `When` above the first, `What to bring` above the second.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Change the event:**

```html
<h1>Swimming carnival</h1>
<p>The swimming carnival is on Thursday. Bring a towel.</p>
```

**Two paragraphs:**

```html
<h1>Swimming carnival</h1>
<p>The swimming carnival is on Thursday.</p><p>Bring a towel.</p>
```

**Add two sections:**

```html
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The swimming carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel.</p>
```

:::

:::


## Make

Write a notice for an event at your school (a concert, a fair, a match): an `<h1>` title, two sections with `<h2>` headings, and a paragraph in each.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on Wednesday at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
```

:::


## Exit ticket

:::keep-together

**A student presses Enter in the middle of a paragraph in their code, but the page does not change. Why, and how do they start a new line?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The browser ignores line breaks in the code. To start a new paragraph, end the first with &lt;/p&gt; and start the next with &lt;p&gt;.

:::

