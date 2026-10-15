---
title: "Building blocks: cheat sheet"
subtitle: "The DOM and the browser console"
---

# Building blocks

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**read a box**: Read what someone typed into the box with id="name".

```html
const name = document.querySelector('#name').value;
```

:::

:::keep-together

**function in setup**: A function the page can run (return it from setup). In the script, a ref's value is in .value.

```html
function addPoint() {
  score.value++;
}
```

:::
