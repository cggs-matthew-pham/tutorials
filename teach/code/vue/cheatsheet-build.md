---
title: "Building apps: cheat sheet"
subtitle: "Apps with Vue"
---

# Building apps

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;h1&gt; heading**: The biggest heading. Use it once for the page title.

```html
<h1>Heading</h1>
```

:::

:::keep-together

**padding**: Space inside an element, between its edge and its content.

```html
padding: 10px;
```

:::

:::keep-together

**margin**: Space outside an element, between it and its neighbours.

```html
margin: 10px;
```

:::

:::keep-together

**border**: A line around an element: thickness, style, colour.

```html
border: 2px solid black;
```

:::

:::keep-together

**computed**: A value worked out from other data. Vue works it out again whenever that data changes, so it never goes stale. Never set it yourself.

```html
const total = computed(() => adults.value * 12);
```

:::

:::keep-together

**component and props**: A tag of your own, made once and used many times: &lt;player-card :name="p.name"&gt;&lt;/player-card&gt;. The colon passes a value. Make the app with const app = createApp(...), add components, then app.mount("#app").

```html
app.component("player-card", {
  props: ["name"],
  template: `<p>{{ name }}</p>`
});
```

:::

:::keep-together

**heading outline**: Headings are the page's outline: one h1, then h2 for each part, h3 inside those. Never pick a level for its size; set the size with CSS.

```html
<h1>Page title</h1>
<h2>A part of the page</h2>
<h3>A part of that part</h3>
```

:::
