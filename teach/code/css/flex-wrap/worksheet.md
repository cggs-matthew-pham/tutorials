---
title: "Fit any width"
subtitle: "Layout and components · Layout · Lesson 8"
---

# Fit any width

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** The same web page has to work on a phone, a school laptop and a wide monitor, and a wrapping row does that without a different page for each.


:::teacher-note

**In one sentence:** Students let a flex row wrap with flex-wrap, share each line with flex: 1 and set a min-width, and find out that a fixed width does not change with the screen.

**Students should be able to say:** I can use flex-wrap: wrap so a row drops items onto new lines. I can use flex: 1 and min-width so items share the room and do not get squashed. I can explain why a fixed width does not fit every screen.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`flex-wrap`, `flex: 1` and `min-width` are new. Read the code: `min-width: 140px` means a card will not get narrower than 140px. Six cards need much more room than the preview has. What happens?

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

:::keep-together

**Six cards, each at least 140px wide, sit in a row inside the narrow preview. What happens?**

☐ The cards that do not fit drop onto new lines by themselves

☐ Only the cards that fit are shown, and the rest are hidden

☐ Every card shrinks until all six fit in the preview

☐ The cards stay in one line and run off the right edge of the preview

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** The cards stay in one line and run off the right edge. A flex row keeps its items in one line unless you allow wrapping, and min-width stops the cards shrinking below 140px.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

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

:::keep-together

### Match the lines

**Match each line with what it does.**

A. each item grows to share the spare room on its line

B. space between items, across and down

C. the narrowest an item may be before it wraps

D. a full line sends the next item to a new line

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `flex-wrap: wrap` | |
| `flex: 1` | |
| `min-width: 140px` | |
| `gap: 12px` | |

:::


:::teacher-note

**Answer:** flex-wrap: wrap → D. a full line sends the next item to a new line; flex: 1 → A. each item grows to share the spare room on its line; min-width: 140px → C. the narrowest an item may be before it wraps; gap: 12px → B. space between items, across and down

Wrap decides when a new line starts, min-width decides how narrow an item may get before that happens, and flex: 1 fills the room that is left.

:::


:::keep-together

### How many fit

**A line of the gallery is 450px wide, each card has min-width: 140px, and the gap is 12px. How many cards fit on one line?**

☐ All 6 cards

☐ 2 cards

☐ 4 cards

☐ 3 cards

:::


:::teacher-note

**Answer:** 3 cards

Three cards need 3 x 140 + 2 x 12 = 444px, which fits in 450px. Four would need 4 x 140 + 3 x 12 = 596px. On a wider screen, more fit on a line, with the same CSS.

:::


:::keep-together

### A fixed width

**Three cards have width: 400px with a 20px gap, and look right on a 1300px laptop. What is true on a 360px phone?**

☐ px means a percentage of the screen, so the cards stay in proportion

☐ 400px shrinks by itself to fit whatever the screen offers

☐ 400px is the same on every screen, so three cards need about 1240px: far more than a phone has

☐ It looks right on the laptop, so it looks right on every screen

:::


:::teacher-note

**Answer:** 400px is the same on every screen, so three cards need about 1240px: far more than a phone has

A fixed width is the same on every screen. Looking right on one screen tells you nothing about another. A min-width with flex: 1 lets the row fit three cards on a laptop and one on a phone.

:::


:::keep-together

### The wrap in the wrong place

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

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 7

Line 7 puts flex-wrap on each card. Wrapping is a job for the box that holds the items: .gallery { flex-wrap: wrap; }.

:::


:::typical

## Modify


**Stop the squash.** The six cards share one line and get thin. Give each a minimum width of `120px`.

**Fewer per line.** Change the minimum width to `180px` and see how many cards fit on a line now.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Stop the squash:**

```html
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

**Fewer per line:**

```html
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

:::

:::


## Mix it up

The cards wrap, but they touch.

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

:::keep-together

**The cards wrap into lines, but they touch each other, across and down. Which change adds space between all of them?**

☐ Add gap: 12px; to the .item rule

☐ Add gap: 12px; to the .gallery rule

☐ Add justify-content: center; to the .gallery rule

☐ Add align-items: center; to the .gallery rule

:::


:::teacher-note

**Answer:** Add gap: 12px; to the .gallery rule

gap goes on the row and spaces the items along each line and between the lines. justify-content moves a group of items, but flex: 1 has already filled every line, and align-items works across a line. gap on an item does nothing.

:::


## Make

Make a gallery for a school event: a heading and at least six pictures, each with good alt text. It should fit a phone and a laptop: the pictures wrap onto new lines and share the room on each line. Pictures you can use: `trophy.svg`, `medal.svg`, `book.svg`, `ball.svg`, `star.svg`, `music.svg`.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
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

:::


## Exit ticket

:::keep-together

**A gallery uses flex: 1 and min-width: 150px. Why does it show four cards on a line on a laptop but one on a phone?**

{{lines-3}}

:::


:::teacher-note

**Answer:** A line holds as many 150px cards as fit, and flex: 1 stretches them to fill it. A phone only has room for one, so the others wrap.

:::

