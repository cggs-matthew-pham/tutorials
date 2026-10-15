---
marp: true
theme: default
html: true
---

# Fit any width

Layout and components · Layout

<!-- Speaker note: Students let a flex row wrap with flex-wrap, share each line with flex: 1 and set a min-width, and find out that a fixed width does not change with the screen. About 40 minutes (Predict and Run 10 min · Investigate 12 min · Mix it up 3 min · Modify 7 min · Make 8 min). The Run, Modify and Make slides have the live playground in them; the tutorial link under it is the backup. -->

---

## Today

**We are learning to** let the items in a row drop to a new line when there is no room, so the same page fits a phone and a laptop.

- I can use flex-wrap: wrap so a row drops items onto new lines.
- I can use flex: 1 and min-width so items share the room and do not get squashed.
- I can explain why a fixed width does not fit every screen.

<!-- Speaker note: Before class: Do the Make task yourself in the playground (about 5 minutes). A **flex row** keeps all its items in one line unless it is told it may wrap. `flex-wrap: wrap` on the row allows new lines. `flex: 1` on the items makes them share the spare room on their line. `min-width` is the narrowest an item may be: once a line cannot fit another item at that width, the item drops to the next line. Together they make a layout that fits a phone and a laptop with no separate versions. The preview pane is narrow, so students do not need to resize the browser. They change the number of cards or the `min-width` and see the same effect a screen of a different width would give. Teacher: Mix it up: the cards touch each other. The fix is the same one as last lesson, on the row. -->

---

## Why it matters

> The same web page has to work on a phone, a school laptop and a wide monitor, and a wrapping row does that without a different page for each.

<!-- Speaker note: A row of items has a width it fits, and a screen has a width it offers. A phone offers little, and a laptop a lot. A row that wraps fits both. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Predict

```html
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

**Six cards, each at least 140px wide, sit in a row inside the narrow preview. What happens?**

- The cards that do not fit drop onto new lines by themselves
- Only the cards that fit are shown, and the rest are hidden
- Every card shrinks until all six fit in the preview
- The cards stay in one line and run off the right edge of the preview

<!-- Speaker note: What happens: The cards stay in one line and run off the right edge. A flex row keeps its items in one line unless you allow wrapping, and min-width stops the cards shrinking below 140px. Take two or three predictions before anyone runs it. -->

<!-- Speaker note: Teacher: most students expect the cards to drop down by themselves. They run off the right edge instead. Add the wrap line, then change min-width to see the number per line change. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Fit or fall off <span style="font-size:.6em;color:#64748b">(3 min)</span>

With your partner, say what the preview does with six cards that cannot all fit.
Hold up 1, 2, 3 or 4 fingers for the option you chose.

<!-- Speaker note: Take a vote before running. Ask someone who chose the first option what tells the row it may start a new line. The idea to land: it has to be allowed. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Run it

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.gallery+%7B%0A++++display%3A+flex%3B%0A++++gap%3A+12px%3B%0A++%7D%0A++.item+%7B%0A++++flex%3A+1%3B%0A++++min-width%3A+140px%3B%0A++++border%3A+2px+solid+teal%3B%0A++++padding%3A+8px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22gallery%22%3E%0A++%3Cdiv+class%3D%22item%22%3E%3Cimg+src%3D%22trophy.svg%22+alt%3D%22Trophy%22+width%3D%22100%22%3E%3Cp%3ETrophy%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3E%3Cimg+src%3D%22medal.svg%22+alt%3D%22Medal%22+width%3D%22100%22%3E%3Cp%3EMedal%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3E%3Cimg+src%3D%22book.svg%22+alt%3D%22Book%22+width%3D%22100%22%3E%3Cp%3EBook%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3E%3Cimg+src%3D%22ball.svg%22+alt%3D%22Ball%22+width%3D%22100%22%3E%3Cp%3EBall%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3E%3Cimg+src%3D%22star.svg%22+alt%3D%22Star%22+width%3D%22100%22%3E%3Cp%3EStar%3C%2Fp%3E%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3E%3Cimg+src%3D%22music.svg%22+alt%3D%22Music%22+width%3D%22100%22%3E%3Cp%3EMusic%3C%2Fp%3E%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flex-wrap/?full=step-2#step-2)

<!-- Speaker note: Compare with your prediction, and scroll the preview sideways to see the cards that run off. Then add `flex-wrap: wrap;` to the `.gallery` rule. Next, change `min-width` from `140px` to `220px`, then delete three cards: the number of cards on each line changes. The preview is narrow, so changing the number of cards or the minimum width is how you see what a phone and a laptop would do. | Code | What it does | Why | |---|---|---| | `display: flex;` | Puts the cards in a row | It goes on the box that holds them, as before | | `flex-wrap: wrap;` | Lets cards drop to a new line when the line is full | Without it, a flex row keeps every item in one line, even when they do not fit | | `flex: 1;` | Makes each card grow to share the spare room on its line | Without it, the last card on a line leaves an empty gap at the end | | `min-width: 140px;` | Stops a card getting narrower than 140px | A card that would be narrower drops to the next line instead of being squashed | | `gap: 12px;` | Puts 12px between cards, across and down | It spaces the lines as well as the cards in a line | Students should be able to say: I can explain why the cards drop to a new line and what min-width decides. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## What happened?

* The cards stay in one line and run off the right edge. A flex row keeps its items in one line unless you allow wrapping, and min-width stops the cards shrinking below 140px.

<!-- Speaker note: Reveal after running. Ask who predicted it, and what made them think so. -->

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate

```html
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

<!-- Speaker note: What this step is for: A fixed width is the same on every screen. A wrapping row with flex: 1 and a min-width changes how many items fit on a line. -->

<!-- Speaker note: Teacher: the 450px question is arithmetic with the gap. Ask students to work it out before choosing. The fixed-width question separates 'looks right on my laptop' from 'is right everywhere'. -->

<style scoped>pre, marp-pre { font-size: 0.51em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Match the lines

**Match each line with what it does.**

| | |
|---|---|
| `flex-wrap: wrap` | A. each item grows to share the spare room on its line |
| `flex: 1` | B. space between items, across and down |
| `min-width: 140px` | C. the narrowest an item may be before it wraps |
| `gap: 12px` | D. a full line sends the next item to a new line |

* Answer: flex-wrap: wrap → D. a full line sends the next item to a new line; flex: 1 → A. each item grows to share the spare room on its line; min-width: 140px → C. the narrowest an item may be before it wraps; gap: 12px → B. space between items, across and down

<!-- Speaker note: Wrap decides when a new line starts, min-width decides how narrow an item may get before that happens, and flex: 1 fills the room that is left. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 17px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## How many fit

**A line of the gallery is 450px wide, each card has min-width: 140px, and the gap is 12px. How many cards fit on one line?**

- All 6 cards
- 2 cards
- 4 cards
- 3 cards

* Answer: 3 cards

<!-- Speaker note: Three cards need 3 x 140 + 2 x 12 = 444px, which fits in 450px. Four would need 4 x 140 + 3 x 12 = 596px. On a wider screen, more fit on a line, with the same CSS. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## A fixed width

**Three cards have width: 400px with a 20px gap, and look right on a 1300px laptop. What is true on a 360px phone?**

- px means a percentage of the screen, so the cards stay in proportion
- 400px shrinks by itself to fit whatever the screen offers
- 400px is the same on every screen, so three cards need about 1240px: far more than a phone has
- It looks right on the laptop, so it looks right on every screen

* Answer: 400px is the same on every screen, so three cards need about 1240px: far more than a phone has

<!-- Speaker note: A fixed width is the same on every screen. Looking right on one screen tells you nothing about another. A min-width with flex: 1 lets the row fit three cards on a laptop and one on a phone. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 22px; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## The wrap in the wrong place

**The cards should wrap onto new lines, but they stay in one line, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    .gallery {
 3      display: flex;
 4      gap: 12px;
 5    }
 6    .item {
 7      flex-wrap: wrap;
 8      border: 2px solid teal;
 9    }
10  </style>
11  <div class="gallery">
12    <div class="item">One</div>
13    <div class="item">Two</div>
14    <div class="item">Three</div>
15  </div>
```

* Answer: line 7

<!-- Speaker note: Line 7 puts flex-wrap on each card. Wrapping is a job for the box that holds the items: .gallery { flex-wrap: wrap; }. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 26px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Modify



- **Stop the squash:** The six cards share one line and get thin. Give each a minimum width of `120px`.
- **Fewer per line:** Change the minimum width to `180px` and see how many cards fit on a line now.

<!-- Speaker note: What this step is for: A min-width keeps wrapped cards from being squashed, and a bigger min-width puts fewer cards on each line. Hints, in order: The cards are squashed into tall, narrow columns with words broken across lines. / Add `min-width: 120px;` to the `.item` rule. A card that would be narrower drops to the next line. / A wider minimum means fewer cards fit on each line. / Change `120px` to `180px` in the `.item` rule. For students who need more support: Give students the Run page and ask them only to add the wrap line and to change the number of cards. Tell them what each change does to the cards on a line. For early finishers: Give the gallery a width of 300px, then 600px, and write down how many cards fit on a line each time. Explain the numbers with min-width and gap. The hard part, on purpose: Believing the browser moves items down by itself. Ask what the row has been told about wrapping before saying. When students get stuck: The cards run off the edge and do not wrap. Ask: Which rule has flex-wrap? Fix: Put flex-wrap wrap in the rule of the box that holds the cards, the same rule as display flex. / The cards are thin, with words broken into pieces. Ask: What stops a card getting narrower? Fix: Add a min-width to the card rule. A card that would be narrower drops to the next line. / One card stretches across a whole line by itself. Ask: How many cards are on that line? Fix: With flex 1 a lone card on a line grows to fill it. That is expected. A smaller min-width puts more cards on each line. -->

<!-- Speaker note: Teacher: if a gallery squashes, ask what the smallest card should be. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Modify

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3Cstyle%3E%0A++.gallery+%7B%0A++++display%3A+flex%3B%0A++++flex-wrap%3A+wrap%3B%0A++++gap%3A+12px%3B%0A++%7D%0A++.item+%7B%0A++++flex%3A+1%3B%0A++++border%3A+2px+solid+teal%3B%0A++++padding%3A+8px%3B%0A++%7D%0A%3C%2Fstyle%3E%0A%3Cdiv+class%3D%22gallery%22%3E%0A++%3Cdiv+class%3D%22item%22%3ERobot+building+on+Tuesdays%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3ECoding+games+at+lunch%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3EDrone+flying+on+the+oval%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3EDesign+a+logo+this+term%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3EMusic+for+the+robots%3C%2Fdiv%3E%0A++%3Cdiv+class%3D%22item%22%3EChess+for+the+clever%3C%2Fdiv%3E%0A%3C%2Fdiv%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flex-wrap/?full=step-4#step-4)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#dbeafe; color:#1a1a1a; border:1.5px solid #3b82f6; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">💬 Discussion</span>

## Investigate: Mix it up

```html
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

<!-- Speaker note: The cards wrap, but they touch. What this step is for: The wrapped cards need the space between them set on the row with gap, the same as a row that does not wrap. -->

<style scoped>pre, marp-pre { font-size: 0.57em; line-height: 1.25; }</style>

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Mix it up

**The cards wrap into lines, but they touch each other, across and down. Which change adds space between all of them?**

- Add gap: 12px; to the .item rule
- Add gap: 12px; to the .gallery rule
- Add justify-content: center; to the .gallery rule
- Add align-items: center; to the .gallery rule

* Answer: Add gap: 12px; to the .gallery rule

<!-- Speaker note: gap goes on the row and spaces the items along each line and between the lines. justify-content moves a group of items, but flex: 1 has already filled every line, and align-items works across a line. gap on an item does nothing. What this step is for: The wrapped cards need the space between them set on the row with gap, the same as a row that does not wrap. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Make

Make a gallery for a school event: a heading and at least six pictures, each with good alt text. It should fit a phone and a laptop: the pictures wrap onto new lines and share the room on each line. Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`.

<!-- Speaker note: Hints, in order: A gallery is a box that holds the items, and each picture is inside an item. The row rules go on the gallery. / Start with a `<div class="gallery">` holding at least six `<div class="item">` boxes, each with an `img` (and its `alt`). / Then `.gallery` with `display: flex;`, `flex-wrap: wrap;` and a `gap`, and `.item` with `flex: 1;` and a `min-width`. -->

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Live: Make

{{embed: https://studio.learningwaypoints.com/tutorials/_playground-html/index.html?code=%3C%21--+Your+gallery.+Pictures%3A+trophy.svg%2C+medal.svg%2C+book.svg%2C+ball.svg%2C+star.svg%2C+music.svg+--%3E%0A}}

_If it does not load:_ [open this step in the tutorial](https://studio.learningwaypoints.com/tutorials/code/css/flex-wrap/?full=step-6#step-6)

<!-- Speaker note: Work the first task live, or let students start on their own screens and walk round. -->

<style scoped>pre, marp-pre { font-size: 0.5em; line-height: 1.25; } section { font-size: 25px; }</style>

---

<span style="background:#fef3c7; color:#1a1a1a; border:1.5px solid #f59e0b; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✍️ Activity</span>

## Squeeze the line <span style="font-size:.6em;color:#64748b">(5 min)</span>

On a strip of paper, draw a line 450px wide at a scale of your choice.
Cut out six cards at 140px and fit as many as you can with 12px gaps. Then try 220px cards.

<!-- Speaker note: Check that students count gaps as well as cards. Ask what changes on a phone-width strip. -->

---

<span style="background:#dcfce7; color:#1a1a1a; border:1.5px solid #22c55e; padding:6px 18px; border-radius:8px; font-size:1em; font-weight:500;">✅ Check</span>

## Exit ticket

**A gallery uses flex: 1 and min-width: 150px. Why does it show four cards on a line on a laptop but one on a phone?**

* A line holds as many 150px cards as fit, and flex: 1 stretches them to fill it. A phone only has room for one, so the others wrap.

<!-- Speaker note: Students answer on paper or a mini whiteboard before the reveal. Anyone who cannot answer needs the main idea again next lesson. Where this leads: Next lesson uses a wrapping row for a hero and a row of cards, and shows that one rule can style any number of copies. Class idea: open a school website and drag the window narrower; ask which parts wrap. -->
