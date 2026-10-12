---
title: "Tags and nesting"
subtitle: "HTML & CSS · Structure · Lesson 1"
---

# Tags and nesting

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website you have visited, from your school page to a shop, starts as text with tags like these.


:::teacher-note

**In one sentence:** Students label text with tags (headings, paragraphs, strong and em), learn that tags nest like boxes inside boxes, and find out that the browser shows its best guess instead of an error when the code is wrong.

**Students should be able to say:** I can use &lt;h1&gt;, &lt;h2&gt;, &lt;p&gt;, &lt;strong&gt; and &lt;em&gt; to say what each piece of text is. I can explain why line breaks in my code do not show on the page. I can close tags in the right order when one tag is inside another. I can explain why I check the page after every change.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. Each `<p>` starts a paragraph and `</p>` ends it. How many lines of normal text will the page show?

```html
<h1>Sports day</h1>
<p>Sports day is on Friday.
Bring a hat
and water.</p>
<p>Races start at <strong>9 am</strong>.</p>
```

:::keep-together

**How many lines of normal text (not counting the heading) will the page show?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 2 lines. The browser joins the three lines of the first paragraph into one.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

`<h2>` is a smaller heading for a section, and `<em>` marks a word you would say with emphasis.

```html
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on <strong>Friday</strong>.</p>
<h2>What to bring</h2>
<p>Bring a hat and <em>lots</em> of water.</p>
```

:::keep-together

### Match the parts

**Match each part of the page with its job.**

A. a paragraph

B. a heading for one section

C. a word said with emphasis

D. an important word

E. the main heading of the page

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<h1>Sports day</h1>` | |
| `<h2>What to bring</h2>` | |
| `<p> … </p>` | |
| `<strong>Friday</strong>` | |
| `<em>lots</em>` | |

:::


:::teacher-note

**Answer:** &lt;h1&gt;Sports day&lt;/h1&gt; → E. the main heading of the page; &lt;h2&gt;What to bring&lt;/h2&gt; → B. a heading for one section; &lt;p&gt; … &lt;/p&gt; → A. a paragraph; &lt;strong&gt;Friday&lt;/strong&gt; → D. an important word; &lt;em&gt;lots&lt;/em&gt; → C. a word said with emphasis

Each tag says what its text is. The browser chooses the look: big and bold for headings, bold for strong, italic for em.

:::


:::keep-together

### Which closes first?

**In &lt;p&gt;Sports day is on &lt;strong&gt;Friday&lt;/strong&gt;.&lt;/p&gt;, which closing tag comes first?**

☐ &lt;/p&gt;

☐ The order does not matter

☐ &lt;/strong&gt;

☐ They close at the same time

:::


:::teacher-note

**Answer:** &lt;/strong&gt;

&lt;strong&gt; opens inside the paragraph, so it closes first. Tags nest like boxes: the inner box closes before the outer one.

:::


:::keep-together

### Spot the broken nesting

**This page looks right in the browser, but one line breaks the nesting rule. Click it.**

```
 1  <h1>Sports day</h1>
 2  <p>Sports day is on <strong>Friday</strong>.</p>
 3  <p>Races start at <strong><em>9 am</strong></em>.</p>
 4  <p>Bring a hat and water.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

On line 3, &lt;em&gt; opens inside &lt;strong&gt;, so &lt;/em&gt; must come before &lt;/strong&gt;: &lt;strong&gt;&lt;em&gt;9 am&lt;/em&gt;&lt;/strong&gt;. The browser quietly repairs it, which is why the page looks fine. Do not rely on that: other tools may read it differently.

:::


:::keep-together

### A missing tag

```html
<p>Races start at <strong>9 am.</p>
<p>Bring a hat.</p>
```

**This code forgets one closing tag. What does the browser do?**

☐ It shows the page exactly as intended

☐ It shows an error message and stops

☐ It shows a blank page

☐ It shows the page, but the second paragraph is bold too

:::


:::teacher-note

**Answer:** It shows the page, but the second paragraph is bold too

Browsers never stop on a mistake: they show their best guess. The &lt;strong&gt; is never closed, so the bold carries on into the next paragraph. That is why you check the page after every change.

:::


:::keep-together

### Mix and match

Tags can go inside each other in many ways: an `<em>` inside a heading, a `<strong>` inside a paragraph, even `<em>` inside `<strong>`.

```html
<h2>Bring <em>lots</em> of water</h2>
<p><strong>Races</strong> start at <em>9 am</em>.</p>
<p>Wear your <strong><em>house colours</em></strong>.</p>
```

**Which of these is nested correctly?**

☐ &lt;h2&gt;Bring &lt;em&gt;water&lt;/h2&gt;&lt;/em&gt;

☐ &lt;p&gt;Wear &lt;strong&gt;&lt;em&gt;colours&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;

☐ &lt;p&gt;Wear &lt;strong&gt;colours&lt;/p&gt;&lt;/strong&gt;

☐ &lt;p&gt;Wear &lt;strong&gt;&lt;em&gt;colours&lt;/strong&gt;&lt;/em&gt;&lt;/p&gt;

:::


:::teacher-note

**Answer:** &lt;p&gt;Wear &lt;strong&gt;&lt;em&gt;colours&lt;/em&gt;&lt;/strong&gt;&lt;/p&gt;

Any of these tags can go inside the others, in any order you choose. The one rule: whatever opened last closes first.

:::


:::typical

## Modify


**Change the event.** Make this a notice for a different event on a different day.

**Add two sections.** Add an `<h2>` heading above each paragraph: `When` above the first, `What to bring` above the second.

**Emphasise a word.** Give one word in the last paragraph emphasis with `<em>`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Change the event:**

```html
<h1>Swimming carnival</h1>
<p>The swimming carnival is on <strong>Thursday</strong>.</p>
<p>Bring a hat and water.</p>
```

**Add two sections:**

```html
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The swimming carnival is on <strong>Thursday</strong>.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

**Emphasise a word:**

```html
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The swimming carnival is on <strong>Thursday</strong>.</p>
<h2>What to bring</h2>
<p>Bring a hat and <em>lots</em> of water.</p>
```

:::

:::


## Make

Write a notice for an event at your school (a concert, a fair, a match): an `<h1>` title, two sections with `<h2>` headings, a paragraph in each, and one important word in `<strong>`.

The grey line in the editor is a **comment**: `<!--` and `-->` wrap a note that the browser ignores. Delete it or keep it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on <strong>Wednesday</strong> at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
```

:::


:::wider

## Tidy up a newsletter article

This is a whole page, as a website would store it. The first few lines are the same on every page: `<!DOCTYPE html>`, `<html>`, `<head>` (information about the page, such as the title on the browser tab) and `<body>`. Copy them as they are for now; only what is inside `<body>` shows on the page.

The article came out as one long paragraph. Split it into paragraphs, add an `<h2>` heading for the book fair, and make the most important words `<strong>`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
</head>
<body>
<h1>Library news</h1>
<p>The library has <strong>200 new books</strong> this term.</p>
<p>Graphic novels are on the shelf by the window.</p>
<h2>Book fair</h2>
<p>The book fair starts on <strong>Monday</strong> in the library.</p>
<p>Bring a gold coin for the raffle.</p>
</body>
</html>
```

:::

:::


## Exit ticket

:::keep-together

**A student presses Enter in the middle of a paragraph in their code, but the page does not change. Why, and how do they start a new line?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The browser ignores line breaks in the code. To start a new paragraph, end the first with &lt;/p&gt; and start the next with &lt;p&gt;.

:::

