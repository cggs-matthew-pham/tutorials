---
order: 1
unit: text
node: AC9TDI10K02 n1
moveId: tag-pairs
introduces: [heading, paragraph]
title: Tags label text
summary: Label text with tags, and find out that the browser ignores line breaks in your code.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8124
  url: http://127.0.0.1:8124/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: { ref: page.html#explain, boxes: true }
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "", zoom: 1.7 }
  caption: "Tags label text, and line breaks in the code do not show"
  clip:
    - caption: "A tag is a label. <h1> labels the main heading."
    - type: { into: HTML code, text: "<h1>Sports day</h1>\n" }
    - caption: "<p> opens a paragraph and </p> closes it."
    - type: { into: HTML code, text: "<p>Bring a hat\nand water.</p>\n", append: true }
    - expect: { selector: "#preview-text", contains: "Bring a hat" }
    - caption: "Two lines in the code, but one line on the page."
    - wait: 1500
    - caption: "A new paragraph needs its own <p>."
    - type: { into: HTML code, text: "<h1>Sports day</h1>\n<p>Bring a hat</p>\n<p>and water.</p>" }
    - expect: { selector: "#preview-text", contains: "and water." }
    - wait: 1500
hook: "Every website you have visited, from your school page to a shop, starts as text with tags like these."
---
Every web page is text with **tags** in it. A tag is a label: `<h1>` labels the main heading and `<p>` labels a paragraph. Most tags come in pairs, an opening tag `<p>` and a closing tag `</p>` with a slash, wrapped around the text they label.

## Predict

```step
stage: predict
code: page.html#sports
insight: "Students expect the page to copy the code's line breaks; committing to a number first makes the surprise stick."
check:
  type: predict
  q: "How many lines of normal text (not counting the heading) will the page show?"
  options:
    - "4 lines, one for each line of text in the code"
    - "3 lines"
    - "2 lines"
    - "1 line"
  fault: logic
  misconception: code-lines-show
  actual: "2 lines. The browser ignores line breaks in the code, so the three lines of the first paragraph join into one. Each <p> starts a new paragraph."
```

Read the code. Each `<p>` starts a paragraph and `</p>` ends it. How many lines of normal text will the page show?

## Run

```step
stage: run
code: page.html#sports
try: { playground: html, starter: "page.html#sports", height: 360 }
insight: "Tags, not line breaks, shape the page: a new paragraph needs its own <p>."
check: { type: reflect, text: "I can explain why the line breaks in my code did not show on the page." }
```

Compare the page with your prediction. Then put the cursor after `Bring a hat` and press Enter a few times: the page does not change. Now give `Bring a hat and water.` its own `<p>` and `</p>`, and watch it move to a new line.

| Code | What it does | Why |
|---|---|---|
| `<h1>Sports day</h1>` | Makes the main heading | `<h1>` opens it and `</h1>` closes it. The tag says what the text is; the browser picks the big, bold look |
| `<h2>When</h2>` | Makes a smaller heading for one section | `<h1>` to `<h6>` are all headings: the number is the level, and 1 is the biggest |
| `<p>Races start at 9 am.</p>` | Makes one paragraph | Each `<p>` starts a new paragraph, with a gap above it |
| the three lines inside the first `<p>` | Show as one line | The browser ignores line breaks in the code. Only a new `<p>` starts a new line |

## Investigate

```step
stage: investigate
code: page.html#parts
insight: "Tags, not line breaks in the code, decide what the page shows."
tasks:
  - check:
      type: match
      q: "Match each part of the page with its job."
      pairs:
        - ["<h1>Sports day</h1>", "the main heading of the page"]
        - ["<h2>What to bring</h2>", "a heading for one section"]
        - ["<p> … </p>", "a paragraph"]
      explain: "Each tag says what its text is. The browser chooses the look: big and bold for headings, plain text with a gap for paragraphs."
  - check:
      type: question
      q: "A page has <p>Bring a hat.</p><p>Bring water.</p> all on one line of code. How many paragraphs does the page show?"
      options: ["1, because it is one line of code", "2, because there are two <p> tags", "1, because there is no gap in the code", "It shows an error"]
      answer: 1
      fault: logic
      misconception: code-lines-show
      explain: "Tags decide, not lines. Two <p> tags make two paragraphs, even when they are on one line of code."
  - check:
      type: bug
      code: page.html#enter
      answer: 4
      fault: logic
      misconception: code-lines-show
      text: "Sam wants Bring a towel. and Races start at 9 am. on separate lines, but the page shows them on one line. Click the line that causes it."
      explain: "Line 4 starts a new sentence inside the same paragraph, and the browser ignores the break in the code. End the paragraph with </p> and start the next with <p>."
```

### Match the parts

What does each tag in this page do?

### One line of code

Tags, not lines of code, make paragraphs.

### Sam's notice

Sam pressed Enter and expected a new line.

## Modify

```step
stage: modify
insight: "Changing a working page one small step at a time, and checking the page after each change."
try: { playground: html, starter: "page.html#modify", height: 360 }
tasks:
  - hint: "Change only the words between the tags. Leave the tags as they are."
    check: { type: reflect, text: "I changed the event and the day, and the page still looks right." }
  - hint:
      - "End the first paragraph with `</p>` after `Friday.`"
      - "Then start the second with `<p>` before `Bring`."
    check: { type: code, text: "Split the one paragraph into two.", rules: { contains: ["</p><p>"] } }
    expected: page.html#sol-split
  - hint:
      - "A section heading uses `<h2>`, just like `<h1>` but smaller."
      - "Put each `<h2>` on its own line, just above the paragraph it describes."
    check: { type: code, text: "Add an <h2> heading above each paragraph.", rules: { tags: [h2] } }
    expected: page.html#sol-sections
```

### Change the event

Make this a notice for a different event on a different day.

### Two paragraphs

Split the long paragraph so the date and what to bring are separate.

### Add two sections

Add an `<h2>` heading above each paragraph: `When` above the first, `What to bring` above the second.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 400 }
hint:
  - "Start with the `<h1>` title, then add one section at a time: an `<h2>`, then its `<p>`."
  - "Check the page after each tag you add. If the page looks wrong, look for a tag with a missing `<` or `>`, or a closing tag without its slash."
check:
  type: code
  text: "Write a notice with a title, two headings and a paragraph under each."
  rules: { tags: [h1, h2, p] }
expected: page.html#sol-make
```

Write a notice for an event at your school (a concert, a fair, a match): an `<h1>` title, two sections with `<h2>` headings, and a paragraph in each.

```teacher
summary: Students label text with headings and paragraphs, and find out that the browser ignores line breaks in the code.
time: 40
timing: "Predict and Run 10 min · Investigate 12 min · Modify 10 min · Make 8 min"
goals:
  - I can use <h1>, <h2> and <p> to say what each piece of text is.
  - I can explain why line breaks in my code do not show on the page.
  - I can start a new paragraph with its own <p> and </p>.
before: |
  Read the unit primer "HTML structure in 5 minutes" first, then do the Make task yourself in the playground (about 5 minutes).

  The surprise for students: pressing Enter in the code does not make a new line on the page. Only a new `<p>` does. A **tag** is a label in angle brackets, like `<p>`. Most tags come in pairs: an opening tag `<p>` and a closing tag `</p>` with a slash, wrapped around the text they label.
running:
  - "Predict and Run: most students say 4 lines. The page shows 2, because the browser joins the lines of one paragraph. Let them press Enter in the code and see that nothing changes, then add a `<p>`."
  - "Investigate: the match task is about meaning, not looks: `<h1>` means the main heading. The one-line question is the key idea, that the tags decide and not the lines of code."
  - "Modify and Make: one change at a time, check the page each time. The Make check ticks when the page uses `<h1>`, `<h2>` and `<p>`."
stuck:
  - see: Text the student typed on a new line runs on from the line before.
    ask: Which tag starts a new paragraph?
    fix: Wrap each paragraph in its own <p> and </p>. Pressing Enter in the code does not change the page.
  - see: "A tag shows on the page as text, such as <h2 or h2>."
    ask: Does every tag have both of its angle brackets?
    fix: Every tag needs < and >, and a closing tag needs the slash, as in </h2>.
  - see: Everything after a heading is big and bold.
    ask: Where does the heading end?
    fix: Add the missing closing tag, such as </h2>, straight after the heading words.
stretch: "Add a third section with an <h2> heading, and try <h3> and <h4> to see what the heading numbers do."
support: "Give students the Modify starter and ask them only to change the words between the tags, then add one <h2>. Point to the Reference drawer for each tag."
leads: "Next lesson puts tags inside other tags, so a word can be important inside a paragraph, and finds out what the browser does when a tag is missing. Class idea: show a news website and ask students to spot the headings and paragraphs."
exit:
  q: "A student presses Enter in the middle of a paragraph in their code, but the page does not change. Why, and how do they start a new line?"
  a: "The browser ignores line breaks in the code. To start a new paragraph, end the first with </p> and start the next with <p>."
explain: |
  The video and the picture show the same steps:

  1. A **tag** is a label. `<h1>` labels the main heading.
  2. `<p>` opens a paragraph and `</p>` closes it.
  3. Two lines of text in the code show as one line on the page: the browser ignores line breaks in the code.
  4. A new paragraph needs its own `<p>`.

  In the picture, Boxes is on: each box is a tag, and the paragraphs are separate boxes.
solutions:
  step-4#t1: page.html#sol-change
  step-4#t2: page.html#sol-split
  step-4#t3: page.html#sol-sections
  step-5: page.html#sol-make
struggle: "Seeing that line breaks in the code do nothing. Let the Predict surprise land, and ask which tag starts a new line rather than fixing it."
class:
  activities:
    - at: predict
      kind: discussion
      title: Vote, then argue
      minutes: 3
      do: |
        Decide with your partner how many lines of normal text the page will show.
        Hold up 1, 2, 3 or 4 fingers for your answer.
      notes: "Count the votes before anyone runs it. Ask one pair from each answer to say why. Most will say 4: that is the idea the lesson turns around."
    - at: end
      kind: activity
      title: Be the browser
      minutes: 4
      do: |
        Swap notices with a partner. Without running them, point to each paragraph and say where one ends and the next begins.
      notes: "Listen for students who point at lines of code instead of at the tags. Ask which tag told them where the paragraph ended."
```

```code page.html#sports
<h1>Sports day</h1>
<p>Sports day is on Friday.
Bring a hat
and water.</p>
<p>Races start at 9 am.</p>
```

```code page.html#parts
<h1>Sports day</h1>
<h2>When</h2>
<p>Sports day is on Friday.</p>
<h2>What to bring</h2>
<p>Bring a hat and water.</p>
```

```code page.html#enter
<h1>Swimming carnival</h1>
<p>The carnival is on Thursday.</p>
<p>Bring a towel.
Races start at 9 am.</p>
```

```code page.html#modify
<h1>Sports day</h1>
<p>Sports day is on Friday. Bring a hat and water.</p>
```

```code page.html#sol-change
<h1>Swimming carnival</h1>
<p>The swimming carnival is on Thursday. Bring a towel.</p>
```

```code page.html#sol-split
<h1>Swimming carnival</h1>
<p>The swimming carnival is on Thursday.</p><p>Bring a towel.</p>
```

```code page.html#sol-sections
<h1>Swimming carnival</h1>
<h2>When</h2>
<p>The swimming carnival is on Thursday.</p>
<h2>What to bring</h2>
<p>Bring a towel.</p>
```

```code page.html#make
<h1>My event</h1>
```

```code page.html#sol-make
<h1>Spring concert</h1>
<h2>When and where</h2>
<p>The concert is on Wednesday at 6 pm in the hall.</p>
<h2>Who is playing</h2>
<p>The Year 7 band, the choir and the string group.</p>
```

```code page.html#explain
<h1>Sports day</h1>
<p>Bring a hat.</p>
<p>Bring water.</p>
```
