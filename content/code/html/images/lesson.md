---
order: 3
unit: structure
title: Images
summary: Show pictures with the img tag, and describe them with alt for people who cannot see them.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8126
  url: http://127.0.0.1:8126/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: true
explainClip:
  query: { code: "", zoom: 1.7 }
  caption: "src names the picture file, and alt describes it"
  clip:
    - type: { into: HTML code, text: "<h2>Winners</h2>\n" }
    - caption: "<img> shows a picture. It has no closing tag."
    - type: { into: HTML code, text: "<img\n", append: true }
    - caption: "src names the picture file..."
    - type: { into: HTML code, text: "  src=\"trophey.svg\"\n", append: true }
    - caption: "...and alt says what the picture shows."
    - type: { into: HTML code, text: "  alt=\"A gold trophy\">", append: true }
    - caption: "The file name is spelt wrong, so people see the alt words instead."
    - wait: 2500
    - caption: "Fix the name, and the picture appears."
    - type: { into: HTML code, text: "<h2>Winners</h2>\n<img\n  src=\"trophy.svg\"\n  alt=\"A gold trophy\">" }
    - expect: { selector: "#preview-text", contains: "Winners" }
    - wait: 2000
hook: "Every photo, icon and logo on a website is an img tag, and its alt text is what a screen reader says aloud."
---
A picture is a file of its own. The page does not hold the picture: it says which file to show and where.

## Predict

```step
stage: predict
code: page.html#misspelt
insight: "Most students expect an error or a blank space; seeing the alt text appear explains what alt is for."
check:
  type: predict
  q: "The picture file is called trophy.svg, but the code says trophey.svg. What will the page show?"
  options:
    - "The trophy anyway: the name is close enough"
    - "An error message"
    - "The words A gold trophy, with a small broken-picture icon"
    - "Nothing at all where the picture should be"
  actual: "The words A gold trophy (with a broken-picture icon). The browser cannot find the file, so it shows the alt words instead."
```

`<img>` shows a picture. `src` names the picture file, and `alt` describes it. Read the code. What will the page show?

## Run

```step
stage: run
code: page.html#misspelt
try: { playground: html, starter: "page.html#misspelt", height: 380 }
insight: "src must match the file name exactly; alt is what people get when they cannot see the picture."
check: { type: reflect, text: "I can explain what alt is for." }
unlocks: [img-image]
```

Compare the page with your prediction. Then fix the file name to `trophy.svg` and watch the picture appear.

## Investigate

```step
stage: investigate
code: page.html#parts
insight: "An image is one tag with attributes and no closing tag; each attribute does one job."
tasks:
  - check:
      type: match
      q: "Match each part with its job."
      pairs:
        - ["<img", "starts a picture (no closing tag)"]
        - ["src=\"trophy.svg\"", "which picture file to show"]
        - ["alt=\"A gold trophy\"", "words for people who cannot see the picture"]
        - ["width=\"120\"", "how wide to show it, in pixels"]
      explain: "Each attribute does one job. The picture itself is a separate file; the tag only says which file and how to show it."
  - check:
      type: question
      q: "Which alt is best for a photo of the relay team holding the trophy?"
      options: ["alt=\"image\"", "alt=\"photo.png\"", "alt=\"The Owls relay team holding the trophy\"", "No alt at all"]
      answer: 2
      explain: "alt should say what the picture shows, as you would describe it to someone on the phone. A screen reader reads it aloud."
  - check:
      type: bug
      code: page.html#wrongfile
      answer: 4
      fault: runtime
      misconception: img-file-name
      text: "The trophy shows, but the medal does not: only its alt words appear. The picture file is called medal.svg. Click the line that causes it."
      explain: "Line 4 asks for medal.png, but the file is medal.svg. The name, the ending after the dot and the capitals must all match the file exactly."
  - picture: { ref: page.html#combos, boxes: true }
    check:
      type: question
      q: "In this code, what happens when someone clicks the trophy?"
      options: ["Nothing: pictures cannot be clicked", "The link opens, because the picture is inside the <a> tag", "The picture gets bigger", "The alt words appear"]
      answer: 1
      explain: "An <img> can go inside other tags. Inside <a>, the picture becomes the thing people click. Inside <li>, it sits in a list item beside the words."
```

### Match the parts

What does each part of this image tag do?

### Good alt text

Imagine describing the picture to someone who cannot see it.

### The missing medal

One picture does not show.

### Pictures inside other tags

A picture can go inside a link (click the picture to follow it) or inside a list item, next to words.

```html
<a href="https://example.com/results"><img src="trophy.svg" alt="A gold trophy: see the results" width="80"></a>
<ul>
  <li><img src="medal.svg" alt="A silver medal" width="40"> Second place</li>
  <li><img src="ball.svg" alt="A soccer ball" width="40"> Soccer final</li>
</ul>
```

## Modify

```step
stage: modify
insight: "Changing an attribute's value, then adding a second image with its own alt."
try: { playground: html, starter: "page.html#modify", height: 420 }
tasks:
  - hint: "Add width=\"100\" inside the img tag, before the >."
    check: { type: code, text: "Show the trophy 100 pixels wide.", rules: { contains: ["width=\"100\""] } }
    expected: page.html#sol-size
  - hint:
      - "Copy the whole img line, then change src and alt."
      - "The file is medal.svg. Describe the picture in alt."
    check: { type: code, text: "Add the medal picture with its own alt.", rules: { contains: ["src=\"medal.svg\"", "alt=\""] } }
    expected: page.html#sol-medal
  - hint:
      - "Put `<a href=\"...\">` just before the trophy's img tag, and `</a>` just after it."
    check: { type: code, text: "Make the trophy picture a link to the results.", rules: { contains: ["<a href=\"https://example.com/results\"><img"] } }
    expected: page.html#sol-link
```

### Make it smaller

Show the trophy 100 pixels wide.

### Add second place

Add the medal picture (`medal.svg`) with a good `alt`, and a line for second place: the Hawks.

### Make the trophy a link

Wrap the trophy picture in a link to `https://example.com/results`, so clicking the picture opens the results.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 420 }
hint:
  - "Pick one of the four pictures. Its file name goes in src."
  - "Write alt as if describing the picture to someone on the phone."
check:
  type: code
  text: "Make a club page with a title, a picture with alt, and a paragraph."
  rules: { tags: [h1, img, p], contains: ["alt=\""] }
expected: page.html#sol-make
```

Make a page for a school club: a title, a picture, and a paragraph about when it meets. The pictures you can use are `trophy.svg`, `medal.svg`, `book.svg` and `ball.svg`.

## Add a picture to the newsletter

```step
stage: modify
try: { playground: html, starter: "page.html#newsletter", height: 420 }
insight: "A real page uses images beside its text, each with alt."
expected: page.html#sol-newsletter
```

Add the book picture (`book.svg`) under the `Library news` heading, 120 pixels wide, with an `alt` that describes it.
