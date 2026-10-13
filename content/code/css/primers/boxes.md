---
title: Boxes in 5 minutes
---
## The idea in plain words

The browser draws every element as a **box**. Some boxes are **block**: `<p>`, `<h1>` and `<div>` start a new line and stretch across the page, so they stack. Others are **inline**: `<strong>`, `<a>` and `<span>` sit inside the line of text, side by side. `<div>` and `<span>` do nothing by themselves; they are plain boxes (block and inline) you wrap around things to style them. `display: block` or `display: inline` switches a box from one kind to the other.

A box has layers. **Content** is the text or picture. **Padding** is room inside, between the content and the border. The **border** is the line around it. **Margin** is space outside the border, pushing other boxes away. `width` sets only the content, so the width on the page is the width plus padding and border on both sides.

## Why it matters

- **Layout is boxes.** Every layout idea after this one, rows, cards and gaps, is boxes placed next to each other.
- **Surprises explained.** A `width` that does nothing on a `<span>`, or a card wider than you set, both come from the box rules.
- **Grouping.** A `<div>` with a class lets you style a group of things as one.

## An everyday picture, and where it breaks

A framed picture on a wall: the picture is the content, the mat around it is the padding, the frame is the border, and the gap to the next frame is the margin. Where it breaks: a frame's size usually includes its mat, but in CSS `width` is the picture only, so the padding and border add to it.

## Try it yourself (5 minutes)

1. Put two paragraphs and a sentence with `<strong>` and `<a>` in a page. Which items stack, and which sit in the line?
2. Wrap two paragraphs in a `<div class="box">`. What changes? (Nothing, until a rule styles `.box`.)
3. Give `.box` a `border: 2px solid navy;`. Then add `padding: 16px;`. Watch the text move away from the line.
4. Add `margin: 24px;`. Which way does the whole box move?
5. Set `width: 200px;` then add `padding: 20px`. Measure the box: 240px, not 200px, plus the border.
6. Give a `<span>` a `width`. Nothing happens. Add `display: block`.

## Questions students ask

- **"Why does my width not work?"** Inline boxes ignore `width`. Make it block.
- **"Padding or margin?"** Padding is inside the border, margin is outside it. If the background colour fills it, it is padding.
- **"Why is my card wider than 300px?"** Padding and border add to `width`.
- **"Why did my `<div>` not change anything?"** A `<div>` has no look of its own; it needs a rule.

## How it connects

Block and inline come before the box model. A box with padding, a border and a width becomes a **card**, which the layout unit copies and puts in rows.
