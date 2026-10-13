---
title: Lists, links and pictures in 5 minutes
---
## The idea in plain words

Three tags that make a page more than text. A **list** is `<ul>` (bullets) or `<ol>` (numbers) holding `<li>` items, one per item. A **link** is `<a href="address">words</a>`: the address goes in the opening tag as an **attribute**, and the words between the tags are what people click. A **picture** is `<img src="file" alt="words">`: `src` is the picture file, `alt` describes it, and there is no closing tag.

A **class** is a name you add to a tag, `class="note"`, so a CSS rule written `.note { }` styles only the tags that carry it.

## Why it matters

- **Real structure.** A list tag tells a screen reader "these belong together"; a row of lines starting with dashes does not.
- **Alt words are for people.** Someone using a screen reader hears the alt words in place of the picture. They are not a caption.
- **Picking some, not all.** Tag rules style every tag of a kind. Classes are the first way to style just the ones you choose.

## An everyday picture, and where it breaks

A link is a signpost: the words say where it leads, and the address says how to get there. Where it breaks: a signpost shows its words, not its address. Students often expect the address to appear on the page.

## Try it yourself (5 minutes)

1. Make a `<ul>` of three things you like. Turn it into an `<ol>`: the numbers appear by themselves.
2. Turn one item into a link to a real page. Check it opens.
3. Add `<img src="trophy.svg" alt="A gold trophy">`. Change `trophy` to `trophey` and watch the alt words appear in place of the picture.
4. Give one item `class="best"` and add `.best { color: crimson; }`.

## Questions students ask

- **"Why is my number 1. showing twice?"** `<ol>` numbers its items itself: do not type the numbers.
- **"Why can't I see my link's address?"** Only the words between the tags show. The address is the attribute.
- **"Why does my picture show words instead?"** The file name in `src` does not match the file. Names must match exactly, capitals included.
- **"Why is nothing happening to my class?"** The dot is only in the CSS (`.best`), and the name must match in both places.

## How it connects

The unit ends with a whole newsletter page to fix, using everything so far. Next come tables, the named parts of a page, links within a page, and forms.
