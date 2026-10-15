---
title: "Style the links in the menu"
subtitle: "Layout and components · Rules that combine · Lesson 2"
---

# Style the links in the menu

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Every site menu looks different from the links in its articles, and one short selector is how it is done.


:::teacher-note

**In one sentence:** Students pick only the links inside a nav with a descendant selector, and find out that a colour on the nav does not reach the links, and that a space means inside.

**Students should be able to say:** I can write nav a { } to style only the links inside a nav. I can say that a space between selectors means inside. I can explain why a colour on the nav does not change the links.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

Read the code. The `header` rule sets a navy background and white text. The menu is a list of links inside a `<nav>` inside the header. What colour are the menu links?

```html
<style>
  header {
    background-color: navy;
    color: white;
  }
</style>
<header>
  <h1>Owls club</h1>
  <nav>
    <ul>
      <li><a href="https://example.com/home">Home</a></li>
      <li><a href="https://example.com/results">Results</a></li>
    </ul>
  </nav>
</header>
<p>Read the <a href="https://example.com/results">results</a> from last week.</p>
```

:::keep-together

**The header is navy and its text colour is white. What colour are the two menu links?**

☐ Navy, like the header

☐ Black, like normal text

☐ Blue, the usual link colour

☐ White, because the links are inside the header

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** Blue. The white reaches the heading, but a link keeps its own colour until a rule names the link. Blue on navy is hard to read.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate


```html
<style>
  nav a {
    color: crimson;
  }
</style>
<nav>
  <a href="https://example.com/home">Home</a>
  <a href="https://example.com/results">Results</a>
</nav>
<p>Read the <a href="https://example.com/rules">rules</a>.</p>
<footer>
  <a href="https://example.com/contact">Contact</a>
</footer>
```

:::keep-together

### Which links change?

**Fill in the colour of each link. The browser's usual link colour is blue.**

{{rows 1}}

| link | colour |
|---|---|
| Home, in the nav |   |
| Results, in the nav |   |
| rules, in the paragraph |   |
| Contact, in the footer |   |

:::


:::teacher-note

**Answer:** crimson, crimson, blue, blue

nav a picks only the links inside the nav. The paragraph and the footer are not in the nav, so their links keep the usual blue. The space means inside, not and.

:::


:::keep-together

### The selector for the menu

**Which rule styles only the links inside the nav?**

☐ nav, a { }

☐ nav { } with the link colour set inside it

☐ a nav { }

☐ nav a { }

:::


:::teacher-note

**Answer:** nav a { }

A space means inside, so nav a is the links within a nav. A comma, as in nav, a, means and: it styles the nav and every link on the page. a nav is the other way round: a nav inside a link.

:::


:::keep-together

### White links that stay blue

**Sam wants white menu links on the navy header. The links are still blue, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    header {
 3      background-color: navy;
 4    }
 5    nav {
 6      color: white;
 7    }
 8  </style>
 9  <header>
10    <nav>
11      <a href="https://example.com/home">Home</a>
12      <a href="https://example.com/results">Results</a>
13    </nav>
14  </header>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 5

Line 5 picks the nav, not its links. The colour reaches the nav's own words, but each link keeps its blue. The selector needs to name the links: nav a.

:::


:::typical

## Modify


**No underline in the menu.** The link in the paragraph keeps its underline.

**Footer links.** Pick only the links inside the `<footer>`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**No underline in the menu:**

```html
<style>
  header {
    background-color: navy;
    color: white;
  }
  nav a {
    color: white;
    text-decoration: none;
  }
</style>
<header>
  <h1>Owls club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/results">Results</a>
  </nav>
</header>
<p>Read the <a href="https://example.com/results">results</a> from last week.</p>
<footer>
  <a href="https://example.com/contact">Contact us</a>
</footer>
```

**Footer links:**

```html
<style>
  header {
    background-color: navy;
    color: white;
  }
  nav a {
    color: white;
    text-decoration: none;
  }
  footer a {
    color: gray;
  }
</style>
<header>
  <h1>Owls club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/results">Results</a>
  </nav>
</header>
<p>Read the <a href="https://example.com/results">results</a> from last week.</p>
<footer>
  <a href="https://example.com/contact">Contact us</a>
</footer>
```

:::

:::


## Make

Style this club page: a dark header, light menu links that fit it, and the link in the text left as it is.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  header {
    background-color: navy;
    color: white;
  }
  nav a {
    color: lightyellow;
    text-decoration: none;
  }
</style>
<header>
  <h1>Owls club</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/results">Results</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<p>Read the <a href="https://example.com/results">results</a> from last week.</p>
```

:::


## Exit ticket

:::keep-together

**A page has a link in the nav and a link in a paragraph. Which does nav a { color: white; } change?**

{{lines-3}}

:::


:::teacher-note

**Answer:** Only the link in the nav. The space means inside, so the link in the paragraph is not picked.

:::

