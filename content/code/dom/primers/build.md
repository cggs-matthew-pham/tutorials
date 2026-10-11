---
title: Classes, inputs and lists in 5 minutes
---
## The idea in plain words

Four tools for real pages. **Classes**: the look lives in CSS (`.dark { … }`) and JavaScript only flips it, with `classList.toggle("dark")` (no dot in the name). **Inputs**: `box.value` is the text typed in a box, and the `"input"` event fires on every keystroke; the value is always **text**, so `Number(box.value)` turns it into a number. **Lists of elements**: `document.createElement("li")` makes one, `list.append(li)` puts it on the page, `li.remove()` takes it off; an array in the script is data, and the page changes only when elements are made or removed. **State**: a variable made above the handler keeps its value from click to click; the page is only a picture of it.

## Why programmers use it

- **Classes** keep the look in CSS and the logic in JavaScript, so each is easy to change.
- **Data in variables, picture on the page** is how every app works.
- **Making elements from data** is how feeds, baskets and chats are built.

## An everyday picture, and where it breaks

A whiteboard and a notebook: the notebook (variables) is the memory, and the whiteboard (the page) shows what is in it. It breaks because the page does not update itself when the notebook changes: your code has to rewrite the whiteboard.

## Try it yourself (5 minutes)

1. Add a CSS class to the night-mode page and a button that toggles it.
2. Make two number boxes add up correctly, not as text.
3. Make the list remove an item when it is clicked.

## Questions students ask

- **Why does 4 + 5 give 45?** Values from boxes are text. Use `Number(...)`.
- **Why does my count go back to 1?** The variable is made inside the handler, so it starts over each click.
- **Why is the new item not on the page?** It was made but not appended, or it was only pushed to an array.

## How it connects

Arrays and loops come from the p5.js course, variables and events from earlier units. The unit ends with the pieces needed for the quiz.
