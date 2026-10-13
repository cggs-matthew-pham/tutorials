---
order: 11
unit: parts
moveId: id-target
reviews: [page-sections]
introduces: [id, link-in-page]
assumes: [attribute, link, semantic]
title: A place on the page
summary: Give a heading a name with id, then link to it with a # address, so a menu can jump down a long page.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8135
  url: http://127.0.0.1:8135/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", zoom: 1.6 }
  caption: "An id names a place, and a # link jumps to it"
  clip:
    - caption: "An id gives one element a name. This heading is named results."
    - type: { into: HTML code, text: "<h2 id=\"results\">Results</h2>\n<p>The Owls won.</p>\n", append: true }
    - caption: "A link whose href starts with # jumps to the element with that name."
    - type: { into: HTML code, text: "<a href=\"#results\">Jump to Results</a>\n", append: true }
    - expect: { selector: "#preview-text", contains: "Jump to Results" }
    - caption: "The # is the difference. Without it, the browser looks for another page."
    - wait: 2500
hook: "Long pages such as Wikipedia articles open with a list of contents, and every entry jumps down the page to its part."
---
A link can go to another page, or to a place on the same page. On a long page, a menu of links at the top lets people jump straight to the part they want.

## Predict

```step
stage: predict
code: page.html#jump
insight: "Students read href as an address to another page; committing first shows what the # and the matching id do."
check:
  type: predict
  q: "Someone clicks Results in the menu. What does the page do?"
  options:
    - "Scrolls down so the Results heading is at the top"
    - "Opens a different web page called results"
    - "Shows only the Results part and hides the rest"
    - "Nothing: the whole page is already on screen"
  fault: logic
  misconception: hash-missing
  actual: "It scrolls to the Results heading. The link's href names a place on this page, and the heading with that id is the place."
```

Read the code. The menu links look like links you know, but their `href` values are new. Someone clicks Results. What does the page do?

## Run

```step
stage: run
code: page.html#jump
try: { playground: html, starter: "page.html#jump", height: 320 }
insight: "A matching name in the id and in the href is all that joins the link to its place."
check: { type: reflect, text: "I can say what has to match for a link to jump to a heading." }
unlocks: [jump-link]
```

Compare the page with your prediction. Click each link in the menu, then scroll back up. Then change `id="results"` to `id="result"` and click Results again.

| Code | What it does | Why |
|---|---|---|
| `<h2 id="results">` | Gives this heading the name `results` | `id` is an attribute, like `href`. The name marks a place on the page, and changes nothing you can see |
| `<a href="#results">` | Jumps to the element named `results` | The `#` means "on this page". Without it, the browser looks for another page called `results` |
| the same name in both places | Joins the link to its place | The names must match exactly, capitals too. If nothing has that id, the link does nothing |
| each id used once | Keeps every name pointing at one element | A link can only jump to one place, so two elements with one id means it goes to the first |
| the links in a `<nav>` | Makes the menu for a long page | Part names and a menu go together: `<nav>` holds the links, each part has an id |

## Investigate

```step
stage: investigate
insight: "Each id names one element, and a jump link needs both the # and the exact name."
tasks:
  - check:
      type: question
      q: "Two sections both have id=\"join\", and the menu has a link to #join. Where does the link go?"
      options:
        - "To the first one"
        - "To the second one"
        - "To both, one after the other"
        - "Nowhere, because the name is used twice"
      answer: 0
      fault: logic
      misconception: id-repeats
      feedback:
        - null
        - "The browser looks down the page for the name and stops at the first element it finds."
        - "A link jumps to one place. It cannot visit two."
        - "The browser does not check. It takes the first element with that id, so the second can never be reached."
      explain: "An id names one element. The browser takes the first match, so the second Join part cannot be reached by a link. Give each part its own name."
  - check:
      type: bug
      code: page.html#nohash
      answer: 4
      fault: logic
      misconception: hash-missing
      text: "Rules and Join jump down the page, but clicking Results tries to open a different page. Click the line that causes it."
      explain: "Line 4 has href=\"results\" with no #. Without the #, the browser looks for a page called results instead of an element with that id. It should be href=\"#results\"."
```

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

### The link that leaves

One link in the menu does not jump.

## Mix it up

```step
stage: investigate
insight: "The menu of links goes in a nav, and the nav is part of the header."
check:
  type: parsons
  code: page.html#review
  extra: ["</main>"]
  text: "Put the lines in order to make a header with the title and, inside a nav, a list of two links. One line is not needed."
  explain: "The header holds the title and the nav. The nav holds the list, and each link sits in its own item. </main> would close a part this page has not opened."
```

This mixes the last lessons: the parts of a page, and a list of links.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 440 }
hint:
  - "Give each heading an id: `<h2 id=\"rules\">`. Then add the `<nav>` with a list of links under the title."
  - "Each link is `<a href=\"#rules\">`, with the same name as the id, and the `#` in front."
  - "Click each link to test it. A link that does nothing has a name that does not match."
check:
  type: code
  text: "Add a nav in the header with three jump links, and give the three headings the ids rules, results and join."
  rules:
    tags: [nav, ul, li, a]
    contains:
      - "id=\"rules\""
      - "id=\"results\""
      - "id=\"join\""
      - "href=\"#rules\""
      - "href=\"#results\""
      - "href=\"#join\""
expected: page.html#sol-make
```

This page has three parts but no menu. Add a `<nav>` with a list of three links under the title, inside the `<header>`. Each link jumps to one of the headings: give them the ids `rules`, `results` and `join`.

```teacher
summary: Students name a place on a page with id and link to it with href="#name", so a menu can jump to each part of a long page.
time: 40
timing: "Predict and Run 10 min · Investigate 10 min · Mix it up 4 min · Make 16 min"
goals:
  - I can give a heading a name with id.
  - I can link to it with href starting with #.
  - I can explain why each id is used once and why the # is needed.
before: |
  Do the Make task yourself (about 5 minutes).

  An **id** is an attribute that gives one element a name. A link whose `href` starts with `#` goes to the element with that name on the same page. The # is the whole difference between "this page" and "another page". Pages need to be long enough to scroll, or the jump is invisible: make the preview small or add a paragraph.
running:
  - "Predict: most students pick the first option, but some think the link opens a new page, because every link they have written so far did. Run it and click each link."
  - "Run: the id change to `result` is the key moment. The link stops working and nothing says why; matching names are all the browser has."
  - "Investigate: the shared id has no visible symptom except the second part never being reached. Ask them to find it by clicking."
  - "Make: the check needs the six exact fragments. If it does not tick, compare each href with its id letter by letter."
stuck:
  - see: Clicking a menu link does nothing.
    ask: Is the name in the href exactly the name in the id, with a # at the front of the href only?
    fix: Make the two names match letter for letter. Only the href has the #.
  - see: Clicking a menu link tries to open another page.
    ask: Does the href start with #?
    fix: Put a # in front of the name in the href.
  - see: The id has a # in it, as in id="#join".
    ask: Where does the # go?
    fix: The # belongs only in the href. The id is just the name.
stretch: "Add a fourth part with its own id and menu link, and a link at the bottom of the page that jumps back to the top (give the heading an id)."
support: "Give students the Make starter with the ids already added, and ask them only to build the nav and the links."
leads: "Next lesson uses id again: a form label points at its box by id, so clicking the label finds the box. Class idea: find a long page (a Wikipedia article) and look at how its contents list jumps down the page."
exit:
  q: "A menu link has href=\"results\" and a heading has id=\"results\". The link does not jump. What is missing, and why?"
  a: "The #. href=\"#results\" means the element named results on this page; without it the browser looks for another page called results."
explain: |
  The video and the picture show the same steps:

  1. An `id` gives one element a name. Here the heading is named `results`.
  2. A link whose `href` starts with `#` jumps to the element with that name.
  3. The `#` is the difference. Without it, the browser looks for another page.

  Each name belongs to one element, so no two elements share an id.
solutions:
  step-5: page.html#sol-make
struggle: "Matching the name in the href and the id exactly, and remembering the # in the href only. Have them click every link to test it."
class:
  activities:
    - at: predict
      kind: discussion
      title: Where will it go?
      minutes: 3
      do: |
        Look at the code. Point to where you think the page will scroll when someone clicks Results, and tell your partner how you know.
      notes: "Listen for students who point at the link itself. Ask them what in the heading tells the browser this is the place."
    - at: end
      kind: activity
      title: Contents list
      minutes: 5
      do: |
        Swap pages with a partner. Click every link in their menu. Tell them which link does nothing, and read the name in the link and in the heading aloud.
      notes: "Most failures are a missing #, a different spelling, or a capital letter. Let the partner find the mismatch."
```

```code page.html#jump
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

```code page.html#nohash
<nav>
  <ul>
    <li><a href="#rules">Rules</a></li>
    <li><a href="results">Results</a></li>
    <li><a href="#join">Join</a></li>
  </ul>
</nav>
<h2 id="rules">Rules</h2>
<p>Think before you move.</p>
<h2 id="results">Results</h2>
<p>The Owls won.</p>
<h2 id="join">Join</h2>
<p>Come on Wednesday.</p>
```

```code page.html#review
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

```code page.html#make
<header>
  <h1>Chess club</h1>
</header>
<main>
  <section>
    <h2>Rules</h2>
    <p>Think before you move. Shake hands at the end.</p>
  </section>
  <section>
    <h2>Results</h2>
    <p>The Owls won the autumn ladder.</p>
  </section>
  <section>
    <h2>Join</h2>
    <p>Come to room 4 on Wednesday.</p>
  </section>
</main>
```

```code page.html#sol-make
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

```code page.html#explain
<nav>
  <ul>
    <li><a href="#results">Results</a></li>
  </ul>
</nav>
<h2 id="results">Results</h2>
<p>The Owls won.</p>
```
