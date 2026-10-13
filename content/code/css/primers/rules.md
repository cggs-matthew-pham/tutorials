---
title: Rules that combine in 5 minutes
---
## The idea in plain words

A CSS rule is a selector and a list of `property: value;` pairs in braces. Two things can happen at once, and students need to know both.

First, an element takes the properties of **every rule that matches it**. A paragraph with `class="note"` matches `p { }` and `.note { }`, so it gets both rules' properties. Only when two rules set the *same* property does one have to win. Then a **class rule beats a tag rule**, and between rules of equal strength **the later one wins**.

Second, you can save typing. A **group selector** puts a comma between selectors, `h1, p { color: navy; }`, so one rule styles both. A space is different: `nav a { }` means "a link *inside* a nav", so it styles the menu links and leaves other links alone.

## Why it matters

- **Real stylesheets overlap.** Every page has a tag rule and a few class rules that touch the same elements. Reading which one wins is the skill.
- **Fewer rules.** A group rule is one place to change, not three.
- **Menus look different from text links.** `nav a` is how every site styles its menu without touching other links.

## An everyday picture, and where it breaks

School rules: "everyone wears uniform" (a tag rule) and "the netball team wears red" (a class rule). A netball player follows both, and where they clash, the more specific rule wins. Where it breaks: if two rules are equally specific, school has a person to decide; CSS just takes the later one.

## Try it yourself (5 minutes)

1. Write `p { color: teal; font-size: 20px; }` and `.note { color: crimson; }`. Give one paragraph `class="note"`. Is it teal, crimson, 20px?
2. Swap the order of the two rules. Does the colour change? (It should not: class beats tag.)
3. Add a second `p { color: green; }` below the first. Which paragraphs turn green? Why?
4. Join `h1` and `h2` into one rule with a comma.
5. Put two links in a `<nav>` and one in a paragraph. Write `nav a { text-decoration: none; }`. Which links change?

## Questions students ask

- **"Why is my class rule ignored?"** Check the dot, and check the name matches. Then look for a later class rule that sets the same property.
- **"Does the rule I wrote first lose?"** Only for the properties both rules set. Otherwise both apply.
- **"What is the difference between `h1, p` and `nav a`?"** A comma means "and". A space means "inside".
- **"If `nav { color: white; }` is set, why are the links not white?"** Links have their own colour rule from the browser. Name the links: `nav a { }`.

## How it connects

Rules that combine come first in Course B, and `nav a` styles the menu links. Block and inline boxes come next, then the layout lessons use class rules and `nav a` again. The final challenge needs all of it.
