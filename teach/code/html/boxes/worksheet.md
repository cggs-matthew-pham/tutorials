---
title: "Boxes"
subtitle: "HTML & CSS · Style · Lesson 6"
---

# Boxes

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Cards, buttons, menus and photos on every website are boxes, sized and spaced with the same four parts.


:::teacher-note

**In one sentence:** Students see every element as a box of content, padding, border and margin, measure boxes with the Box model view, and size and space cards with CSS.

**Students should be able to say:** I can name the four parts of a box: content, padding, border and margin. I can work out how wide a box is from its width, padding and border. I can use padding and margin to space boxes inside and out. I can explain why a value without a unit does nothing.

**Width:** the unmarked parts are the floor every student does (predict, run, investigate and make). Typical adds the modify practice; wider adds the real-world contexts. They add contexts, not difficulty. Students work in the online tutorial alongside this sheet.

:::


## Predict

`width` sets how wide a box is, `padding` adds space inside its border, and `border` draws the line. Read the code. How wide is the whole card?

```html
<style>
  .card {
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
  }
</style>
<div class="card">Owls: 12 points</div>
```

:::keep-together

**How wide is the card on the page, from the outside of its border on the left to the outside on the right, in pixels?**

My prediction, and why:

{{lines-3}}

:::


:::teacher-note

**What happens:** 250: 200 for the content, plus 20 padding on each side, plus 5 border on each side.

:::


## Run

Run the program in the tutorial. Was your prediction right? What was different?

{{lines-2}}

## Investigate

The picture shows the first card in the **Box model** view: orange margin, gold border, green padding, blue content.

```html
<style>
  .card {
    width: 200px;
    padding: 20px;
    border: 5px solid navy;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

:::keep-together

### Match the parts

**Match each property with what it changes.**

A. space outside the border, between boxes

B. the line around the padding

C. the colour behind the content and the padding

D. how wide the content is

E. space inside the border, around the content

{{columns 60% 40%}}

{{rows 1}}

| Part | Letter |
|---|---|
| `padding` | |
| `border` | |
| `margin` | |
| `width` | |
| `background-color` | |

:::


:::teacher-note

**Answer:** padding → E. space inside the border, around the content; border → B. the line around the padding; margin → A. space outside the border, between boxes; width → D. how wide the content is; background-color → C. the colour behind the content and the padding

From the inside out: content, padding, border, margin. The background colour fills the content and the padding, but not the margin.

:::


:::keep-together

### Add up the width

**Fill in how much each part adds to the first card's width (both sides together).**

{{rows 1}}

| part | pixels |
|---|---|
| content (width) | 200 |
| padding |   |
| border |   |
| whole card |   |

:::


:::teacher-note

**Answer:** 40, 10, 250

Padding and border are added on the left and on the right: 200 + 40 + 10 = 250. The margin is outside the card, so it is not part of its width.

:::


:::keep-together

### Block and inline

Some boxes stack; some sit in a line.

```html
<p>One paragraph.</p>
<p>Another paragraph.</p>
<strong>Bold</strong> <strong>bold</strong> and <a href="https://example.com">a link</a>
```

**Why do the paragraphs stack, while the bold words and the link sit side by side?**

☐ Bold words are smaller than paragraphs

☐ The paragraphs have a margin

☐ Paragraphs are block boxes: each takes a whole line. strong and a are inline: they sit in a line of text.

☐ Links always sit next to bold words

:::


:::teacher-note

**Answer:** Paragraphs are block boxes: each takes a whole line. strong and a are inline: they sit in a line of text.

Block elements (p, h1, div, ul, table) start on a new line and take the full width. Inline elements (strong, em, a, img) sit inside a line of text.

:::


:::keep-together

### The padding that does nothing

**The border shows, but the words are squashed against it: the padding does nothing, and there is no error. Click the line that causes it.**

```
 1  <style>
 2    .card {
 3      padding: 20;
 4      border: 5px solid navy;
 5    }
 6  </style>
 7  <div class="card">Owls: 12 points</div>
```

Line: {{field-15}}

Why is it wrong?

{{lines-2}}

:::


:::teacher-note

**Answer:** line 3

Line 3 has no unit. padding: 20 means nothing to the browser, so it ignores the whole declaration. It needs padding: 20px;.

:::


:::keep-together

### Boxes inside boxes

A card is a box that holds other boxes: a heading, a picture and a paragraph.

```html
<div class="card">
  <h2>Owls</h2>
  <img src="trophy.svg" alt="A gold trophy" width="60">
  <p>12 points</p>
</div>
```

**What keeps the two cards apart?**

☐ The pictures

☐ Their border

☐ Their margin

☐ Their padding

:::


:::teacher-note

**Answer:** Their margin

Margin is the space outside each card's border (orange in the Box model view). Inside, a card can hold any boxes: a heading, a picture, a paragraph.

:::


:::typical

## Modify


**Room inside.** Give the cards `12px` of padding.

**Space between.** Space the cards apart with `16px` of margin.

**A set width.** Make each card's content `200px` wide. How wide is each card now? Point at it to check.

**A background.** Give the cards a background colour, and notice where it stops.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

**Room inside:**

```html
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

**Space between:**

```html
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
    margin: 16px;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

**A set width:**

```html
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
    margin: 16px;
    width: 200px;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

**A background:**

```html
<style>
  .card {
    border: 2px solid navy;
    padding: 12px;
    margin: 16px;
    width: 200px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

:::

:::


## Make

Make a card for a house or a club: a `<div>` with a heading, a picture and a line of text, styled with padding, a border, margin, a width and a background colour.

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  .card {
    width: 220px;
    padding: 16px;
    border: 4px solid darkorange;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">
  <h2>Soccer club</h2>
  <img src="ball.svg" alt="A soccer ball" width="80">
  <p>Thursdays after school on the top oval.</p>
</div>
```

:::


:::wider

## Turn the newsletter into cards

Wrap each article (its `<h2>` and `<p>`) in `<div class="article">`, then style `.article` with padding, a border, margin and a background colour, so each article looks like a card. (The `body` rule already sets a font for the whole page.)

Work in the tutorial. Plan first: what will you change, and how will you test it?

{{box-4}}

:::teacher-note

**One possible solution.** Other correct programs are fine; check that the program runs and does what the task asks.

```html
<style>
  body {
    font-family: sans-serif;
  }
  .article {
    padding: 16px;
    border: 2px solid steelblue;
    margin: 16px 0;
    background-color: aliceblue;
  }
</style>
<h1>Library news</h1>
<div class="article">
  <h2>New books</h2>
  <p>The library has 200 new books this term.</p>
</div>
<div class="article">
  <h2>Book fair</h2>
  <p>The book fair starts on Monday in the library.</p>
</div>
```

:::

:::


## Exit ticket

:::keep-together

**A box has width: 300px; padding: 10px; border: 2px solid; How wide is it on the page, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 324 pixels: 300 for the content, plus 10 padding on each side (20) and 2 border on each side (4).

:::

