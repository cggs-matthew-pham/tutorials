---
title: Bootstrap in 5 minutes
---
## The idea in plain words

**Bootstrap** is a stylesheet: one big CSS file that someone else wrote, full of rules for buttons, menus, cards, forms and a layout grid. A page links it with one line, `<link rel="stylesheet" href="bootstrap.min.css">`, and then styles tags by adding its **class names**: `class="btn btn-primary"` makes a blue button. Students write no CSS for it; they look the names up. Each larger part is a **shape** of nested tags (a `row` holds `col`s, a `card` holds a `card-body`) that they copy and fill in. Their own rules go **after** the link, because when two rules match equally the later one wins.

## Why programmers use it

- **Speed:** a tidy page that works on phones and computers in minutes.
- **Consistency:** every button, card and form matches.
- **Shared language:** a team, or a student and a teacher, can say "a card in a col" and mean the same thing.

The cost: a large file to load, class names to learn, and pages that look like many other sites until you add your own rules.

## An everyday picture, and where it breaks

Flat-pack furniture: the parts are made and labelled for you; you choose them and put them together, and you can paint them afterwards. It breaks because furniture parts fit only one way, while Bootstrap ignores a misspelt label silently (`column` instead of `col` just does nothing).

## Try it yourself (5 minutes)

1. In the Bootstrap playground, change `btn-primary` to `btn-danger`, then delete the link line and watch the styling vanish.
2. Copy the card shape from the Reference page into a `row`, three times.
3. Add a `<style>` block after the link with `.card { border-color: orange; }`, then move it above the link.

## Questions students ask

- **Why doesn't my class work?** It is not one of Bootstrap's names, or a base class is missing (`btn` as well as `btn-primary`).
- **Why doesn't my CSS win?** It comes before the link, or the Bootstrap class is a utility (`bg-…`, `mt-…`), which always wins.
- **Is Bootstrap the only one?** No. Bulma works the same way; Tailwind uses one class per CSS property; daisyUI puts component names on Tailwind; Pico styles plain tags with no classes. The last lesson shows all four.

## How it connects

It rebuilds the club page from HTML & CSS (the final challenge) with ready-made parts, so students compare the two directly. The grid is Flexbox inside. Vue, after the DOM course, is the same idea for JavaScript: a framework that does the repetitive work for you.
