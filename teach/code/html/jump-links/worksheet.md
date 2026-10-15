---
title: "A place on the page"
subtitle: "Structure and style a page · Parts of a page · Lesson 11"
---

# A place on the page

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Long pages such as Wikipedia articles open with a list of contents, and every entry jumps down the page to its part.


:::teacher-note

**In one sentence:** Students name a place on a page with id and link to it with href="#name", so a menu can jump to each part of a long page.

**Students should be able to say:** I can give a heading a name with id. I can link to it with href starting with I can explain why each id is used once and why the

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. The menu links look like links you know, but their `href` values are new. Someone clicks Results. What does the page do?

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2>When we meet</h2>
    <p>Wednesdays at lunch in room 4. Bring a board if you have one.</p>
  </section>
  <section>
    <h2 id="results">Results</h2>
    <p>The Owls won the autumn ladder. The Hawks came second.</p>
  </section>
  <section>
    <h2 id="join">Join</h2>
    <p>Come to room 4 on Wednesday and ask for a game.</p>
  </section>
</main>
```

:::keep-together

**Someone clicks Results in the menu. What does the page do?**

☐ Opens a different web page called results

☐ Shows only the Results part and hides the rest

☐ Nothing: the whole page is already on screen

☐ Scrolls down so the Results heading is at the top

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** It scrolls to the Results heading. The link's href names a place on this page, and the heading with that id is the place.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


:::keep-together

### Where does Join go?

Two parts share one name.

```html
<ul>
  <li><a href="#join">Join</a></li>
</ul>
<h2 id="join">Join the club</h2>
<p>Come on Wednesday.</p>
<h2 id="join">Join the chess ladder</h2>
<p>Put your name on the list.</p>
```

**Two sections both have id="join", and the menu has a link to #join. Where does the link go?**

☐ Nowhere, because the name is used twice

☐ To both, one after the other

☐ To the second one

☐ To the first one

:::


:::teacher-note

**Answer:** To the first one

An id names one element. The browser takes the first match, so the second Join part cannot be reached by a link. Give each part its own name.

:::


:::keep-together

### The link that leaves

**Rules and Join jump down the page, but clicking Results tries to open a different page. Click the line that causes it.**

```
 1  <nav>
 2    <ul>
 3      <li><a href="#rules">Rules</a></li>
 4      <li><a href="results">Results</a></li>
 5      <li><a href="#join">Join</a></li>
 6    </ul>
 7  </nav>
 8  <h2 id="rules">Rules</h2>
 9  <p>Think before you move.</p>
10  <h2 id="results">Results</h2>
11  <p>The Owls won.</p>
12  <h2 id="join">Join</h2>
13  <p>Come on Wednesday.</p>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 4

Line 4 has href="results" with no #. Without the #, the browser looks for a page called results instead of an element with that id. It should be href="#results".

:::


:::typical

## Modify


**Name a place.** Give the `When we meet` heading the id `meet`. Nothing changes on the page yet.

**Link to it.** Add a menu item that jumps to `meet`. Click it to test.

**Back to the top.** Name the title `top`, and add a link at the bottom of the page that jumps back to it.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Name a place:**

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2 id="meet">When we meet</h2>
    <p>Wednesdays at lunch in room 4. Bring a board if you have one.</p>
  </section>
  <section>
    <h2 id="results">Results</h2>
    <p>The Owls won the autumn ladder. The Hawks came second.</p>
  </section>
  <section>
    <h2 id="join">Join</h2>
    <p>Come to room 4 on Wednesday and ask for a game.</p>
  </section>
</main>
```

**Link to it:**

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#meet">When we meet</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2 id="meet">When we meet</h2>
    <p>Wednesdays at lunch in room 4. Bring a board if you have one.</p>
  </section>
  <section>
    <h2 id="results">Results</h2>
    <p>The Owls won the autumn ladder. The Hawks came second.</p>
  </section>
  <section>
    <h2 id="join">Join</h2>
    <p>Come to room 4 on Wednesday and ask for a game.</p>
  </section>
</main>
```

**Back to the top:**

```html
<header>
  <h1 id="top">Chess club</h1>
  <nav>
    <ul>
      <li><a href="#meet">When we meet</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2 id="meet">When we meet</h2>
    <p>Wednesdays at lunch in room 4. Bring a board if you have one.</p>
  </section>
  <section>
    <h2 id="results">Results</h2>
    <p>The Owls won the autumn ladder. The Hawks came second.</p>
  </section>
  <section>
    <h2 id="join">Join</h2>
    <p>Come to room 4 on Wednesday and ask for a game.</p>
  </section>
</main>
<p><a href="#top">Back to the top</a></p>
```

:::

:::


## Mix it up

This mixes the last lessons: the parts of a page, and a list of links.

:::keep-together

**Put the lines in order to make a header with the title and, inside a nav, a list of two links. One line is not needed.**

A. `<li><a href="https://example.com/rules">Rules</a></li>`

B. `<h1>Chess club</h1>`

C. `<ul>`

D. `<header>`

E. `</nav>`

F. `</ul>`

G. `<li><a href="https://example.com/join">Join</a></li>`

H. `</main>`

9. `</header>`

10. `<nav>`

Correct order (letters): {{field-24}}

:::


:::teacher-note

**Answer:** see the program below

The header holds the title and the nav. The nav holds the list, and each link sits in its own item. &lt;/main&gt; would close a part this page has not opened.

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/rules">Rules</a></li>
      <li><a href="https://example.com/join">Join</a></li>
    </ul>
  </nav>
</header>
```

:::


## Make

This page has three parts but no menu. Add a `<nav>` with a list of three links under the title, inside the `<header>`. Each link jumps to one of the headings: give them the ids `rules`, `results` and `join`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<header>
  <h1>Chess club</h1>
  <nav>
    <ul>
      <li><a href="#rules">Rules</a></li>
      <li><a href="#results">Results</a></li>
      <li><a href="#join">Join</a></li>
    </ul>
  </nav>
</header>
<main>
  <section>
    <h2 id="rules">Rules</h2>
    <p>Think before you move. Shake hands at the end.</p>
  </section>
  <section>
    <h2 id="results">Results</h2>
    <p>The Owls won the autumn ladder.</p>
  </section>
  <section>
    <h2 id="join">Join</h2>
    <p>Come to room 4 on Wednesday.</p>
  </section>
</main>
```

:::


## Exit ticket

:::keep-together

**A menu link has href="results" and a heading has id="results". The link does not jump. What is missing, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The #. href="#results" means the element named results on this page; without it the browser looks for another page called results.

:::

