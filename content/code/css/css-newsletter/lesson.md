---
order: 5
unit: boxes
moveId: read-the-stylesheet
reviews: [rules-combine, inside-selector, block-inline, box-model]
recipes: [page-wrapper]
assumes: [heading, paragraph, link, list, semantic, style-block, css-rule, text-colour, font, class, class-selector, group-selector, descendant-selector, div-span, display, box]
title: Turn the newsletter into cards
summary: Read a longer stylesheet, find the rule that does a job, and change just that rule.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8134
  url: http://127.0.0.1:8134/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
voice: true
hook: "A stylesheet grows rule by rule, and the skill is finding the one rule that does the job you want to change."
---
The newsletter page has grown a stylesheet. Its `<style>` block, in the `<head>` of the page wrapper, now holds several rules, and some of them apply to the same elements. Every step here is a job on that page: read the rules, find the one that does the job, and change only that rule.

## Read the stylesheet

```step
stage: investigate
code: page.html#newsletter
insight: "Before changing a stylesheet, say what each rule changes, and which rule wins where two meet."
tasks:
  - check:
      type: match
      q: "Match each rule with what it changes."
      pairs:
        - ["body { font-family: sans-serif; }", "the typeface of all the text on the page"]
        - ["h1, h2 { color: navy; }", "one rule for the title and the section headings"]
        - ["h2 { color: teal; }", "a later rule that changes the colour of the section headings only"]
        - [".note { background-color: lightyellow; }", "the background of the paragraphs marked note"]
      explain: "Each rule has a job. The group rule colours the title and the headings together, and the h2 rule that comes after it changes just the headings."
  - check:
      type: question
      q: "Both h1, h2 { color: navy; } and h2 { color: teal; } match the Book fair heading. What colour is it?"
      options:
        - "Teal, because the later rule wins where both set the colour"
        - "Navy, because the first rule that matches is the one that counts"
        - "Black, because two rules cancel each other out"
        - "Half navy and half teal"
      answer: 0
      shuffle: false
      fault: logic
      misconception: one-rule-only
      feedback:
        - null
        - "The browser does not stop at the first rule. It takes every rule that matches, and where two set the same property the later one wins."
        - "Rules do not cancel out. Where two set the same property, one of them wins."
        - "A property has one value at a time, so one of the two rules wins."
      explain: "The heading matches both rules. Both set color, and with equal selectors the later rule wins, so the Book fair heading is teal. The title matches only the first rule, so it stays navy."
```

### Match the rules

What does each rule change?

### Two rules, one heading

The Book fair heading matches two rules.

## Change one rule

```step
stage: modify
try: { playground: html, starter: "page.html#newsletter", height: 480 }
insight: "To change a job, find the rule that does it: here the h2 rule, not the group rule, and the note rule."
expected: page.html#sol-rules
tasks:
  - hint:
      - "The section headings are teal because of the rule after the group rule. Change that one."
      - "Find `h2 { color: teal; }` and change `teal`."
    check: { type: code, text: "Make the section headings orange, and leave the title navy.", rules: { contains: ["}h2{color:orange;}"] } }
    expected: page.html#sol-h2
  - hint: "The rule for the marked paragraph starts with a dot. Change its colour name."
    check: { type: code, text: "Make the note paragraph's background lightpink.", rules: { contains: [".note{background-color:lightpink;}"] } }
    expected: page.html#sol-rules
```

### The headings

Make the section headings orange without changing the title.

### The note

Make the paragraph marked `note` stand out in `lightpink`.

## Style the menu links

```step
stage: modify
try: { playground: html, starter: "page.html#menu", height: 500 }
insight: "nav a picks only the links inside the menu; a plain a rule would change the link in the story too."
expected: page.html#sol-menu
tasks:
  - check:
      type: question
      q: "Which rule styles only the links inside the nav?"
      options:
        - "nav a { }"
        - "nav, a { }"
        - "nav.a { }"
        - "a nav { }"
      answer: 0
      shuffle: false
      fault: logic
      misconception: space-means-both
      feedback:
        - null
        - "A comma means both: this styles the nav and every link on the page, including the one in the story."
        - "A dot means a class, so this picks a nav that has class=\"a\"."
        - "This picks a nav inside a link, which is the wrong way round."
      explain: "A space means inside. nav a picks the links that sit inside the nav and no others."
  - check:
      type: question
      q: "The three menu links sit side by side on one line, but the title above them and each section start on a new line. Why?"
      options:
        - "Links are inline boxes, and the title and sections are block boxes"
        - "The nav tag puts its links in a row"
        - "Links have less text than headings"
        - "The header has display: flex"
      answer: 0
      shuffle: false
      fault: logic
      feedback:
        - null
        - "The nav tag adds no layout of its own. It only names the part."
        - "The amount of text does not decide it. The kind of box does."
        - "There is no display: flex anywhere in this page."
      explain: "Block boxes (h1, section, div) start a new line and take the full width. Inline boxes (a, strong, span) sit in the line of text, side by side."
  - hint:
      - "Write a new rule below the others in the `<style>` block. Its selector is two words."
      - "`nav a { text-decoration: none; }` removes the underline, and the `color` line chooses the link colour."
    check: { type: code, text: "Remove the underline from the menu links only.", rules: { contains: ["nava{", "text-decoration:none;"] } }
    expected: page.html#sol-menu
```

### Which rule?

The menu is a `<nav>` of links, and the story has a link of its own.

### Block or inline?

Look at how the menu sits on the page.

### The menu rule

Add a rule that removes the underline from the menu links and gives them the colour `navy`. The link in the story must keep its underline.

## Turn the sections into cards

```step
stage: modify
try: { playground: html, starter: "page.html#cards", height: 500 }
insight: "One class on both sections and one rule for it makes them cards; the width of a card is more than its width property."
expected: page.html#sol-cards
tasks:
  - check:
      type: number
      q: "A card rule says width: 300px; padding: 20px; border: 2px solid gray; How wide is the card on the page, in pixels?"
      answer: 344
      fault: logic
      misconception: width-includes-padding
      feedback:
        - [300, "That is only the content. Add the padding and the border on both sides."]
        - [322, "That adds the padding (20 + 20) but not the border."]
        - [324, "That adds one side of the padding and one side of the border."]
      explain: "300 for the content, plus 20 + 20 of padding, plus 2 + 2 of border: 344."
  - hint: "A class is an attribute, so it goes inside the opening tag of each `<section>`."
    check: { type: code, text: "Mark both sections with the class card.", rules: { tags: [section], contains: ["class=\"card\""] } }
    expected: page.html#sol-class
  - hint:
      - "A class rule starts with a dot. Write it in the `<style>` block."
      - "`.card { padding: 16px; border: 2px solid gray; }`"
    check: { type: code, text: "Add a .card rule with padding and a border.", rules: { contains: [".card{", "padding:", "border:"] } }
    expected: page.html#sol-cards
```

### Add up a card

Work out the width before you write any rule.

### Share a class

Each section needs the same class, `card`.

### One rule for the cards

Write a `.card` rule with `padding` and a `border`. Add `margin` too, so the cards do not touch.

## Fix the squashed card

```step
stage: investigate
code: page.html#squashed
insight: "A size without a unit is ignored, in a whole page just as in a small one."
check:
  type: bug
  code: page.html#squashed
  answer: 10
  fault: syntax
  misconception: css-missing-unit
  text: "Maya's cards have a border, but the words touch it, and there is no error. Click the line that causes it."
  explain: "Line 10 has no unit. padding: 16 means nothing to the browser, so it ignores the whole line. It needs padding: 16px;."
```

Maya wrote a `.card` rule for the newsletter. The border shows, but the cards look squashed.

```teacher
summary: Students read a whole newsletter stylesheet and change just the rule that does each job, using rules that combine, links in a menu, block and inline boxes, and the box.
time: 45
timing: "Read the stylesheet 8 min · Change one rule 8 min · Menu links 10 min · Cards 12 min · Fix the card 5 min"
goals:
  - I can find the rule in a stylesheet that does a job and change just that rule.
  - I can say which rule wins when two rules set the same property.
  - I can style the links in a menu with nav a.
  - I can give several elements a shared class with padding and a border.
before: |
  This is a review lesson: nothing new is taught, and each step uses ideas from earlier lessons. Do the cards step yourself first (about 5 minutes).

  The page is a whole document, with the page wrapper from Course A (`<!DOCTYPE html>`, `<head>` with the `<style>` block, `<body>`). Only the `<body>` shows. The stylesheet has a group rule, a tag rule that comes after it, a class rule, and later a descendant rule (`nav a`) and a card class. Students use rules that combine, links in a menu, block and inline boxes, and the box in one page.
running:
  - "Read the stylesheet: the match is about what each rule changes. For the heading colour, ask which rule comes last and what happens to the property both set."
  - "Change one rule: the check wants a separate `h2` rule changed. A student who changes the group rule to orange sees the headings stay teal, because the later rule still wins."
  - "Menu links: ask which links `nav a` picks before they write it. The link in the story must keep its underline."
  - "Cards: the number is a sum on paper (300 + 40 + 4). Then one class on both sections and one `.card` rule."
  - "Fix the squashed card: it is the missing unit again, in a whole page."
stuck:
  - see: The headings stay teal after changing a colour.
    ask: Which rule comes last for the h2 headings?
    fix: Change the h2 rule that comes after the group rule, or the later rule still wins.
  - see: Every link on the page lost its underline.
    ask: Is the selector nav a, or just a?
    fix: Write nav a, with a space, so only links inside the nav change.
  - see: The cards do not change.
    ask: Does the class name in the tags match the name after the dot exactly?
    fix: Use class="card" on each section, and .card in the CSS with a dot.
stretch: "Add a second class, `.featured`, with a different border colour, and put it on the headline section as well as card. Which border wins, and why?"
support: "Give students only the Change one rule and Turn the sections into cards steps, and a copy of the page with the class already on both sections."
leads: "Next unit is Layout: Flexbox puts boxes in a row, such as a menu. Class idea: ask students to find three cards on a real website and sketch their padding, border and margin."
exit:
  q: "A page has h1, h2 { color: navy; } and then h2 { color: teal; }. What colour is an h2, and what colour is the h1?"
  a: "The h2 is teal, because the later rule wins where both set the colour. The h1 matches only the first rule, so it is navy."
solutions:
  step-2#t1: page.html#sol-h2
  step-2#t2: page.html#sol-rules
  step-3#t3: page.html#sol-menu
  step-4#t2: page.html#sol-class
  step-4#t3: page.html#sol-cards
struggle: "Choosing which rule to change. Ask them to name the job first, then point to the rule that does it before they type."
class:
  activities:
    - at: start
      kind: discussion
      title: Which rule wins?
      minutes: 3
      do: |
        Look at the two heading rules. With your partner, say what colour the title and the section headings are, and why.
      notes: "Listen for the later rule wins. Some will say the first rule. Ask what each rule's selector picks."
    - at: end
      kind: activity
      title: Swap and name the job
      minutes: 4
      do: |
        Swap stylesheets with a partner. Point at each rule and say the job it does, and which elements it changes.
      notes: "A student who cannot say what a rule changes is a good prompt to ask what its selector picks."
```

```code page.html#newsletter
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

```code page.html#sol-h2
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

```code page.html#sol-rules
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

```code page.html#menu
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

```code page.html#sol-menu
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

```code page.html#cards
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
  <section>
    <h2>New books</h2>
    <p>The library has 200 new books this term.</p>
  </section>
  <section>
    <h2>Book fair</h2>
    <p>The book fair starts on Monday in the library.</p>
  </section>
</main>
</body>
</html>
```

```code page.html#sol-class
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

```code page.html#sol-cards
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

```code page.html#squashed
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
