---
order: 6
unit: links
moveId: image-alt
reviews: [attribute-link]
introduces: [image]
assumes: [attribute, link]
title: Pictures
summary: Show a picture with the img tag, and describe it with alt for anyone who cannot see it.
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
A picture is a file of its own. The page does not hold the picture: it says which file to show, and what the picture is for people who cannot see it.

## Predict

```step
stage: predict
code: page.html#misspelt
insight: "Most students expect the close name to work, or an error; seeing the alt words appear shows what alt is for."
check:
  type: predict
  q: "The picture file is called trophy.svg, but the code says trophey.svg. What will the page show?"
  options:
    - "The trophy anyway: the name is close enough"
    - "An error message"
    - "The words A gold trophy, with a small broken-picture icon"
    - "Nothing at all where the picture should be"
  fault: runtime
  misconception: img-file-name
  actual: "The words A gold trophy (with a broken-picture icon). The browser cannot find a file with that exact name, so it shows the alt words instead."
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

Compare the page with your prediction. The alt words show because the browser cannot find a file called `trophey.svg`. The table says what each part does.

| Code | What it does | Why |
|---|---|---|
| `<img … >` | Shows a picture | `<img>` has no closing tag: there are no words to wrap, so everything it needs is in its attributes |
| `src="trophy.svg"` | Names the picture file | The picture is a separate file. The name, the ending after the dot and the capitals must match the file exactly, or the browser cannot find it |
| `alt="A gold trophy"` | Says what the picture shows | Screen readers read it aloud, and the browser shows it when the picture cannot load. It is not a caption: people who can see the picture do not see it |
| `width="100"` | Sets the picture's width in pixels | Another attribute. Without it the picture shows at its own size |

## Investigate

```step
stage: investigate
code: page.html#parts
insight: "alt is for people who cannot see the picture, not a caption; src has to match the file exactly."
tasks:
  - check:
      type: question
      q: "When does a person who can see the picture also see its alt words?"
      options:
        - "Under the picture, as its caption"
        - "Only when the picture does not load, or when a screen reader reads the page aloud"
        - "When they hold the mouse over the picture"
        - "At the top of the page, as a title"
      answer: 1
      fault: logic
      misconception: alt-is-caption
      explain: "alt is not shown beside a picture that loads. It stands in for the picture when it cannot be seen. A caption is a separate line of text, written as a paragraph."
  - check:
      type: question
      q: "Which alt is best for a photo of the relay team holding the trophy?"
      options:
        - "alt=\"image\""
        - "alt=\"relay-photo.jpg\""
        - "alt=\"The Owls relay team holding the trophy\""
        - "No alt at all"
      answer: 2
      fault: logic
      misconception: alt-is-caption
      explain: "alt should say what the picture shows, as you would describe it to someone on the phone. A word such as image, or the file name, tells them nothing."
  - check:
      type: bug
      code: page.html#wrongfile
      answer: 4
      fault: runtime
      misconception: img-file-name
      text: "The trophy shows, but the medal does not: only its alt words appear. The picture file is called medal.svg. Click the line that causes it."
      explain: "Line 4 asks for medal.png, but the file is medal.svg. The name, the ending after the dot and the capitals must all match the file exactly."
```

### Where does alt show?

Think about who needs the words.

### Good alt text

Imagine describing the picture to someone on the phone.

### The missing medal

One picture does not show.

## Modify

```step
stage: modify
insight: "src picks the file, alt describes it, width sizes it: each is its own attribute, changed on its own."
try: { playground: html, starter: "page.html#modify", height: 420 }
tasks:
  - hint:
      - "The file name is the part inside the quotes after `src=`."
      - "The picture to show is `medal.svg`. Match the name exactly."
    check: { type: code, text: "Show the medal picture instead of the trophy.", rules: { contains: ["src=\"medal.svg\""] } }
    expected: page.html#sol-src
  - hint:
      - "`alt` is the attribute with the words in quotes."
      - "Describe the medal as you would to someone on the phone: A silver medal."
    check: { type: code, text: "Change the alt words to A silver medal.", rules: { contains: ["alt=\"A silver medal\""] } }
    expected: page.html#sol-alt
  - hint: "Change the number inside the quotes after `width=`."
    check: { type: code, text: "Make the picture 200 wide.", rules: { contains: ["width=\"200\""] } }
    expected: page.html#sol-width
```

### Change the picture

Show `medal.svg` instead of the trophy. Only the file name changes.

### Change the alt words

The alt words still describe a trophy. Change them to `A silver medal`.

### Change the size

Make the picture `200` wide.

## Mix it up

```step
stage: investigate
insight: "A picture inside a link combines the image tag with an attribute on the tag around it."
check:
  type: parsons
  code: page.html#review
  extra: ["</img>"]
  text: "Put the lines in order so that clicking the trophy picture opens the results. One line is not needed."
  explain: "The link's opening tag, with its href, comes first; the picture goes inside it; </a> closes the link. An <img> has no closing tag, so </img> is not needed."
```

Make the picture itself the thing people click.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 420 }
hint:
  - "Pick one picture. Its file name goes in `src`."
  - "Write `alt` as if describing the picture to someone on the phone."
check:
  type: code
  text: "Make a club page with a title, a picture with alt, and a paragraph."
  rules: { tags: [h1, img, p], contains: ["alt=\""] }
expected: page.html#sol-make
```

Make a page for a school club: a title, a picture, and a paragraph about when it meets. The pictures you can use are `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg` and `music.svg`.

```teacher
summary: Students show a picture with img, and learn that src must match the file name exactly and that alt describes the picture for people who cannot see it.
time: 40
timing: "Predict and Run 10 min · Investigate 8 min · Modify 8 min · Mix it up 4 min · Make 10 min"
goals:
  - I can show a picture with <img src="..." alt="...">.
  - I can say why the file name in src must match exactly.
  - I can write alt words that describe what the picture shows.
before: |
  Read the unit primer "Lists, links and pictures in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes).

  An `<img>` tag has no closing tag, and the picture is a separate file. `src` names the file and `alt` describes it. The pictures students can use without uploading are `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg` and `music.svg`. Two ideas to land: a file name that is nearly right still fails, and alt is not a caption.
running:
  - "Predict and Run: many students pick the first option, that the close name still works. Let them run it and see the alt words. Fixing the name comes in Modify."
  - "Investigate: the first question is the one for alt-is-caption. Ask who actually reads alt. Then they apply it to the relay photo and the missing medal."
  - "Modify: three single changes: the file, the alt words, then the size. Misspell the name once on purpose and ask what shows."
  - "Mix it up: the picture inside a link needs the attribute lesson. Ask where the href goes."
  - "Make: the check ticks when the page has a heading, a picture with alt and a paragraph; read their alt words as a class."
stuck:
  - see: The picture shows as words and a small broken icon.
    ask: Is the file name in src spelt exactly like the file, with the same ending?
    fix: Copy the file name from the list of pictures, including .svg.
  - see: The student typed alt words but sees none under the picture.
    ask: When do people see alt?
    fix: alt only shows when the picture cannot load, and screen readers read it. A caption would be a paragraph under the picture.
  - see: Words after the picture are inside the tag, or the picture vanishes.
    ask: Does the img tag end with > and have no closing tag?
    fix: End the tag with > straight after the last attribute and start the next element after it.
stretch: "Add a second picture with its own alt, and make one of the pictures a link to a page."
support: "Give students the Modify starter and do the first task together, then change the alt words and the width."
leads: "Next lesson names some of the elements with a class so that a CSS rule can style only those. Class idea: ask what a person using a screen reader hears when the alt says image."
exit:
  q: "A student's picture does not show, only a few words. What do they check first, and what are the words?"
  a: "They check that the file name in src matches the file exactly. The words are the alt text, which shows when the picture cannot load."
explain: |
  The video and the picture show the same steps:

  1. `<img>` shows a picture and has no closing tag.
  2. `src` names the picture file, and the name must match exactly.
  3. `alt` says what the picture shows. With a wrong `src`, people see the alt words instead.
solutions:
  step-4#t1: page.html#sol-src
  step-4#t2: page.html#sol-alt
  step-4#t3: page.html#sol-width
  step-6: page.html#sol-make
struggle: "Believing that a nearly right file name will do. Let them see the alt words, then ask what the browser can compare the name to."
class:
  activities:
    - at: predict
      kind: discussion
      title: Close enough?
      minutes: 3
      do: |
        With your partner, decide what the page shows when one letter of the file name is wrong.
        Hold up 1, 2, 3 or 4 fingers for your answer.
      notes: "Take a vote before running. Ask what the browser has to compare the name with. The aim is that the name must be exactly the file's."
    - at: end
      kind: activity
      title: Describe it to me
      minutes: 4
      do: |
        Read your alt words to a partner without showing the picture. They say which picture you used.
      notes: "A good alt lets the partner pick the right picture. If they cannot, ask what is missing from the words."
```

```code page.html#misspelt
<h2>Winners</h2>
<img src="trophey.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

```code page.html#modify
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

```code page.html#sol-src
<h2>Winners</h2>
<img src="medal.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

```code page.html#sol-alt
<h2>Winners</h2>
<img src="medal.svg" alt="A silver medal" width="100">
<p>Well done, Owls!</p>
```

```code page.html#sol-width
<h2>Winners</h2>
<img src="medal.svg" alt="A silver medal" width="200">
<p>Well done, Owls!</p>
```

```code page.html#parts
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>Well done, Owls!</p>
```

```code page.html#wrongfile
<h2>Winners</h2>
<img src="trophy.svg" alt="A gold trophy" width="100">
<p>First place: Owls</p>
<img src="medal.png" alt="A silver medal" width="100">
<p>Second place: Hawks</p>
```

```code page.html#review
<a href="https://example.com/results">
  <img src="trophy.svg" alt="A gold trophy">
</a>
```

```code page.html#make
<!-- The pictures you can use: trophy.svg, medal.svg, book.svg, ball.svg, star.svg, music.svg -->
```

```code page.html#sol-make
<h1>Soccer club</h1>
<img src="ball.svg" alt="A black and white soccer ball" width="120">
<p>Training is on Thursday after school on the top oval.</p>
```

```code page.html#explain
<p>src="trophey.svg" (spelt wrong):</p>
<img src="trophey.svg" alt="A gold trophy">
<p>src="trophy.svg":</p>
<img src="trophy.svg" alt="A gold trophy" width="100">
```
