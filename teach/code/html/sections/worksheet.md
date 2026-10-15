---
title: "Name the parts of a page"
subtitle: "Structure and style a page · Parts of a page · Lesson 10"
---

# Name the parts of a page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every website has the same parts: a top bar, a menu, the content, a footer. Screen readers let people jump straight to each one.


:::teacher-note

**In one sentence:** Students name the parts of a page with header, nav, main, section and footer, and learn that the names change nothing you can see but help screen readers and search engines.

**Students should be able to say:** I can name the top, menu, content and bottom of a page with header, nav, main, section and footer. I can explain why these tags change nothing you can see, and why they still matter. I can put a list of links inside a nav.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Compare the two files. They hold the same words, but `after.html` has five new tags. What changes on the page?

```html
<!-- file: before.html -->
<h1>Chess club</h1>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/rules">Rules</a></li>
</ul>
<h2>When we meet</h2>
<p>Wednesdays at lunch.</p>
<p>Contact the teacher in charge.</p>
<!-- file: after.html -->
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/rules">Rules</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch.</p>
  </section>
</main>
<footer>
  <p>Contact the teacher in charge.</p>
</footer>
```

:::keep-together

**after.html wraps the same words in header, nav, main, section and footer tags. What changes on the page?**

☐ The list of links turns into a row menu

☐ Nothing you can see

☐ The footer moves to the bottom of the screen

☐ The header and footer get coloured bars

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Nothing you can see. These tags look like no tag at all; their names say what each part is.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/rules">Rules</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch.</p>
  </section>
</main>
<footer>
  <p>Contact the teacher in charge.</p>
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

These tags name the parts of a page. They add no look of their own; rules decide how each part looks.

:::


:::keep-together

### Why name the parts?

**If &lt;header&gt; looks the same as no tag at all, why use it?**

☐ It makes the text bigger

☐ It moves the part to the top of the page by itself

☐ Screen readers and search engines can tell what each part is

☐ The page will not load without it

:::


:::teacher-note

**Answer:** Screen readers and search engines can tell what each part is

A screen reader can jump straight to the menu or the main content, and a search engine knows which part is which. Your code is easier to read too.

:::


:::typical

## Modify


**Name the bottom.** Put the contact line in a `<footer>`.

**Name the menu.** Put the list of links in a `<nav>`. Turn Boxes on and off: the page looks the same.

**Name the content.** Put the heading `When we meet` and its paragraph in a `<section>`, and the section in a `<main>`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Name the bottom:**

```html
<h1>Chess club</h1>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/rules">Rules</a></li>
</ul>
<h2>When we meet</h2>
<p>Wednesdays at lunch.</p>
<footer>
  <p>Contact the teacher in charge.</p>
</footer>
```

**Name the menu:**

```html
<h1>Chess club</h1>
<nav>
  <ul>
    <li><a href="https://example.com/home">Home</a></li>
    <li><a href="https://example.com/rules">Rules</a></li>
  </ul>
</nav>
<h2>When we meet</h2>
<p>Wednesdays at lunch.</p>
<footer>
  <p>Contact the teacher in charge.</p>
</footer>
```

**Name the content:**

```html
<h1>Chess club</h1>
<nav>
  <ul>
    <li><a href="https://example.com/home">Home</a></li>
    <li><a href="https://example.com/rules">Rules</a></li>
  </ul>
</nav>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch.</p>
  </section>
</main>
<footer>
  <p>Contact the teacher in charge.</p>
</footer>
```

:::

:::


## Mix it up

Two slips, one in the CSS and one in the menu.

```html
<style>
  header {
    background-colour: navy;
    color: white;
  }
  footer {
    background-color: lightgray;
  }
</style>
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li>Rules<a href="https://example.com/rules"></a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch.</p>
  </section>
</main>
<footer>
  <p>Contact the teacher in charge.</p>
</footer>
```

:::keep-together

**The header should be navy with white text, but its words have vanished. Also, Rules should be a link, but nothing happens when you click it. Which two changes fix both?**

☐ Write background-color in the header rule, and put the word Rules between &lt;a&gt; and &lt;/a&gt;

☐ Write header as .header in the rule, and put the word Rules between &lt;a&gt; and &lt;/a&gt;

☐ Write background-color in the header rule, and put an href on the &lt;li&gt; tag

☐ Add a semicolon after navy, and put the address between &lt;a&gt; and &lt;/a&gt;

:::


:::teacher-note

**Answer:** Write background-color in the header rule, and put the word Rules between &lt;a&gt; and &lt;/a&gt;

The browser ignores a property it does not know, so the header stays white and the white words vanish. The words people click go between &lt;a&gt; and &lt;/a&gt;; here they sit outside an empty link.

:::


## Make

This club homepage is all plain text. Name its parts with `<header>`, `<nav>` (around the list of links), `<main>` with one `<section>`, and `<footer>`. Then change the words to a club of your own.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<header>
  <h1>Robotics Club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>Build robots every Tuesday</h2>
    <p>No experience needed.</p>
  </section>
</main>
<footer>
  <p>Contact: robots@example.com</p>
</footer>
```

:::


## Exit ticket

:::keep-together

**A student wraps a menu in &lt;nav&gt; and nothing changes on screen. Did it work? Why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Yes. nav looks like no tag at all, but it tells browsers and screen readers that the part is the main menu, so people can jump to it.

:::

