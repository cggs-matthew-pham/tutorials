---
title: "Boxes"
subtitle: "Layout and components · Boxes · Lesson 4"
---

# Boxes

**Name:** {{field-24}} **Date:** {{field-15}} **Class:** {{field-15}}

> **Key question:** Cards, buttons, menus and photos on every website are boxes, sized and spaced with the same few parts.


:::teacher-note

**In one sentence:** Students see every element as a box of content, padding, border and margin, and find out that width sets only the content, so padding and border make the box wider.

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
    width: 180px;
    padding: 15px;
    border: 4px solid teal;
    margin: 16px;
    background-color: lightyellow;
  }
</style>
<div class="card">Owls: 12 points</div>
<div class="card">Hawks: 9 points</div>
```

:::keep-together

### Add up the width

**In the picture, how wide is the first card on the page, outside border to outside border, in pixels?**

Answer: {{field-15}}

:::


:::teacher-note

**Answer:** 218

180 for the content, plus 15 + 15 of padding, plus 4 + 4 of border: 218. The 16px margin is outside the card.

:::


:::keep-together

### Room for the words

**The words touch the border of a card. Which property gives them room inside the border?**

☐ background-color

☐ padding

☐ width

☐ margin

:::


:::teacher-note

**Answer:** padding

Padding is the room between the words and the border. Margin is the space outside the border, between cards.

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

Line 3 has no unit. padding: 20 means nothing to the browser, so it ignores the whole line. It needs padding: 20px;.

:::


:::typical

## Modify


**Room inside.** Give the cards `12px` of padding.

**Space between.** Space the cards apart with `16px` of margin.

**A set width.** Make each card's content `200px` wide. How wide is each card now? Point at it to check.

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

:::

:::


## Mix it up

Both tags are `span` elements in one line of text.

```html
<style>
  .tag {
    width: 120px;
    padding: 8px;
    border: 2px solid teal;
  }
</style>
<p>Today: <span class="tag">Owls</span> <span class="tag">Hawks</span></p>
```

:::keep-together

**Both tags should be boxes 120px wide, but each is only as wide as its word. The padding works, the width does not. What fixes the width?**

☐ Add display: block; to the .tag rule, because an inline box ignores its width

☐ Add more padding, because padding sets the width of an inline box

☐ Add a margin, because inline boxes need space around them

☐ Change span to p in the CSS, because width belongs to paragraphs

:::


:::teacher-note

**Answer:** Add display: block; to the .tag rule, because an inline box ignores its width

A span is an inline box: it sits in the line of text and ignores width. display: block makes it a block box, so the 120px applies (and each tag then starts a new line).

:::


## Make

Make a card for a house or a club: a `<div>` with a heading, a picture and a line of text, styled with padding, a border, margin and a width. Point at it with Box model and work out its width before you check.

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


## Exit ticket

:::keep-together

**A box has width: 300px; padding: 10px; border: 2px solid; How wide is it on the page, and why?**

{{lines-3}}

:::


:::teacher-note

**Answer:** 324 pixels: 300 for the content, plus 10 padding on each side (20) and 2 border on each side (4).

:::

