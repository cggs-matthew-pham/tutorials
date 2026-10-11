---
title: Vue in 5 minutes
---
## The idea in plain words

**Vue** is a JavaScript framework: code someone else wrote that does the repetitive work of keeping a page up to date. You keep the **data** (made with `ref`, so Vue watches it) and write the page once, with the data in it: `{{ score }}` shows a value, `v-for` makes a tag for each item in a list, `v-if` shows a tag only when something is true, `v-model` joins a box to data, and `@click` runs a function. When the data changes, Vue changes the page. Nobody writes `textContent` or `createElement` any more.

## Why programmers use it

- **Less code, fewer slips:** in the DOM course every change needed two jobs (change the variable, then the page). Vue does the second.
- **The page always matches the data:** nothing can be forgotten.
- **Bigger apps stay manageable:** components (unit 2) split a page into parts.

## An everyday picture, and where it breaks

A scoreboard operator who watches the game and updates the board without being asked. You only change the score. It breaks because the operator only watches what you point out to them: data made with `ref`. A plain variable changes in silence, and the board never moves.

## Try it yourself (5 minutes)

1. In the Vue playground, change `ref(0)` to `ref(10)` and run it.
2. Show the count twice on the page and click: both change.
3. Change `const count = ref(0)` to `let count = 0` and click. Nothing happens, and there is no error.

## Questions students ask

- **When do I write .value?** In the script, always (`score.value++`). On the page, never (`{{ score }}`).
- **Why does my page show {{ score }} as text?** Vue did not start: check the `vue.js` line, and that the tag is inside `#app`.
- **What is the "development build" message?** The version of Vue with extra warnings for learners. On a real site you would use the production one.

## How it connects

It replaces the DOM course's two jobs with one. Bootstrap did the same for CSS: borrowed code for repetitive work. React and Svelte share the same ideas (the optional last lesson).
