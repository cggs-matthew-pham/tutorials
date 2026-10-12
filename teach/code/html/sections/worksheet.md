---
title: "Page sections and components"
subtitle: "HTML & CSS · Components and layout · Lesson 8"
---

# Page sections and components

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website has the same parts: a top bar, a menu, the content, a footer. Screen readers let people jump straight to each one.


:::teacher-note

**In one sentence:** Students name the parts of a page with header, nav, main, section and footer, and build components (a hero and a row of cards) from tags and rules they already know.

**Students should be able to say:** I can name the parts of a page with header, nav, main, section and footer. I can explain why section tags change nothing you can see, and why they still matter. I can build a hero section and a row of cards. I can find why cards stack when they should sit in a row.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Compare the two files. `<header>` and `<footer>` are new. What changes on the page?

```html
<!-- file: before.html -->
<div>
  <h1>Chess club</h1>
</div>
<p>We meet on Wednesdays.</p>
<div>
  <p>Contact: chess@example.com</p>
</div>
<!-- file: after.html -->
<header>
  <h1>Chess club</h1>
</header>
<p>We meet on Wednesdays.</p>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

:::keep-together

**after.html swaps the two divs for &lt;header&gt; and &lt;footer&gt;. What changes on the page?**

☐ The header becomes big and bold

☐ Nothing you can see

☐ A menu bar appears

☐ The footer moves to the bottom of the screen

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing you can see. &lt;header&gt; and &lt;footer&gt; look exactly like &lt;div&gt;; their names say what each part is.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<header>
  <h1>Chess club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<main>
  <section>
    <h2>This week</h2>
    <p>Practice on Wednesday.</p>
  </section>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

:::keep-together

### Match the parts

**Match each tag with the part of the page it names.**

A. the main content (one per page)

B. the main menu of links

C. the bottom: contact details and small print

D. one part of the content, with its own heading

E. the top: the title and often the menu

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `<header>` | |
| `<nav>` | |
| `<main>` | |
| `<section>` | |
| `<footer>` | |

:::


:::teacher-note

**Answer:** &lt;header&gt; → E. the top: the title and often the menu; &lt;nav&gt; → B. the main menu of links; &lt;main&gt; → A. the main content (one per page); &lt;section&gt; → D. one part of the content, with its own heading; &lt;footer&gt; → C. the bottom: contact details and small print

These tags name the parts of a page. They look like div; CSS decides how they look.

:::


:::keep-together

### Why name the parts?

**If &lt;header&gt; looks the same as &lt;div&gt;, why use it?**

☐ div is no longer allowed

☐ It moves the part to the top by itself

☐ It makes the text bigger

☐ Screen readers and search engines can tell what each part is

:::


:::teacher-note

**Answer:** Screen readers and search engines can tell what each part is

A screen reader can jump straight to the nav or the main content, and search engines know which part is which. Your code is easier to read too.

:::


:::keep-together

### A hero and cards

A **hero** is a big opening section: a heading, a line of text and a link. **Cards** are boxes in a row.

```html
<section class="hero">
  <h1>Chess club</h1>
  <p>Think ahead. Every Wednesday.</p>
  <a href="https://example.com/join">Join us</a>
</section>
<section class="cards">
  <div class="card">...</div>
  <div class="card">...</div>
</section>
```

**This page has a hero and a row of cards. Which rule puts the cards side by side?**

☐ .cards { display: flex; }

☐ .card { padding: 12px; }

☐ .hero { text-align: center; }

☐ The section tag does it

:::


:::teacher-note

**Answer:** .cards { display: flex; }

Components are made of what you know: a hero is a section with padding, a background and centred text; the cards are boxes in a Flexbox row.

:::


:::keep-together

### Cards that will not line up

**The two cards should sit side by side, but they stack, with no error. Click the line in the wrong place.**

```
 1  <style>
 2    .card {
 3      display: flex;
 4      padding: 12px;
 5      border: 2px solid teal;
 6    }
 7  </style>
 8  <section class="cards">
 9    <div class="card">Beginners</div>
10    <div class="card">Players</div>
11  </section>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3 gives display: flex to each card. It belongs on the box that holds the cards: .cards { display: flex; }.

:::


:::keep-together

### One style sheet, many pages

**A school website has 40 pages. Every page uses the same tags for its parts and links to one style sheet, style.css. The school changes its colours. What is the best way to update the site?**

☐ Change the tags to different ones

☐ Edit the style on every tag of all 40 pages

☐ Change the colours once in style.css: every page follows

☐ Make 40 new pages

:::


:::teacher-note

**Answer:** Change the colours once in style.css: every page follows

Because the looks live in CSS, not in the tags or the words, one change to the style sheet restyles all 40 pages. The same split helps screen readers: they read the structure (header, nav, main), whatever it looks like.

:::


:::typical

## Modify


**Name the top.** Make the first part a `<header>`.

**Add a menu.** Add a `<nav>` with two links inside the header, under the heading.

**Name the rest.** Make the middle part `<main>` and the last part `<footer>`.

**Cards in a row.** Put the three cards side by side, with a gap.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Name the top:**

```html
<style>
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
</style>
<header>
  <h1>Chess club</h1>
</header>
<div>
  <h2>Groups</h2>
  <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
  </div>
</div>
<div>
  <p>Contact: chess@example.com</p>
</div>
```

**Add a menu:**

```html
<style>
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<div>
  <h2>Groups</h2>
  <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
  </div>
</div>
<div>
  <p>Contact: chess@example.com</p>
</div>
```

**Name the rest:**

```html
<style>
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<main>
  <h2>Groups</h2>
  <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
  </div>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

**Cards in a row:**

```html
<style>
  .card {
    padding: 12px;
    border: 2px solid teal;
  }
  .cards {
    display: flex;
    gap: 12px;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<main>
  <h2>Groups</h2>
  <div class="cards">
    <div class="card">Beginners</div>
    <div class="card">Players</div>
    <div class="card">Champions</div>
  </div>
</main>
<footer>
  <p>Contact: chess@example.com</p>
</footer>
```

:::

:::


## Make

Make a hero for a school event: a big heading, one line of text and a link to sign up or get tickets, in a section with padding, a background colour and centred text.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .hero {
    padding: 32px;
    background-color: gold;
    text-align: center;
  }
</style>
<section class="hero">
  <h1>Music night</h1>
  <p>Friday at 7 pm in the hall. Everyone welcome.</p>
  <a href="https://example.com/tickets">Get free tickets</a>
</section>
```

:::


:::wider

## Rebuild the club homepage

This club homepage is all plain `<div>` boxes. Rebuild it with a `<header>` (put the links in a `<nav>`), a `<main>`, and a `<footer>`. Turn the opening part into a hero section, and put the three cards in a row.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .card {
    padding: 12px;
    border: 2px solid navy;
  }
  .cards {
    display: flex;
    gap: 12px;
  }
  .hero {
    padding: 24px;
    background-color: lightyellow;
    text-align: center;
  }
</style>
<header>
  <h1>Robotics Club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<main>
  <section class="hero">
    <h2>Build robots every Tuesday</h2>
    <p>No experience needed.</p>
  </section>
  <section class="cards">
    <div class="card">Line followers</div>
    <div class="card">Robot races</div>
    <div class="card">Show day</div>
  </section>
</main>
<footer>
  <p>Contact: robots@example.com</p>
</footer>
```

:::

:::


## Exit ticket

:::keep-together

**A student swaps &lt;div&gt; for &lt;nav&gt; around a menu, and nothing changes on screen. Did it work? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Yes. nav looks like div, but it tells browsers and screen readers that the part is the main menu, so people can jump to it.

:::

