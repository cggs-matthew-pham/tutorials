---
order: 10
unit: challenge
node: AC9TDI10K02 n2
title: "Final challenge: a club page"
summary: Build a whole club page from every component in the course, in three milestones, then make it your own.
language: html
introduces: [link-in-page]
explainPicture: page.html#finished
hook: "This is how real websites are built: a header, a hero, cards, a table and a form, each one a part you already know how to make."
---
Build a whole page for a school club, one milestone at a time. Everything you need, you have met before. Check the page after every change, with **Boxes** or **Box model** when something looks wrong.

## Plan the page

```step
stage: investigate
code: page.html#finished
picture: page.html#finished
insight: "Seeing the finished page as named components turns a big task into a list of small ones students have done before."
tasks:
  - check:
      type: match
      q: "Match each part of the finished page with how it is built."
      pairs:
        - ["The title and menu at the top", "a <header> with a <nav> list made into a Flexbox row"]
        - ["The big welcome", "a hero: a <section> with padding, a background and centred text"]
        - ["Three groups side by side", "cards: boxes with padding and a border, in a Flexbox row"]
        - ["Results this term", "a <table> of rows and cells"]
        - ["Join the club", "a <form> with labels linked to their boxes"]
        - ["Contact details", "a <footer>"]
      explain: "Six parts, six lessons. Build them in order: header and menu, then the hero and cards, then the table, form and footer."
  - check:
      type: question
      q: "Which rule makes the three cards sit side by side?"
      options: [".cards { display: flex; }", ".card { display: flex; }", ".hero { text-align: center; }", "section { display: flex; }"]
      answer: 0
      explain: "Flexbox goes on the box that holds the cards. Putting it on each card, or on every section, would not give one row of cards."
```

This is the page you will build. The picture shows it finished.

### Name the parts

Which tags and rules make each part?

### The row of cards

Look for the rule in the code.

## Build the page

```step
stage: modify
insight: "Three milestones with fading support: most of the code, then an outline, then only the goals."
try: { playground: html, starter: "page.html#start", height: 560 }
tasks:
  - starter: "page.html#start"
    hint:
      - "In the `<style>` block: a `header` rule with a background colour and padding."
      - "A `.menu` rule: `display: flex;`, a `gap`, `list-style: none;` and `padding: 0;`."
    check: { type: code, text: "Style the header and put the menu in a row.", rules: { contains: ["header {", "background-color:", ".menu {", "display: flex;"] } }
    expected: page.html#sol-m1
  - starter: "page.html#sol-m1"
    hint:
      - "Follow the outline in the comments: each comment becomes one section, and each section gets its own class."
      - "Replace the first comment with a `<section class=\"hero\">` (a heading, a line of text and a link) and a `<section class=\"cards\" id=\"groups\">` holding three `<div class=\"card\">`."
      - "Then rules for `.hero`, `.cards` (`display: flex;` and a `gap`) and `.card` (width, padding, border)."
    check: { type: code, text: "Add a hero and three cards in a row.", rules: { contains: ["class=\"hero\"", "class=\"cards\"", ".cards {", "class=\"card\""] } }
    expected: page.html#sol-m2
  - starter: "page.html#sol-m2"
    hint:
      - "The goals list four parts: results, join, footer and linked labels. Do one at a time and check the page after each."
      - "Results: a `<section id=\"results\">` with a heading and a table. Join: a `<section id=\"join\">` with a form."
      - "Click every label to check it is linked. The footer goes after `</main>`."
    check: { type: code, text: "Add a results table, a sign-up form with linked labels, and a footer.", rules: { tags: [table, th, td, form, label, input, button, footer], contains: ["for=\""] } }
    expected: page.html#sol-m3
```

### Milestone 1: header and menu

The page starts with a header, a menu and an empty `<main>`. Style the header with a background colour and padding, and turn the menu into a row: `display: flex;`, a gap, no bullets (`list-style: none;`) and `padding: 0;`.

### Milestone 2: hero and cards

Follow the first comment inside `<main>`. Build a hero section with a heading, a line of text and a link to `#join`. Then a section of three cards in a row, each with a picture, a heading and a line of text. Style the hero, the row and the cards.

### Milestone 3: results, sign-up and footer

Goals only this time:

- a results section (`id="results"`) with a heading and a table: a heading row and at least two rows of data;
- a sign-up section (`id="join"`) with a form: at least two labelled fields (one a drop-down) and a button, every label linked;
- a footer after `</main>` with contact details;
- style the table cells, the form as a card, and the footer.

The menu links jump to these sections, because their `href` matches each section's `id`.

## Make it yours

```step
stage: make
try: { playground: html, starter: "page.html#sol-m3", height: 560 }
hint:
  - "Change one thing at a time: the club name, then the words, then the colours."
  - "Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`."
check: { type: reflect, text: "I changed the club, its words and its colours, and added a picture with alt text." }
expected: page.html#sol-yours
```

Turn the page into one for a club or event you care about: a new name, your own words, your own colours, and at least one picture in the header or the hero. Check it with **Boxes** and **Box model**, and click every label and every menu link.
