---
title: "Final challenge: a quiz page: cheat sheet"
subtitle: "The DOM and the browser console"
---

# Final challenge: a quiz page

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**fetch JSON**: Asks for a file or web address, waits for the reply, then turns it into data (objects and arrays). Both lines need await, inside an async function.

```html
const response = await fetch("weather.json");
const data = await response.json();
```

:::

:::keep-together

**async function**: A function that may wait for slow things with await. Call it like any function; the rest of the page keeps going while it waits.

```html
async function load() {
  … await …
}
load();
```

:::
