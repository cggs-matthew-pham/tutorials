---
title: Layout and components in 5 minutes
---
## The idea in plain words

So far every box has stacked down the page. **Flexbox** lines boxes up in a row: put `display: flex;` on the box that *holds* the items (the parent), and its children sit side by side. `gap` spaces them, `flex-wrap: wrap` lets them move to the next line when the row is full (a gallery), and `justify-content` says where they sit along the row.

Real pages are built from named parts. **Section tags** (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`) look exactly like `<div>`, but their names tell browsers, search engines and screen readers what each part is. Inside those parts sit **components**: patterns made from tags you already know, such as a **hero** (a big opening section with a heading, a line of text and a link) or a **card** (a box with padding, a border, a heading and a picture). Build one once, then reuse it.

A **form** collects what people type: a `<label>` says what to type, an `<input>` is the box, a `<select>` is a drop-down, and a `<button>` sends it. On its own, a form sends nowhere: code behind it does the work.

## Why programmers use them

- **Flexbox** replaced years of layout tricks; most menus, toolbars and galleries on the web use it.
- **Section tags** make a page usable for everyone: screen-reader users jump straight to `<nav>` or `<main>`.
- **Components** are how real sites are built and how design teams work: one card design, used everywhere.
- **Forms** are where a website meets its users: sign-ups, searches, orders.

## An everyday picture, and where it breaks

`display: flex` is like a teacher saying "line up side by side" to a group: the instruction goes to the group, not to each student. Section tags are the signs on a building's doors: "Office", "Hall". A form is a paper form with nobody to collect it.

Where it breaks: tell one student to "line up" and nothing happens. `display: flex` on the items instead of their parent changes nothing, with no error. A label whose `for` does not match its input's `id` looks fine, but clicking it does nothing, and screen readers cannot connect the two.

## Try it yourself (5 minutes)

1. In the HTML playground, make a `<ul>` of three links. Add `ul { display: flex; gap: 20px; }`: a menu.
2. Move `display: flex` to `li` instead: nothing changes. Move it back.
3. Wrap the menu in `<nav>` and the page title in `<header>`: nothing changes on the page; switch on **Boxes** to see the named parts.
4. Add `<label for="name">Name</label> <input id="name">` and click the label: the cursor jumps into the box. Change the `id` and try again.

## Questions students ask

- **"Why didn't display: flex work?"** It is probably on the items. It goes on the box that holds them.
- **"If header looks like div, why bother?"** People using screen readers, and search engines, rely on those names. It also makes your own code easier to read.
- **"Where does the form send its data?"** Nowhere yet. A form needs code behind it: JavaScript in the page (the Make it react lesson, then the DOM course) or a program on a server (later, Gradio).

## How it connects

The final challenge builds a club page from these components: header and menu, a hero, a row of cards, a results table and a sign-up form. The optional lessons go further: Make it react adds a few lines of JavaScript to the form, and Page layout with Grid arranges whole pages.
