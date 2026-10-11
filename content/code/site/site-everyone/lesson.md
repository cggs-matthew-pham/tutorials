---
order: 1
unit: real
title: "Pages for everyone"
summary: "Check a page works for everyone: pictures described with alt, headings as the page's outline, labels joined to their boxes, links that say where they go, readable colours; then test it with a classmate."
language: html
voice: { name: af_heart, speed: 1.1 }
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8130
  url: http://127.0.0.1:8130/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.6 }
  caption: "A page works for everyone when its tags say what each part is"
  clip:
    - caption: "This page looks fine. A screen reader finds a picture with no words."
    - wait: 1200
    - caption: "alt describes the picture for anyone who can't see it."
    - type: { into: HTML code, text: " alt=\"A gold trophy\"", after: "<img src=\"trophy.svg\"" }
    - caption: "The box has no name. A label, joined by for and id, gives it one."
    - type: { into: HTML code, text: "<label for=\"name\">Name</label>\n", after: "width=\"80\">\n" }
    - type: { into: HTML code, text: " id=\"name\"", after: "<input" }
    - expect: { selector: "#preview-text", contains: "Name" }
    - caption: "It looks almost the same, and now everyone can use it."
    - wait: 1400
hook: "About one in five people has a disability. A page built with the right tags works for screen readers, keyboards and phones as well as for you."
---
Not everyone uses a page the way you do. Some people hear it through a **screen reader**, which reads the tags aloud; some use only a **keyboard**; some see it small or with poor contrast. A page works for all of them when its tags say what each part is. The checklist:

1. **Pictures** have `alt` text that says what they show (or `alt=""` if they are only decoration).
2. **Headings** are the page's outline: one `<h1>`, then `<h2>`, then `<h3>`, never chosen for their size.
3. **Boxes** have a `<label>` joined by `for` and `id`.
4. **Links** say where they go: not "click here".
5. **Colours** are easy to read: dark text on a light background, or the other way round.
6. **The keyboard** reaches everything: press Tab through the page.

The same list works for a hand-built page, a Bootstrap page or a Vue app: they all end up as tags in the browser.

## Predict

```step
stage: predict
code: page.html#predict
insight: "Students assume a screen reader can see the picture; hearing that it reads the file name makes alt text matter."
check:
  type: predict
  q: "A screen reader reaches the picture, then the link. What does it say?"
  options:
    - "Something like \"trophy dot svg, image\", then \"Click here, link\""
    - "\"A gold trophy\", then \"Library meeting room, link\""
    - "Nothing: it skips pictures and links"
    - "It describes the picture's colours"
  actual: "With no alt text, many screen readers read the file name. And \"Click here\" says nothing about where the link goes, especially when a screen reader lists all the links on a page."
```

Neither the picture nor the link says what it is.

## Run

```step
stage: run
code: page.html#run
try: { playground: html, starter: "page.html#run", height: 420 }
check: { type: reflect, text: "I clicked into the preview and pressed Tab: the link, the box and the button each got a focus outline in turn." }
unlocks: [alt-text, heading-outline]
```

This version passes the checklist. Click into the preview, then press **Tab** again and again: the keyboard moves through the link, the box and the button. Click the word **Name**: the cursor jumps into its box.

## Investigate

```step
stage: investigate
code: page.html#before
picture: page.html#before
insight: "Most fixes are the right tag or attribute, not a new look: alt, heading levels, labels and link text."
tasks:
  - check:
      type: match
      q: "This version looks almost the same but fails the checklist. Match each problem with its fix."
      pairs:
        - ["<img src=\"trophy.svg\"> has no words", "add alt=\"A gold trophy\""]
        - ["<h4>When we meet</h4> comes straight after the h1", "make it an h2, the next level of the outline"]
        - ["<p>Name</p> above the box", "a label with for=\"name\", and id=\"name\" on the input"]
        - ["Click here", "link text that says where it goes: library meeting room"]
      explain: "Each fix is a tag or an attribute that tells the browser what the part is. The page looks the same; it works for more people."
  - check:
      type: bug
      code: page.html#bug
      text: "A screen reader user jumps between headings to find the parts of this page, and hears levels 1, 4, 4: it sounds as if two levels are missing. Click the two lines that are wrong."
      answer: [2, 4]
      fault: design
      misconception: heading-for-size
      explain: "h4 was chosen because it looks small. Headings are the page's outline: the parts under the h1 are h2. Make them smaller with CSS if you want."
```

### Find the fixes

Four problems, four fixes.

### Spot the bug

Headings chosen for their size.

## Modify

```step
stage: modify
insight: "Fixing a page for everyone is small, exact changes to tags and attributes."
try: { playground: html, starter: "page.html#fix", height: 420 }
tasks:
  - hint:
      - "Each picture needs an alt that says what it shows, for someone who can't see it."
      - "Add alt=\"…\" inside each img tag, describing that picture."
    expected: page.html#sol-alt
    check: { type: code, text: "Give both pictures alt text.", rules: { contains: ["star.svg\" alt=\"", "medal.svg\" alt=\""] } }
  - hint:
      - "A label names a box. for on the label and id on the box must match."
      - "Swap each p for a label with for=\"…\", and give its input the same id."
    expected: page.html#sol-labels
    check: { type: code, text: "Give both boxes a label joined with for and id.", rules: { contains: ["<label for=", "<input id="] } }
```

### Describe the pictures

alt for each one.

### Name the boxes

Labels joined to their boxes.

## Make: check your own page

```step
stage: make
insight: "Goals only: apply the checklist to their own page, then test it with a real person."
try: { playground: html, starter: "page.html#make", height: 460 }
check: { type: reflect, text: "I checked my own page against all six points, a classmate tested it, and I fixed the three biggest problems." }
```

Paste in a page you have made, from any course. Then:

1. Go through the **six points** above and fix what you find.
2. **Test it with a classmate.** Give them one job (join the club, find the meeting time, answer the first question) and watch without helping. Then ask them to do it again with only the keyboard. Note every place they hesitated.
3. Fix the **three biggest** problems they found.

## Where this leads

```step
stage: info
check:
  type: question
  q: "Your page passes the checklist and a classmate has tested it. What is the next step to let anyone use it?"
  options: ["Put it online, at an address you can share", "Add more colours", "Turn off the keyboard", "Print it"]
  answer: 0
  explain: "Next lesson: download the page and its files, check the paths, and put it online."
```

Next: **put it online**.
