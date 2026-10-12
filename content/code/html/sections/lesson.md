---
order: 8
unit: components
node: AC9TDI10K02 n2
title: Page sections and components
summary: Name the parts of a page with header, nav, main, section and footer, and build components such as a hero and a row of cards.
language: html
introduces: [semantic]
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 40
explainPicture: { ref: page.html#explain, boxes: true }
voice: true
explainClip:
  query: { code: "", boxes: 1, zoom: 1.6 }
  caption: "Section tags name the parts of a page"
  clip:
    - caption: "<header> is the top of the page: the title, and often the menu."
    - type: { into: HTML code, text: "<header>\n  <h1>Chess club</h1>\n</header>\n", append: true }
    - caption: "<main> holds the page's main content."
    - type: { into: HTML code, text: "<main>\n  <p>We meet on Wednesdays.</p>\n</main>\n", append: true }
    - caption: "<footer> is the bottom: contact details and small print."
    - type: { into: HTML code, text: "<footer>\n  <p>Contact us</p>\n</footer>", append: true }
    - expect: { selector: "#preview-text", contains: "Contact us" }
    - caption:
        text: "They look like plain boxes. Their names tell browsers and screen readers what each part is."
        say: "They look like plain boxes, but their names tell screen readers what each part is."
    - wait: 2500
hook: "Every website has the same parts: a top bar, a menu, the content, a footer. Screen readers let people jump straight to each one."
---
Real pages are built from named parts, and the parts are built from **components**: patterns made of tags you already know.

## Predict

```step
stage: predict
code: page.html#swap
insight: "Students expect header and footer to change the look or position; they only name the parts."
check:
  type: predict
  q: "after.html swaps the two divs for <header> and <footer>. What changes on the page?"
  options:
    - "Nothing you can see"
    - "The header becomes big and bold"
    - "The footer moves to the bottom of the screen"
    - "A menu bar appears"
  actual: "Nothing you can see. <header> and <footer> look exactly like <div>; their names say what each part is."
```

Compare the two files. `<header>` and `<footer>` are new. What changes on the page?

## Run

```step
stage: run
code: page.html#after
try: { playground: html, starter: "page.html#after", height: 380, boxes: true }
insight: "Section tags change nothing on screen; Boxes shows the named parts."
check: { type: reflect, text: "I can explain why header and footer change nothing you can see." }
unlocks: [header, footer]
```

Compare with your prediction. **Boxes** is on, so you can see the named parts. Switch it off: the page looks like plain boxes.

## Investigate

```step
stage: investigate
code: page.html#page
insight: "Each section tag names one part of a page; components such as a hero and cards are built from tags and rules students already know. Keeping structure in tags and looks in CSS means screen readers can follow the page and one style sheet can restyle a whole site."
unlocks: [nav, main, section]
tasks:
  - check:
      type: match
      q: "Match each tag with the part of the page it names."
      pairs:
        - ["<header>", "the top: the title and often the menu"]
        - ["<nav>", "the main menu of links"]
        - ["<main>", "the main content (one per page)"]
        - ["<section>", "one part of the content, with its own heading"]
        - ["<footer>", "the bottom: contact details and small print"]
      explain: "These tags name the parts of a page. They look like div; CSS decides how they look."
  - check:
      type: question
      q: "If <header> looks the same as <div>, why use it?"
      options: ["Screen readers and search engines can tell what each part is", "It makes the text bigger", "It moves the part to the top by itself", "div is no longer allowed"]
      answer: 0
      explain: "A screen reader can jump straight to the nav or the main content, and search engines know which part is which. Your code is easier to read too."
  - picture: { ref: page.html#combos, boxes: true }
    check:
      type: question
      q: "This page has a hero and a row of cards. Which rule puts the cards side by side?"
      options: [".cards { display: flex; }", ".card { padding: 12px; }", "The section tag does it", ".hero { text-align: center; }"]
      answer: 0
      explain: "Components are made of what you know: a hero is a section with padding, a background and centred text; the cards are boxes in a Flexbox row."
  - check:
      type: bug
      code: page.html#badcards
      answer: 3
      fault: logic
      misconception: flex-on-items
      text: "The two cards should sit side by side, but they stack, with no error. Click the line in the wrong place."
      explain: "Line 3 gives display: flex to each card. It belongs on the box that holds the cards: .cards { display: flex; }."
  - check:
      type: question
      q: "A school website has 40 pages. Every page uses the same tags for its parts and links to one style sheet, style.css. The school changes its colours. What is the best way to update the site?"
      options: ["Change the colours once in style.css: every page follows", "Edit the style on every tag of all 40 pages", "Change the tags to different ones", "Make 40 new pages"]
      answer: 0
      explain: "Because the looks live in CSS, not in the tags or the words, one change to the style sheet restyles all 40 pages. The same split helps screen readers: they read the structure (header, nav, main), whatever it looks like."
      feedback: [null, "That works, but it means 40 pages of edits, and some will be missed. Where do the colours live if every page links to style.css?", "The tags say what each part is; colours belong to the CSS. Changing tags would change the meaning, not the colours.", "New pages would still need their colours. Where do the looks live?"]
```

### Match the parts

A whole page, named part by part.

### Why name the parts?

They look the same as `<div>`.

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

### Cards that will not line up

Two cards that should sit side by side.

### One style sheet, many pages

Why keep the looks out of the tags?

## Modify

```step
stage: modify
insight: "Turning a page of plain divs into named sections, then laying out the cards."
try: { playground: html, starter: "page.html#modify", height: 480, boxes: true }
tasks:
  - hint: "Change the first `<div>` and its `</div>` to `<header>` and `</header>`."
    check: { type: code, text: "Make the top part a header.", rules: { tags: [header] } }
    expected: page.html#sol-header
  - hint:
      - "Inside the header, under the heading: `<nav>`, then two links, then `</nav>`."
      - "Links: `<a href=\"https://example.com/home\">Home</a>`"
    check: { type: code, text: "Add a nav with two links inside the header.", rules: { tags: [nav], contains: ["<nav>", "<a href="] } }
    expected: page.html#sol-nav
  - hint: "The middle part becomes `<main>`, the last part `<footer>`."
    check: { type: code, text: "Name the main content and the footer.", rules: { tags: [main, footer] } }
    expected: page.html#sol-main
  - hint:
      - "Which box holds the cards? Flexbox goes on that one, the parent, not on each card."
      - "Which box holds the cards? Give it `display: flex;` and a `gap`."
    check: { type: code, text: "Put the cards in a row.", rules: { contains: [".cards {", "display: flex;"] } }
    expected: page.html#sol-cards
```

### Name the top

Make the first part a `<header>`.

### Add a menu

Add a `<nav>` with two links inside the header, under the heading.

### Name the rest

Make the middle part `<main>` and the last part `<footer>`.

### Cards in a row

Put the three cards side by side, with a gap.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "Start with `<section class=\"hero\">` holding an `<h1>`, a `<p>` and an `<a>`."
  - "Then a `.hero` rule: padding, a background colour and `text-align: center;`."
check:
  type: code
  text: "Make a hero section with a heading, a line of text and a link, styled with padding."
  rules: { tags: [section, h1, p, a], contains: ["class=\"hero\"", ".hero {", "padding:"] }
expected: page.html#sol-make
```

Make a hero for a school event: a big heading, one line of text and a link to sign up or get tickets, in a section with padding, a background colour and centred text.

## Rebuild the club homepage

```step
stage: modify
try: { playground: html, starter: "page.html#club", height: 520, boxes: true }
insight: "A real homepage, rebuilt from plain divs into named sections with a hero and a card row."
expected: page.html#sol-club
```

This club homepage is all plain `<div>` boxes. Rebuild it with a `<header>` (put the links in a `<nav>`), a `<main>`, and a `<footer>`. Turn the opening part into a hero section, and put the three cards in a row.
