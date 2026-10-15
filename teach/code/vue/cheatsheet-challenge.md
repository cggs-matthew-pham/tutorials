---
title: "Final challenge: a to-do app: cheat sheet"
subtitle: "Apps with Vue"
---

# Final challenge: a to-do app

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;h2&gt; subheading**: A smaller heading for a section.

```html
<h2>Subheading</h2>
```

:::

:::keep-together

**Preact app**: Preact works like React. A component is a function that returns its page, written in html`…` (htm). Preact runs the function again after every change.

```html
<div id="app"></div>
<script src="preact.js"></script>
<script>
  const { html, render, useState } = htmPreact;
  function App() {
    state and functions
    return html`the page`;
  }
  render(html`<${App} />`, document.querySelector("#app"));
</script>
```

:::

:::keep-together

**useState**: Preact and React state: the value, and a function to change it. Always give it a new value: setStars([...stars, item]), never stars.push.

```html
const [stars, setStars] = useState([]);
```

:::

:::keep-together

**Svelte component**: Here a Svelte component sits in a hidden textarea and svelte.js compiles it in the page. In a real project it is its own file, App.svelte.

```html
<textarea data-svelte hidden>
  <script>
    state and functions
  </script>
  the page
</textarea>
<script src="svelte.js"></script>
```

:::

:::keep-together

**$state and $derived**: Svelte's data that changes, and a value worked out from it. Change $state data directly (count++, list.push). Show it with {count}; choose with {#if …} … {/if}.

```html
let count = $state(0);
let double = $derived(count * 2);
```

:::
