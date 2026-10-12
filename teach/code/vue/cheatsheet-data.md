---
title: "Data on the page: cheat sheet"
subtitle: "Apps with Vue"
---

# Data on the page

> The commands and patterns from this unit. In the tutorial, open **Reference** in any playground to copy them.

:::keep-together

**&lt;p&gt; paragraph**: A paragraph of text.

```html
<p>Some text</p>
```

:::

:::keep-together

**&lt;ul&gt; list**: A bulleted list. Each item is an &lt;li&gt;.

```html
<ul>
  <li>First</li>
  <li>Second</li>
</ul>
```

:::

:::keep-together

**comment**: A note that the browser ignores.

```html
<!-- A note to yourself -->
```

:::

:::keep-together

**rule**: Style every element matching the selector.

```html
p {
  color: blue;
}
```

:::

:::keep-together

**read a box**: Read what someone typed into the box with id="name".

```html
const name = document.querySelector('#name').value;
```

:::

:::keep-together

**Vue app**: Vue looks after everything inside the div with id app. setup makes the data and functions, and returns the names the page can use. vue.js sits beside the page.

```html
<div id="app">
  the page
</div>

<script src="vue.js"></script>
<script>
  const { createApp, ref, computed } = Vue;
  createApp({
    setup() {
      data and functions
      return { names };
    }
  }).mount("#app");
</script>
```

:::

:::keep-together

**ref data**: Data that Vue watches: when it changes, the page follows. Return it from setup. In the script its value is score.value; on the page, just score.

```html
const score = ref(0);
```

:::

:::keep-together

**show data {{ }}**: Shows a value from setup on the page, and keeps it up to date. Any short expression works: {{ score * 2 }}.

```html
{{ score }}
```

:::

:::keep-together

**@click event**: Runs a function from setup when the button is clicked. A short change works too: @click="score++".

```html
<button @click="addPoint">Add</button>
```

:::

:::keep-together

**v-for**: Makes this tag once for each item in the list. Put it on the tag you want more of (the li, not the ul).

```html
<li v-for="name in players">{{ name }}</li>
```

:::

:::keep-together

**v-if**: Shows the tag only while the condition is true. v-else on the next tag shows when it is false.

```html
<p v-if="players.length === 0">No players yet.</p>
```

:::

:::keep-together

**v-model**: Joins a box to a ref, both ways: typing changes the data, and changing the data changes the box. On a tick box it is true or false.

```html
<input v-model="newName">
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
