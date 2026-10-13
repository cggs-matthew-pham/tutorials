---
title: CSS in 5 minutes
---
## The idea in plain words

HTML says what each part of a page *is*. **CSS** says how it should *look*. CSS is a list of **rules**, and every rule has two halves:

```css
p {
  color: teal;
  font-size: 20px;
}
```

The **selector** (`p`) picks which elements the rule styles: here, every paragraph and nothing else. Inside the braces, each **declaration** is a property, a colon, a value and a semicolon: `color: teal;`. In the playground, rules go in a `<style>` block at the top of the page.

A **class** lets you style some elements and not others. In the HTML, mark them: `<p class="note">`. In the CSS, a dot means "class": `.note { ... }`. The dot is only in the CSS.

Every element is a **box**. From the inside out: the **content**, then **padding** (space inside the border), then the **border**, then **margin** (space outside, between boxes). `width` sets the content's width, so padding and border are added on top of it.

## Why programmers use it

- **One change, everywhere.** Change one rule and every matching element updates, on every page that uses it.
- **Content and looks stay separate.** The same HTML can be restyled completely without touching it.
- **Classes name intentions.** `.warning` or `.card` says what something is for, not just what colour it is.

## An everyday picture, and where it breaks

A selector is like an instruction to a class of students: "everyone wearing a green hat, stand up". Everyone who matches does it; everyone else does not. A class is a name badge you give out on purpose.

Where it breaks: a person would ask "did you mean the blue-green hats?". The browser never asks. A selector with a typo (`.Note` for `class="note"`, capitals count) or a value without its unit (`padding: 20` instead of `20px`) is silently ignored, so nothing changes and there is no error message. When a rule "does nothing", check the selector and the units first.

## Try it yourself (5 minutes)

1. In the HTML playground, type a heading and two paragraphs. Add `<style> p { color: teal; } </style>` above them: only the paragraphs change.
2. Give one paragraph `class="note"` and add `.note { font-size: 24px; }`. Only that one grows.
3. Add `padding: 20px; border: 3px solid teal;` to `.note`, then click **Box model** and point at it: orange is margin, yellow border, green padding, blue content.
4. Change `20px` to `20` and watch the padding vanish without any error.

## Questions students ask

- **"Why did nothing change?"** The selector does not match (check spelling, capitals and the dot for a class), or a value is missing its unit, or a semicolon is missing before it.
- **"What is the difference between padding and margin?"** Padding is inside the border (it takes the background colour); margin is outside (it pushes other boxes away).
- **"Why is my 200px box wider than 200?"** `width` is the content only; padding and border are added on each side.
- **"Can I put CSS in another file?"** Yes, real sites usually do (`<link rel="stylesheet" href="style.css">`). In the playground we keep it in a `<style>` block so everything is in one place.

## How it connects

The Components unit builds on boxes: Flexbox lines boxes up in rows (a menu, a gallery), and cards are boxes with padding, a border and a heading. Later, JavaScript finds elements with the same selectors (`document.querySelector('.note')`), so selectors are worth getting right now.
