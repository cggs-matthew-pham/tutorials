---
order: 2
unit: layers
node: AC9TDI10K02 n3
assumes: [web-layers]
title: Why keep them apart
summary: "Keeping content, structure and presentation apart lets each change on its own: one style sheet restyles a whole site, the same page fits a phone or a laptop, and a screen reader can tell a blind reader what each part is. A page that fakes its structure with looks works for nobody but sighted readers."
language: maths
voice: { name: bf_emma, speed: 1.05 }
hook: "Two pages look almost the same. To a blind student using a screen reader, one of them has no headings at all. How?"
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-board" 8487
  url: http://127.0.0.1:8487/index.html
  readySelector: ".wdview"
  layout: full
explainPicture: { ref: web.yml#explain-pic, caption: "Page B: the same words as the club page, styled with big bold text instead of headings and a list." }
explainClip:
  query: { code: "@web.yml#explain", fresh: 1, id: explain }
  caption: "What a screen reader hears"
  say: "Two pages that look almost the same."
  clip:
    - click: "Screen reader, off"
    - caption: { text: "Page A: \"Heading level 1\", \"Navigation\", \"List, 3 items\". The structure is read out.", say: "On page A, the screen reader announces headings, the menu and a list." }
    - wait: 1600
    - click: Page B
    - expect: { selector: "#gsum", contains: "Page B" }
    - caption: { text: "Page B looks similar, but it is just lines of text: no headings, no list, nothing to jump to.", say: "Page B is just lines of text. The look was faked." }
    - wait: 1800
---
In *Three layers* each layer could change on its own. That isn't just tidy: it decides who can use a page, on what device, and how much work it takes to change a whole site.

## Predict: what the screen reader says

```step
stage: predict
insight: "Committing to what a screen reader announces tests the new move: tools read the structure, not the look."
check:
  type: predict
  q: "Page A marks \"This week\" with a heading tag. Page B makes it big and bold with no heading tag. Both look almost the same. What does a screen reader say for Page B?"
  options: ["Just the words \"This week\", like any other text", "\"Heading level 2: This week\", the same as Page A", "\"Big bold text: This week\"", "Nothing at all"]
  actual: "Just the words. A screen reader reads the structure; on Page B there is no heading to announce, so a blind reader can't jump between sections."
```

## Try: listen to both pages

```step
stage: run
insight: "Hearing both pages through the screen reader settles the prediction: same look, different structure, different experience."
try: { playground: board, starter: "web.yml#run", height: 600 }
check: { type: board, text: "Turn on the screen reader and listen to Page A, then Page B. What is missing from Page B?", when: "j >= 2", explain: "Headings, the navigation and the list. Page B only looks structured." }
```

Was your prediction right?

## Worked example: three reasons

```step
stage: investigate
insight: "Working through three situations models the new move: each benefit comes from one layer changing while the others stay. Sam judges a page by its look, the misconception planted after the method."
tasks:
  - check:
      type: answer
      q: "A school site has 200 pages, all using one style sheet. How many files must change to make every heading green?"
      answer: "1"
      feedback:
        - ["200", "The pages all link to the same style sheet."]
      explain: "One rule in one file: h2 { color: green; } restyles all 200 pages."
  - check:
      type: bug
      code: "working.txt#sam"
      text: "Sam compares Page A and Page B. Click the line where it first goes wrong."
      answer: 4
      fault: logic
      misconception: same-look-same-page
      explain: "Line 4: a screen reader, a search engine and a phone layout use the structure, not the look. Page B's visitors who can't see it get no headings and no list."
  - check:
      type: question
      q: "Why can the same page appear in one column on a phone and two on a laptop?"
      options: ["The presentation changes with the screen size; the content and structure stay the same", "The website keeps a separate copy for phones", "The phone rewrites the HTML", "It can't; phones show the laptop layout"]
      answer: 0
      feedback: [null, "One page, different style rules for different widths.", "The structure isn't touched.", "Most sites do change layout."]
      explain: "CSS can say \"on narrow screens, one column\": a presentation choice."
```

### Separation pays off

```worked
\text{a whole site} :: One style sheet styles every page: change a rule once, every page changes.
\text{a phone} :: The same content and structure; different presentation rules for a narrow screen.
\text{a screen reader} :: It reads the structure aloud (headings, lists, menus) and ignores the look.
\text{editing} :: Writers change content, designers change presentation, without breaking each other's work.
```

Now count the files for the 200-page site.

### Find the mistake

### Phone or laptop

## Vary: one change, many effects

```step
stage: modify
insight: "Each task changes one thing and watches what follows: one CSS rule across a site, the screen width, then the style sheet off with the screen reader on."
try: { playground: board, starter: "web.yml#site", height: 680 }
tasks:
  - starter: "web.yml#site"
    check: { type: board, text: "Change one rule in the style sheet so the headings change colour. Watch the other pages of the site.", when: "c >= 1 and w = 1 and u = 1", explain: "Every page that uses the style sheet changed at once, and no HTML was touched." }
  - starter: "web.yml#phone"
    check: { type: board, text: "Switch to phone width. Did the content or structure change?", when: "v = 1", explain: "No: the same words and tags, laid out narrower. The presentation adapts." }
  - starter: "web.yml#phone"
    check: { type: board, text: "Switch the style sheet off and the screen reader on. Does the screen reader change?", when: "p = 0 and r = 1", explain: "Not at all: it never used the look. Structure is what carries meaning." }
```

### A whole site

### Phone

### No style at all

## Practise: why it matters

```step
stage: practise
insight: "Explaining separation in new situations is the same move in mixed forms, plus a review of the three layers."
tasks:
  - check:
      type: question
      q: "A designer puts <font> and <b> tags all through a 50-page site to make it look right. A year later the school changes its colours. What happens?"
      options: ["Someone edits all 50 pages by hand", "One style sheet change fixes it", "The colours update themselves", "Nothing needs changing"]
      answer: 0
      feedback: [null, "There is no shared style sheet to change.", "The look is written into each page.", "The old colours are written into every page."]
      explain: "With the look mixed into the HTML, every page must be edited. Kept in CSS, it's one change."
  - check:
      type: question
      q: "Which helps a blind student most?"
      options: ["Real headings and lists in the HTML", "Large, colourful text", "More pictures", "A bigger screen"]
      answer: 0
      feedback: [null, "The screen reader ignores size and colour.", "Pictures need text descriptions too.", "They aren't looking at the screen."]
      explain: "The screen reader announces the structure, so headings and lists let them jump around the page."
  - check:
      type: question
      q: "Review: <nav> around the menu links is which layer?"
      options: ["Structure", "Content", "Presentation"]
      answer: 0
      feedback: [null, "The link words are content; the tag says what the part is.", "It doesn't change the look by itself."]
      explain: "It marks the part as navigation: structure."
```

### A site-wide change

### Screen readers

### Review: layers

## Make: fix Page B

```step
stage: make
insight: "Repairing a page whose structure was faked with looks reverses the process: from what each part should be to the tags that say so."
try: { playground: board, starter: "web.yml#make", height: 700 }
hint: ["Turn on the screen reader: what should be headings and a list?", "Swap the bold title lines for `<h1>` and `<h2>`, and the three event lines for a `<ul>` with `<li>` items.", "Take out every `<font>`, `<b>` and `<br>`; the style sheet does the look."]
check: { type: board, text: "Fix Page B's HTML: real headings and a real list, no tags used only for looks, and the same words.", when: "x = 1 and d = 1", explain: "Now the screen reader announces the headings and the list, and the style sheet can make it look like anything. Structure first, looks second." }
```

Then: on a real website, use your browser's reader view. What does it keep, and what does it throw away?
