---
order: 10
unit: parts
node: AC9TDI10K02 n2
moveId: page-sections
reviews: [list-items, attribute-link, css-rule]
introduces: [semantic]
assumes: [list, link, css-rule]
title: Name the parts of a page
summary: Name the top, menu, content and bottom of a page with header, nav, main, section and footer, and find out why they change nothing you can see.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8131
  url: http://127.0.0.1:8131/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", boxes: 1, zoom: 1.6 }
  caption: "Section tags name the parts of a page"
  clip:
    - caption: "<header> is the top of the page: the title, and often the menu."
    - type: { into: HTML code, text: "<header>\n  <h1>Chess club</h1>\n  <nav>\n    <ul>\n      <li><a href=\"https://example.com/rules\">Rules</a></li>\n    </ul>\n  </nav>\n</header>\n", append: true }
    - caption: "<main> holds the page's main content."
    - type: { into: HTML code, text: "<main>\n  <p>We meet on Wednesdays.</p>\n</main>\n", append: true }
    - caption: "<footer> is the bottom: contact details and small print."
    - type: { into: HTML code, text: "<footer>\n  <p>Contact us</p>\n</footer>", append: true }
    - expect: { selector: "#preview-text", contains: "Contact us" }
    - caption:
        text: "They look like plain text. Their names tell screen readers what each part is."
        say: "They look like plain text, but their names tell screen readers what each part is."
    - wait: 2500
hook: "Every website has the same parts: a top bar, a menu, the content, a footer. Screen readers let people jump straight to each one."
---
Most pages are built from the same parts: a top, a menu, the content and a bottom. Five tags give those parts their names, and the tags you already know go inside them.

## Predict

```step
stage: predict
code: page.html#swap
insight: "Students expect header, nav and footer to change the look or position; they only name the parts."
check:
  type: predict
  q: "after.html wraps the same words in header, nav, main, section and footer tags. What changes on the page?"
  options:
    - "Nothing you can see"
    - "The header and footer get coloured bars"
    - "The footer moves to the bottom of the screen"
    - "The list of links turns into a row menu"
  fault: logic
  misconception: semantic-tags-look
  actual: "Nothing you can see. These tags look like no tag at all; their names say what each part is."
```

Compare the two files. They hold the same words, but `after.html` has five new tags. What changes on the page?

## Run

```step
stage: run
code: page.html#after
try: { playground: html, starter: "page.html#after", height: 460, boxes: true }
insight: "Section tags change nothing on screen; Boxes shows the named parts."
check: { type: reflect, text: "I can explain why these tags change nothing you can see." }
unlocks: [page-parts]
```

Compare with your prediction. **Boxes** is on, so you can see the named parts. Switch it off: the page looks like plain text.

| Code | What it does | Why |
|---|---|---|
| `<header> … </header>` | Names the top of the page | Usually the site name and the menu. It looks like plain text; the name is the point |
| `<nav> … </nav>` | Names the main menu of links | The links inside are an ordinary list. `nav` does not turn them into a bar |
| `<main> … </main>` | Names the main content | One per page. A screen reader can jump straight past the menu to it |
| `<section> … </section>` | Names one part of the content | Usually starts with its own heading |
| `<footer> … </footer>` | Names the bottom of the page | Contact details and small print |
| nothing looks different | The names are not for the eye | Screen readers and search engines use them to find each part. Looks come from rules, as for any other tag |

## Investigate

```step
stage: investigate
code: page.html#after
insight: "Each tag names one part of a page, and naming is for screen readers and search engines, not for looks."
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
      explain: "These tags name the parts of a page. They add no look of their own; rules decide how each part looks."
  - check:
      type: question
      q: "If <header> looks the same as no tag at all, why use it?"
      options:
        - "Screen readers and search engines can tell what each part is"
        - "It makes the text bigger"
        - "It moves the part to the top of the page by itself"
        - "The page will not load without it"
      answer: 0
      fault: logic
      misconception: semantic-tags-look
      feedback:
        - null
        - "Look at the page you ran: did any text get bigger? What did the names add?"
        - "A header written lower in the code stays where it is written. The name does not move it."
        - "The first page in this course had no header, and it loaded fine."
      explain: "A screen reader can jump straight to the menu or the main content, and a search engine knows which part is which. Your code is easier to read too."
```

### Match the parts

A whole page, named part by part.

### Why name the parts?

They look the same as no tag at all.

## Modify

```step
stage: modify
insight: "Wrap the right words in the right named tag: the page looks the same, but its parts now have names."
try: { playground: html, starter: "page.html#modify", height: 460, boxes: true }
tasks:
  - hint:
      - "The contact line is at the bottom of the page. Which tag names the bottom?"
      - "Put `<footer>` before the contact paragraph and `</footer>` after it."
    check: { type: code, text: "Name the bottom of the page: put the contact line in a footer.", rules: { tags: [footer] } }
    expected: page.html#sol-footer
  - hint:
      - "The list of links is the menu. Which tag names the main menu?"
      - "Put `<nav>` before the `<ul>` and `</nav>` after its closing `</ul>`."
    check: { type: code, text: "Name the menu: put the list of links in a nav.", rules: { tags: [footer, nav] } }
    expected: page.html#sol-nav
  - hint:
      - "`<main>` goes around the content, and `<section>` goes around one part of it, inside the main."
      - "Put the `<h2>` and its paragraph inside a section, and the section inside a main."
    check: { type: code, text: "Name the content: put the heading and its paragraph in a section inside a main.", rules: { tags: [footer, nav, main, section] } }
    expected: page.html#sol-main
```

### Name the bottom

Put the contact line in a `<footer>`.

### Name the menu

Put the list of links in a `<nav>`. Turn Boxes on and off: the page looks the same.

### Name the content

Put the heading `When we meet` and its paragraph in a `<section>`, and the section in a `<main>`.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "A page's parts hold lists and links, and rules colour them: a slip in any one shows."
check:
  type: question
  q: "The header should be navy with white text, but its words have vanished. Also, Rules should be a link, but nothing happens when you click it. Which two changes fix both?"
  options:
    - "Write background-color in the header rule, and put the word Rules between <a> and </a>"
    - "Write header as .header in the rule, and put the word Rules between <a> and </a>"
    - "Write background-color in the header rule, and put an href on the <li> tag"
    - "Add a semicolon after navy, and put the address between <a> and </a>"
  answer: 0
  shuffle: false
  feedback:
    - null
    - ".header would pick elements with class=\"header\". The tag is <header>, so the selector is just header."
    - "The href belongs in the <a> tag, and the words people click go between <a> and </a>."
    - "Navy already has its semicolon. Look at the property name: is background-colour one the browser knows? And the address goes in href, not between the tags."
  explain: "The browser ignores a property it does not know, so the header stays white and the white words vanish. The words people click go between <a> and </a>; here they sit outside an empty link."
```

Two slips, one in the CSS and one in the menu.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 480, boxes: true }
hint:
  - "The title and the list of links go in `<header>`, with the list inside a `<nav>`."
  - "The heading and the paragraph about Tuesdays go in `<main>`, inside a `<section>`. The contact line goes in `<footer>`."
  - "Every opening tag needs its closing tag. Boxes shows whether your parts nest the way you meant."
check:
  type: code
  text: "Name the parts: a header, a nav holding a list of links, a main with a section, and a footer."
  rules: { tags: [header, nav, ul, li, a, main, section, footer] }
expected: page.html#sol-make
```

This club homepage is all plain text. Name its parts with `<header>`, `<nav>` (around the list of links), `<main>` with one `<section>`, and `<footer>`. Then change the words to a club of your own.

```teacher
summary: Students name the parts of a page with header, nav, main, section and footer, and learn that the names change nothing you can see but help screen readers and search engines.
time: 40
timing: "Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min"
goals:
  - I can name the top, menu, content and bottom of a page with header, nav, main, section and footer.
  - I can explain why these tags change nothing you can see, and why they still matter.
  - I can put a list of links inside a nav.
before: |
  Do the Make task yourself (about 5 minutes).

  **Section tags** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) add no look of their own. Their value is meaning: screen readers let people jump straight to the menu or the main content, and search engines know which part is which. Students expect a header to look like a header; **Boxes** shows the named parts and the plain page side by side.
running:
  - "Predict: most students expect something to change. Compare the two files, then run it with **Boxes** on to see the named parts, and off to see nothing."
  - "Investigate: the match task names each part. For why it matters, ask a student to imagine using a page only by listening to it."
  - "Modify: footer first, then nav, then main with a section inside. With Boxes on, ask which box each part sits in."
  - "Mix it up: two slips on one page, one in a rule and one in the menu. Ask which line each would change before they click."
  - "Make: several answers are fine as long as the parts nest sensibly. A link list goes inside `<nav>`, and the `<nav>` inside the `<header>`."
stuck:
  - see: The page looks the same after adding header or footer.
    ask: Should it look different?
    fix: No. Section tags name parts; rules change how they look.
  - see: A closing tag such as </header> does not match its opening tag.
    ask: Did you close the part you opened last?
    fix: Close tags in the reverse order you opened them, so each part sits whole inside the next.
  - see: The links are not in a list, or sit outside the nav.
    ask: Is the <ul> inside the <nav>?
    fix: Put the whole <ul> between <nav> and </nav>.
stretch: "Add a second section with its own heading, and a rule that gives the header and the footer different background colours."
support: "Give students the Make starter with Boxes on and do the first part together: find the title and the list of links, and put them in a header."
leads: "Next lesson uses these parts: a menu in the nav that jumps to each section of a long page. Accessibility: these tags are called landmarks, and they are part of web accessibility guidelines. Class idea: compare a page built from these parts with one built from plain text, using a screen reader or the browser's accessibility view."
exit:
  q: "A student wraps a menu in <nav> and nothing changes on screen. Did it work? Why?"
  a: "Yes. nav looks like no tag at all, but it tells browsers and screen readers that the part is the main menu, so people can jump to it."
explain: |
  The video and the picture show the same steps (Boxes is on, so each named part shows as a box):

  1. `<header>` is the top of the page: the title, and often the menu (`<nav>`).
  2. `<main>` holds the page's main content. `<section>` is one part of it, with its own heading.
  3. `<footer>` is the bottom: contact details and small print.
  4. They look like plain text. Their names tell browsers and screen readers what each part is.
solutions:
  step-4#t1: page.html#sol-footer
  step-4#t2: page.html#sol-nav
  step-4#t3: page.html#sol-main
  step-6: page.html#sol-make
struggle: "Section tags change nothing you can see, which feels like a mistake. Ask what header and footer are for if not looks; Boxes shows the named parts."
class:
  activities:
    - at: predict
      kind: discussion
      title: What will change?
      minutes: 3
      do: |
        Compare the two files with your partner. Decide what changes on the page, then vote.
      notes: "Most will pick a coloured bar or a row menu. Run it and keep the vote on the board: the surprise is the lesson."
    - at: end
      kind: activity
      title: Label a real page
      minutes: 5
      do: |
        Open a school or club website. Sketch it as boxes and write which of header, nav, main, section and footer each box would be.
      notes: "Look for the menu inside the top part, and for pages where the footer holds the contact details."
```

```code page.html#swap
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

```code page.html#after
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

```code page.html#modify
<h1>Chess club</h1>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/rules">Rules</a></li>
</ul>
<h2>When we meet</h2>
<p>Wednesdays at lunch.</p>
<p>Contact the teacher in charge.</p>
```

```code page.html#sol-footer
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

```code page.html#sol-nav
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

```code page.html#sol-main
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

```code page.html#review
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

```code page.html#make
<h1>Robotics Club</h1>
<ul>
  <li><a href="https://example.com/home">Home</a></li>
  <li><a href="https://example.com/join">Join</a></li>
</ul>
<h2>Build robots every Tuesday</h2>
<p>No experience needed.</p>
<p>Contact: robots@example.com</p>
```

```code page.html#sol-make
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

```code page.html#explain
<header>
  <h1>Chess club</h1>
</header>
<main>
  <p>We meet on Wednesdays.</p>
</main>
<footer>
  <p>Contact us</p>
</footer>
```
