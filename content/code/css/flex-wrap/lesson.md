---
order: 8
unit: layout
moveId: fit-any-width
reviews: [flex-space]
introduces: []
assumes: [flex, flex-options, image, box]
title: Fit any width
summary: Let the items in a row drop to a new line when there is no room, so the same page fits a phone and a laptop.
language: html
app:
  command: node "$REPO_ROOT/tools/serve.mjs" "$REPO_ROOT/dist/_playground-html" 8261
  url: http://127.0.0.1:8261/index.html
  ready: HTML code
  layout: full
pacing:
  keyDelayMs: 45
explainPicture: page.html#explain
voice: { name: af_heart, speed: 1.1 }
explainClip:
  query: { code: "@page.html#explain-start", zoom: 1.5 }
  caption: "flex-wrap lets a row drop items onto new lines when it runs out of room"
  clip:
    - caption: "Six cards in one row. There is not room for them."
    - wait: 1500
    - caption: "flex-wrap: wrap lets items move to a new line."
    - type: { into: HTML code, text: "    flex-wrap: wrap;\n", after: "display: flex;\n" }
    - caption: "Now the cards that do not fit drop down."
    - wait: 1500
    - caption: "flex: 1 shares the spare room on each line."
    - type: { into: HTML code, text: "    flex: 1;\n", after: ".item {\n" }
    - expect: { selector: "#preview-text", contains: "Music" }
    - caption: "min-width is the narrowest a card may get before it wraps."
    - wait: 2000
hook: "The same web page has to work on a phone, a school laptop and a wide monitor, and a wrapping row does that without a different page for each."
---
A row of items has a width it fits, and a screen has a width it offers. A phone offers little, and a laptop a lot. A row that wraps fits both.

## Predict

```step
stage: predict
code: page.html#row
insight: "Students expect items to move down by themselves when a row is full; without flex-wrap they stay in one line."
check:
  type: predict
  q: "Six cards, each at least 140px wide, sit in a row inside the narrow preview. What happens?"
  options:
    - "The cards that do not fit drop onto new lines by themselves"
    - "The cards stay in one line and run off the right edge of the preview"
    - "Every card shrinks until all six fit in the preview"
    - "Only the cards that fit are shown, and the rest are hidden"
  fault: logic
  misconception: wrap-shrinks
  actual: "The cards stay in one line and run off the right edge. A flex row keeps its items in one line unless you allow wrapping, and min-width stops the cards shrinking below 140px."
```

`flex-wrap`, `flex: 1` and `min-width` are new. Read the code: `min-width: 140px` means a card will not get narrower than 140px. Six cards need much more room than the preview has. What happens?

## Run

```step
stage: run
code: page.html#row
try: { playground: html, starter: "page.html#row", height: 460 }
insight: "flex-wrap: wrap moves items to a new line when the row is full, flex: 1 shares the space on each line, and min-width sets how narrow an item may get."
check: { type: reflect, text: "I can explain why the cards drop to a new line and what min-width decides." }
unlocks: [wrapping-row]
```

Compare with your prediction, and scroll the preview sideways to see the cards that run off. Then add `flex-wrap: wrap;` to the `.gallery` rule. Next, change `min-width` from `140px` to `220px`, then delete three cards: the number of cards on each line changes. The preview is narrow, so changing the number of cards or the minimum width is how you see what a phone and a laptop would do.

| Code | What it does | Why |
|---|---|---|
| `display: flex;` | Puts the cards in a row | It goes on the box that holds them, as before |
| `flex-wrap: wrap;` | Lets cards drop to a new line when the line is full | Without it, a flex row keeps every item in one line, even when they do not fit |
| `flex: 1;` | Makes each card grow to share the spare room on its line | Without it, the last card on a line leaves an empty gap at the end |
| `min-width: 140px;` | Stops a card getting narrower than 140px | A card that would be narrower drops to the next line instead of being squashed |
| `gap: 12px;` | Puts 12px between cards, across and down | It spaces the lines as well as the cards in a line |

## Investigate

```step
stage: investigate
code: page.html#row
insight: "A fixed width is the same on every screen. A wrapping row with flex: 1 and a min-width changes how many items fit on a line."
tasks:
  - check:
      type: match
      q: "Match each line with what it does."
      pairs:
        - ["flex-wrap: wrap", "a full line sends the next item to a new line"]
        - ["flex: 1", "each item grows to share the spare room on its line"]
        - ["min-width: 140px", "the narrowest an item may be before it wraps"]
        - ["gap: 12px", "space between items, across and down"]
      explain: "Wrap decides when a new line starts, min-width decides how narrow an item may get before that happens, and flex: 1 fills the room that is left."
  - check:
      type: question
      q: "A line of the gallery is 450px wide, each card has min-width: 140px, and the gap is 12px. How many cards fit on one line?"
      options: ["2 cards", "3 cards", "4 cards", "All 6 cards"]
      answer: 1
      fault: logic
      explain: "Three cards need 3 x 140 + 2 x 12 = 444px, which fits in 450px. Four would need 4 x 140 + 3 x 12 = 596px. On a wider screen, more fit on a line, with the same CSS."
  - check:
      type: question
      code: page.html#fixed
      q: "Three cards have width: 400px with a 20px gap, and look right on a 1300px laptop. What is true on a 360px phone?"
      options:
        - "400px is the same on every screen, so three cards need about 1240px: far more than a phone has"
        - "400px shrinks by itself to fit whatever the screen offers"
        - "px means a percentage of the screen, so the cards stay in proportion"
        - "It looks right on the laptop, so it looks right on every screen"
      answer: 0
      fault: logic
      misconception: fixed-width-fits
      explain: "A fixed width is the same on every screen. Looking right on one screen tells you nothing about another. A min-width with flex: 1 lets the row fit three cards on a laptop and one on a phone."
  - check:
      type: bug
      code: page.html#wrapitem
      answer: 7
      fault: logic
      misconception: flex-on-items
      text: "The cards should wrap onto new lines, but they stay in one line, and there is no error. Click the line that causes it."
      explain: "Line 7 puts flex-wrap on each card. Wrapping is a job for the box that holds the items: .gallery { flex-wrap: wrap; }."
```

### Match the lines

Which line does which job?

### How many fit

Count the cards that fit on a line.

### A fixed width

A fixed width is the same everywhere.

### The wrap in the wrong place

The cards stay in one line.

## Modify

```step
stage: modify
insight: "A min-width keeps wrapped cards from being squashed, and a bigger min-width puts fewer cards on each line."
try: { playground: html, starter: "page.html#modify", height: 460 }
tasks:
  - hint:
      - "The cards are squashed into tall, narrow columns with words broken across lines."
      - "Add `min-width: 120px;` to the `.item` rule. A card that would be narrower drops to the next line."
    check: { type: code, text: "Stop the cards getting narrower than 120px.", rules: { contains: ["min-width: 120px;"] } }
    expected: page.html#sol-minwidth
  - hint:
      - "A wider minimum means fewer cards fit on each line."
      - "Change `120px` to `180px` in the `.item` rule."
    check: { type: code, text: "Make the cards at least 180px wide, so fewer fit on a line.", rules: { contains: ["min-width: 180px;"] } }
    expected: page.html#sol-wider
```

### Stop the squash

The six cards share one line and get thin. Give each a minimum width of `120px`.

### Fewer per line

Change the minimum width to `180px` and see how many cards fit on a line now.

## Mix it up

```step
stage: investigate
code: page.html#review
insight: "The wrapped cards need the space between them set on the row with gap, the same as a row that does not wrap."
check:
  type: question
  q: "The cards wrap into lines, but they touch each other, across and down. Which change adds space between all of them?"
  options:
    - "Add gap: 12px; to the .gallery rule"
    - "Add gap: 12px; to the .item rule"
    - "Add justify-content: center; to the .gallery rule"
    - "Add align-items: center; to the .gallery rule"
  answer: 0
  fault: logic
  misconception: flex-on-items
  explain: "gap goes on the row and spaces the items along each line and between the lines. justify-content moves a group of items, but flex: 1 has already filled every line, and align-items works across a line. gap on an item does nothing."
```

The cards wrap, but they touch.

## Make

```step
stage: make
try: { playground: html, starter: "page.html#make", height: 460 }
hint:
  - "A gallery is a box that holds the items, and each picture is inside an item. The row rules go on the gallery."
  - "Start with a `<div class=\"gallery\">` holding at least six `<div class=\"item\">` boxes, each with an `img` (and its `alt`)."
  - "Then `.gallery` with `display: flex;`, `flex-wrap: wrap;` and a `gap`, and `.item` with `flex: 1;` and a `min-width`."
check:
  type: code
  text: "Make a gallery of at least six pictures that wraps, with items that share the space and have a minimum width."
  rules: { tags: [img], contains: ["display: flex;", "flex-wrap: wrap;", "flex: 1;", "min-width:"] }
expected: page.html#sol-make
```

Make a gallery for a school event: a heading and at least six pictures, each with good alt text. It should fit a phone and a laptop: the pictures wrap onto new lines and share the room on each line. Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`.

```teacher
summary: "Students let a flex row wrap with flex-wrap, share each line with flex: 1 and set a min-width, and find out that a fixed width does not change with the screen."
time: 40
timing: "Predict and Run 10 min · Investigate 12 min · Mix it up 3 min · Modify 7 min · Make 8 min"
goals:
  - "I can use flex-wrap: wrap so a row drops items onto new lines."
  - "I can use flex: 1 and min-width so items share the room and do not get squashed."
  - "I can explain why a fixed width does not fit every screen."
before: |
  Do the Make task yourself in the playground (about 5 minutes).

  A **flex row** keeps all its items in one line unless it is told it may wrap. `flex-wrap: wrap` on the row allows new lines. `flex: 1` on the items makes them share the spare room on their line. `min-width` is the narrowest an item may be: once a line cannot fit another item at that width, the item drops to the next line. Together they make a layout that fits a phone and a laptop with no separate versions.

  The preview pane is narrow, so students do not need to resize the browser. They change the number of cards or the `min-width` and see the same effect a screen of a different width would give.
running:
  - "Predict and Run: most students expect the cards to drop down by themselves. They run off the right edge instead. Add the wrap line, then change min-width to see the number per line change."
  - "Investigate: the 450px question is arithmetic with the gap. Ask students to work it out before choosing. The fixed-width question separates 'looks right on my laptop' from 'is right everywhere'."
  - "Mix it up: the cards touch each other. The fix is the same one as last lesson, on the row."
  - "Modify and Make: if a gallery squashes, ask what the smallest card should be."
stuck:
  - see: The cards run off the edge and do not wrap.
    ask: Which rule has flex-wrap?
    fix: Put flex-wrap wrap in the rule of the box that holds the cards, the same rule as display flex.
  - see: The cards are thin, with words broken into pieces.
    ask: What stops a card getting narrower?
    fix: Add a min-width to the card rule. A card that would be narrower drops to the next line.
  - see: One card stretches across a whole line by itself.
    ask: How many cards are on that line?
    fix: With flex 1 a lone card on a line grows to fill it. That is expected. A smaller min-width puts more cards on each line.
stretch: "Give the gallery a width of 300px, then 600px, and write down how many cards fit on a line each time. Explain the numbers with min-width and gap."
support: "Give students the Run page and ask them only to add the wrap line and to change the number of cards. Tell them what each change does to the cards on a line."
leads: "Next lesson uses a wrapping row for a hero and a row of cards, and shows that one rule can style any number of copies. Class idea: open a school website and drag the window narrower; ask which parts wrap."
exit:
  q: "A gallery uses flex: 1 and min-width: 150px. Why does it show four cards on a line on a laptop but one on a phone?"
  a: "A line holds as many 150px cards as fit, and flex: 1 stretches them to fill it. A phone only has room for one, so the others wrap."
explain: |
  The video and the picture show the same steps:

  1. Six cards in one flex row do not fit, and stay in one line.
  2. `flex-wrap: wrap` lets cards drop to a new line when there is no room.
  3. `flex: 1` makes the cards on each line share the spare room.
  4. `min-width` is the narrowest a card may get before it drops to the next line.

  In the picture, the preview is narrow, so the cards sit in lines of two or three. A wider screen holds more on each line, with the same rules.
solutions:
  step-4#t1: page.html#sol-minwidth
  step-4#t2: page.html#sol-wider
  step-6: page.html#sol-make
struggle: "Believing the browser moves items down by itself. Ask what the row has been told about wrapping before saying."
class:
  activities:
    - at: predict
      kind: discussion
      title: Fit or fall off
      minutes: 3
      do: |
        With your partner, say what the preview does with six cards that cannot all fit.
        Hold up 1, 2, 3 or 4 fingers for the option you chose.
      notes: "Take a vote before running. Ask someone who chose the first option what tells the row it may start a new line. The idea to land: it has to be allowed."
    - at: end
      kind: activity
      title: Squeeze the line
      minutes: 5
      do: |
        On a strip of paper, draw a line 450px wide at a scale of your choice.
        Cut out six cards at 140px and fit as many as you can with 12px gaps. Then try 220px cards.
      notes: "Check that students count gaps as well as cards. Ask what changes on a phone-width strip."
```

```code page.html#row
<style>
  .gallery {
    display: flex;
    gap: 12px;
  }
  .item {
    flex: 1;
    min-width: 140px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item"><img src="trophy.svg" alt="Trophy" width="100"><p>Trophy</p></div>
  <div class="item"><img src="medal.svg" alt="Medal" width="100"><p>Medal</p></div>
  <div class="item"><img src="book.svg" alt="Book" width="100"><p>Book</p></div>
  <div class="item"><img src="ball.svg" alt="Ball" width="100"><p>Ball</p></div>
  <div class="item"><img src="star.svg" alt="Star" width="100"><p>Star</p></div>
  <div class="item"><img src="music.svg" alt="Music" width="100"><p>Music</p></div>
</div>
```

```code page.html#fixed
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  .item {
    width: 400px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item"><p>Robots</p></div>
  <div class="item"><p>Coding</p></div>
  <div class="item"><p>Drones</p></div>
</div>
```

```code page.html#wrapitem
<style>
  .gallery {
    display: flex;
    gap: 12px;
  }
  .item {
    flex-wrap: wrap;
    border: 2px solid teal;
  }
</style>
<div class="gallery">
  <div class="item">One</div>
  <div class="item">Two</div>
  <div class="item">Three</div>
</div>
```

```code page.html#review
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
  }
  .item {
    flex: 1;
    min-width: 140px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item"><p>Robots</p></div>
  <div class="item"><p>Coding</p></div>
  <div class="item"><p>Drones</p></div>
  <div class="item"><p>Design</p></div>
</div>
```

```code page.html#modify
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .item {
    flex: 1;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item">Robot building on Tuesdays</div>
  <div class="item">Coding games at lunch</div>
  <div class="item">Drone flying on the oval</div>
  <div class="item">Design a logo this term</div>
  <div class="item">Music for the robots</div>
  <div class="item">Chess for the clever</div>
</div>
```

```code page.html#sol-minwidth
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .item {
    flex: 1;
    min-width: 120px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item">Robot building on Tuesdays</div>
  <div class="item">Coding games at lunch</div>
  <div class="item">Drone flying on the oval</div>
  <div class="item">Design a logo this term</div>
  <div class="item">Music for the robots</div>
  <div class="item">Chess for the clever</div>
</div>
```

```code page.html#sol-wider
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .item {
    flex: 1;
    min-width: 180px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item">Robot building on Tuesdays</div>
  <div class="item">Coding games at lunch</div>
  <div class="item">Drone flying on the oval</div>
  <div class="item">Design a logo this term</div>
  <div class="item">Music for the robots</div>
  <div class="item">Chess for the clever</div>
</div>
```

```code page.html#make
<!-- Your gallery. Pictures: trophy.svg, medal.svg, book.svg, ball.svg, star.svg, music.svg -->
```

```code page.html#sol-make
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .item {
    flex: 1;
    min-width: 120px;
    border: 1px solid gray;
    padding: 6px;
  }
</style>
<h1>Our club's year</h1>
<div class="gallery">
  <div class="item"><img src="trophy.svg" alt="Trophy" width="80"><p>Trophy</p></div>
  <div class="item"><img src="medal.svg" alt="Medal" width="80"><p>Medal</p></div>
  <div class="item"><img src="book.svg" alt="Book" width="80"><p>Book</p></div>
  <div class="item"><img src="ball.svg" alt="Ball" width="80"><p>Ball</p></div>
  <div class="item"><img src="star.svg" alt="Star" width="80"><p>Star</p></div>
  <div class="item"><img src="music.svg" alt="Music" width="80"><p>Music</p></div>
</div>
```

```code page.html#explain-start
<style>
  .gallery {
    display: flex;
    gap: 12px;
  }
  .item {
    min-width: 140px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item"><img src="trophy.svg" alt="Trophy" width="100"><p>Trophy</p></div>
  <div class="item"><img src="medal.svg" alt="Medal" width="100"><p>Medal</p></div>
  <div class="item"><img src="book.svg" alt="Book" width="100"><p>Book</p></div>
  <div class="item"><img src="ball.svg" alt="Ball" width="100"><p>Ball</p></div>
  <div class="item"><img src="star.svg" alt="Star" width="100"><p>Star</p></div>
  <div class="item"><img src="music.svg" alt="Music" width="100"><p>Music</p></div>
</div>
```

```code page.html#explain
<style>
  .gallery {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .item {
    flex: 1;
    min-width: 140px;
    border: 2px solid teal;
    padding: 8px;
  }
</style>
<div class="gallery">
  <div class="item"><img src="trophy.svg" alt="Trophy" width="100"><p>Trophy</p></div>
  <div class="item"><img src="medal.svg" alt="Medal" width="100"><p>Medal</p></div>
  <div class="item"><img src="book.svg" alt="Book" width="100"><p>Book</p></div>
  <div class="item"><img src="ball.svg" alt="Ball" width="100"><p>Ball</p></div>
  <div class="item"><img src="star.svg" alt="Star" width="100"><p>Star</p></div>
  <div class="item"><img src="music.svg" alt="Music" width="100"><p>Music</p></div>
</div>
```
