---
title: Changing a page in 5 minutes
---
## The idea in plain words

A web page is a **tree of elements** (the DOM). JavaScript can **find** an element with `document.querySelector("#id")` (a `#` for an id, a `.` for a class, a plain word for a tag), then **change** it: `title.textContent = "…"` for its words, `title.style.color = "…"` for its look. A script runs as soon as the browser reaches it, so it sits below the elements it uses. To wait for a click, hand the button a function: `button.addEventListener("click", start)`. No brackets after `start`: that would run it now. `console.log(…)` writes messages in the Console under the page, to see what the code is doing.

## Why programmers use it

- **Every interactive page** is this: find an element, listen for an event, change something.
- **The Console** shows what the code sees without changing the page.

## An everyday picture, and where it breaks

A doorbell wired to a light: the button is the element, the click is the event, and the wiring is the handler. It breaks because you can wire any button to any change, and you can wire many handlers to one button.

## Try it yourself (5 minutes)

1. Run the first page and change the heading's text in the script.
2. Mistype the selector. What does the Console say, and what does `null` mean?
3. Add a second button that changes the heading back.

## Questions students ask

- **Why does it say `null`?** The selector found nothing. Check the spelling, and the `#` or the dot.
- **Why does nothing happen when I click?** Check there are no brackets after the function in `addEventListener`.
- **Why does the script go at the bottom?** It runs when reached, so the elements must be above it.

## How it connects

This is the events lesson from Python and `mousePressed` from p5.js, with the page as the thing to change. The HTML & CSS lesson "Make it react" is a short version of this unit.
