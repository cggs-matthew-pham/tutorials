---
title: "Turn the newsletter into cards"
subtitle: "Layout and components · Boxes · Lesson 5"
---

# Turn the newsletter into cards

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** A stylesheet grows rule by rule, and the skill is finding the one rule that does the job you want to change.


:::teacher-note

**In one sentence:** Students read a whole newsletter stylesheet and change just the rule that does each job, using rules that combine, links in a menu, block and inline boxes, and the box.

**Students should be able to say:** I can find the rule in a stylesheet that does a job and change just that rule. I can say which rule wins when two rules set the same property. I can style the links in a menu with nav a. I can give several elements a shared class with padding and a border.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Read the stylesheet


```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    h1, h2 {
      color: navy;
    }
    h2 {
      color: teal;
    }
    .note {
      background-color: lightyellow;
    }
  </style>
</head>
<body>
<header>
  <h1>Library news</h1>
</header>
<main>
  <section>
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section>
    <h2>Book fair</h2>
    <p class="note">The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

:::keep-together

### Match the rules

**Match each rule with what it changes.**

A. one rule for the title and the section headings

B. the background of the paragraphs marked note

C. the typeface of all the text on the page

D. a later rule that changes the colour of the section headings only

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `body { font-family: sans-serif; }` | |
| `h1, h2 { color: navy; }` | |
| `h2 { color: teal; }` | |
| `.note { background-color: lightyellow; }` | |

:::


:::teacher-note

**Answer:** body { font-family: sans-serif; } → C. the typeface of all the text on the page; h1, h2 { color: navy; } → A. one rule for the title and the section headings; h2 { color: teal; } → D. a later rule that changes the colour of the section headings only; .note { background-color: lightyellow; } → B. the background of the paragraphs marked note

Each rule has a job. The group rule colours the title and the headings together, and the h2 rule that comes after it changes just the headings.

:::


:::keep-together

### Two rules, one heading

**Both h1, h2 { color: navy; } and h2 { color: teal; } match the Book fair heading. What colour is it?**

☐ Teal, because the later rule wins where both set the colour

☐ Navy, because the first rule that matches is the one that counts

☐ Black, because two rules cancel each other out

☐ Half navy and half teal

:::


:::teacher-note

**Answer:** Teal, because the later rule wins where both set the colour

The heading matches both rules. Both set color, and with equal selectors the later rule wins, so the Book fair heading is teal. The title matches only the first rule, so it stays navy.

:::


:::typical

## Change one rule


**The headings.** Make the section headings orange without changing the title.

**The note.** Make the paragraph marked `note` stand out in `lightpink`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The headings:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    h1, h2 {
      color: navy;
    }
    h2 {
      color: orange;
    }
    .note {
      background-color: lightyellow;
    }
  </style>
</head>
<body>
<header>
  <h1>Library news</h1>
</header>
<main>
  <section>
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section>
    <h2>Book fair</h2>
    <p class="note">The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

**The note:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    h1, h2 {
      color: navy;
    }
    h2 {
      color: orange;
    }
    .note {
      background-color: lightpink;
    }
  </style>
</head>
<body>
<header>
  <h1>Library news</h1>
</header>
<main>
  <section>
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section>
    <h2>Book fair</h2>
    <p class="note">The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

:::

:::


:::typical

## Style the menu links


**Which rule?.** The menu is a `<nav>` of links, and the story has a link of its own.

**Block or inline?.** Look at how the menu sits on the page.

**The menu rule.** Add a rule that removes the underline from the menu links and gives them the colour `navy`. The link in the story must keep its underline.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**The menu rule:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    h1, h2 {
      color: navy;
    }
    h2 {
      color: teal;
    }
    header {
      background-color: lightblue;
      padding: 16px;
    }
    nav a {
      color: navy;
      text-decoration: none;
    }
  </style>
</head>
<body>
<header>
  <h1>Library news</h1>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/events">Events</a>
    <a href="https://example.com/join">Join</a>
  </nav>
</header>
<main>
  <section>
    <h2>New books</h2>
    <p>The library has 200 new books this term. See the <a href="https://example.com/list">full list</a>.</p>
  </section>
</main>
</body>
</html>
```

:::

:::


:::typical

## Turn the sections into cards


**Add up a card.** Work out the width before you write any rule.

**Share a class.** Each section needs the same class, `card`.

**One rule for the cards.** Write a `.card` rule with `padding` and a `border`. Add `margin` too, so the cards do not touch.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Share a class:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    h1, h2 {
      color: navy;
    }
    h2 {
      color: teal;
    }
  </style>
</head>
<body>
<header>
  <h1>Library news</h1>
</header>
<main>
  <section class="card">
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section class="card">
    <h2>Book fair</h2>
    <p>The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

**One rule for the cards:**

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    h1, h2 {
      color: navy;
    }
    h2 {
      color: teal;
    }
    .card {
      padding: 16px;
      border: 2px solid gray;
      margin: 16px 0;
    }
  </style>
</head>
<body>
<header>
  <h1>Library news</h1>
</header>
<main>
  <section class="card">
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section class="card">
    <h2>Book fair</h2>
    <p>The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

:::

:::


## Fix the squashed card

Maya wrote a `.card` rule for the newsletter. The border shows, but the cards look squashed.

```html
<!DOCTYPE html>
<html>
<head>
  <title>School newsletter</title>
  <style>
    body {
      font-family: sans-serif;
    }
    .card {
      padding: 16;
      border: 2px solid gray;
      margin: 16px 0;
    }
  </style>
</head>
<body>
<main>
  <section class="card">
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section class="card">
    <h2>Book fair</h2>
    <p>The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

:::keep-together

**Maya's cards have a border, but the words touch it, and there is no error. Click the line that causes it.**

```
 1  <!DOCTYPE html>
 2  <html>
 3  <head>
 4    <title>School newsletter</title>
 5    <style>
 6      body {
 7        font-family: sans-serif;
 8      }
 9      .card {
10        padding: 16;
11        border: 2px solid gray;
12        margin: 16px 0;
13      }
14    </style>
15  </head>
16  <body>
17  <main>
18    <section class="card">
19      <h2>New books</h2>
20      <p>The library has 200 new books this term.</p>
21    </section>
22    <section class="card">
23      <h2>Book fair</h2>
24      <p>The book fair starts on Monday in the library.</p>
25    </section>
26  </main>
27  </body>
28  </html>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 10

Line 10 has no unit. padding: 16 means nothing to the browser, so it ignores the whole line. It needs padding: 16px;.

:::


## Exit ticket

:::keep-together

**A page has h1, h2 { color: navy; } and then h2 { color: teal; }. What colour is an h2, and what colour is the h1?**

{{lines-3}}

:::


:::teacher-note

**Answer:** The h2 is teal, because the later rule wins where both set the colour. The h1 matches only the first rule, so it is navy.

:::

