---
title: Layout in 5 minutes
---
## The idea in plain words

Normally boxes stack down the page. **Flexbox** puts them in a row. Put `display: flex;` on the box that *holds* the items (the parent), and its children sit side by side. It goes on the holder, never on the items.

Three more properties tidy the row. `gap` sets the space between items. `justify-content` says where the items sit *along* the row (`flex-start`, `center`, `space-between`). `align-items` says how they line up *across* it (`center` lines up different heights). `flex-wrap: wrap` lets items drop to a new line when the row runs out of room, and `flex: 1` with a `min-width` lets items share the row without squashing.

A **component** is a chunk of HTML with a class that you copy. One set of rules styles every copy, so adding a card means copying HTML, not writing CSS.

## Why it matters

- **Menus, headers and card rows** all use Flexbox. Nearly every site does.
- **One page, any screen.** A wrapping row fits a phone and a laptop without extra rules.
- **Change once.** If every card shares a class, a colour change is one edit.

## An everyday picture, and where it breaks

A shelf: the shelf is the parent, the books are the items, and you decide how they sit along it and how they are spaced. Where it breaks: a real shelf has a fixed length. A wrapping row starts a new shelf when the first is full.

## Try it yourself (5 minutes)

1. Make a `<ul>` of three links in a `<nav>`. Add `nav ul { display: flex; }`. The list becomes a row.
2. Add `gap: 16px;`, then try `justify-content: space-between;` and `center`.
3. Make a header with `<h1>` and the nav. Put `display: flex; justify-content: space-between;` on the header.
4. Make three `<div class="card">` in a `<section class="cards">`. Add `display: flex; flex-wrap: wrap; gap: 16px;` to `.cards`.
5. Give `.card` `flex: 1; min-width: 200px;`. Make the window narrow. Copy a card: a fourth appears with no new CSS.

## Questions students ask

- **"I wrote `display: flex` and nothing moved."** It is on the items. Move it to the box that holds them.
- **"What is the difference between `justify-content` and `align-items`?"** Along the row, and across it.
- **"Why do my cards squash?"** Without `flex-wrap: wrap` and a `min-width`, a row shrinks its items.
- **"Do I write `.card1`, `.card2`?"** No. One class on every card.

## How it connects

Flexbox follows the box model: a row is boxes with padding, border and gap. The final challenge puts the club page's header, hero and cards in rows. An optional lesson adds Grid for rows and columns at once.
