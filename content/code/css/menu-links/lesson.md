---
order: 2
unit: rules
moveId: inside-selector
reviews: []
introduces: [descendant-selector]
recipes: [pseudo-class]
assumes: [semantic, link, list, css-rule]
title: Style the links in the menu
summary: Pick only the links inside the nav, so the menu can look different from the links in the text.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8141
  url: http://127.0.0.1:8141/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "nav a picks only the links inside the nav"
  clip:
    - caption: "All three links are blue, in the menu and in the text."
    - wait: 1500
    - caption:
        text: "nav a picks only the links inside the nav."
        say: "Nav space A picks only the links inside the nav."
    - type: { into: HTML code, text: "  nav a {\n    color: crimson;\n  }\n", after: "<style>\n" }
    - expect: { selector: "#preview-text", contains: "Read the" }
    - caption: "The space means inside. The link in the text keeps its look."
    - wait: 2000
    - caption: "Copy this line for now: hover means while the pointer is over it."
    - type: { into: HTML code, text: "  nav a:hover {\n    text-decoration: underline;\n  }\n", after: "color: crimson;\n  }\n" }
    - wait: 2000
hook: "Every site menu looks different from the links in its articles, and one short selector is how it is done."
---
A page has links in two places: in the menu at the top, and in the sentences below. A rule on `a` styles both. To change only the menu, the rule has to say where the links are.

## Predict

```step
stage: predict
code: page.html#plain
insight: "Students expect a colour set on a container to reach the links inside it; a link keeps its own colour until a rule names the link."
check:
  type: predict
  q: "The header is navy and its text colour is white. What colour are the two menu links?"
  options:
    - "Blue, the usual link colour"
    - "White, because the links are inside the header"
    - "Navy, like the header"
    - "Black, like normal text"
  fault: logic
  misconception: color-reaches-links
  actual: "Blue. The white reaches the heading, but a link keeps its own colour until a rule names the link. Blue on navy is hard to read."
```

Read the code. The `header` rule sets a navy background and white text. The menu is a list of links inside a `<nav>` inside the header. What colour are the menu links?

## Run

```step
stage: run
code: page.html#plain
try: { playground: html, starter: "page.html#plain", height: 440 }
insight: "A space between two selectors means inside, so nav a picks only the links in the nav."
check: { type: reflect, text: "I can explain why nav a changes the menu links and not the link in the paragraph." }
unlocks: [menu-links]
```

Compare the page with your prediction. Then add this rule under the `header` rule, and watch the menu links change while the link in the paragraph stays blue.

```html
nav a {
  color: white;
}
```

| Code | What it does | Why |
|---|---|---|
| `header { color: white; }` | Makes the header's own words white | The links inside keep their blue. A link has its own colour, so a rule has to name the link |
| `nav a { color: white; }` | Makes the links in the nav white | The space means **inside**: `nav a` picks every `a` that sits within a `nav` |
| the link in the paragraph | Stays blue | It is an `a`, but it is not inside a `nav`, so the rule does not pick it |
| `nav a:hover { text-decoration: underline; }` | Underlines a menu link while the pointer is over it | `:hover` means "while the pointer is over it". Copy this for now; the colon is part of the selector |

## Investigate

```step
stage: investigate
code: page.html#trace
insight: "A space means inside: the rule reaches the links in the nav and no others, and it needs the link named, not just the nav."
tasks:
  - check:
      type: trace
      text: "Fill in the colour of each link. The browser's usual link colour is blue."
      table: |
        | link | colour |
        | Home, in the nav | [crimson] |
        | Results, in the nav | [crimson] |
        | rules, in the paragraph | [blue] |
        | Contact, in the footer | [blue] |
      fault: logic
      misconception: space-means-both
      explain: "nav a picks only the links inside the nav. The paragraph and the footer are not in the nav, so their links keep the usual blue. The space means inside, not and."
  - check:
      type: question
      q: "Which rule styles only the links inside the nav?"
      options: ["nav a { }", "nav, a { }", "a nav { }", "nav { } with the link colour set inside it"]
      answer: 0
      fault: logic
      misconception: space-means-both
      explain: "A space means inside, so nav a is the links within a nav. A comma, as in nav, a, means and: it styles the nav and every link on the page. a nav is the other way round: a nav inside a link."
  - check:
      type: bug
      code: page.html#bug
      answer: 5
      fault: logic
      misconception: color-reaches-links
      text: "Sam wants white menu links on the navy header. The links are still blue, and there is no error. Click the line that causes it."
      explain: "Line 5 picks the nav, not its links. The colour reaches the nav's own words, but each link keeps its blue. The selector needs to name the links: nav a."
```

### Which links change?

Look at the rule, then at each link.

### The selector for the menu

A space, a comma or a different order?

### White links that stay blue

Sam's rule is on the nav.

## Modify

```step
stage: modify
insight: "The pattern is parent, space, tag: the same shape styles the links in any part of a page."
try: { playground: html, starter: "page.html#modify", height: 460 }
tasks:
  - hint:
      - "Add a line inside the `nav a` rule."
      - "`text-decoration: none;` removes the underline."
    check: { type: code, text: "Remove the underline from the menu links only.", rules: { contains: ["nav a {", "text-decoration: none;"] } }
    expected: page.html#sol-underline
  - hint:
      - "Use the same shape for the footer: write the part first, then a space, then the tag."
      - "`footer a { color: gray; }`"
    check: { type: code, text: "Make the links in the footer gray.", rules: { contains: ["footer a {", "color: gray;"] } }
    expected: page.html#sol-footer
```

### No underline in the menu

The link in the paragraph keeps its underline.

### Footer links

Pick only the links inside the `<footer>`.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 480 }
hint:
  - "Start with the header: one rule for the navy background and white text."
  - "Then a rule for the menu links only. The link in the paragraph must not change."
  - "Add `text-decoration: none;` to the menu links, or `list-style: none;` on the `ul` if you want no bullets."
check:
  type: code
  text: "Give the page a dark header and light menu links, and leave the link in the text alone."
  rules: { tags: [style], contains: ["header {", "background-color:", "nav a {"] }
expected: page.html#sol-make
```

Style this club page: a dark header, light menu links that fit it, and the link in the text left as it is.

```teacher
summary: Students pick only the links inside a nav with a descendant selector, and find out that a colour on the nav does not reach the links, and that a space means inside.
time: 40
timing: "Predict and Run 10 min · Investigate 12 min · Modify 8 min · Make 10 min"
goals:
  - I can write nav a { } to style only the links inside a nav.
  - I can say that a space between selectors means inside.
  - I can explain why a colour on the nav does not change the links.
before: |
  Read the unit primer "Layout and components" first, then do the Make task yourself in the playground (about 5 minutes).

  A **descendant selector** is two selectors with a space between: `nav a` picks every `a` anywhere inside a `nav`. A link keeps its own colour until a rule names it, which is why `nav { color: white; }` leaves the menu blue. `:hover` is shown as a line to copy for now, not taught: it means "while the pointer is over it".
running:
  - "Predict and Run: most students say white. Blue on navy is hard to read, which is the reason menus need their own rule. Add the nav a rule and let them see the link in the paragraph stay blue."
  - "Investigate: the trace has four links and one rule. The question about the comma is last lesson's group selector, read against the new one: comma means and, space means inside."
  - "Modify and Make: the same shape for the footer. The Make check ticks on a header rule, a background colour and the nav a rule. Look at the page for the paragraph link staying blue."
stuck:
  - see: The menu links do not change.
    ask: Does the rule name the links, or only the nav?
    fix: "Write nav a { color: white; } with a space between nav and a. A rule on the nav alone leaves the links blue."
  - see: Every link on the page changes.
    ask: Is there a comma between nav and a, or only the a?
    fix: Use a space, not a comma, and keep the nav in front of the a.
  - see: The menu is dark text on the dark header.
    ask: Which rule sets the link colour?
    fix: "Add color: white; to the nav a rule, or pick a light colour such as lightyellow."
stretch: "Use nav a:hover with a background-color to make a link light up when the pointer is over it. Copy the line from the Run table and change it."
support: "Give students the Modify starter and do the first task together on the board: the part first, then a space, then the tag."
leads: "Next lesson looks at why some elements start a new line and others sit in a line, which a menu needs to run across the page. Class idea: find three menus on websites you use and say what colour their links are."
exit:
  q: "A page has a link in the nav and a link in a paragraph. Which does nav a { color: white; } change?"
  a: "Only the link in the nav. The space means inside, so the link in the paragraph is not picked."
explain: |
  The video and the picture show the same steps:

  1. All the links start blue, in the menu and in the text.
  2. `nav a` picks only the links inside the nav. The space means inside.
  3. The link in the paragraph keeps its look.
  4. `nav a:hover` changes a link while the pointer is over it. Copy this line for now.

  In the picture, the menu links are crimson and the link in the paragraph is blue.
solutions:
  step-4#t1: page.html#sol-underline
  step-4#t2: page.html#sol-footer
  step-5: page.html#sol-make
struggle: "Reading nav a as both. Ask which of the two words names the element that changes, and what the first word does."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner what colour the menu links are.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Count the votes before anyone runs it. Ask someone who chose white why the header's colour would reach the links. The idea to land: a link has its own colour."
    - at: end
      kind: activity
      title: Which links change?
      minutes: 4
      do: |
        Swap pages with a partner. Without running them, point to every link that your partner's menu rule changes, and every one it leaves alone.
      notes: "Listen for students who include the links in the text. Ask what the space in the selector means."
```

```code page.html#plain
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

```code page.html#trace
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

```code page.html#bug
<style>
  header {
    background-color: navy;
  }
  nav {
    color: white;
  }
</style>
<header>
  <nav>
    <a href="https://example.com/home">Home</a>
    <a href="https://example.com/results">Results</a>
  </nav>
</header>
```

```code page.html#modify
<style>
  header {
    background-color: navy;
    color: white;
  }
  nav a {
    color: white;
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

```code page.html#sol-underline
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

```code page.html#sol-footer
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

```code page.html#make
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

```code page.html#sol-make
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

```code page.html#explain-start
<style>
</style>
<nav>
  <a href="https://example.com/home">Home</a>
  <a href="https://example.com/results">Results</a>
</nav>
<p>Read the <a href="https://example.com/results">results</a>.</p>
```

```code page.html#explain
<style>
  nav a {
    color: crimson;
  }
  nav a:hover {
    text-decoration: underline;
  }
</style>
<nav>
  <a href="https://example.com/home">Home</a>
  <a href="https://example.com/results">Results</a>
</nav>
<p>Read the <a href="https://example.com/results">results</a>.</p>
```
